import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, useGSAP, useReducedMotion } from "../hooks/useMotion";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(root.current, {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 92%", once: true },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
