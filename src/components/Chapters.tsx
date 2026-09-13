import { useRef, useState } from "react";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  useReducedMotion,
} from "../hooks/useMotion";
import { Arrow } from "./Arrow";
import { PhotoCollage } from "./PhotoCollage";
import { PaperEdge } from "./PaperEdge";

const chapters = [
  {
    number: "01",
    kicker: "EDUCATION & MENTORSHIP",
    title: ["What happens", "when someone", "believes in you?"],
    emphasis: 2,
    description:
      "A question becomes confidence. Homework becomes progress. With free tutoring and a consistent mentor, young people have room to discover what comes next.",
    main: "education.webp",
    secondary: "mentor.webp",
    alt: "Students learning with the support of an educator",
    link: "./programs.html#education",
    linkLabel: "Explore education & mentorship",
    word: "LEARN.",
  },
  {
    number: "02",
    kicker: "COMMUNITY SAFETY & STABILITY",
    title: ["A safer today.", "A stronger", "tomorrow."],
    emphasis: 0,
    description:
      "Young people deserve more than a way through. We connect violence prevention, housing advocacy, and community support to make a safer future possible.",
    main: "community.webp",
    secondary: "classroom.webp",
    alt: "Community members learning and working together",
    link: "./programs.html#safety",
    linkLabel: "Our safety & stability work",
    word: "THRIVE.",
  },
  {
    number: "03",
    kicker: "IMMIGRANT YOUTH & FAMILY RIGHTS",
    title: ["Different stories.", "A shared sense", "of belonging."],
    emphasis: 2,
    description:
      "Every young person deserves a voice and a way forward. We stand with immigrant youth and families through rights education, legal navigation, and leadership.",
    main: "opportunity.webp",
    secondary: "youth.webp",
    alt: "A young woman pursuing her education",
    link: "./programs.html#rights",
    linkLabel: "Opportunity for every young person",
    word: "BELONG.",
  },
] as const;

const supportingPhotos = [
  [
    { image: "classroom.webp", alt: "A student high-fiving an educator" },
    { image: "youth.webp", alt: "Young people smiling together" },
  ],
  [
    { image: "housing.webp", alt: "Temporary shelters in a city neighborhood" },
    {
      image: "hero-mentorship.webp",
      alt: "Students working together around a table",
    },
  ],
  [
    { image: "community.webp", alt: "Community members gathering to learn" },
    {
      image: "together.webp",
      alt: "Children taking part in a classroom activity",
    },
  ],
];

export function Chapters() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".paper-chapter");
      panels.forEach((panel, index) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });
      });
      if (reduced) return;
      const media = gsap.matchMedia();
      media.add(
        { desktop: "(min-width: 960px)", mobile: "(max-width: 959px)" },
        (context) => {
          const desktop = context.conditions?.desktop;
          const travel = desktop ? 150 : 48;
          panels.forEach((panel, panelIndex) => {
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                end: "bottom 10%",
                scrub: 0.45,
              },
            });
            panel
              .querySelectorAll<HTMLElement>("[data-depth]")
              .forEach((layer, index) => {
                const depth = Number(layer.dataset.depth);
                timeline.fromTo(
                  layer,
                  {
                    x: (index % 2 ? 1 : -1) * (desktop ? 65 : 15),
                    y: travel * depth,
                    rotation: index % 2 ? -12 : 10,
                    scale: 0.88,
                  },
                  {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: index % 2 ? 3 : -3,
                    ease: "power1.out",
                    duration: 0.55,
                  },
                  0,
                );
                timeline.to(
                  layer,
                  {
                    y: -travel * depth * 0.65,
                    rotation: index % 2 ? 7 : -6,
                    ease: "none",
                    duration: 0.45,
                  },
                  0.55,
                );
              });
            timeline.fromTo(
              panel.querySelectorAll(".story-photo img"),
              { scale: 1.18, yPercent: -3 },
              { scale: 1.06, yPercent: 2, ease: "none", duration: 1 },
              0,
            );
            gsap.fromTo(
              panel,
              { "--sheet": ["#35414a", "#c5c6b9", "#c0d098"][panelIndex] },
              {
                "--sheet": ["#28282e", "#e8e7db", "#dce6b2"][panelIndex],
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top bottom",
                  end: "top 30%",
                  scrub: 0.4,
                },
              },
            );
            timeline.fromTo(
              panel.querySelector(".collage-thread"),
              { rotation: -8, y: 30 },
              { rotation: 6, y: -30, ease: "none", duration: 1 },
              0,
            );
            gsap.fromTo(
              panel.querySelectorAll(".paper-chapter-title span"),
              { opacity: 0.25, y: 24 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.13,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 78%",
                  end: "top 20%",
                  scrub: 0.4,
                },
              },
            );
            gsap.fromTo(
              panel.querySelector(".paper-chapter-detail"),
              { opacity: 0.3, y: 18 },
              {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 65%",
                  end: "top 15%",
                  scrub: 0.4,
                },
              },
            );
            gsap.fromTo(
              panel.querySelector(".paper-seam-outline"),
              { scaleY: 0.65 },
              {
                scaleY: 1.12,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top bottom",
                  end: "top top",
                  scrub: true,
                },
              },
            );
          });
        },
      );
      return () => media.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      className="paper-stories"
      id="our-work"
      ref={root}
      aria-label="Our work in three chapters"
    >
      <div className="paper-navigation-track">
        <nav className="paper-navigation" aria-label="Our work chapters">
          {chapters.map((chapter, index) => (
            <a
              key={chapter.number}
              href={"#chapter-" + index}
              aria-label={chapter.kicker}
              className={active === index ? "is-active" : ""}
              aria-current={active === index ? "step" : undefined}
            >
              <span>{chapter.number}</span>
              <span className="chapter-nav-label">
                {["Learning", "Safety", "Belonging"][index]}
              </span>
            </a>
          ))}
        </nav>
      </div>
      {chapters.map((chapter, index) => (
        <article
          key={chapter.number}
          id={"chapter-" + index}
          className={"paper-chapter paper-chapter-" + index}
        >
          <PaperEdge mirror={index === 1} />
          <div className="paper-chapter-inner">
            <div className="paper-chapter-copy">
              <span className="eyebrow">
                {chapter.number} / {chapter.kicker}
              </span>
              <h2 className="paper-chapter-title">
                {chapter.title.map((line, i) => (
                  <span
                    key={line}
                    className={i === chapter.emphasis ? "is-emphasized" : ""}
                  >
                    {line}
                  </span>
                ))}
              </h2>
              <div className="paper-chapter-detail">
                <p>{chapter.description}</p>
                <a className="text-link" href={chapter.link}>
                  {chapter.linkLabel}
                  <Arrow />
                </a>
              </div>
            </div>
            <PhotoCollage
              photos={[
                { image: chapter.main, alt: chapter.alt },
                {
                  image: chapter.secondary,
                  alt: [
                    "An educator supporting a student",
                    "A student and educator sharing a high-five",
                    "Young people smiling together",
                  ][index],
                },
                ...supportingPhotos[index],
              ]}
              label={
                [
                  "Small steps. Real possibilities.",
                  "Stronger, together.",
                  "You belong here.",
                ][index]
              }
            />
          </div>
          {index === chapters.length - 1 && <PaperEdge bottom />}
        </article>
      ))}
    </section>
  );
}
