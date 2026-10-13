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
export const aiTools = [
  { name: "ChatGPT", use: "development assistance for Job Scout" },
  { name: "Claude Code", use: "AI-assisted product development" },
  { name: "OpenAI API", use: "implemented model integrations" },
  { name: "Anthropic API", use: "implemented integrations; configurable in Job Scout, and the computer-use agent's decider (recorded runs used Claude Code)" },
  { name: "Pinecone and Cohere", use: "AlphaBrief retrieval and reranking" },
];
export const toEvaluate = "Grok Bot · Gemini · Zapier · Make · n8n";

export const featured = [
  {
    id: "alphabrief",
    kind: "Independent Project",
    dates: "April 2026 – Present",
    title: "AlphaBrief",
    sentence: "AI research with answers users can verify.",
    bullets: [
      "Built and deployed a complete application for asking questions across company filings.",
      "Integrated OpenAI, Pinecone, and Cohere to retrieve relevant evidence and generate cited answers.",
      "Added company/year controls, source inspection, and a 125-question evaluation benchmark.",
    ],
    outcome: "A live research product covering 92 companies and 274 filings, with evidence users can inspect.",
    tools: ["OpenAI API", "RAG", "Pinecone", "Cohere", "Python", "FastAPI", "Next.js"],
    image: {
      src: "/projects/alphabrief-panel.png",
      alt: "AlphaBrief evidence panel showing a retrieved 10-K passage with highlighted terms, a 'Cited in answer' tag and a link to the SEC filing.",
    },
    details: [
      "Pipeline: OpenAI embeddings and Pinecone dense search, BM25 keyword search, Reciprocal Rank Fusion and Cohere reranking. The answer model (gpt-5-nano) sees only retrieved filing text and declines when the filings do not support an answer. Frontend: Next.js and TypeScript on Vercel; backend: Python and FastAPI.",
      "Scope filtering: company and fiscal-year filters are applied before retrieval, not after. An unsupported year returns a clear error instead of silently widening scope. Comparison questions retrieve each scope separately, then share one rerank.",
      "Ingestion and tests: resumable SEC EDGAR ingestion with index-parity checks; 362 backend tests, including structural tests for cross-year and cross-company isolation.",
      "Evaluation: benchmark_v3_repool, run 2026-09-29. 125 questions covering 8 of the 92 companies, scored on the current corpus (92 companies, 274 filings, 45,252 chunks). MRR 0.86, Recall@10 0.66, Precision@5 0.60. Relevance judgments are LLM-assisted, and these are retrieval scores, not answer accuracy.",
    ],
    links: [
      { label: "Live demo", href: "https://secfrontend.vercel.app/", primary: true },
      { label: "Source", href: "https://github.com/Rishi-creator-11/sec-rag-engine" },
      { label: "API docs", href: "https://sec-rag-engine.vercel.app/docs" },
    ],
  },
  {
    id: "jobscout",
    kind: "Personal Automation",
    title: "Job Scout",
    sentence: "From job research to personalized drafts.",
    bullets: [
      "Used ChatGPT to build a tool that collects listings and prioritizes relevant opportunities.",
      "Added model-based fit assessment and tailored resume/outreach drafting.",
      "Connected the workflow to chat commands, with approval before external action.",
    ],
    outcome: "A ranked brief and prepared drafts in one workflow.",
    tools: ["ChatGPT (development)", "OpenAI API (default runtime)", "Anthropic API (selectable)", "Apify", "Supabase", "WhatsApp / Telegram", "Python", "FastAPI"],
    workflow: [
      { icon: "search", step: "Collect", text: "Scan new listings" },
      { icon: "gauge", step: "Assess", text: "Score fit with a reason" },
      { icon: "file", step: "Draft", text: "Tailored resume and outreach" },
      { icon: "check", step: "Approve", text: "Chat commands; nothing sent without approval", gate: true },
    ],
    details: [
      "Runtime integration: a wrapper calls OpenAI (gpt-4o-mini, the default) or Anthropic (Claude Sonnet), selected by configuration. Scoring returns strict JSON with hard rules for seniority and visa fit; the tailoring prompt may reorder but never invent experience and lists gaps separately; outreach drafts end with what to personalize.",
      "Workflow: Python and FastAPI app; a scheduled scan through an Apify scraper; Supabase storage; WhatsApp or Telegram commands (tailor, skip, draft outreach); scoring that learns from skipped listings.",
      "A larger sibling system built with Claude: a job-search pipeline with Python discovery tools across multiple job sources (about 2,900 lines), a candidate source-of-truth file, a deduplicating tracker and 74 automated tests.",
    ],
  },
  {
    id: "computer-use",
    kind: "Independent Project",
    title: "Computer-Use Automation",
    sentence: "Repeatable automation for existing web interfaces.",
    bullets: [
      "Built a system that learns a task in a web interface and saves the steps as a reusable capability.",
      "Added deterministic replay so learned tasks can run without another model decision at every step.",
      "Included escalation to a person when execution cannot proceed.",
    ],
    outcome: "A reusable approach to automating interface-based work with a defined fallback.",
    tools: ["Anthropic API (decider)", "Playwright", "Python", "Pydantic", "Flask (test target app)"],
    workflow: [
      { icon: "search", step: "Learn", text: "An LLM explores the web UI" },
      { icon: "file", step: "Save", text: "Steps stored as a typed capability" },
      { icon: "gauge", step: "Replay", text: "Deterministic run, no model call" },
      { icon: "check", step: "Escalate", text: "A person takes over when stuck", gate: true },
    ],
    details: [
      "Architecture: a discovery agent drives a browser through Playwright, one decision per step, and records a typed capability artifact with a full evidence trail. A separate replay engine re-runs the artifact from input parameters with no model involved, and guardrails stop unsafe actions.",
      "Model integration: the Anthropic API decider is implemented. The recorded discovery runs in the repository were driven through a Claude Code session using a file-relay decider, as the README describes.",
      "Built as a take-home against a local legacy-style banking console. No production customer adoption or measured savings.",
    ],
    links: [{ label: "Source", href: "https://github.com/Rishi-creator-11/interface-ai-computer-use-assignment", primary: true }],
  },
  {
    id: "trippilot",
    kind: "Independent Project",
    dates: "2026",
    title: "TripPilot",
    sentence: "Travel planning that handles constraints and changes.",
    label: "Demo data · Sandbox reservations",
    bullets: [
      "Built a travel application that turns requests into editable itineraries.",
      "Added budget/timing checks, revision history, and selective updates when preferences change.",
      "Rechecked offers and controlled sandbox reservations through approval and duplicate protection.",
    ],
    outcome: "A deployed travel-planning application with checked plans and traceable revisions.",
    tools: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Celery", "Optional LLM request extractor (OpenAI)"],
    image: {
      src: "/projects/trippilot-workspace.png",
      alt: "TripPilot trip workspace for a Boston to New York trip showing parsed constraints, planning progress, revisions, selected offers and a budget, using labeled demo data.",
    },
    details: [
      "Request interpretation: a deterministic parser is the default, with an optional LLM extractor behind the same interface. Budgets, timing, routes and offer validity are checked in code, not by the model.",
      "Edits re-run only the affected planning steps and record a new revision. Planning progress streams over server-sent events and is stored so a run can be replayed. Sandbox reservations use deterministic idempotency keys, so a retried approval does not create a duplicate.",
      "No real payments, ticket issuance, refunds or cancellations. Provider secrets stay server-side and no card data is collected.",
    ],
    links: [{ label: "Source", href: "https://github.com/Rishi-creator-11/trippilot-ai", primary: true }],
  },
];

export const experience = [
  {
    id: "metroprint",
    org: "MetroPrint USA",
    role: "Contract Full-Stack Engineer",
    dates: "July 2026 – September 2026",
    place: "New York, NY",
    sentence: "Built a production ordering platform and an admin workspace for managing products, pricing, orders, and customer inquiries.",
    bullets: [
      "Translated the owner's requirements into customer-facing and internal business tools.",
      "Automated product/pricing ingestion and added configuration and checkout validation.",
      "Built admin controls for the operational functions confirmed in the implementation.",
    ],
    outcome: "A deployed ordering platform with structured product data and validated pricing: about 97 configurable products, with 80 products and 559 pricing rows ingested.",
    relevance: "Experience building the internal interfaces and accurate records that sales and operations teams rely on.",
    tools: ["Claude Code", "Next.js", "TypeScript", "Supabase"],
    image: {
      src: "/projects/metroprint-storefront.png",
      alt: "The MetroPrint Marketing storefront home page with a promotional carousel, product categories and a 'Shop products' button.",
    },
    admin: [
      "Orders and inquiries dashboard: filter by type and status, update status (the customer is emailed), and keep internal notes.",
      "Price editor: set per-option prices that update storefront prices and checkout totals.",
      "Promotional banners with Live, Draft and Scheduled status.",
      "Discount, shipping and tax settings, plus customer records.",
    ],
    details: [
      "Used Claude Code to implement the platform. Pricing is built around 559 exact-combination rows, ingestion counts were reconciled against the client's data, and the server recalculates every checkout total from current database prices.",
      "Also includes Stripe checkout, guest checkout with saved carts, role-gated admin access and 26 automated test files covering pricing, discounts, tax and checkout.",
    ],
    links: [{ label: "Live site", href: "https://www.metroprintmkt.com/", primary: true }],
  },
  {
    id: "pencil",
    org: "Pencil Learning Technologies",
    role: "Software Engineer Intern",
    dates: "June 2025 – August 2025",
    place: "San Francisco, CA",
    sentence: "Shared infrastructure and the applications built on it.",
    bullets: [
      "Built Mario synchronization infrastructure and integrated it into 10+ collaborative apps.",
      "Delivered client-side work including configurable Word Mat layouts and the Angular-to-React Polls rewrite.",
      "Automated builds, tests, and publishing to support consistent releases.",
    ],
    outcome: "Faster shared updates, less repeated integration code, and a 15% shorter release cycle.",
    tools: ["TypeScript", "React", "RxJS", "WebSockets", "Yjs", "GitHub Actions", "Docker"],
    details: [
      "Résumé-reported: update latency from about 500ms to under 100ms with incremental JSON Patch diffs; conflict-free merging with Yjs CRDTs; 30% less cross-client state drift; about 1,000 lines of repeated per-app integration code removed.",
      "Client apps in the Mario monorepo: Word Mat / Blending Board (each mat is a configuration object on one shared component), Polls (rewritten from Angular to React, pull request 23), Timer, Stopwatch, Eraser, Dice and a new Box Breathing app. Also moved apps onto the shared UI library and from webpack to Vite, and updated the shared SyncProvider (pull request 21). Also contributed to the coding and compiler-related features in the collaborative apps.",
      "Worked with the product manager on requirements and sprint priorities, tracking work in Jira.",
    ],
    link: { label: "@pncl/mario on npm", href: "https://www.npmjs.com/package/@pncl/mario" },
  },
];

export const otherExperience = [
  {
    org: "Vertically Integrated Program, Stony Brook University",
    role: "Software Engineer Intern",
    dates: "August 2024 – December 2024",
    place: "Stony Brook, NY",
    sentence: "Backend validation and API reliability.",
    result: "Test coverage approximately 50% to 90%, with approximately 30% less manual QA.",
  },
  {
    org: "99 YARDS",
    role: "Software Engineer Intern",
    dates: "June 2024 – August 2024",
    place: "New York, NY",
    sentence: "Recommendation-model evaluation against a popularity baseline.",
    result: "Approximately 25% improvement in offline hit-rate@10; feature freshness improved from one hour to five minutes.",
  },
];

export const supporting = {
  kind: "Supporting Independent Project · September 2025 – December 2025",
  title: "Distributed Systems Platform",
  text: "Built a Go chat system across three application instances, supporting 100 connections per room, with Redis and Kafka coordinating updates and buffering message traffic, deployed to AWS with automated delivery.",
};

export const flygreen = {
  title: "What I would bring to Flygreen",
  items: [
    { label: "AI workflows", text: "Experience connecting models, data, interfaces, and review steps into usable applications." },
    { label: "Evaluation and reliability", text: "Benchmarks, source checks, validation, tests, and controlled actions—not just a successful demo." },
    { label: "Business and developer collaboration", text: "Experience translating user requirements and delivering within shared engineering systems." },
    { label: "Team adoption", text: "Teaching experience and a practical approach to demos, guides, and feedback." },
  ],
  closing: "At Flygreen, I would apply this experience to inquiry preparation, quote/document processing, reviewed drafts, and advisor workflows after learning what JETPRO and the team already handle.",
};

export const teaching = {
  title: "Teaching Assistant | Java and Data Structures",
  org: "Stony Brook University",
  dates: "August 2024 – May 2025",
  text: "Led weekly recitations for 30+ students and reviewed 200+ submissions, coaching debugging and problem-solving.",
};

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
