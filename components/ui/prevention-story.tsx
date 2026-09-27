import { useRef } from "react";
import { gsap, useGSAP, useReducedMotion } from "@/src/hooks/useMotion";
import { asset } from "@/src/data/content";

/** Original client artwork, displayed in full without filters or overlays. */
export function PreventionStory() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".prevention-story-image",
        { y: 18, scale: 0.97 },
        {
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 90%",
            end: "center 45%",
            scrub: 0.65,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <div className="prevention-story" ref={root}>
      <img
        className="prevention-story-image"
        src={asset("prevention-original.png")}
        alt="Drug prevention illustration showing young people, the brain, warning signs, and substance use risks."
        width="1024"
        height="1024"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
