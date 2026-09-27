import { ExpandingCards, type CardItem } from "@/components/ui/expanding-cards";
import { PreventionStory } from "@/components/ui/prevention-story";
import { asset } from "../data/content";
import { Reveal } from "./Reveal";
import { Arrow } from "./Arrow";

const awarenessCards: CardItem[] = [
  {
    id: "early",
    title: "Spot the danger",
    description:
      "Early awareness helps young people step away from dangerous drug use.",
    imgSrc: asset("prevention-awareness.webp"),
    imageAlt:
      "Awareness photograph of a person reaching toward drug paraphernalia",
    linkHref: "./programs.html#drug-prevention",
  },
  {
    id: "understand",
    title: "Know the risks",
    description:
      "Honest conversations about alcohol, pills, and street drugs support safer choices.",
    imgSrc: asset("prevention-substances.webp"),
    imageAlt:
      "Awareness photograph showing alcohol, cigarettes, pills, and syringes",
    linkHref: "./programs.html#drug-prevention",
  },
  {
    id: "care",
    title: "Connect to care",
    description:
      "Medical care and trusted support can guide a young person toward recovery.",
    imgSrc: asset("prevention-care.webp"),
    imageAlt:
      "Illustrative photograph of a medical team gathered around a hospital bed",
    linkHref: "./contact.html?topic=programs#message",
  },
  {
    id: "future",
    title: "Respond without delay",
    description:
      "Fast emergency action can save a life and open a path to support.",
    imgSrc: asset("prevention-future.webp"),
    imageAlt:
      "Illustrative photograph of a medical team transporting a patient",
    linkHref: "./mentorship.html",
  },
];

export function PreventionFocus({
  variant = "home",
}: {
  variant?: "home" | "programs" | "about";
}) {
  return (
    <section
      className={`prevention-focus prevention-focus--${variant} section-space`}
      id="youth-prevention"
      aria-labelledby="prevention-focus-title"
    >
      <div className="prevention-focus-intro">
        <Reveal>
          <span className="eyebrow">Youth drug prevention / Our priority</span>
          <h2 id="prevention-focus-title">
            More support.
            <br />
            <em>Less harm.</em>
          </h2>
          <p>
            Help young people stay away from street drugs and find support when
            substance use or addiction affects their lives.
          </p>
          <a
            className="text-link"
            href={
              variant === "programs"
                ? "#drug-prevention"
                : "./programs.html#drug-prevention"
            }
          >
            Our prevention approach <Arrow />
          </a>
        </Reveal>
        {variant === "home" ? (
          <PreventionStory />
        ) : (
          <div className="prevention-focus-goals">
            <span className="eyebrow">What we want to achieve</span>
            <h3>Connection before crisis.</h3>
            <p>
              Reduce youth involvement in street drug activity. Keep young
              people in school, build trusted relationships, and create a path
              toward a more stable future.
            </p>
            <a className="text-link" href="./mentorship.html">
              How mentorship helps <Arrow />
            </a>
          </div>
        )}
      </div>
      {variant !== "about" && (
        <>
          <div className="prevention-gallery-heading">
            <h3>Why prevention and response matter.</h3>
            <span>Open each image to learn more</span>
          </div>
          <ExpandingCards
            items={awarenessCards}
            aria-label="STYED drug prevention goals"
          />
          <p className="prevention-image-note">
            Images supplied by STYED. Health information:{" "}
            <a
              href="https://www.cdc.gov/nchs/products/databriefs/db549.htm"
              target="_blank"
              rel="noreferrer"
            >
              CDC
            </a>
            .
          </p>
        </>
      )}
    </section>
  );
}
