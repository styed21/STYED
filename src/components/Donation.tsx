import { asset } from "../data/content";
import { Reveal } from "./Reveal";
import { Arrow } from "./Arrow";
import { DonateButton } from "./DonateButton";

export function Donation({ details = false }: { details?: boolean }) {
  return (
    <section
      className={`donation-section section-space ${details ? "donation-details" : ""}`}
      id={details ? "donate" : "support-youth"}
    >
      <div className="donation-image">
        <img
          src={asset("education.webp")}
          alt="Children learning together with a teacher"
          loading="lazy"
          width="1024"
          height="682"
        />
        <span className="donation-image-caption">
          A little support goes a long way.
        </span>
      </div>
      <div className="donation-copy">
        <Reveal>
          <span className="eyebrow">Give young people more support</span>
          <h2>
            Help make the
            <br />
            <em>everyday possible.</em>
          </h2>
        </Reveal>
        <p>
          Your support helps provide tutoring, learning materials, food, and a
          safe place to spend time after school.
        </p>
        {details ? (
          <div className="giving-status">
            <span className="status-label">
              <i /> Stand with our youth
            </span>
            <h3>A gift for what comes next.</h3>
            <p>Explore one-time and monthly giving in our donation preview.</p>
            <a className="text-link" href="./donate.html">
              Visit our donation page <Arrow />
            </a>
          </div>
        ) : (
          <div className="donation-actions">
            <DonateButton />
            <a className="quiet-link" href="./get-involved.html#mentor">
              Give your time instead <Arrow />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
