/**
 * Square Payments Utilities
 * Helper functions for processing payments with Square
 */

import {
  createPaymentRequest,
  initializeSquarePayments,
  type TokenResult,
} from "./config";

/**
 * Payment method types supported by our application
 */
export type PaymentMethodType =
  | "card"
  | "apple_pay"
  | "google_pay"
  | "ach"
  | "gift_card";

/**
 * Payment form state
 */
export interface PaymentFormState {
  isLoading: boolean;
  error: string | null;
  paymentMethod: PaymentMethodType | null;
}

/**
 * Payment processing result
 */
export interface PaymentResult {
  success: boolean;
  token?: string;
  error?: string;
  errors?: Array<{
    type: string;
    field?: string;
    message: string;
  }>;
}

/**
 * Square Payments Manager
 * Handles initialization and management of Square payment methods
 */
export class SquarePaymentsManager {
  private payments: any = null;
  private activePaymentMethods: Map<PaymentMethodType, any> = new Map();

  /**
   * Initialize the Square Payments SDK
   */
  async initialize(): Promise<void> {
    try {
      this.payments = await initializeSquarePayments();
    } catch (error) {
      console.error("Failed to initialize Square Payments:", error);
      throw error;
    }
  }

  /**
   * Create and attach a card payment method
   */
  async createCardPayment(containerId: string): Promise<void> {
    if (!this.payments) {
      throw new Error("Square Payments not initialized");
    }

    try {
      const card = await this.payments.card();
      await card.attach(`#${containerId}`);
      this.activePaymentMethods.set("card", card);
    } catch (error) {
      console.error("Failed to create card payment:", error);
      throw error;
    }
  }

  /**
   * Create and attach Apple Pay
   */
  async createApplePay(
    containerId: string,
    amount: number,
    currency: string = "USD"
  ): Promise<void> {
    if (!this.payments) {
      throw new Error("Square Payments not initialized");
    }

    try {
      const paymentRequest = createPaymentRequest(amount, currency);
      const applePay = await this.payments.applePay(paymentRequest);
      await applePay.attach(`#${containerId}`);
      this.activePaymentMethods.set("apple_pay", applePay);
    } catch (error) {
      console.error("Failed to create Apple Pay:", error);
      throw error;
    }
  }

  /**
   * Create and attach Google Pay
   */
  async createGooglePay(
    containerId: string,
    amount: number,
    currency: string = "USD"
  ): Promise<void> {
    if (!this.payments) {
      throw new Error("Square Payments not initialized");
    }

    try {
      const paymentRequest = createPaymentRequest(amount, currency);
      const googlePay = await this.payments.googlePay(paymentRequest);
      await googlePay.attach(`#${containerId}`);
      this.activePaymentMethods.set("google_pay", googlePay);
    } catch (error) {
      console.error("Failed to create Google Pay:", error);
      throw error;
    }
  }

  /**
   * Tokenize a payment method
   */
  async tokenizePayment(
    paymentMethod: PaymentMethodType
  ): Promise<PaymentResult> {
    const method = this.activePaymentMethods.get(paymentMethod);
    if (!method) {
      return {
        success: false,
        error: `Payment method ${paymentMethod} not found`,
      };
    }

    try {
      const result: TokenResult = await method.tokenize();

      if (result.status === "OK" && result.token) {
        return {
          success: true,
          token: result.token,
        };
      } else {
        return {
          success: false,
          error: "Tokenization failed",
          errors: result.errors,
        };
      }
    } catch (error) {
      console.error("Tokenization error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Destroy all payment methods and clean up
   */
  destroy(): void {
    this.activePaymentMethods.forEach((method) => {
      try {
        method.destroy();
      } catch (error) {
        console.error("Error destroying payment method:", error);
      }
    });
    this.activePaymentMethods.clear();
    this.payments = null;
  }

  /**
   * Check if a specific payment method is available
   */
  hasPaymentMethod(paymentMethod: PaymentMethodType): boolean {
    return this.activePaymentMethods.has(paymentMethod);
  }
}

/**
 * Utility function to format Square errors for display
 */
export function formatSquareErrors(
  errors?: Array<{ type: string; field?: string; message: string }>
): string {
  if (!errors || errors.length === 0) {
    return "An unknown error occurred";
  }

  return errors
    .map((error) => {
      if (error.field) {
        return `${error.field}: ${error.message}`;
      }
      return error.message;
    })
    .join(", ");
}

/**
 * Validate payment amount
 */
export function validatePaymentAmount(amount: number): {
  isValid: boolean;
  error?: string;
} {
  if (amount <= 0) {
    return { isValid: false, error: "Amount must be greater than 0" };
  }

  if (amount > 999999.99) {
    return { isValid: false, error: "Amount is too large" };
  }

  // Check for reasonable decimal places (max 2)
  if (Math.round(amount * 100) !== amount * 100) {
    return {
      isValid: false,
      error: "Amount can only have up to 2 decimal places",
    };
  }

  return { isValid: true };
}
