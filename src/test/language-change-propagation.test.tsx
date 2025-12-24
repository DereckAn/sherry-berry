import { LanguageProvider, useLanguage } from "@/shared/i18n/LanguageProvider";
import { navDictionary, type Language } from "@/shared/i18n/dictionary";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as fc from "fast-check";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { languageArbitrary, mockLocalStorage, runPropertyTest } from "./utils";

// Test component that shows language and allows changes
function LanguageTestComponent() {
  const { language, setLanguage, isHydrated } = useLanguage();

  return (
    <div>
      <div data-testid="current-language">{language}</div>
      <div data-testid="hydrated">{isHydrated.toString()}</div>
      <div data-testid="nav-items">
        {navDictionary[language].items.map((item) => (
          <div key={item.href} data-testid={`nav-${item.href}`}>
            {item.label}
          </div>
        ))}
      </div>
      <div data-testid="menu-button">{navDictionary[language].menuButton}</div>
      <div data-testid="privacy">{navDictionary[language].privacy}</div>
      <div data-testid="terms">{navDictionary[language].terms}</div>

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

describe("Language Change Propagation", () => {
  beforeEach(() => {
    mockLocalStorage("working");
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("Property 6: Language Change Propagation - For any language change, all navigation text should update consistently", async () => {
    /**
     * Feature: hydration-fix, Property 6: Language Change Propagation
     * Validates: Requirements 3.2
     */

    await runPropertyTest(
      fc.tuple(languageArbitrary, languageArbitrary),
      async ([initialLanguage, targetLanguage]: [Language, Language]) => {
        const user = userEvent.setup();

        // Set initial language in localStorage
        localStorage.setItem("sb-language", initialLanguage);

        render(
          <LanguageProvider>
            <LanguageTestComponent />
          </LanguageProvider>
        );

        // Wait for hydration and initial language restoration
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Verify initial state shows correct language content
        const currentLanguageElement = screen.getByTestId("current-language");
        expect(currentLanguageElement.textContent).toBe(initialLanguage);

        // Verify initial navigation items are in correct language
        const initialNavItems = navDictionary[initialLanguage].items;
        initialNavItems.forEach((item) => {
          const navElement = screen.getByTestId(`nav-${item.href}`);
          expect(navElement.textContent).toBe(item.label);
        });

        // Change language by clicking button
        const buttonTestId = `set-${targetLanguage}`;
        const button = screen.getByTestId(buttonTestId);
        await user.click(button);

        // Verify language changed
        expect(currentLanguageElement.textContent).toBe(targetLanguage);

        // Verify all navigation items updated to new language
        const targetNavItems = navDictionary[targetLanguage].items;
        targetNavItems.forEach((item) => {
          const navElement = screen.getByTestId(`nav-${item.href}`);
          expect(navElement.textContent).toBe(item.label);
        });

        // Verify other text elements updated
        const menuButtonElement = screen.getByTestId("menu-button");
        expect(menuButtonElement.textContent).toBe(
          navDictionary[targetLanguage].menuButton
        );

        const privacyElement = screen.getByTestId("privacy");
        expect(privacyElement.textContent).toBe(
          navDictionary[targetLanguage].privacy
        );

        const termsElement = screen.getByTestId("terms");
        expect(termsElement.textContent).toBe(
          navDictionary[targetLanguage].terms
        );

        cleanup();
      },
      { numRuns: 50 }
    );
  });

  it("Property 6b: Sequential language changes - Multiple language changes should propagate correctly", async () => {
    /**
     * Feature: hydration-fix, Property 6: Language Change Propagation
     * Validates: Requirements 3.2
     */

    await runPropertyTest(
      fc.array(languageArbitrary, { minLength: 2, maxLength: 4 }),
      async (languageSequence: Language[]) => {
        const user = userEvent.setup();

        render(
          <LanguageProvider>
            <LanguageTestComponent />
          </LanguageProvider>
        );

        // Wait for initial hydration
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Apply each language change in sequence
        for (const targetLanguage of languageSequence) {
          const buttonTestId = `set-${targetLanguage}`;
          const button = screen.getByTestId(buttonTestId);
          await user.click(button);

          // Verify language changed
          const currentLanguageElement = screen.getByTestId("current-language");
          expect(currentLanguageElement.textContent).toBe(targetLanguage);

          // Verify navigation items updated
          const targetNavItems = navDictionary[targetLanguage].items;
          targetNavItems.forEach((item) => {
            const navElement = screen.getByTestId(`nav-${item.href}`);
            expect(navElement.textContent).toBe(item.label);
          });

          // Small delay between changes
          await new Promise((resolve) => setTimeout(resolve, 10));
        }

        // Final verification - should have the last language in sequence
        const finalLanguage = languageSequence[languageSequence.length - 1];
        const currentLanguageElement = screen.getByTestId("current-language");
        expect(currentLanguageElement.textContent).toBe(finalLanguage);

        cleanup();
      },
      { numRuns: 30 }
    );
  });

  it("Property 6c: Language change idempotence - Setting the same language multiple times should be stable", async () => {
    /**
     * Feature: hydration-fix, Property 6: Language Change Propagation
     * Validates: Requirements 3.2
     */

    await runPropertyTest(
      languageArbitrary,
      async (language: Language) => {
        const user = userEvent.setup();

        render(
          <LanguageProvider>
            <LanguageTestComponent />
          </LanguageProvider>
        );

        // Wait for hydration
        await new Promise((resolve) => setTimeout(resolve, 50));

        const buttonTestId = `set-${language}`;
        const button = screen.getByTestId(buttonTestId);

        // Click the same language button multiple times
        for (let i = 0; i < 3; i++) {
          await user.click(button);

          // Verify language is consistent
          const currentLanguageElement = screen.getByTestId("current-language");
          expect(currentLanguageElement.textContent).toBe(language);

          // Verify navigation items are consistent
          const navItems = navDictionary[language].items;
          navItems.forEach((item) => {
            const navElement = screen.getByTestId(`nav-${item.href}`);
            expect(navElement.textContent).toBe(item.label);
          });

          await new Promise((resolve) => setTimeout(resolve, 10));
        }

        cleanup();
      },
      { numRuns: 50 }
    );
  });
});
