/**
 * Cart Store - Zustand store with persistence
 * Security features:
 * - Input validation and sanitization
 * - Quantity bounds enforcement
 * - Safe localStorage hydration with validation
 * - Protection against malformed data injection
 */

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  type CartItem,
  type CartStore,
  type Product,
  isValidCartItem,
  isValidPrice,
  isValidProductId,
  sanitizeQuantity,
} from "../types/cart";

/** Storage key for cart persistence */
const CART_STORAGE_KEY = "sherry-berry-cart";

/**
 * Validates the entire cart state during hydration
 * Protects against tampered localStorage data
 */
function validatePersistedState(state: unknown): {
  items: CartItem[];
  isOpen: boolean;
} {
  const defaultState = { items: [], isOpen: false };

  if (!state || typeof state !== "object") {
    return defaultState;
  }

  const obj = state as Record<string, unknown>;

  // Validate items array
  if (!Array.isArray(obj.items)) {
    return defaultState;
  }

  // Filter and validate each item
  const validItems = obj.items
    .filter((item): item is CartItem => isValidCartItem(item))
    .map((item) => ({
      ...item,
      quantity: sanitizeQuantity(item.quantity),
    }));

  return {
    items: validItems,
    isOpen: false, // Always start with cart closed on page load
  };
}

/**
 * Validates a product before adding to cart
 */
function validateProduct(product: Product): Product | null {
  if (!isValidProductId(product.id)) {
    console.warn("[Cart] Invalid product ID rejected:", product.id);
    return null;
  }

  if (!isValidPrice(product.priceValue)) {
    console.warn("[Cart] Invalid price rejected:", product.priceValue);
    return null;
  }

  // Sanitize string fields (basic XSS prevention for display)
  return {
    id: product.id.trim(),
    title: product.title.slice(0, 200).trim(),
    variant: product.variant.slice(0, 100).trim(),
    description: product.description.slice(0, 500).trim(),
    price: product.price.slice(0, 50).trim(),
    priceValue: Math.abs(product.priceValue),
    image: product.image.slice(0, 500).trim(),
  };
}

/**
 * Cart store with Zustand persist middleware
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      // Initial state
      items: [],
      isOpen: false,

      // Actions
      addItem: (product: Product) => {
        const validProduct = validateProduct(product);
        if (!validProduct) return;

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === validProduct.id
          );

          if (existingItem) {
            // Increment quantity if item exists, respecting max limit
            const newQuantity = sanitizeQuantity(existingItem.quantity + 1);

            // Don't update if already at max
            if (newQuantity === existingItem.quantity) {
              return state;
            }

            return {
              items: state.items.map((item) =>
                item.id === validProduct.id
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            };
          }

          // Add new item with quantity 1
          const newItem: CartItem = {
            ...validProduct,
            quantity: 1,
          };

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (id: string) => {
        if (!isValidProductId(id)) {
          console.warn("[Cart] Invalid ID for removal rejected:", id);
          return;
        }

        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id: string, quantity: number) => {
        if (!isValidProductId(id)) {
          console.warn("[Cart] Invalid ID for quantity update rejected:", id);
          return;
        }

        const sanitizedQuantity = sanitizeQuantity(quantity);

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: sanitizedQuantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Only persist items, not UI state
      partialize: (state) => ({ items: state.items }),
      // Validate data on hydration for security
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("[Cart] Error rehydrating cart:", error);
        }
        if (state) {
          // Validate all items after hydration
          const validatedState = validatePersistedState(state);
          state.items = validatedState.items;
          state.isOpen = false;
        }
      },
      // Merge with validation
      merge: (persistedState, currentState) => {
        const validated = validatePersistedState(persistedState);
        return {
          ...currentState,
          items: validated.items,
        };
      },
    }
  )
);

/**
 * Computed selectors for cart data
 * These are functions to get derived state
 */
export const cartSelectors = {
  /** Get total number of items in cart */
  getTotalItems: (state: CartStore): number =>
    state.items.reduce((total, item) => total + item.quantity, 0),

  /** Get total price of all items in cart */
  getTotalPrice: (state: CartStore): number =>
    state.items.reduce(
      (total, item) => total + item.priceValue * item.quantity,
      0
    ),

  /** Check if a specific product is in cart */
  isInCart: (state: CartStore, productId: string): boolean =>
    state.items.some((item) => item.id === productId),

  /** Get quantity of a specific product in cart */
  getItemQuantity: (state: CartStore, productId: string): number =>
    state.items.find((item) => item.id === productId)?.quantity ?? 0,
};

/**
 * Hook to get total items count
 */
export const useTotalItems = () =>
  useCartStore((state) => cartSelectors.getTotalItems(state));

/**
 * Hook to get total price
 */
export const useTotalPrice = () =>
  useCartStore((state) => cartSelectors.getTotalPrice(state));
