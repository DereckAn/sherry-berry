"use client";

import { useCartStore } from "@/shared/store/cartStore";
import {
  useCheckoutStore,
  useCheckoutTotals,
} from "@/shared/store/checkoutStore";
import type { CartItem } from "@/shared/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CheckoutSummaryProps {
  showTitle?: boolean;
  showEditControls?: boolean;
  className?: string;
}

export function CheckoutSummary({
  showTitle = true,
  showEditControls = true,
  className = "",
}: CheckoutSummaryProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const checkoutTotals = useCheckoutTotals();
  const calculateTotals = useCheckoutStore((state) => state.calculateTotals);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
    // Recalculate totals when cart changes
    setTimeout(() => calculateTotals(), 0);
  };

  const formatPrice = (price: number, currency?: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || checkoutTotals.currency,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div
        className={`bg-white rounded-lg p-6 ${className}`}
      >
        <div className="text-center py-8">
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500">
            Add some beautiful candles to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded bg-black/10 ${className}`}>
      {showTitle && (
        <div className="px-6 py-4 border-b border-black/20">
          <h2 className="text-5xl font-semibold font-legquinne mt-3">Order Summary</h2>
          <p className="text-sm text-gray-500">
            {items.length} item{items.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      )}

      <div className="px-6 py-4">
        {/* Items List */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <CheckoutItem
              key={item.id}
              item={item}
              showEditControls={showEditControls}
              onQuantityChange={handleQuantityChange}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Totals Section */}
        <div className="border-t border-black/20 pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">
              {formatPrice(checkoutTotals.subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            {checkoutTotals.shipping > 0 ? (
              <span className="font-medium">
                {formatPrice(checkoutTotals.shipping)}
              </span>
            ) : (
              <span className="text-gray-400">
                {checkoutTotals.shipping === 0 && checkoutTotals.subtotal > 0
                  ? "FREE"
                  : "Calculated at next step"}
              </span>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxes</span>
            {checkoutTotals.tax > 0 ? (
              <span className="font-medium">
                {formatPrice(checkoutTotals.tax)}
              </span>
            ) : (
              <span className="text-gray-400">Calculated at next step</span>
            )}
          </div>

          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between">
              <span className="text-base font-semibold text-gray-900">
                Total
              </span>
              <span className="text-base font-semibold text-gray-900">
                {formatPrice(checkoutTotals.total)}
                {checkoutTotals.shipping === 0 &&
                  checkoutTotals.tax === 0 &&
                  "*"}
              </span>
            </div>
            {checkoutTotals.shipping === 0 && checkoutTotals.tax === 0 && (
              <p className="text-xs text-gray-500 mt-1">
                *Excluding shipping and taxes
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CheckoutItemProps {
  item: CartItem;
  showEditControls: boolean;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

function CheckoutItem({
  item,
  showEditControls,
  onQuantityChange,
  onRemove,
}: CheckoutItemProps) {
  const itemTotal = item.priceValue * item.quantity;
  const checkoutTotals = useCheckoutTotals();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: checkoutTotals.currency,
    }).format(price);
  };

  return (
    <div className="flex items-start space-x-4">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">
          {item.title}
        </h4>
        {item.variant && (
          <p className="text-sm text-gray-500 mt-1">{item.variant}</p>
        )}
        <p className="text-sm font-medium text-gray-900 mt-1">
          {formatPrice(item.priceValue)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex-shrink-0">
        {showEditControls ? (
          <div className="flex items-center space-x-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                className="p-1 hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-50 transition-colors"
                disabled={item.quantity >= 10}
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => onRemove(item.id)}
              className="p-1 text-red-500 hover:text-red-700 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-right">
            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            <p className="text-sm font-medium text-gray-900">
              {formatPrice(itemTotal)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
