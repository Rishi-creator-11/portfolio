// Single source of truth. Claims trace to the résumé, public repos, or the owner's own account.

export const links = {
  github: "https://github.com/Rishi-creator-11",
  linkedin: "https://www.linkedin.com/in/rishi1111",
  email: "hrishitkumar.cs@gmail.com",
  phone: "(914) 446-0465",
  phoneHref: "tel:+19144460465",
};

export const projects = [
  {
    id: "alphabrief",
    title: "AlphaBrief",
    label: "Independent Project",
    dates: "April 2026 – Present",
    summary: "Citation-backed research across company filings.",
    bullets: [
      "Built an application that answers filing questions with citations and a supporting evidence panel.",
      "Added company and year controls to keep retrieved information relevant to the request.",
      "Evaluated retrieval on a 125-question benchmark to identify strengths and failure cases.",
    ],
    relevance:
      "Experience building verifiable AI assistance and evaluating its outputs—the foundation for working with approved quotes, policies, and operational documents.",
    image: {
      src: "/projects/alphabrief-app.png",
      alt: "AlphaBrief answering a question about Apple's fiscal 2025 net sales, with a company and year picker, a cited answer, and the retrieved 10-K passage beside it.",
      caption: "Live app: scoped question, cited answer.",
    },
    details: [
      "Pipeline: Next.js/TypeScript frontend (Vercel) over a Python/FastAPI backend. Retrieval combines Pinecone dense search (OpenAI embeddings), BM25 keyword search, Reciprocal Rank Fusion and Cohere reranking. Answers are generated only from retrieved filing text, and the system declines when the filings do not support an answer.",
      "Scope filtering: company and fiscal-year filters are applied before retrieval, not after. An unsupported year returns a clear error instead of silently widening scope. Comparison questions retrieve each scope separately before one shared rerank.",
      "Ingestion and tests: a resumable SEC EDGAR ingestion pipeline with index-parity checks; 362 backend tests, including structural tests for cross-year and cross-company isolation.",
      "Current benchmark (benchmark_v3_repool, run 2026-09-29): 125 questions covering 8 of the 92 companies, scored against the current corpus of 92 companies, 274 filings and 45,252 chunks. MRR 0.86, Recall@10 0.66, Precision@5 0.60. Relevance judgments are model-assisted, and these are retrieval scores, not answer accuracy.",
      "Earlier version (separate measurement, 10 companies, 31 filings, 4,262 chunks, 320 tests): MRR 0.88, Recall@10 0.70, Precision@5 0.62. The lower current scores follow a roughly 10x larger corpus.",
      "Latency (résumé-reported for the earlier version; no matching report found in the repository): median generation 7.6s to 2.0s, end-to-end p95 19.5s to 5.4s.",
      "Known limitation: same-year numeric precision for filers that restate a metric in several tables. No user or time-savings results are claimed.",
    ],
    links: [
      { label: "Live demo", href: "https://secfrontend.vercel.app/", primary: true },
      { label: "Backend source", href: "https://github.com/Rishi-creator-11/sec-rag-engine" },
      { label: "API docs", href: "https://sec-rag-engine.vercel.app/docs" },
    ],
    note: "Frontend source is private.",
  },
  {
    id: "trippilot",
    title: "TripPilot",
    label: "Independent Project",
    dates: "2026",
    summary: "Travel planning with checked constraints and human approval.",
    scope: "Prototype · Mock-data demo · Sandbox reservations",
    bullets: [
      "Built an editable itinerary workflow that checks budgets and timing.",
      "Preserved revision history and updated affected planning steps when requests changed.",
      "Rechecked offers and required approval before sandbox reservations, with duplicate-retry protection.",
    ],
    relevance: "Experience organizing travel requests, handling changes, and controlling actions that require review.",
    image: {
      src: "/projects/trippilot-workspace.png",
      alt: "TripPilot trip workspace for a Boston to New York trip showing constraints, planning progress, revisions, selected offers and a budget, using labeled demo data.",
      caption: "Trip workspace with labeled mock data.",
    },
    details: [
      "Stack: Next.js and TypeScript web app; FastAPI backend; PostgreSQL with pgvector for persistence; Redis; Celery workers. Planning progress streams over server-sent events and is stored so a run can be replayed.",
      "Selective edits: a change re-runs only the planning steps it affects and records a new revision.",
      "Validation and approval: budget, timing and offer validity are checked in code. The LLM is optional and only interprets the request. Sandbox reservations require explicit approval and use deterministic idempotency keys so a retry does not create a duplicate.",
      "Provider adapters: mock data is the default. Optional adapters support search and offer re-validation for testing only; provider secrets stay server-side.",
      "Scope: no real payments, production ticket issuance, refunds or cancellations. No hosted demo (the repository documents a mock-mode walkthrough), no live customers, and no measured savings or revenue.",
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/Rishi-creator-11/trippilot-ai", primary: true }],
  },
  {
    id: "distributed",
    title: "Distributed Systems Platform",
    label: "Independent Project",
    dates: "September 2025 – December 2025",
    summary: "Real-time communication across multiple application instances.",
    bullets: [
      "Built a Go chat system across three application instances, supporting 100 connections per room.",
      "Used Redis and Kafka to coordinate updates and buffer message traffic.",
      "Deployed the containerized stack to AWS with automated delivery.",
    ],
    relevance: "Experience integrating services and maintaining reliable information flow across connected applications.",
    details: [
      "Résumé-reported architecture: Go (Fiber) chat servers on three instances using WebSockets, with Redis pub/sub to fan messages out between instances and Kafka buffering up to 10,000 messages per second.",
      "Infrastructure: Docker, deployed on AWS (EC2, S3) with Terraform and GitHub Actions CI/CD, behind a TLS-terminated Nginx proxy.",
      "Measurement scope: the 100 connections per room and 10,000 messages per second figures come from my résumé; I have not located a repository or benchmark report to link, so no source link is provided.",
    ],
  },
  {
    id: "jobscout",
    title: "Job Scout",
    label: "Personal Automation",
    summary: "Research and drafting with approval before action.",
    bullets: [
      "Built a local tool that scans job listings and scores them against my resume.",
      "Generates tailored resume and outreach drafts through chat commands.",
      "Requires my approval before submitting applications or sending messages.",
    ],
    relevance: "A transferable workflow for research, prioritization, and reviewed follow-up drafting.",
    details: [
      "Implementation: local Python and FastAPI app; job listings come from an Apify scraper, scoring and drafting use an LLM API, results are stored in Supabase, and commands arrive over WhatsApp or Telegram (for example 'tailor 1', 'skip 2', 'draft outreach 1').",
      "Scope: a private tool, so there is no public source or demo. No success rates or time savings are claimed.",
    ],
  },
];

export const experience = [
  {
    org: "MetroPrint USA",
    role: "Contract Full-Stack Engineer",
    dates: "July 2026 – September 2026",
    place: "New York, NY",
    bullets: [
      "Translated an owner's workflow into a production platform supporting approximately 97 configurable products.",
      "Automated ingestion of 80 products and 559 pricing rows, reconciling records against source data.",
      "Added validation to block invalid configurations and prevent inconsistent checkout totals.",
    ],
    connection: "Business discovery, repetitive-work automation, and accurate records.",
    tools: "Claude Code, Next.js, TypeScript, Supabase.",
    details: [
      "Pricing is built around 559 exact-combination rows, and ingestion counts were reconciled against the client's data.",
      "Built with Claude Code and AI-assisted development. The customer-facing product does not itself call an LLM.",
      "Client screenshots, code and further details are not published. The business's existing revenue is not attributed to this work.",
    ],
  },
  {
    org: "Pencil Learning Technologies",
    role: "Software Engineer Intern",
    dates: "June 2025 – August 2025",
    place: "San Francisco, CA",
    bullets: [
      "Built Mario's shared synchronization infrastructure, reducing update latency from approximately 500ms to under 100ms.",
      "Integrated the SDK into 10+ apps, reducing state drift by 30% and removing 1,000 lines of repeated integration code.",
      "Built client-side features, including a configurable Word Mat and a Polls rewrite that preserved shared-state compatibility.",
      "Automated build, test, and publishing steps, shortening the release cycle by 15%.",
    ],
    connection: "Developer collaboration, usable application features, and dependable production integration.",
    tools: "TypeScript, RxJS, WebSockets, Yjs, GitHub Actions, Docker.",
    details: [
      "Sync infrastructure: incremental JSON Patch diffs, and conflict-free merge logic using Yjs CRDTs so concurrent updates are not lost and state stays consistent after a reconnect.",
      "Word Mat (blending board): configuration-driven layouts on shared components, so new mats need no change to shared board logic.",
      "Polls: rewritten from Angular to React and Vite, keeping the existing shared poll state and extracting a voter utility.",
      "Release pipeline: typed build, test and npm publish through GitHub Actions and Docker.",
      "Company source is private, so no code or screenshots are shown. Figures are from my résumé.",
    ],
    link: { label: "@pncl/mario on npm", href: "https://www.npmjs.com/package/@pncl/mario" },
  },
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
    connection: "Reliable integrations, validation, and measured improvement.",
    tools: "Node.js, Express, AWS (EC2, RDS), Redis, PostgreSQL, Jest, Cypress, GitHub Actions.",
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
    connection: "Model evaluation and data pipelines that keep applications supplied with current information.",
    tools: "TensorFlow, Node.js, PostgreSQL.",
    note: "The hit-rate gain is an offline evaluation result, not a measured live or revenue improvement.",
  },
];

export const teaching = {
  title: "Teaching Assistant | Java and Data Structures",
  org: "Stony Brook University",
  dates: "August 2024 – May 2025",
  text: "Led weekly recitations for 30+ students and reviewed 200+ submissions, coaching debugging and problem-solving.",
  connection: "Explaining technical ideas clearly and helping people learn new tools.",
};

export const highlights = [
  { label: "AI-assisted development", value: "Claude Code" },
  { label: "AI applications", value: "RAG, prompt engineering, retrieval/extraction, evaluation" },
  { label: "Integration and delivery", value: "REST APIs, data pipelines, GitHub Actions, Docker" },
  { label: "Relevant services", value: "Pinecone, Cohere, OpenAI API (embeddings and generation in AlphaBrief)" },
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
