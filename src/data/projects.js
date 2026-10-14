// Deep-dive content for the Projects page. Scope: projects documented on my résumé, plus TripPilot.
// Every claim comes from the résumé or the project's own docs/source; résumé-reported figures are labeled.
// Schema: intro (sentence, role, tech), metrics, built, problems, decisions, diagrams, links.
// `workflow` diagrams are product workflows, not implementation architecture.

const github = (repo) => ({ label: "GitHub", href: `https://github.com/Rishi-creator-11/${repo}` });

export const projects = [
  {
    id: "alphabrief",
    title: "AlphaBrief",
    kind: "Independent project · April 2026 – present",
    sentence: "A RAG research assistant that answers questions about SEC 10-K filings and shows the passage behind every answer.",
    problem: "Analysts need answers from SEC filings that they can check, not plausible summaries.",
    bullets: [
      "Hybrid retriever: Pinecone dense search and BM25 keyword search merged with rank fusion, then reranked by Cohere, with a fallback if reranking fails.",
      "Company and fiscal-year scope is applied before retrieval, so one company's text cannot leak into another's answer. Tests assert zero leakage.",
      "Answers are generated only from retrieved text, with citations that open the filing passage, and the system declines when evidence is thin.",
      "Resumable ingestion of 10-K filings with index-parity checks, evaluated on a 125-question benchmark with CI on every push."
    ],
    role: "Sole engineer: ingestion, retrieval and generation API, Next.js interface, evaluation, tests and deployment.",
    tech: ["Python", "FastAPI", "OpenAI API (embeddings, gpt-5-nano, relevance judging)", "Pinecone", "bm25s", "Cohere Rerank", "Next.js", "TypeScript", "GitHub Actions", "Vercel"],
    metrics: [
      { value: "92 / 274", label: "companies / 10-K filings (current corpus)" },
      { value: "0.86", label: "MRR on a 125-question benchmark" },
      { value: "362", label: "backend tests in CI" },
      { value: "-74%", label: "answer-generation latency, median 7.6s → 2.0s (résumé-reported, earlier version)" },
    ],
    built: [
      "Built a Python hybrid retriever: Pinecone dense search and bm25s keyword search merged with Reciprocal Rank Fusion, then reranked by Cohere, falling back to the hybrid top 5 if reranking fails.",
      "Built a resumable SEC EDGAR ingestion pipeline (download, clean, chunk, embed, Pinecone upsert, BM25 registration) with index-parity checks; a hash ledger resumes from the earliest broken stage.",
      "Added FastAPI company and fiscal-year scope filtering before retrieval; an unsupported year returns a 422 instead of widening scope.",
      "Constrained generation to the retrieved text so the model declines when evidence is thin, with numbered citations that open the filing passage.",
      "Cut answer-generation latency about 74% (median 7.6s to 2.0s, p95 19.5s to 5.4s) with output-token bounds. This is résumé-reported for the earlier 10-company version.",
      "Built the Next.js interface and the evaluation: a 125-question benchmark judged by an LLM that never sees retriever names or scores, plus structural scope-isolation tests in CI with external services stubbed.",
    ],
    problems: [
      { problem: "Comparison questions lost coverage: top-k retrieval did not guarantee evidence from every company compared.", solution: "Retrieve and filter each requested scope independently, union the candidates (capped at 60, at least one per scope), then rerank once, so one company's text cannot crowd out or leak into another's." },
      { problem: "Benchmark numbers had been measured at the wrong corpus scale.", solution: "Withheld them and re-measured against the current corpus. The earlier 10-company version (MRR 0.88, Recall@10 0.70, Precision@5 0.62, 4,262 chunks, 320 tests) is kept as a separate, labeled version." },
      { problem: "Two documented failures: the system correctly refused but still attached citations.", solution: "Recorded as failure cases with the expected behavior, a refusal with no citations." },
      { problem: "Open: same-year numeric precision for filers that restate a metric across tables.", solution: "Not fixed. Retrieval is year-correct; the remaining work is in generation." },
    ],
    decisions: [
      { title: "Scope before retrieval, not after", text: "The generator never sees a chunk outside the requested scope, and tests assert it (zero cross-company or cross-year leakage). Trade-off: it needs structured scope, so a year named in the question is inferred conservatively." },
      { title: "Rank fusion over score blending", text: "RRF avoids calibrating two unrelated score scales. Trade-off: BM25 scores the whole corpus, so quality drifted as the corpus grew about 10x; that is measured and documented." },
      { title: "Availability over peak precision on the failure path", text: "If rerank fails or is rate-limited, the scope-filtered hybrid top 5 is served rather than an error." },
      { title: "Decline instead of guess", text: "Some answerable questions get a refusal; that is preferred to an unsupported answer." },
    ],
    diagrams: ["alphabriefIngest", "alphabriefCi"],
    overview: "alphabriefQuery",
    evidence: "alphabriefBenchmark",
    notes: ["Current figures (MRR 0.86, Recall@10 0.66, Precision@5 0.60) come from the repository's 2026-09-29 run on 8 of the 92 companies with LLM-assisted judgments. They are retrieval scores, not answer accuracy."],
    links: [{ label: "Live demo", href: "https://secfrontend.vercel.app/", primary: true }, github("sec-rag-engine")],
  },

  {
    id: "trippilot",
    title: "TripPilot",
    kind: "Independent project · 2026",
    sentence: "A travel planner where budgets, schedules and routes are computed in code, edits are incremental, and nothing is reserved without approval.",
    problem: "Travel plans mix budgets, schedules and routes; a model should not decide those, and nothing should be reserved without approval.",
    bullets: [
      "Three typed workflows (plan, edit, book) instead of free-form agent chat, so control flow can be inspected and tested.",
      "Budgets, dates, route fit and offer validity are computed in code; the model only parses requests and drafts text.",
      "Edits re-search only the affected domains and save a new revision with an item-level diff.",
      "Booking pauses for explicit approval and uses idempotency keys, so a retry cannot create a second reservation."
    ],
    role: "Sole engineer: workflows, API, data model, provider adapters, web client, tests and documentation. Prototype with mock data and sandbox reservations.",
    tech: ["Next.js (App Router)", "TypeScript", "FastAPI", "Pydantic", "SQLAlchemy async", "PostgreSQL + pgvector", "Redis", "Celery", "Playwright", "Docker"],
    metrics: [],
    built: [
      "Built three typed workflows (planning, incremental edit, booking) instead of free-form agent chat, so control flow is inspectable and testable.",
      "Kept consequential logic deterministic: money in integer minor units, dates and schedule feasibility, route fit, offer validity, repair caps and the approval gate. The model is optional and only extracts intent and drafts explanations.",
      "Built a search-plan compiler that turns intent, destination and provider capabilities into only the required searches, with partial-result warnings for missing capabilities.",
      "Made edits incremental: only affected domains are re-searched, each edit stores a new revision with item-level diffs, and booking rejects stale or cross-trip revision IDs.",
      "Built resumable progress: workers write ordered run events to Postgres and the API streams them over SSE with Last-Event-ID replay, falling back to polling.",
      "Built approval-gated sandbox reservations that revalidate offers, pause for explicit confirmation, and use deterministic idempotency keys.",
    ],
    problems: [
      { problem: "A music venue is not a dated event.", solution: "The search-plan compiler routes bars to Places and electronic music to Events plus music-venue searches, never treating a venue as an event." },
      { problem: "Repair loops that never end.", solution: "Verification triggers at most two repairs, then finalizes with warnings." },
      { problem: "A retried approval creating a second reservation.", solution: "Deterministic idempotency keys make re-approve and resume a no-op." },
      { problem: "Runs stuck in a running state.", solution: "Status transitions guarantee a completed or failed task leaves running." },
    ],
    decisions: [
      { title: "Explicit workflows over agent chat", text: "Less open-ended, which is the point for a booking flow." },
      { title: "Revision-scoped artifacts", text: "More storage and joins in exchange for traceable edits and safe booking." },
      { title: "Capability-declared adapters", text: "Production booking paths are disabled and test/live spillover is blocked at the factory; real providers are search and test only." },
    ],
    diagrams: ["tripSystem", "tripPlanning", "tripEdit", "tripBooking"],
    overview: "tripOverview",
    evidence: "tripSplit",
    notes: ["Prototype with mock data and sandbox reservations: no real payments, ticket issuance, refunds or cancellations; provider secrets stay server-side and no card data is collected. No measured savings or live customers. Not on my résumé."],
    links: [github("trippilot-ai")],
  },

  {
    id: "metroprint",
    title: "MetroPrint USA",
    kind: "Contract employment · July – September 2026",
    sentence: "A production Next.js and TypeScript ordering platform built from a business owner's workflows.",
    problem: "A print business needed every product, option and price in one place that customers can order from.",
    role: "Contract full-stack engineer. Used Claude Code and AI-assisted development to implement the platform.",
    tech: ["Next.js", "TypeScript", "Supabase", "Claude Code (AI-assisted development)"],
    metrics: [
      { value: "≈97", label: "configurable products supported" },
      { value: "80", label: "products ingested" },
      { value: "559", label: "pricing rows ingested" },
    ],
    built: [
      "Translated the owner's workflows into a production platform supporting about 97 configurable products.",
      "Automated ingestion of 80 products and 559 pricing rows into Supabase, translating client data and reconciling counts.",
      "Rebuilt pricing around 559 exact-combination rows, blocking invalid configurations and client/server checkout-total drift.",
    ],
    problems: [
      { problem: "Price depends on the exact combination of options.", solution: "Every valid combination is its own pricing row, and invalid configurations are blocked." },
      { problem: "Totals shown and totals charged could drift apart.", solution: "Validation across the client and the server keeps checkout totals consistent." },
      { problem: "Importing the owner's data accurately.", solution: "Scripted ingestion with counts reconciled against the client data." },
    ],
    decisions: [
      { title: "Exact-combination pricing", text: "A price is a lookup, not a formula that can drift. Trade-off: a large table to maintain." },
    ],
    diagrams: [],
    overview: "metroprintFlow",
    notes: ["Client work: source and internal architecture are not published, so there is no diagram. The business and its existing revenue are the client's; no revenue effect is claimed."],
    links: [{ label: "Live site", href: "https://www.metroprintmkt.com/", primary: true }],
  },

  {
    id: "pencil",
    title: "Mario SDK at Pencil Learning Technologies",
    kind: "Internship · June – August 2025",
    sentence: "Shared real-time state infrastructure for embedded collaborative apps, published as a TypeScript package.",
    problem: "Embedded collaborative apps each carried their own sync code, and shared state was slow and drifted between clients.",
    role: "Software Engineer Intern: built core sync infrastructure and integrated it into 10+ embedded apps.",
    tech: ["TypeScript", "JSON Patch", "Yjs (CRDTs)", "GitHub Actions", "Docker", "npm"],
    metrics: [
      { value: "~500ms → <100ms", label: "state-update latency" },
      { value: "10+", label: "apps integrated" },
      { value: "-30%", label: "cross-client state drift" },
      { value: "-15%", label: "release cycle time" },
    ],
    built: [
      "Built core sync infrastructure for the Mario SDK (a published TypeScript package), cutting state-update latency from about 500ms to under 100ms with incremental JSON Patch diffs.",
      "Designed conflict-free merge logic with Yjs CRDTs, preventing lost updates and maintaining consistent state on reconnect.",
      "Integrated the SDK into 10+ embedded apps, cutting cross-client state drift by 30% and removing 1K lines of per-app glue.",
      "Automated CI/CD with GitHub Actions and Docker (typed build, test, npm publish), trimming release cycle time by 15%.",
    ],
    problems: [
      { problem: "Slow, drifting shared state across participants.", solution: "Incremental diffs instead of whole state, merged with CRDTs so concurrent edits are not lost." },
      { problem: "Every app carried its own integration glue.", solution: "One shared SDK integration, removing about 1,000 lines of per-app code." },
      { problem: "Manual release steps.", solution: "Automated typed build, test and npm publish." },
    ],
    decisions: [],
    diagrams: [],
    overview: "pencilFlow",
    evidence: "pencilLatency",
    notes: ["Figures are from my résumé. The company's source is private, so no code or internal architecture is published and there is no diagram."],
    links: [],
  },

  {
    id: "distributed",
    title: "Distributed Systems Platform",
    kind: "Independent project · September – December 2025",
    sentence: "A distributed Go chat system across three application instances, with Redis and Kafka, deployed to AWS.",
    problem: "Chat has to stay consistent across several server instances while buffering heavy message bursts.",
    role: "Sole engineer (résumé-reported).",
    tech: ["Go (Fiber)", "WebSockets", "Redis", "Kafka", "Docker", "AWS (EC2, S3)", "Terraform", "GitHub Actions", "Nginx (TLS)"],
    metrics: [
      { value: "3", label: "Fiber instances" },
      { value: "100", label: "WebSocket connections per room" },
      { value: "10,000", label: "messages/sec buffered through Kafka" },
    ],
    built: [
      "Built a distributed Go chat system across 3 Fiber instances, supporting 100 WebSocket connections per room, with Redis pub/sub and buffering up to 10,000 messages/sec through Kafka.",
      "Deployed the Dockerized stack to AWS (EC2, S3) with Terraform and GitHub Actions CI/CD behind a TLS-terminated Nginx proxy.",
    ],
    problems: [],
    decisions: [],
    diagrams: [],
    overview: "distributedFlow",
    notes: ["Résumé-reported. I have not located a repository for this project, so there is no diagram or link and the figures are not independently verified."],
    links: [],
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