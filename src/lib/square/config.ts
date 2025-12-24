/**
 * Square Web Payments SDK Configuration
 * Handles initialization and configuration of Square payments
 */

// Square Web Payments SDK types (we'll add these manually since they don't have an npm package)
export interface SquarePaymentsOptions {
  applicationId: string;
  locationId?: string;
  environment?: "sandbox" | "production";
}

export interface PaymentRequest {
  countryCode: string;
  currencyCode: string;
  total: {
    amount: string;
    label: string;
  };
}

export interface TokenResult {
  status: "OK" | "INVALID" | "ERROR";
  token?: string;
  errors?: Array<{
    type: string;
    field?: string;
    message: string;
  }>;
}

export interface SquarePayments {
  card: () => Promise<Card>;
  applePay: (paymentRequest: PaymentRequest) => Promise<ApplePay>;
  googlePay: (paymentRequest: PaymentRequest) => Promise<GooglePay>;
  ach: () => Promise<ACH>;
  giftCard: () => Promise<GiftCard>;
}

export interface Card {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<TokenResult>;
  destroy: () => void;
}

export interface ApplePay {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<TokenResult>;
  destroy: () => void;
}

export interface GooglePay {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<TokenResult>;
  destroy: () => void;
}

export interface ACH {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<TokenResult>;
  destroy: () => void;
}

export interface GiftCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<TokenResult>;
  destroy: () => void;
}

// Global Square object that will be available after loading the SDK
declare global {
  interface Window {
    Square?: {
      payments: (
        applicationId: string,
        locationId?: string
      ) => Promise<SquarePayments>;
    };
  }
}

/**
 * Square configuration from environment variables
 */
export const squareConfig = {
  applicationId: process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || "",
  locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || "",
  environment:
    (process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT as "sandbox" | "production") ||
    "sandbox",
  // Server-side access token (never expose to client)
  accessToken: process.env.SQUARE_ACCESS_TOKEN || "",
} as const;

/**
 * Square Web Payments SDK CDN URL
 */
export const SQUARE_SDK_URL =
  squareConfig.environment === "sandbox"
    ? "https://sandbox.web.squarecdn.com/v1/square.js"
    : "https://web.squarecdn.com/v1/square.js";

/**
 * Validates that required Square configuration is present
 */
export function validateSquareConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!squareConfig.applicationId) {
    errors.push("NEXT_PUBLIC_SQUARE_APPLICATION_ID is required");
  }

  if (!squareConfig.locationId) {
    errors.push("NEXT_PUBLIC_SQUARE_LOCATION_ID is required");
  }

  if (!squareConfig.accessToken) {
    errors.push("SQUARE_ACCESS_TOKEN is required (server-side only)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Loads the Square Web Payments SDK dynamically
 */
export function loadSquareSDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.Square) {
      resolve();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      `script[src="${SQUARE_SDK_URL}"]`
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", reject);
      return;
    }

    // Create and load script
    const script = document.createElement("script");
    script.src = SQUARE_SDK_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Square SDK"));

    document.head.appendChild(script);
  });
}

/**
 * Initializes Square Payments with configuration
 */
export async function initializeSquarePayments(): Promise<SquarePayments> {
  // Validate configuration
  const { isValid, errors } = validateSquareConfig();
  if (!isValid) {
    throw new Error(`Square configuration invalid: ${errors.join(", ")}`);
  }

  // Load SDK if not already loaded
  await loadSquareSDK();

  // Initialize payments
  if (!window.Square) {
    throw new Error("Square SDK failed to load");
  }

  return await window.Square.payments(
    squareConfig.applicationId,
    squareConfig.locationId
  );
}

/**
 * Default payment request for digital wallets
 */
export function createPaymentRequest(
  amount: number,
  currency: string = "USD"
): PaymentRequest {
  return {
    countryCode: "US", // TODO: Make this dynamic based on shipping country
    currencyCode: currency,
    total: {
      amount: amount.toFixed(2),
      label: "Sherry Berry Candles",
    },
  };
}
