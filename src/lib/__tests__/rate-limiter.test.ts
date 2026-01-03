/**
 * Rate Limiter Tests
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { paymentRateLimiter } from "../rate-limiter";

describe("Rate Limiter", () => {
  beforeEach(() => {
    // Clear rate limiter state between tests
    vi.clearAllMocks();
  });

  it("should allow requests within limit", () => {
    const identifier = "test-ip-1";

    // First request should be allowed
    const result1 = paymentRateLimiter.check(identifier);
    expect(result1.allowed).toBe(true);
    expect(result1.remaining).toBe(4);

    // Second request should be allowed
    const result2 = paymentRateLimiter.check(identifier);
    expect(result2.allowed).toBe(true);
    expect(result2.remaining).toBe(3);
  });

  it("should block requests exceeding limit", () => {
    const identifier = "test-ip-2";

    // Make 5 requests (the limit)
    for (let i = 0; i < 5; i++) {
      const result = paymentRateLimiter.check(identifier);
      expect(result.allowed).toBe(true);
    }

    // 6th request should be blocked
    const result = paymentRateLimiter.check(identifier);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("should track different identifiers separately", () => {
    const id1 = "test-ip-3";
    const id2 = "test-ip-4";

    // Make 5 requests for id1
    for (let i = 0; i < 5; i++) {
      paymentRateLimiter.check(id1);
    }

    // id1 should be blocked
    expect(paymentRateLimiter.check(id1).allowed).toBe(false);

    // id2 should still be allowed
    expect(paymentRateLimiter.check(id2).allowed).toBe(true);
  });

  it("should provide correct reset time", () => {
    const identifier = "test-ip-5";
    const now = Date.now();

    const result = paymentRateLimiter.check(identifier);

    expect(result.resetAt).toBeGreaterThan(now);
    expect(result.resetAt).toBeLessThanOrEqual(now + 60000); // Within 1 minute
  });
});
