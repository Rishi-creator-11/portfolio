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

// ---------- Featured independent work ----------
export const featured = [
  {
    id: "alphabrief",
    kind: "Independent Project",
    dates: "April 2026 – Present",
    title: "AlphaBrief",
    headline: "Answers backed by retrievable evidence.",
    image: {
      src: "/projects/alphabrief-evidence.png",
      alt: "AlphaBrief showing an answer with a citation marker beside an evidence panel that quotes the retrieved 10-K passage and links to the SEC filing.",
      caption: "Live app: every answer is paired with the filing passage behind it.",
    },
    points: [
      { label: "AI used", text: "Retrieval-augmented generation over SEC 10-K filings: OpenAI embeddings and Pinecone, BM25 keyword search, rank fusion and Cohere reranking. The answer model sees only retrieved text and declines when the filings don't support an answer." },
      { label: "What I built", text: "The full app: company and fiscal-year scope controls, numbered citations, an evidence panel that links to the SEC filing, and an evaluation set with LLM-assisted relevance judging." },
      { label: "Result", text: "Users can inspect the source passages behind an answer. Live over 92 companies and 274 filings; retrieval benchmarked on 125 questions." },
    ],
    tools: [
      { label: "Models and APIs", items: ["OpenAI (embeddings, answers, relevance judging)", "Cohere Rerank", "Pinecone"] },
      { label: "Built with", items: ["Python", "FastAPI", "Next.js", "TypeScript", "BM25"] },
      { label: "AI-assisted development", items: ["Claude Code"] },
    ],
    details: [
      "Scope filtering: company and fiscal-year filters are applied before retrieval, not after. An unsupported year returns a clear error instead of silently widening scope. Comparison questions retrieve each scope separately, then share one rerank.",
      "Ingestion and tests: resumable SEC EDGAR ingestion with index-parity checks; 362 backend tests, including structural tests for cross-year and cross-company isolation.",
      "Evaluation: relevance judgments are produced by an LLM that sees each question and its pooled candidates without retriever names, ranks or scores; they are model-assisted, not human-labeled.",
      "Current benchmark (benchmark_v3_repool, run 2026-09-29): 125 questions covering 8 of the 92 companies, scored on the current corpus (92 companies, 274 filings, 45,252 chunks). MRR 0.86, Recall@10 0.66, Precision@5 0.60. These are retrieval scores, not answer accuracy.",
      "Earlier version (separate measurement: 10 companies, 31 filings, 4,262 chunks, 320 tests): MRR 0.88, Recall@10 0.70, Precision@5 0.62. The current scores are lower on a roughly 10x larger corpus.",
      "Latency (résumé-reported for the earlier version; no matching report found in the repository): median generation 7.6s to 2.0s, end-to-end p95 19.5s to 5.4s.",
      "Also produced a launch film and logo mark for the product. Known limitation: same-year numeric precision for filers that restate a metric in several tables. No user or time-savings results are claimed.",
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
    headline: "Research and personalized drafts, with approval before action.",
    workflow: [
      { icon: "search", step: "Find", text: "A scheduled scan collects new listings through an Apify scraper." },
      { icon: "gauge", step: "Assess", text: "An LLM scores each listing 0–100 against my résumé and preferences, with a one-line reason." },
      { icon: "file", step: "Prepare", text: "It drafts a tailored résumé and outreach message. Rules forbid inventing experience, and gaps are listed." },
      { icon: "check", step: "Review", text: "I approve or skip from chat. Nothing is submitted or sent automatically.", gate: true },
    ],
    points: [
      { label: "AI used", text: "LLM scoring with hard rules (seniority, visa fit), résumé tailoring that may reorder but never invent, and outreach drafting. The wrapper supports OpenAI (gpt-4o-mini) or Anthropic (Claude Sonnet)." },
      { label: "What I built", text: "A local Python and FastAPI app with Supabase storage, WhatsApp or Telegram commands (tailor, skip, draft outreach), and scoring that learns from the listings I skip." },
      { label: "Result", text: "A ranked daily brief with reviewed drafts ready to use. Private tool: no success rates or time savings are claimed." },
    ],
    tools: [
      { label: "Models and APIs", items: ["OpenAI or Anthropic Claude (configurable)", "Apify", "WhatsApp / Telegram"] },
      { label: "Built with", items: ["Python", "FastAPI", "Supabase"] },
    ],
    details: [
      "Prompts: the scoring prompt returns strict JSON and is told never to inflate scores; the tailoring prompt separates changes from gaps; outreach drafts end with what to personalize before sending.",
      "A second, larger system I built with Claude: a job-search pipeline with Python discovery tools across multiple job sources (about 2,900 lines), a source-of-truth file for candidate facts, a deduplicating tracker and a written runbook. Its rules include no duplicate applications, no status without confirmation evidence, and never guessing legal or immigration answers, with unclear items escalated to me. It has 74 automated tests.",
      "Scope: private, so there is no public source or demo.",
    ],
  },
  {
    id: "trippilot",
    kind: "Independent Project",
    dates: "2026",
    title: "TripPilot",
    headline: "Travel plans that handle preferences, changes, and approval.",
    scope: "Prototype · Mock data · Sandbox reservations",
    image: {
      src: "/projects/trippilot-workspace.png",
      alt: "TripPilot trip workspace for a Boston to New York trip showing parsed constraints, planning progress, revisions, selected offers and a budget, using labeled demo data.",
      caption: "Trip workspace with labeled mock data.",
    },
    points: [
      { label: "AI used", text: "A request interpreter turns free text into structured constraints. A deterministic parser is the default and an optional LLM extractor sits behind the same interface. Budgets, timing and offer validity are checked in code, not by the model." },
      { label: "What I built", text: "An editable itinerary workflow: edits re-run only the affected steps and keep a revision history, offers are re-checked, and sandbox reservations need explicit approval with duplicate-retry protection." },
      { label: "Result", text: "A working prototype with a documented mock-data demo and visible planning progress. No savings or revenue have been measured." },
    ],
    tools: [
      { label: "Models and APIs", items: ["Optional OpenAI request extractor", "Open-Meteo", "Optional search adapters (test only)"] },
      { label: "Built with", items: ["Next.js", "FastAPI", "PostgreSQL + pgvector", "Redis", "Celery"] },
    ],
    details: [
      "Planning progress streams over server-sent events and is stored so a run can be replayed. Sandbox reservations use deterministic idempotency keys, so a retried approval does not create a duplicate.",
      "Regression tests cover API, web unit and Playwright flows for planning, selective reuse, revisions, provider safety and approval boundaries.",
      "Scope: mock data is the default; optional adapters support search and offer re-validation for testing only. No real payments, ticket issuance, refunds or cancellations. Provider secrets stay server-side and no card data is collected. No hosted demo (the repository documents a mock-mode walkthrough), no live customers.",
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/Rishi-creator-11/trippilot-ai", primary: true }],
  },
];

// ---------- Professional experience ----------
export const experience = {
  metroprint: {
    id: "metroprint",
    kind: "Contract employment",
    org: "MetroPrint USA",
    role: "Contract Full-Stack Engineer",
    dates: "July 2026 – September 2026",
    place: "New York, NY",
    headline: "An owner's requirements, turned into a production ordering platform.",
    stats: [
      { value: "~97", label: "configurable products supported" },
      { value: "80 + 559", label: "products and pricing rows ingested" },
    ],
    points: [
      { label: "AI used", text: "Built with Claude Code (AI-assisted development). The customer-facing product does not itself call an AI model." },
      { label: "What I built", text: "Translated the owner's workflow into a Next.js and TypeScript platform on Supabase. Automated ingestion of 80 products and 559 pricing rows, reconciling records against source data." },
      { label: "Result", text: "Added validation to block invalid configurations and prevent inconsistent checkout totals, so the owner manages every product and price in one place." },
    ],
    tools: [
      { label: "AI-assisted development", items: ["Claude Code"] },
      { label: "Built with", items: ["Next.js", "TypeScript", "Supabase", "Stripe"] },
    ],
    details: [
      "Pricing is built around 559 exact-combination rows. The server recalculates every checkout total from current database prices and discards browser-supplied amounts.",
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
    headline: "Shared software and the apps built on it, for collaborative classrooms.",
    stats: [
      { value: "~500ms → <100ms", label: "update latency" },
      { value: "10+", label: "apps integrated" },
      { value: "30%", label: "less state drift" },
      { value: "1,000", label: "lines of repeated code removed" },
    ],
    statNote: "Figures are résumé-reported.",
    apps: ["Word Mat / Blending Board", "Polls", "Timer", "Stopwatch", "Eraser", "Dice", "Box Breathing"],
    points: [
      { label: "Shared infrastructure", text: "Built Mario's shared synchronization infrastructure and integrated the SDK into 10+ apps, with more consistent updates and less repeated integration code." },
      { label: "Client-side apps", text: "Worked on seven apps in the Mario monorepo: a configurable Word Mat on shared components, a Polls rewrite from Angular to React that preserved shared-state compatibility, and the Timer, Stopwatch, Eraser, Dice and a new Box Breathing app." },
      { label: "Delivery", text: "Automated build, test and publishing steps, shortening the release cycle by 15%." },
    ],
    tools: [{ label: "Built with", items: ["TypeScript", "React", "Vite", "RxJS", "WebSockets", "Yjs", "GitHub Actions", "Docker"] }],
    details: [
      "Sync layer: incremental JSON Patch diffs, conflict-free merging with Yjs CRDTs, and an update to the shared SyncProvider (pull request 21). Apps were moved onto the shared UI library (pull request 12) and from webpack to Vite.",
      "Word Mat: each mat is a configuration object passed to one shared component, so a new mat needs no change to shared board logic.",
      "Merged pull requests in the company's private repository include 12, 14, 15, 19, 20, 21, 23 (Polls, merged 2025-08-04) and 24. The source is private, so no code or screenshots are shown.",
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

// ---------- Capabilities (completed work) ----------
export const capabilities = [
  { title: "Build AI applications", text: "Shipped a live retrieval app whose answers trace to source passages.", evidence: [{ label: "AlphaBrief", href: "#alphabrief" }] },
  { title: "Automate research and drafting", text: "Built tools that score, research and draft, with approval before anything goes out.", evidence: [{ label: "Job Scout", href: "#jobscout" }, { label: "Computer-use agent", href: "#more" }] },
  { title: "Coordinate travel workflows", text: "Structured requests, checked constraints, tracked revisions and required approval, with secrets kept server-side and no card data collected.", evidence: [{ label: "TripPilot", href: "#trippilot" }] },
  { title: "Integrate and ship with developers", text: "Delivered apps and shared sync code in a team monorepo through reviewed pull requests and automated releases.", evidence: [{ label: "Mario at Pencil", href: "#pencil" }] },
  { title: "Translate business needs into software", text: "Turned an owner's workflow into a production platform with automated data ingestion and validated pricing.", evidence: [{ label: "MetroPrint", href: "#metroprint" }] },
  { title: "Evaluate and explain tools", text: "Benchmarked retrieval on 125 questions, reported offline results as offline, and led recitations for 30+ students.", evidence: [{ label: "AlphaBrief", href: "#alphabrief" }, { label: "99 YARDS", href: "#experience-more" }, { label: "Teaching", href: "#more" }] },
];

export const opportunities = {
  title: "Aviation opportunities I would explore",
  note: "Not built. I would start by learning how the team works today, and decisions stay with aviation professionals.",
  items: [
    "Inquiry-to-trip-brief drafts that list missing details",
    "Operator quote extraction with cited comparisons",
    "Assistance limited to approved policies and documents",
    "Current trip summaries and advisor handoffs",
  ],
};

// ---------- More work ----------
export const more = [
  {
    kind: "Independent Project · public source",
    title: "Computer-use automation system",
    text: "An LLM agent learns how to complete a task in a legacy web UI with no API and saves it as a typed, reusable capability. A deterministic replay engine then runs it with no LLM, and stuck cases escalate to a human operator. The Anthropic API decider is implemented; the recorded runs were driven through a Claude Code session, as the README states.",
    tools: "Python, Playwright, Anthropic API",
    link: { label: "Source on GitHub", href: "https://github.com/Rishi-creator-11/interface-ai-computer-use-assignment" },
  },
  {
    kind: "Independent Project · September 2025 – December 2025",
    title: "Distributed Systems Platform",
    text: "Built a Go chat system across three application instances, supporting 100 connections per room, with Redis and Kafka coordinating updates and buffering traffic, deployed as a containerized stack to AWS with automated delivery.",
    tools: "Go, Redis, Kafka, Docker, AWS, Terraform, GitHub Actions",
    detail: "Résumé-reported, including Kafka buffering up to 10,000 messages per second. No repository or benchmark report found to link.",
  },
  {
    kind: "Teaching · August 2024 – May 2025",
    title: "Teaching Assistant | Java and Data Structures",
    text: "Stony Brook University. Led weekly recitations for 30+ students and reviewed 200+ submissions, coaching debugging and problem-solving, the same habit of explaining clearly I would bring to demos and teammate support.",
  },
];

export const highlights = [
  { label: "AI-assisted development", value: "Claude Code" },
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
