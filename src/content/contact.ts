import { siteConfig } from "@/config/site";

export const contact = {
  headline: {
    bold: "Got a project idea?",
    italic: "I'd like to see it.",
  },
  availability: "Open to full-time roles, internships, part-time work and freelance projects.",
  copiedMessage: "Copied",
  links: [
    { label: "LinkedIn", href: siteConfig.links.linkedin },
    { label: "GitHub", href: siteConfig.links.github },
    { label: "Resume", href: siteConfig.links.resume },
  ],
  backToTop: { label: "Back to top", ringText: "BACK TO TOP ✦ THANKS FOR SCROLLING ✦ " },
  clockLabel: "Cairo",
  builtWith: "Built with Next.js + Tailwind",
};
