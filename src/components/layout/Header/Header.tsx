"use client";

import { LANGUAGE_OPTIONS, navDictionary } from "@/shared/i18n/dictionary";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { useCartStore, useTotalItems } from "@/shared/store/cartStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Cart } from "../Cart";
import { MenuOverlay } from "./MenuOverlay";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();

  // Cart state
  const isCartOpen = useCartStore((state) => state.isOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const totalItems = useTotalItems();

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

  const handleCartToggle = () => {
    // Close menu if open when opening cart
    if (!isCartOpen && isMenuOpen) {
      setIsMenuOpen(false);
    }
    toggleCart();
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
                className={`text-xl lg:text-3xl font-serif font-normal transition-colors ${textColorClass}`}
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

              {/* Cart Button */}
              <button
                onClick={handleCartToggle}
                className={`relative flex items-center gap-2 hover:text-primary transition-colors ${textColorClass}`}
                aria-label="Abrir carrito"
              >
                <svg
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path
                      fill="currentColor"
                      d="M19.5 22a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-10 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                    />
                    <path d="M5 4h17l-2 11H7zm0 0c-.167-.667-1-2-3-2m18 13H5.23c-1.784 0-2.73.781-2.73 2s.946 2 2.73 2H19.5" />
                  </g>
                </svg>
                {/* Badge with item count */}
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 size-5 flex items-center justify-center bg-primary text-white text-xs font-medium rounded-full">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>

              {/* Menu Button */}
              <button
                onClick={toggleMenu}
                className={`flex items-center gap-2 text-xs lg:text-sm uppercase tracking-wider hover:text-primary transition-colors ${textColorClass} `}
                aria-label={menuLabel}
              >
                <svg
                  className="size-6"
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
                {/* <span
                  className={`font-rokkitt ${isMenuOpen ? "text-black" : ""}`}
                >
                  {menuLabel}
                </span> */}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Overlay */}
      <Cart isOpen={isCartOpen} onClose={closeCart} />

      {/* Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        language={language}
      />
    </>
  );
}
