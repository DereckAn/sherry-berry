# Repository Guidelines

## Project Structure & Module Organization
- App Router lives in `src/app/(root)` with route segments for `page.tsx`, `about`, `menu`, and `our-art`; `src/app/layout.tsx` wires shared metadata and fonts, and `src/app/globals.css` defines Tailwind v4 theme tokens.
- UI is split into `src/components` (layout shell, sections, product/menu cards, and shared UI primitives like `Button`) and re-exported through `index.ts` files; keep component folders PascalCase and colocate styles/assets when adding new blocks.
- Shared configuration and data stay in `src/shared` (`config/site.ts`, `data/menu.ts`), and static assets belong in `public/` (e.g., `public/images/...`).

## Build, Test, and Development Commands
- `bun dev` — start the Next.js 16 dev server with hot reload.
- `bun run build` — production build; catches bundle/type/runtime issues.
- `bun start` — serve the last build locally.
- `bun run lint` — run ESLint (Next core-web-vitals + TypeScript rules). Run before pushing.

## Coding Style & Naming Conventions
- TypeScript is strict; prefer typed props and explicit return types for hooks/helpers. Default to Server Components; add `"use client"` only when stateful.
- Components use PascalCase files and folders; hooks/utilities use `camelCase`. Path alias `@/*` resolves to `src/*`.
- Tailwind is the primary styling approach; favor theme variables defined in `globals.css` over arbitrary hex values. Maintain two-space indentation and keep JSX lightweight (small, focused components).

## Testing Guidelines
- No automated tests yet; add new tests alongside features when possible. Recommended stack: Vitest + React Testing Library for components, and Playwright for full flows once routes stabilize.
- Until a test suite exists, describe manual verification steps in PRs (pages touched, viewports checked, lint/build status).

## Commit & Pull Request Guidelines
- Recent history uses short action statements (`Creating new component`, `arrenging hero`); prefer imperative messages with concise scope, e.g., `feat: add hero carousel fade` or `fix: align menu overlay tap target`.
- PRs should include: summary of changes, linked issue/task, screenshots or recordings for UI updates (esp. `src/app/(root)` pages), and a test/verification note (`bun run lint`, `bun run build`, manual checks). Keep diffs small and componentized for easier review.
