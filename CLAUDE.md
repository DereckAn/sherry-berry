# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio project using TypeScript, React 19, and Tailwind CSS 4. The project was bootstrapped with `create-next-app` and uses the App Router architecture.

## Development Commands

- `bun dev` - Start development server with Turbopack (opens at http://localhost:3000)
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint linting

## Architecture

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Structure**:
  - `src/app/` - Main application pages and layouts
  - `src/app/layout.tsx` - Root layout with font configuration
  - `src/app/page.tsx` - Home page component
  - `public/` - Static assets (SVGs for icons and logos)

## Key Technologies

- React 19 with TypeScript
- Next.js 15 (App Router)
- Tailwind CSS 4 with CSS variables for theming
- ESLint with Next.js configuration
- Bun for package management and running scripts

## Development Notes

- Uses Turbopack for faster development builds
- Configured for both light and dark mode theming
- Font optimization using `next/font` with Geist font family
- TypeScript strict mode enabled