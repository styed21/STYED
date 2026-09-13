import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  useVisibleAnimation,
  type VisibleTimeline,
} from "../../src/hooks/useVisibleAnimation";

const values = [
  {
    name: "Feel safe.",
    title: "A steady place to start.",
    text: "A supervised space after school, with caring adults and time to settle in. Support begins with feeling safe enough to take part.",
    color: "#efb329",
  },
  {
    name: "Be heard.",
    title: "Someone who listens.",
    text: "One-on-one and small-group conversations make room for questions, challenges, and ideas. A consistent mentor helps young people feel supported.",
    color: "#cb4b54",
  },
  {
    name: "Grow in confidence.",
    title: "Room to find your own way.",
    text: "From homework and life skills to college readiness and leadership, mentorship helps young people set goals and take their next step.",
    color: "#2856a4",
  },
] as const;

function animateValues(tl: VisibleTimeline) {
  tl.to(
    ".value-blob-0",
    {
      attr: {
        d: "M33 69C64 21 130 7 180 34c47 25 70 79 53 126-17 47-61 84-115 76-52-8-87-36-96-86-6-31-1-57 11-81Z",
      },
      duration: 3.8,
      ease: "sine.inOut",
      repeat: 1,
      yoyo: true,
    },
    0,
  )
    .to(
      ".value-blob-1",
      {
        attr: {
          d: "M33 69C59 27 124 12 180 34c44 17 72 83 53 126-21 50-62 82-115 76-52-6-95-40-96-86-1-32-4-50 11-81Z",
        },
        duration: 3.8,
        ease: "sine.inOut",
        repeat: 1,
        yoyo: true,
      },
      0.25,
    )
    .to(
      ".value-blob-2",
      {
        attr: {
          d: "M33 69C65 28 128 8 180 34c42 21 76 80 53 126-23 45-65 87-115 76-48-11-92-35-96-86-3-31-8-40 11-81Z",
        },
        duration: 3.8,
        ease: "sine.inOut",
        repeat: 1,
        yoyo: true,
      },
      0.5,
    )
    .to(
      ".value-hand",
      {
        rotation: -6,
        svgOrigin: "131 171",
        duration: 1.1,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      0.5,
    )
    .to(
      ".value-heart",
      {
        scale: 1.065,
        svgOrigin: "130 132",
        duration: 0.75,
        repeat: 3,
        yoyo: true,
        ease: "sine.inOut",
      },
      2,
    )
    .to(
      ".value-thought",
      {
        scale: 1.35,
        svgOrigin: "153 119",
        duration: 1.1,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      4.5,
    );
}

/** The three overlapping shapes double as keyboard-accessible detail selectors. */
export function MentorshipValues() {
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState(1);
  const id = useId();
  const reduced = useVisibleAnimation(root, animateValues);
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % values.length
        : event.key === "ArrowLeft"
          ? (index + values.length - 1) % values.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? values.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };
  return (
    <div
      className="mentorship-values"
      ref={root}
      data-motion={reduced ? "reduced" : "paused"}
    >
      <div
        className="mentorship-values-tabs"
        role="tablist"
        aria-label="What mentorship makes possible"
      >
        {values.map((value, index) => (
          <button
            key={value.name}
            className={`mentorship-value-tab ${index === active ? "is-active" : ""}`}
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={index === active}
            tabIndex={index === active ? 0 : -1}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            onClick={() => setActive(index)}
            onKeyDown={(event) => navigate(event, index)}
            type="button"
          >
            <svg
              viewBox="0 0 260 260"
              className="mentorship-value-art"
              aria-hidden="true"
            >
              <path
                className={`value-blob-${index}`}
                d="M33 69C60 24 130 12 180 34c45 20 70 80 53 126-18 49-64 84-115 76-51-8-90-38-96-86-4-32-5-49 11-81Z"
                fill={value.color}
              />
              <g
                fill="none"
                stroke="#fff"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {index === 0 && (
                  <path
                    className="value-hand"
                    d="M98 129V91c0-13 17-13 17 0v28-38c0-13 18-13 18 0v39-31c0-13 17-13 17 0v32-17c0-13 18-13 18 0v44c0 25-15 43-37 43-13 0-26-7-36-18l-23-27c-9-11 4-23 13-13l13 13v-17Z"
                  />
                )}
                {index === 1 && (
                  <path
                    className="value-heart"
                    d="m130 181-46-43c-29-31 15-71 46-34 31-37 75 3 46 34l-46 43Z"
                  />
                )}
                {index === 2 && (
                  <>
                    <path d="M98 187v-27c-11-16-18-30-14-49 4-25 24-42 47-42 21 0 39 12 47 35l10 19c4 6 1 13-6 14l-6 1v12c0 10-5 16-15 16h-12v21" />
                    <circle
                      className="value-thought"
                      cx="153"
                      cy="119"
                      r="5"
                      fill="#fff"
                      stroke="none"
                    />
                  </>
                )}
              </g>
            </svg>
            <span className="mentorship-value-label">
              <span className="mentorship-value-index">0{index + 1}</span>
              {value.name}
            </span>
          </button>
        ))}
      </div>
      <div className="mentorship-value-panels">
        {values.map((value, index) => (
          <div
            key={value.name}
            role="tabpanel"
            id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`}
            hidden={active !== index}
            tabIndex={0}
            className="mentorship-value-panel"
          >
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
