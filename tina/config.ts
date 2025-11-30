import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local-client",
  token: process.env.TINA_TOKEN || "local-token",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  schema: {
    collections: [
      {
        name: "home",
        label: "Home",
        path: "content/home",
        format: "json",
        ui: {
          filename: {
            readonly: true,
          },
        },
        fields: [
          {
            name: "language",
            label: "Language",
            type: "string",
            options: [
              { value: "en", label: "English" },
              { value: "es", label: "Español" },
              { value: "fr", label: "Français" },
            ],
            required: true,
          },
          {
            name: "heroTitle",
            label: "Hero Title",
            type: "string",
            required: true,
          },
          {
            name: "heroSubtitle",
            label: "Hero Subtitle",
            type: "string",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            name: "heroCtaLabel",
            label: "Hero CTA Label",
            type: "string",
            required: true,
          },
          {
            name: "featuredTitle",
            label: "Featured Title",
            type: "string",
            required: true,
          },
          {
            name: "featuredSubtitle",
            label: "Featured Subtitle",
            type: "string",
            required: true,
          },
          {
            name: "featuredProducts",
            label: "Featured Products",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "Product" }),
            },
            fields: [
              { name: "id", label: "ID", type: "string", required: true },
              { name: "name", label: "Name", type: "string", required: true },
              { name: "price", label: "Price", type: "number", required: true },
              { name: "image", label: "Image", type: "string", required: true },
              {
                name: "colors",
                label: "Colors",
                type: "string",
                list: true,
              },
              { name: "rating", label: "Rating", type: "number" },
            ],
          },
          {
            name: "projectsTitle",
            label: "Projects Title",
            type: "string",
            required: true,
          },
          {
            name: "projectsDescription",
            label: "Projects Description",
            type: "string",
            ui: { component: "textarea" },
            required: true,
          },
          {
            name: "projectsCtaLabel",
            label: "Projects CTA Label",
            type: "string",
            required: true,
          },
          {
            name: "projectsItems",
            label: "Projects Items",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Project" }),
            },
            fields: [
              { name: "id", label: "ID", type: "number", required: true },
              { name: "title", label: "Title", type: "string", required: true },
              { name: "image", label: "Image", type: "string", required: true },
              { name: "alt", label: "Alt Text", type: "string", required: true },
            ],
          },
          {
            name: "ctaTitle",
            label: "CTA Title",
            type: "string",
            required: true,
          },
          {
            name: "ctaParagraphs",
            label: "CTA Paragraphs",
            type: "string",
            list: true,
            ui: { component: "textarea" },
            required: true,
          },
          {
            name: "ctaBullets",
            label: "CTA Bullets",
            type: "string",
            list: true,
            required: true,
          },
          {
            name: "ctaButtonLabel",
            label: "CTA Button Label",
            type: "string",
            required: true,
          },
          {
            name: "ctaImageAlt",
            label: "CTA Image Alt",
            type: "string",
            required: true,
          },
          {
            name: "trustTitle",
            label: "Trust Title",
            type: "string",
            required: true,
          },
          {
            name: "trustSubtitle",
            label: "Trust Subtitle",
            type: "string",
            required: true,
          },
          {
            name: "trustCtaLabel",
            label: "Trust CTA Label",
            type: "string",
            required: true,
          },
        ],
      },
      {
        name: "about",
        label: "About",
        path: "content/about",
        format: "json",
        ui: {
          filename: {
            readonly: true,
          },
        },
        fields: [
          {
            name: "language",
            label: "Language",
            type: "string",
            options: [
              { value: "en", label: "English" },
              { value: "es", label: "Español" },
              { value: "fr", label: "Français" },
            ],
            required: true,
          },
          {
            name: "heroTitleTop",
            label: "Hero Title Top",
            type: "string",
            required: true,
          },
          {
            name: "heroTitleBottom",
            label: "Hero Title Bottom",
            type: "string",
            required: true,
          },
          {
            name: "heroImage",
            label: "Hero Image",
            type: "string",
            required: true,
          },
          {
            name: "heroImageAlt",
            label: "Hero Image Alt",
            type: "string",
            required: true,
          },
          {
            name: "quote",
            label: "Quote",
            type: "string",
            ui: { component: "textarea" },
            required: true,
          },
          {
            name: "points",
            label: "Story Points",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Point" }),
            },
            fields: [
              { name: "title", label: "Title", type: "string", required: true },
              {
                name: "text",
                label: "Text",
                type: "string",
                ui: { component: "textarea" },
                required: true,
              },
              {
                name: "image",
                label: "Image",
                type: "string",
                required: true,
              },
              {
                name: "imageAlt",
                label: "Image Alt",
                type: "string",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "sections",
        label: "Sections",
        path: "content/sections",
        format: "mdx",
        fields: [
          {
            name: "language",
            label: "Language",
            type: "string",
            options: [
              { value: "en", label: "English" },
              { value: "es", label: "Español" },
              { value: "fr", label: "Français" },
            ],
            required: true,
          },
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true,
          },
          {
            name: "excerpt",
            label: "Excerpt",
            type: "string",
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
          },
        ],
      },
    ],
  },
});
