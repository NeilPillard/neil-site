# Kouponly investor site

A responsive investor overview for Kouponly, built with React, TypeScript, and Vite.

## Local development

Requirements:

- Node.js 22 or newer
- npm 11 or newer

```bash
npm ci
npm run dev
```

The complete local quality gate is:

```bash
npm run check
npm run test:e2e
```

## Production

Build the static site with:

```bash
npm run build
```

Deploy `dist/` to the Cloudflare Pages project
`kouponly-web-pitch-deck`. Security and caching policies are defined in
`public/_headers`.

## Typography

The production build self-hosts Geist Sans and DM Mono through Fontsource, so
rendering never depends on a third-party font request.

To use a licensed Neue Montreal webfont later:

1. Add the licensed WOFF2 files under `src/fonts/`.
2. Declare their weights with `@font-face` in `src/styles.css`.
3. Change the first family in the root font stack to `Neue Montreal`.
4. Keep Geist Sans as the fallback.

Do not commit font files unless the license explicitly allows web distribution.
