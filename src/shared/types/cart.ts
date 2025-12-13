/**
 * Cart Types - Enterprise-level shopping cart for candles
 * Security considerations:
 * - All IDs are validated and sanitized
 * - Quantities are bounded (1-10)
 * - Prices are validated as positive numbers
 */

/** Maximum quantity per item in cart */
export const MAX_QUANTITY_PER_ITEM = 10;

/** Minimum quantity per item in cart */
export const MIN_QUANTITY_PER_ITEM = 1;

/**
 * Represents a product that can be added to the cart
 * Based on the existing menuItems structure with numeric price for calculations
 */
export interface Product {
  id: string;
  title: string;
  variant: string;
  description: string; // Product description for dialog
  price: string; // Display price with currency (e.g., "$32.00 CAD")
  priceValue: number; // Numeric price for calculations
  image: string;
}

/**
 * Represents an item in the shopping cart
 * Extends Product with quantity tracking
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Cart state interface for Zustand store
 */
export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

/**
 * Cart actions interface
 */
export interface CartActions {
  /** Add an item to the cart or increment quantity if exists */
  addItem: (product: Product) => void;
  /** Remove an item completely from the cart */
  removeItem: (id: string) => void;
  /** Update quantity of an item (bounded 1-10) */
  updateQuantity: (id: string, quantity: number) => void;
  /** Clear all items from the cart */
  clearCart: () => void;
  /** Toggle cart open/closed state */
  toggleCart: () => void;
  /** Open the cart */
  openCart: () => void;
  /** Close the cart */
  closeCart: () => void;
}

/**
 * Complete cart store type combining state and actions
 */
export type CartStore = CartState & CartActions;

/**
 * Validates that a product ID is safe (alphanumeric with hyphens/underscores)
 */
export function isValidProductId(id: string): boolean {
  if (!id || typeof id !== "string") return false;
  // Only allow alphanumeric characters, hyphens, and underscores
  const safeIdPattern = /^[a-zA-Z0-9_-]+$/;
  return safeIdPattern.test(id) && id.length <= 100;
}

/**
 * Validates that a price is a positive number
 */
export function isValidPrice(price: number): boolean {
  return typeof price === "number" && isFinite(price) && price >= 0;
}

/**
 * Sanitizes and bounds a quantity value
 */
export function sanitizeQuantity(quantity: number): number {
  if (typeof quantity !== "number" || !isFinite(quantity)) {
    return MIN_QUANTITY_PER_ITEM;
  }
  return Math.max(
    MIN_QUANTITY_PER_ITEM,
    Math.min(MAX_QUANTITY_PER_ITEM, Math.round(quantity))
  );
}

/**
 * Validates a CartItem structure for security
 */
export function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;

  const obj = item as Record<string, unknown>;

  return (
    isValidProductId(obj.id as string) &&
    typeof obj.title === "string" &&
    obj.title.length <= 200 &&
    typeof obj.variant === "string" &&
    obj.variant.length <= 100 &&
    typeof obj.description === "string" &&
    obj.description.length <= 500 &&
    typeof obj.price === "string" &&
    obj.price.length <= 50 &&
    isValidPrice(obj.priceValue as number) &&
    typeof obj.image === "string" &&
    obj.image.length <= 500 &&
    typeof obj.quantity === "number" &&
    obj.quantity >= MIN_QUANTITY_PER_ITEM &&
    obj.quantity <= MAX_QUANTITY_PER_ITEM
  );
}
