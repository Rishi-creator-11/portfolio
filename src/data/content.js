// Single source of truth. Claims trace to the résumé, public repos, or the owner's own account.

export const links = {
  github: "https://github.com/Rishi-creator-11",
  linkedin: "https://www.linkedin.com/in/rishi1111",
  email: "hrishitkumar.cs@gmail.com",
  phone: "(914) 446-0465",
  phoneHref: "tel:+19144460465",
};

// Résumé order, titles and dates. `why` maps the work to what a team hiring an AI builder needs.
export const experience = [
  {
    role: "Contract Full-Stack Engineer",
    org: "Small-business ordering platform (client)",
    place: "New York, NY",
    dates: "July 2026 – September 2026",
    bullets: [
      "Used Claude Code and AI-assisted development to turn a business owner's workflows into a production Next.js/TypeScript platform supporting ~97 configurable products.",
      "Automated ingestion of 80 products and 559 pricing rows into Supabase, reconciling counts against the client's data.",
      "Rebuilt pricing around 559 exact-combination rows, blocking invalid configurations and client/server checkout-total drift.",
    ],
    why: "The owner now handles every product and price in one place, and a quote can't differ from the checkout total. Same pattern as lead intake, quoting and CRM upkeep: take a repetitive, error-prone workflow and make it one trusted system, built from a non-technical user's description. (Client name and screenshots are private; the business and its revenue pre-date my work.)",
  },
  {
    role: "Software Engineer Intern",
    org: "Pencil Learning Technologies",
    place: "San Francisco, CA",
    dates: "June 2025 – August 2025",
    bullets: [
      "Built core sync infrastructure for the Mario SDK (published as @pncl/mario), cutting state-update latency from ~500 ms to <100 ms with incremental JSON Patch diffs.",
      "Designed conflict-free merge logic with Yjs CRDTs, preventing lost updates and keeping state consistent on reconnect.",
      "Integrated the SDK into 10+ embedded apps, cutting cross-client state drift 30% and removing 1K lines of per-app glue; built app features on it, including a configuration-driven Word Mat and the Polls rewrite from Angular to React/Vite.",
      "Automated CI/CD with GitHub Actions and Docker (typed build, test, npm publish), trimming release cycle time 15%.",
    ],
    why: "Shipped inside a shared codebase other engineers depend on, with compatibility preserved and releases automated. That is how an AI prototype becomes a production feature alongside a dev team. Figures are from my résumé; the source is private (the npm package is public).",
    link: { label: "@pncl/mario on npm", href: "https://www.npmjs.com/package/@pncl/mario" },
  },
  {
    role: "Software Engineer Intern",
    org: "Vertically Integrated Program, Stony Brook University",
    place: "Stony Brook, NY",
    dates: "August 2024 – December 2024",
    bullets: [
      "Shipped 15+ Node.js/Express REST endpoints on AWS (EC2, RDS), adding Redis caching and composite PostgreSQL indexes to cut p95 response time ~20%.",
      "Added validation, pagination and query batching to list APIs, eliminating N+1 queries and unbounded-response timeouts.",
      "Built Jest and Cypress suites into a GitHub Actions CI gate, raising backend coverage ~50% to ~90% and cutting manual QA ~30%.",
    ],
    why: "Every change had a before-and-after number. That is the habit behind tracking time saved and results.",
  },
  {
    role: "Software Engineer Intern",
    org: "99 YARDS",
    place: "New York, NY",
    dates: "June 2024 – August 2024",
    bullets: [
      "Built a TensorFlow two-tower recommender behind Node.js APIs, lifting offline hit-rate@10 ~25% over a popularity baseline.",
      "Built PostgreSQL pipelines for training and online scoring, cutting feature-freshness lag from 1 h to 5 min.",
    ],
    why: "A model only helps once it sits behind an API and runs on fresh data. Offline gains, not live results.",
  },
  {
    role: "Teaching Assistant, Java and Data Structures",
    org: "Stony Brook University",
    place: "Stony Brook, NY",
    dates: "August 2024 – May 2025",
    bullets: [
      "Led weekly recitations for 30+ students and reviewed 200+ data-structures submissions, coaching debugging and Big-O trade-offs.",
    ],
    why: "Explaining technical ideas plainly to people new to them: the skill behind demos, guides and helping teammates get better with AI.",
  },
];

export const projects = [
  {
    id: "alphabrief",
    title: "AlphaBrief",
    dates: "April 2026 – Present",
    tagline: "Ask a question about SEC 10-K filings, get a cited answer you can check against the source.",
    problem: "Filings are long and users need verifiable answers for the right company and year, not a confident summary.",
    built:
      "Full stack: a Next.js/TypeScript app (company and fiscal-year picker, numbered citations, evidence panel linking to the filing) over a Python/FastAPI retrieval pipeline (Pinecone, BM25, rank fusion, Cohere rerank) that filters by company and year before retrieval and declines when the filings don't support an answer.",
    result:
      "Live over 92 companies and 274 filings. Retrieval benchmark of 125 questions (8 companies, 2026-09-29): MRR 0.86, Recall@10 0.66, Precision@5 0.60. These are retrieval scores, not answer accuracy, and no user results are claimed.",
    why: "Evidence-backed answers over documents a team trusts (quotes, policies), with honest evaluation and a clear 'not in the documents' response.",
    image: {
      src: "/projects/alphabrief-app.png",
      alt: "AlphaBrief answering 'What were Apple's total net sales in fiscal 2025?' with a company and year picker, a cited answer, and the retrieved 10-K passage beside it.",
    },
    links: [
      { label: "Live demo", href: "https://secfrontend.vercel.app", primary: true },
      { label: "Backend source", href: "https://github.com/Rishi-creator-11/sec-rag-engine" },
      { label: "API docs", href: "https://sec-rag-engine.vercel.app/docs" },
    ],
    note: "Frontend source is private; backend source and API docs are public.",
  },
  {
    id: "trippilot",
    title: "TripPilot",
    dates: "2026",
    tagline: "An editable AI travel planner where a person approves before anything is reserved.",
    problem: "A trip mixes preferences, flights, hotels, schedules, routes and budgets, and a plan that looks right can quietly break a constraint.",
    built:
      "Next.js/FastAPI workflow that checks budget and timing in code, re-runs only the steps an edit affects, keeps revision history, re-validates offers, and requires explicit approval before sandbox reservations, with duplicate-retry protection. The LLM is optional and only interprets the request.",
    result:
      "Working prototype with a documented mock-data demo. Mock data by default; no payments, ticket issuance, refunds or cancellations; no time savings or revenue measured. Provider keys stay server-side and no card data is collected.",
    why: "Structure a request, compare options, track every change, check critical details, and keep a human decision-maker in control, with client data handled carefully.",
    image: {
      src: "/projects/trippilot-workspace.png",
      alt: "TripPilot trip workspace for a Boston to New York trip showing constraints, planning progress, revisions, selected offers and a budget, using labeled demo data.",
    },
    links: [{ label: "Source on GitHub", href: "https://github.com/Rishi-creator-11/trippilot-ai", primary: true }],
    note: "No hosted demo; the repository documents a mock-mode walkthrough.",
  },
];

export const tinkering =
  "Also tinkering: Job Scout, a private local Python/FastAPI tool that scans job listings, scores them against my résumé and drafts tailored résumés and outreach via chat commands. It never applies or messages anyone without my approval. No public code or demo.";

export const education = {
  school: "Stony Brook University",
  degree: "B.S. Computer Science, Artificial Intelligence and Data Science specialization",
  dates: "Graduated May 2026",
  extras: "GPA 3.6/4.0 · Dean's List (6 semesters) · Far Beyond and Grumman Engineering Scholarships",
};

export const skills = [
  { label: "Languages", value: "Python, TypeScript, Java, JavaScript, SQL, Go" },
  { label: "AI and LLM", value: "Claude Code, agentic AI, RAG, retrieval and extraction pipelines, LLM evaluation, Pinecone, Cohere" },
  { label: "Backend and data", value: "REST APIs, microservices, data pipelines, PostgreSQL, Redis, Supabase, WebSockets" },
  { label: "Cloud and DevOps", value: "AWS (EC2, RDS, S3), Docker, Terraform, GitHub Actions CI/CD, Vercel, Linux, Git" },
];
