# vibeslides

Motion Canvas-based slide framework with a separate presenter-notes view.

Built on [Motion Canvas](https://motioncanvas.io/). Adds:

- `slide(name, notes?, owner?)` — slide marker with colocated presenter notes.
- A second-window **notes view** (`notes.html`) that mirrors current/next slide via `BroadcastChannel`. Notes are harvested from scenes at build time by a Vite plugin (no runtime cost).
- A standalone **presenter build** (`pnpm build`) that ships `index.html` as a fullscreen presenter (no editor UI) plus `notes.html`.
- Slide + fullscreen state persisted in `localStorage` — reload mid-talk and you stay on the right slide.
- Dev server auto-opens both the present view and the notes view.

## Quick start

```bash
pnpm install
pnpm start   # opens editor + notes tabs
```

Edit `src/scenes/example.tsx` or add new scenes and register them in `src/project.ts`.

## Authoring slides

```tsx
import { slide } from '../lib/slide';

yield* slide(
  'my-slide-id',
  `Notes shown in the presenter view. Multiline OK.`,
  'speaker-name', // optional owner tag
);
```

The `notes` and `owner` args are stripped at runtime — they're parsed from source at build time and exposed via the `virtual:slide-notes` module to the notes app.

## Keys (presenter window)

- `Space` — play through current slide
- `→` / `PageDown` — next
- `←` / `PageUp` — prev
- `Home` / `End` — first / last
- `F` — toggle fullscreen
- `N` — open notes window

## Structure

- `src/lib/slide.ts` — `slide()` helper (notes-aware `beginSlide`)
- `src/lib/presenter-bridge.ts` — Presenter ↔ notes BroadcastChannel + state restore
- `src/lib/slide-layout.tsx` — title-at-top layout helper
- `src/lib/theme.ts` — colors / fonts / sizes
- `src/lib/bg.tsx`, `src/lib/counter.tsx` — small helpers
- `src/notes/` — notes-window app (HTML entry is `notes.html` at repo root)
- `vite.config.ts` — slide-notes plugin, presenter-bridge injector, present-build plugin, dev auto-open

## Build

```bash
pnpm build
```

Outputs `dist/` with `index.html` (fullscreen presenter) and `notes.html` (notes view, opens via `N`).

## License

MIT
