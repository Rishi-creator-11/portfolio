// Deep-dive content for the Projects page. Each claim is drawn from the project's own docs or source
// (see `sources`) or from the single-source-of-truth summary in content.js. `role` states plainly what
// was personal work versus team context. Résumé-reported figures are labeled as such.

export const projects = [
  {
    id: "alphabrief",
    title: "AlphaBrief",
    kind: "Independent project · April 2026 – present",
    role: "Independent project: I designed and built the retrieval pipeline, API, evaluation and frontend.",
    problem:
      "Answers about 10-K filings are only useful if you can check them. The goal was a research tool where every claim points to the filing passage it came from, and where it refuses instead of guessing.",
    links: [
      { label: "Live demo", href: "https://secfrontend.vercel.app/", primary: true },
      { label: "Source", href: "https://github.com/Rishi-creator-11/sec-rag-engine" },
      { label: "API docs", href: "https://sec-rag-engine.vercel.app/docs" },
    ],
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "OpenAI", "Pinecone", "bm25s", "Cohere", "Vercel"],
    diagrams: ["alphabriefQuery", "alphabriefIngest", "alphabriefCi"],
    decisions: [
      { title: "Filter scope before retrieval, not after", text: "Company and fiscal-year filters are applied inside every retrieval path, so the generator never sees a chunk outside the requested scope. An unsupported year returns a structured 422 rather than quietly widening the search." },
      { title: "Hybrid retrieval with reranking", text: "Dense search (Pinecone) and keyword search (bm25s) are fused with Reciprocal Rank Fusion, then reranked by Cohere. If reranking fails or is rate-limited, the request falls back to hybrid top-5, still scope-filtered." },
      { title: "Refuse when evidence is thin", text: "The answer model is constrained to the retrieved text and declines when the filings do not support an answer." },
      { title: "Comparisons retrieve each scope separately", text: "Each requested company or year is retrieved and filtered independently, then unioned before one shared rerank, so one scope's text cannot leak into another's evidence." },
      { title: "Ingestion you can resume and audit", text: "Each stage's artifacts are re-validated on rerun and hashed in a ledger, and writes are atomic (temp file, fsync, replace), so an interrupted run cannot replace a good file with a half-written one." },
    ],
    challenges: [
      { title: "Recorded failures", text: "FAILURES.md records two cases where the system correctly refused but still attached citations, and one where top-k retrieval did not guarantee evidence from every company in a comparison." },
      { title: "Same-year numeric precision (open)", text: "For filers that restate a metric across several tables (ExxonMobil and Chevron in the corpus), retrieval returns only the requested year's chunks, but generation occasionally picks the wrong figure inside that year. This is separate ongoing work." },
      { title: "Benchmark coverage", text: "The 125-question set covers 8 of the 92 companies, and relevance judgments are LLM-assisted. These are retrieval scores, not answer accuracy." },
      { title: "Index freshness", text: "The keyword index lives in the API process, so a running API must be restarted after ingesting a new filing. /health reports the document count so the restart can be confirmed." },
    ],
    results: {
      stats: [
        { value: "92", label: "companies" },
        { value: "274", label: "10-K filings" },
        { value: "45,252", label: "indexed chunks" },
        { value: "362", label: "backend tests passing" },
      ],
      note: "Corpus counts are from the live /health and /companies endpoints; the corpus is a large-cap V1 launch set, not full SEC coverage.",
    },
    chart: "alphabriefBenchmark",
    sources: "sec-rag-engine README, INGESTION.md, FAILURES.md",
  },
  {
    id: "trippilot",
    title: "TripPilot",
    kind: "Independent project · 2026",
    role: "Independent project: I designed and built the workflows, API, data model and client.",
    problem:
      "Travel plans change. The goal was a planner that turns a request into an editable itinerary, checks it in code, rebuilds only what an edit affects, and never books anything without an explicit approval.",
    links: [{ label: "Source", href: "https://github.com/Rishi-creator-11/trippilot-ai", primary: true }],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Celery", "SSE", "Optional LLM extractor"],
    label: "Demo data · sandbox reservations only",
    diagrams: ["tripSystem", "tripPlanning", "tripEdit", "tripBooking"],
    decisions: [
      { title: "Explicit workflows over free-form agent chat", text: "Planning, edit and booking are typed graphs, so control flow stays inspectable, testable and safe around the approval step." },
      { title: "Code decides, the model assists", text: "Money (integer minor units), dates, schedule feasibility, route fit, offer validity and the approval gate are deterministic. An LLM may extract intent or draft explanations, but cannot invent prices, coordinates or availability." },
      { title: "Search only what the intent needs", text: "A search-plan compiler turns intent, the resolved destination and provider capabilities into just the required searches. A venue is never treated as a dated event, and missing capabilities produce partial-result warnings." },
      { title: "Revision-scoped artifacts", text: "Edits create a new revision with item-level diffs, and booking rejects stale or cross-trip revision IDs." },
      { title: "Streaming you can resume", text: "Run events are written in order to the database and served over SSE with Last-Event-ID replay. The client reconnects with backoff, then falls back to status polling." },
    ],
    challenges: [
      { title: "Sandbox only, by design", text: "Production provider booking paths are disabled and test or live spillover is blocked at the provider factory. No real payments, ticket issuance, refunds or cancellations, and no card data is collected." },
      { title: "Bounded repair", text: "Verification can trigger a repair loop, which is capped at two attempts so a bad plan ends in a warning rather than looping." },
      { title: "Duplicate protection", text: "Sandbox reservations use deterministic idempotency keys, so a retried approval or resume does not create a duplicate." },
      { title: "Observability limits", text: "Metrics are in-process and for development only; OpenTelemetry and LangSmith hooks are optional and never required to start." },
    ],
    results: {
      stats: [
        { value: "3", label: "typed workflows: plan, edit, book" },
        { value: "2", label: "max repair attempts per plan" },
        { value: "0", label: "real payments processed" },
      ],
      note: "Counts describe the documented architecture. The public demo uses labeled demo data.",
    },
    chart: "tripSplit",
    sources: "trippilot-ai docs/ARCHITECTURE.md",
  },
  {
    id: "computer-use",
    title: "Computer-use automation",
    kind: "Independent project · take-home",
    role: "Independent take-home: I designed and built the agent, schema, replay engine, guardrails and escalation path.",
    problem:
      "Many business systems have no API. The brief was to let an LLM learn a task in a web UI once, save it as a reusable capability, and then run it without a model in the loop, with a defined fallback to a person.",
    links: [{ label: "Source", href: "https://github.com/Rishi-creator-11/interface-ai-computer-use-assignment", primary: true }],
    stack: ["Python", "Playwright", "Pydantic", "Flask (test target)", "Anthropic API decider"],
    diagrams: ["computerUse", "agentReplay"],
    decisions: [
      { title: "One representation for perception and execution", text: "Discovery and replay both resolve locators by role and accessible name from the same accessibility tree the model saw, so there is no second CSS-based path that could diverge." },
      { title: "A typed artifact is the contract", text: "Steps are an enum of action types, so an unknown action fails at parse time. Locators carry a fallback list, inputs are templated, and the checkpoint is one explicit assertion." },
      { title: "Separate business outcomes from failures", text: "Replay distinguishes SUCCESS, BUSINESS_OUTCOME (for example 'no such member') and FAILURE. It checks business outcomes before attempting the next step, which fixed a first version that surfaced a missing member as a confusing click failure one step later." },
      { title: "Irreversible steps stay visible", text: "Risk is set once at authoring time on the capability and the confirmation screen is part of the recorded flow, instead of guessing from button text." },
    ],
    challenges: [
      { title: "Stated cuts", text: "Multi-tenant override layer (designed, not built), live-session browser re-attach for escalation (protocol is real, the re-attach is stubbed), and secret redaction that matches field names rather than value patterns." },
      { title: "Evidence provenance", text: "The recorded discovery runs in the repository were driven through a Claude Code session with a file-relay decider, as the README explains. The Anthropic API decider is implemented." },
      { title: "Scope", text: "Built against a local legacy-style banking console. No production customer adoption or measured savings." },
    ],
    results: {
      stats: [
        { value: "0", label: "model calls during replay" },
        { value: "3", label: "replay outcomes: success, business outcome, failure" },
      ],
      note: "Behavior is shown by the evidence directories in the repository, not by production metrics.",
    },
    sources: "interface-ai-assignment README.md and REPORT.md",
  },
  {
    id: "jobscout",
    title: "Job Scout",
    kind: "Personal automation",
    role: "Personal tool: I built it with ChatGPT's help and run it locally. It is not in a public repository.",
    problem:
      "Searching for roles means repeating the same filtering and drafting every day. The goal was a pipeline that surfaces a short ranked brief and prepares drafts, while keeping every outward action under my control.",
    links: [],
    stack: ["Python", "FastAPI", "Apify", "Supabase", "WhatsApp / Telegram", "OpenAI (default)", "Anthropic (selectable)"],
    diagrams: ["jobScout"],
    decisions: [
      { title: "Approval before action", text: "It never applies or messages anyone on its own. Decisions arrive as chat commands: tailor, skip, not a fit, draft outreach." },
      { title: "Hard rules in the scoring prompt", text: "Strict JSON output, and a score of zero for excluded roles, senior roles, 4+ years required, or visa-incompatible postings." },
      { title: "Never invent experience", text: "The tailoring prompt may reorder existing material but not add to it, and lists gaps separately." },
      { title: "Spend model calls carefully", text: "URL deduplication and a prefilter run before scoring, and a cap limits how many jobs are scored per run." },
      { title: "Learn from decisions", text: "Recent skip and tailor decisions are fed back into scoring as learned rules." },
    ],
    challenges: [
      { title: "No measured impact", text: "There is no benchmark or tracked outcome for Job Scout, so the page makes no performance claim." },
      { title: "Local, unversioned", text: "The code is local and not published, so there is no link." },
    ],
    results: { stats: [], note: "A ranked brief and prepared drafts in one workflow. No quantitative results are claimed." },
    sources: "Job Scout source: app/services, app/bot, app/scheduler.py",
  },
  {
    id: "metroprint",
    title: "MetroPrint ordering platform",
    kind: "Contract engagement · July – September 2026",
    role: "Contract full-stack engineer: I built the customer ordering flow and the admin workspace from the owner's requirements.",
    problem:
      "A print business needed customers to configure products and pay online, and the owner to manage prices, orders and inquiries without developer help.",
    links: [{ label: "Live site", href: "https://www.metroprintmkt.com/", primary: true }],
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Claude Code (development)"],
    diagrams: [],
    image: { src: "/projects/metroprint-storefront.webp", alt: "The MetroPrint Marketing storefront home page with a promotional carousel, product categories and a Shop products button." },
    overview: [
      "Built a production ordering platform and an admin workspace for managing products, pricing, orders and customer inquiries.",
      "Translated the owner's requirements into customer-facing and internal business tools.",
      "Automated product and pricing ingestion, and added configuration and checkout validation.",
      "Admin controls cover orders and inquiries, per-option price editing, promotional banners, discount, shipping and tax settings, and customer records.",
    ],
    decisions: [
      { title: "Pricing by exact combination", text: "Each valid combination of product options has its own price (559 rows), so a quote is a lookup rather than a formula that can drift. Invalid combinations are blocked." },
      { title: "Accurate data first", text: "Product and pricing data were ingested by script and the counts reconciled against the client's own source data before launch." },
      { title: "Custom orders go to a quote", text: "Orders that do not fit the standard options become a quote request instead of a checkout." },
      { title: "Built for the owner, not just customers", text: "An admin workspace lets the owner manage products, prices, orders and inquiries without a developer." },
    ],
    challenges: [
      { title: "Consistent prices", text: "Totals shown to customers and totals charged have to agree, so pricing was validated end to end." },
      { title: "Clean imports", text: "Turning the owner's existing product and price information into structured records without losing or duplicating rows." },
    ],
    results: {
      stats: [
        { value: "≈97", label: "configurable products" },
        { value: "80", label: "products ingested" },
        { value: "559", label: "pricing rows ingested" },
      ],
      note: "The admin workspace covers orders and inquiries, price editing, promotional banners, discount, shipping and tax settings, and customer records. It is login-protected, so it is described here rather than shown. The architecture of this client system is intentionally not published.",
    },
    sources: "Client project; public storefront and owner requirements",
  },
  {
    id: "pencil",
    title: "Mario synchronization at Pencil",
    kind: "Software engineering internship · June – August 2025",
    role: "Team context: I was an intern on a product team, contributing to the shared sync layer and to the apps built on it. The source is private, so there is no architecture diagram here.",
    problem:
      "Pencil's collaborative classroom apps each needed shared state. The work was shared synchronization infrastructure and the client apps that use it.",
    links: [{ label: "@pncl/mario on npm", href: "https://www.npmjs.com/package/@pncl/mario" }],
    stack: ["TypeScript", "React", "RxJS", "WebSockets", "Yjs", "GitHub Actions", "Docker"],
    diagrams: [],
    overview: [
      "Built Mario synchronization infrastructure and integrated it into 10+ collaborative apps.",
      "Delivered client-side work including configurable Word Mat layouts and the Angular-to-React Polls rewrite, plus the Timer, Stopwatch, Eraser, Dice and Box Breathing apps.",
      "Automated builds, tests and publishing, shortening the release cycle by 15% (résumé-reported).",
      "The company's source is private, so no code, screenshots or internal architecture are shown.",
    ],
    decisions: [
      { title: "One shared integration", text: "Built Mario synchronization infrastructure and integrated it into 10+ collaborative apps, replacing about 1,000 lines of repeated per-app integration code (résumé-reported)." },
      { title: "Configuration over copies", text: "In Word Mat / Blending Board, each mat is a configuration object on one shared component." },
      { title: "Client work", text: "Rewrote Polls from Angular to React, moved apps onto the shared UI library and from webpack to Vite, and built a Box Breathing app." },
    ],
    challenges: [
      { title: "What I can and cannot show", text: "The private repository means I cannot publish code or an architecture diagram. Figures below are from my résumé, not from a public artifact." },
    ],
    results: {
      stats: [
        { value: "10+", label: "apps integrated" },
        { value: "15%", label: "shorter release cycle" },
      ],
      note: "Résumé-reported. Update latency from about 500 ms to under 100 ms with incremental JSON Patch diffs, and 30% less cross-client state drift.",
    },
    chart: "pencilLatency",
    sources: "Résumé and content.js",
  },
];

// Small data sets for the technical visualizations (BarCompare).
export const charts = {
  alphabriefBenchmark: {
    title: "Retrieval quality as the corpus grew",
    caption:
      "benchmark_v3_repool: 125 questions covering 8 of 92 companies, scored 2026-09-29 against the current corpus. Relevance judgments are LLM-assisted and these are retrieval scores, not answer accuracy. The README attributes the small drop to BM25's whole-corpus scoring drifting as the corpus grew about 10x.",
    series: [
      { name: "Prior 10-company checkpoint", tone: "muted" },
      { name: "Current 92-company corpus", tone: "primary" },
    ],
    rows: [
      { label: "MRR", values: [0.88, 0.86] },
      { label: "Recall@10", values: [0.7, 0.66] },
      { label: "Precision@5", values: [0.62, 0.6] },
    ],
    max: 1,
    format: (v) => v.toFixed(2),
  },
  pencilLatency: {
    title: "Sync update latency (résumé-reported)",
    caption: "From about 500 ms to under 100 ms using incremental JSON Patch diffs. Not independently verifiable from public code.",
    series: [{ name: "Latency, ms (upper bound)", tone: "primary" }],
    rows: [
      { label: "Before", values: [500] },
      { label: "After (under 100)", values: [100] },
    ],
    max: 500,
    format: (v) => `${v} ms`,
  },
};

// TripPilot's documented split of responsibilities, rendered as an interactive two-column visual.
export const responsibilitySplit = {
  deterministic: ["Money, in integer minor units", "Dates and schedule feasibility", "Route fit estimates", "Offer validity and revalidation", "Verification and repair caps", "Booking approval gate"],
  llm: ["Natural-language extraction", "Edit classification", "Preference summarization", "Free-form explanations"],
};

// Isolation checks asserted by structural tests (sec-rag-engine README, 'Evaluation & Testing').
export const isolationChecks = [
  { label: "Fiscal-year filter correctness", value: "1.000", want: "higher is better" },
  { label: "Cross-year leakage", value: "0.000", want: "lower is better" },
  { label: "Cross-company leakage", value: "0.000", want: "lower is better" },
  { label: "Comparison scope coverage", value: "1.000", want: "higher is better" },
  { label: "Numeric-year attribution", value: "1.000", want: "higher is better" },
];
