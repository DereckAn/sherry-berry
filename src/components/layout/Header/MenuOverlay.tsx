'use client';

import { useEffect } from 'react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Menu', href: '/menu' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Art', href: '/our-art' },
  { label: 'Blog', href: '/blog' },
];

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 bg-cream z-40 transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        onClick={onClose}
      >
        {/* Menu content */}
        <div
          className={`h-full w-full flex items-center justify-center transition-all duration-700 ease-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Grid layout like the reference */}
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 max-w-5xl w-full px-8">
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`group transition-all duration-500 ${
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 100 + 200}ms` : '0ms',
                }}
              >
                <div className="text-center md:text-left py-12 md:py-16 lg:py-20 border-t border-charcoal/20 hover:border-primary transition-colors">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black group-hover:text-primary transition-colors">
                    {item.label}
                  </h2>
                </div>
              </a>
            ))}
          </nav>
        </div>

        {/* Footer info in overlay */}
        <div
          className={`absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-sm text-charcoal/60 transition-all duration-700 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: isOpen ? '600ms' : '0ms' }}
        >
          <a href="/privacidad" className="hover:text-primary transition-colors">
            Privacidad
          </a>
          <a href="/terminos" className="hover:text-primary transition-colors">
            Términos
          </a>
        </div>
      </div>
    </>
  );
}
