/**
 * Square Web SDK Type Definitions
 */

interface SquareCard {
  attach: (elementId: string | HTMLElement) => Promise<void>;
  destroy: () => void;
  tokenize: () => Promise<{
    status: string;
    token?: string;
    errors?: Array<{ message: string }>;
  }>;
}

interface SquarePayments {
  card: () => Promise<SquareCard>;
}

declare global {
  interface Window {
    Square?: {
      payments: (
        applicationId: string,
        locationId: string
      ) => Promise<SquarePayments>;
    };
  }
}

export {};
