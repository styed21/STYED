import { Hero } from "../components/Hero";
import { Chapters } from "../components/Chapters";
import { Arrow } from "../components/Arrow";
import { Services } from "../components/Services";
import { Donation } from "../components/Donation";
import { ProgramRail } from "../components/ProgramRail";
import { CommunityMontage } from "../components/CommunityMontage";
import MapDemo from "@/components/ui/demo";
import { WhySupport } from "../components/WhySupport";

export function Home() {
  return (
    <>
      <Hero />
      <ProgramRail>
        <div className="rail-intro">
          <div>
            <span className="eyebrow">Here for Twin Cities youth</span>
            <h2>
              Support to learn.
              <br />
              Confidence to <em>grow.</em>
            </h2>
          </div>
          <div className="rail-intro-detail">
            <p>
              Save The Youth Education Development brings together tutoring,
              mentorship, and support for young people and families.
            </p>
            <a className="text-link" href="./about.html">
              Meet STYED <Arrow />
            </a>
          </div>
        </div>
      </ProgramRail>
      <Chapters />
      <Services />
      <WhySupport />
      <CommunityMontage />
      <MapDemo />
      <Donation />
    </>
  );
}
