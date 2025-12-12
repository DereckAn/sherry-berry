"use client";

import { useCartStore, useTotalItems, useTotalPrice } from "@/shared/store/cartStore";
import { MAX_QUANTITY_PER_ITEM, MIN_QUANTITY_PER_ITEM } from "@/shared/types/cart";
import Image from "next/image";
import { useEffect } from "react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = useTotalItems();
  const totalPrice = useTotalPrice();

  // Lock body scroll when cart is open
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

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < MIN_QUANTITY_PER_ITEM) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Cart Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-sand">
            <h2 className="text-xl font-serif text-charcoal">
              Tu Carrito ({totalItems})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sand rounded-sm transition-colors"
              aria-label="Cerrar carrito"
            >
              <svg
                className="size-6 text-charcoal"
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
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg
                  className="size-16 text-sand mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path
                      fill="currentColor"
                      d="M19.5 22a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-10 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                    />
                    <path d="M5 4h17l-2 11H7zm0 0c-.167-.667-1-2-3-2m18 13H5.23c-1.784 0-2.73.781-2.73 2s.946 2 2.73 2H19.5" />
                  </g>
                </svg>
                <p className="text-charcoal/70 text-lg">Tu carrito está vacío</p>
                <p className="text-charcoal/50 text-sm mt-2">
                  Explora nuestras velas artesanales
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-sm border border-sand"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 shrink-0 bg-sand rounded-sm overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-charcoal text-sm font-medium truncate">
                        {item.title}
                      </h3>
                      <p className="text-charcoal/60 text-xs mt-0.5">
                        {item.variant}
                      </p>
                      <p className="text-charcoal font-medium text-sm mt-1">
                        {item.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="size-7 flex items-center justify-center border border-sand rounded-sm hover:bg-sand transition-colors"
                          aria-label="Disminuir cantidad"
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
                        <span className="text-charcoal text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= MAX_QUANTITY_PER_ITEM}
                          className="size-7 flex items-center justify-center border border-sand rounded-sm hover:bg-sand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Aumentar cantidad"
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

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-1.5 text-charcoal/50 hover:text-red-600 transition-colors"
                          aria-label="Eliminar del carrito"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer - Total & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-sand p-6 space-y-4">
              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="text-sm text-charcoal/60 hover:text-charcoal underline transition-colors"
              >
                Vaciar carrito
              </button>

              {/* Subtotal */}
              <div className="flex items-center justify-between text-lg">
                <span className="text-charcoal/70">Subtotal</span>
                <span className="font-serif font-medium text-charcoal">
                  ${totalPrice.toFixed(2)} CAD
                </span>
              </div>

              <p className="text-xs text-charcoal/50">
                Impuestos y envío calculados en checkout
              </p>

              {/* Checkout Button */}
              <button
                className="w-full py-3 px-6 bg-primary text-white font-medium rounded-sm hover:bg-primary-hover transition-colors"
                onClick={() => {
                  // TODO: Implement checkout
                  console.log("Proceed to checkout", items);
                }}
              >
                Proceder al Pago
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};