# TinaCMS Content Architecture

## Overview

This project uses a **modular, hierarchical content architecture** for TinaCMS that separates content by:

1. **Page** (home, about, menu, our-art)
2. **Section/Component** (hero, featured-products, projects, etc.)
3. **Language** (en, es, fr)

This architecture provides clear organization, easy identification of what's being edited, and scalability for future pages.

---

## Directory Structure

```
content/
├── home/                          # Home page
│   ├── hero/
│   │   ├── en.json               # English hero content
│   │   ├── es.json               # Spanish hero content
│   │   └── fr.json               # French hero content
│   ├── featured-products/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── fr.json
│   ├── projects/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── fr.json
│   ├── cta/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── fr.json
│   └── trust-banner/
│       ├── en.json
│       ├── es.json
│       └── fr.json
│
├── about/                         # About page
│   ├── hero/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── fr.json
│   ├── quote/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── fr.json
│   └── story-points/
│       ├── en.json
│       ├── es.json
│       └── fr.json
│
├── menu/                          # Menu page (to be implemented)
│   └── ...
│
└── our-art/                       # Our Art page (to be implemented)
    └── ...
```

---

## TypeScript Content Helpers

Content helpers are located in `src/shared/i18n/content/` and provide type-safe access to content.

### Structure

```
src/shared/i18n/content/
├── index.ts                       # Main barrel export
├── home/
│   ├── index.ts                   # Home page barrel export
│   ├── heroContent.ts             # Hero section types & data
│   ├── featuredProductsContent.ts
│   ├── projectsContent.ts
│   ├── ctaContent.ts
│   └── trustBannerContent.ts
└── about/
    ├── index.ts                   # About page barrel export
    ├── heroContent.ts
    ├── storyPointsContent.ts
    └── quoteContent.ts
```

### Usage in Components

```tsx
// Import specific content for a page
import { HOME_HERO, HOME_FEATURED_PRODUCTS } from "@/shared/i18n/content";

// Use with language from LanguageProvider
const { language } = useLanguage();
const heroContent = HOME_HERO[language];

// Pass to component
<Hero content={heroContent} />;
```

### Type Exports

Each content module exports:

- **Content Type**: e.g., `HeroContent`, `FeaturedProductsContent`
- **Component Alias**: e.g., `HomeHeroContent` (for component props)
- **Content Data**: e.g., `HERO_CONTENT`, `HOME_HERO`

---

## TinaCMS Collections

TinaCMS config is in `tina/config.ts`. Each section has its own collection for easy editing.

### Collection Naming Convention

```
{pageName}{SectionName}
```

Examples:

- `homeHero` → "Home → Hero"
- `homeFeaturedProducts` → "Home → Featured Products"
- `aboutStoryPoints` → "About → Story Points"

### Collection Features

- **Readonly filenames**: Prevents accidental renaming
- **No create/delete**: Only the 3 language files exist (en, es, fr)
- **Image type**: Uses `type: "image"` for media picker integration
- **Textarea for long text**: Uses `ui: { component: "textarea" }` for descriptions

---

## Adding a New Page

Follow these steps to add content for a new page (e.g., Menu):

### 1. Create Content Directory

```bash
mkdir -p content/menu/hero
mkdir -p content/menu/products
# Add more sections as needed
```

### 2. Create Language Files

For each section, create `en.json`, `es.json`, `fr.json`:

```json
// content/menu/hero/en.json
{
  "title": "Our Menu",
  "subtitle": "Explore our collection",
  "image": "/images/menu-hero.webp",
  "imageAlt": "Menu hero image"
}
```

### 3. Create Content Helper

```typescript
// src/shared/i18n/content/menu/heroContent.ts
import type { Language } from "../../dictionary";

import en from "../../../../../content/menu/hero/en.json";
import es from "../../../../../content/menu/hero/es.json";
import fr from "../../../../../content/menu/hero/fr.json";

export type MenuHeroContent = {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
};

export const MENU_HERO_CONTENT: Record<Language, MenuHeroContent> = {
  en: en as MenuHeroContent,
  es: es as MenuHeroContent,
  fr: fr as MenuHeroContent,
};

// Alias for convenience
export { MENU_HERO_CONTENT as MENU_HERO };
```

### 4. Create Barrel Export

```typescript
// src/shared/i18n/content/menu/index.ts
export * from "./heroContent";
export * from "./productsContent";
// Add more exports as needed
```

### 5. Add to Main Barrel

```typescript
// src/shared/i18n/content/index.ts
export * from "./home";
export * from "./about";
export * from "./menu"; // Add this line
```

### 6. Add TinaCMS Collection

Add to `tina/config.ts`:

```typescript
{
  name: "menuHero",
  label: "Menu → Hero",
  path: "content/menu/hero",
  format: "json",
  ui: {
    filename: { readonly: true },
    allowedActions: { create: false, delete: false },
  },
  fields: [
    { name: "title", label: "Title", type: "string", required: true },
    { name: "subtitle", label: "Subtitle", type: "string", required: true },
    { name: "image", label: "Image", type: "image", required: true },
    { name: "imageAlt", label: "Image Alt", type: "string", required: true },
  ],
},
```

---

## Adding a New Section to Existing Page

1. Create directory: `content/{page}/{section}/`
2. Add 3 language files (en.json, es.json, fr.json)
3. Create content helper in `src/shared/i18n/content/{page}/{section}Content.ts`
4. Export from page barrel (`src/shared/i18n/content/{page}/index.ts`)
5. Add TinaCMS collection in `tina/config.ts`

---

## Image Management

### Media Configuration

Images are stored in `public/images/` and configured in TinaCMS:

```typescript
media: {
  tina: {
    publicFolder: "public",
    mediaRoot: "images",
  },
},
```

### Using Images in Content

All image fields use `type: "image"` which allows:

- Visual media picker in TinaCMS
- Upload new images
- Select from existing images
- Preview images while editing

---

## Best Practices

1. **Always create all 3 language files** when adding new content
2. **Use descriptive alt text** for all images
3. **Keep field names consistent** across languages
4. **Use `ui: { component: "textarea" }** for multi-line text
5. **Use `itemProps`** for list items to show meaningful labels
6. **Test build after changes**: `bun run build`
7. **Run TinaCMS dev**: `bun dev` to verify collections appear correctly

---

## Languages Supported

| Code | Label    | Flag |
| ---- | -------- | ---- |
| en   | English  | 🇬🇧   |
| es   | Español  | 🇪🇸   |
| fr   | Français | 🇫🇷   |

Language is managed by `LanguageProvider` and stored in context.
