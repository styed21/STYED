# STYED Official

An animated organization website for Save The Youth Education Development, serving Minneapolis and the Twin Cities.

## Production preview

Open **http://127.0.0.1:4173/** while the production preview server is running. **Preview-STYED.cmd** rebuilds the React application and starts this preview. It serves the compiled, prerendered application from dist/.

## Start locally

Double-click **Start-STYED.cmd**, then open **http://127.0.0.1:5173/**.

With Node.js 22.12+ available on PATH:

```sh
npm ci
npm run dev
```

Use the Vite URL instead of opening index.html directly or using a generic HTML Live Server. On this machine the launcher can also use the portable Node runtime installed under the local application-data directory.

## Stack

- React 19.3 and TypeScript 7 with strict type checking.
- Vite 8 for development and optimized production builds.
- GSAP 3.15, ScrollTrigger, and @gsap/react for scoped animation lifecycles.
- Three.js 0.186 for the GSAP-driven hero displacement shader and four original service sculptures.
- Tailwind CSS 4, shadcn-compatible aliases and tokens, and reusable UI components in `components/ui`.
- Framer Motion, next-themes, and a precomputed dotted-map for the Twin Cities location section.
- Lenis smooth wheel scrolling; touch scrolling remains native.
- React DOM Server prerendering for all seven routes, followed by client hydration.
- CSS design tokens, responsive layouts, local fonts, and optimized WebP photography.

Stable versions were resolved from the npm registry for this rebuild and are pinned in package.json and package-lock.json.

## Project structure

```text
components/ui/      Reusable WorldMap and STYED location section
src/
  components/       Shared navigation, photo rail, paper chapters, collages, calls to action
  data/             Typed program and slideshow content
  lib/              Smooth-scroll navigation bridge
  graphics/         Three.js hero shader, service models, and renderer lifecycle
  hooks/            Animation setup and reduced-motion preference
  pages/            Home, About, Programs, Mentorship, Get Involved, Donate, Contact
  App.tsx           Shared page composition
  main.tsx          Development rendering / production hydration
  entry-server.tsx  Server-side render entry for static output
  styles.css        Brand system and shared responsive layouts
  motion.css        Photo rail, paper collages and scroll compositions
  theme.css         Tailwind v4 and shadcn semantic tokens
  refinement.css    Montserrat typography, hero WebGL layer, map and research notes
public/assets/      Public website assets only
scripts/            Prerender and production-output validation
```

## Reference interpretation

The supplied videos were sampled throughout their duration to study the UI. Their hospitality content, partner stories, and statistics are not used.

- **Tribe:** inset photo slideshow, staggered line masks, fixed navigation, and a moving photo montage. Typography is deliberately lighter and smaller to suit STYED.
- **Barr Foundation:** muted blue, dark, and sage chapters, torn-paper transitions, layered photo collages, side chapter navigation, scroll-linked reveals.
- **STYED:** supplied organization copy, original supplied logo, supplied photographs, education, mentorship, housing stability, safety, and immigrant youth/family rights.

Motion is scoped and reverted with useGSAP and gsap.matchMedia. The horizontal photo rail pins only on larger screens with no reduced-motion preference; touch devices use a native horizontal rail. Paper chapters remain in normal document flow, with independently moving photo layers and sticky section navigation. Slideshow autoplay stops when offscreen, when the tab is hidden, after manual interaction, and for reduced motion. All highlights can be selected manually. Navigation uses a native modal dialog, Escape handling, focus restoration, and scroll locking.

Service sculptures respond to pointer movement and selection. Rendering pauses outside the viewport, in hidden tabs, and with reduced motion. Supplied photography remains the fallback when WebGL is unavailable. Visible pause/stop controls have been removed from the site at the user's request, including the map, service sculptures, and donation illustration. The homepage program rail's discovery prompt, progress line, and numbered shortcut strip have also been removed; its scroll animation and keyboard navigation remain. Donation links are prominent in the header and a dedicated giving section.

The reference analysis and implementation map are in [docs/reference-motion.md](docs/reference-motion.md).

The Programs page uses the supplied Circular Split Roll component for the four main programs, with local STYED photographs, opposing circular title/photo paths, a mobile and reduced-motion grid, and program details below. Desktop animation starts at 769px with no minimum-height restriction. The shared header uses a blurred glass surface. See [docs/circular-programs.md](docs/circular-programs.md) for component paths, integration fixes, browser checks, and checkpoints.

The separate [Contact page](http://127.0.0.1:4173/contact.html) follows the supplied photo-banner, form, map, and volunteer-callout reference in STYED's existing brand. Its form validates entries and offers a local preview with copy/edit controls; it does not deliver messages. Header, menu, footer, and involvement links lead to this page. The shared donation button follows the supplied rounded red heart-in-hands reference. See [docs/contact-page.md](docs/contact-page.md) for configuration, behavior, and validation.

The dedicated [Mentorship page](http://127.0.0.1:4173/mentorship.html) uses two live vector components based on the supplied illustrations: a large articulated group-mentoring hero, and overlapping hand/heart/head shapes with selectable descriptions. Their GSAP timelines pause offscreen and in hidden tabs, with static reduced-motion rendering. Header, menu, footer, home, and program links lead to the new page; the earlier Programs mentorship anchor remains available. See [docs/mentorship-page.md](docs/mentorship-page.md).

The [Programs page](http://127.0.0.1:4173/programs.html) opens with four connected, live SVG scenes adapted from the supplied illustration. Each opens its program details. The drug-prevention section displays four separate Three.js symbols with individual scroll-driven rotations, soft shader shadows, and SVG fallbacks. Each symbol has a small prevention badge that leaves its shape unobstructed. Rendering pauses offscreen and in hidden tabs, and reduced motion uses the static illustrations. The homepage hero's playback controls, pagination, counter, and scroll prompt have been removed. See [docs/programs-illustrations.md](docs/programs-illustrations.md).

The supplied map component, dependency setup, aliases, and WebGL changes are documented in [docs/map-integration.md](docs/map-integration.md). The production framework remains React/Vite; the map uses a native image in place of Next.js image optimization.

## Production build

```sh
npm run build
npm run check:output
npm run preview
```

Upload **only the contents of dist/** to the static hosting web root. Page URLs end in .html, so no SPA rewrite is required. Prerendered HTML contains the page content before JavaScript loads.

Do not publish STYED/, .archive/, source documents, or development files. Original materials contain private hosting information. The development server binds to localhost and denies reference and archive directories.

The output checker verifies prerendered content, headings, IDs, local assets, anchor destinations, CSS assets, video posters, and exclusion of private directories. Earlier production browser verification covered the original four pages at 1440 × 900 and 390 × 844, full-width paper joins, scroll-driven photograph transforms, image zoom, color transitions, resizing, and reduced motion. The new donation page passed TypeScript, prerendering, all 248 link/asset checks, amount boundary checks, demo-only state checks, video decoding, and local HTTP checks. It has not had a browser interaction pass in this change.

## Before launch

The separate donation page is at `donate.html`. It uses the supplied ten-second video with unobstructed muted playback, offscreen pausing, reduced-motion behavior, and an optimized local MP4/poster. The form supports preset/custom USD amounts, one-time/monthly gifts, a program preference, a review screen, and a demo thank-you screen. Sample donor and card details are read-only. Nothing is charged, persisted, or sent, and no recurring subscription is created. Donation links throughout the site point to this page.

The PRD supplies no verified public email, enrollment contact, program schedule, or donation provider. Add verified contact details and a real payment integration before opening donations. Do not turn the demo into a live payment form by simply removing its labels.

Verify publication rights for supplied photography and font assets referenced by the supplied design source.

The earlier static implementation is preserved in .archive/. Original client material under STYED/ is unchanged.
