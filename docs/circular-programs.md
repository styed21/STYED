# Circular program overview and glass navigation

`components/ui/circular-split-roll.tsx` contains the component copied from the supplied attachment. It replaces the earlier custom adaptation. The project already supports React, TypeScript, Tailwind 4, the `@` alias, and shadcn's `components/ui` structure. GSAP is already installed and locked; no framework migration or additional package is needed.

`src/pages/Programs.tsx` supplies four STYED program labels and local photographs from `src/data/content.ts`. The attachment's embedded sample images and ten placeholder names are omitted. Full program names and information remain in native disclosures below, with the original `education`, `housing`, `safety`, and `rights` anchors. Incoming fragment links open the corresponding disclosure and position it below the fixed header.

The component retains the supplied split columns, square photo cards, opposing circular paths, depth-based scale and opacity, rounded corners, shadows, and full-rotation scroll pinning. The extra numbered controls and caption panel from the earlier adaptation have been removed. The page passes the demo's 500px horizontal radii and 205px card size. Its existing vertical-radius props are set to 280px to fit four programs, and `focusPhase={3}` brings Education into focus initially. Other program labels are Stability, Safety, and Belonging.

Integration fixes:

- Animation and visibility share the 769px breakpoint. There is no minimum-height gate, so narrower or shorter desktop windows retain the roll.
- Column offsets scale with the source's responsive radii, keeping photos inside the viewport between focused positions.
- A GSAP tween drives progress so numeric scrub smooths the animation. Media/context cleanup removes pinning when the preference or viewport changes.
- The fallback uses a responsive screen-reader utility without colliding with the site's existing unlayered `.sr-only` rule. Mobile and reduced-motion layouts show the supplied photo grid with a natural content height.

The component retains the source's original full-cycle behavior: scrolling through all four programs returns to Education before releasing the pin. No additional animation controls have been introduced.

The component uses its supplied Tailwind utilities. `src/program-roll.css` only styles the information disclosures below it. `src/header-glass.css` adds blur, saturation, translucent backgrounds, and subtle edge highlights to the shared navigation. A darker tint supports white text over hero media; a light tint supports dark text on interior pages and after scrolling. Opaque fallbacks cover browsers without backdrop filtering and increased contrast/reduced transparency preferences. Existing site typography and other page layouts are retained.

Browser verification covers 843×662, 1054×827, and 1440×900 desktop viewports; all four focused programs and reverse scrolling; resize transitions; the 390×844 mobile grid; live reduced-motion changes; loaded images; no horizontal overflow; and the Safety deep link on desktop and mobile. The production build includes TypeScript checks and prerenders all five routes. Run `npm run check:output` to validate generated links and assets.

Local checkpoints: `.cache/before-circular-programs/` preserves the restored site before the first integration. `.cache/before-exact-roll/` preserves the rejected adaptation before copying the supplied component.
