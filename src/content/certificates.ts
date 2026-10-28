export type Issuer = {
  name: string;
  /** Logo in /public. If the file is missing, a tile with `initials` is shown. */
  logo: string;
  initials: string;
};

export type Certificate = {
  title: string;
  issuer: Issuer;
  instructor: string;
  date: { label: string; dateTime: string };
  href: string;
  description: string;
};

const udemy: Issuer = { name: "Udemy", logo: "/assets/logos/udemy.svg", initials: "U" };
const frontendMasters: Issuer = {
  name: "Frontend Masters",
  logo: "/assets/logos/frontendmasters.jpeg",
  initials: "FM",
};

export const certificates: Certificate[] = [
  {
    title: "React - The Complete Guide 2025 (incl. Next.js, Redux)",
    issuer: udemy,
    instructor: "Maximilian Schwarzmüller",
    date: { label: "January 2025", dateTime: "2025-01" },
    href: "https://udemy-certificate.s3.amazonaws.com/image/UC-8eddd81c-fa6b-4191-aab6-4d6e90687249.jpg",
    description:
      "A deep course on building React apps, covering components, hooks, state management with Redux, and Next.js.",
  },
  {
    title: "JavaScript: The Hard Parts, v3",
    issuer: frontendMasters,
    instructor: "Will Sentance",
    date: { label: "May 2026", dateTime: "2026-05" },
    href: "https://static.frontendmasters.com/ud/c/e5ed6c1e73/KmOjonKKum/javascript-hard-parts-v3-masterdev.pdf",
    description:
      "Core JavaScript mechanics: closures, asynchronous code and the event loop, and prototypes and classes.",
  },
  {
    title: "TypeScript: From First Steps to Professional",
    issuer: frontendMasters,
    instructor: "Anjana Vakil",
    date: { label: "September 2026", dateTime: "2026-09" },
    href: "https://static.frontendmasters.com/ud/c/e5ed6c1e73/jfuxcgueUy/typescript-first-steps-masterdev.pdf",
    description:
      "Typing JavaScript with TypeScript, from the basics to generics and utility types.",
  },
];
