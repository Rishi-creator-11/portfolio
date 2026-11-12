/* Draft rewrite of project and experience presentation.
   Original fields in data.js are untouched; these fields are layered on top. */

export const projectContent = {
  callpilot: {
    plain: "Multi-tenant AI voice assistant for business calls: semantic retrieval over approved knowledge, scheduling, and usage management.",
    simple: "Multi-tenant · pgvector retrieval · Vapi, Stripe, Google Calendar",
    intro:
      "Built an AI phone-assistant platform that turns business-approved knowledge into conversational responses and connects calls to scheduling, lead capture, and subscription-based usage management.",
    why: "It started with a business owner spending real money on staff just to answer his phones. I wanted an assistant that knows the business and only says what the owner approved.",
    highlights: [
      { area: "Knowledge-grounded responses", text: "Implemented semantic retrieval over owner-approved business information with pgvector and gte-small embeddings, re-ranked by term overlap and intent. Similarity and margin thresholds send ambiguous or unsupported questions to a fallback instead of a guess." },
      { area: "Multi-tenant architecture", text: "Built isolated business workspaces on Supabase Postgres with row-level security, JWT authentication and owner, admin and viewer roles. A 220+ endpoint FastAPI backend checks workspace membership on every request." },
      { area: "Voice and booking workflows", text: "Integrated Vapi through authenticated webhooks and tool calls for knowledge lookup, lead capture and booking, with Google Calendar OAuth scheduling. Idempotency keys stop a retried tool call from double-booking a slot." },
      { area: "Billing and usage controls", text: "Integrated Stripe subscriptions with signature-verified, de-duplicated webhooks, plus a call-minute usage ledger with 80, 95 and 100 percent alerts and a 240-second per-call cap enforced through the voice provider." },
      { area: "Reliability and onboarding", text: "36 Supabase migrations, 280+ pytest cases and GitHub Actions CI with live read-only smoke tests, plus an SSRF-safe website and PDF importer for onboarding." },
    ],
    problem:
      "A phone assistant that improvises will quote wrong prices, claim bookings that never happened, or surface one business's data to another. The work is deciding when retrieved knowledge is reliable enough to say aloud, isolating each business, and keeping booking and billing correct when calls retry.",
    architecture:
      "A caller reaches a Vapi voice agent, which calls FastAPI tool webhooks. The backend resolves the workspace, retrieves approved knowledge from Supabase Postgres with pgvector, and either answers from it or falls back. Bookings go to Google Calendar, and call minutes feed a usage ledger tied to Stripe.",
    decisions: [
      { q: "Retrieval with thresholds instead of free generation", a: "A match must clear a similarity threshold and beat the runner-up by a margin. When two approved answers are close the question is ambiguous, so the agent asks or escalates." },
      { q: "Tenant isolation enforced on the server", a: "Records carry an organization ID, client table access is denied, and every request and voice webhook is checked against workspace membership or assistant ownership." },
      { q: "Idempotent bookings", a: "Booking requests carry a key derived from the workspace, call, start time, duration, name and service, so a retry returns the original result and a taken slot returns a conflict." },
    ],
    techGroups: [
      { label: "Languages and frameworks", items: ["Python", "FastAPI", "Uvicorn", "Pydantic", "httpx"] },
      { label: "Backend and databases", items: ["Supabase", "PostgreSQL", "pgvector"] },
      { label: "AI and voice", items: ["Vapi", "ElevenLabs", "OpenAI"] },
      { label: "Integrations", items: ["Stripe", "Google Calendar API"] },
      { label: "Testing and deployment", items: ["Pytest", "GitHub Actions", "Render"] },
    ],
  },

  alphabrief: {
    plain: "Retrieval over SEC 10-K filings with cited answers. Hybrid Pinecone, BM25 and Cohere rerank scored 0.88 MRR on a 125-question benchmark.",
    simple: "RAG · Hybrid retrieval · Evaluation",
    intro:
      "Built a retrieval system over SEC 10-K filings that answers multi-year company questions with citations back to the filing text. Most of the engineering went into retrieval quality, scoped retrieval and measuring both, rather than into the LLM call.",
    highlights: [
      { area: "Hybrid retrieval", text: "Built a Python retriever that combines Pinecone dense search with BM25 keyword search, merges the rankings with reciprocal rank fusion, and reranks with Cohere. It scores 0.88 MRR, 0.70 Recall@10 and 0.62 Precision@5 on a 125-question benchmark." },
      { area: "Evaluation harness", text: "Built the benchmark and a regression harness around it: golden cases, adversarial cases designed to fail, a check on every pull request and a nightly live evaluation." },
      { area: "SEC data ingestion", text: "Built a resumable EDGAR ingestion pipeline that processed 4,262 Pinecone chunks, with index-parity checks so a crashed run resumes safely. Covered by 320 automated tests." },
      { area: "Retrieval isolation", text: "Added ticker and year scope filtering in FastAPI before generation, giving full comparison coverage with zero cross-company or cross-year leakage. Answers cite the exact filing text." },
      { area: "Latency", text: "Cut median answer time from 7.6s to 2.0s (end-to-end p95 from 19.5s to 5.4s), a 74% reduction, by bounding output tokens." },
    ],
    problem:
      "Generic AI answers about companies sound confident but cannot be traced to a source, and a comparison across companies or years can quietly mix them up. A useful system needs retrieval that finds the right passages, scope control that prevents mixing, and a way to prove both with measurements.",
    architecture:
      "Filings are pulled from SEC EDGAR and chunked into Pinecone, with a parallel BM25 index. A query is scoped by ticker and year, retrieved densely and by keyword, fused, reranked, and passed to the generator with citations.",
    decisions: [
      { q: "Hybrid retrieval over vector search alone", a: "Filings are full of exact terms such as product names, risk factors and tickers that embeddings blur. Dense plus BM25, fused with reciprocal rank fusion and reranked, covers both meaning and exact wording." },
      { q: "Scope filtering before generation", a: "Filtering by ticker and year in the retrieval layer means the generator only sees passages from the requested scope, which is what prevents cross-company and cross-year leakage." },
      { q: "Resumable ingestion with parity checks", a: "EDGAR ingestion is long and fails partway. Parity checks between the source and the index let a run resume safely." },
    ],
    techGroups: [
      { label: "Languages and frameworks", items: ["Python", "FastAPI", "Pydantic", "TypeScript", "Next.js", "React"] },
      { label: "Backend and databases", items: ["PostgreSQL", "pgvector", "SQLAlchemy", "Alembic", "Redis"] },
      { label: "AI and retrieval", items: ["Pinecone", "BM25", "Cohere Rerank", "OpenAI"] },
      { label: "Data sources", items: ["SEC EDGAR", "yfinance", "BeautifulSoup"] },
      { label: "Testing", items: ["Pytest", "Playwright", "Vitest"] },
    ],
  },

  chat: {
    intro:
      "Built a real-time chat platform in Go that runs across multiple server instances, with Redis pub/sub keeping rooms in sync and Kafka absorbing write bursts so the database stays off the delivery path.",
    highlights: [
      { area: "Horizontal scaling", text: "Ran chat across 3 Go Fiber instances behind Nginx, with 100 WebSocket connections per room kept in sync through Redis pub/sub." },
      { area: "Write buffering", text: "Put Kafka in front of Postgres to buffer up to 10,000 messages per second, with a consumer that batches writes so the database stays off the write-hot path." },
      { area: "Infrastructure", text: "Deployed the Dockerized stack to AWS (EC2, S3) with Terraform and GitHub Actions CI/CD, exposing only a TLS-terminated Nginx proxy." },
    ],
    problem:
      "With one server, every client shares memory and fan-out is trivial. Across several instances, a message sent to one must reach clients connected to the others, and a burst of messages must not be limited by database write speed.",
    architecture:
      "Clients connect over WebSockets through a TLS Nginx proxy to one of three Go Fiber instances. Instances publish room messages through Redis pub/sub so every instance delivers to its own clients, and also publish to Kafka. A consumer batches Kafka messages into Postgres.",
    decisions: [
      { q: "Redis pub/sub for cross-instance fan-out", a: "It lets any instance deliver a message to rooms whose clients are spread over all instances, without instances knowing about each other." },
      { q: "Kafka between the servers and Postgres", a: "Persistence becomes asynchronous and batched, so message delivery is limited by the network and not by database write latency." },
      { q: "Only the proxy is exposed", a: "Everything except the TLS-terminated Nginx proxy stays on the private network." },
    ],
    techGroups: [
      { label: "Languages and frameworks", items: ["Go", "Fiber", "WebSockets"] },
      { label: "Messaging and data", items: ["Redis", "Kafka", "PostgreSQL"] },
      { label: "Infrastructure and deployment", items: ["Nginx", "Docker", "Terraform", "AWS", "GitHub Actions"] },
    ],
  },

  "agent-release-lab": {
    intro:
      "Extended an open-source LLM evaluation dashboard with a release gate for agents: versioned test suites, deterministic graders, and a verdict that names exactly which cases regressed between prompt versions.",
    highlights: [
      { area: "Evaluation suite", text: "Added a versioned suite of 30 synthetic support-agent cases covering JSON schema, grounded answers, tool selection, escalation and refusal to leak canary secrets." },
      { area: "Deterministic grading", text: "Wrote graders for strict JSON, exact tool name and arguments, required and forbidden facts, and canary-leak detection, with no model judge and no text-overlap scoring, so results are repeatable." },
      { area: "Release gate", text: "Built a gate (at least 90% pass, 100% secret refusal, at most one regression) and a /lab page that shows the verdict, per-case checks and regressed cases by name." },
      { area: "Safe public mode", text: "Locked public mode to recorded runs; live runs are capped and need a server-side key." },
    ],
    problem:
      "A single average score can say a new prompt is better while hiding the specific cases that got worse. Shipping an agent needs a repeatable decision rule and a list of exactly what regressed.",
    techGroups: [
      { label: "Languages and frameworks", items: ["TypeScript", "Next.js"] },
      { label: "AI and evaluation", items: ["LLM evaluation", "Groq", "Gemini"] },
    ],
  },

  "invoice-review": {
    intro:
      "Extended an open-source OCR and document-decision demo with purchase-order reconciliation, so a wrong quantity or total cannot slip through even when the model says an invoice looks fine.",
    highlights: [
      { area: "Reconciliation engine", text: "Added purchase-order matching that compares supplier, PO number, quantities, unit prices and totals using Decimal arithmetic, keeping expected value, observed value and evidence for each check." },
      { area: "Deterministic review rule", text: "Any mismatch routes the invoice to human review with concrete reasons, and the LLM cannot override a failed rule." },
      { area: "Auditable decisions", text: "Added a write-once reviewer decision with timestamp and reason." },
      { area: "Public demo hardening", text: "Added sandbox-token uploads, size and magic-byte validation, ephemeral files and per-IP caps." },
      { area: "Security fixes", text: "Fixed two upstream security issues found while adapting it: the SQLite database was publicly downloadable and document deletion was unauthenticated." },
    ],
    problem:
      "OCR and a language model can produce a confident approval for an invoice whose quantities or totals do not match the purchase order. The decision needs to be rule-based, explainable and impossible for the model to override.",
    techGroups: [
      { label: "Languages and frameworks", items: ["Python", "FastAPI", "React", "Vite"] },
      { label: "AI and document processing", items: ["OCR", "OpenRouter"] },
      { label: "Deployment", items: ["Docker"] },
    ],
  },

  "inventory-ops": {
    intro:
      "Extended an open-source, chat-driven ERP with a low-stock reorder workflow where the AI drafts the order and a human approves it, with audit events and protection against double submission.",
    highlights: [
      { area: "Approval-gated agent", text: "Built a reorder plugin that reads stock and open purchase orders, drafts quantities rounded to pack size with a per-line justification, and writes only after explicit confirmation." },
      { area: "Concurrency safety", text: "Added duplicate-confirmation protection with an atomic claim: a second confirm returns 409 with the original order, and stale proposals are refused." },
      { area: "Auditability", text: "Logged every proposal, confirmation and denial as an audit event, reusing upstream role checks and document lifecycle hooks instead of bypassing them." },
      { area: "Safe public sandbox", text: "Replaced the upstream shared-writer public demo with session-scoped sandboxes and per-session and hourly caps." },
    ],
    problem:
      "An agent that can write purchase orders directly is a liability. The workflow needs a human checkpoint, protection against the same proposal being confirmed twice, and a record of every decision.",
    techGroups: [
      { label: "Languages and frameworks", items: ["Python", "FastAPI", "React", "TypeScript"] },
      { label: "AI", items: ["LLM tool calling"] },
      { label: "Deployment", items: ["Docker"] },
    ],
  },

  quoteatlas: {
    intro:
      "Built a workspace for comparing supplier quotations: upload a quote, extract its terms with Claude, and compare up to five offers side by side, flagging missing costs instead of treating them as zero.",
    highlights: [
      { area: "AI extraction", text: "Built extraction of supplier, unit price, quantity, freight, duties, taxes, fees, Incoterms, payment terms, lead time and warranty from uploaded quotations." },
      { area: "Comparison logic", text: "Compares up to five quotes side by side and warns on missing cost components rather than calculating them as zero, so the cheapest-looking quote is not cheaper by accident." },
      { area: "Secure storage and billing", text: "Stores files in private Supabase Storage with owner-scoped row-level security and short-lived signed links, with Stripe subscriptions and trial quotas." },
    ],
    problem:
      "Supplier quotes list costs in different shapes, and a missing freight or duty line quietly makes an offer look cheaper than it is.",
    techGroups: [
      { label: "Languages and frameworks", items: ["TypeScript", "Next.js", "React", "Zod"] },
      { label: "AI", items: ["Claude API"] },
      { label: "Backend and integrations", items: ["Supabase", "Stripe", "Resend", "pdf-lib"] },
      { label: "Testing and deployment", items: ["Playwright", "Vitest", "Cloudflare"] },
    ],
  },
};

/* New project page: the Mario SDK, built during the Pencil Spaces internship. */
export const marioProject = {
  id: "mario-sdk",
  cats: ["Distributed", "Full-Stack"],
  year: "2025",
  name: "Mario SDK",
  context: "Pencil Spaces · SWE Intern · San Francisco · Summer 2025",
  plain: "The npm library I built at Pencil Spaces to share state across clients and servers. Updates went from ~500ms to under 100ms across 10+ apps.",
  simple: "TypeScript SDK · JSON Patch · Yjs CRDTs",
  tagline: "An npm library for real-time shared state across clients and servers.",
  status: "Published on npm",
  period: "Jun – Aug 2025",
  headline: { value: "<100ms", label: "from ~500ms" },
  summary: "",
  intro:
    "Built the core sync layer of Mario, a published TypeScript SDK, during my software engineering internship at Pencil Spaces (Pencil Learning Technologies) in San Francisco, the summer before my senior year. Mario keeps shared state consistent between clients and servers for embedded apps.",
  highlights: [
    { area: "Real-time synchronization", text: "Replaced full-state sync with incremental JSON Patch diffs, cutting state-update latency from ~500ms to under 100ms." },
    { area: "Concurrent state consistency", text: "Designed conflict-free merge logic with Yjs CRDTs, preventing lost updates and keeping state consistent when a client reconnects." },
    { area: "SDK integration", text: "Integrated the SDK into 10+ embedded apps, cutting cross-client state drift by 30% and removing about 1K lines of per-app glue code." },
    { area: "Release engineering", text: "Automated the typed build, test and npm publish with GitHub Actions and Docker, trimming release cycle time by 15%." },
  ],
  problem:
    "Shared state was synced by sending full state on every change. Updates took around 500ms, clients drifted apart, and concurrent edits could overwrite each other, particularly around reconnects.",
  decisions: [
    { q: "JSON Patch diffs instead of full state", a: "Sending only what changed makes each update small, which is where the drop from ~500ms to under 100ms came from." },
    { q: "CRDTs for merging", a: "Yjs CRDTs merge concurrent edits deterministically, so simultaneous editors do not overwrite each other and state converges after a reconnect." },
    { q: "One SDK instead of per-app sync code", a: "A shared package replaces each app's own sync logic, which removed about 1K lines of glue across the apps." },
  ],
  results: [
    ["State-update latency", "~500ms to under 100ms"],
    ["Cross-client state drift", "−30% across 10+ integrated apps"],
    ["Release cycle time", "−15%"],
    ["Code removed", "~1K lines of per-app glue"],
  ],
  metrics: [],
  techGroups: [
    { label: "Languages and frameworks", items: ["TypeScript"] },
    { label: "Real-time and state", items: ["Yjs (CRDT)", "JSON Patch"] },
    { label: "Build and release", items: ["GitHub Actions", "Docker", "npm"] },
  ],
  stack: ["TypeScript", "Yjs (CRDT)", "JSON Patch", "GitHub Actions", "Docker", "npm"],
  links: [{ label: "Mario SDK on npm", href: "https://www.npmjs.com/package/@pncl/mario" }],
  images: [],
};

export const workContent = {
  metroprint: {
    home: "Turned a print shop's workflows into a production ordering platform: ~97 configurable products and 559 exact-combination prices, with checkout totals that match on client and server.",
    highlights: [
      { area: "Product configuration", text: "Translated a print-shop owner's workflows into a production Next.js and TypeScript platform supporting ~97 configurable products, built with Claude Code and AI-assisted development." },
      { area: "Data ingestion", text: "Automated ingestion of 80 products and 559 pricing rows into Supabase, translating client data and reconciling counts against the source." },
      { area: "Pricing integrity", text: "Rebuilt pricing around 559 exact-combination rows instead of formulas, which blocks invalid configurations and keeps client and server checkout totals from drifting apart." },
    ],
  },
  pencil: {
    home: "Built the sync layer of the Mario SDK: state updates from ~500ms to under 100ms with JSON Patch diffs, and Yjs CRDTs keeping 10+ apps consistent.",
    highlights: [
      { area: "Real-time synchronization", text: "Built core sync infrastructure for the Mario SDK, a published TypeScript package. Incremental JSON Patch diffs cut state-update latency from ~500ms to under 100ms." },
      { area: "Concurrent state consistency", text: "Designed conflict-free merge logic with Yjs CRDTs, preventing lost updates and keeping state consistent on reconnect." },
      { area: "SDK integration", text: "Integrated the SDK into 10+ embedded apps, cutting cross-client state drift by 30% and removing about 1K lines of per-app glue." },
      { area: "Release engineering", text: "Automated CI/CD with GitHub Actions and Docker (typed build, test, npm publish), trimming release cycle time by 15%." },
    ],
  },
  vip: {
    home: "Built a fintech app with a team of 10 for 500+ users, and shipped backend APIs on AWS with Redis caching and PostgreSQL indexing that cut p95 response time about 20%.",
    highlights: [
      { area: "Fintech application", text: "Built a fintech app with a team of 10 using React, Node.js and AWS, used by 500+ people, and integrated Plaid and Dwolla so users could link banks and move money securely." },
      { area: "Backend performance", text: "Shipped 15+ Node.js and Express REST endpoints on AWS (EC2, RDS). Redis caching and composite PostgreSQL indexes cut p95 response time by about 20%." },
      { area: "API correctness", text: "Added validation, pagination and query batching to list APIs, eliminating N+1 queries and unbounded-response timeouts." },
      { area: "Quality engineering", text: "Built Jest and Cypress suites into a GitHub Actions CI gate, raising backend coverage from ~50% to ~90% and cutting manual QA by ~30%." },
    ],
  },
  "99yards": {
    home: "Built a TensorFlow two-tower recommender that lifted offline hit-rate@10 by ~25%, with pipelines that cut feature freshness from 1 hour to 5 minutes.",
    highlights: [
      { area: "Recommendation modeling", text: "Built a TensorFlow two-tower recommender behind Node.js APIs, lifting offline hit-rate@10 by ~25% over a popularity baseline." },
      { area: "Data pipelines", text: "Built PostgreSQL pipelines for training and online scoring, cutting feature-freshness lag from 1 hour to 5 minutes with incremental updates." },
    ],
  },
  geico: {
    home: "Year-long externship with 1:1 system design mentorship from a senior engineering leader, reviewing production architecture trade-offs.",
    highlights: [
      { area: "System design", text: "Mentored for a full year by Suresh Vasan, Senior Manager of Staff Software Engineering, in 1:1 system design reviews of GEICO's production systems." },
      { area: "Architecture trade-offs", text: "Worked through architecture decisions and their trade-offs on production systems." },
    ],
  },
  ta: {
    home: "Led weekly Java recitations for 30+ students and reviewed 200+ data-structures submissions.",
    highlights: [
      { area: "Teaching", text: "Led weekly Java recitations for 30+ students." },
      { area: "Code review", text: "Reviewed 200+ data-structures submissions, coaching students on debugging and Big-O trade-offs." },
    ],
  },
};
