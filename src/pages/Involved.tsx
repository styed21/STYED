import { asset } from "../data/content";
import { Reveal } from "../components/Reveal";
import { Arrow } from "../components/Arrow";
import { Donation } from "../components/Donation";

export function Involved() {
  return (
    <>
      <section className="page-intro section-space">
        <span className="eyebrow">GET INVOLVED</span>
        <Reveal>
          <h1>
            Your time.
            <br />
            Their <em>tomorrow.</em>
          </h1>
        </Reveal>
        <div className="page-intro-bottom">
          <span className="eyebrow">A PART FOR ALL OF US</span>
          <p>
            Your experience. Your support.
            <br />
            There is more than one way to stand with our youth.
          </p>
        </div>
      </section>
      <div className="page-photo involved-photo">
        <img
          src={asset("together.webp")}
          alt="Students taking part in classroom activities together"
          width="1920"
          height="1276"
          fetchPriority="high"
        />
      </div>
      <Donation details />
      <section className="involvement-options section-space">
        {[
          [
            "mentor",
            "01 / YOUR TIME",
            "Become a mentor.",
            "Help a young person navigate homework, build confidence, and imagine the next step. Consistent relationships are at the heart of our program.",
            "./contact.html?topic=mentor#message",
            "Connect with STYED",
          ],
          [
            "partner",
            "02 / OUR COMMUNITY",
            "Work with us.",
            "Schools, community organizations, and caring neighbors can help create a stronger network of education, stability, and opportunity.",
            "./contact.html?topic=partner#message",
            "Explore a partnership",
          ],
          [
            "support",
            "03 / A SHARED FUTURE",
            "Support our work.",
            "Support the tutoring, mentorship, learning materials, food, and safe spaces that help young people move forward.",
            "./donate.html",
            "Make a gift",
          ],
        ].map(([id, label, title, text, href, cta]) => (
          <article id={id} key={id}>
            <span className="eyebrow">{label}</span>
            <Reveal>
              <h2>{title}</h2>
            </Reveal>
            <p>{text}</p>
            <a className="text-link" href={href}>
              {cta}
              <Arrow />
            </a>
          </article>
        ))}
      </section>
      <section className="contact-section section-space" id="contact">
        <Reveal>
          <span className="eyebrow">MINNEAPOLIS / TWIN CITIES</span>
          <h2>
            Let’s start
            <br />a <em>conversation.</em>
          </h2>
        </Reveal>
        <div className="availability">
          <span className="status-dot" />
          <h3>Find your way to connect.</h3>
          <p>
            Visit our Contact page for program questions, mentorship, and
            partnerships, or to email our team directly.
          </p>
          <a className="text-link" href="./contact.html">
            Contact STYED <Arrow />
          </a>
        </div>
      </section>
    </>
  );
}
