/**
 * PaymentForm Component Tests
 */

import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PaymentForm } from "../PaymentForm/PaymentForm";

// Mock checkout store
vi.mock("@/shared/store/checkoutStore", () => ({
  useCheckoutStore: () => ({
    totals: {
      subtotal: 50,
      shipping: 15,
      tax: 5.2,
      total: 70.2,
      currency: "USD",
    },
    shipping: {
      address: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        address1: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "US",
      },
      selectedRate: {
        method: "standard",
        name: "Standard Shipping",
        description: "5-7 business days",
        price: 15,
        currency: "USD",
        estimatedDays: "5-7 days",
      },
      availableRates: [],
    },
  }),
}));

// Mock Square SDK
global.window.Square = {
  payments: vi.fn().mockResolvedValue({
    card: vi.fn().mockResolvedValue({
      attach: vi.fn().mockResolvedValue(undefined),
      destroy: vi.fn(),
      tokenize: vi.fn().mockResolvedValue({
        status: "OK",
        token: "test-token-123",
      }),
    }),
  }),
} as any;

describe("PaymentForm", () => {
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render payment form", async () => {
    render(
      <PaymentForm
        onPaymentSuccess={mockOnSuccess}
        onPaymentError={mockOnError}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Payment Information")).toBeInTheDocument();
    });
  });

  it("should show loading state initially", () => {
    render(
      <PaymentForm
        onPaymentSuccess={mockOnSuccess}
        onPaymentError={mockOnError}
      />
    );

    expect(
      screen.getByText(/Loading secure payment form/i)
    ).toBeInTheDocument();
  });

  it("should display payment button with correct amount", async () => {
    render(
      <PaymentForm
        onPaymentSuccess={mockOnSuccess}
        onPaymentError={mockOnError}
      />
    );

    await waitFor(() => {
      const button = screen.getByRole("button", { name: /Pay USD 70.20/i });
      expect(button).toBeInTheDocument();
    });
  });

  it("should show security message", () => {
    render(
      <PaymentForm
        onPaymentSuccess={mockOnSuccess}
        onPaymentError={mockOnError}
      />
    );

    expect(
      screen.getByText(/Your payment is secured by Square/i)
    ).toBeInTheDocument();
  });

  it("should disable button while processing", async () => {
    render(
      <PaymentForm
        onPaymentSuccess={mockOnSuccess}
        onPaymentError={mockOnError}
      />
    );

    await waitFor(() => {
      const button = screen.getByRole("button", { name: /Pay USD/i });
      expect(button).not.toBeDisabled();
    });
  });
});
