/**
 * Shipping Rate Calculator
 * Calculates shipping rates for Mexico, USA, and Canada
 */

import type {
  Country,
  ShippingAddress,
  ShippingMethod,
  ShippingRate,
} from "@/types/checkout";
import {
  COUNTRY_CURRENCIES,
  FREE_SHIPPING_THRESHOLDS,
  SHIPPING_METHOD_NAMES,
} from "@/types/checkout";

// Shipping rates by country and method (in local currency)
const SHIPPING_RATES: Record<
  Country,
  Record<ShippingMethod, { price: number; estimatedDays: string }>
> = {
  MX: {
    standard: { price: 150, estimatedDays: "5-7 business days" },
    express: { price: 300, estimatedDays: "2-3 business days" },
  },
  US: {
    standard: { price: 15, estimatedDays: "5-7 business days" },
    express: { price: 35, estimatedDays: "2-3 business days" },
  },
  CA: {
    standard: { price: 20, estimatedDays: "5-7 business days" },
    express: { price: 40, estimatedDays: "2-3 business days" },
  },
};

// Method descriptions by country
const SHIPPING_DESCRIPTIONS: Record<Country, Record<ShippingMethod, string>> = {
  MX: {
    standard: "Envío estándar por Correos de México",
    express: "Envío express por DHL/FedEx",
  },
  US: {
    standard: "Standard shipping via USPS",
    express: "Express shipping via FedEx/UPS",
  },
  CA: {
    standard: "Standard shipping via Canada Post",
    express: "Express shipping via Purolator/FedEx",
  },
};

/**
 * Calculates available shipping rates for a given address
 */
export async function calculateShippingRates(
  address: ShippingAddress,
  cartTotal?: number
): Promise<ShippingRate[]> {
  // Validate country
  if (!address.country || !SHIPPING_RATES[address.country]) {
    throw new Error(`Shipping not available to ${address.country}`);
  }

  const country = address.country;
  const currency = COUNTRY_CURRENCIES[country];
  const rates = SHIPPING_RATES[country];
  const descriptions = SHIPPING_DESCRIPTIONS[country];

  // Check for free shipping eligibility
  const freeShippingThreshold = FREE_SHIPPING_THRESHOLDS[country];
  const qualifiesForFreeShipping =
    cartTotal && cartTotal >= freeShippingThreshold;

  const shippingRates: ShippingRate[] = [];

  // Add standard shipping
  shippingRates.push({
    method: "standard",
    name: SHIPPING_METHOD_NAMES.standard,
    description: descriptions.standard,
    price: qualifiesForFreeShipping ? 0 : rates.standard.price,
    currency,
    estimatedDays: rates.standard.estimatedDays,
  });

  // Add express shipping (never free)
  shippingRates.push({
    method: "express",
    name: SHIPPING_METHOD_NAMES.express,
    description: descriptions.express,
    price: rates.express.price,
    currency,
    estimatedDays: rates.express.estimatedDays,
  });

  return shippingRates;
}

/**
 * Gets the shipping rate for a specific method and country
 */
export function getShippingRate(
  country: Country,
  method: ShippingMethod,
  cartTotal?: number
): ShippingRate {
  const currency = COUNTRY_CURRENCIES[country];
  const rates = SHIPPING_RATES[country];
  const descriptions = SHIPPING_DESCRIPTIONS[country];

  // Check for free shipping eligibility (only for standard)
  const freeShippingThreshold = FREE_SHIPPING_THRESHOLDS[country];
  const qualifiesForFreeShipping =
    method === "standard" && cartTotal && cartTotal >= freeShippingThreshold;

  return {
    method,
    name: SHIPPING_METHOD_NAMES[method],
    description: descriptions[method],
    price: qualifiesForFreeShipping ? 0 : rates[method].price,
    currency,
    estimatedDays: rates[method].estimatedDays,
  };
}

/**
 * Validates if shipping is available to a specific country
 */
export function isShippingAvailable(country: string): boolean {
  return country in SHIPPING_RATES;
}

/**
 * Gets free shipping threshold for a country
 */
export function getFreeShippingThreshold(country: Country): number {
  return FREE_SHIPPING_THRESHOLDS[country];
}

/**
 * Checks if cart qualifies for free shipping
 */
export function qualifiesForFreeShipping(
  country: Country,
  cartTotal: number
): boolean {
  return cartTotal >= FREE_SHIPPING_THRESHOLDS[country];
}

/**
 * Formats shipping rate display text
 */
export function formatShippingRate(rate: ShippingRate): string {
  if (rate.price === 0) {
    return "FREE";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: rate.currency,
  }).format(rate.price);
}

/**
 * Estimates delivery date based on shipping method
 */
export function estimateDeliveryDate(
  method: ShippingMethod,
  country: Country
): { min: Date; max: Date } {
  const today = new Date();
  const rates = SHIPPING_RATES[country];

  let minDays: number;
  let maxDays: number;

  if (method === "standard") {
    minDays = 5;
    maxDays = 7;
  } else {
    minDays = 2;
    maxDays = 3;
  }

  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDays);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + maxDays);

  return { min: minDate, max: maxDate };
}
