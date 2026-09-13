# Programs illustrations and drug prevention

The Programs page now opens with four original SVG scenes based on the supplied visual reference. They use STYED's existing Montserrat typography, warm paper surfaces, blue, sage, and orange. The existing Circular Split Roll and program disclosures remain below the hero.

## Components

- `components/ui/programs-illustrated-hero.tsx`: education and tutoring, housing guidance, community conversation, and family rights support. The illustrations include articulated people, a key, books, plants, and program icons. Each scene links to its corresponding program disclosure.
- `components/ui/drug-prevention.tsx`: four separate prevention symbols alongside practical program information. The section is available directly at `programs.html#drug-prevention` and through the hero and Community Safety disclosure.
- `components/ui/prevention-objects.tsx`: independent Syringe, Tablet, Cannabis, and Powder React components, each with a complete SVG fallback, a label, and a small prevention badge that does not obscure the object.
- `src/graphics/preventionModels.ts`: four independently constructed Three.js models, including raised syringe markings, a recessed tablet score, serrated leaves, and an instanced granular powder surface.
- `src/graphics/preventionScene.ts`: one lazy-loaded WebGL context renders four independent viewports. Each object's own ScrollTrigger controls its turn, lift, and depth. Pointer movement adds a small tilt. Soft procedural shadow shaders anchor the models to their panels.
- `src/programs-illustrations.css`: scoped desktop, tablet, mobile, hover, and reduced-motion styles. The four scenes form a continuous landscape on desktop and a two-column layout on mobile.

The hero uses the shared `useVisibleAnimation` hook for gestures, head movements, the key, plants, conversation rays, and dashed connecting lines. The prevention symbols use separate scroll timelines and one visibility-aware render loop. Both pause offscreen and in hidden tabs. Reduced motion disposes the prevention canvas and keeps all four static SVG symbols visible. WebGL context loss also restores the SVGs; context restoration redraws the models. Cleanup releases observers, listeners, timelines, geometries, materials, and instance buffers. No playback controls, additional dependencies, or remote asset services are introduced.

The symbols appear in a two-column arrangement on desktop and stack individually on narrow phones to keep every shape large enough to read. Text and prevention badges are native HTML/SVG outside the WebGL layer.

The homepage hero's previous/next controls, pause button, pagination, count, divider, and scroll prompt were removed at the user's request. Its image slideshow, captions, WebGL transitions, focus pausing, and reduced-motion behavior remain.

## Content

The prevention copy follows the supplied PRD: supervised after-school activities, consistent mentorship, life skills, leadership, college guidance, and housing referrals. It describes STYED's prevention and diversion approach without adding treatment services, program outcomes, or enrollment details that were not supplied.

The program inquiry button leads to `contact.html?topic=programs#message`; the second link opens the dedicated Mentorship page. Contact delivery and donations remain in their previously documented preview state.

## Validation

Run `npm run build` and `npm run check:output` to type-check, prerender all seven pages, and validate public links and assets. Browser verification covers desktop and mobile layout, SVG animation, reduced-motion rendering, offscreen pausing, program disclosure links, and the prevention section's direct URL.

Integration files before the initial illustrations are saved in `.cache/before-programs-illustrations/`. The single crossed-out illustration and hero component before this revision are saved in `.cache/before-prevention-webgl/`. Original reference material under `STYED/` is unchanged.
