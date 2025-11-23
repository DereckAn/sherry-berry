import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/shared/config/site";
import type { Metadata } from "next";
import {
    Antic_Slab,
    Inter,
    Josefin_Sans,
    Playfair_Display,
    Rokkitt,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/shared/i18n/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

const antic = Antic_Slab({
  subsets: ["latin"],
  variable: "--font-antic",
  display: "swap",
  weight: "400",
});

const rokkitt = Rokkitt({
  subsets: ["latin"],
  variable: "--font-rokkitt",
  display: "swap",
  weight: "400",
});

const legquinne = localFont({
  src: "../../public/fonts/legquinne-light.otf",
  variable: "--font-legquinne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "velas artesanales",
    "velas hechas a mano",
    "velas aromáticas",
    "decoración",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${legquinne.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
