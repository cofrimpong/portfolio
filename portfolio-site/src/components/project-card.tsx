import type { ProjectEntry } from "@/content/site";

export function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <article className="project-card">
      {project.imageAsset ? (
        <div className="project-card__media">
          <img src={project.imageAsset} alt="" className="project-card__image" />
        </div>
      ) : null}

      <div className="project-card__header">
        <div>
          <p className="eyebrow">{project.label}</p>
          <h3>{project.title}</h3>
        </div>
        <div className="project-card__meta">
          <span className="status-pill">{project.year}</span>
          <span className="status-pill">{project.status}</span>
        </div>
      </div>

      <p className="project-summary">{project.summary}</p>
      <p className="project-detail">{project.detail}</p>

      <ul className="stack-list" aria-label={`${project.title} technologies`}>
        {project.stack.slice(0, 4).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <ul className="highlight-list">
        {project.highlights.slice(0, 3).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {project.repoUrl || project.liveUrl ? (
        <div className="project-links">
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              View repo
            </a>
          ) : null}
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              {project.liveLabel ?? "Live demo"}
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
