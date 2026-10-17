# Vercel deployment

## Recorded deployment

The user approved deployment and ran the Vercel CLI from their authenticated WSL session. The corrected deployment built Next.js 15.5.28 and routes `/`, `/support` and `/help`; the user subsequently confirmed the site worked on 17 October 2026.

| Item | Recorded value |
| --- | --- |
| Team / project | `maghangas-projects/hey` |
| Production alias | https://hey-bice-six.vercel.app |
| Corrected deployment | https://hey-3yt5kz6d1-maghangas-projects.vercel.app |
| Source branch containing the prototype | `hey-care-loop-prototype` |
| Access | Vercel Authentication was enabled at deployment |

These are recorded observations, not live monitoring. Project settings, protection and aliases can change. The deployment was performed from a local checkout using the CLI; automatic Git deployment and its production-branch selection have not been verified.

## Project settings

The repository contains two apps. Vercel must build the Next.js app under `prototype/`, not the legacy Vite app at the repository root.

In **Project Settings → Build and Deployment**:

| Setting | Value |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | `prototype` |
| Build Command | Automatic; disable custom override |
| Output Directory | Automatic; disable custom override |
| Install Command | Automatic; disable custom override |

No application environment variables are needed. Do not copy credentials into source files or commit `.env.local`. If Vercel offers to download development variables, the Care Loop does not require them. Vercel's generated `.vercel` and environment files should stay ignored; inspect `git status` before committing local changes.

## CLI workflow

Use your own authenticated terminal. Authentication in WSL does not authenticate a separate cloud machine. If needed:

```bash
npx vercel@latest login
```

After saving the project settings, deploy **from the repository root** so `prototype` resolves relative to the uploaded root:

```bash
cd ~/projects/hey-github
npx vercel@latest --prod
```

The path above is the user's recorded WSL checkout. For another clone, enter its repository root instead. Select the existing `maghangas-projects/hey` project. Confirm the project choice: production deployment updates that project's production alias. Do not create another production deployment merely to inspect existing logs.

Use the newly printed deployment URL for build logs:

```bash
npx vercel@latest inspect hey-3yt5kz6d1-maghangas-projects.vercel.app --logs
```

That command inspects the recorded corrected deployment. For a future deployment, substitute its newly printed URL.

## Verification and troubleshooting

Successful logs should show `hey-care-loop`, `next build`, and routes `/`, `/support` and `/help`. Logs showing `vite build`, `dist/index.html` or legacy chatbot assets indicate the wrong app was built. Check root/framework/overrides and the source branch; redeploying an old deployment can reuse old source.

Open the production alias and look for “A little space to feel like you.” Test check-in, support, help and refresh clearing with synthetic examples. If the alias appears stale, hard-refresh and compare the new deployment's direct URL. If the direct URL also shows the old app, inspect that deployment's logs rather than assuming browser caching.

With Deployment Protection enabled, sign in to Vercel or use the CLI's authenticated request facility. Do not turn off protection just to make a private review easier. Public access changes require an explicit decision.

## Git integration and later changes

The prototype branch has not been merged into `main` by this work. Before enabling automatic Git deployments, check the production branch and confirm it includes `prototype/`. The old `main` tree may lack that directory. Do not change branch selection or merge as an incidental setup step.

Run lint, typecheck, tests and build before another release; keep a record of the deployed commit. If a release is broken, use Vercel's deployment history to select a known-good deployment, verify that it is the intended Care Loop version, and obtain approval before changing production routing. The earlier Vite deployment is not a known-good Care Loop release.

## Privacy scope

The app sends no mood or note data to an API and adds no third-party analytics. Vercel hosting, access authentication, CLI telemetry and operational logs are separate platform concerns. Next.js telemetry is disabled in the app's scripts; that does not disable Vercel CLI telemetry. Review platform settings separately before any move beyond synthetic-data review. Do not enable Web Analytics, Speed Insights or other tracking as part of routine setup.
