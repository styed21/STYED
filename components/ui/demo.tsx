"use client";
import { WorldMap } from "@/components/ui/map";

const locations = [
  { lat: 44.9778, lng: -93.265, label: "Twin Cities, Minnesota" },
];
export default function MapDemo() {
  return (
    <section className="location-section" id="our-location">
      <div className="location-heading">
        <span className="eyebrow">Our community</span>
        <h2>
          Different stories.
          <br />
          <em>One place to call home.</em>
        </h2>
        <p>
          Rooted in Minneapolis and the Twin Cities. Here for young people and
          families, regardless of neighborhood, income, or immigration status.
        </p>
      </div>
      <WorldMap
        locations={locations}
        lineColor="#bd623e"
        ariaLabel="STYED service area: Minneapolis and the Twin Cities, Minnesota"
      />
      <div className="location-footer">
        <div>
          <span className="location-dot" /> Minneapolis & the Twin Cities,
          Minnesota
        </div>
        <a
          href="https://www.openstreetmap.org/#map=10/44.98/-93.18"
          target="_blank"
          rel="noreferrer"
        >
          Explore the area ↗
        </a>
      </div>
    </section>
  );
}
