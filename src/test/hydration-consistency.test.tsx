import { LanguageProvider, useLanguage } from "@/shared/i18n/LanguageProvider";
import { render, screen } from "@testing-library/react";
import * as fc from "fast-check";
import { beforeEach, describe, expect, it } from "vitest";
import {
  languageArbitrary,
  mockLocalStorage,
  runPropertyTest,
  type Language,
} from "./utils";

// Test component that displays language state
function LanguageDisplay() {
  const { language, isHydrated } = useLanguage();

  return (
    <div>
      <div data-testid="language">{language}</div>
      <div data-testid="hydrated">{isHydrated.toString()}</div>
    </div>
  );
}

describe("Hydration State Consistency", () => {
  beforeEach(() => {
    // Reset localStorage before each test
    mockLocalStorage("working");
    localStorage.clear();
  });

  it("Property 1: Hydration State Consistency - For any stored language, initial render should always use default language", () => {
    /**
     * Feature: hydration-fix, Property 1: Hydration State Consistency
     * Validates: Requirements 1.2, 1.4
     */

    runPropertyTest(
      languageArbitrary,
      (storedLanguage: Language) => {
        // Set up localStorage with a stored language
        localStorage.setItem("sb-language", storedLanguage);

        // Render the component
        render(
          <LanguageProvider>
            <LanguageDisplay />
          </LanguageProvider>
        );

        // Initial render should ALWAYS show default language ("es")
        // regardless of what's stored in localStorage
        const languageElement = screen.getByTestId("language");
        expect(languageElement.textContent).toBe("es");

        // Initial render should show isHydrated as false
        const hydratedElement = screen.getByTestId("hydrated");
        expect(hydratedElement.textContent).toBe("false");
      },
      { numRuns: 100 }
    );
  });

  it("Property 1b: Server environment consistency - Should work without window object", () => {
    /**
     * Feature: hydration-fix, Property 1: Hydration State Consistency
     * Validates: Requirements 1.2, 1.4
     */

    runPropertyTest(
      languageArbitrary,
      (storedLanguage: Language) => {
        // Mock server environment (no window)
        const originalWindow = global.window;
        // @ts-ignore
        delete global.window;

        try {
          // This should not throw and should render with default language
          render(
            <LanguageProvider>
              <LanguageDisplay />
            </LanguageProvider>
          );

          const languageElement = screen.getByTestId("language");
          expect(languageElement.textContent).toBe("es");

          const hydratedElement = screen.getByTestId("hydrated");
          expect(hydratedElement.textContent).toBe("false");
        } finally {
          // Restore window
          global.window = originalWindow;
        }
      },
      { numRuns: 50 }
    );
  });

  it("Property 1c: localStorage unavailable consistency - Should handle localStorage errors gracefully", () => {
    /**
     * Feature: hydration-fix, Property 1: Hydration State Consistency
     * Validates: Requirements 1.2, 1.4
     */

    runPropertyTest(
      fc.constantFrom("throws", "unavailable"),
      (behavior: "throws" | "unavailable") => {
        // Mock localStorage with error behavior
        mockLocalStorage(behavior);

        // This should not throw and should render with default language
        render(
          <LanguageProvider>
            <LanguageDisplay />
          </LanguageProvider>
        );

        const languageElement = screen.getByTestId("language");
        expect(languageElement.textContent).toBe("es");

        const hydratedElement = screen.getByTestId("hydrated");
        expect(hydratedElement.textContent).toBe("false");
      },
      { numRuns: 100 }
    );
  });
});
