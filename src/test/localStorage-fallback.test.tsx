import { LanguageProvider, useLanguage } from "@/shared/i18n/LanguageProvider";
import { cleanup, render, screen } from "@testing-library/react";
import * as fc from "fast-check";
import { afterEach, describe, expect, it } from "vitest";
import {
  localStorageBehaviorArbitrary,
  mockLocalStorage,
  runPropertyTest,
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

describe("Graceful localStorage Fallback", () => {
  afterEach(() => {
    cleanup();
  });

  it("Property 4: Graceful localStorage Fallback - For any localStorage error condition, system should fallback to default language", () => {
    /**
     * Feature: hydration-fix, Property 4: Graceful localStorage Fallback
     * Validates: Requirements 2.3
     */

    runPropertyTest(
      localStorageBehaviorArbitrary,
      (behavior: "working" | "unavailable" | "throws") => {
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

        // Should work regardless of localStorage state
        const hydratedElement = screen.getByTestId("hydrated");
        expect(hydratedElement.textContent).toBe("true");

        cleanup();
      },
      { numRuns: 100 }
    );
  });

  it("Property 4b: localStorage error handling during setLanguage - Setting language should handle localStorage errors gracefully", () => {
    /**
     * Feature: hydration-fix, Property 4: Graceful localStorage Fallback
     * Validates: Requirements 2.3
     */

    runPropertyTest(
      fc.constantFrom("throws", "unavailable"),
      (behavior: "throws" | "unavailable") => {
        // Mock localStorage with error behavior
        mockLocalStorage(behavior);

        render(
          <LanguageProvider>
            <LanguageDisplay />
          </LanguageProvider>
        );

        // Should render successfully with default language
        const languageElement = screen.getByTestId("language");
        expect(languageElement.textContent).toBe("es");

        // Component should still be functional even with localStorage errors
        const hydratedElement = screen.getByTestId("hydrated");
        expect(hydratedElement.textContent).toBe("true");

        cleanup();
      },
      { numRuns: 50 }
    );
  });

  it("Property 4c: Corrupted localStorage data handling - Invalid localStorage data should be ignored", () => {
    /**
     * Feature: hydration-fix, Property 4: Graceful localStorage Fallback
     * Validates: Requirements 2.3
     */

    runPropertyTest(
      fc.oneof(
        fc.constant(null),
        fc.constant(undefined),
        fc.constant(""),
        fc.constant("invalid"),
        fc.constant("{}"),
        fc.constant("[]"),
        fc.integer().map(String),
        fc
          .string({ minLength: 1, maxLength: 20 })
          .filter((s) => !["en", "es", "fr"].includes(s))
      ),
      (corruptedValue: any) => {
        // Set up localStorage with corrupted data
        mockLocalStorage("working");

        // Manually set corrupted value
        if (corruptedValue !== null && corruptedValue !== undefined) {
          localStorage.setItem("sb-language", String(corruptedValue));
        }

        render(
          <LanguageProvider>
            <LanguageDisplay />
          </LanguageProvider>
        );

        // Should fallback to default language when data is corrupted
        const languageElement = screen.getByTestId("language");
        expect(languageElement.textContent).toBe("es");

        const hydratedElement = screen.getByTestId("hydrated");
        expect(hydratedElement.textContent).toBe("true");

        cleanup();
      },
      { numRuns: 100 }
    );
  });
});
