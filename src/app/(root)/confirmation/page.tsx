"use client";

import { OrderConfirmation } from "@/components/checkout/OrderConfirmation/OrderConfirmation";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface OrderData {
  paymentId: string;
  orderId?: string;
  receiptUrl?: string;
  orderDetails?: any;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const idempotencyKey = searchParams.get("key");

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId && !idempotencyKey) {
        setError("Invalid confirmation link");
        setLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams();
        if (orderId) params.append("orderId", orderId);
        if (idempotencyKey) params.append("key", idempotencyKey);

        const response = await fetch(
          `/api/checkout/order-details?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Order not found");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to load order details");
        }

        setOrderData(data.order);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load order details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, idempotencyKey]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-pink-600" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading your order...
          </h2>
          <p className="text-gray-600">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-lg border border-red-200 p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Order Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              {error ||
                "We couldn't find this order. The link may be invalid or expired."}
            </p>
            <a
              href="/"
              className="inline-block bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-50">
      <OrderConfirmation
        paymentId={orderData.paymentId}
        orderId={orderData.orderId}
        receiptUrl={orderData.receiptUrl}
        orderDetails={orderData.orderDetails}
      />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-pink-600" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Loading...
            </h2>
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
