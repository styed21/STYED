import { asset } from "../data/content";
import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";

export function CommunityPoster() {
  return (
    <section
      className="community-poster section-space"
      aria-labelledby="poster-title"
    >
      <Reveal className="community-poster-copy">
        <span className="eyebrow">Minneapolis & Saint Paul</span>
        <h2 id="poster-title">
          A little help today.
          <br />
          <em>A brighter tomorrow.</em>
        </h2>
        <p>
          After-school tutoring, homework help, and caring mentors. We bring
          young people, families, and schools together to support learning.
        </p>
        <a className="text-link" href="./mentorship.html">
          Explore our mentorship program <Arrow />
        </a>
      </Reveal>
      <Reveal className="community-poster-art">
        <a
          href={asset("styed-community-poster.jpg")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the full-size STYED community poster in a new tab"
        >
          <img
            src={asset("styed-community-poster-1080.webp")}
            srcSet={`${asset("styed-community-poster-640.webp")} 640w, ${asset("styed-community-poster-1080.webp")} 1080w`}
            sizes="(max-width: 759px) calc(100vw - 48px), (max-width: 1100px) 50vw, 660px"
            width="1080"
            height="976"
            loading="lazy"
            decoding="async"
            alt="Save The Youth Education & Development, serving Minneapolis and Saint Paul: after-school tutoring, homework help, and engaging parents and schools. Empower yourself. Prepare for tomorrow."
          />
          <span>
            View full-size poster <Arrow direction="up-right" />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
