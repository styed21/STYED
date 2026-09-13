import { useEffect, useRef, useState } from "react";
import { asset } from "../data/content";
import { useReducedMotion } from "../hooks/useMotion";
import { Arrow } from "./Arrow";

export function ProgramsFilm() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          preload.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    const playback = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.1);
      },
      { threshold: 0.1 },
    );
    preload.observe(element);
    playback.observe(element);
    return () => {
      preload.disconnect();
      playback.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    const media = video.current;
    if (!media) return;
    if (inView && visible && !reduced && !failed) {
      void media.play().catch(() => {});
    } else media.pause();
    return () => media.pause();
  }, [near, inView, visible, reduced, failed]);

  return (
    <figure className="programs-film" id="youth-film" ref={root}>
      <div className="programs-film-frame">
        <img
          src={asset("programs-youth-film-poster.webp")}
          alt="A young person and mentor sharing a fist bump outside a school"
          width="1600"
          height="900"
          loading="lazy"
        />
        {near && !reduced && !failed && (
          <video
            ref={video}
            src={asset("programs-youth-film.mp4")}
            poster={asset("programs-youth-film-poster.webp")}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Scenes of youth mentorship, learning, and celebrating a college acceptance"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption>
        <div>
          <span className="eyebrow">Learning. Encouragement. Possibility.</span>
          <h2>Support that opens doors.</h2>
        </div>
        <a className="text-link" href="./donate.html">
          Support our youth <Arrow />
        </a>
      </figcaption>
    </figure>
  );
}
