/**
 * Checkout Types - Complete checkout system types
 * Includes Order, Shipping, Payment, and validation schemas
 */

import { z } from "zod";
import type { CartItem } from "../shared/types/cart";

// ============================================================================
// ENUMS AND CONSTANTS
// ============================================================================

/** Supported countries for shipping */
export const SUPPORTED_COUNTRIES = ["MX", "US", "CA"] as const;
export type Country = (typeof SUPPORTED_COUNTRIES)[number];

/** Shipping methods available */
export const SHIPPING_METHODS = ["standard", "express"] as const;
export type ShippingMethod = (typeof SHIPPING_METHODS)[number];

/** Order status tracking */
export const ORDER_STATUS = [
  "draft",
  "pending_payment",
  "processing",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "failed",
] as const;
export type OrderStatus = (typeof ORDER_STATUS)[number];

/** Payment status */
export const PAYMENT_STATUS = [
  "idle",
  "processing",
  "succeeded",
  "failed",
  "cancelled",
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUS)[number];

// ============================================================================
// SHIPPING INTERFACES
// ============================================================================

/** Shipping address information */
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: Country;
}

/** Shipping rate information */
export interface ShippingRate {
  method: ShippingMethod;
  name: string;
  description: string;
  price: number;
  currency: string;
  estimatedDays: string;
}

/** Shipping information combining address and selected rate */
export interface ShippingInfo {
  address: ShippingAddress;
  selectedRate: ShippingRate;
  availableRates: ShippingRate[];
}

// ============================================================================
// TAX INTERFACES
// ============================================================================

/** Tax calculation result */
export interface TaxInfo {
  rate: number;
  amount: number;
  name: string;
  description: string;
  country: Country;
  region?: string;
}

// ============================================================================
// PAYMENT INTERFACES
// ============================================================================

/** Payment method information */
export interface PaymentMethod {
  type: "card" | "digital_wallet" | "bank_transfer";
  provider: "square" | "paypal" | "apple_pay" | "google_pay";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

/** Payment information */
export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  squarePaymentId?: string;
  amount: number;
  currency: string;
  processedAt?: Date;
  errorMessage?: string;
}

// ============================================================================
// ORDER INTERFACES
// ============================================================================

/** Order totals breakdown */
export interface OrderTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
}

/** Complete order information */
export interface Order {
  id: string;
  status: OrderStatus;
  items: CartItem[];
  shipping: ShippingInfo;
  tax: TaxInfo;
  payment: PaymentInfo;
  totals: OrderTotals;
  createdAt: Date;
  updatedAt: Date;
  idempotencyKey: string;
  customerNotes?: string;
}

/** Order creation request */
export interface CreateOrderRequest {
  items: CartItem[];
  shipping: ShippingInfo;
  customerNotes?: string;
}

// ============================================================================
// CHECKOUT STATE INTERFACES
// ============================================================================

/** Current step in checkout process */
export const CHECKOUT_STEPS = [
  "cart",
  "shipping",
  "payment",
  "confirmation",
] as const;
export type CheckoutStep = (typeof CHECKOUT_STEPS)[number];

/** Complete checkout state */
export interface CheckoutState {
  currentStep: CheckoutStep;
  items: CartItem[];
  shipping?: ShippingInfo;
  tax?: TaxInfo;
  payment?: PaymentInfo;
  totals: OrderTotals;
  order?: Order;
  isLoading: boolean;
  error?: string;
}

// ============================================================================
// VALIDATION SCHEMAS (ZOD)
// ============================================================================

/** Shipping address validation schema */
export const ShippingAddressSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
  address1: z.string().min(1, "Address is required").max(100),
  address2: z.string().max(100).optional(),
  city: z.string().min(1, "City is required").max(50),
  state: z.string().min(1, "State/Province is required").max(50),
  postalCode: z.string().min(3, "Postal code is required").max(20),
  country: z.enum(SUPPORTED_COUNTRIES, {
    message: "Please select a valid country",
  }),
});

/** Shipping method selection schema */
export const ShippingMethodSchema = z.object({
  method: z.enum(SHIPPING_METHODS),
  address: ShippingAddressSchema,
});

/** Customer notes schema */
export const CustomerNotesSchema = z.object({
  customerNotes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
});

/** Order creation validation schema */
export const CreateOrderSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number().min(1).max(10),
      })
    )
    .min(1, "At least one item is required"),
  shipping: ShippingMethodSchema,
  customerNotes: z.string().max(500).optional(),
});

// ============================================================================
// UTILITY TYPES
// ============================================================================

/** Type for form validation errors */
export type ValidationErrors<T> = {
  [K in keyof T]?: string[];
};

/** Type for API responses */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: ValidationErrors<T>;
}

/** Type for checkout form data */
export interface CheckoutFormData {
  shipping: z.infer<typeof ShippingAddressSchema>;
  shippingMethod: ShippingMethod;
  customerNotes?: string;
}

// ============================================================================
// CONSTANTS FOR BUSINESS LOGIC
// ============================================================================

/** Free shipping thresholds by country (in local currency) */
export const FREE_SHIPPING_THRESHOLDS: Record<Country, number> = {
  MX: 1000, // 1000 MXN
  US: 75, // 75 USD
  CA: 100, // 100 CAD
};

/** Default currency by country */
export const COUNTRY_CURRENCIES: Record<Country, string> = {
  MX: "MXN",
  US: "USD",
  CA: "CAD",
};

/** Country display names */
export const COUNTRY_NAMES: Record<Country, string> = {
  MX: "Mexico",
  US: "United States",
  CA: "Canada",
};

/** Shipping method display names */
export const SHIPPING_METHOD_NAMES: Record<ShippingMethod, string> = {
  standard: "Standard Shipping",
  express: "Express Shipping",
};

// ============================================================================
// TYPE GUARDS
// ============================================================================

/** Type guard for Country */
export function isValidCountry(country: string): country is Country {
  return SUPPORTED_COUNTRIES.includes(country as Country);
}

/** Type guard for ShippingMethod */
export function isValidShippingMethod(
  method: string
): method is ShippingMethod {
  return SHIPPING_METHODS.includes(method as ShippingMethod);
}

/** Type guard for OrderStatus */
export function isValidOrderStatus(status: string): status is OrderStatus {
  return ORDER_STATUS.includes(status as OrderStatus);
}

/** Type guard for PaymentStatus */
export function isValidPaymentStatus(status: string): status is PaymentStatus {
  return PAYMENT_STATUS.includes(status as PaymentStatus);
}
