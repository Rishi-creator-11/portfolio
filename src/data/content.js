// Single source of truth. Every claim traces to the résumé, a public repo, the project's own
// source/git history, or the owner's account. Résumé-reported figures are labeled as such.

export const links = {
  github: "https://github.com/Rishi-creator-11",
  linkedin: "https://www.linkedin.com/in/rishi1111",
  email: "hrishitkumar.cs@gmail.com",
  phone: "(914) 446-0465",
  phoneHref: "tel:+19144460465",
};

export const identity = {
  name: "Hrishit (Rishi) Kumar",
  where: "New York Metropolitan Area",
  edu: "B.S. Computer Science (AI & Data Science), Stony Brook University, May 2026",
};

// Tool kinds: "api" = runtime model/API integration, "dev" = development assistance, "stack" = built with.
export const featured = [
  {
    id: "alphabrief",
    kind: "Independent Project",
    dates: "April 2026 – Present",
    title: "AlphaBrief",
    headline: "Answers backed by retrievable evidence.",
    tools: [
      { kind: "api", name: "OpenAI API" },
      { kind: "api", name: "Cohere Rerank" },
      { kind: "api", name: "Pinecone" },
      { kind: "dev", name: "Claude Code" },
      { kind: "stack", name: "Python · FastAPI · Next.js" },
    ],
    image: {
      src: "/projects/alphabrief-panel.png",
      alt: "AlphaBrief evidence panel showing a retrieved 10-K passage with highlighted terms, a 'Cited in answer' tag and a link to the SEC filing.",
      caption: "The evidence panel: each answer shows the filing passage it came from.",
    },
    bullets: [
      "Integrated AI retrieval and generation into a live, citation-backed research application.",
      "Scoped evidence by company and year and exposed source passages for verification.",
      "Evaluated retrieval on 125 questions to measure quality and identify failures.",
    ],
    result: "Live over 92 companies and 274 filings · 125-question retrieval benchmark",
    details: [
      "Pipeline: OpenAI embeddings and Pinecone dense search, BM25 keyword search, Reciprocal Rank Fusion and Cohere reranking. The answer model (gpt-5-nano) sees only retrieved filing text and declines when the filings do not support an answer. Frontend: Next.js and TypeScript on Vercel; backend: Python and FastAPI.",
      "Scope filtering: company and fiscal-year filters are applied before retrieval, not after. An unsupported year returns a clear error instead of silently widening scope. Comparison questions retrieve each scope separately, then share one rerank.",
      "Ingestion and tests: resumable SEC EDGAR ingestion with index-parity checks; 362 backend tests, including structural tests for cross-year and cross-company isolation.",
      "Relevance judging: an LLM judges candidate passages without seeing retriever names, ranks or scores. The judgments are model-assisted, not human-labeled.",
      "Current benchmark (benchmark_v3_repool, run 2026-09-29): 125 questions covering 8 of the 92 companies, scored on the current corpus (92 companies, 274 filings, 45,252 chunks). MRR 0.86, Recall@10 0.66, Precision@5 0.60. These are retrieval scores, not answer accuracy.",
      "Earlier version (separate measurement: 10 companies, 31 filings, 4,262 chunks, 320 tests): MRR 0.88, Recall@10 0.70, Precision@5 0.62. The current scores are lower on a roughly 10x larger corpus.",
      "Latency (résumé-reported for the earlier version; no matching report found in the repository): median generation 7.6s to 2.0s, end-to-end p95 19.5s to 5.4s.",
      "Known limitation: same-year numeric precision for filers that restate a metric in several tables. Also produced a launch film and logo mark. No user or time-savings results are claimed.",
    ],
    links: [
      { label: "Live demo", href: "https://secfrontend.vercel.app/", primary: true },
      { label: "Backend source", href: "https://github.com/Rishi-creator-11/sec-rag-engine" },
      { label: "API docs", href: "https://sec-rag-engine.vercel.app/docs" },
    ],
    note: "Frontend source is private.",
  },
  {
    id: "jobscout",
    kind: "Personal Automation",
    title: "Job Scout",
    headline: "Research and drafts, with approval before action.",
    tools: [
      { kind: "dev", name: "ChatGPT" },
      { kind: "api", name: "OpenAI or Anthropic API (configurable)" },
      { kind: "stack", name: "Python · FastAPI · Supabase" },
    ],
    toolNote: "ChatGPT helped me build it. At runtime the app calls an LLM API; ChatGPT itself is not part of the running tool.",
    workflow: [
      { icon: "search", step: "Find", text: "Scan new listings" },
      { icon: "gauge", step: "Assess", text: "Score fit 0–100 with a reason" },
      { icon: "file", step: "Prepare", text: "Tailored résumé and outreach draft" },
      { icon: "check", step: "Review", text: "I approve or skip", gate: true },
    ],
    bullets: [
      "Built with ChatGPT as a development assistant; the running app calls an LLM API for scoring and drafting.",
      "Automated listing research, fit scoring, and tailored résumé and outreach preparation.",
      "Produced a ranked brief and reviewable drafts, with approval before external action.",
    ],
    result: "Ranked daily brief · reviewable drafts · nothing sent without my approval",
    details: [
      "Runtime integration: a wrapper supports OpenAI (gpt-4o-mini) or Anthropic (Claude Sonnet), selected by configuration. Scoring returns strict JSON with hard rules for seniority and visa fit; the tailoring prompt may reorder but never invent experience and lists gaps separately; outreach drafts end with what to personalize.",
      "Workflow: Python and FastAPI app; a scheduled scan through an Apify scraper; Supabase storage; WhatsApp or Telegram commands (tailor, skip, draft outreach); scoring that learns from skipped listings.",
      "A second, larger system I built with Claude: a job-search pipeline with Python discovery tools across multiple job sources (about 2,900 lines), a source-of-truth file for candidate facts, a deduplicating tracker and a written runbook. Its rules include no duplicate applications, no status without confirmation evidence, and never guessing legal or immigration answers. It has 74 automated tests.",
      "Scope: private, so there is no public source or demo. No success rates or time savings are claimed.",
    ],
  },
  {
    id: "trippilot",
    kind: "Independent Project",
    dates: "2026",
    title: "TripPilot",
    headline: "Travel plans that handle preferences, changes, and approval.",
    scope: "Prototype · Mock data · Sandbox reservations",
    tools: [
      { kind: "api", name: "Optional OpenAI request extractor" },
      { kind: "stack", name: "Next.js · FastAPI · PostgreSQL · Redis · Celery" },
    ],
    image: {
      src: "/projects/trippilot-workspace.png",
      alt: "TripPilot trip workspace for a Boston to New York trip showing parsed constraints, planning progress, revisions, selected offers and a budget, using labeled demo data.",
      caption: "Trip workspace with labeled mock data.",
    },
    bullets: [
      "Built an editable travel workflow with budget and timing checks.",
      "Tracked revisions and rechecked selected offers before reservation approval.",
      "Added approval gates and duplicate protection to sandbox reservations.",
    ],
    result: "Working prototype · revision history · approval and duplicate protection",
    details: [
      "Request interpretation: a deterministic parser is the default, with an optional LLM extractor behind the same interface. Budgets, timing, routes and offer validity are checked in code, not by the model.",
      "Edits re-run only the affected planning steps and record a new revision. Planning progress streams over server-sent events and is stored so a run can be replayed. Sandbox reservations use deterministic idempotency keys, so a retried approval does not create a duplicate.",
      "Stack: Next.js, FastAPI, PostgreSQL with pgvector, Redis, Celery. Regression tests cover API, web unit and Playwright flows.",
      "Scope: mock data is the default; optional adapters support search and offer re-validation for testing only. No real payments, ticket issuance, refunds or cancellations. Provider secrets stay server-side and no card data is collected. No hosted demo (the repository documents a mock-mode walkthrough), no live customers, and no measured savings.",
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/Rishi-creator-11/trippilot-ai", primary: true }],
  },
];

export const experience = {
  metroprint: {
    id: "metroprint",
    kind: "Contract employment",
    org: "MetroPrint USA",
    role: "Contract Full-Stack Engineer",
    dates: "July 2026 – September 2026",
    place: "New York, NY",
    tools: [
      { kind: "dev", name: "Claude Code" },
      { kind: "stack", name: "Next.js · TypeScript · Supabase · Stripe" },
    ],
    toolNote: "AI-assisted development only: the customer-facing product does not call an AI model.",
    bullets: [
      "Used Claude Code to deliver a production platform from a business owner's requirements.",
      "Automated ingestion of 80 products and 559 pricing rows.",
      "Validated product combinations and checkout totals across about 97 configurable products.",
    ],
    result: "Production platform · ~97 configurable products · 80 products and 559 pricing rows ingested",
    details: [
      "Pricing is built around 559 exact-combination rows, and ingestion counts were reconciled against the client's data. The server recalculates every checkout total from current database prices and discards browser-supplied amounts.",
      "Includes an admin area for prices and promotions, guest checkout with saved carts, and 26 automated test files covering pricing, discounts, tax and checkout.",
      "Client screenshots, code and further details are not published. The business's existing revenue is not attributed to this work.",
    ],
  },
  pencil: {
    id: "pencil",
    kind: "Internship",
    org: "Pencil Learning Technologies",
    role: "Software Engineer Intern",
    dates: "June 2025 – August 2025",
    place: "San Francisco, CA",
    tools: [{ kind: "stack", name: "TypeScript · React · Vite · RxJS · Yjs · GitHub Actions · Docker" }],
    bullets: [
      "Built shared synchronization used across 10+ applications.",
      "Delivered client-side features and reduced repeated integration code.",
      "Automated build, test, and publishing steps for dependable releases.",
    ],
    result: "10+ apps · update latency ~500ms → <100ms · 15% shorter releases (résumé-reported)",
    details: [
      "Shared infrastructure: Mario's synchronization layer with incremental JSON Patch diffs and Yjs CRDT merging, integrated into 10+ embedded apps. Résumé-reported results: 30% less cross-client state drift, about 1,000 lines of repeated integration code removed, 15% shorter release cycle. I also updated the shared SyncProvider (pull request 21).",
      "Client-side work, seven apps in the Mario monorepo: a configurable Word Mat (each mat is a configuration object on one shared component), a Polls rewrite from Angular to React that preserved shared-state compatibility (pull request 23, merged 2025-08-04), and the Timer, Stopwatch, Eraser, Dice and a new Box Breathing app.",
      "Apps were moved onto the shared UI library (pull request 12) and from webpack to Vite. Merged pull requests also include 14, 15, 19, 20 and 24. The company's source is private, so no code or screenshots are shown.",
    ],
    link: { label: "@pncl/mario on npm", href: "https://www.npmjs.com/package/@pncl/mario" },
  },
};

export const compactExperience = [
  {
    org: "Vertically Integrated Program, Stony Brook University",
    role: "Software Engineer Intern",
    dates: "August 2024 – December 2024",
    place: "Stony Brook, NY",
    bullets: [
      "Shipped 15+ backend endpoints and reduced p95 response time by approximately 20%.",
      "Added validation, pagination, and query batching to prevent unbounded responses and repeated queries.",
      "Increased backend test coverage from approximately 50% to 90% and reduced manual QA by approximately 30%.",
    ],
    tools: "Node.js, Express, AWS (EC2, RDS), Redis, PostgreSQL, Jest, Cypress, GitHub Actions",
  },
  {
    org: "99 YARDS",
    role: "Software Engineer Intern",
    dates: "June 2024 – August 2024",
    place: "New York, NY",
    bullets: [
      "Built a recommendation model that improved offline hit-rate@10 by approximately 25% over a popularity baseline.",
      "Reduced feature-data freshness lag from one hour to five minutes through incremental updates.",
    ],
    tools: "TensorFlow, Node.js, PostgreSQL",
    note: "The hit-rate gain is an offline evaluation result, not a measured live or revenue improvement.",
  },
];

// ---------- Capability grid (directly below hero) ----------
export const capabilityGrid = [
  { n: 1, title: "AI applications", lines: [{ text: "AlphaBrief: model/API integration, retrieval, citations, and a usable interface.", href: "#alphabrief" }] },
  { n: 2, title: "Research and drafting automation", lines: [{ text: "Job Scout: listing research, fit assessment, tailored materials, and approval before action.", href: "#jobscout" }] },
  {
    n: 3,
    title: "Evaluation",
    lines: [
      { text: "AlphaBrief: retrieval benchmark and supported relevance judging.", href: "#alphabrief" },
      { text: "99 YARDS: recommendation-model comparison against a baseline.", href: "#experience-more" },
    ],
  },
  {
    n: 4,
    title: "Reliable systems",
    inline: [
      { text: "Source scoping", href: "#alphabrief" },
      { text: "validation", href: "#metroprint" },
      { text: "offer rechecks", href: "#trippilot" },
      { text: "duplicate protection", href: "#trippilot" },
      { text: "tests", href: "#alphabrief" },
      { text: "controlled releases", href: "#pencil" },
    ],
  },
  {
    n: 5,
    title: "Production delivery",
    lines: [
      { text: "MetroPrint's production platform.", href: "#metroprint" },
      { text: "Mario's shared software and client apps.", href: "#pencil" },
    ],
  },
  {
    n: 6,
    title: "Communication and adoption",
    lines: [
      { text: "Business-owner requirements (MetroPrint).", href: "#metroprint" },
      { text: "Teaching 30+ students.", href: "#more" },
    ],
  },
];

export const toolLegend = [
  { label: "Development assistance", items: "ChatGPT (Job Scout) · Claude Code (MetroPrint, AlphaBrief)" },
  { label: "Runtime API integration", items: "OpenAI API (AlphaBrief; Job Scout, configurable) · Anthropic API (Job Scout, configurable) · Cohere, Pinecone (AlphaBrief)" },
];

// ---------- How this experience applies ----------
export const coverage = [
  {
    area: "Sales",
    done: { text: "Job Scout researches, prioritizes and drafts reviewed follow-ups; MetroPrint validated product and pricing records.", href: "#jobscout" },
    proposed: "Lead-intake summaries and quote or follow-up drafts a salesperson reviews, with CRM record checks.",
  },
  {
    area: "Operations",
    done: { text: "TripPilot structures travel requests, tracks revisions and checks completeness.", href: "#trippilot" },
    proposed: "Help advisors gather and compare operator quotes and prepare trip paperwork, with a person deciding.",
  },
  {
    area: "Marketing",
    done: { text: "Reviewed-draft workflow in Job Scout, where drafts are prepared for my review before use. No marketing campaigns completed.", href: "#jobscout" },
    proposed: "A tone guide and prompt library so drafts match the approved voice, always with human review before publishing.",
  },
  {
    area: "Client service",
    done: { text: "AlphaBrief gives evidence-backed answers and declines when sources do not support one.", href: "#alphabrief" },
    proposed: "Draft replies with sources, plus a handoff summary for the human advisor.",
  },
  {
    area: "Developer partnership",
    done: { text: "Mario: shared systems, compatible app changes, reviewed pull requests and automated releases.", href: "#pencil" },
    proposed: "Follow the team's repository practices and code review to move prototypes into production.",
  },
  {
    area: "Evaluation",
    done: { text: "125-question retrieval benchmark with failure analysis; recommendation model compared against a baseline.", href: "#alphabrief" },
    proposed: "A method to compare candidate tools on the same real tasks and report where each fails. I have not run a multi-model comparison.",
  },
  {
    area: "Training",
    done: { text: "Teaching assistant: weekly recitations for 30+ students and 200+ submissions reviewed.", href: "#more" },
    proposed: "Short demos, a how-to guide and a prompt library. No corporate training delivered yet.",
  },
  {
    area: "Staying current",
    done: { text: "Independent builds: AlphaBrief, TripPilot, Job Scout and a computer-use agent.", href: "#work" },
    proposed: "Share which new tools are worth adopting, and which are not, with evidence.",
  },
  {
    area: "Measurement",
    done: { text: "Projects report measured results such as latency, test coverage and retrieval scores. TripPilot and Job Scout have no measured savings.", href: "#experience" },
    proposed: "Track time saved and correction rates per workflow, and iterate on feedback.",
  },
  {
    area: "Data responsibility",
    done: { text: "TripPilot keeps provider secrets server-side, collects no card data and gates actions on approval; AlphaBrief enforces source scope; Job Scout runs locally and privately.", href: "#trippilot" },
    proposed: "Follow the company's privacy and security practices and keep client data out of unapproved tools.",
  },
];

// ---------- More work ----------
export const more = [
  {
    kind: "Independent Project · public source",
    title: "Computer-use automation system",
    text: "An LLM agent learns a task in a legacy web UI, saves it as a typed capability, and a deterministic replay engine reruns it with no LLM, escalating to a human when stuck. The Anthropic API decider is implemented; recorded runs were driven through a Claude Code session, as the README states.",
    link: { label: "Source on GitHub", href: "https://github.com/Rishi-creator-11/interface-ai-computer-use-assignment" },
  },
  {
    kind: "Independent Project · September 2025 – December 2025",
    title: "Distributed Systems Platform",
    text: "Built a Go chat system across three application instances, supporting 100 connections per room, with Redis and Kafka coordinating updates and buffering traffic, deployed to AWS with automated delivery. Résumé-reported; no repository or benchmark found to link.",
  },
  {
    kind: "Teaching · August 2024 – May 2025",
    title: "Teaching Assistant | Java and Data Structures",
    text: "Stony Brook University. Led weekly recitations for 30+ students and reviewed 200+ submissions, coaching debugging and problem-solving.",
  },
];

export const highlights = [
  { label: "AI-assisted development", value: "ChatGPT, Claude Code" },
  { label: "AI applications", value: "RAG, prompt engineering, retrieval/extraction, evaluation" },
  { label: "Integration and delivery", value: "REST APIs, data pipelines, GitHub Actions, Docker" },
  { label: "Model and data services used", value: "OpenAI API, Anthropic API, Pinecone, Cohere, Apify" },
];

export const skills = [
  { label: "Languages", value: "Python, TypeScript, Java, JavaScript, SQL, Go" },
  { label: "Backend and data", value: "REST APIs, microservices, distributed systems, data pipelines, PostgreSQL, Redis, Supabase, WebSockets" },
  { label: "AI and LLM", value: "Claude Code, agentic AI, RAG, retrieval and extraction pipelines, LLM evaluation, Pinecone, Cohere" },
  { label: "Cloud and DevOps", value: "AWS (EC2, RDS, S3), Docker, Terraform, GitHub Actions CI/CD, Vercel, Linux, Git" },
];

export const education = {
  school: "Stony Brook University",
  degree: "B.S. in Computer Science",
  specialization: "Specialization in Artificial Intelligence & Data Science",
  dates: "Graduated May 2026",
  extras: ["GPA: 3.6/4.0", "Dean's List, six semesters", "Far Beyond Scholarship", "Grumman Engineering Scholarship Endowment"],
};
