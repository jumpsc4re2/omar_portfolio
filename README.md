# Omar Farag — Personal Portfolio

A personal developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **GSAP**. It showcases selected work, experience, skills, and contact information in a fast, accessible, and polished single-page experience.

## ✨ Features

- **Single-page layout** — Hero, Work, About (skills + experience), and Contact sections with smooth scroll-spy navigation
- **GSAP-powered animations** — scroll-triggered reveals, staggered word animations, a rotating ticker, and a cursor-following pill
- **Dark / Light theme** — detects OS preference, persists to `localStorage`, and flashes no unstyled content
- **Accessible** — semantic HTML, `prefers-reduced-motion` respected, `noscript` fallbacks, skip-to-content link, ARIA labels throughout
- **SEO-ready** — full Open Graph & Twitter card meta, JSON-LD `Person` schema, `robots.txt`, and `sitemap.xml`
- **Performance-first** — partial prefetching, component caching, AVIF/WebP images, font subsetting, no render-blocking scripts
- **Content-driven** — all copy (projects, experience, skills, hero text) lives in typed `src/content/` files — no CMS needed

## 🗂 Project Structure

```
src/
├── app/                  # Next.js App Router — layout, page, metadata files
│   ├── layout.tsx        # Root layout (fonts, theme init, Navbar)
│   ├── page.tsx          # Home page (composes all sections)
│   ├── icon.tsx          # Programmatic favicon
│   ├── apple-icon.tsx    # Apple touch icon
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/           # Navbar, NavLinks, ScrollProgress
│   └── sections/         # Hero, Work, About, Experience, Contact, Statement, Ticker
│   └── ui/               # Reusable primitives (Pill, TagList, ProjectCard, LiveClock …)
├── config/
│   └── site.ts           # Single source of truth: name, URL, nav, theme colours, SEO
├── content/              # All editable copy as typed TS objects
│   ├── hero.ts
│   ├── projects.ts
│   ├── experience.ts
│   ├── skills.ts
│   ├── about.ts
│   ├── contact.ts
│   ├── statement.ts
│   ├── ticker.ts
│   └── certificates.ts
├── hooks/                # useInView, usePageVisible, useReducedMotion
├── lib/                  # gsap, motion, theme, clock, cn, scroll, clipboard, assets, duration
└── types/                # css.d.ts (custom property types)
public/
├── Omar-Farag-CV.pdf
└── assets/               # Portrait photos and project screenshots
```

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3 |
| Icons | react-icons 5 |
| Bundler | Turbopack |
| Linting | ESLint 9 + eslint-config-next |

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm (or your preferred package manager)

### Installation

```bash
# Clone the repo
git clone https://github.com/jumpsc4re2/omar-farag-portfolio.git
cd omar-farag-portfolio

# Install dependencies
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

> This is used for canonical URLs, Open Graph, and the sitemap. Falls back to `https://your-domain.com` if unset.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm run start
```

### Other scripts

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit (type-check without emitting files)
```

## ✏️ Customisation

All content is centralised — no scattered hard-coded strings:

| What to change | File |
|---|---|
| Name, URL, email, nav links, theme colours | [`src/config/site.ts`](src/config/site.ts) |
| Hero text, portrait, rotating phrases | [`src/content/hero.ts`](src/content/hero.ts) |
| Projects | [`src/content/projects.ts`](src/content/projects.ts) |
| Work experience | [`src/content/experience.ts`](src/content/experience.ts) |
| Skills grid | [`src/content/skills.ts`](src/content/skills.ts) |
| About copy | [`src/content/about.ts`](src/content/about.ts) |
| Contact links | [`src/content/contact.ts`](src/content/contact.ts) |

## 📦 Deployment

The easiest option is **Vercel** (zero-config for Next.js):

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the `NEXT_PUBLIC_SITE_URL` environment variable in the Vercel dashboard.
4. Deploy — Vercel handles builds and CDN automatically.

Any platform that supports Node.js (Netlify, Railway, Render, a VPS) works equally well with `npm run build && npm run start`.

## 📄 License

This project is the personal portfolio of **Omar Farag**. The source code is open for reference and inspiration. Please do not copy the design or content verbatim.

---

Built by [Omar Farag](https://www.linkedin.com/in/omar-farag-a543092a6) · Cairo, Egypt
