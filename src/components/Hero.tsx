import { useEffect, useRef, useState } from "react";
import { asset, heroSlides } from "../data/content";
import { gsap, useGSAP, useReducedMotion } from "../hooks/useMotion";
import { Arrow } from "./Arrow";
import type { HeroScene } from "../graphics/heroScene";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const previous = useRef(0);
  const imageMotion = useRef<gsap.core.Tween | null>(null);
  const shaderHost = useRef<HTMLDivElement>(null);
  const shader = useRef<HeroScene | null>(null);
  const activeRef = useRef(0);
  const [shaderReady, setShaderReady] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const reduced = useReducedMotion();
  const slide = heroSlides[active];
  const playing = !paused && !reduced && visible && inView;
  activeRef.current = active;
  useEffect(() => {
    setShaderReady(false);
    if (reduced || !shaderHost.current) return;
    let cancelled = false;
    const host = shaderHost.current;
    import("../graphics/heroScene")
      .then(({ createHeroScene }) =>
        createHeroScene(
          host,
          heroSlides.map((s) => asset(s.image)),
          activeRef.current,
          (available) => {
            if (!cancelled) setShaderReady(available);
          },
        ),
      )
      .then((instance) => {
        if (cancelled) {
          instance.dispose();
          return;
        }
        shader.current = instance;
        instance.select(activeRef.current);
        setShaderReady(true);
      })
      .catch(() => {
        if (!cancelled) setShaderReady(false);
      });
    return () => {
      cancelled = true;
      shader.current?.dispose();
      shader.current = null;
    };
  }, [reduced]);
  useEffect(() => {
    shader.current?.select(active);
    shader.current?.setPlaying(playing);
  }, [active, playing, shaderReady]);
  const change = (index: number) =>
    setActive((index + heroSlides.length) % heroSlides.length);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      document.removeEventListener("visibilitychange", update);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % heroSlides.length),
      7200,
    );
    return () => window.clearTimeout(timer);
  }, [active, playing]);
  useGSAP(
    () => {
      const frames = gsap.utils.toArray<HTMLElement>(".hero-frame");
      const old = frames[previous.current];
      const next = frames[active];
      gsap.set(frames, { zIndex: 0 });
      if (old !== next) gsap.set(old, { opacity: 1, zIndex: 1 });
      gsap.set(next, { opacity: 1, zIndex: 2 });
      const timeline = gsap.timeline();
      if (!reduced) {
        imageMotion.current = gsap.fromTo(
          next.querySelector("img"),
          { scale: 1.08 },
          { scale: 1, duration: 7.2, ease: "none", paused: !playing },
        );
        timeline
          .fromTo(
            next,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.1,
              ease: "power3.inOut",
            },
            0,
          )
          .fromTo(
            ".hero-title .line-inner",
            { yPercent: 115, rotate: 5 },
            {
              yPercent: 0,
              rotate: 0,
              duration: 1.15,
              stagger: 0.085,
              ease: "power4.out",
            },
            0.28,
          )
          .fromTo(
            ".hero-caption-text",
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7 },
            0.6,
          );
      } else gsap.set(next, { clipPath: "none" });
      previous.current = active;
    },
    { scope: root, dependencies: [active, reduced], revertOnUpdate: true },
  );
  useEffect(() => {
    imageMotion.current?.paused(!playing);
  }, [playing, active]);
  useGSAP(
    () => {
      if (reduced) return;
      // Animate the image containers, leaving slide reveals and image autoplay
      // on their own child layers. Both WebGL and fallback follow the same pan.
      const media = gsap.matchMedia();
      media.add(
        { desktop: "(min-width: 760px)", mobile: "(max-width: 759px)" },
        (context) => {
          gsap.fromTo(
            ".hero-media, .hero-webgl",
            { yPercent: 0, scale: 1, transformOrigin: "50% 100%" },
            {
              yPercent: context.conditions?.desktop ? 20 : 12,
              scale: context.conditions?.desktop ? 1.1 : 1.06,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.65,
                invalidateOnRefresh: true,
              },
            },
          );
        },
      );
      gsap.to(".hero-content", {
        yPercent: 22,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <section
      ref={root}
      className="hero"
      data-slide={active}
      aria-roledescription="carousel"
      aria-label="STYED program highlights"
      onFocusCapture={() => setPaused(true)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          setPaused(true);
          change(active + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <div className="hero-media" aria-hidden="true">
        {heroSlides.map((item, index) => (
          <div
            className={`hero-frame ${index === 0 ? "is-initial" : ""}`}
            key={item.image}
          >
            <img
              src={asset(item.image)}
              alt=""
              fetchPriority={index === 0 ? "high" : "auto"}
              width="1920"
              height="1080"
            />
            <div className="hero-shade" />
          </div>
        ))}
      </div>
      <div
        className={`hero-webgl ${shaderReady ? "is-ready" : ""}`}
        aria-hidden="true"
      >
        <div className="hero-webgl-canvas" ref={shaderHost} />
        <div className="hero-webgl-shade" />
      </div>
      <div className="hero-topline">
        <span className="eyebrow">
          <i /> MINNEAPOLIS & THE TWIN CITIES
        </span>
        <span className="eyebrow">SAFE YOUTH FOR HOPE</span>
      </div>
      <div className="hero-content">
        <h1
          className="hero-title"
          aria-label={slide.lines.join(" ")}
          key={active}
        >
          {slide.lines.map((line, index) => (
            <span
              className={`line-mask line-${index}`}
              key={line}
              aria-hidden="true"
            >
              <span className="line-inner">{line}</span>
            </span>
          ))}
        </h1>
      </div>
      <div className="hero-caption">
        <div className="hero-caption-text">
          <span className="eyebrow">
            {String(active + 1).padStart(2, "0")} / OUR COMMITMENT
          </span>
          <a href={slide.href}>
            {slide.label}
            <Arrow />
          </a>
          <p>{slide.detail}</p>
        </div>
      </div>
    </section>
  );
}
