# Prototype requirements
Landing and onboarding introduce a synthetic-data demo without accounts. Check-in requires one of five emotions and offers six optional contexts. A pure rule maps selections to predetermined reflection and two optional actions from seven original cards. Context overrides the first emotion-based suggestion; duplicates are removed. Suggestions explain the rule used.

The loop proceeds through check-in, understand, take a step, connect and optional usefulness reflection. A filterable campus directory labels every entry example/unverified. Routine preferences default to one check-in and allow up to three; they schedule nothing. Demo reflection text is temporary, editable and clearable.

## Architecture and data flow
The existing Vite source is preserved. `prototype/` is a separate Next.js App Router app using strict TypeScript and Tailwind. Static server-rendered layout/help pages surround client Care Loop and support filter components. Typed original content and deterministic mapping live in `lib/content.ts`.

Emotion + optional context → pure mapping → reflection + two actions → example support → optional usefulness response. Only React state holds selections, routine preference and text. No API routes, database, cookies, localStorage, model calls, analytics or remote fonts. Refresh/navigation can clear state. Text is never analyzed or transmitted.

## Acceptance and verification
Global help navigation, visible focus, native controls, semantic headings and responsive layout are required. Run lint, strict typecheck, mapping and accessible interaction/navigation tests, production build, and HTTP checks on all routes. Manual screen-reader/device checks remain a follow-up; automated DOM tests cannot establish complete accessibility.
