// Single source of truth. Claims trace to the résumé, public repos, or the owner's own account.

export const links = {
  github: "https://github.com/Rishi-creator-11",
  linkedin: "https://www.linkedin.com/in/rishi1111",
  email: "hrishitkumar.cs@gmail.com",
  phone: "(914) 446-0465",
  phoneHref: "tel:+19144460465",
};

export const proof = [
  { claim: "Build useful AI", evidence: "AlphaBrief: answers people can verify", href: "#alphabrief" },
  { claim: "Deliver business workflows", evidence: "Ordering platform for ~97 products", href: "#ordering" },
  { claim: "Collaborate with engineers", evidence: "Shared SDK used across 10+ apps", href: "#mario" },
  { claim: "Help people use what I ship", evidence: "Led sessions for 30+ students", href: "#experience" },
];

export const projects = [
  {
    id: "alphabrief",
    title: "AlphaBrief",
    subtitle: "AI answers with evidence",
    status: "Live app · Full stack",
    bullets: [
      "Built a live research assistant covering 274 filings across 92 companies.",
      "Made answers traceable with citations and an evidence panel that opens the source filing passage.",
      "Benchmarked retrieval and cut median answer-generation time from 7.6s to 2.0s (earlier measured version).",
    ],
    relevance:
      "I could help advisors get answers they can check against the source, and measure how good those answers are.",
    image: {
      src: "/projects/alphabrief-app.png",
      alt: "AlphaBrief answering a question about Apple's fiscal 2025 net sales, with a company and year picker, a cited answer, and the retrieved 10-K passage beside it.",
    },
    details: [
      "Stack: Next.js and TypeScript frontend on Vercel; Python and FastAPI backend; Pinecone dense search, BM25, rank fusion and Cohere reranking, with company and year filters applied before retrieval. The system declines when the filings do not support an answer.",
      "Current benchmark (run 2026-09-29, 125 questions covering 8 of the 92 companies, current corpus): MRR 0.86, Recall@10 0.66, Precision@5 0.60. These are retrieval scores, not answer accuracy.",
      "Earlier checkpoint (10-company corpus): MRR 0.88, Recall@10 0.70, Precision@5 0.62. The lower current scores follow a roughly 10x larger corpus.",
      "Latency (résumé-reported, earlier version, not stored in the current repository): median generation 7.6s to 2.0s; end-to-end p95 19.5s to 5.4s.",
      "Known limitation, documented in the backend README: same-year numeric precision for some filers. No user or ROI results are claimed.",
    ],
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
    subtitle: "Travel planning with approval",
    status: "Prototype · Mock-data demo · Sandbox reservations",
    bullets: [
      "Built an editable itinerary planner with budget and timing checks done in code.",
      "Preserved revisions and re-ran only the affected planning steps when a request changed.",
      "Re-checked offers and required approval before any sandbox reservation.",
    ],
    relevance:
      "I could help organize travel requests, handle changes, and keep a person in control of consequential actions.",
    image: {
      src: "/projects/trippilot-workspace.png",
      alt: "TripPilot trip workspace for a Boston to New York trip showing constraints, planning progress, revisions, selected offers and a budget, using labeled demo data.",
    },
    details: [
      "Stack: Next.js, FastAPI, PostgreSQL with pgvector, Redis, Celery. Live progress over server-sent events.",
      "Duplicate protection: sandbox reservations use deterministic idempotency keys, so a retried approval does not create a second booking.",
      "Scope: mock data is the default; optional provider adapters support search and testing only. No payment processing, ticket issuance, refunds or cancellations. The LLM is optional and only interprets the request. Provider secrets stay server-side and no card data is collected.",
      "No time savings or booking revenue have been measured. No hosted demo; the repository documents a mock-mode walkthrough.",
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/Rishi-creator-11/trippilot-ai", primary: true }],
  },
  {
    id: "mario",
    title: "Mario SDK and collaborative apps",
    subtitle: "Shared software at Pencil Spaces",
    status: "Professional work · Source private",
    bullets: [
      "Helped cut state-update latency from about 500 ms to under 100 ms.",
      "Integrated shared synchronization into 10+ apps, removing about 1K lines of repeated per-app code.",
      "Built Word Mat and Polls features and automated build, test and publish releases.",
    ],
    relevance:
      "I could work with a development team to fit AI tools into shared systems and keep them maintainable.",
    details: [
      "Résumé-reported results: 30% less cross-client state drift and a 15% shorter release cycle, alongside the figures above. The company's source is private, so there is no public repository or screenshots.",
      "Stack: TypeScript, incremental JSON Patch diffs, Yjs CRDTs for conflict-free merging, GitHub Actions and Docker.",
      "Word Mat (blending board): configuration-driven layouts on shared components, so new mats need no change to shared board logic. Polls: rewritten from Angular to React and Vite, keeping the existing shared poll state and extracting a voter utility.",
    ],
    links: [{ label: "@pncl/mario on npm", href: "https://www.npmjs.com/package/@pncl/mario", primary: true }],
    note: "The npm package is public; its source repository is not.",
  },
  {
    id: "ordering",
    title: "Business ordering platform",
    subtitle: "Workflow automation",
    status: "Client work · Details private",
    bullets: [
      "Turned an owner's requirements into a production platform where they manage about 97 configurable products in one place.",
      "Automated ingestion of 80 products and 559 pricing rows.",
      "Added validation to prevent invalid configurations and inconsistent checkout totals.",
    ],
    relevance:
      "I could help automate repetitive work and improve record quality by turning a nontechnical user's process into dependable software.",
    details: [
      "Stack: Next.js, TypeScript, Supabase. Built with Claude Code and AI-assisted development; the customer-facing product does not itself call an LLM.",
      "Pricing is built around 559 exact-combination rows, and ingestion counts were reconciled against the client's data.",
      "The client's name, links and screenshots are withheld. The business and its revenue pre-date my work, and I claim no revenue effect.",
    ],
  },
];

export const jobScout = {
  title: "Job Scout",
  subtitle: "Research and drafting automation",
  text: "Built a local tool that scans listings, scores fit against my résumé, and drafts tailored materials. Applications and messages stay behind my approval.",
  relevance: "A research, prioritization and review workflow I could adapt to sales research and follow-up drafts.",
  note: "Private local tool: Python and FastAPI. No public code or demo, and no results measured.",
};

export const fit = {
  heading: "Why this fits the AI Specialist role at Flygreen",
  intro: "What makes my experience relevant is that I've worked on several parts of this role.",
  body: [
    "AlphaBrief gave me experience building AI answers people can verify and measuring their quality. TripPilot gave me experience organizing travel requests, checking constraints, and handling changes with approval. My business-platform work involved understanding an owner's process and automating repetitive data work. At Pencil Spaces, I built shared software and app features alongside other developers.",
    "At Flygreen, I could bring those skills together to help advisors prepare information, compare options, and draft responses more efficiently. I would first understand what your existing tools handle, then build and measure a focused improvement with the team.",
  ],
  whyYou: "I bring hands-on AI experience, production engineering, and experience working with nontechnical users. I can build the tool, collaborate with the developers, and explain it to the people using it. I'm especially interested in this role because I want that full ownership: understand the problem, ship something useful, and improve it based on real feedback.",
  disclaimer: "I have no affiliation with, access to, or knowledge of Flygreen's internal systems; this describes what I could contribute.",
};

// Résumé order, titles and dates; two strongest results each.
export const experience = [
  {
    role: "Contract Full-Stack Engineer",
    org: "Small-business ordering platform (client)",
    dates: "July 2026 – September 2026",
    results: [
      "Built a production Next.js/TypeScript platform supporting ~97 configurable products, using Claude Code and AI-assisted development.",
      "Automated ingestion of 80 products and 559 pricing rows into Supabase and rebuilt pricing around 559 exact-combination rows.",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "Pencil Learning Technologies",
    dates: "June 2025 – August 2025",
    results: [
      "Cut state-update latency from ~500 ms to <100 ms in the Mario SDK (published TypeScript package) with incremental JSON Patch diffs.",
      "Integrated the SDK into 10+ embedded apps, cutting cross-client state drift 30% and removing 1K lines of per-app glue.",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "Vertically Integrated Program, Stony Brook University",
    dates: "August 2024 – December 2024",
    results: [
      "Cut p95 response time ~20% across 15+ Node.js/Express endpoints on AWS with Redis caching and composite PostgreSQL indexes.",
      "Raised backend test coverage from ~50% to ~90% with Jest and Cypress in a CI gate, cutting manual QA ~30%.",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "99 YARDS",
    dates: "June 2024 – August 2024",
    results: [
      "Lifted offline hit-rate@10 ~25% over a popularity baseline with a TensorFlow two-tower recommender behind Node.js APIs.",
      "Cut feature-freshness lag from 1 h to 5 min with incremental PostgreSQL pipelines.",
    ],
  },
  {
    role: "Teaching Assistant, Java and Data Structures",
    org: "Stony Brook University",
    dates: "August 2024 – May 2025",
    results: [
      "Led weekly recitations for 30+ students and reviewed 200+ submissions, the same habit of explaining clearly that I would bring to demos and supporting teammates.",
    ],
  },
];

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
