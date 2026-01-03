/**
 * Order Details API Route
 * Retrieves order information by orderId or idempotencyKey
 * Secure endpoint that validates the request
 */

import { orderStore } from "@/lib/order-store";
import squareClient from "@/lib/SquareClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const OrderDetailsRequestSchema = z
  .object({
    orderId: z.string().optional(),
    key: z.string().uuid().optional(),
  })
  .refine((data) => data.orderId || data.key, {
    message: "Either orderId or key must be provided",
  });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const key = searchParams.get("key");

    // Validate request
    const validatedData = OrderDetailsRequestSchema.parse({ orderId, key });

    // Try to get from in-memory store first
    const lookupKey = validatedData.orderId || validatedData.key!;
    const storedOrder = orderStore.get(lookupKey);

    if (storedOrder) {
      return NextResponse.json({
        success: true,
        order: storedOrder,
      });
    }

    // If not in memory, try to fetch from Square
    if (validatedData.orderId) {
      try {
        const payment = await squareClient.payments.get({
          paymentId: validatedData.orderId,
        });

        if (payment.payment?.status === "COMPLETED") {
          // Build order details from payment
          const orderDetails = {
            paymentId: payment.payment.id,
            orderId: payment.payment.orderId,
            receiptUrl: payment.payment.receiptUrl,
            orderDetails: {
              totals: {
                total: Number(payment.payment.amountMoney?.amount || 0) / 100,
                currency: payment.payment.amountMoney?.currency || "USD",
                subtotal: 0,
                shipping: 0,
                tax: 0,
              },
              shipping: {
                address: {
                  firstName: payment.payment.shippingAddress?.firstName || "",
                  lastName: payment.payment.shippingAddress?.lastName || "",
                  email: payment.payment.buyerEmailAddress || "",
                  address1: payment.payment.shippingAddress?.addressLine1 || "",
                  city: payment.payment.shippingAddress?.locality || "",
                  state:
                    payment.payment.shippingAddress
                      ?.administrativeDistrictLevel1 || "",
                  postalCode: payment.payment.shippingAddress?.postalCode || "",
                  country: payment.payment.shippingAddress?.country || "",
                },
              },
              items: [],
            },
          };

          return NextResponse.json({
            success: true,
            order: orderDetails,
          });
        }
      } catch (error) {
        console.error("Error fetching payment from Square:", error);
      }
    }

    // Order not found
    return NextResponse.json(
      {
        success: false,
        error: "Order not found",
      },
      { status: 404 }
    );
  } catch (error) {
    console.error("Order details error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request parameters",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve order details",
      },
      { status: 500 }
    );
  }
}
