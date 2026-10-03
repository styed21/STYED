import { asset } from "../data/content";
import { Reveal } from "../components/Reveal";
import { Join } from "../components/Join";
import { Arrow } from "../components/Arrow";
import MapDemo from "@/components/ui/demo";
import { PreventionFocus } from "../components/PreventionFocus";

export function About() {
  return (
    <>
      <section className="page-intro section-space">
        <span className="eyebrow">ABOUT STYED</span>
        <Reveal>
          <h1>
            Our youth.
            <br />
            Our <em>tomorrow.</em>
          </h1>
        </Reveal>
        <div className="page-intro-bottom">
          <span className="eyebrow">SAVE THE YOUTH EDUCATION DEVELOPMENT</span>
          <p>
            A Twin Cities community where every young person has the safety,
            support, and opportunity to thrive.
          </p>
        </div>
      </section>
      <div className="page-photo">
        <img
          src={asset("hero-mentorship.webp")}
          alt="Students and a mentor working together"
          width="1920"
          height="1080"
          fetchPriority="high"
        />
      </div>
      <section className="editorial-section section-space" id="leadership">
        <Reveal>
          <span className="eyebrow">LEADERSHIP &amp; ORGANIZATION</span>
          <h2>
            Founded with
            <br />
            <em>purpose.</em>
          </h2>
        </Reveal>
        <div className="editorial-copy">
          <p>
            <strong>Mr. Kamal Ali, Executive Director</strong>
          </p>
          <p>
            Mr. Kamal Ali founded Save The Youth Education Development (STYED)
            in 2016 and continues to serve as its Executive Director.
          </p>
          <p>
            Save The Youth Education Development (STYED) is a 501(c)(3)
            nonprofit organization serving young people and families.
          </p>
        </div>
      </section>
      <section className="editorial-section section-space" id="mission">
        <Reveal>
          <span className="eyebrow">OUR MISSION</span>
          <h2>
            Support today.
            <br />
            Change <em>tomorrow.</em>
          </h2>
        </Reveal>
        <div className="editorial-copy">
          <p>
            STYED empowers youth by providing educational resources, secure
            housing support, and evidence-based violence prevention programs.
          </p>
          <p>
            We advocate for systemic policy changes to eradicate youth
            homelessness and end the epidemic of gun violence in schools,
            churches, and communities across America.
          </p>
          <p>
            We stand alongside immigrant youth and families to defend their
            rights and expand their access to opportunity.
          </p>
        </div>
      </section>
      <section className="vision-section section-space" id="vision">
        <span className="eyebrow">OUR VISION</span>
        <Reveal>
          <h2>
            A future
            <br />
            with more
            <br />
            <em>opportunity.</em>
          </h2>
        </Reveal>
        <div className="vision-bottom">
          <p>
            To build a nation where every young person has a safe home, access
            to quality education, and a life free from the threat of gun
            violence.
          </p>
          <p>
            A generation raised in safety, equipped with opportunity, and
            empowered to lead through education, stability, safety, and
            belonging.
          </p>
        </div>
      </section>
      <section className="editorial-section section-space" id="overview">
        <Reveal>
          <span className="eyebrow">WHAT WE WORK TOWARD</span>
          <h2>
            Progress with
            <br />
            <em>purpose.</em>
          </h2>
        </Reveal>
        <div className="editorial-copy">
          <p>
            Better school attendance. Greater confidence. More young people
            preparing for college and stepping into leadership.
          </p>
          <p>
            These intended outcomes guide our work, alongside reduced
            involvement in gun violence and street drug activity, and fewer
            young people experiencing housing instability.
          </p>
          <p>
            Our program model brings together trained mentors, program
            leadership, learning materials, food, a secure space, and financial
            management support.
          </p>
          <a className="text-link" href="./programs.html">
            Explore our work <Arrow />
          </a>
        </div>
      </section>
      <MapDemo />
      <PreventionFocus variant="about" />
      <Join />
    </>
  );
}
