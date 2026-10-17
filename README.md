# Hey! Care Loop

Hey! is a privacy-first emotional well-being prototype for university students aged 18–25, especially international students away from their support networks. It explores whether a short check-in connected to an optional action or relevant support makes reflection more useful. This hypothesis is unvalidated; the prototype makes no claim of clinical effectiveness.

**Demo:** https://hey-bice-six.vercel.app — Vercel Authentication was enabled at deployment. Use invented examples only.

The Next.js app lives in `prototype/`. The original Vite app in `src/` is preserved as legacy work and is outside this prototype's scope. Run all application commands below inside `prototype/`.

## Start locally

Use Node.js 22 or 24 and npm. These commands clone into a new folder; if you already have the checkout, enter its `prototype/` directory instead.

```bash
git clone --branch hey-care-loop-prototype https://github.com/SamsonMaghanga/hey-.git hey-care-loop
cd hey-care-loop/prototype
npm ci
npm run dev
```

Open the address printed by Next.js, normally http://localhost:3000. On WSL2, open it in your Windows browser. `/workspace/hey-` is the cloud checkout path and does not exist automatically on your laptop.

No application secrets, accounts, database or external services are required. The checked-in lockfile supports repeatable installs. Next.js telemetry is disabled by the run scripts.

## What to try

Select **Explore the demo**, choose a feeling and optional context, and inspect **Why am I seeing this?** Try or skip an action, explore example campus support, and enter an invented reflection. Refresh to check that entries clear. Routine preferences default to one check-in and allow up to three; they send no notifications.

## Validate

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

To serve the production build locally, stop the development server with Ctrl+C, run `npm run build`, then `npm start`.

Eight automated tests, lint, typecheck and the production build passed in the cloud and in the user's WSL checkout on 17 October 2026. Vercel subsequently built the Next.js routes and the user confirmed the site worked. Manual screen-reader and systematic device testing remain outstanding. The Next.js ESLint plugin warning is non-blocking; general ESLint checks run, but Next-specific lint rules are not configured.

## Documentation

| Document | Purpose |
| --- | --- |
| [Product strategy](docs/PRODUCT_STRATEGY.md) | Audience, hypothesis and learning goals |
| [Product requirements](docs/PRD.md) | Scope and acceptance criteria |
| [Safety requirements](docs/SAFETY_REQUIREMENTS.md) | Content and privacy boundaries |
| [Architecture](docs/ARCHITECTURE.md) | Components, state and mapping rules |
| [Testing](docs/TESTING.md) | Automated checks and manual review |
| [Deployment](docs/DEPLOYMENT.md) | Vercel configuration and troubleshooting |
| [Roadmap](docs/ROADMAP.md) | Current status and deferred work |

## Boundaries

No AI mental health chatbot, diagnosis, stored journal, real notifications, live triage, chat, bookings or third-party analytics are implemented. Every support entry is an unverified example. Input values stay in React memory; the app has no server endpoint for collecting them. Hosting and Vercel Authentication have their own operational logging and access controls; temporary app state is not a claim that the hosting platform collects no metadata.
