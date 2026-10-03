import { useRef } from "react";
import { asset } from "../data/content";
import { contactDetails } from "../data/contact";
import { ContactForm } from "../components/ContactForm";
import { Arrow } from "../components/Arrow";
import { Reveal } from "../components/Reveal";
import { gsap, useGSAP, useReducedMotion } from "../hooks/useMotion";

function ContactIcon({ type }: { type: "pin" | "mail" | "clock" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === "pin" ? (
        <>
          <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      ) : type === "mail" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      )}
    </svg>
  );
}

export function Contact() {
  const hero = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".contact-hero-copy > *", {
        y: 22,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".contact-hero-image",
        { yPercent: -3, scale: 1.04 },
        {
          yPercent: 5,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: hero.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    },
    { scope: hero, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <div className="contact-page">
      <section
        className="contact-hero"
        ref={hero}
        aria-labelledby="contact-heading"
      >
        <div className="contact-hero-media">
          <img
            className="contact-hero-image"
            src={asset("hero-mentorship.webp")}
            alt="Young people learning and sharing ideas around a table"
            width="1920"
            height="1080"
            fetchPriority="high"
          />
        </div>
        <div className="contact-hero-copy">
          <span className="contact-handwritten">
            Good things begin with a conversation.
          </span>
          <h1 id="contact-heading">
            Contact us<span>.</span>
          </h1>
          <p>
            Ask a question. Share an idea. Find your part.
            <br />
            We’d love to connect with you.
          </p>
          <span className="eyebrow">
            SAVE THE YOUTH EDUCATION DEVELOPMENT (STYED)
          </span>
        </div>
      </section>

      <div className="contact-content">
        <div className="contact-main-grid">
          <section
            className="contact-panel contact-form-panel"
            aria-labelledby="contact-form-heading"
            id="message"
          >
            <div className="contact-panel-heading">
              <span className="eyebrow">01 / Start here</span>
              <h2 id="contact-form-heading">Let’s hear from you.</h2>
              <p>
                For questions about our programs, giving, or getting involved.
              </p>
            </div>
            <ContactForm />
          </section>
          <section
            className="contact-panel contact-information"
            aria-labelledby="contact-information-heading"
          >
            <div className="contact-panel-heading">
              <span className="eyebrow">02 / Our community</span>
              <h2 id="contact-information-heading">
                Rooted here. Here for you.
              </h2>
              <p>Supporting young people and the people who care for them.</p>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-icon">
                <ContactIcon type="pin" />
              </span>
              <div>
                <h3>Where we work</h3>
                <p>{contactDetails.area}</p>
                {contactDetails.address && <p>{contactDetails.address}</p>}
              </div>
            </div>
            <div className="contact-map" data-lenis-prevent>
              <iframe
                title="Map of Minneapolis and Saint Paul, STYED’s community area"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-93.40%2C44.86%2C-92.98%2C45.10&layer=mapnik"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="contact-map-caption">
              <span>Minneapolis & Saint Paul</span>
              <a
                href="https://www.openstreetmap.org/#map=11/44.98/-93.19"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the Twin Cities map in a new tab"
              >
                Explore the area <Arrow />
              </a>
            </div>
            <div className="contact-detail contact-direct">
              <span className="contact-detail-icon">
                <ContactIcon type="mail" />
              </span>
              <div>
                <h3>Stay in touch</h3>
                {contactDetails.email ? (
                  <a href={`mailto:${contactDetails.email}`}>
                    {contactDetails.email}
                  </a>
                ) : (
                  <p>Public email and phone details coming soon.</p>
                )}
                {contactDetails.phone && (
                  <a
                    href={`tel:${contactDetails.phone.replace(/[^+\d]/g, "")}`}
                  >
                    {contactDetails.phone}
                  </a>
                )}
                {!contactDetails.address && (
                  <p className="contact-fine-print">
                    Program locations and visiting details will be shared here.
                  </p>
                )}
              </div>
            </div>
            {contactDetails.hours && (
              <div className="contact-detail">
                <span className="contact-detail-icon">
                  <ContactIcon type="clock" />
                </span>
                <div>
                  <h3>Office hours</h3>
                  <p>{contactDetails.hours}</p>
                </div>
              </div>
            )}
          </section>
        </div>

        <Reveal className="contact-invite-reveal">
          <section
            className="contact-invite"
            aria-labelledby="contact-invite-heading"
          >
            <div className="contact-invite-photo">
              <img
                src={asset("together.webp")}
                alt="Students and volunteers spending time together in a classroom"
                width="1920"
                height="1276"
                loading="lazy"
              />
            </div>
            <div className="contact-invite-copy">
              <span className="contact-handwritten">
                A little time. A lasting difference.
              </span>
              <h2 id="contact-invite-heading">There’s a place for you here.</h2>
              <p>
                Mentor a young person, share your skills, or work with us to
                support our community.
              </p>
            </div>
            <a
              className="button contact-invite-button"
              href="./get-involved.html#mentor"
            >
              Get involved <Arrow direction="right" />
            </a>
          </section>
        </Reveal>
        <div className="contact-bottom-note">
          <span className="eyebrow">
            Education. Stability. Safety. Belonging.
          </span>
          <a className="quiet-link" href="./programs.html">
            Explore our programs <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}
