import { asset } from "../data/content";
import { Reveal } from "../components/Reveal";
import { Join } from "../components/Join";
import { Arrow } from "../components/Arrow";
import MapDemo from "@/components/ui/demo";

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
          <span className="eyebrow">SAFE YOUTH FOR HOPE</span>
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
            Save The Youth Education Development works to reduce violence and
            instability in Twin Cities neighborhoods through free, consistent
            after-school tutoring, homework help, mentorship, and leadership
            development.
          </p>
          <p>
            In a safe, structured environment, caring adults help young people
            stay in school, build confidence, and find a pathway toward higher
            education and self-sufficiency.
          </p>
          <p>
            Our commitment extends to housing stability, violence prevention,
            and standing alongside immigrant youth and families.
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
            Regardless of neighborhood, income, or immigration status, every
            young person deserves the chance to grow into a confident, educated,
            and empowered adult.
          </p>
          <p>
            Protected from gun violence, drug involvement, and homelessness.
            Surrounded by mentors, education, and a clear path toward college,
            career, and community leadership.
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
      <Join />
    </>
  );
}
