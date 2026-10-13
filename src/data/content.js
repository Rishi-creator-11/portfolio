// Single source of truth for portfolio copy. Every claim here is traced to the
// résumé, a public repository, or the owner's own account (see README "Content audit").

export const links = {
  github: "https://github.com/Rishi-creator-11",
  linkedin: "https://www.linkedin.com/in/rishi1111",
  email: "hrishitkumar.cs@gmail.com",
  phone: "(914) 446-0465",
  phoneHref: "tel:+19144460465",
};

export const featured = [
  {
    id: "trippilot",
    title: "TripPilot",
    kicker: "Travel workflows",
    summary: "An editable AI travel-planning prototype with advisor-style approval gates.",
    problem:
      "Travel planning mixes preferences, flights, hotels, schedules, routes and budgets, and a plan that looks right can quietly break a constraint.",
    action:
      "Built a planning workflow where budget and timing are checked in code, edits re-run only the affected steps and keep a revision history, offers are re-validated before booking, and nothing is reserved without explicit approval. Retries are protected against duplicate reservations.",
    result:
      "A working prototype with a documented mock-data demo, visible planning progress and controlled sandbox reservations. No customer time savings or booking revenue have been measured.",
    scope:
      "Mock data is the default. Optional provider adapters support search and testing only. There is no payment processing, ticket issuance, refunds or cancellations. The LLM is optional and only interprets the request; important constraints are verified in code.",
    image: {
      src: "/projects/trippilot-workspace.png",
      alt: "TripPilot trip workspace showing a Boston to New York itinerary with constraints, planning progress, a revision history, selected offers and a budget breakdown, all using labeled demo data.",
      caption: "Trip workspace with labeled mock data (from the repository docs).",
    },
    details: [
      "Stack: Next.js, FastAPI, PostgreSQL with pgvector, Redis, Celery.",
      "Live progress over server-sent events, persisted so a run can be replayed.",
      "Incremental edits reuse unaffected planning steps and record each revision.",
      "Sandbox reservations use deterministic idempotency keys, so a repeated approval does not create duplicates.",
      "Provider adapters sit behind typed interfaces with a capability matrix; orders and payments are not implemented for any real provider.",
    ],
    links: [
      { label: "Source on GitHub", href: "https://github.com/Rishi-creator-11/trippilot-ai", primary: true },
    ],
    note: "No hosted demo. The repository documents a mock-mode walkthrough.",
  },
  {
    id: "alphabrief",
    title: "AlphaBrief",
    kicker: "Evidence and evaluation · full-stack app",
    summary: "A deployed research app where you ask a plain-English question about SEC 10-K filings and get an answer you can check against the source.",
    problem:
      "Annual filings are long, and users need answers they can verify rather than a confident summary, with the right company and year every time.",
    action:
      "Built both halves. The interface is a Next.js and TypeScript app: a question box with a company and fiscal-year picker (years are validated against the chosen companies), example questions, an answer with numbered citations, and an evidence panel showing the retrieved filing text with a link to the filing on SEC.gov, plus Pipeline and Metrics tabs and plain-language messages for refusals and errors. The backend is a Python and FastAPI retrieval pipeline: Pinecone dense search, BM25 keyword search, rank fusion and Cohere reranking, with company and year filters applied before retrieval. It declines to answer when the filings do not support one. I evaluated retrieval against a fixed question set.",
    result:
      "A live app over 92 companies and 274 10-K filings. On a 125-question retrieval benchmark (8 companies, run 2026-09-29 on the current corpus) hybrid retrieval scored MRR 0.86, Recall@10 0.66 and Precision@5 0.60.",
    scope:
      "These are retrieval scores, not answer accuracy. The question set covers 8 of the 92 companies. The backend README documents a known same-year numeric-precision limitation for some filers. No user or ROI results are claimed.",
    image: {
      src: "/projects/alphabrief-app.png",
      alt: "AlphaBrief web app answering 'What were Apple's total net sales in fiscal 2025?' with a scoped company and fiscal-year picker, a one-line cited answer, and an evidence panel showing the retrieved 10-K passage.",
      caption: "The live app answering a scoped question, with the cited filing passage beside the answer.",
    },
    details: [
      "Frontend: Next.js, TypeScript, Tailwind, deployed on Vercel. It retries a transient request failure once and maps backend error codes to specific messages.",
      "Backend: Python, FastAPI, Pinecone, bm25s, Reciprocal Rank Fusion, Cohere rerank. Structural tests check cross-year and cross-company isolation, and the backend suite (362 tests per its README) runs in CI.",
      "An earlier 10-company checkpoint scored 0.88 / 0.70 / 0.62; the lower current numbers reflect a roughly 10x larger corpus, as the backend README explains.",
    ],
    links: [
      { label: "Live demo", href: "https://secfrontend.vercel.app", primary: true },
      { label: "Backend source", href: "https://github.com/Rishi-creator-11/sec-rag-engine" },
      { label: "API docs", href: "https://sec-rag-engine.vercel.app/docs" },
    ],
    note: "The live demo is the full app. The frontend source is in a private repository; the backend source and API docs are public.",
  },
  {
    id: "mario",
    title: "Mario SDK and client-side apps",
    kicker: "Professional engineering · Pencil Spaces",
    summary: "Shared real-time state for embedded learning apps, plus the interfaces built on it.",
    problem:
      "Pencil Spaces hosts many small collaborative apps, and each one needed shared state that stays consistent for everyone using it.",
    action:
      "As a summer intern I worked on the Mario SDK, a published TypeScript package: incremental JSON Patch updates, conflict-free merging with Yjs CRDTs, and an automated build, test and publish pipeline. I also built client-side features on top of it: a configuration-driven Word Mat (blending board) and a rewrite of the Polls app from Angular to React and Vite.",
    result:
      "Word Mat layouts are now configuration, so new mats ship without touching shared board logic. Polls moved to React and Vite with its shared poll state preserved and the voting logic extracted into a reusable utility.",
    scope:
      "Source is private to the company, so there is no public repository or screenshots. The numbers below come from my résumé.",
    details: [
      "Résumé-reported results: state-update latency from about 500 ms to under 100 ms, 30% less cross-client state drift, about 1K lines of per-app glue removed, 15% shorter release cycle.",
      "The SDK was integrated into 10+ embedded apps.",
      "Stack: TypeScript, Yjs, GitHub Actions, Docker, npm.",
    ],
    links: [
      { label: "@pncl/mario on npm", href: "https://www.npmjs.com/package/@pncl/mario", primary: true },
    ],
    note: "The npm package is public; its source repository is not.",
  },
];

export const caseStudy = {
  title: "Small-business ordering platform",
  meta: "Contract full-stack engineer · July to September 2026 · client details private",
  problem:
    "A small business needed its configurable-product ordering workflow turned into a reliable online platform, with pricing that stays correct at checkout.",
  action:
    "Worked from the owner's workflows to build a production Next.js and TypeScript ordering platform covering about 97 configurable products. Automated ingestion of 80 products and 559 pricing rows into Supabase, reconciled the counts against the client's data, and added exact-combination validation so invalid configurations are blocked and the client and server compute the same checkout total.",
  result:
    "A working ordering platform delivered end to end. I do not claim any revenue effect; the business existed before this work.",
  scope:
    "I built it with Claude Code and AI-assisted development. The customer-facing product does not itself call an LLM. Client name, links and screenshots are withheld.",
};

export const process = [
  { step: "Discover the task", text: "Sit with the people doing the work and write down what a good outcome and a bad one look like." },
  { step: "Build a narrow workflow", text: "Start with one task done well, with a person approving what matters, before adding anything broader." },
  { step: "Validate critical facts", text: "Check prices, dates, scope and sources in code or against the source document, not by trusting model output." },
  { step: "Work with engineers", text: "Keep changes compatible with shared systems, review each other's code and document decisions." },
  { step: "Measure and support", text: "Define what would count as better, report only what was measured, and help colleagues learn the tool." },
];

// Mirrors the résumé order, titles and dates.
export const experience = [
  {
    org: "Small-business ordering platform (client)",
    role: "Contract Full-Stack Engineer",
    place: "New York, NY",
    dates: "July 2026 – September 2026",
    bullets: [
      "Used Claude Code and AI-assisted development to translate a print-shop owner's workflows into a production Next.js/TypeScript platform supporting ~97 configurable products.",
      "Automated ingestion of 80 products and 559 pricing rows into Supabase, reconciling counts against client data.",
      "Rebuilt pricing around 559 exact-combination rows, blocking invalid configurations and client/server checkout-total drift.",
    ],
  },
  {
    org: "Pencil Learning Technologies",
    role: "Software Engineer Intern",
    place: "San Francisco, CA",
    dates: "June 2025 – August 2025",
    bullets: [
      "Built core sync infrastructure for the Mario SDK (published TypeScript package), cutting state-update latency from ~500 ms to <100 ms with incremental JSON Patch diffs.",
      "Designed conflict-free merge logic with Yjs CRDTs, preventing lost updates and keeping state consistent on reconnect.",
      "Integrated the SDK into 10+ embedded apps, cutting cross-client state drift by 30% and removing 1K lines of per-app glue.",
      "Automated CI/CD with GitHub Actions and Docker (typed build, test, npm publish), trimming release cycle time by 15%.",
    ],
  },
  {
    org: "Vertically Integrated Program, Stony Brook University",
    role: "Software Engineer Intern",
    place: "Stony Brook, NY",
    dates: "August 2024 – December 2024",
    bullets: [
      "Shipped 15+ Node.js/Express REST endpoints on AWS (EC2, RDS), adding Redis caching and composite PostgreSQL indexes to cut p95 response time ~20%.",
      "Added validation, pagination and query batching to list APIs, eliminating N+1 queries and unbounded-response timeouts.",
      "Built Jest and Cypress suites into a GitHub Actions CI gate, raising backend coverage from ~50% to ~90% and cutting manual QA ~30%.",
    ],
  },
  {
    org: "99 YARDS",
    role: "Software Engineer Intern",
    place: "New York, NY",
    dates: "June 2024 – August 2024",
    bullets: [
      "Built a TensorFlow two-tower recommender behind Node.js APIs, lifting offline hit-rate@10 by ~25% over a popularity baseline.",
      "Built PostgreSQL pipelines for training and online scoring, cutting feature-freshness lag from 1 h to 5 min with incremental updates.",
    ],
  },
  {
    org: "Stony Brook University",
    role: "Teaching Assistant, Java and Data Structures",
    place: "Stony Brook, NY",
    dates: "August 2024 – May 2025",
    bullets: [
      "Led weekly recitations for 30+ students and reviewed 200+ data-structures submissions, coaching debugging and Big-O trade-offs.",
    ],
  },
];

export const education = {
  school: "Stony Brook University",
  degree: "B.S. in Computer Science, specialization in Artificial Intelligence and Data Science",
  dates: "Graduated May 2026",
  extras: "GPA 3.6/4.0 · Dean's List (6 semesters) · Far Beyond and Grumman Engineering Scholarships",
};

export const skills = [
  { label: "Languages", value: "Python, TypeScript, Java, JavaScript, SQL, Go" },
  { label: "Backend and data", value: "REST APIs, microservices, data pipelines, PostgreSQL, Redis, Supabase, WebSockets" },
  { label: "AI and LLM", value: "Claude Code, agentic AI, RAG, retrieval and extraction pipelines, LLM evaluation, Pinecone, Cohere" },
  { label: "Cloud and DevOps", value: "AWS (EC2, RDS, S3), Docker, Terraform, GitHub Actions CI/CD, Vercel, Linux, Git" },
];

export const tinkering = {
  title: "Job Scout (personal tool)",
  text: "A local Python and FastAPI app I built to scan job listings, score them against my résumé, and draft tailored résumé and outreach text, driven by chat commands. It never applies or messages anyone without my approval. Private, with no public repository or demo, and I have not measured results.",
};

export const aviation = {
  intro:
    "I have not built any of this, and I have no knowledge of any company's internal systems. These are workflow ideas I would want to test only after learning how the team really works, with domain and operational decisions staying with the responsible aviation professionals.",
  ideas: [
    {
      title: "Inquiry to trip-brief draft",
      text: "Turn a free-text client request into a structured brief and list the details still missing for the advisor to confirm.",
      from: "Same idea as TripPilot's request structuring.",
    },
    {
      title: "Quote extraction and cited comparison",
      text: "Pull key terms from supplied quotes into one table where every value points back to its source line.",
      from: "Same idea as AlphaBrief's citations.",
    },
    {
      title: "Approved-document assistance",
      text: "Answer staff questions only from policy and reference documents the company has approved, and say so when they do not cover it.",
      from: "Same idea as AlphaBrief's scoped retrieval and refusal.",
    },
    {
      title: "Trip summaries and handoffs",
      text: "Keep a current summary and change log per trip so an advisor can pick up where a colleague left off.",
      from: "Same idea as TripPilot's revision history.",
    },
  ],
};
