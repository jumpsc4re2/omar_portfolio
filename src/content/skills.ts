import type { IconType } from "react-icons";
import {
  LuArrowLeftRight,
  LuKeyRound,
  LuMonitorSmartphone,
  LuRadio,
  LuShieldCheck,
} from "react-icons/lu";
import {
  SiBootstrap,
  SiCss,
  SiDocker,
  SiElectron,
  SiFigma,
  SiGit,
  SiGithub,
  SiGsap,
  SiHtml5,
  SiJavascript,
  SiMui,
  SiNextdotjs,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiZod,
} from "react-icons/si";

export type Skill = {
  name: string;
  icon: IconType;
  /** Colour the logo takes on hover. Black brand marks use the text colour so they stay visible in both themes. */
  color: string;
};

export type SkillGroup = { title: string; skills: Skill[] };

/** Text colour of the current theme: for black brand marks and skills without a brand logo. */
const INK = "var(--color-ink)";

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "HTML", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS", icon: SiCss, color: "#663399" },
    ],
  },
  {
    title: "Frameworks and tools",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61dafb" },
      { name: "Next.js", icon: SiNextdotjs, color: INK },
      { name: "Electron", icon: SiElectron, color: "#47848f" },
      { name: "Vite", icon: SiVite, color: "#646cff" },
      { name: "Git", icon: SiGit, color: "#f05032" },
      { name: "GitHub", icon: SiGithub, color: INK },
      { name: "Figma", icon: SiFigma, color: "#f24e1e" },
    ],
  },
  {
    title: "UI and styling",
    skills: [
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
      { name: "Material UI", icon: SiMui, color: "#007fff" },
      { name: "shadcn/ui", icon: SiShadcnui, color: INK },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952b3" },
      { name: "GSAP", icon: SiGsap, color: "#88ce02" },
      { name: "Responsive design", icon: LuMonitorSmartphone, color: INK },
    ],
  },
  {
    title: "State, forms and data",
    skills: [
      { name: "Redux", icon: SiRedux, color: "#764abc" },
      { name: "React Context API", icon: SiReact, color: "#61dafb" },
      { name: "TanStack Query", icon: SiReactquery, color: "#ff4154" },
      { name: "React Hook Form", icon: SiReacthookform, color: "#ec5990" },
      { name: "Zod", icon: SiZod, color: "#3e67b1" },
      { name: "REST APIs", icon: LuArrowLeftRight, color: INK },
      { name: "NextAuth.js", icon: LuKeyRound, color: INK },
    ],
  },
  {
    title: "Real-time and backend",
    skills: [
      { name: "WebSockets", icon: LuRadio, color: INK },
      { name: "HMAC-based message authentication", icon: LuShieldCheck, color: INK },
      { name: "Docker", icon: SiDocker, color: "#2496ed" },
    ],
  },
];

export const javascriptFundamentals = [
  "Closures",
  "Scope and Execution Context",
  "Callbacks and Higher-Order Functions",
  "Asynchronous JavaScript and the Event Loop",
  "Type Coercion",
  "Prototypes and Classes (OOP)",
  "Metaprogramming",
];
