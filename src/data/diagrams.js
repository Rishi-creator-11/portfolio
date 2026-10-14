// Diagram specs for FlowDiagram. Every node and edge is taken from the project's own documentation or
// source (named in `source`). Nothing here names client files, database tables, or credentials.
// Grid: `col` is the left-to-right stage, `row` stacks parallel work within a stage.

/** @type {Record<string, import("@/components/FlowDiagram").DiagramSpec & { source: string }>} */
export const diagrams = {
  alphabriefQuery: {
    title: "AlphaBrief: how a question becomes a cited answer",
    description: "Question and scope go to dense and keyword retrieval, are fused with RRF, reranked, then answered from the retrieved filing text only.",
    source: "sec-rag-engine README, 'How It Works' and 'Tech Stack'",
    nodes: [
      { id: "q", col: 0, row: 1, label: "Question\n+ scope", sub: "company / fiscal year", tone: "user", detail: "The user picks companies and fiscal years, or asks across the corpus. Filters are applied before retrieval, not after." },
      { id: "dense", col: 1, row: 0, label: "Dense search", sub: "Pinecone", tone: "data", detail: "OpenAI text-embedding-3-small (1536-dim) vectors in Pinecone, filtered to the requested scope." },
      { id: "bm25", col: 1, row: 2, label: "Keyword search", sub: "bm25s index", tone: "data", detail: "bm25s (k1=1.5, b=0.75) over a version-pinned, persisted index, with the same scope filter." },
      { id: "rrf", col: 2, row: 1, label: "RRF fusion", sub: "K=60, 10 per retriever", tone: "service", detail: "Reciprocal Rank Fusion combines the two ranked lists, taking 10 candidates from each retriever." },
      { id: "rerank", col: 3, row: 1, label: "Rerank", sub: "Cohere rerank-v4.0-fast", tone: "ai", detail: "Cohere reranks the fused candidates. If reranking fails or is rate-limited, the request falls back to hybrid top-5, still scope-filtered." },
      { id: "gen", col: 4, row: 1, label: "Grounded answer", sub: "gpt-5-nano, cited", tone: "ai", detail: "The model sees only the retrieved filing text. It cites each source and refuses when the evidence does not support an answer." },
    ],
    edges: [
      { from: "q", to: "dense" },
      { from: "q", to: "bm25" },
      { from: "dense", to: "rrf" },
      { from: "bm25", to: "rrf" },
      { from: "rrf", to: "rerank" },
      { from: "rerank", to: "gen" },
    ],
    steps: [
      { path: ["q"], caption: "A question arrives with an optional company and fiscal-year scope. An unsupported year returns a structured 422 instead of silently widening scope." },
      { path: ["q", "dense", "bm25"], caption: "Both retrievers run with the scope filter already applied, so out-of-scope text never enters the candidate set." },
      { path: ["dense", "rrf", "bm25"], caption: "Reciprocal Rank Fusion merges the semantic and keyword rankings (10 candidates each, K=60)." },
      { path: ["rrf", "rerank"], caption: "Cohere reranks the fused candidates. Comparison questions retrieve each scope separately and share one rerank." },
      { path: ["rerank", "gen"], caption: "The answer is generated from the retrieved evidence only, with citations back to the 10-K passage, or a refusal if the filings do not support it." },
    ],
  },

  alphabriefIngest: {
    title: "AlphaBrief: resumable filing ingestion",
    description: "SEC EDGAR filings are downloaded, cleaned, chunked, then embedded into Pinecone and registered with the keyword index.",
    source: "sec-rag-engine INGESTION.md",
    nodes: [
      { id: "sec", col: 0, row: 1, label: "SEC EDGAR", sub: "latest 10-K per company", tone: "external", detail: "Discovery and download, rate-limited by SEC_MAX_RPS (default 5, hard cap 10)." },
      { id: "clean", col: 1, row: 1, label: "Download\n+ clean", sub: "stages: downloaded, cleaned", tone: "service", detail: "Raw HTML and clean text are rebuildable artifacts. Each is hashed in the ledger." },
      { id: "chunk", col: 2, row: 1, label: "Chunk", sub: "serving artifact", tone: "data", detail: "Chunk JSONL is the SERVING artifact: if it is deleted the filing is no longer queryable through the keyword index and is re-chunked on the next run." },
      { id: "embed", col: 3, row: 0, label: "Embed + upsert", sub: "dense, Pinecone", tone: "ai", detail: "Embeddings are generated and upserted to Pinecone. Deterministic IDs mean a forced rebuild overwrites rather than duplicates." },
      { id: "bm25", col: 3, row: 2, label: "Register BM25", sub: "in-process index", tone: "data", detail: "The ingestion process reloads and verifies the keyword index. A separately running API must be restarted to pick up new filings." },
      { id: "done", col: 4, row: 1, label: "Registry + complete", sub: "every hard stage ok", tone: "service", detail: "The registry is updated and the filing is marked complete once every hard stage succeeded. The sparse index is a soft stage and may be skipped." },
    ],
    edges: [
      { from: "sec", to: "clean" },
      { from: "clean", to: "chunk" },
      { from: "chunk", to: "embed" },
      { from: "chunk", to: "bm25" },
      { from: "embed", to: "done" },
      { from: "bm25", to: "done" },
    ],
    steps: [
      { path: ["sec", "clean"], caption: "Discover and download the filing, then clean it to text. Each artifact's sha256 is recorded in the ledger." },
      { path: ["clean", "chunk"], caption: "Chunk the clean text. These chunk files are what serving depends on." },
      { path: ["chunk", "embed"], caption: "Embed and upsert dense vectors to Pinecone; this is live immediately, with no API restart." },
      { path: ["chunk", "bm25"], caption: "Register the chunks with the keyword index, which lives in the API process's memory." },
      { path: ["embed", "done", "bm25"], caption: "On a rerun, each completed stage's artifacts are re-validated (existence, size, JSONL integrity, count, hash) and work resumes at the earliest invalid stage. Writes are atomic: temp file, fsync, replace." },
    ],
  },

  tripSystem: {
    title: "TripPilot: system overview",
    description: "A Next.js client talks to a FastAPI service over REST and server-sent events; Celery workers run planning against PostgreSQL, Redis and provider adapters.",
    source: "trippilot-ai docs/ARCHITECTURE.md, 'Overall system'",
    nodes: [
      { id: "ui", col: 0, row: 1, label: "Next.js client", sub: "App Router", tone: "user", detail: "Sends REST requests and subscribes to run events over server-sent events." },
      { id: "api", col: 1, row: 1, label: "FastAPI", sub: "REST + SSE", tone: "service", detail: "Request IDs, security headers, CORS restricted to the web origin, and a request body size limit." },
      { id: "pg", col: 2, row: 0, label: "PostgreSQL", sub: "+ pgvector", tone: "data", detail: "Trips, revision-scoped artifacts, ordered run events and reservations." },
      { id: "redis", col: 2, row: 1, label: "Redis", sub: "streams, cache, broker", tone: "data", detail: "Stream and cache layer, and the broker for background work." },
      { id: "celery", col: 2, row: 2, label: "Celery worker", sub: "planning runs", tone: "service", detail: "Runs the planning, edit and booking workflows asynchronously and writes ordered run events." },
      { id: "prov", col: 3, row: 2, label: "Provider adapters", sub: "mock, test, Haversine", tone: "external", detail: "Typed adapters for flights, hotels, places, routes and weather. Capabilities declare search, revalidation, redirect, sandbox and live; live is always false." },
    ],
    edges: [
      { from: "ui", to: "api" },
      { from: "api", to: "pg" },
      { from: "api", to: "redis" },
      { from: "api", to: "celery" },
      { from: "celery", to: "pg", dashed: true },
      { from: "celery", to: "redis", dashed: true },
      { from: "celery", to: "prov" },
    ],
    steps: [
      { path: ["ui", "api"], caption: "The browser sends a trip request over REST and opens a server-sent-events stream for run progress." },
      { path: ["api", "celery"], caption: "The API enqueues the planning run on a Celery worker instead of planning inside the request." },
      { path: ["celery", "prov"], caption: "The worker calls provider adapters. Missing capabilities produce partial-result warnings rather than invented data." },
      { path: ["celery", "pg"], caption: "Ordered run events and the resulting plan are written to PostgreSQL, so a run can be replayed and the stream resumed with Last-Event-ID." },
    ],
  },

  tripPlanning: {
    title: "TripPilot: planning workflow",
    description: "A typed planning graph: parse and validate, search four domains in parallel, normalize, draft, route, verify with a bounded repair loop, then persist.",
    source: "trippilot-ai docs/ARCHITECTURE.md, 'Planning graph'",
    nodes: [
      { id: "parse", col: 0, row: 1, label: "Parse + validate", sub: "request, profile memories", tone: "service", detail: "parse_request, retrieve_profile_memories, validate_request. Extraction is a deterministic parser by default, with an optional LLM extractor behind the same interface; both must validate as a source-aware intent." },
      { id: "fl", col: 1, row: 0, label: "Flights", tone: "external", detail: "search_flights, run in parallel with the other searches." },
      { id: "ho", col: 1, row: 1, label: "Hotels", tone: "external", detail: "search_hotels." },
      { id: "pl", col: 1, row: 2, label: "Places", tone: "external", detail: "search_places. A venue is never treated as a dated event." },
      { id: "we", col: 1, row: 3, label: "Weather", sub: "best-effort", tone: "external", detail: "fetch_weather. Weather is best-effort in planning." },
      { id: "norm", col: 2, row: 1, label: "Bundle + draft", sub: "itinerary, travel times", tone: "service", detail: "normalize_candidates, select_trip_bundle, build_draft_itinerary, then calculate_routes. Without a routes key, Haversine estimates are used." },
      { id: "verify", col: 3, row: 1, label: "Verify", sub: "money, dates, offers", tone: "service", detail: "verify_itinerary checks budgets, timing, route fit and offer validity in code, not with the model." },
      { id: "repair", col: 3, row: 2, label: "Repair", sub: "capped at 2", tone: "service", detail: "If the plan is repairable, repair_itinerary runs and routes are recalculated. The loop is capped at two repairs." },
      { id: "persist", col: 4, row: 1, label: "Persist plan", sub: "finalize or warn", tone: "data", detail: "A valid plan is finalized; otherwise it is finalized with warnings. Either way it is saved as a revision." },
    ],
    edges: [
      { from: "parse", to: "fl" },
      { from: "parse", to: "ho" },
      { from: "parse", to: "pl" },
      { from: "parse", to: "we" },
      { from: "fl", to: "norm" },
      { from: "ho", to: "norm" },
      { from: "pl", to: "norm" },
      { from: "we", to: "norm" },
      { from: "norm", to: "verify" },
      { from: "verify", to: "repair" },
      { from: "repair", to: "norm", dashed: true },
      { from: "verify", to: "persist" },
    ],
    steps: [
      { path: ["parse"], caption: "The request is parsed into a typed intent and validated. Extraction cannot invent provider identifiers, prices, coordinates or availability." },
      { path: ["parse", "fl", "ho", "pl", "we"], caption: "Flights, hotels, places and weather are searched in parallel, using only the searches the intent requires." },
      { path: ["fl", "norm", "we"], caption: "Results are normalized into common offer and place types, and a trip bundle is selected." },
      { path: ["norm", "verify"], caption: "A draft itinerary is built and travel times are calculated." },
      { path: ["norm", "verify", "repair", "norm"], caption: "Verification runs in code. Repairable problems go through a repair loop that is capped at two attempts." },
      { path: ["verify", "persist"], caption: "A valid plan is finalized; an unrepaired one is finalized with warnings. Either is persisted as a new revision." },
    ],
  },

  tripEdit: {
    title: "TripPilot: incremental edits",
    description: "An edit is classified by the domains it affects; unaffected work is reused and only the affected steps are rebuilt, producing a new revision and a diff.",
    source: "trippilot-ai docs/ARCHITECTURE.md, 'Incremental-edit graph' and 'Revision model'",
    nodes: [
      { id: "edit", col: 0, row: 1, label: "Parse edit", sub: "classify affected domains", tone: "service", detail: "parse_edit then classify_affected_domains." },
      { id: "load", col: 1, row: 1, label: "Load revision", sub: "prior artifacts", tone: "data", detail: "load_revision_artifacts. Offers, places and itinerary days are revision-scoped." },
      { id: "reuse", col: 2, row: 0, label: "Reuse", sub: "domain unaffected", tone: "service", detail: "Emits a step.reused event and keeps the earlier results." },
      { id: "redo", col: 2, row: 2, label: "Re-search", sub: "affected steps only", tone: "external", detail: "Re-searches and rebuilds only the affected steps." },
      { id: "reasm", col: 3, row: 1, label: "Reassemble\n+ verify", tone: "service", detail: "Reassembles the itinerary and runs the same verification as planning." },
      { id: "rev", col: 4, row: 1, label: "Diff + new revision", sub: "added / removed / changed", tone: "data", detail: "Builds an item-level diff and persists a new revision. The active revision pointer moves; earlier revisions remain." },
    ],
    edges: [
      { from: "edit", to: "load" },
      { from: "load", to: "reuse" },
      { from: "load", to: "redo" },
      { from: "reuse", to: "reasm" },
      { from: "redo", to: "reasm" },
      { from: "reasm", to: "rev" },
    ],
    steps: [
      { path: ["edit", "load"], caption: "The edit is classified by which domains it touches (for example hotels but not flights), and the current revision's artifacts are loaded." },
      { path: ["load", "reuse"], caption: "Domains the edit did not touch are reused, with a step.reused event." },
      { path: ["load", "redo"], caption: "Only the affected domains are searched and rebuilt." },
      { path: ["reasm", "rev"], caption: "The itinerary is reassembled and verified, then saved as a new revision with an item-level diff." },
    ],
  },

  tripBooking: {
    title: "TripPilot: booking approval gate",
    description: "Selected offers are revalidated and previewed, then the workflow pauses until the user explicitly confirms a sandbox reservation.",
    source: "trippilot-ai docs/ARCHITECTURE.md, 'Booking approval graph' and 'Booking approval & idempotency'",
    nodes: [
      { id: "load", col: 0, row: 1, label: "Load offers", sub: "validate traveler", tone: "service", detail: "load_selected_offers and validate_traveler. Only traveler contact fields are required; no payment instruments." },
      { id: "reval", col: 1, row: 1, label: "Revalidate", sub: "offers still valid?", tone: "service", detail: "revalidate_selected_offers rechecks each offer before anything is shown for approval." },
      { id: "prev", col: 2, row: 1, label: "Preview", sub: "booking summary", tone: "service", detail: "create_booking_preview." },
      { id: "gate", col: 3, row: 1, label: "User approves?", sub: "waiting_approval", tone: "human", detail: "The graph pauses in waiting_approval until the user sends confirm and acknowledge_sandbox." },
      { id: "none", col: 4, row: 0, label: "No mutation", sub: "declined", tone: "service", detail: "If the user does not approve, no provider call that changes anything is made." },
      { id: "res", col: 4, row: 2, label: "Sandbox reservation", sub: "idempotent", tone: "external", detail: "Sandbox orders use deterministic idempotency keys, so re-approving or resuming is a no-op once rows exist. payment_processed stays false." },
    ],
    edges: [
      { from: "load", to: "reval" },
      { from: "reval", to: "prev" },
      { from: "prev", to: "gate" },
      { from: "gate", to: "none" },
      { from: "gate", to: "res" },
    ],
    steps: [
      { path: ["load", "reval"], caption: "Offers are revalidated before the user is asked to approve anything." },
      { path: ["prev", "gate"], caption: "A preview is shown and the workflow pauses. Nothing external changes while it waits." },
      { path: ["gate", "none"], caption: "Declining leaves every provider untouched." },
      { path: ["gate", "res"], caption: "Only an explicit confirmation plus a sandbox acknowledgment creates sandbox reservations. No real payments, ticketing, refunds or cancellations." },
    ],
  },

  alphabriefCi: {
    title: "AlphaBrief: test pipeline",
    description: "Pushes and pull requests run pytest on GitHub Actions with external services replaced by stubs.",
    source: "sec-rag-engine .github/workflows/tests.yml",
    nodes: [
      { id: "push", col: 0, row: 0, label: "Push / PR", sub: "main or pull request", tone: "user", detail: "The workflow runs on pushes to main and on every pull request." },
      { id: "ci", col: 1, row: 0, label: "GitHub Actions", sub: "Ubuntu, Python 3.12", tone: "service", detail: "Installs dependencies and runs the test suite." },
      { id: "tests", col: 2, row: 0, label: "pytest", sub: "362 tests", tone: "service", detail: "Scope filtering, cross-year and cross-company isolation, numeric-year attribution and reranker fallback are covered by structural tests." },
      { id: "stubs", col: 2, row: 1, label: "Stubbed APIs", sub: "no real calls", tone: "external", detail: "OpenAI, Cohere and Pinecone are patched at the retrieval seam, so CI never calls a paid service. The placeholder keys are not secrets." },
    ],
    edges: [
      { from: "push", to: "ci" },
      { from: "ci", to: "tests" },
      { from: "stubs", to: "tests", dashed: true, label: "patched" },
    ],
    steps: [
      { nodes: ["push", "ci", "tests"], caption: "Every push and pull request installs dependencies and runs the full suite." },
      { nodes: ["stubs", "tests"], caption: "External services are patched out, so tests are fast, free and deterministic." },
    ],
  }
};
