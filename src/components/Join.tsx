import { useRef } from "react";
import { gsap, useGSAP, useReducedMotion } from "../hooks/useMotion";
import { Arrow } from "./Arrow";

export function Join() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".join-line span", {
        yPercent: 110,
        rotate: 3,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <section className="join" ref={root}>
      <span className="eyebrow">THERE'S A PART FOR ALL OF US</span>
      <h2>
        <span className="join-line">
          <span>A little of your time.</span>
        </span>
        <span className="join-line">
          <span>
            A lot of <em>possibility.</em>
          </span>
        </span>
      </h2>
      <div className="join-bottom">
        <p>
          A little of your time.
          <br />A lasting difference in someone's life.
        </p>
        <a className="button button-ink" href="./get-involved.html">
          Find your part <Arrow />
        </a>
      </div>
    </section>
  );
}
