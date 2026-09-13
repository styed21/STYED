# Mentorship page and live illustrations

`mentorship.html` is a dedicated, prerendered React page. The header, menu, footer, home community callout, and Programs mentorship callout link to it. The old `programs.html#mentorship` section remains in place for existing incoming links.

The two user-supplied images are visual references for original code-native illustrations. They are not flattened screenshots, generated photographs, embedded videos, or third-party animation embeds. No extra runtime dependency or asset service was added.

## Components

`components/ui/mentorship-scene.tsx` renders a large, responsive SVG scene: one standing mentor and three seated listeners, orange chairs, a quiet room silhouette, and a framed print. Faces, clothing, chairs, and hands are separate paths. GSAP animates the mentor's arm, head turns and nods, a listener's response gesture, and small conversation dots. The scene has an accessible title and renders fully before JavaScript loads. The hero gives the illustration roughly two-thirds of its desktop width; mobile places it at full width below the introduction.

`components/ui/mentorship-values.tsx` recreates the second reference's overlapping yellow, warm red, and blue shapes, with hand, heart, and head line art. The shapes gently change contour while the hand waves, heart pulses, and thought dot grows. Multiply blending provides the darker overlaps. Native buttons act as tabs for “Feel safe,” “Be heard,” and “Grow in confidence.” They support click, Enter/Space, Left/Right, Home/End, roving focus, `aria-selected`, and individually linked tab panels.

`src/hooks/useVisibleAnimation.ts` scopes each repeating timeline through `useGSAP`. An IntersectionObserver starts motion at 12% visibility, and `visibilitychange` pauses it in a hidden tab. Cleanup disconnects the observer, removes the listener, and reverts the GSAP context. Reduced motion renders a complete static illustration while keeping the value tabs usable. There are no added playback controls.

`src/pages/Mentorship.tsx` provides the hero, three practical support steps, the values section, a mentor invitation using the existing `mentor.webp` photo, and FAQ disclosures. `src/mentorship.css` scopes the page layout and responsive styles. Typefaces, shared glass navigation, and the donation button remain consistent with the site.

## Content and inquiries

Mentorship copy comes from the supplied PRD: consistent trained mentors, one-on-one and small-group support, free after-school academic help, life skills, leadership, and college readiness. No participant counts, schedules, eligibility thresholds, or testimonials were invented.

Inquiry buttons open `contact.html?topic=mentor#message` with mentorship selected. The Contact page remains a clearly labeled local form preview until verified public details and a delivery service are connected.

## Verification

The production build type-checks and prerenders all seven routes. The output checker validates local page links, fragment destinations, images, fonts, and private-material exclusion. Browser checks cover the large desktop illustration, visibly changing SVG transforms, animated shape contours, offscreen pausing, keyboard-controlled tabs and their matching content, reduced-motion cleanup, mobile layouts down to 320px, active navigation, and the contact subject link. Screenshots are stored in `.cache/` for local review.

The integration files before this change are preserved in `.cache/before-mentorship-page/`. Original materials under `STYED/` are unchanged.
