"use client";

/**
 * OrderConfirmation - Success page after payment
 */

import { useCartStore } from "@/shared/store/cartStore";
import { useCheckoutStore } from "@/shared/store/checkoutStore";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

interface OrderConfirmationProps {
  paymentId: string;
  orderId?: string;
  receiptUrl?: string;
}

export function OrderConfirmation({
  paymentId,
  orderId,
  receiptUrl,
}: OrderConfirmationProps) {
  const totals = useCheckoutStore((state) => state.totals);
  const shipping = useCheckoutStore((state) => state.shipping);
  const items = useCheckoutStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const resetCheckout = useCheckoutStore((state) => state.reset);

  useEffect(() => {
    // Clear cart after successful order
    clearCart();
  }, [clearCart]);

  const handleContinueShopping = () => {
    resetCheckout();
    window.location.href = "/";
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600">
          Thank you for your purchase. We've sent a confirmation email to{" "}
          {shipping?.address.email}
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
          <div>
            <p className="text-sm text-gray-500 mb-1">Order Number</p>
            <p className="font-semibold">{orderId || paymentId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Payment ID</p>
            <p className="font-mono text-sm">{paymentId}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Order Items</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-gray-500">
                    {item.variant} × {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  {totals.currency}{" "}
                  {(item.priceValue * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 pb-6 border-b">
          <h3 className="font-semibold mb-3">Shipping Address</h3>
          <div className="text-sm text-gray-600">
            <p>
              {shipping?.address.firstName} {shipping?.address.lastName}
            </p>
            <p>{shipping?.address.address1}</p>
            {shipping?.address.address2 && <p>{shipping.address.address2}</p>}
            <p>
              {shipping?.address.city}, {shipping?.address.state}{" "}
              {shipping?.address.postalCode}
            </p>
            <p>{shipping?.address.country}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>
              {totals.currency} {totals.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>
              {totals.currency} {totals.shipping.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>
              {totals.currency} {totals.tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span>
              {totals.currency} {totals.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleContinueShopping}
          className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
        >
          Continue Shopping
        </button>
        {receiptUrl && (
          <a
            href={receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white text-pink-600 py-3 px-6 rounded-lg font-semibold border-2 border-pink-600 hover:bg-pink-50 transition-colors text-center"
          >
            View Receipt
          </a>
        )}
      </div>
    </div>
  );
}
