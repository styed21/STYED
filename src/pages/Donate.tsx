import { useEffect, useRef, useState } from "react";
import { asset } from "../data/content";
import { Arrow } from "../components/Arrow";
import { gsap, useGSAP, useReducedMotion } from "../hooks/useMotion";
import { DonationForm } from "@/components/ui/donation-form";

function DonationHero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  useEffect(() => {
    const media = video.current;
    if (!media) return;
    if (!reduced && inView && visible && !failed) {
      // The poster remains visible if the browser blocks autoplay.
      void media.play().catch(() => {});
      return () => media.pause();
    }
    media.pause();
  }, [reduced, inView, visible, failed]);
  useGSAP(
    () => {
      if (reduced) return;
      gsap.to(".giving-hero-media", {
        yPercent: 9,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <section
      ref={root}
      className="giving-hero"
      aria-label="Stand with our youth"
    >
      <div className="giving-hero-media">
        <img
          src={asset("donation-hero-poster.jpg")}
          alt=""
          aria-hidden="true"
          width="1920"
          height="1080"
          fetchPriority="high"
        />
        {!failed && (
          <video
            ref={video}
            src={asset("donation-hero.mp4")}
            poster={asset("donation-hero-poster.jpg")}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="A young person arriving for mentorship and learning support"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </section>
  );
}

export function Donate() {
  return (
    <>
      <DonationHero />
      <div className="giving-intro-strip">
        <span>A GIFT FOR WHAT COMES NEXT</span>
        <p>Learning. Safety. Belonging.</p>
        <span>WITH YOU, MORE IS POSSIBLE</span>
      </div>
      <DonationForm />
      <section
        className="giving-questions section-space"
        aria-labelledby="giving-questions-title"
      >
        <div>
          <span className="eyebrow">A little more about giving</span>
          <h2 id="giving-questions-title">
            Good questions.
            <br />
            <em>Clear answers.</em>
          </h2>
          <a className="text-link" href="./programs.html">
            Get to know our work <Arrow />
          </a>
        </div>
        <div className="giving-answers">
          <details>
            <summary>
              What will my support help make possible?
              <span aria-hidden="true">+</span>
            </summary>
            <p>
              STYED focuses on free tutoring, consistent mentorship, community
              safety, housing advocacy, and support for immigrant youth and
              families across the Twin Cities.
            </p>
          </details>
          <details>
            <summary>
              Can I choose a monthly gift?<span aria-hidden="true">+</span>
            </summary>
            <p>
              Yes, you can explore the monthly option in this demo. Regular
              support can help organizations plan for consistent, ongoing youth
              programs.
            </p>
          </details>
          <details>
            <summary>
              Will this page charge my card?<span aria-hidden="true">+</span>
            </summary>
            <p>
              No. This is a demonstration with sample donor and payment details.
              Nothing is charged, saved, or sent. A real payment provider will
              be connected before donations open.
            </p>
          </details>
          <details>
            <summary>
              Can I give my time instead?<span aria-hidden="true">+</span>
            </summary>
            <p>
              Absolutely. Mentors and community partners are part of this work
              too.{" "}
              <a href="./get-involved.html#mentor">
                Explore ways to get involved.
              </a>
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
