import Link from "next/link";

import { siteContent } from "@/content/site";

export default function AiWorkflowPage() {
  return (
    <main className="page-shell detail-shell">
      <section className="detail-hero reveal-up">
        <p className="eyebrow">AI in a serious workflow</p>
        <h1>My goal is not just to use AI. It is to scope it, evaluate it, and make it accountable inside real work.</h1>
        <p className="detail-lede">{siteContent.perspectiveNote}</p>
        <div className="detail-actions">
          <Link href="/" className="button-secondary">
            Back to homepage
          </Link>
          <Link href="/projects" className="button-primary">
            See projects
          </Link>
        </div>
      </section>

      <section className="detail-grid reveal-up reveal-delay-1">
        <article className="detail-card">
          <p className="eyebrow">How I use AI</p>
          <ul className="story-list story-list--spacious">
            {siteContent.aiWorkflow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="detail-card">
          <p className="eyebrow">Control loop</p>
          <ul className="story-list story-list--compact">
            {siteContent.principles.map((principle) => (
              <li key={principle.title}>
                <strong>{principle.title}</strong>
                <span>{principle.body}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}