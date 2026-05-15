import fs from "node:fs";
import path from "node:path";

import Link from "next/link";

import { featuredProjects, siteContent } from "@/content/site";

export default function HomePage() {
  const featuredRepos = featuredProjects.filter((project) => project.repoUrl || project.liveUrl);
  const proofProjects = featuredRepos.slice(0, 6);
  const generatedDir = path.join(process.cwd(), "public", "generated");
  const pickImage = (preferred: string, fallback: string) =>
    fs.existsSync(path.join(generatedDir, preferred)) ? `/generated/${preferred}` : fallback;

  const journeyImages = {
    hero: pickImage("hero-portrait-board.png", "/generated/hero-portrait-board.png"),
    newark: pickImage("journey-newark-street.png", "/generated/case-study-hotline-board.png"),
    household: pickImage("journey-african-household.png", "/generated/case-study-hotline-board.png"),
    curiosity: pickImage("journey-curiosity-service.png", "/generated/case-study-transit-board.png"),
    builder: pickImage("journey-ai-builder-studio.png", "/generated/case-study-transit-board.png"),
  };

  return (
    <main className="page-shell scrolly-shell">
      <section id="slide-1" className="story-slide story-slide--hero reveal-up">
        <div className="story-slide__background">
          <img
            src={journeyImages.hero}
            alt="Portrait board for Christabel O Frimpong"
            className="story-slide__background-image"
          />
        </div>
        <div className="story-slide__content story-slide__content--hero">
          <p className="eyebrow">{siteContent.homeCardLabel}</p>
          <h1>From Newark to becoming an AI builder.</h1>
          <p className="story-slide__lede">My path into AI did not begin with code. It began with where I come from, how I was raised, and a need to make work that helps people.</p>
          <p className="story-slide__body">{siteContent.role}</p>
          <div className="story-slide__actions">
            <a href="#slide-2" className="button-primary">
              Follow the journey
            </a>
            <Link href="/professional-direction" className="button-secondary">
              Read the direction
            </Link>
            <a href={siteContent.contact.github} className="button-secondary" target="_blank" rel="noreferrer">
              Open GitHub
            </a>
            <a href={siteContent.contact.linkedin} className="button-secondary" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section id="slide-2" className="story-slide story-slide--split reveal-up reveal-delay-1">
        <div className="story-slide__background story-slide__background--dimmed">
          <img
            src={journeyImages.newark}
            alt="Newark city background"
            className="story-slide__background-image"
          />
        </div>
        <div className="story-slide__content story-slide__content--split">
          <article className="story-panel story-panel--primary">
            <p className="eyebrow">Chapter one</p>
            <h2>I was born and raised in North Jersey. That is where my sense of people, community, and useful work began.</h2>
            <p>{siteContent.homeCardBlurb}</p>
            <p>I learned early that work matters most when it stays connected to real lives, real needs, and the place you come from.</p>
          </article>
          <aside className="story-panel story-panel--supporting">
            <p className="eyebrow">What stayed with me</p>
            <p className="story-panel__quote">Before I had the language for product or AI, I already cared about people, clarity, and making something that could actually help.</p>
            <ul className="story-list">
              {siteContent.storyHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/professional-direction" className="story-panel__link">
              Open the full direction page
            </Link>
          </aside>
        </div>
      </section>

      <section id="slide-3" className="story-slide story-slide--evidence reveal-up reveal-delay-1">
        <div className="story-slide__background story-slide__background--dimmed">
          <img
            src={journeyImages.household}
            alt="African household background"
            className="story-slide__background-image"
          />
        </div>
        <div className="story-slide__content story-slide__content--wide">
          <div className="section-kicker">
            <p className="eyebrow">Chapter two</p>
            <h2>Growing up in an African household taught me discipline, responsibility, and the weight of choosing the right path.</h2>
          </div>
          <div className="evidence-grid">
            <article className="story-panel">
              <p>{siteContent.intro}</p>
            </article>
            <article className="story-panel">
              <p className="eyebrow">What that shaped in me</p>
              <ul className="story-list story-list--compact">
                {[
                  "A strong sense that work should be useful to other people.",
                  "The habit of taking responsibility for what I make and how it affects others.",
                  "A desire to build my own path instead of only following the expected one.",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="story-panel story-panel--stats" aria-label="Portfolio highlights">
              {siteContent.heroStats.map((item) => (
                <div key={item.label} className="stat-block">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section id="slide-4" className="story-slide story-slide--split reveal-up reveal-delay-2">
        <div className="story-slide__background story-slide__background--dimmed">
          <img
            src={journeyImages.curiosity}
            alt="Curiosity and service background"
            className="story-slide__background-image"
          />
        </div>
        <div className="story-slide__content story-slide__content--split">
          <article className="story-panel story-panel--primary">
            <p className="eyebrow">Chapter three</p>
            <h2>Curiosity and the desire to give back are what pulled me toward computer science, then AI, and finally toward building products people can trust.</h2>
            <p>{siteContent.manifestoBody}</p>
            <ul className="story-list story-list--spacious">
              {siteContent.developingSkills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/ai-workflow" className="story-panel__link">
              Read the workflow page
            </Link>
          </article>
          <aside className="story-panel story-panel--supporting">
            <p className="eyebrow">What I am becoming</p>
            <p className="story-panel__quote">{siteContent.professionalDirection}</p>
            <ul className="story-list story-list--compact">
              {siteContent.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <blockquote>{siteContent.manifesto}</blockquote>
          </aside>
        </div>
      </section>

      <section id="slide-5" className="story-slide story-slide--split reveal-up reveal-delay-2">
        <div className="story-slide__background story-slide__background--dimmed">
          <img
            src={journeyImages.builder}
            alt="AI builder studio background"
            className="story-slide__background-image"
          />
        </div>
        <div className="story-slide__content story-slide__content--split">
          <article className="story-panel story-panel--primary">
            <p className="eyebrow">Chapter four</p>
            <h2>Becoming an AI builder means more than using the tools. It means learning how to guide them, explain them, and keep people at the center.</h2>
            <ul className="story-list story-list--spacious">
              {siteContent.aiWorkflow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/ai-workflow" className="story-panel__link">
              Read the workflow page
            </Link>
          </article>
          <aside className="story-panel story-panel--supporting">
            <p className="eyebrow">How I work</p>
            <ul className="story-list story-list--compact">
              {siteContent.principles.map((principle) => (
                <li key={principle.title}>
                  <strong>{principle.title}</strong>
                  <span>{principle.body}</span>
                </li>
              ))}
            </ul>
            <blockquote>{siteContent.perspectiveNote}</blockquote>
          </aside>
        </div>
      </section>

      <section id="slide-6" className="story-slide story-slide--proof reveal-up reveal-delay-2">
        <div className="story-slide__background story-slide__background--dimmed">
          <img
            src="/generated/case-study-transit-board.png"
            alt="Project proof background"
            className="story-slide__background-image"
          />
        </div>
        <div className="story-slide__content story-slide__content--wide">
          <div className="section-kicker">
            <p className="eyebrow">Proof</p>
            <h2>This is where the journey turns into visible work.</h2>
          </div>
          <div className="proof-grid">
            {proofProjects.map((project) => (
              <article key={project.slug} className="proof-card">
                <p className="eyebrow">{project.label}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="proof-card__links">
                  {project.repoUrl ? (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      Repo
                    </a>
                  ) : null}
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      {project.liveLabel ?? "Live"}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
          <div className="story-slide__footer story-slide__footer--centered">
            <Link href="/projects" className="button-secondary">
              Open all project details
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
