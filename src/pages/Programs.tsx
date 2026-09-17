import { asset, faqs, programs } from "../data/content";
import { Reveal } from "../components/Reveal";
import { Arrow } from "../components/Arrow";
import { Join } from "../components/Join";
import { useEffect } from "react";
import CircularSplitRoll from "@/components/ui/circular-split-roll";
import { scrollToPosition } from "../lib/scroll";
import { ScrollTrigger } from "../hooks/useMotion";
import { ProgramsIllustratedHero } from "@/components/ui/programs-illustrated-hero";
import { DrugPrevention } from "@/components/ui/drug-prevention";
import { ProgramsFilm } from "../components/ProgramsFilm";

const programItems = programs.map((program) => ({
  id: program.id,
  title: program.shortName,
  image: asset(program.image),
  alt: program.imageAlt,
}));

function openProgram(id: string) {
  const detail = document.getElementById(id);
  if (
    detail instanceof HTMLDetailsElement &&
    detail.classList.contains("program-note")
  ) {
    detail.open = true;
    return detail;
  }
  return null;
}

export function Programs() {
  useEffect(() => {
    let alive = true;
    let frame = 0;
    const followHash = () => {
      if (!alive) return;
      const id = window.location.hash.slice(1);
      const destination =
        openProgram(id) ??
        (["drug-prevention", "youth-film"].includes(id)
          ? document.getElementById(id)
          : null);
      if (!destination) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (alive)
          scrollToPosition(
            destination.getBoundingClientRect().top + window.scrollY - 120,
            true,
          );
      });
    };
    followHash();
    // Pinning and font loading can change the destination after the initial HTML loads.
    void document.fonts.ready.then(followHash);
    window.addEventListener("hashchange", followHash);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", followHash);
    };
  }, []);
  return (
    <>
      <ProgramsIllustratedHero onSelect={openProgram} />
      <CircularSplitRoll
        items={programItems}
        radius={500}
        leftRadiusY={280}
        rightRadiusY={280}
        cardSize={205}
        textSideScale={0.68}
        textSideOpacity={0.18}
        focusPhase={3}
      />
      <section
        className="program-information section-space"
        aria-labelledby="program-information-title"
      >
        <div className="program-information-heading">
          <span className="eyebrow">What each program offers</span>
          <h2 id="program-information-title">
            Support,
            <br />
            <em>in practice.</em>
          </h2>
        </div>
        <div className="program-information-list">
          {programs.map((program, index) => (
            <details
              className="program-note"
              name="program-information"
              id={program.id}
              key={program.id}
              open={index === 0}
              onToggle={() => ScrollTrigger.refresh()}
            >
              <summary>
                <span>{program.number}</span>
                <h3>{program.name}</h3>
                <span aria-hidden="true">+</span>
              </summary>
              <div className="program-note-body">
                <p>{program.description}</p>
                <ul>
                  {program.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                {program.campaign && (
                  <div className="program-campaign">
                    <span className="eyebrow">
                      Advocacy campaign priorities
                    </span>
                    <h4>{program.campaign.name}</h4>
                    <dl>
                      {program.campaign.priorities.map((priority) => (
                        <div key={priority.title}>
                          <dt>{priority.title}</dt>
                          <dd>{priority.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
                {program.id === "safety" && (
                  <a
                    className="program-prevention-link"
                    href="#drug-prevention"
                  >
                    Our drug-prevention approach <Arrow direction="down" />
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>
      <DrugPrevention />
      <section className="mentorship-section section-space" id="mentorship">
        <span className="eyebrow">OUR YOUTH MENTORSHIP PROGRAM</span>
        <Reveal>
          <h2>
            A mentor who
            <br />
            <em>shows up.</em>
          </h2>
        </Reveal>
        <div className="mentorship-intro">
          <p>
            Our structured mentorship model pairs young people with consistent,
            trained adult mentors. Alongside daily after-school programming,
            those relationships support immediate needs and long-term dreams.
          </p>
          <a className="button button-ink" href="./mentorship.html">
            Explore mentorship <Arrow />
          </a>
        </div>
        <div className="mentor-steps">
          {[
            [
              "01",
              "Connect.",
              "A trusted adult. A positive relationship. One-on-one and small-group support built around listening and encouragement.",
            ],
            [
              "02",
              "Build confidence.",
              "Academic goals, homework completion, life skills, and a safe place to be after school. Everyday steps toward confidence.",
            ],
            [
              "03",
              "Look ahead.",
              "High school graduation. College readiness. Leadership skills. A clear pathway toward self-sufficiency.",
            ],
          ].map(([number, title, text]) => (
            <Reveal key={number}>
              <span className="eyebrow">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <ProgramsFilm />
      <section className="faq-section section-space">
        <div>
          <span className="eyebrow">A FEW THINGS TO KNOW</span>
          <h2>
            Good
            <br />
            <em>questions.</em>
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
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
      <Join />
    </>
  );
}
