import { useEffect, useRef, useState } from "react";
import { asset, programs } from "../data/content";
import { useReducedMotion, gsap, useGSAP } from "../hooks/useMotion";
import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";
import type { ServiceScene } from "../graphics/serviceScene";

const labels = ["Learning", "A stable home", "Community safety", "Belonging"];
const summaries = [
  "Free tutoring, homework help, and a mentor who is there for you.",
  "Housing support and referrals that help young people stay in school.",
  "Preventing gun violence and supporting safer neighborhoods.",
  "Rights education and support for immigrant youth and families.",
];

/** The 3D enhancement never gates the service information or navigation. */
export function Services() {
  const root = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<ServiceScene | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  const reduced = useReducedMotion();
  const program = programs[active];

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let started = false;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        try {
          const { createServiceScene } =
            await import("../graphics/serviceScene");
          if (disposed) return;
          const instance = createServiceScene(element);
          scene.current = instance;
          instance.select(activeRef.current);
          instance.setMotion(
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          );
          setReady(true);
        } catch {
          // A supplied photograph remains visible when WebGL is unavailable.
          setReady(false);
        }
      },
      { rootMargin: "250px" },
    );
    observer.observe(element);
    return () => {
      disposed = true;
      observer.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  useEffect(() => {
    scene.current?.setMotion(!reduced);
  }, [reduced, ready]);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".service-description",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      );
    },
    { scope: root, dependencies: [active, reduced], revertOnUpdate: true },
  );

  const select = (index: number) => {
    activeRef.current = index;
    setActive(index);
    scene.current?.select(index);
  };

  return (
    <section
      className="services-section section-space"
      id="services"
      ref={root}
    >
      <div className="section-heading">
        <Reveal>
          <span className="eyebrow">How we support young people</span>
          <h2>
            Different needs.
            <br />
            <em>Connected support.</em>
          </h2>
        </Reveal>
        <p>
          Learning, safety, stability, and belonging.
          <br />
          Each one helps a young person move forward.
        </p>
      </div>
      <div className="services-layout">
        <div
          className="service-selector"
          role="tablist"
          aria-label="Explore STYED services"
          aria-orientation="vertical"
        >
          {programs.map((item, index) => (
            <button
              key={item.id}
              id={`service-tab-${item.id}`}
              role="tab"
              aria-selected={active === index}
              aria-controls="service-panel"
              tabIndex={active === index ? 0 : -1}
              className={active === index ? "is-selected" : ""}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                const keys: Record<string, number> = {
                  ArrowDown: (index + 1) % 4,
                  ArrowUp: (index + 3) % 4,
                  ArrowRight: (index + 1) % 4,
                  ArrowLeft: (index + 3) % 4,
                  Home: 0,
                  End: 3,
                };
                if (event.key in keys) {
                  event.preventDefault();
                  const next = keys[event.key];
                  select(next);
                  document
                    .getElementById(`service-tab-${programs[next].id}`)
                    ?.focus();
                }
              }}
            >
              <span className="service-number">{item.number}</span>
              <span>{labels[index]}</span>
              <Arrow />
            </button>
          ))}
        </div>
        <div
          className={`service-panel ${ready ? "scene-ready" : ""}`}
          id="service-panel"
          role="tabpanel"
          aria-labelledby={`service-tab-${program.id}`}
          tabIndex={0}
        >
          <div className="service-art">
            <img
              className="service-fallback"
              src={asset(program.image)}
              alt=""
              loading="lazy"
              width="650"
              height="450"
            />
            <div className="service-canvas" ref={host} aria-hidden="true" />
          </div>
          <div className="service-description">
            <span className="eyebrow">{program.name}</span>
            <p>{summaries[active]}</p>
            <a className="text-link" href={`./programs.html#${program.id}`}>
              Learn about this support <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
