import { paperOutline } from "../data/paperEdge";

/** A continuous full-width sheet; its solid base always meets the section below. */
export function PaperEdge({
  bottom = false,
  mirror = false,
}: {
  bottom?: boolean;
  mirror?: boolean;
}) {
  return (
    <div
      className={`paper-seam ${bottom ? "paper-seam-bottom" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="paper-seam-outline"
        viewBox="0 0 1661 282"
        preserveAspectRatio="none"
        focusable="false"
      >
        <g transform={mirror ? "translate(1661 0) scale(-1 1)" : undefined}>
          <path d={paperOutline} fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}
