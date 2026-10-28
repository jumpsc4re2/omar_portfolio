import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Ticker } from "@/components/sections/Ticker";
import { Work } from "@/components/sections/Work";
import { CursorPill } from "@/components/ui/CursorPill";
import { ViewportObserver } from "@/components/ui/ViewportObserver";
import { siteConfig } from "@/config/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  jobTitle: siteConfig.jobTitle,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressCountry: siteConfig.location.countryCode,
  },
  worksFor: { "@type": "Organization", name: siteConfig.employer },
  knowsAbout: siteConfig.knowsAbout,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Ticker />
        <Statement />
        <Experience />
        <Work />
        <About />
      </main>
      <Contact />
      <ViewportObserver />
      <CursorPill />
    </>
  );
}
