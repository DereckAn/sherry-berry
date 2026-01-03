/**
 * Process Payment API Route
 * Enhanced with rate limiting, comprehensive error handling, and logging
 */

import { orderStore } from "@/lib/order-store";
import { paymentRateLimiter } from "@/lib/rate-limiter";
import squareClient from "@/lib/SquareClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Enhanced validation schema with items
const PaymentRequestSchema = z.object({
  sourceId: z.string().min(1, "Payment source is required"),
  amount: z
    .number()
    .positive("Amount must be positive")
    .int("Amount must be an integer")
    .max(1000000, "Amount exceeds maximum allowed"), // $10,000 max
  currency: z.enum(["USD", "MXN", "CAD"], {
    message: "Invalid currency",
  }),
  shippingAddress: z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    email: z.string().email("Invalid email address"),
    address1: z.string().min(1).max(100),
    city: z.string().min(1).max(50),
    state: z.string().min(1).max(50),
    postalCode: z.string().min(3).max(20),
    country: z.enum(["MX", "US", "CA"], {
      message: "Invalid country",
    }),
  }),
  idempotencyKey: z.string().uuid("Invalid idempotency key"),
  // Optional order details for storage
  orderDetails: z
    .object({
      items: z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            variant: z.string(),
            quantity: z.number(),
            priceValue: z.number(),
          })
        )
        .optional(),
      totals: z
        .object({
          subtotal: z.number(),
          shipping: z.number(),
          tax: z.number(),
          total: z.number(),
          currency: z.string(),
        })
        .optional(),
    })
    .optional(),
});

// Helper to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIP || "unknown";
}

// Helper to log payment attempts
function logPaymentAttempt(
  status: "success" | "failure",
  details: {
    ip: string;
    amount: number;
    currency: string;
    error?: string;
    paymentId?: string;
  }
) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    status,
    ...details,
  };

  // In production, send to logging service (e.g., Datadog, Sentry)
  console.log("[PAYMENT]", JSON.stringify(logEntry));
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);
  const startTime = Date.now();

  try {
    // Rate limiting
    const rateLimitResult = paymentRateLimiter.check(clientIP);

    if (!rateLimitResult.allowed) {
      const resetIn = Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000);

      logPaymentAttempt("failure", {
        ip: clientIP,
        amount: 0,
        currency: "N/A",
        error: "Rate limit exceeded",
      });

      return NextResponse.json(
        {
          success: false,
          error: "Too many payment attempts. Please try again later.",
          retryAfter: resetIn,
        },
        {
          status: 429,
          headers: {
            "Retry-After": resetIn.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = PaymentRequestSchema.parse(body);

    // Additional business logic validation
    if (validatedData.amount < 100) {
      // Minimum $1.00
      return NextResponse.json(
        {
          success: false,
          error: "Minimum payment amount is $1.00",
        },
        { status: 400 }
      );
    }

    // Process payment with Square
    const result = await squareClient.payments.create({
      sourceId: validatedData.sourceId,
      idempotencyKey: validatedData.idempotencyKey,
      amountMoney: {
        amount: BigInt(validatedData.amount),
        currency: validatedData.currency,
      },
      locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
      buyerEmailAddress: validatedData.shippingAddress.email,
      shippingAddress: {
        firstName: validatedData.shippingAddress.firstName,
        lastName: validatedData.shippingAddress.lastName,
        addressLine1: validatedData.shippingAddress.address1,
        locality: validatedData.shippingAddress.city,
        administrativeDistrictLevel1: validatedData.shippingAddress.state,
        postalCode: validatedData.shippingAddress.postalCode,
        country: validatedData.shippingAddress.country as any,
      },
    });

    const processingTime = Date.now() - startTime;

    if (result.payment?.status === "COMPLETED") {
      // Store order details for confirmation page
      const orderDetails = {
        paymentId: result.payment.id!,
        orderId: result.payment.orderId,
        receiptUrl: result.payment.receiptUrl,
        orderDetails: {
          items: validatedData.orderDetails?.items || [],
          shipping: {
            address: validatedData.shippingAddress,
          },
          totals: validatedData.orderDetails?.totals || {
            subtotal: 0,
            shipping: 0,
            tax: 0,
            total: validatedData.amount / 100,
            currency: validatedData.currency,
          },
        },
      };

      // Store by both idempotencyKey and orderId
      orderStore.set(validatedData.idempotencyKey, orderDetails);
      if (result.payment.orderId) {
        orderStore.set(result.payment.orderId, orderDetails);
      }

      logPaymentAttempt("success", {
        ip: clientIP,
        amount: validatedData.amount,
        currency: validatedData.currency,
        paymentId: result.payment.id!,
      });

      return NextResponse.json(
        {
          success: true,
          paymentId: result.payment.id,
          orderId: result.payment.orderId,
          receiptUrl: result.payment.receiptUrl,
          idempotencyKey: validatedData.idempotencyKey,
        },
        {
          headers: {
            "X-Processing-Time": processingTime.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          },
        }
      );
    }

    // Payment not completed
    const errorMsg = `Payment status: ${result.payment?.status || "unknown"}`;

    logPaymentAttempt("failure", {
      ip: clientIP,
      amount: validatedData.amount,
      currency: validatedData.currency,
      error: errorMsg,
    });

    return NextResponse.json(
      {
        success: false,
        error: "Payment could not be completed. Please try again.",
      },
      { status: 400 }
    );
  } catch (error) {
    const processingTime = Date.now() - startTime;

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      logPaymentAttempt("failure", {
        ip: clientIP,
        amount: 0,
        currency: "N/A",
        error: "Validation error",
      });

      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment data",
          details: fieldErrors,
        },
        { status: 400 }
      );
    }

    // Handle Square API errors
    if (error && typeof error === "object" && "errors" in error) {
      const squareError = error as any;
      const errorMessage =
        squareError.errors?.[0]?.detail || "Payment processing failed";

      logPaymentAttempt("failure", {
        ip: clientIP,
        amount: 0,
        currency: "N/A",
        error: errorMessage,
      });

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: 500 }
      );
    }

    // Generic error handling
    const errorMessage =
      error instanceof Error ? error.message : "Payment processing failed";

    logPaymentAttempt("failure", {
      ip: clientIP,
      amount: 0,
      currency: "N/A",
      error: errorMessage,
    });

    console.error("[PAYMENT ERROR]", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      processingTime,
    });

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
