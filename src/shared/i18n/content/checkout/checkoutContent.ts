/**
 * Checkout Content
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/checkout/en.json";
import es from "../../../../../content/checkout/es.json";
import fr from "../../../../../content/checkout/fr.json";

export type CheckoutContent = {
  page: {
    title: string;
    emptyCart: {
      title: string;
      link: string;
    };
    paymentLocked: {
      title: string;
      description: string;
    };
  };
  shippingForm: {
    title: string;
    subtitle: string;
    fields: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address1: string;
      address2: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      selectCountry: string;
    };
    placeholders: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address1: string;
      address2: string;
      city: string;
      state: string;
      postalCode: string;
    };
    buttons: {
      calculate: string;
      calculating: string;
    };
    shippingMethod: string;
    estimatedDelivery: string;
  };
  summary: {
    title: string;
    itemsCount: string;
    emptyCart: {
      title: string;
      description: string;
    };
    totals: {
      subtotal: string;
      shipping: string;
      taxes: string;
      total: string;
      free: string;
      calculatedNext: string;
      excludingNote: string;
    };
    quantity: string;
    actions: {
      decrease: string;
      increase: string;
      remove: string;
    };
  };
};

export const CHECKOUT_CONTENT: Record<Language, CheckoutContent> = {
  en: en as CheckoutContent,
  es: es as CheckoutContent,
  fr: fr as CheckoutContent,
};
