export type PaperNoteContent = { label: string; text: string };

export const hero = {
  status: "Open to work",
  titleLines: ["Wanna", "build"],
  /** Cycled inside the outlined pill. The first phrase is the resting state (no JS, reduced motion). */
  rotatingPhrases: ["E-commerce?", "Business website?", "Admin dashboard?", "Figma to code?"],
  /** What screen readers hear for the whole h1. */
  accessibleTitle:
    "Wanna build an e-commerce store, a business website or an admin dashboard, or turn a Figma design into code?",
  description:
    "I'm Omar, a frontend developer from Cairo building production fintech interfaces: admin dashboards, trading platforms and websites. I turn Figma designs into fast, pixel-perfect, responsive products with React, Next.js and TypeScript.",
  primaryCta: { label: "See selected work", href: "#work" },
  resumeLabel: "Resume",
  portrait: {
    /** A square head-and-shoulders crop of /assets/omar.jpg, so the circle never has to upscale. */
    src: "/assets/omar-portrait.jpg",
    alt: "Portrait of Omar Farag, frontend developer based in Cairo",
    /** Focal point if the photo isn't square (CSS object-position). */
    focus: "50% 50%",
  },
  ringText: "FRONTEND DEVELOPER ✦ REACT ✦ NEXT.JS ✦ TYPESCRIPT ✦ ",
  notes: [
    {
      label: "ROLE.TXT",
      text: "Frontend Developer. React, Next.js and TypeScript, turning Figma designs into production-ready UI.",
    },
    {
      label: "BIO.TXT",
      text: "Started as an intern at Sky Option, now full-time on production fintech dashboards and trading websites.",
    },
  ] satisfies [PaperNoteContent, PaperNoteContent],
};
