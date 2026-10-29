# Copilot instructions

## Project overview

- Wonderlast is a Next.js 16 App Router application using React 19 and TypeScript.
- The application entry point is `src/app/page.tsx`; `src/app/layout.tsx` owns the root HTML shell, metadata, global font, and global stylesheet.
- Shared UI primitives live in `src/components/ui/`. They are generated/customized around shadcn's Base Nova style, `@base-ui/react`, `class-variance-authority`, Tailwind class names, and `cn` composition.
- Cross-cutting browser hooks are in `src/hooks/`; reusable non-UI logic is in `src/lib/`. The Shiki integration in `src/lib/highlighter.tsx` lazily loads supported languages and is consumed by `use-highlighted-code`.
- Static assets are served from `public/`, including the project imagery under `public/images/`.

## Commands

Use npm with the checked-in `package-lock.json`:

```bash
npm run dev                 # Start the development server
npm run lint                # Run ESLint
npm run lint -- src/path.tsx # Lint one file or a focused path
npm run build               # Create a production build
npm run start               # Serve a completed production build
```

No test runner, test script, or test files are currently configured, so there is no single-test command yet. Validate behavior with the focused lint command and the production build until tests are added.

## Project conventions

- Use the `@/*` alias for imports from `src/*`; shadcn aliases are `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, and `@/hooks`.
- Keep reusable primitives in `src/components/ui/` and compose them instead of duplicating interaction patterns. Follow the existing `data-slot`, `cn(...)`, and `cva(...)` patterns when extending primitives.
- Components using state, effects, browser APIs, or event handlers must be client components (`"use client"`). Keep route/layout code server-compatible unless client behavior is required.
- Tailwind CSS is v4: global styling is wired through imports in `src/app/globals.css`; there is no Tailwind config file to edit. Prefer existing utility classes and CSS variables over adding one-off global CSS.
- Use Lucide icons through `lucide-react` and keep icon sizing/interaction consistent with the UI primitives.
- `next.config.ts` enables React Compiler, Cache Components, partial prefetching, and the Tailwind Turbopack loader. Preserve these settings when changing build behavior.
- `next/font/google` is used in the root layout; update font and metadata changes there rather than in individual pages.
- The repository includes generated shadcn-style components with their own established formatting. Preserve the local style of the file being edited and avoid broad reformatting.

## Next.js-specific requirement

Before changing Next.js behavior, routing, server/client boundaries, or configuration, read the relevant guide under `node_modules/next/dist/docs/`. `AGENTS.md` notes that this installed Next.js version has breaking changes and that the generated instruction block must not be removed from `AGENTS.md`.
