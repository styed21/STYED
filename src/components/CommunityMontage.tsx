import { useRef } from "react";
import { asset } from "../data/content";
import { gsap, useGSAP, useReducedMotion } from "../hooks/useMotion";
import { Arrow } from "./Arrow";

const photos = [
  {
    image: "classroom.webp",
    alt: "A student and educator sharing a high-five",
    caption: "A little encouragement.",
  },
  {
    image: "hero-mentorship.webp",
    alt: "Students learning together around a table",
    caption: "People in your corner.",
  },
  {
    image: "youth.webp",
    alt: "Young people smiling together",
    caption: "Room to be yourself.",
  },
  {
    image: "together.webp",
    alt: "Children taking part in classroom activities",
    caption: "Possibilities ahead.",
  },
];

/** Tribe's scattered-photo composition, with restrained typography for STYED. */
export function CommunityMontage() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced) return;
      const media = gsap.matchMedia();
      media.add(
        { desktop: "(min-width: 960px)", mobile: "(max-width: 959px)" },
        (context) => {
          const desktop = context.conditions?.desktop;
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.75,
            },
          });
          gsap.utils
            .toArray<HTMLElement>(".community-photo")
            .forEach((photo, i) => {
              const direction = i % 2 ? 1 : -1;
              timeline.fromTo(
                photo,
                {
                  y: desktop ? 100 + i * 25 : 25,
                  x: desktop ? direction * 35 : 0,
                  rotate: direction * 9,
                  scale: 0.94,
                },
                {
                  y: desktop ? -70 - i * 20 : -25,
                  x: desktop ? -direction * 18 : 0,
                  rotate: -direction * 4,
                  scale: 1.02,
                  ease: "none",
                  duration: 1,
                },
                0,
              );
              timeline.fromTo(
                photo.querySelector("img"),
                { yPercent: -5, scale: 1.13 },
                { yPercent: 5, scale: 1.13, ease: "none", duration: 1 },
                0,
              );
            });
          gsap.fromTo(
            ".community-drawing path",
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top 65%",
                end: "center center",
                scrub: 0.6,
              },
            },
          );
          gsap.fromTo(
            ".community-copy",
            { y: 35, opacity: 0.3 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top 75%",
                end: "top 20%",
                scrub: 0.5,
              },
            },
          );
        },
      );
      return () => media.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section className="community-montage" id="mentorship-feature" ref={root}>
      <div className="community-copy">
        <span className="eyebrow">The difference a mentor makes</span>
        <h2>
          Someone
          <br />
          in your corner.
        </h2>
        <p>
          A familiar face. A little encouragement.
          <br />
          Support that keeps showing up.
        </p>
        <a className="button button-white" href="./mentorship.html">
          Explore mentorship <Arrow />
        </a>
      </div>
      <div className="community-photos">
        {photos.map((photo, i) => (
          <figure
            className={"community-photo community-photo-" + i}
            key={photo.image}
          >
            <div className="community-photo-window">
              <img
                src={asset(photo.image)}
                alt={photo.alt}
                width="800"
                height="650"
                loading="lazy"
              />
            </div>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <svg
        className="community-drawing"
        viewBox="0 0 1000 720"
        fill="none"
        aria-hidden="true"
      >
        <path
          pathLength="1"
          d="M292 100C246 50 233 83 256 105C283 132 305 101 292 100ZM670 550C730 470 760 550 720 562C680 581 654 557 668 523M716 548L721 567L741 564"
        />
      </svg>
      <div className="community-signoff">
        <span>Real connections. Lasting support.</span>
        <span>Minneapolis & the Twin Cities</span>
      </div>
    </section>
  );
}
