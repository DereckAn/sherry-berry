import { LanguageProvider, useLanguage } from "@/shared/i18n/LanguageProvider";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as fc from "fast-check";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  languageArbitrary,
  mockLocalStorage,
  runPropertyTest,
  type Language,
} from "./utils";

// Test component that allows language changes
function LanguageController() {
  const { language, isHydrated, setLanguage } = useLanguage();

  return (
    <div>
      <div data-testid="language">{language}</div>
      <div data-testid="hydrated">{isHydrated.toString()}</div>
      <button data-testid="set-en" onClick={() => setLanguage("en")}>
        Set English
      </button>
      <button data-testid="set-es" onClick={() => setLanguage("es")}>
        Set Spanish
      </button>
      <button data-testid="set-fr" onClick={() => setLanguage("fr")}>
        Set French
      </button>
    </div>
  );
}

describe("Language Persistence Round Trip", () => {
  beforeEach(() => {
    // Reset localStorage before each test
    mockLocalStorage("working");
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("Property 3: Language Persistence Round Trip - For any language change, setting should persist and be retrievable", async () => {
    /**
     * Feature: hydration-fix, Property 3: Language Persistence Round Trip
     * Validates: Requirements 2.1
     */

    await runPropertyTest(
      languageArbitrary,
      async (targetLanguage: Language) => {
        const user = userEvent.setup();

        render(
          <LanguageProvider>
            <LanguageController />
          </LanguageProvider>
        );

        // Wait for hydration to complete
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
        });

        // Click the appropriate button to set language
        const buttonTestId = `set-${targetLanguage}`;
        const button = screen.getByTestId(buttonTestId);

        await act(async () => {
          await user.click(button);
        });

        // Verify language was set in component
        const languageElement = screen.getByTestId("language");
        expect(languageElement.textContent).toBe(targetLanguage);

        // Verify language was persisted to localStorage
        expect(localStorage.getItem("sb-language")).toBe(targetLanguage);

        cleanup();
      },
      { numRuns: 100 }
    );
  });

  it("Property 3b: Document language attribute sync - Language changes should update document.documentElement.lang", async () => {
    /**
     * Feature: hydration-fix, Property 3: Language Persistence Round Trip
     * Validates: Requirements 2.1
     */

    await runPropertyTest(
      languageArbitrary,
      async (targetLanguage: Language) => {
        const user = userEvent.setup();

        render(
          <LanguageProvider>
            <LanguageController />
          </LanguageProvider>
        );

        // Wait for hydration
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
        });

        // Set language
        const buttonTestId = `set-${targetLanguage}`;
        const button = screen.getByTestId(buttonTestId);

        await act(async () => {
          await user.click(button);
        });

        // Verify document language attribute was updated
        expect(document.documentElement.lang).toBe(targetLanguage);

        cleanup();
      },
      { numRuns: 100 }
    );
  });

  it("Property 3c: Multiple language changes persistence - Sequential language changes should persist correctly", async () => {
    /**
     * Feature: hydration-fix, Property 3: Language Persistence Round Trip
     * Validates: Requirements 2.1
     */

    await runPropertyTest(
      fc.array(languageArbitrary, { minLength: 2, maxLength: 5 }),
      async (languageSequence: Language[]) => {
        const user = userEvent.setup();

        render(
          <LanguageProvider>
            <LanguageController />
          </LanguageProvider>
        );

        // Wait for hydration
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
        });

        // Apply each language change in sequence
        for (const targetLanguage of languageSequence) {
          const buttonTestId = `set-${targetLanguage}`;
          const button = screen.getByTestId(buttonTestId);

          await act(async () => {
            await user.click(button);
          });

          // Verify each change is persisted
          expect(localStorage.getItem("sb-language")).toBe(targetLanguage);

          const languageElement = screen.getByTestId("language");
          expect(languageElement.textContent).toBe(targetLanguage);
        }

        // Final verification - should have the last language in sequence
        const finalLanguage = languageSequence[languageSequence.length - 1];
        expect(localStorage.getItem("sb-language")).toBe(finalLanguage);
        expect(document.documentElement.lang).toBe(finalLanguage);

        cleanup();
      },
      { numRuns: 50 }
    );
  });
});
