import Link from "next/link";

import { siteContent } from "@/content/site";

export default function ProfessionalDirectionPage() {
  return (
    <main className="page-shell detail-shell">
      <section className="detail-hero reveal-up">
        <p className="eyebrow">Professional direction</p>
        <h1>I am building toward AI product and UX/UI work where judgment, clarity, and delivery matter as much as code.</h1>
        <p className="detail-lede">{siteContent.professionalDirection}</p>
        <div className="detail-actions">
          <Link href="/" className="button-secondary">
            Back to homepage
          </Link>
          <a href={siteContent.contact.github} className="button-primary" target="_blank" rel="noreferrer">
            Open GitHub
          </a>
          <a href={siteContent.contact.linkedin} className="button-secondary" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </section>

      <section className="detail-grid reveal-up reveal-delay-1">
        <article className="detail-card">
          <p className="eyebrow">What shaped this direction</p>
          <p>{siteContent.homeCardBlurb}</p>
          <p>{siteContent.manifestoBody}</p>
          <p>{siteContent.intro}</p>
        </article>

        <article className="detail-card">
          <p className="eyebrow">Work I want to be known for</p>
          <p>{siteContent.knownFor}</p>
          <ul className="story-list story-list--compact">
            {siteContent.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}