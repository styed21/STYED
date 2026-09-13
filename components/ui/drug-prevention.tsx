import { Arrow } from "../../src/components/Arrow";
import { Reveal } from "../../src/components/Reveal";
import { PreventionObjects } from "./prevention-objects";

export function DrugPrevention() {
  return (
    <section
      className="drug-prevention-section"
      id="drug-prevention"
      aria-labelledby="drug-prevention-title"
    >
      <div className="drug-prevention-visual">
        <PreventionObjects />
      </div>
      <div className="drug-prevention-copy">
        <span className="eyebrow">
          Community safety / Drug prevention & diversion
        </span>
        <Reveal>
          <h2 id="drug-prevention-title">
            Prevention starts
            <br />
            <em>with connection.</em>
          </h2>
        </Reveal>
        <p>
          We work to reduce young people’s involvement in street drug activity
          and gun violence through education, mentorship, and consistent
          support.
        </p>
        <div className="prevention-details">
          {[
            [
              "01",
              "A safe place after school.",
              "Supervised tutoring and positive activities help young people stay connected to learning and caring adults.",
            ],
            [
              "02",
              "A trusted person to turn to.",
              "One-on-one and small-group mentorship offers encouragement, practical life skills, and support with everyday challenges.",
            ],
            [
              "03",
              "Support for the next step.",
              "Leadership opportunities, college guidance, and housing referrals help young people build a more stable path forward.",
            ],
          ].map(([number, heading, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h3>{heading}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="prevention-actions">
          <a
            className="button button-ink"
            href="./contact.html?topic=programs#message"
          >
            Ask about our programs <Arrow />
          </a>
          <a className="quiet-link" href="./mentorship.html">
            Explore mentorship <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
