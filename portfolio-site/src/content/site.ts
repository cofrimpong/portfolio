export type ProjectEntry = {
  slug: string;
  title: string;
  year: string;
  label: string;
  summary: string;
  detail: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  status: string;
  highlights: string[];
  imageAsset?: string;
};

export const siteContent = {
  name: "Christabel O Frimpong",
  role: "AI systems builder, product thinker, and UX/UI developer",
  professionalDirection:
    "I am building toward a career where I can shape AI products, design thoughtful interfaces, and help teams turn complex systems into tools people can actually trust and use.",
  knownFor:
    "Human-centered AI product thinking, clear interface design, and workflows that connect concept, proof, and delivery.",
  location: "New Jersey Institute of Technology",
  topBarLabel: "Back to portfolio",
  availability: "Open to AI product, frontend, and orchestration-focused opportunities",
  homeCardLabel: "Newark-born builder",
  homeCardBlurb:
    "Born in Newark and raised in North Jersey, I bring curiosity, care, and a people-first mindset to AI, UX/UI, and product design.",
  audience:
    "For teams hiring someone who can shape AI tools, explain them clearly, and design products that keep people from being an afterthought.",
  signal: "Curious builder x community-minded designer",
  visualSystem:
    "Warm editorial framing with human-centered storytelling, grounded product language, and strong system thinking.",
  manifesto: "I build AI and UX/UI experiences that keep people at the center.",
  manifestoBody:
    "I did not start out interested in computers. I mostly knew them as the place where I could play video games. What stayed with me was the curiosity behind them and the desire to help people. I once thought about becoming a pediatrician because I wanted to care for others, but over time I realized that path was not mine.",
  intro:
    "Growing up in an African household, I understood the pressure to choose a familiar path, but I also knew I wanted to learn, build, and give back in my own way. That is what led me toward computer science and AI, and eventually toward UX/UI, where I can create work that is thoughtful, useful, and inclusive.",
  storyLabel: "My story",
  storyTitle: "From Newark to UX/UI, I found a way to turn curiosity and care into design work.",
  storyBody:
    "I was born in Newark and raised in the North Jersey area. I did not grow up seeing tech as a dream career. I only knew computers as a place to play games, but I always had curiosity and a real desire to help people. That is why I once imagined myself in medicine, especially pediatrics. As I grew, I realized that path was not for me, but the purpose behind it stayed the same: I wanted to learn new things, support others, and make a difference in my community.",
  storyHighlights: [
    "Started with curiosity, not a tech background.",
    "Moved from medicine-minded goals to human-centered design.",
    "Found my fit in computer science, AI, and UX/UI as a way to help people.",
  ],
  heroStats: [
    { value: "7", label: "recent projects framed as products, tools, or systems" },
    { value: "3", label: "core lanes carried through real builds" },
    { value: "40+", label: "flows, pages, prompts, and delivery details shaped across projects" },
  ],
  principles: [
    {
      title: "Make the system understandable first",
      body:
        "I want a person to understand what the product is for, why it exists, and how to use it before the technical depth even becomes the topic.",
    },
    {
      title: "Carry one idea across every surface",
      body:
        "Landing page, interaction flow, repo structure, and documentation should all sound like the same builder solving the same problem.",
    },
    {
      title: "Ship proof, not just intention",
      body:
        "I like prototypes that can be opened, tested, demoed, and explained without asking someone to imagine the missing half.",
    },
  ],
  perspectiveNote:
    "I do not start with the tool. I start with what the person needs to feel seen, then I shape the system and interface around that decision.",
  perspectiveCredit: "How I think about building",
  lookingFor:
    "Teams that want someone who can carry an AI or product concept from rough idea to usable interface without losing the human story along the way.",
  focus: [
    "AI product prototypes",
    "AI orchestration systems",
    "Developer tooling",
    "Data storytelling",
    "Low-cost maintainable web delivery",
  ],
  developingSkills: [
    "Designing interfaces that explain complex systems clearly.",
    "Building AI-assisted workflows that still keep a human decision-maker in the loop.",
    "Connecting product thinking, frontend implementation, and documentation in one deliverable.",
  ],
  aiWorkflow: [
    "I use AI as part of structured product and content workflows, not as a shortcut that replaces judgment.",
    "My projects show AI being used for orchestration, content generation, automation, and decision support with clear system boundaries.",
    "I care about explainability, proof, and user trust, so the workflow always matters as much as the output.",
  ],
  contact: {
    github: "https://github.com/cofrimpong",
    linkedin: "https://www.linkedin.com/in/cofrimpong-666658270",
  },
};

export const featuredProjects: ProjectEntry[] = [
  {
    slug: "curlcarematch",
    title: "CurlCare Match",
    year: "2026",
    label: "Recommendation Product",
    summary:
      "Inclusive hair product recommendation web app that helps users build a hair profile, avoid unwanted ingredients, and receive explainable matches based on fit, budget, and hair goals.",
    detail:
      "This project combines a multi-page frontend with recommendation logic, product scoring, user profile persistence, and a grounded assistant experience. It stands out because the product is not just a quiz. It turns hair type, porosity, density, and shopping constraints into clear recommendations people can actually use.",
    stack: ["JavaScript", "HTML", "CSS", "Bootstrap", "Node.js", "LangChain", "Vitest"],
    repoUrl: "https://github.com/cofrimpong/curlcarematch",
    liveUrl: "https://curlcarematch.vercel.app/",
    liveLabel: "See site",
    status: "Live recommendation build",
    highlights: [
      "Matches products by hair type, porosity, density, budget, and styling goals instead of vague one-size-fits-all advice.",
      "Explains why products fit and flags ingredient concerns rather than returning black-box recommendations.",
      "Includes a grounded assistant flow, automated tests, and deployment-ready Vercel setup.",
    ],
  },
  {
    slug: "student-reality-lab-frimpong",
    title: "Student Reality Lab",
    year: "2026",
    label: "Data Product",
    summary:
      "Interactive housing-affordability experience that tests whether a recent graduate can realistically buy a starter home.",
    detail:
      "The repo combines dataset provenance, transform scripts, schema thinking, and interaction design to turn a broad economic question into an explorable product.",
    stack: ["JavaScript", "HTML", "CSS", "Data Visualization"],
    repoUrl: "https://github.com/cofrimpong/student-reality-lab-frimpong",
    liveUrl: "https://cofrimpong.github.io/student-reality-lab-frimpong/",
    status: "Live demo",
    highlights: [
      "Uses BLS, Zillow, and Freddie Mac data to frame the affordability question.",
      "Lets users change assumptions with dynamic controls instead of reading a static chart.",
      "Documents limitations and next-step model improvements clearly.",
    ],
  },
  {
    slug: "aiorchestratingchat",
    title: "AI Orchestrating Chat",
    year: "2026",
    label: "AI Orchestration",
    summary:
      "Next.js counselor-style chat system that uses server-side AI tool calling and MCP architecture to guide users through orchestrator design.",
    detail:
      "This project combines a modern web app stack with orchestration patterns: App Router delivery, server-only model access, MCP tool boundaries, grounded counseling sources, and CI-backed quality gates. It stands out because the product is not just chat. It is a structured decision-support interface for designing human-centered AI orchestrators.",
    stack: ["TypeScript", "Next.js", "React", "Tailwind CSS", "OpenAI API", "MCP", "Vitest"],
    repoUrl: "https://github.com/cofrimpong/aiorchestratingchat",
    liveUrl: "https://aiorchestratingchat.vercel.app/",
    liveLabel: "See site",
    status: "Active orchestration build",
    imageAsset: "/generated/case-study-hotline-board.png",
    highlights: [
      "Routes chat through a server-side API so model keys stay off the client.",
      "Uses MCP client-server patterns to ground responses with counselor sources and tool boundaries.",
      "Includes production-minded quality gates with linting, formatting, tests, Husky hooks, and CI.",
    ],
  },
  {
    slug: "lyriclensai",
    title: "LyricLens AI",
    year: "2026",
    label: "AI Music Discovery",
    summary:
      "AI-powered emotional music discovery platform that helps users find songs through mood, lyrical meaning, themes, and semantic similarity instead of searching only by title or artist.",
    detail:
      "This project combines Flask delivery, NLP-driven semantic search, embeddings, ChromaDB retrieval, Spotify integration, and a polished discovery interface to make music exploration feel emotional, searchable, and explainable. It stands out because it treats music discovery like a meaning-first search problem rather than a basic catalog lookup.",
    stack: ["Python", "Flask", "Sentence Transformers", "ChromaDB", "Spotify API", "HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/cofrimpong/lyriclensai",
    liveUrl: "https://lyriclensai.onrender.com/",
    liveLabel: "See site",
    status: "Live AI discovery build",
    highlights: [
      "Lets users search by feelings, moods, themes, and personal experiences instead of exact song titles.",
      "Uses embeddings and vector search to return semantically related songs with lyric-based emotional interpretation.",
      "Connects discovery to Spotify metadata, artwork, and listening links through a polished, mood-driven interface.",
    ],
  },
  {
    slug: "cleanflow",
    title: "CleanFlow",
    year: "2026",
    label: "AI Data Cleaning",
    summary:
      "FastAPI-based dataset cleaning application that combines a deterministic Pandas pipeline with retrieval-grounded explanations and a smart cleaning assistant for messy CSV workflows.",
    detail:
      "This project turns dataset cleaning into a guided product experience instead of a one-off script. It combines FastAPI delivery, deterministic mode-aware cleaning rules, RAG-backed explanations, and exportable reports so users can understand what changed, why it changed, and which cleaning tradeoffs fit their workflow.",
    stack: ["Python", "FastAPI", "Pandas", "ChromaDB", "Jinja2", "HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/cofrimpong/cleanflow",
    liveUrl: "https://cleanflow-xqor.onrender.com/",
    liveLabel: "See site",
    status: "Live data cleaning build",
    highlights: [
      "Uploads messy CSVs, profiles data issues, and applies deterministic cleaning rules instead of black-box transformations.",
      "Supports workflow-specific modes for visualization, modeling, reporting, and exploration with different cleaning tradeoffs.",
      "Adds grounded assistant guidance and downloadable reports so users can review what changed and why.",
    ],
  },
  {
    slug: "blogtalk",
    title: "blogtalk",
    year: "2026",
    label: "AI Content Workflow",
    summary:
      "Next.js blog with an AI consultant flow that turns voice input into publishable markdown content.",
    detail:
      "This build moves beyond a basic blog by combining auth, client-side transcription, LLM structuring, human approval, and GitHub-backed publishing into one workflow.",
    stack: ["TypeScript", "Next.js", "Firebase", "GitHub Actions", "AI APIs"],
    repoUrl: "https://github.com/cofrimpong/blogtalk",
    liveUrl: "https://cofrimpong.github.io/blogtalk/",
    liveLabel: "See site",
    status: "Workflow prototype",
    highlights: [
      "Transforms recorded voice into structured post content.",
      "Keeps a human approval step before publishing.",
      "Uses repository automation so content updates can flow directly into deployment.",
    ],
  },
  {
    slug: "ai-investment-newsletter",
    title: "AI Investment Newsletter Factory",
    year: "2026",
    label: "AI Automation",
    summary:
      "Streamlit app that turns live AI funding news into a structured, readable newsletter.",
    detail:
      "This is a focused automation pipeline: fetch source material, extract funding signals, shape the output, and display it through a lightweight web interface.",
    stack: ["Python", "Streamlit", "Feedparser", "Regex"],
    repoUrl: "https://github.com/cofrimpong/ai-investment-newsletter",
    status: "Automation prototype",
    highlights: [
      "Pulls AI-related news from a live RSS source.",
      "Extracts funding amounts, round types, and investor names.",
      "Packages the result as a repeatable newsletter workflow rather than a one-off script.",
    ],
  },
  {
    slug: "christabel-portfolio-poc",
    title: "AI Consultant Portfolio POC",
    year: "2026",
    label: "Portfolio System",
    summary:
      "Low-cost portfolio proof of concept built for GitHub Pages with content managed from a single source of truth.",
    detail:
      "This project matters because it shows product constraints clearly: zero-cost hosting, maintainability, redistribution, and AI-friendly content updates.",
    stack: ["HTML", "Python", "GitHub Pages"],
    repoUrl: "https://github.com/cofrimpong/christabel-portfolio-poc",
    liveUrl: "https://cofrimpong.github.io/christabel-portfolio-poc/",
    status: "Live proof of concept",
    highlights: [
      "Uses one content file to keep updates simple and non-technical.",
      "Optimized for free hosting and easy reuse.",
      "Structured to support future AI-assisted editing workflows.",
    ],
  },
  {
    slug: "ollama-demo",
    title: "ollama-demo",
    year: "2026",
    label: "Local AI Exploration",
    summary:
      "Early local AI environment setup work captured in a minimal repository.",
    detail:
      "This repo is intentionally small, but it still signals hands-on experimentation with local model tooling and development containers.",
    stack: ["Dev Containers", "Local AI"],
    repoUrl: "https://github.com/cofrimpong/ollama-demo",
    status: "Exploration repo",
    highlights: [
      "Captures local environment setup work rather than polished application code.",
      "Shows willingness to test local AI workflows early.",
      "Useful as supporting evidence of experimentation, not as the hero project.",
    ],
  },
];
