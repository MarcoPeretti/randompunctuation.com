# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marco Peretti's personal site (randompunctuation.com): a Next.js 16 (App Router) blog/portfolio built on the `next-mdx-blog` template, deployed on Vercel. Content pages are MDX; a few pages have client-side interactivity (an OpenAI Realtime voice chat, a Goodreads book wall).

## Commands

- `pnpm dev` — start dev server (Turbopack). Package manager is pnpm (`pnpm-lock.yaml` is authoritative; `package-lock.json` also exists but is stale).
- `pnpm build` — production build (Turbopack).
- `pnpm start` — run the production build.
- `npx eslint .` — lint (no `lint` script is defined in package.json; ESLint config is `eslint.config.mjs` using `eslint-config-next`).
- No test suite exists in this repo.

## Architecture

- **Routing**: Next.js App Router under `app/`. `next.config.ts` sets `pageExtensions: ['mdx', 'ts', 'tsx']`, so most content routes are simply `app/<route>/page.mdx` files with a leading MDX frontmatter-style `export const metadata = {...}` block (see `app/uacguard/page.mdx`) rather than a separate metadata export.
- **MDX rendering**: `mdx-components.tsx` defines the global `useMDXComponents()` override map (headings, links, code blocks via `sugar-high` syntax highlighting, custom `Table` component, etc.) applied to every `.mdx` page. Internal links (`href` starting with `/`) render as `next/link`; external links get `target="_blank"`.
- **Layout**: `app/layout.tsx` defines the root layout, inline `Header`/`Footer` components, and the nav link list — add new top-level routes to `navLinks` in `Header()` when adding a new section.
- **Sitemap**: `app/sitemap.ts` is hand-maintained — it globs `page.mdx` files under `app/blog` and `app/notes` for slugs, but every other route (e.g. `/about`, `/projects`, `/work`, `/uacguard`, `/ask`) is listed as a manual array. New static routes must be added here explicitly.
- **Redirects via Postgres**: `next.config.ts` queries a `redirects` table via `postgres` (the `postgres` package) at build/config-load time, only if `POSTGRES_URL` is set. This means `next.config.ts` itself makes a DB connection when Next.js loads config — a missing/invalid `POSTGRES_URL` at build time simply yields no redirects rather than failing.
- **"The Oracle" (`/ask`)**: a client-side OpenAI Realtime Audio (WebRTC) voice chat persona themed as the Oracle from The Matrix, answering questions about Marco's resume.
  - `app/api/oai/route.ts` (Node runtime; the edge runtime is deprecated in Next 16) mints an ephemeral OpenAI Realtime session token server-side using `OPENAI_API_KEY`.
  - `app/ask/AskClient.tsx` fetches that token client-side and renders `app/components/OpenAIAudioChat.tsx`, which opens the WebRTC peer connection directly from the browser to OpenAI's Realtime API.
  - The system prompt embeds the full contents of `marco_peretti.resume.json` (repo root) inlined as JSON — that file is the source of truth for "Oracle" answers about work history.
- **Goodreads book wall** (`app/books/page.tsx` + `ShelfFilter.tsx`): a statically-generated (`dynamic = "force-static"`, `runtime = "nodejs"`) page that fetches Marco's Goodreads RSS shelves at build time, parses them with `fast-xml-parser`, downloads and locally caches cover images into `public/images/<md5-hash>.<ext>`, and renders a client-side shelf filter. No route currently links to this page (not in `navLinks` or `sitemap.ts`).
- **Styling**: Tailwind CSS v4 via `@theme`/`@import 'tailwindcss'` in `app/globals.css` (no separate `tailwind.config`), plus dark-mode variants throughout via `dark:` classes. Code block highlight colors are defined as CSS custom properties (`--sh-*`) matching `sugar-high`'s token classes.
- **Path alias**: `@/*` maps to the repo root (`tsconfig.json`), but some imports instead use bare root-relative paths (e.g. `import cv from 'marco_peretti.resume.json'`, `import oracle from 'public/images/oracle1.jpg'`) relying on `baseUrl: "."`.
