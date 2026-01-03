"use client";

/**
 * Checkout Page - Complete checkout with cart, shipping, and payment
 * All sections visible on one page for better UX
 */

import { CheckoutSummary } from "@/components/checkout/CheckoutSummary/CheckoutSummary";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation/OrderConfirmation";
import { PaymentForm } from "@/components/checkout/PaymentForm/PaymentForm";
import { ShippingForm } from "@/components/checkout/ShippingForm/ShippingForm";
import { useCartStore } from "@/shared/store/cartStore";
import {
  useCheckoutStore,
  useIsReadyForPayment,
} from "@/shared/store/checkoutStore";
import type { ShippingAddress, ShippingRate } from "@/types/checkout";
import { useState } from "react";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const updateShipping = useCheckoutStore((state) => state.updateShipping);
  const isReadyForPayment = useIsReadyForPayment();
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{
    paymentId: string;
    orderId?: string;
    receiptUrl?: string;
  } | null>(null);

  const handleShippingUpdate = async (
    address: ShippingAddress,
    rate: ShippingRate
  ) => {
    await updateShipping(address, rate);
  };

  const handlePaymentSuccess = (
    paymentId: string,
    orderId?: string,
    receiptUrl?: string
  ) => {
    setPaymentResult({ paymentId, orderId, receiptUrl });
    setOrderCompleted(true);
  };

  const handlePaymentError = (error: string) => {
    alert(`Payment failed: ${error}`);
  };

  // Show order confirmation after successful payment
  if (orderCompleted && paymentResult) {
    return <OrderConfirmation {...paymentResult} />;
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <a href="/" className="text-pink-600 hover:text-pink-700 font-semibold">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-6xl text-center mb-5 md:text-start  md:text-8xl font-bold font-legquinne text-gray-900">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-1 space-y-6">
            <ShippingForm
              onShippingUpdate={handleShippingUpdate}
              className="shadow-sm"
            />

            {isReadyForPayment ? (
              <PaymentForm
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            ) : (
              <div className="bg-white/70 rounded-lg border border-gray-200 p-8 text-center shadow-sm">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Complete shipping information first
                </h3>
                <p className="text-gray-600">
                  Please fill out your shipping address and select a shipping
                  method to proceed with payment.
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <CheckoutSummary
                showTitle={true}
                showEditControls={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
