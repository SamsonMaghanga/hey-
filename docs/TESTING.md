# Testing and review

Use synthetic examples throughout. Do not ask participants to disclose personal or health information.

## Automated checks

Run from `prototype/` after `npm ci`:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

| Check | What it establishes |
| --- | --- |
| Lint | General ESLint/TypeScript rules; Next-specific ESLint rules are not configured |
| Typecheck | Strict TypeScript compilation without emitting output |
| `tests/content.test.ts` — 4 tests | Seven actions; all 35 emotion/context combinations return two distinct valid actions; practical overrides; defaults and deduplication |
| `tests/interactions.test.tsx` — 4 tests | Keyboard selection and results, rule explanation, action selection, temporary reflection confirmation, routine/selection reset, required emotion, support filtering and navigation links |
| Production build | Next.js compilation, type validation and route generation |

All eight tests, lint, typecheck and build passed in cloud and user-supplied WSL output on 17 October 2026. No tests were skipped in those runs. Test interaction coverage uses jsdom, not a real browser. Link tests inspect destinations rather than performing browser navigation. The existing reset test asserts routine and emotion reset; manual checking below also verifies note removal.

The production cloud instance returned HTTP 200 with expected text on `/`, `/support` and `/help`. User-supplied Vercel logs confirmed the same Next.js routes built successfully, and the user confirmed the site worked. This does not constitute a complete accessibility or clinical evaluation.

## Manual smoke test

1. Open home on a narrow mobile viewport and a desktop viewport. Confirm the heading, demo notice and privacy explanation are readable without horizontal scrolling.
2. Tab through navigation and controls. Confirm focus remains visible; use the skip link. Check emotion radios using Space and arrow keys.
3. Open the demo and submit without a feeling. Confirm the native required-field validation prevents suggestions.
4. Select **Overwhelmed + Study**. Expect **Shrink the next task** first and **Find your surroundings** second. Open the mapping explanation.
5. Select an action, then skip. Neither choice should block further exploration.
6. Enter an invented note such as “Alex might open the reading list.” Confirm it remains editable, clear it, and enter it again. Refresh: the note and check-in should be gone.
7. Enter a note again, reset the demo, then reopen and complete a check-in. Confirm the note is empty and the routine preference has returned to one.
8. Change routine count to two and three. Confirm the text explains that no notifications are sent. No notification-permission prompt should appear.
9. Open campus support and filter by Housing. Expect one example housing entry, visibly unverified, with no booking/contact action. Use return navigation.
10. Open help directly and from navigation. Confirm emergency guidance, the unmonitored-service explanation and the synthetic-data requirement.
11. Check `/help` and `/support` as direct URLs, including after refreshing those routes.

Before calling accessibility verified, also test a screen reader, text zoom, contrast, focus/readout after dynamic results, and mobile touch targets. These checks are outstanding.

## First usability review

Invite 3–5 students, including international students where possible, to use invented scenarios. Explain participation is optional and the prototype is not care. Ask them to complete a check-in, find the explanation, skip an action, find an example service, and explain what refresh does to entries.

Record interface problems and task observations without health details or identifying information. Do not add analytics or record sessions without a separately agreed consent/privacy process. Treat perceived usefulness as product feedback, not evidence of clinical effectiveness.

## Common local problems

- **No package.json:** run commands in the checkout's `prototype/` folder. The cloud `/workspace` path is not a WSL path.
- **npm ci needs a lockfile:** verify the GitHub checkout includes `prototype/package-lock.json`; use the prototype branch. Do not run npm in your home directory.
- **`[200~npm` not found:** stray terminal paste characters were included. Press Ctrl+C and type/paste the clean command without `[200~` or trailing `~`.
- **Port occupied:** stop the server you started, or use `npm run dev -- --port 3001` and open the printed address.
- **Next.js ESLint plugin warning:** the build can succeed while this warning remains. General lint and Next-specific lint coverage are different.
