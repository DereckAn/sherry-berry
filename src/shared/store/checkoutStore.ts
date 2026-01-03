/**
 * Checkout Store - Manages checkout state and calculations
 * Integrates with cart store and handles shipping/tax calculations
 */

import { calculateTax } from "@/lib/taxes/calculator";
import type {
  CheckoutState,
  CheckoutStep,
  OrderTotals,
  PaymentInfo,
  ShippingAddress,
  ShippingRate,
  TaxInfo,
} from "@/types/checkout";
import { create } from "zustand";
import { useCartStore } from "./cartStore";

interface CheckoutActions {
  /** Set current checkout step */
  setStep: (step: CheckoutStep) => void;

  /** Update shipping information */
  updateShipping: (
    address: ShippingAddress,
    rate: ShippingRate
  ) => Promise<void>;

  /** Update payment information */
  updatePayment: (payment: PaymentInfo) => void;

  /** Calculate and update totals */
  calculateTotals: () => Promise<void>;

  /** Set loading state */
  setLoading: (loading: boolean) => void;

  /** Set error message */
  setError: (error: string | undefined) => void;

  /** Reset checkout state */
  reset: () => void;

  /** Get current totals */
  getTotals: () => OrderTotals;
}

type CheckoutStore = CheckoutState & CheckoutActions;

const initialState: CheckoutState = {
  currentStep: "cart",
  items: [],
  totals: {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    currency: "USD",
  },
  isLoading: false,
};

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
  ...initialState,

  setStep: (step) => {
    set({ currentStep: step });
  },

  updateShipping: async (address, rate) => {
    set({ isLoading: true, error: undefined });

    try {
      // Update shipping info
      const shippingInfo = {
        address,
        selectedRate: rate,
        availableRates: [rate], // In a real app, this would be all calculated rates
      };

      set({
        shipping: shippingInfo,
      });

      // Recalculate totals with new shipping
      await get().calculateTotals();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to update shipping",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updatePayment: (payment) => {
    set({ payment });
  },

  calculateTotals: async () => {
    const state = get();
    const cartItems = useCartStore.getState().items;

    // Calculate subtotal from cart
    const subtotal = cartItems.reduce(
      (total, item) => total + item.priceValue * item.quantity,
      0
    );

    let shipping = 0;
    let tax = 0;
    let taxInfo: TaxInfo | undefined;

    // Add shipping cost if available
    if (state.shipping?.selectedRate) {
      shipping = state.shipping.selectedRate.price;
    }

    // Calculate tax if shipping address is available
    if (state.shipping?.address) {
      try {
        const taxableAmount = subtotal + shipping;
        taxInfo = await calculateTax(state.shipping.address, taxableAmount);
        tax = taxInfo.amount;
      } catch (error) {
        console.error("Tax calculation failed:", error);
        // Continue without tax if calculation fails
      }
    }

    const total = subtotal + shipping + tax;
    const currency = state.shipping?.selectedRate?.currency || "USD";

    const totals: OrderTotals = {
      subtotal,
      shipping,
      tax,
      total,
      currency,
    };

    set({
      items: cartItems,
      tax: taxInfo,
      totals,
    });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  reset: () => {
    set(initialState);
  },

  getTotals: () => {
    return get().totals;
  },
}));

// Computed selectors
export const checkoutSelectors = {
  /** Check if checkout is ready for payment */
  isReadyForPayment: (state: CheckoutState): boolean => {
    return !!(
      state.items.length > 0 &&
      state.shipping?.address &&
      state.shipping?.selectedRate &&
      !state.isLoading &&
      !state.error
    );
  },

  /** Get formatted total price */
  getFormattedTotal: (state: CheckoutState): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: state.totals.currency,
    }).format(state.totals.total);
  },

  /** Get tax display text */
  getTaxDisplayText: (state: CheckoutState): string => {
    if (!state.tax) return "Tax";
    return `${state.tax.name} (${(state.tax.rate * 100).toFixed(2)}%)`;
  },
};

// Hooks for common selectors
export const useCheckoutTotals = () =>
  useCheckoutStore((state) => state.totals);

export const useCheckoutStep = () =>
  useCheckoutStore((state) => state.currentStep);

export const useCheckoutLoading = () =>
  useCheckoutStore((state) => state.isLoading);

export const useCheckoutError = () => useCheckoutStore((state) => state.error);

export const useIsReadyForPayment = () =>
  useCheckoutStore((state) => checkoutSelectors.isReadyForPayment(state));
