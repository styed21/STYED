# STYED reference motion study

Studied the two supplied recordings at regular intervals, then sampled the key transitions at 0.5-second intervals. The recordings are UI references; STYED's own photographs and organization content supply the finished site.

## Observations and implementation

| Recording interval (approximate) | Observed behavior                                                                                          | STYED implementation                                                                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tribe 00:00–00:09                | Inset moving-photo hero, fixed navigation, masked typography                                               | Existing photo slideshow, short line entrances, independent image zoom, manual and pause controls                                                    |
| Tribe 00:09–00:15                | Vertical scrolling holds a section while a row of colored photo cards moves horizontally                   | ProgramRail: one pinned timeline, measured track travel, individually tilted cards, counter-moving images, progress line, numbered controls          |
| Tribe 00:18–00:21                | Location cards turn to reveal photographs                                                                  | The existing service sculptures retain their own 3D interaction; location-card content is not copied                                                 |
| Tribe 00:21–00:24                | Scattered rotated photographs cross a colored section at different speeds                                  | CommunityMontage: four STYED photographs around the mentorship statement, separate depth/rotation, image motion inside each frame, scroll-drawn line |
| Barr 00:04–00:12                 | Large torn edges carry a dark sheet into and out of the viewport; small side navigation follows the reader | PaperEdge and Chapters: natural document flow, supplied edge silhouettes, shallow edge shadows, sticky chapter navigation                            |
| Barr 00:18–00:26                 | Layered cut-paper photographs and color changes; images and headings resolve progressively                 | PhotoCollage: four masked photographs per chapter, two colored paper fragments, independent scroll depth and progressive text entrance               |

Barr's sequence is naturally scrolling paper, not three viewport-sized panels wiping over one another. The old pinned chapter implementation was removed. Only Tribe's horizontal photograph section uses pinning.

## Motion behavior

- Desktop rail pinning requires at least 960px width and 660px height. Its distance derives from actual track overflow.
- Small screens use native horizontal touch scrolling for the rail and ordinary vertical reading for the chapters.
- Arrow keys, Home, End, numbered controls, and card links provide access to the rail.
- Collage travel reduces from 115px to 32px per depth unit on small screens.
- Reduced-motion preferences remove pinning, automatic reveals and scroll-linked transforms.
- GSAP contexts and media-query lifecycles revert animations and listeners when components unmount or breakpoints change.
- The 3D renderer remains lazy-loaded and pauses outside the viewport.
- Donation access remains in the header and a dedicated giving section.

## Verification

TypeScript compilation, production prerendering, and local page/asset/anchor validation pass. The local development URL responds successfully. The production build was checked in Chromium at 1440 × 900 and 390 × 844. Screenshots verified full-width joined silhouettes. Scroll comparisons verified changing photo transforms, internal image zoom, section colors, and edge shape. Reduced-motion checks confirmed static transforms and no rail pinning. The giving route loaded without page errors.

These effects follow the observable motion structure in the supplied recordings. Exact original easing values and proprietary interaction code were not available in the saved HTML.

## Paper-edge correction

The original masks preserved their SVG aspect ratios, creating a narrow strip, and one source silhouette was oriented for a bottom edge. PaperEdge now renders the supplied edge-02 outline directly with preserveAspectRatio="none" and a solid base. Horizontal mirroring happens inside an SVG group, independently of GSAP scaleY, so animated mirroring cannot invert the sheet. Fine photo masks also declare preserveAspectRatio="none".
