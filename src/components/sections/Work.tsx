import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects, work, type Project } from "@/content/projects";
import { publicAssetExists } from "@/lib/assets";

/** Where clicking a project's image leads: the live site if there is one, else GitHub. */
function primaryLink({ links }: Project) {
  if (links.live) return { href: links.live, label: work.linkLabels.live };
  if (links.github) return { href: links.github, label: work.linkLabels.github };
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="py-24 md:py-32">
      <Container>
        <SectionHeader id="work-heading" label={work.label} title={work.heading} />
        <ul role="list" className="mt-14 grid items-start gap-5 md:mt-20 md:grid-cols-2 lg:gap-6">
          {projects.map((project, index) => (
            <li
              key={project.slug}
              data-reveal
              className={project.featured ? "md:col-span-2" : undefined}
              style={{ "--reveal-delay": `${(index % 2) * 90}ms` }}
            >
              <ProjectCard
                project={project}
                hasImage={publicAssetExists(project.image.src)}
                link={primaryLink(project)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
