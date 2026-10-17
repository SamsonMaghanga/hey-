# Hey! Care Loop prototype

The requested privacy-first Next.js implementation lives in `prototype/`. The original Vite app in `src/` is preserved and is outside the new prototype scope; it includes legacy features not approved for this build.

## Run locally

Use Node.js 22 or 24 and npm. From the repository root:

```sh
cd prototype
npm ci
npm run dev
```

Open the local address reported by Next.js. Use invented examples only. Choose “Explore the demo”, select an emotion and optional context, inspect the mapping explanation, try or skip an action, explore example support, and enter an invented reflection. Refresh to verify entries disappear. Routine preference starts at one and allows up to three; no notifications are sent.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm start` serves the production build. Stop the development server before using the same port. No secrets, external services or environment variables are required. If npm's default cache is unavailable, add `--cache /workspace/.npm-cache` to `npm ci` in the cloud machine.

## Engineering choices

App Router supplies static pages for help and the directory shell. React client state powers the Care Loop and filter. A pure typed function maps emotion/context to fixed language and two actions; journal text is not analyzed. No API, persistence, analytics, remote fonts or model dependencies are used. A separate app preserves existing work while making the new prototype's boundaries explicit. Lockfile installation makes dependency setup reproducible.

See `docs/` for strategy, requirements, safety boundaries and roadmap. This prototype does not demonstrate clinical effectiveness. No deployment has been performed.
