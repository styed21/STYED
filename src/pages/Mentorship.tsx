import { MentorshipScene } from "@/components/ui/mentorship-scene";
import { MentorshipValues } from "@/components/ui/mentorship-values";
import { Arrow } from "../components/Arrow";
import { Reveal } from "../components/Reveal";
import { asset } from "../data/content";
import { ScrollTrigger } from "../hooks/useMotion";

const support = [
  [
    "01",
    "Connect.",
    "One-on-one and small-group time with a consistent, trained adult mentor. A relationship built on listening and encouragement.",
  ],
  [
    "02",
    "Learn together.",
    "Free after-school tutoring, homework help, and practical life skills. Everyday support for the classroom and beyond.",
  ],
  [
    "03",
    "Look ahead.",
    "College readiness, leadership, and goals that feel within reach. Space to explore what comes next, with someone beside you.",
  ],
] as const;

export function Mentorship() {
  return (
    <div className="mentorship-page">
      <section className="mentorship-hero" aria-labelledby="mentorship-title">
        <div className="mentorship-hero-copy">
          <span className="eyebrow">STYED / Youth mentorship</span>
          <Reveal>
            <h1 id="mentorship-title">
              Someone in
              <br />
              your <em>corner.</em>
            </h1>
          </Reveal>
          <p>
            A person who listens. A little guidance.
            <br /> Support for the future you see for yourself.
          </p>
          <a
            className="button button-orange"
            href="./contact.html?topic=mentor#message"
          >
            Connect with STYED <Arrow />
          </a>
          <a className="mentorship-scroll-link" href="#how-it-works">
            Discover our approach <Arrow direction="down" />
          </a>
        </div>
        <div className="mentorship-hero-visual">
          <MentorshipScene />
          <span className="mentorship-illustration-note">
            Every conversation is a place to begin.
          </span>
        </div>
        <div className="mentorship-hero-bottom">
          <span>Minneapolis & the Twin Cities</span>
          <span>One-on-one support. A shared sense of belonging.</span>
        </div>
      </section>

      <section
        className="mentorship-approach"
        id="how-it-works"
        aria-labelledby="mentorship-approach-title"
      >
        <div className="mentorship-section-heading">
          <span className="eyebrow">Small steps, taken together</span>
          <Reveal>
            <h2 id="mentorship-approach-title">
              A steady presence.
              <br />
              <em>Room to grow.</em>
            </h2>
          </Reveal>
          <p>
            Our mentorship program works alongside daily after-school learning.
            Caring adults help young people with today’s challenges and
            tomorrow’s goals.
          </p>
        </div>
        <div className="mentorship-approach-grid">
          {support.map(([number, title, text], index) => (
            <Reveal key={number} delay={index * 0.08}>
              <article>
                <span className="mentorship-step-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="mentorship-belonging"
        aria-labelledby="mentorship-belonging-title"
      >
        <div className="mentorship-belonging-heading">
          <span className="eyebrow">More than academic support</span>
          <Reveal>
            <h2 id="mentorship-belonging-title">
              Safe. Supported.
              <br />
              <em>Ready for what’s next.</em>
            </h2>
          </Reveal>
          <p>
            Three things every young person deserves.
            <br />
            Choose one to explore our approach.
          </p>
        </div>
        <MentorshipValues />
      </section>

      <section
        className="mentorship-invitation"
        aria-labelledby="mentorship-invitation-title"
      >
        <div className="mentorship-invitation-photo">
          <img
            src={asset("mentor.webp")}
            alt="A young person receiving individual guidance at a computer"
            width="600"
            height="400"
            loading="lazy"
          />
        </div>
        <div className="mentorship-invitation-copy">
          <span className="eyebrow">Your experience can make a difference</span>
          <Reveal>
            <h2 id="mentorship-invitation-title">
              Be the person
              <br />
              <em>who shows up.</em>
            </h2>
          </Reveal>
          <p>
            Share your time, your skills, and your encouragement. Help a young
            person build confidence, stay connected to learning, and find their
            next step.
          </p>
          <a
            className="button button-ink"
            href="./contact.html?topic=mentor#message"
          >
            Explore becoming a mentor <Arrow />
          </a>
          <span className="mentorship-inquiry-note">
            Start with a conversation about getting involved.
          </span>
        </div>
      </section>

      <section
        className="mentorship-faq"
        aria-labelledby="mentorship-faq-title"
      >
        <div>
          <span className="eyebrow">A few things to know</span>
          <h2 id="mentorship-faq-title">Good questions.</h2>
        </div>
        <div className="faq-list">
          {[
            [
              "Who is mentorship for?",
              "STYED supports young people across Minneapolis and the Twin Cities, prioritizing those facing community violence, housing instability, or limited access to academic support.",
            ],
            [
              "What does a mentor help with?",
              "Mentors provide one-on-one and small-group guidance with academic goals, life skills, personal growth, leadership, and college readiness.",
            ],
            [
              "Is after-school academic support free?",
              "Yes. Free, consistent access to tutoring, homework help, mentorship, and leadership development is central to STYED’s mission.",
            ],
            [
              "How can I learn more or get involved?",
              "Visit our Contact page for mentorship inquiries. Public contact and enrollment details will be shared there as they become available.",
            ],
          ].map(([question, answer]) => (
            <details key={question} onToggle={() => ScrollTrigger.refresh()}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <div className="faq-answer">
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
