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

`npm run dev` serves the visual site. To test the waitlist API locally after creating
a D1 database, build the site and run:

```bash
npm run build
npx wrangler pages dev dist --d1 WAITLIST_DB=<D1_DATABASE_ID>
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

## Waitlist backend

The `/waitlist` page uses Cloudflare Pages Functions and a D1 database. Dedicated
Pages Functions also serve the `/waitlist` and `/admin` app shells to keep direct
links on the current deployment:

- `GET /api/waitlist/count` returns the exact number of unique entries.
- `POST /api/waitlist/signup` accepts `name`, `email`, `phone`, and `instagramHandle` and returns a
  duplicate error if either normalized email or international phone number already exists.
- `GET /api/admin/entries` returns entries only after an administrator has signed in.
- `/admin` is the password-protected dashboard for reviewing every waitlist entry.

Before the first production deployment:

1. Create a D1 database, for example `kouponly-waitlist`.
2. Apply every migration in `migrations/` to that database.
3. In Cloudflare Pages, open `kouponly-web-pitch-deck` > Settings > Bindings and add
   the D1 database as `WAITLIST_DB` in both Preview and Production.
4. Add these Pages **secrets** in both Preview and Production:
   - `ADMIN_EMAIL`: the one administrator email address.
   - `ADMIN_PASSWORD`: a long, unique password.
   - `ADMIN_SESSION_SECRET`: a random 32+ character signing secret.
5. Redeploy the site. Pages detects the root `functions/` directory automatically.

The dashboard uses an HttpOnly, same-site session cookie that expires after 24 hours.
Its data endpoint requires that session for every request; the browser never receives
the D1 binding or administrator secrets.

Use a separate preview database so test entries do not affect the live counter. Add a
Cloudflare Turnstile site key and server-side validation before promoting the waitlist
to a public campaign.

## Typography

The production build self-hosts Geist Sans and DM Mono through Fontsource, so
rendering never depends on a third-party font request.

To use a licensed Neue Montreal webfont later:

1. Add the licensed WOFF2 files under `src/fonts/`.
2. Declare their weights with `@font-face` in `src/styles.css`.
3. Change the first family in the root font stack to `Neue Montreal`.
4. Keep Geist Sans as the fallback.

Do not commit font files unless the license explicitly allows web distribution.
