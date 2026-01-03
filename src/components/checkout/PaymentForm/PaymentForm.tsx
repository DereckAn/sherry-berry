"use client";

/**
 * PaymentForm - Square Web Payments SDK integration
 * Enhanced with double payment prevention and retry logic
 */

import { useCheckoutStore } from "@/shared/store/checkoutStore";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PaymentFormProps {
  onPaymentSuccess: (
    paymentId: string,
    orderId?: string,
    receiptUrl?: string
  ) => void;
  onPaymentError: (error: string) => void;
}

type PaymentState = "idle" | "processing" | "success" | "error";

export function PaymentForm({
  onPaymentSuccess,
  onPaymentError,
}: PaymentFormProps) {
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const cardContainerId = "card-container";
  const paymentRef = useRef<any>(null);
  const cardInstanceRef = useRef<any>(null);
  const idempotencyKeyRef = useRef<string>(crypto.randomUUID());
  const paymentAttemptedRef = useRef(false);

  const totals = useCheckoutStore((state) => state.totals);
  const shipping = useCheckoutStore((state) => state.shipping);

  const MAX_RETRIES = 2;
  const isProcessing = paymentState === "processing";
  const hasError = paymentState === "error";

  useEffect(() => {
    const loadSquareSDK = async () => {
      if (!window.Square) {
        const script = document.createElement("script");
        script.src = "https://web.squarecdn.com/v1/square.js";
        script.async = true;
        script.onload = () => initializePayments();
        document.body.appendChild(script);
      } else {
        initializePayments();
      }
    };

    const initializePayments = async () => {
      try {
        if (!window.Square) {
          throw new Error("Square SDK not loaded");
        }

        const payments = await window.Square.payments(
          process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!,
          process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!
        );

        paymentRef.current = payments;

        const card = await payments.card();
        await card.attach(`#${cardContainerId}`);
        cardInstanceRef.current = card;

        setSdkLoaded(true);
      } catch (error) {
        console.error("Failed to initialize Square Payments:", error);
        setPaymentState("error");
        setErrorMessage(
          "Failed to load payment form. Please refresh the page."
        );
      }
    };

    loadSquareSDK();

    return () => {
      if (cardInstanceRef.current) {
        cardInstanceRef.current.destroy();
      }
    };
  }, []);

  const processPayment = async (sourceId: string) => {
    const response = await fetch("/api/checkout/process-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceId,
        amount: Math.round(totals.total * 100),
        currency: totals.currency,
        shippingAddress: shipping!.address,
        idempotencyKey: idempotencyKeyRef.current,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Payment processing failed");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Payment failed");
    }

    return {
      paymentId: data.paymentId,
      orderId: data.orderId,
      receiptUrl: data.receiptUrl,
    };
  };

  const handlePayment = async () => {
    // Prevent double payment
    if (paymentAttemptedRef.current || isProcessing) {
      console.warn("Payment already in progress");
      return;
    }

    if (!cardInstanceRef.current || !shipping?.address) {
      setErrorMessage("Payment form not ready");
      return;
    }

    paymentAttemptedRef.current = true;
    setPaymentState("processing");
    setErrorMessage(null);

    try {
      // Step 1: Tokenize card
      const tokenResult = await cardInstanceRef.current.tokenize();

      if (tokenResult.status !== "OK") {
        throw new Error(
          tokenResult.errors?.[0]?.message || "Card validation failed"
        );
      }

      // Step 2: Process payment with retry logic
      let lastError: Error | null = null;

      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          const paymentData = await processPayment(tokenResult.token);

          // Success!
          setPaymentState("success");
          onPaymentSuccess(
            paymentData.paymentId,
            paymentData.orderId,
            paymentData.receiptUrl
          );
          return;
        } catch (error) {
          lastError = error as Error;

          // Don't retry on validation errors
          if (
            lastError.message.includes("Invalid") ||
            lastError.message.includes("validation")
          ) {
            break;
          }

          // Wait before retry (exponential backoff)
          if (attempt < MAX_RETRIES) {
            setRetryCount(attempt + 1);
            await new Promise((resolve) =>
              setTimeout(resolve, Math.pow(2, attempt) * 1000)
            );
          }
        }
      }

      // All retries failed
      throw lastError || new Error("Payment processing failed");
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Payment processing failed";

      setPaymentState("error");
      setErrorMessage(errorMsg);
      onPaymentError(errorMsg);

      // Allow retry after error
      paymentAttemptedRef.current = false;

      // Generate new idempotency key for next attempt
      idempotencyKeyRef.current = crypto.randomUUID();
    }
  };

  const handleRetry = () => {
    setPaymentState("idle");
    setErrorMessage(null);
    setRetryCount(0);
    paymentAttemptedRef.current = false;
    idempotencyKeyRef.current = crypto.randomUUID();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Payment Information</h3>
          <Lock className="w-5 h-5 text-green-600" />
        </div>

        <div id={cardContainerId} className="min-h-[200px]" />

        {!sdkLoaded && (
          <div className="text-center py-8 text-gray-500">
            <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
            Loading secure payment form...
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-900 mb-1">
                Payment Failed
              </h4>
              <p className="text-sm text-red-700">{errorMessage}</p>
              {retryCount > 0 && (
                <p className="text-xs text-red-600 mt-2">
                  Attempted {retryCount} time(s)
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Retry Info */}
      {isProcessing && retryCount > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700">
            Retrying payment... (Attempt {retryCount + 1}/{MAX_RETRIES + 1})
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {hasError ? (
          <button
            onClick={handleRetry}
            className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
          >
            Try Again
          </button>
        ) : (
          <button
            onClick={handlePayment}
            disabled={isProcessing || !sdkLoaded}
            className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay ${totals.currency} ${totals.total.toFixed(2)}`
            )}
          </button>
        )}

        <p className="text-xs text-gray-500 text-center">
          🔒 Your payment is secured by Square. We never store your card
          details.
        </p>
      </div>
    </div>
  );
}
