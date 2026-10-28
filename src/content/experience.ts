export type ExperienceEntry = {
  role: string;
  company: string;
  /** `dateTime` is machine-readable (YYYY-MM) for the <time> element. */
  start: { label: string; dateTime: string };
  end: { label: string; dateTime?: string };
  meta?: string;
  /** One string per paragraph. */
  description: string[];
  tech: string[];
};

export const experience = {
  label: "Experience",
  heading: "From intern to full-time.",
  /** Shown under the heading next to the summed length of all entries (updated daily). */
  totalLabel: "Total experience",
  /** Newest first. */
  entries: [
    {
      role: "Frontend Developer",
      company: "Sky Option for IT Solutions",
      start: { label: "Oct 2025", dateTime: "2025-10" },
      end: { label: "Present" },
      description: [
        "Contributing to production fintech platforms for forex brokers and trading, implementing features, improving existing interfaces and redesigning pages within established codebases.",
        "Built a feature that opens a dedicated Electron window from an action such as a button click, now reused across the dashboard, and learned Electron's main, preload and renderer processes in depth. Redesigned the dashboard's main table design and several pages to match Figma designs, fixed form bugs, and integrated backend APIs with TanStack Query.",
        "Completed the Econnex forex brokerage website, continuing from a scaffold started by another developer and implementing it pixel-perfect from the Figma design, including a WebSocket connection secured with HMAC-based message authentication and a validated contact form.",
      ],
      tech: [
        "React.js",
        "Next.js",
        "Electron",
        "Material UI",
        "TanStack Query",
        "Tailwind CSS",
        "shadcn/ui",
        "WebSockets",
      ],
    },
    {
      role: "Web Development Intern (React.js)",
      company: "Sky Option for IT Solutions",
      start: { label: "Jun 2025", dateTime: "2025-06" },
      end: { label: "Oct 2025", dateTime: "2025-10" },
      meta: "Internship, Remote",
      description: [
        "My first experience with the company: I joined the team on production forex brokerage applications, learned the existing codebases, collaborated with developers and delivered assigned tasks on deadline.",
        "Built new pages in a forex broker administration dashboard, including a moderators page with a filterable, sortable data table with search by ID, a multi-step dialog to add moderators with a validated form (React Hook Form with MUI Controller), and column visibility controls. Implemented light and dark themes that follow the operating system preference and fixed UI and responsive-design bugs, including responsive layouts for a second React.js dashboard.",
      ],
      tech: ["React.js", "Electron", "Material UI", "React Hook Form"],
    },
  ] satisfies ExperienceEntry[],
};
