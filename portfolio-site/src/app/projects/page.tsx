import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/content/site";

export default function ProjectsPage() {
  const featuredRepos = featuredProjects.filter((project) => project.repoUrl || project.liveUrl);

  return (
    <main className="page-shell detail-shell">
      <section className="detail-hero reveal-up">
        <p className="eyebrow">Project proof</p>
        <h1>These projects are where I test the kind of AI product, UX/UI, and systems work I want to keep doing.</h1>
        <p className="detail-lede">Repos and live demos are the evidence layer behind the homepage story.</p>
        <div className="detail-actions">
          <Link href="/" className="button-secondary">
            Back to homepage
          </Link>
        </div>
      </section>

      <section className="detail-projects reveal-up reveal-delay-1">
        <div className="project-grid">
          {featuredRepos.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}