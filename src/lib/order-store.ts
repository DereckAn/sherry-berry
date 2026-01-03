/**
 * In-memory Order Store
 * Stores order details temporarily for confirmation page
 * In production, use a database (PostgreSQL, MongoDB, etc.)
 */

interface OrderDetails {
  paymentId: string;
  orderId?: string;
  receiptUrl?: string;
  orderDetails: {
    items: Array<{
      id: string;
      title: string;
      variant: string;
      quantity: number;
      priceValue: number;
    }>;
    shipping: {
      address: {
        firstName: string;
        lastName: string;
        email: string;
        address1: string;
        address2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
    };
    totals: {
      subtotal: number;
      shipping: number;
      tax: number;
      total: number;
      currency: string;
    };
  };
}

class OrderStore {
  private store: Map<string, OrderDetails> = new Map();

  /**
   * Store order details by key
   * Auto-cleanup after 24 hours
   */
  set(key: string, orderDetails: OrderDetails): void {
    this.store.set(key, orderDetails);

    // Auto-cleanup after 24 hours
    setTimeout(() => {
      this.store.delete(key);
    }, 24 * 60 * 60 * 1000);
  }

  /**
   * Get order details by key
   */
  get(key: string): OrderDetails | undefined {
    return this.store.get(key);
  }

  /**
   * Delete order details by key
   */
  delete(key: string): void {
    this.store.delete(key);
  }

  /**
   * Check if key exists
   */
  has(key: string): boolean {
    return this.store.has(key);
  }

  /**
   * Get store size (for debugging)
   */
  size(): number {
    return this.store.size;
  }
}

// Export singleton instance
export const orderStore = new OrderStore();
