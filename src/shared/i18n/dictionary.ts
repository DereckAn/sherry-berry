export type Language = "en" | "es" | "fr";

export const LANGUAGE_OPTIONS: { code: Language; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
  { code: "fr", label: "FR", name: "Français" },
];

export const navDictionary: Record<
  Language,
  {
    menuButton: string;
    items: { label: string; href: string }[];
    privacy: string;
    terms: string;
  }
> = {
  en: {
    menuButton: "Menu",
    items: [
      { label: "Menu", href: "/menu" },
      { label: "About Us", href: "/about" },
      { label: "Our Art", href: "/our-art" },
      { label: "Blog", href: "/blog" },
    ],
    privacy: "Privacy",
    terms: "Terms",
  },
  es: {
    menuButton: "Menú",
    items: [
      { label: "Menú", href: "/menu" },
      { label: "Sobre nosotros", href: "/about" },
      { label: "Nuestro arte", href: "/our-art" },
      { label: "Blog", href: "/blog" },
    ],
    privacy: "Privacidad",
    terms: "Términos",
  },
  fr: {
    menuButton: "Menu",
    items: [
      { label: "Menu", href: "/menu" },
      { label: "À propos", href: "/about" },
      { label: "Notre art", href: "/our-art" },
      { label: "Blog", href: "/blog" },
    ],
    privacy: "Confidentialité",
    terms: "Conditions",
  },
};
