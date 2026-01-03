/**
 * Payment Validation Utilities
 * Additional validation beyond Zod schemas
 */

import type { ShippingAddress } from "@/types/checkout";

/**
 * Validate payment amount is within acceptable range
 */
export function validatePaymentAmount(
  amount: number,
  currency: string
): { valid: boolean; error?: string } {
  const MIN_AMOUNTS: Record<string, number> = {
    USD: 100, // $1.00
    MXN: 2000, // 20 MXN
    CAD: 100, // $1.00 CAD
  };

  const MAX_AMOUNTS: Record<string, number> = {
    USD: 1000000, // $10,000
    MXN: 20000000, // 200,000 MXN
    CAD: 1000000, // $10,000 CAD
  };

  const min = MIN_AMOUNTS[currency] || 100;
  const max = MAX_AMOUNTS[currency] || 1000000;

  if (amount < min) {
    return {
      valid: false,
      error: `Minimum amount is ${(min / 100).toFixed(2)} ${currency}`,
    };
  }

  if (amount > max) {
    return {
      valid: false,
      error: `Maximum amount is ${(max / 100).toFixed(2)} ${currency}`,
    };
  }

  return { valid: true };
}

/**
 * Validate shipping address completeness
 */
export function validateShippingAddress(address: Partial<ShippingAddress>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!address.firstName?.trim()) {
    errors.push("First name is required");
  }

  if (!address.lastName?.trim()) {
    errors.push("Last name is required");
  }

  if (!address.email?.trim() || !isValidEmail(address.email)) {
    errors.push("Valid email is required");
  }

  if (!address.address1?.trim()) {
    errors.push("Address is required");
  }

  if (!address.city?.trim()) {
    errors.push("City is required");
  }

  if (!address.state?.trim()) {
    errors.push("State/Province is required");
  }

  if (!address.postalCode?.trim()) {
    errors.push("Postal code is required");
  }

  if (!address.country || !["MX", "US", "CA"].includes(address.country)) {
    errors.push("Valid country is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize string input (prevent XSS)
 */
export function sanitizeString(input: string, maxLength: number = 200): string {
  return input.trim().slice(0, maxLength).replace(/[<>]/g, ""); // Remove potential HTML tags
}

/**
 * Validate idempotency key format
 */
export function validateIdempotencyKey(key: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(key);
}

/**
 * Check if payment is suspicious (fraud detection)
 */
export function detectSuspiciousPayment(data: {
  amount: number;
  currency: string;
  email: string;
  country: string;
}): { suspicious: boolean; reasons: string[] } {
  const reasons: string[] = [];

  // Check for unusually high amounts
  const highAmounts: Record<string, number> = {
    USD: 500000, // $5,000
    MXN: 10000000, // 100,000 MXN
    CAD: 500000, // $5,000 CAD
  };

  if (data.amount > (highAmounts[data.currency] || 500000)) {
    reasons.push("Unusually high payment amount");
  }

  // Check for disposable email domains
  const disposableEmailDomains = [
    "tempmail.com",
    "throwaway.email",
    "guerrillamail.com",
    "10minutemail.com",
  ];

  const emailDomain = data.email.split("@")[1]?.toLowerCase();
  if (emailDomain && disposableEmailDomains.includes(emailDomain)) {
    reasons.push("Disposable email address detected");
  }

  // Check for mismatched currency and country
  const expectedCurrency: Record<string, string> = {
    MX: "MXN",
    US: "USD",
    CA: "CAD",
  };

  if (
    expectedCurrency[data.country] &&
    expectedCurrency[data.country] !== data.currency
  ) {
    reasons.push("Currency doesn't match shipping country");
  }

  return {
    suspicious: reasons.length > 0,
    reasons,
  };
}

/**
 * Format error message for user display
 */
export function formatPaymentError(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    // Map common Square errors to user-friendly messages
    const message = error.message.toLowerCase();

    if (message.includes("insufficient funds")) {
      return "Your card has insufficient funds. Please try a different payment method.";
    }

    if (message.includes("card declined")) {
      return "Your card was declined. Please check your card details or try a different card.";
    }

    if (message.includes("expired")) {
      return "Your card has expired. Please use a different payment method.";
    }

    if (message.includes("invalid")) {
      return "Invalid card information. Please check your details and try again.";
    }

    if (message.includes("network")) {
      return "Network error. Please check your connection and try again.";
    }

    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}
