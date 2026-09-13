import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "../../src/hooks/useMotion";
import type { PreventionObjectId } from "../../src/graphics/preventionModels";
import type {
  PreventionScene,
  PreventionViewport,
} from "../../src/graphics/preventionScene";

function PreventionObject({
  id,
  label,
  number,
  children,
}: {
  id: PreventionObjectId;
  label: string;
  number: string;
  children: ReactNode;
}) {
  return (
    <figure className={`prevention-object prevention-object-${id}`}>
      <div className="prevention-object-top">
        <span>{number}</span>
        <svg
          viewBox="0 0 24 24"
          className="prevention-badge"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8.5" />
          <path d="m6 6 12 12" />
        </svg>
      </div>
      <div className="prevention-object-window" data-prevention-object={id}>
        <svg
          viewBox="0 0 240 230"
          className="prevention-object-fallback"
          aria-hidden="true"
        >
          {children}
        </svg>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export function SyringeSymbol() {
  return (
    <PreventionObject id="syringe" label="Injection" number="01">
      <g
        transform="rotate(-30 120 110)"
        stroke="#536f65"
        strokeWidth="3"
        strokeLinejoin="round"
      >
        <path d="M103 63h34v102h-34Z" fill="#e2e9dd" />
        <path d="M107 133h26v28h-26Z" fill="#d1b37d" stroke="none" />
        <path
          d="M116 63V33h8v30m-27-31h46m-51 33h56"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="m111 165 4 16h10l4-16" fill="#8ca398" />
        <path
          d="M120 181v34M110 79h16m-16 16h11m-11 16h16m-16 16h11"
          fill="none"
          strokeWidth="2.5"
        />
      </g>
    </PreventionObject>
  );
}

export function TabletSymbol() {
  return (
    <PreventionObject id="tablet" label="Pills" number="02">
      <g transform="rotate(-22 120 113)" stroke="#758d80" strokeWidth="3">
        <path d="M49 102v21c0 35 32 61 71 61s71-26 71-61v-21" fill="#b9c8bb" />
        <ellipse cx="120" cy="103" rx="71" ry="61" fill="#f8f3e7" />
        <path d="m99 45 34 116" strokeWidth="7" strokeLinecap="round" />
      </g>
    </PreventionObject>
  );
}

export function CannabisSymbol() {
  return (
    <PreventionObject id="cannabis" label="Cannabis" number="03">
      <g stroke="#647d51" strokeWidth="2" strokeLinejoin="round">
        <path
          d="m120 176-21-1-24 14 4-20-39-9 20-11-26-35 26 9-12-36 32 24-2-38 25 43 1-42 16-51 15 53 1 40 24-43-1 39 33-25-12 38 25-11-25 35 19 11-39 9 3 20-24-15Z"
          fill="#91a875"
        />
        <path
          d="M120 197V91m0 80-36-43m36 43 37-43m-37 43-60-21m60 21 60-21"
          stroke="#526d47"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </PreventionObject>
  );
}

export function PowderSymbol() {
  return (
    <PreventionObject id="powder" label="Powders" number="04">
      <ellipse cx="120" cy="158" rx="91" ry="32" fill="#aabdb0" />
      <ellipse cx="120" cy="153" rx="84" ry="27" fill="#7e988e" />
      <path
        d="M52 156c8-12 17-10 19-22 4-22 16-24 20-39 6-21 30-26 42-9 12 15 23 12 26 31 2 16 29 16 30 39-24 25-112 24-137 0Z"
        fill="#f8f3e7"
        stroke="#d4d6c6"
        strokeWidth="2"
      />
      <g fill="#e0decf">
        <circle cx="102" cy="106" r="4" />
        <circle cx="123" cy="125" r="4" />
        <circle cx="88" cy="141" r="3" />
        <circle cx="139" cy="142" r="5" />
        <circle cx="162" cy="155" r="3" />
        <circle cx="105" cy="157" r="4" />
      </g>
      <g fill="#f8f3e7">
        <circle cx="57" cy="166" r="3" />
        <circle cx="77" cy="174" r="4" />
        <circle cx="182" cy="168" r="3" />
      </g>
    </PreventionObject>
  );
}

export function PreventionObjects() {
  const root = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = root.current;
    const canvasHost = host.current;
    setReady(false);
    if (!element || !canvasHost || reduced) return;
    let disposed = false;
    let started = false;
    let scene: PreventionScene | undefined;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        try {
          const { createPreventionScene } =
            await import("../../src/graphics/preventionScene");
          if (disposed) return;
          const viewports: PreventionViewport[] = Array.from(
            element.querySelectorAll<HTMLElement>("[data-prevention-object]"),
            (item) => ({
              element: item,
              id: item.dataset.preventionObject as PreventionObjectId,
            }),
          );
          scene = createPreventionScene(canvasHost, viewports, (available) => {
            if (!disposed) setReady(available);
          });
        } catch {
          // All four complete SVGs stay visible when a GPU is unavailable.
          if (!disposed) setReady(false);
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(element);
    return () => {
      disposed = true;
      observer.disconnect();
      scene?.dispose();
    };
  }, [reduced]);

  return (
    <div
      className="prevention-objects"
      ref={root}
      data-renderer={ready && !reduced ? "webgl" : "svg"}
    >
      <div className="prevention-objects-heading">
        <span className="eyebrow">Awareness & prevention</span>
        <span className="prevention-scroll-note" aria-hidden="true">
          A clearer path forward <span>↘</span>
        </span>
      </div>
      <div className="prevention-objects-grid">
        <SyringeSymbol />
        <TabletSymbol />
        <CannabisSymbol />
        <PowderSymbol />
        <div
          className="prevention-objects-canvas"
          ref={host}
          aria-hidden="true"
        />
      </div>
      <p className="prevention-objects-caption">
        More connection.
        <br />
        <em>More possibilities.</em>
      </p>
    </div>
  );
}
