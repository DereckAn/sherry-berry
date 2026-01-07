"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { PRODUCT } from "@/shared/i18n/content";
import { useCartStore } from "@/shared/store/cartStore";
import type { Product } from "@/shared/types/cart";
import {
  MAX_QUANTITY_PER_ITEM,
  MIN_QUANTITY_PER_ITEM,
} from "@/shared/types/cart";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDialog({
  product,
  isOpen,
  onClose,
}: ProductDialogProps) {
  const { language } = useLanguage();
  const content = PRODUCT[language];
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  // Reset quantity when dialog opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newValue = prev + delta;
      return Math.max(
        MIN_QUANTITY_PER_ITEM,
        Math.min(MAX_QUANTITY_PER_ITEM, newValue)
      );
    });
  };

  const handleAddToCart = () => {
    // Add item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    onClose();
    openCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 flex items-center justify-center inset-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className="relative bg-cream w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-dialog-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label={content.dialog.close}
        >
          <svg
            className="size-5 text-charcoal"
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
        </button>

        {/* Image */}
        <div className="relative aspect-video bg-sand ">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Variant badge */}
            <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium">
              {product.variant}
            </span>

            {/* Title */}
            <h2
              id="product-dialog-title"
              className="text-2xl md:text-3xl font-serif text-charcoal leading-tight"
            >
              {product.title}
            </h2>

            {/* Price */}
            <p className="text-xl font-medium text-charcoal">{product.price}</p>

            {/* Description */}
            <p className="text-charcoal/70 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <ul className="space-y-2 pt-2">
              {content.dialog.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-charcoal/60"
                >
                  <span className="text-primary">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 pt-6 mt-6 border-t border-sand">
            {/* Quantity selector */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-charcoal/70">
                {content.dialog.quantity}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= MIN_QUANTITY_PER_ITEM}
                  className="size-10 flex items-center justify-center border border-sand rounded-sm hover:bg-sand transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label={content.dialog.decrease}
                >
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="text-lg font-medium text-charcoal w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= MAX_QUANTITY_PER_ITEM}
                  className="size-10 flex items-center justify-center border border-sand rounded-sm hover:bg-sand transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label={content.dialog.increase}
                >
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-charcoal/70">
                {content.dialog.subtotal}
              </span>
              <span className="font-medium text-charcoal">
                ${(product.priceValue * quantity).toFixed(2)} CAD
              </span>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 bg-primary text-white font-medium rounded-sm hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <path
                    fill="currentColor"
                    d="M19.5 22a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-10 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                  />
                  <path d="M5 4h17l-2 11H7zm0 0c-.167-.667-1-2-3-2m18 13H5.23c-1.784 0-2.73.781-2.73 2s.946 2 2.73 2H19.5" />
                </g>
              </svg>
              {content.dialog.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
