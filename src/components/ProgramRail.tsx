import { useRef, type ReactNode } from "react";
import { asset, programs } from "../data/content";
import { gsap, useGSAP, useReducedMotion } from "../hooks/useMotion";
import { Arrow } from "./Arrow";
import { scrollToPosition } from "../lib/scroll";

/** Tribe's vertical-to-horizontal scroll sequence, with native touch scrolling. */
export function ProgramRail({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 960px) and (min-height: 660px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track =
            root.current!.querySelector<HTMLElement>(".program-track")!;
          const cards = gsap.utils.toArray<HTMLElement>(".program-film");
          const distance = () =>
            Math.max(0, track.scrollWidth - viewport.current!.clientWidth);
          root.current!.classList.add("rail-is-pinned");
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              pin: ".program-rail-stage",
              start: "top 82px",
              end: () => `+=${distance() + window.innerHeight * 0.35}`,
              scrub: 0.65,
              refreshPriority: 1,
              invalidateOnRefresh: true,
            },
          });
          timeline.to(
            track,
            { x: () => -distance(), ease: "none", duration: 1 },
            0,
          );

          cards.forEach((card, index) => {
            timeline.fromTo(
              card,
              { rotate: index % 2 ? 4 : -4, y: index % 2 ? 20 : 0 },
              {
                rotate: index % 2 ? -3 : 3,
                y: index % 2 ? -10 : 12,
                ease: "none",
                duration: 1,
              },
              0,
            );
            timeline.fromTo(
              card.querySelector("img"),
              { xPercent: -5, scale: 1.12 },
              { xPercent: 5, scale: 1.12, ease: "none", duration: 1 },
              0,
            );
          });
          animation.current = timeline;
          return () => {
            animation.current = null;
            root.current?.classList.remove("rail-is-pinned");
          };
        },
      );
      return () => media.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  const showCard = (index: number, immediate = false) => {
    const trigger = animation.current?.scrollTrigger;
    if (trigger) {
      scrollToPosition(
        trigger.start +
          ((trigger.end - trigger.start) * index) / (programs.length - 1),
        immediate,
      );
    } else {
      const card =
        viewport.current?.querySelectorAll<HTMLElement>(".program-film")[index];
      if (card)
        viewport.current?.scrollTo({
          left: card.offsetLeft - 24,
          behavior: reduced ? "instant" : "smooth",
        });
    }
  };

  return (
    <section
      className="program-rail"
      id="purpose"
      ref={root}
      aria-label="Support for Twin Cities youth"
    >
      <div className="program-rail-stage">
        {children}
        <div
          className="program-viewport"
          ref={viewport}
          role="region"
          tabIndex={0}
          aria-label="Our programs. Scroll to explore."
          data-lenis-prevent-touch
          onKeyDown={(event) => {
            if (
              event.target !== event.currentTarget ||
              !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
            )
              return;
            event.preventDefault();
            const progress =
              animation.current?.progress() ??
              event.currentTarget.scrollLeft /
                Math.max(
                  1,
                  event.currentTarget.scrollWidth -
                    event.currentTarget.clientWidth,
                );
            const current = Math.round(progress * (programs.length - 1));
            const next =
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? programs.length - 1
                  : current + (event.key === "ArrowRight" ? 1 : -1);
            showCard(Math.max(0, Math.min(programs.length - 1, next)));
          }}
        >
          <div className="program-track">
            {programs.map((program, index) => (
              <a
                className={`program-film program-film-${index}`}
                key={program.id}
                href={`./programs.html#${program.id}`}
                onFocus={() => {
                  const rect = viewport.current
                    ?.querySelectorAll(".program-film")
                    [index].getBoundingClientRect();
                  if (rect && (rect.left < 0 || rect.right > window.innerWidth))
                    showCard(index, true);
                }}
              >
                <div className="program-film-photo">
                  <img
                    src={asset(program.image)}
                    alt={program.imageAlt}
                    width="800"
                    height="600"
                    loading="lazy"
                  />
                </div>
                <div className="program-film-paper" aria-hidden="true" />
                <span className="program-film-number">
                  {program.number} / STYED
                </span>
                <div className="program-film-caption">
                  <h3>{program.shortName}</h3>
                  <p>{program.headline[0]}</p>
                  <span className="film-link">
                    <Arrow />
                    <span className="sr-only">Explore {program.name}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
