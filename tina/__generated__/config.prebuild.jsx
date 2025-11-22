// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local-client",
  token: process.env.TINA_TOKEN || "local-token",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
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
            readonly: true
          }
        },
        fields: [
          {
            name: "language",
            label: "Language",
            type: "string",
            options: [
              { value: "en", label: "English" },
              { value: "es", label: "Espa\xF1ol" },
              { value: "fr", label: "Fran\xE7ais" }
            ],
            required: true
          },
          {
            name: "heroTitle",
            label: "Hero Title",
            type: "string",
            required: true
          },
          {
            name: "heroSubtitle",
            label: "Hero Subtitle",
            type: "string",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            name: "ctaLabel",
            label: "CTA Label",
            type: "string",
            required: true
          }
        ]
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
              { value: "es", label: "Espa\xF1ol" },
              { value: "fr", label: "Fran\xE7ais" }
            ],
            required: true
          },
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true
          },
          {
            name: "excerpt",
            label: "Excerpt",
            type: "string"
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
