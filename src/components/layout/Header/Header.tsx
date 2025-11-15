"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuOverlay } from "./MenuOverlay";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

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
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-full px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div>
              <a
                href="/"
                className={`text-xl lg:text-2xl font-serif font-normal transition-colors ${
                  isHomePage && !isScrolled ? "text-white" : "text-black"
                }`}
              >
                Sherry Berry
              </a>
            </div>

            {/* Right side: Directory + Menu */}
            <div className="flex items-center gap-6 lg:gap-8">

              {/* Menu Button */}
              <button
                onClick={toggleMenu}
                className={`flex items-center gap-2 text-xs lg:text-sm uppercase tracking-wider hover:text-primary transition-colors ${
                  isHomePage && !isScrolled ? "text-white" : "text-black"
                }`}
                aria-label="Menu"
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
                <span className="font-rokkitt">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
