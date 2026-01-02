"use client";

import { CheckoutSummary, ShippingForm } from "@/components/checkout";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/shared/store/cartStore";
import {
  useCheckoutStep,
  useCheckoutStore,
} from "@/shared/store/checkoutStore";
import type { ShippingAddress, ShippingRate } from "@/types/checkout";
import Link from "next/link";
import { useEffect } from "react";

const CheckoutPage = () => {
  const items = useCartStore((state) => state.items);
  const currentStep = useCheckoutStep();
  const updateShipping = useCheckoutStore((state) => state.updateShipping);
  const setStep = useCheckoutStore((state) => state.setStep);
  const calculateTotals = useCheckoutStore((state) => state.calculateTotals);

  // Initialize checkout with cart items
  useEffect(() => {
    calculateTotals();
  }, [items, calculateTotals]);

  const handleShippingUpdate = async (
    address: ShippingAddress,
    rate: ShippingRate
  ) => {
    await updateShipping(address, rate);
    // Auto-advance to payment step when shipping is complete
    if (currentStep === "cart") {
      setStep("shipping");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
            <div className="rounded-lg shadow-sm p-8">
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
                    strokeWidth={1}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Add some beautiful candles to get started
              </p>
              <Link href="/menu">
                <Button>Browse Candles</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-8xl font-legquinne font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Review your order and complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="space-y-6">
            <ShippingForm
              onShippingUpdate={handleShippingUpdate}
              className="w-full"
            />

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Information
              </h2>
              <div className="text-center py-8 text-gray-500">
                <p>Payment form coming in Phase 3</p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
