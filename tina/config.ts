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
      mediaRoot: "images",
    },
  },
  schema: {
    collections: [
      // ============================================
      // HOME PAGE SECTIONS
      // ============================================
      {
        name: "homeHero",
        label: "Home → Hero",
        path: "content/home/hero",
        format: "json",
        ui: {
          filename: {
            readonly: true,
          },
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true,
          },
          {
            name: "subtitle",
            label: "Subtitle",
            type: "string",
            required: true,
            ui: { component: "textarea" },
          },
          {
            name: "ctaLabel",
            label: "CTA Button Label",
            type: "string",
            required: true,
          },
          {
            name: "images",
            label: "Hero Images (Carousel)",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.alt || "Image" }),
            },
            fields: [
              { name: "url", label: "Image", type: "image", required: true },
              {
                name: "alt",
                label: "Alt Text",
                type: "string",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "homeFeaturedProducts",
        label: "Home → Featured Products",
        path: "content/home/featured-products",
        format: "json",
        ui: {
          filename: {
            readonly: true,
          },
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "string",
            required: true,
          },
          {
            name: "subtitle",
            label: "Section Subtitle",
            type: "string",
            required: true,
          },
          {
            name: "products",
            label: "Products",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "Product" }),
            },
            fields: [
              { name: "id", label: "ID", type: "string", required: true },
              { name: "name", label: "Name", type: "string", required: true },
              { name: "price", label: "Price", type: "number", required: true },
              { name: "image", label: "Image", type: "image", required: true },
              {
                name: "colors",
                label: "Colors (hex)",
                type: "string",
                list: true,
              },
              { name: "rating", label: "Rating", type: "number" },
            ],
          },
        ],
      },
      {
        name: "homeProjects",
        label: "Home → Projects",
        path: "content/home/projects",
        format: "json",
        ui: {
          filename: {
            readonly: true,
          },
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "title",
            label: "Section Title",
            type: "string",
            required: true,
          },
          {
            name: "description",
            label: "Description",
            type: "string",
            required: true,
            ui: { component: "textarea" },
          },
          {
            name: "ctaLabel",
            label: "CTA Button Label",
            type: "string",
            required: true,
          },
          {
            name: "items",
            label: "Project Items",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Project" }),
            },
            fields: [
              { name: "id", label: "ID", type: "number", required: true },
              { name: "title", label: "Title", type: "string", required: true },
              { name: "image", label: "Image", type: "image", required: true },
              {
                name: "alt",
                label: "Alt Text",
                type: "string",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "homeCta",
        label: "Home → CTA Section",
        path: "content/home/cta",
        format: "json",
        ui: {
          filename: {
            readonly: true,
          },
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true,
          },
          {
            name: "paragraphs",
            label: "Paragraphs",
            type: "string",
            list: true,
            required: true,
            ui: { component: "textarea" },
          },
          {
            name: "bullets",
            label: "Bullet Points",
            type: "string",
            list: true,
            required: true,
          },
          {
            name: "buttonLabel",
            label: "Button Label",
            type: "string",
            required: true,
          },
          {
            name: "image",
            label: "Image",
            type: "image",
            required: true,
          },
          {
            name: "imageAlt",
            label: "Image Alt Text",
            type: "string",
            required: true,
          },
        ],
      },
      {
        name: "homeTrustBanner",
        label: "Home → Trust Banner",
        path: "content/home/trust-banner",
        format: "json",
        ui: {
          filename: {
            readonly: true,
          },
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true,
          },
          {
            name: "subtitle",
            label: "Subtitle",
            type: "string",
            required: true,
          },
          {
            name: "ctaLabel",
            label: "CTA Button Label",
            type: "string",
            required: true,
          },
        ],
      },

      // ============================================
      // ABOUT PAGE SECTIONS
      // ============================================
      {
        name: "aboutHero",
        label: "About → Hero",
        path: "content/about/hero",
        format: "json",
        ui: {
          filename: {
            readonly: true,
          },
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "titleTop",
            label: "Title (Top Line)",
            type: "string",
            required: true,
          },
          {
            name: "titleBottom",
            label: "Title (Bottom Line)",
            type: "string",
            required: true,
          },
          {
            name: "image",
            label: "Hero Image",
            type: "image",
            required: true,
          },
          {
            name: "imageAlt",
            label: "Image Alt Text",
            type: "string",
            required: true,
          },
        ],
      },
      {
        name: "aboutQuote",
        label: "About → Quote",
        path: "content/about/quote",
        format: "json",
        ui: {
          filename: {
            readonly: true,
          },
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "quote",
            label: "Quote Text",
            type: "string",
            required: true,
            ui: { component: "textarea" },
          },
        ],
      },
      {
        name: "aboutStoryPoints",
        label: "About → Story Points",
        path: "content/about/story-points",
        format: "json",
        ui: {
          filename: {
            readonly: true,
          },
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
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
                required: true,
                ui: { component: "textarea" },
              },
              { name: "image", label: "Image", type: "image", required: true },
              {
                name: "imageAlt",
                label: "Image Alt Text",
                type: "string",
                required: true,
              },
            ],
          },
        ],
      },

      // ============================================
      // FOOTER SECTION
      // ============================================
      {
        name: "footer",
        label: "Footer → Contact",
        path: "content/footer",
        format: "json",
        ui: {
          filename: {
            readonly: true,
          },
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "contact",
            label: "Contact Section",
            type: "object",
            fields: [
              {
                name: "title",
                label: "Section Title",
                type: "string",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
