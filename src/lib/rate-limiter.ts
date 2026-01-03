/**
 * Simple in-memory rate limiter
 * For production, use Redis or a dedicated service
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 5, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;

    // Cleanup old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  check(identifier: string): {
    allowed: boolean;
    remaining: number;
    resetAt: number;
  } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    // No previous requests or window expired
    if (!entry || now > entry.resetAt) {
      this.requests.set(identifier, {
        count: 1,
        resetAt: now + this.windowMs,
      });
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetAt: now + this.windowMs,
      };
    }

    // Within window
    if (entry.count < this.maxRequests) {
      entry.count++;
      return {
        allowed: true,
        remaining: this.maxRequests - entry.count,
        resetAt: entry.resetAt,
      };
    }

    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetAt) {
        this.requests.delete(key);
      }
    }
  }
}

// Export singleton instance
// 5 requests per minute per IP
export const paymentRateLimiter = new RateLimiter(5, 60000);
