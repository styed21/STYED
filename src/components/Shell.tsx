import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { asset } from "../data/content";
import type { Page } from "../data/content";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  useReducedMotion,
} from "../hooks/useMotion";
import { Arrow } from "./Arrow";
import { DonateButton } from "./DonateButton";
import type { ScrollRequest } from "../lib/scroll";

const links = [
  ["01", "Home", "./index.html", "home"],
  ["02", "About STYED", "./about.html", "about"],
  ["03", "Our programs", "./programs.html", "programs"],
  ["04", "Mentorship", "./mentorship.html", "mentorship"],
  ["05", "Get involved", "./get-involved.html", "involved"],
  ["06", "Donate", "./donate.html", "donate"],
  ["07", "Contact", "./contact.html", "contact"],
] as const;

function Header({ page }: { page: Page }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useGSAP(
    () => {
      if (!open || !dialog.current) return;
      timeline.current = gsap
        .timeline()
        .fromTo(
          dialog.current,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: reduced ? 0 : 0.65,
            ease: "power4.inOut",
          },
        )
        .fromTo(
          ".menu-link-inner",
          { yPercent: 110, rotate: 4 },
          {
            yPercent: 0,
            rotate: 0,
            duration: reduced ? 0 : 0.8,
            stagger: 0.055,
            ease: "power4.out",
          },
          "-=.25",
        );
    },
    { scope: dialog, dependencies: [open, reduced], revertOnUpdate: true },
  );
  const finishClose = () => {
    dialog.current?.close();
    setOpen(false);
    document.documentElement.classList.remove("menu-is-open");
    window.dispatchEvent(new CustomEvent("styed:menu", { detail: false }));
    trigger.current?.focus({ preventScroll: true });
  };
  const close = () => {
    timeline.current?.kill();
    if (reduced) finishClose();
    else
      gsap.to(dialog.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: finishClose,
      });
  };
  const show = () => {
    dialog.current?.showModal();
    setOpen(true);
    document.documentElement.classList.add("menu-is-open");
    window.dispatchEvent(new CustomEvent("styed:menu", { detail: true }));
  };
  return (
    <>
      <header
        className={`site-header site-header--glass ${(page !== "home" && page !== "donate") || scrolled ? "is-solid" : ""}`}
      >
        <button
          ref={trigger}
          className="menu-button"
          onClick={show}
          aria-expanded={open}
          aria-controls="site-navigation"
        >
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>Menu</span>
        </button>
        <a href="./index.html" className="brand" aria-label="STYED home">
          <img
            src={asset("styed-logo.png")}
            alt="Save The Youth Education & Development"
            width="65"
            height="65"
          />
          <span>
            STYED<small>SAFE YOUTH FOR HOPE</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main pages">
          <a
            href="./about.html"
            aria-current={page === "about" ? "page" : undefined}
          >
            About
          </a>
          <a
            href="./programs.html"
            aria-current={page === "programs" ? "page" : undefined}
          >
            Programs
          </a>
          <a
            href="./mentorship.html"
            aria-current={page === "mentorship" ? "page" : undefined}
          >
            Mentorship
          </a>
          <a
            href="./contact.html"
            aria-current={page === "contact" ? "page" : undefined}
          >
            Contact
          </a>
        </nav>
        <DonateButton className="header-action" />
      </header>
      <dialog
        ref={dialog}
        id="site-navigation"
        className="menu-dialog"
        data-lenis-prevent
        aria-label="Main navigation"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      >
        <div className="menu-top">
          <span className="eyebrow">SAVE THE YOUTH EDUCATION DEVELOPMENT</span>
          <button className="menu-close" onClick={close}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="menu-layout">
          <nav>
            {links.map(([number, label, href, key]) => (
              <a
                key={key}
                href={href}
                className="menu-link"
                aria-current={page === key ? "page" : undefined}
              >
                <span className="menu-link-inner">
                  <small>{number}</small>
                  {label}
                  <Arrow />
                </span>
              </a>
            ))}
          </nav>
          <div className="menu-aside">
            <img
              src={asset("youth.webp")}
              alt="Young people smiling together"
              width="626"
              height="417"
            />
            <p>
              Our youth.
              <br />
              Our community.
              <br />
              Our tomorrow.
            </p>
            <span className="eyebrow">MINNEAPOLIS · TWIN CITIES</span>
          </div>
        </div>
        <div className="menu-bottom">
          <span>Safe Youth for Hope.</span>
          <a href="./contact.html">
            Let's connect <Arrow />
          </a>
        </div>
      </dialog>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a href="./index.html" className="footer-logo">
          <img
            src={asset("styed-logo.png")}
            alt="STYED"
            width="90"
            height="90"
          />
        </a>
        <p>
          Rooted in the Twin Cities.
          <br />
          Here for the next generation.
        </p>
        <nav aria-label="Footer">
          <a href="./about.html">About STYED</a>
          <a href="./programs.html">Our programs</a>
          <a href="./mentorship.html">Mentorship</a>
        </nav>
        <nav aria-label="Get involved">
          <a href="./contact.html">Contact</a>
          <a href="./donate.html">
            Support our work <Arrow />
          </a>
          <a href="#main">
            Back to top <Arrow direction="up-right" />
          </a>
        </nav>
      </div>
      <div className="footer-statement" aria-label="Safe youth. For hope.">
        <span>Safe youth.</span>
        <span>
          For hope<span className="footer-period">.</span>
        </span>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Save The Youth Education Development
        </span>
        <span>Minneapolis / Twin Cities, Minnesota</span>
      </div>
    </footer>
  );
}

export function Shell({ children, page }: { children: ReactNode; page: Page }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -95 },
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    const menu = (event: Event) =>
      (event as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start();
    window.addEventListener("styed:menu", menu);
    const navigate = (event: Event) => {
      const { top, immediate } = (event as CustomEvent<ScrollRequest>).detail;
      event.preventDefault();
      lenis.scrollTo(top, { immediate, duration: 0.85 });
    };
    window.addEventListener("styed:scroll-to", navigate);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.removeEventListener("styed:menu", menu);
      window.removeEventListener("styed:scroll-to", navigate);
      window.removeEventListener("load", refresh);
    };
  }, [reduced]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header page={page} />
      <main
        id="main"
        className={
          page === "home"
            ? "home-page"
            : page === "donate"
              ? "donate-page"
              : "interior-page"
        }
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
