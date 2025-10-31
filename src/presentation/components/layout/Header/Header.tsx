'use client';

import { useState, useEffect } from 'react';
import { MenuOverlay } from './MenuOverlay';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 100; // Mostrar después de 100px de scroll

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mostrar navbar si scrolleamos más de 100px
      if (currentScrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Header/Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-full px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div>
              <a href="/" className="text-xl lg:text-2xl font-serif font-normal text-black">
                Sherry Berry
              </a>
            </div>

            {/* Right side: Directory + Menu */}
            <div className="flex items-center gap-6 lg:gap-8">
              {/* Directory Button */}
              <button
                className="flex items-center gap-2 text-xs lg:text-sm uppercase tracking-wider text-black hover:text-primary transition-colors"
                aria-label="Directory"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="hidden sm:inline">Buscar</span>
              </button>

              {/* Menu Button */}
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 text-xs lg:text-sm uppercase tracking-wider text-black hover:text-primary transition-colors"
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
                <span>Menú</span>
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
