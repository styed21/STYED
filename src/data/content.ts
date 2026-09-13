export type Page =
  | "home"
  | "about"
  | "programs"
  | "involved"
  | "donate"
  | "contact"
  | "mentorship";

export const asset = (name: string) => `./assets/${name}`;

export type Program = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  headline: [string, string];
  description: string;
  image: string;
  imageAlt: string;
  details: string[];
};

export const programs: Program[] = [
  {
    id: "education",
    number: "01",
    name: "Education & mentorship",
    shortName: "Education",
    headline: ["A little guidance.", "A world of possibility."],
    description:
      "Free after-school tutoring, homework help, and mentors who keep showing up. A safe space to learn today and prepare for tomorrow.",
    image: "education.webp",
    imageAlt: "Students learning with an educator around a classroom table",
    details: [
      "Daily after-school tutoring and homework help",
      "One-on-one and small-group mentorship",
      "Leadership and communication skills",
      "College readiness and application guidance",
    ],
  },
  {
    id: "housing",
    number: "02",
    name: "Housing stability",
    shortName: "Stability",
    headline: ["A safe place to be.", "A steady way forward."],
    description:
      "Support and referrals for young people facing housing instability. Because a change in circumstances should never mean an end to learning.",
    image: "housing.webp",
    imageAlt:
      "A city street with temporary shelters, illustrating the need for stable housing",
    details: [
      "Support and referrals for youth at risk of homelessness",
      "Advocacy for emergency housing through local shelters",
      "School continuity, transportation, and supply support",
      "Life skills, financial literacy, and job-readiness mentorship",
    ],
  },
  {
    id: "safety",
    number: "03",
    name: "Community safety",
    shortName: "Safety",
    headline: ["Less gun violence.", "More life ahead."],
    description:
      "Violence prevention, community healing, and youth-led advocacy. Working together for neighborhoods where young people can feel safe.",
    image: "community.webp",
    imageAlt: "Community members gathering for a facilitated learning session",
    details: [
      "Violence-prevention and diversion support",
      "Advocacy for safer schools and places of worship",
      "Trauma-informed community healing initiatives",
      "Youth-led advocacy to reduce gun violence and street drug harm",
    ],
  },
  {
    id: "rights",
    number: "04",
    name: "Immigrant youth & family rights",
    shortName: "Belonging",
    headline: ["Every voice belongs.", "Every future matters."],
    description:
      "Standing with immigrant youth and families. Know-your-rights education, legal navigation, and opportunities to lead.",
    image: "opportunity.webp",
    imageAlt: "A young woman studying at a computer with other students",
    details: [
      "Know-your-rights education",
      "Legal navigation and connections to support",
      "Youth leadership councils",
      "Family advocacy and civic engagement",
    ],
  },
];

export const heroSlides = [
  {
    image: "hero-mentorship.webp",
    alt: "Students and an educator collaborating around a table",
    lines: ["A place to learn.", "The space to grow."],
    label: "After-school tutoring & mentorship",
    detail: "Big possibilities begin with everyday support.",
    href: "./programs.html#education",
  },
  {
    image: "community.webp",
    alt: "A community group taking part in a learning session",
    lines: ["Less gun violence.", "More life ahead."],
    label: "Community safety & violence prevention",
    detail: "Safer neighborhoods. Stronger futures.",
    href: "./programs.html#safety",
  },
  {
    image: "housing.webp",
    alt: "Temporary shelters along a city street",
    lines: ["A safe place.", "A steady future."],
    label: "Youth housing stability",
    detail: "A stable home. An uninterrupted education.",
    href: "./programs.html#housing",
  },
  {
    image: "opportunity.webp",
    alt: "A student working at a computer",
    lines: ["Every voice matters.", "Every young person."],
    label: "Immigrant youth & family rights",
    detail: "Opportunity should have no borders.",
    href: "./programs.html#rights",
  },
] as const;

export const faqs = [
  [
    "Who does STYED serve?",
    "Youth across Minneapolis and the Twin Cities, prioritizing those affected by community violence, housing instability, and limited access to academic support.",
  ],
  [
    "Is after-school academic support free?",
    "Yes. Our mission is to provide free, consistent access to after-school tutoring, homework help, mentorship, and leadership development.",
  ],
  [
    "What does mentorship look like?",
    "One-on-one and small-group guidance from consistent, trained adult mentors, with support for academic goals, life skills, leadership, and college readiness.",
  ],
  [
    "How can I get involved?",
    "Explore mentoring, community partnerships, and giving on our Get Involved page. Public contact information and enrollment details will be shared on our Contact page as they become available.",
  ],
] as const;

export function pageFromPath(path: string): Page {
  if (/mentorship(?:\.html)?\/?$/.test(path)) return "mentorship";
  if (/contact(?:\.html)?\/?$/.test(path)) return "contact";
  if (/donate(?:\.html)?\/?$/.test(path)) return "donate";
  if (/about(?:\.html)?\/?$/.test(path)) return "about";
  if (/programs(?:\.html)?\/?$/.test(path)) return "programs";
  if (/get-involved(?:\.html)?\/?$/.test(path)) return "involved";
  return "home";
}
