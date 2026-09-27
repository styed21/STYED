"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  imageAlt?: string;
  icon?: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

/** Supplied expanding-card layout, adapted for keyboard and touch disclosure. */
export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, style, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex);
  const id = React.useId();
  const active = Math.min(Math.max(0, activeIndex), items.length - 1);
  const tracks = items
    .map((_, index) => (index === active ? "5fr" : "1fr"))
    .join(" ");
  return (
    <ul
      ref={ref}
      className={cn("expanding-cards", className)}
      style={{ ...style, "--card-tracks": tracks } as React.CSSProperties}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          data-active={active === index}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setActiveIndex(index);
          }}
        >
          <img
            src={item.imgSrc}
            alt={item.imageAlt ?? item.title}
            loading="lazy"
            decoding="async"
            width="780"
            height="520"
          />
          <div className="expanding-card-shade" />
          <button
            className="expanding-card-trigger"
            type="button"
            aria-label={item.title}
            aria-expanded={active === index}
            aria-controls={`${id}-${index}`}
            onClick={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
          >
            <span>{item.title}</span>
            <span className="expanding-card-symbol" aria-hidden="true">
              {active === index ? "−" : "+"}
            </span>
          </button>
          <div
            className="expanding-card-detail"
            id={`${id}-${index}`}
            hidden={active !== index}
          >
            {item.icon}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.linkHref}>
              Explore our approach <span aria-hidden="true">↗</span>
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
