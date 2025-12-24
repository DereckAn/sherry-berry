import * as fc from "fast-check";
import { vi } from "vitest";

export type Language = "en" | "es" | "fr";

/**
 * Mock localStorage with specific behavior
 */
export function mockLocalStorage(
  behavior: "working" | "unavailable" | "throws" = "working"
) {
  const storage: Record<string, string> = {};

  const mockGetItem = vi.fn((key: string) => {
    if (behavior === "unavailable") return null;
    if (behavior === "throws") throw new Error("localStorage unavailable");
    return storage[key] || null;
  });

  const mockSetItem = vi.fn((key: string, value: string) => {
    if (behavior === "throws") throw new Error("localStorage unavailable");
    if (behavior !== "unavailable") {
      storage[key] = value;
    }
  });

  const mockRemoveItem = vi.fn((key: string) => {
    if (behavior === "throws") throw new Error("localStorage unavailable");
    if (behavior !== "unavailable") {
      delete storage[key];
    }
  });

  const mockClear = vi.fn(() => {
    if (behavior === "throws") throw new Error("localStorage unavailable");
    if (behavior !== "unavailable") {
      Object.keys(storage).forEach((key) => delete storage[key]);
    }
  });

  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: mockGetItem,
      setItem: mockSetItem,
      removeItem: mockRemoveItem,
      clear: mockClear,
    },
    writable: true,
  });

  return {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
    clear: mockClear,
    storage,
  };
}

/**
 * Set localStorage to contain a specific language
 */
export function setStoredLanguage(language: Language | null) {
  const localStorage = window.localStorage;
  if (language) {
    localStorage.setItem("language", language);
  } else {
    localStorage.removeItem("language");
  }
}

/**
 * Mock server environment (no window object)
 */
export function mockServerEnvironment() {
  const originalWindow = global.window;
  // @ts-ignore
  delete global.window;

  return () => {
    global.window = originalWindow;
  };
}

/**
 * Wait for next tick (useful for testing async state updates)
 */
export function waitForNextTick() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Generate random language for property testing
 */
export function generateRandomLanguage(): Language {
  const languages: Language[] = ["en", "es", "fr"];
  return languages[Math.floor(Math.random() * languages.length)];
}

/**
 * Generate invalid language values for testing error handling
 */
export function generateInvalidLanguageValue(): string {
  const invalidValues = ["", "invalid", "de", "pt", "123", "null", "undefined"];
  return invalidValues[Math.floor(Math.random() * invalidValues.length)];
}

// Fast-check arbitraries for property-based testing

/**
 * Arbitrary for valid language values
 */
export const languageArbitrary = fc.constantFrom("en", "es", "fr");

/**
 * Arbitrary for invalid language values
 */
export const invalidLanguageArbitrary = fc.oneof(
  fc.constant(""),
  fc.constant("invalid"),
  fc.constant("de"),
  fc.constant("pt"),
  fc.integer().map(String),
  fc.constant("null"),
  fc.constant("undefined"),
  fc
    .string({ minLength: 1, maxLength: 10 })
    .filter((s) => !["en", "es", "fr"].includes(s))
);

/**
 * Arbitrary for localStorage behavior types
 */
export const localStorageBehaviorArbitrary = fc.constantFrom(
  "working",
  "unavailable",
  "throws"
);

/**
 * Arbitrary for localStorage key-value pairs
 */
export const localStorageEntryArbitrary = fc.record({
  key: fc.string({ minLength: 1, maxLength: 20 }),
  value: fc.string({ maxLength: 100 }),
});

/**
 * Property test helper that runs with minimum 100 iterations
 */
export function runPropertyTest<T>(
  arbitrary: fc.Arbitrary<T>,
  predicate: (value: T) => boolean | void,
  options: { numRuns?: number; seed?: number } = {}
) {
  const { numRuns = 100, seed } = options;

  return fc.assert(fc.property(arbitrary, predicate), {
    numRuns,
    seed,
  });
}
