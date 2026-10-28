export type Project = {
  /** Unique, URL-safe id. */
  slug: string;
  title: string;
  /** One line shown under the image. */
  brief: string;
  /** Optional badge on the image, e.g. "In development". */
  status?: string;
  description: string;
  highlights: string[];
  stack: string[];
  /** Only the links that exist are rendered. */
  links: { live?: string; github?: string };
  image: { src: string; alt: string };
  /** Featured projects span the full width. */
  featured?: boolean;
};

export const work = {
  label: "Selected work",
  heading: "Things I've built.",
  /** Shown in the pill that follows the cursor over a project image. The live site wins over GitHub. */
  linkLabels: { live: "Visit live site", github: "View on GitHub" },
};

/** Add a project by adding one object to this array. */
export const projects: Project[] = [
  {
    slug: "broker-dashboard",
    title: "Broker Dashboard",
    brief: "A real-time broker administration dashboard with live positions, P&L and charts.",
    status: "In development...",
    description:
      "A broker-style administration dashboard built as an independent project, focused on real-time data, clear tables and a clean admin experience.",
    highlights: [
      "Real-time position and profit-and-loss (P&L) updates over WebSockets",
      "Pie, bar and area charts for profit, shares, orders and revenue",
      "Responsive customer and administrator data tables with validated forms",
      "Docker-based local environment",
    ],
    stack: ["React.js", "TypeScript", "shadcn/ui", "WebSockets", "Docker"],
    links: { github: "https://github.com/jumpsc4re2/broker-dashboard" },
    image: {
      src: "/assets/projects/broker-dashAboard.png",
      alt: "Broker Dashboard: admin screen with live positions, P&L figures and charts",
    },
    featured: true,
  },
  {
    slug: "econnex",
    title: "Econnex",
    brief: "A live forex brokerage marketing site, built pixel-perfect from Figma.",
    description:
      "A company project at Sky Option for a forex brokerage. I completed it from a scaffold started by another developer.",
    highlights: [
      "Pixel-perfect, responsive implementation from the Figma design",
      "WebSocket connection secured with HMAC-based message authentication",
      "Validated contact form",
      "Responsive from mobile to desktop",
    ],
    stack: ["Next.js", "Tailwind CSS", "shadcn/ui", "WebSockets"],
    links: { live: "https://econnexltd.com" },
    image: {
      src: "/assets/projects/econnexx.png",
      alt: "Econnex: homepage of the forex brokerage marketing website",
    },
  },
  {
    slug: "qualified",
    title: "Qualified",
    brief: "A responsive website for a car mechanic center.",
    description: "A website for an automotive services center.",
    highlights: [
      "Service showcases, pricing and contact information",
      "Arabic-friendly typography",
      "Reusable UI components",
      "Optimized static pages",
    ],
    stack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS"],
    links: { live: "https://qualified-center.vercel.app/" },
    image: {
      src: "/assets/projects/qualified.png",
      alt: "Qualified: homepage of the car mechanic center website",
    },
  },
];
