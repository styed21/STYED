import type { RefObject } from "react";
import { gsap, useGSAP, useReducedMotion } from "./useMotion";

export type VisibleTimeline = ReturnType<typeof gsap.timeline>;

/** Run decorative motion only while its component and browser tab are visible. */
export function useVisibleAnimation(
  root: RefObject<HTMLElement | null>,
  build: (timeline: VisibleTimeline) => void,
) {
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;
      if (reduced) {
        element.setAttribute("data-motion", "reduced");
        return () => element.removeAttribute("data-motion");
      }
      const timeline = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 0.6,
      });
      build(timeline);
      let visible = false;
      const update = () => {
        const running = visible && !document.hidden;
        timeline.paused(!running);
        element.setAttribute("data-motion", running ? "playing" : "paused");
      };
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting && entry.intersectionRatio >= 0.12;
          update();
        },
        { threshold: 0.12 },
      );
      observer.observe(element);
      document.addEventListener("visibilitychange", update);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", update);
        element.removeAttribute("data-motion");
      };
    },
    { scope: root, dependencies: [reduced, build], revertOnUpdate: true },
  );
  return reduced;
}
