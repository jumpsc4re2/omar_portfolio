export type NavItem = {
  label: string;
  href: string;
  /** id of the section this link scrolls to, used by the navbar scroll-spy. */
  sectionId: string;
};

export type SiteConfig = {
  name: string;
  fullName: string;
  jobTitle: string;
  /** Absolute site URL used for canonical, Open Graph, sitemap and JSON-LD. */
  url: string;
  title: string;
  description: string;
  keywords: string[];
  email: string;
  location: { city: string; country: string; countryCode: string; timeZone: string };
  employer: string;
  education: { school: string; program: string; years: string };
  links: { linkedin: string; github: string; resume: string };
  nav: NavItem[];
  /** Skills listed in the Person JSON-LD (`knowsAbout`). */
  knowsAbout: string[];
  /**
   * Accent and background per theme. Every green on the site reads from here; the OG image,
   * favicon and console greeting use the dark (default) values.
   */
  theme: Record<Theme, { accent: string; background: string }>;
};

export type Theme = "dark" | "light";

export const siteConfig: SiteConfig = {
  name: "Omar Farag",
  fullName: "Omar Farag Abullatef",
  jobTitle: "Frontend Developer",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com").replace(/\/$/, ""),
  title: "Omar Farag | Frontend Developer",
  description:
    "Frontend developer in Cairo, Egypt building fast, pixel-perfect interfaces with React, Next.js and TypeScript: admin dashboards, trading platforms and websites.",
  keywords: [
    "Omar Farag",
    "Frontend Developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Cairo",
    "Egypt",
    "Figma to code",
    "Admin dashboards",
  ],
  email: "omarfarag8972@gmail.com",
  location: { city: "Cairo", country: "Egypt", countryCode: "EG", timeZone: "Africa/Cairo" },
  employer: "Sky Option for IT Solutions",
  education: {
    school: "6th of October Technological University",
    program: "Information Technology",
    years: "2024–2028",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/omar-farag-a543092a6",
    github: "https://github.com/jumpsc4re2",
    resume: "/Omar-Farag-CV.pdf",
  },
  nav: [
    { label: "Work", href: "/#work", sectionId: "work" },
    { label: "About", href: "/#about", sectionId: "about" },
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Electron",
    "WebSockets",
    "REST APIs",
    "TanStack Query",
    "Responsive web design",
    "Figma to code",
  ],
  theme: {
    dark: { accent: "#3df58c", background: "#0c0c0b" },
    // A deeper green so accent text keeps at least 4.5:1 contrast on the light background.
    light: { accent: "#077a3c", background: "#eeeee8" },
  },
};
