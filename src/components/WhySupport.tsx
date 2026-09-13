import { Reveal } from "./Reveal";
export function WhySupport() {
  return (
    <section className="why-support section-space" id="why-support">
      <div className="why-support-heading">
        <span className="eyebrow">Why this work matters</span>
        <Reveal>
          <h2>
            A stronger network.
            <br />
            <em>More ways forward.</em>
          </h2>
        </Reveal>
        <p>
          Learning and safety go hand in hand. Our approach connects what young
          people need today with the opportunities they can build toward.
        </p>
      </div>
      <div className="why-support-notes">
        <Reveal>
          <article>
            <span className="eyebrow">01 / Consistent relationships</span>
            <h3>Someone who keeps showing up.</h3>
            <p>
              Mentoring can support school engagement, confidence, and
              connection. The quality and consistency of the relationship
              matter.
            </p>
            <a
              href="https://youth.gov/youth-topics/mentoring/benefits-mentoring-young-people"
              target="_blank"
              rel="noreferrer"
            >
              Explore the mentoring research ↗
            </a>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article>
            <span className="eyebrow">02 / Connected support</span>
            <h3>A safer community takes all of us.</h3>
            <p>
              Minneapolis’s youth violence prevention blueprint grew from a
              community response to help young people stay safe and thrive.
              STYED brings together tutoring, mentorship, and family support in
              its own approach to youth development.
            </p>
            <a
              href="https://www.minneapolismn.gov/government/programs-initiatives/violence-prevention-approach/blueprint-institute/blueprint/"
              target="_blank"
              rel="noreferrer"
            >
              Read the city’s blueprint ↗
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
