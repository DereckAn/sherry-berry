import { LanguageProvider, useLanguage } from "@/shared/i18n/LanguageProvider";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import * as fc from "fast-check";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
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

describe("Post-Hydration Language Restoration", () => {
  beforeEach(() => {
    // Reset localStorage before each test
    mockLocalStorage("working");
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("Property 2: Post-Hydration Language Restoration - For any stored language, language should be restored after hydration", async () => {
    /**
     * Feature: hydration-fix, Property 2: Post-Hydration Language Restoration
     * Validates: Requirements 1.3, 2.2
     */

    await runPropertyTest(
      languageArbitrary,
      async (storedLanguage: Language) => {
        // Set up localStorage with a stored language
        localStorage.setItem("sb-language", storedLanguage);

        // Render the component
        render(
          <LanguageProvider>
            <LanguageDisplay />
          </LanguageProvider>
        );

        // Initial render should show default language ("es")
        const languageElement = screen.getByTestId("language");
        expect(languageElement.textContent).toBe("es");

        // Wait for hydration to complete and language to be restored
        await waitFor(
          () => {
            const hydratedElement = screen.getByTestId("hydrated");
            expect(hydratedElement.textContent).toBe("true");
          },
          { timeout: 1000 }
        );

        // After hydration, language should be restored to stored value
        await waitFor(
          () => {
            const languageElement = screen.getByTestId("language");
            expect(languageElement.textContent).toBe(storedLanguage);
          },
          { timeout: 1000 }
        );

        cleanup();
      },
      { numRuns: 100 }
    );
  });

  it("Property 2b: Default language preservation - When stored language is same as default, no change should occur", async () => {
    /**
     * Feature: hydration-fix, Property 2: Post-Hydration Language Restoration
     * Validates: Requirements 1.3, 2.2
     */

    // Store default language
    localStorage.setItem("sb-language", "es");

    render(
      <LanguageProvider>
        <LanguageDisplay />
      </LanguageProvider>
    );

    // Should start with default language
    const languageElement = screen.getByTestId("language");
    expect(languageElement.textContent).toBe("es");

    // Wait for hydration
    await waitFor(
      () => {
        const hydratedElement = screen.getByTestId("hydrated");
        expect(hydratedElement.textContent).toBe("true");
      },
      { timeout: 1000 }
    );

    // Should remain with default language
    expect(languageElement.textContent).toBe("es");
  });

  it("Property 2c: Invalid stored language handling - Invalid stored languages should be ignored", async () => {
    /**
     * Feature: hydration-fix, Property 2: Post-Hydration Language Restoration
     * Validates: Requirements 1.3, 2.2
     */

    await runPropertyTest(
      fc.oneof(
        fc.constant(""),
        fc.constant("invalid"),
        fc.constant("de"),
        fc.constant("pt"),
        fc.integer().map(String),
        fc
          .string({ minLength: 1, maxLength: 10 })
          .filter((s) => !["en", "es", "fr"].includes(s))
      ),
      async (invalidLanguage: string) => {
        // Set up localStorage with invalid language
        localStorage.setItem("sb-language", invalidLanguage);

        render(
          <LanguageProvider>
            <LanguageDisplay />
          </LanguageProvider>
        );

        // Should start with default language
        const languageElement = screen.getByTestId("language");
        expect(languageElement.textContent).toBe("es");

        // Wait for hydration
        await waitFor(
          () => {
            const hydratedElement = screen.getByTestId("hydrated");
            expect(hydratedElement.textContent).toBe("true");
          },
          { timeout: 1000 }
        );

        // Should remain with default language (invalid language ignored)
        expect(languageElement.textContent).toBe("es");

        cleanup();
      },
      { numRuns: 50 }
    );
  });
});
