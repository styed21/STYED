/** Add only verified public details here. The PRD's hosting-account email is private. */
export const contactDetails: {
  email: string | null;
  phone: string | null;
  address: string | null;
  hours: string | null;
  area: string;
} = {
  email: null,
  phone: null,
  address: null,
  hours: null,
  area: "Minneapolis & the Twin Cities, Minnesota",
};

export const contactSubjects = [
  ["programs", "Programs & youth support"],
  ["mentor", "Volunteering & mentorship"],
  ["partner", "Community partnerships"],
  ["donations", "Donations & giving"],
  ["general", "Something else"],
] as const;
