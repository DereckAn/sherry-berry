"use client";

import { LANGUAGE_OPTIONS, navDictionary } from "@/shared/i18n/dictionary";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MenuOverlay } from "./MenuOverlay";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isAboutPage = pathname === "/about";

  // En la página About, siempre transparente con texto negro
  const textColorClass = isAboutPage
    ? "text-black"
    : isHomePage && !isScrolled && !isMenuOpen
    ? "text-white"
    : "text-black";

  const menuLabel = useMemo(
    () => navDictionary[language].menuButton,
    [language]
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Cambiar el estado cuando el scroll sea mayor a 50px
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Header/Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isAboutPage
            ? "bg-transparent"
            : isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-full px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div>
              <Link
                href="/"
                className={`text-xl lg:text-2xl font-serif font-normal transition-colors ${textColorClass}`}
              >
                Sherry Berry
              </Link>
            </div>

            {/* Right side: Language + Menu */}
            <div className="flex items-center gap-4 lg:gap-6">
              <label className="sr-only" htmlFor="language-select">
                Select language
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(event) =>
                  setLanguage(event.target.value as typeof language)
                }
                className={`text-xs lg:text-sm uppercase tracking-wide focus:outline-none px-3 py-2 hover:text-primary ${textColorClass} transition-colors`}
              >
                {LANGUAGE_OPTIONS.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Menu Button */}
              <button
                onClick={toggleMenu}
                className={`flex items-center gap-2 text-xs lg:text-sm uppercase tracking-wider hover:text-primary transition-colors ${textColorClass} `}
                aria-label={menuLabel}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    // X icon when menu is open
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    // Hamburger icon when menu is closed
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </>
                  )}
                </svg>
                <span
                  className={`font-rokkitt ${isMenuOpen ? "text-black" : ""}`}
                >
                  {menuLabel}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        language={language}
      />
    </>
  );
}
