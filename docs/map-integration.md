# Map and motion integration

The existing project is React + Vite, TypeScript, and prerendered HTML with client hydration. Tailwind CSS 4 and the shadcn configuration are now installed. No setup migration is required.

## Component and style paths

- `components/ui/map.tsx`: reusable WorldMap, adapted from the supplied component.
- `components/ui/demo.tsx`: STYED location section, used on Home and About.
- `src/components/`: existing organization and layout components.
- `src/theme.css`: Tailwind imports, shadcn semantic tokens, and dark variant.
- `src/styles.css`: existing design system and page styles.
- `src/motion.css`: scroll layouts and paper transitions.
- `src/refinement.css`: lighter Montserrat typography, WebGL layer, research notes, and map styles.
- `src/lib/utils.ts`: shadcn-compatible `cn()` utility.

The root `@` alias is configured in both TypeScript and Vite. `components.json` points shadcn at `@/components/ui`. This folder gives imported UI components a predictable location and keeps them separate from organization-specific sections. shadcn can also support other configured paths; the root location follows this request.

Tailwind utilities and theme layers are enabled without Preflight so existing page resets are preserved. `shadcn info` successfully detects Vite, TypeScript, Tailwind v4, and these aliases.

## Installation and commands

All requested dependencies are installed and locked, including `next`, `dotted-map`, `next-themes`, and `framer-motion`. The app continues to run on Vite. The supplied component's `next/image` has been replaced with a native lazy-loaded image because Vite does not provide Next.js's image optimization endpoint. The installed Next package is not imported into the client bundle.

```sh
npm ci
npm run generate:map  # only needed after changing the map generator
npm run build
npm run check:output
npm run preview
```

Open http://127.0.0.1:4173/ for the built website. `Preview-STYED.cmd` builds and starts that server on this Windows machine.

## Map behavior

The supplied route API (`dots`, `lineColor`, labels, duration, and loop) remains available. A `locations` prop supports individual markers without inventing routes. STYED displays Minneapolis/Twin Cities, the service area named in the PRD. This is a regional marker, not an office address or a claim of international operations.

`scripts/generate-map.mjs` uses dotted-map to generate light and dark SVG assets. A shared equirectangular projection aligns pins and geography. Building the geography once keeps country data out of the client JavaScript bundle. The component adds unique SVG IDs, deduplicated pins, keyboard labels, pause controls, and reduced-motion/offscreen handling. ThemeProvider uses light mode for the current site; the map also supports a dark theme if the application enables it later.

## Motion and typography

`src/graphics/heroScene.ts` implements a Three.js displacement shader driven by GSAP. It combines a curved image wipe with image distortion, a slow image zoom, scroll response, and subtle pointer movement. WebGL loads dynamically, and the supplied photographs remain visible if WebGL is unavailable. GPU resources and animation handles are disposed when the scene unmounts.

Paper chapter edges, overlapping photo cutouts, image zoom, color transitions, the desktop photo rail, and the service sculptures use the existing scoped GSAP/ScrollTrigger system. Montserrat headings use restrained weights and smaller responsive sizes. The donation action remains prominent in the header and giving section.

## Additional context

The new “Why this work matters” section provides brief context with visible source links. It does not present research findings as measured STYED outcomes or imply a partnership.

- [Youth.gov: benefits of mentoring](https://youth.gov/youth-topics/mentoring/benefits-mentoring-young-people)
- [City of Minneapolis: Blueprint for Action](https://www.minneapolismn.gov/government/programs-initiatives/violence-prevention-approach/blueprint-institute/blueprint/)

See `docs/reference-motion.md` for the supplied video observations and paper transition implementation.

## Verification

The production build passed strict TypeScript compilation, prerendering of four pages, and validation of 210 local links/assets. Chrome checks at 1440 × 900 and 390 × 844 confirmed the active WebGL canvas, manual slideshow changes, loaded photographs, aligned map marker, keyboard tooltip, and pause/resume control. No page errors or horizontal overflow were found. Reduced motion removed the hero canvas and stopped map pulses. Scrolling into the second chapter changed its paper color from rgb(214, 214, 201) to rgb(232, 231, 219), advanced the edge scale, and brought content transforms to their settled positions.

The Three.js and main application chunks exceed Vite's default 500 kB uncompressed warning threshold. The WebGL renderer is dynamically imported; the country geometry is excluded from client JavaScript. Further performance tuning should be guided by representative mobile hardware before public launch.
