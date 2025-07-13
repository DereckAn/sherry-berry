'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { label: 'Work', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-xl font-medium tracking-tight text-black hover:text-gray-600 transition-colors"
          >
            Your Name
          </Link>
          
          <div className="flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  pathname === item.href
                    ? 'text-black border-b border-black'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}