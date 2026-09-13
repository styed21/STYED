export type ScrollRequest = { top: number; immediate: boolean };

/** Use the active smooth-scroll controller, with native scrolling as the fallback. */
export function scrollToPosition(top: number, immediate = false) {
  const request = new CustomEvent<ScrollRequest>("styed:scroll-to", {
    cancelable: true,
    detail: { top, immediate },
  });
  if (window.dispatchEvent(request)) {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top,
      behavior: immediate || reduced ? "instant" : "smooth",
    });
  }
}
