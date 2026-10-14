// Technology-by-project evidence map. Scope: résumé projects plus TripPilot. A cell exists only where the
// résumé or the project's own source or docs show it.
export const evidenceProjects = [
  { id: "alphabrief", label: "AlphaBrief" },
  { id: "trippilot", label: "TripPilot" },
  { id: "metroprint", label: "MetroPrint" },
  { id: "pencil", label: "Pencil / Mario" },
  { id: "distributed", label: "Distributed Systems" },
];

export const evidenceRows = [
  {
    skill: "Model and LLM APIs",
    cells: {
      alphabrief: "OpenAI embeddings and answers, Cohere rerank, LLM-assisted relevance judging",
      trippilot: "Optional LLM request extractor behind a deterministic default",
      metroprint: "Claude Code for AI-assisted development (the product itself has no model calls)",
    },
  },
  {
    skill: "Retrieval and RAG",
    cells: { alphabrief: "Pinecone dense search and bm25s fused with RRF, reranked, scope-filtered before retrieval" },
  },
  {
    skill: "Python backends",
    cells: {
      alphabrief: "FastAPI retrieval and generation API",
      trippilot: "FastAPI, Pydantic, SQLAlchemy async, Celery workers",
    },
  },
  {
    skill: "TypeScript and Next.js",
    cells: {
      alphabrief: "Next.js interface with scope controls and an evidence panel",
      trippilot: "Next.js App Router workspace with live progress",
      metroprint: "Next.js and TypeScript ordering platform",
      pencil: "A published TypeScript SDK",
    },
  },
  {
    skill: "Data stores and queues",
    cells: {
      alphabrief: "Pinecone vector indexes",
      trippilot: "PostgreSQL with pgvector, Redis, Celery",
      metroprint: "Supabase",
      distributed: "Redis pub/sub and Kafka",
    },
  },
  {
    skill: "Real-time and sync",
    cells: {
      trippilot: "Server-sent events with Last-Event-ID replay",
      pencil: "JSON Patch diffs and Yjs CRDT merging",
      distributed: "WebSocket chat across three instances",
    },
  },
  {
    skill: "Testing and CI/CD",
    cells: {
      alphabrief: "362 backend tests on GitHub Actions with external services stubbed",
      trippilot: "API, web and Playwright regression tests",
      pencil: "GitHub Actions and Docker build, test and npm publish",
      distributed: "Terraform and GitHub Actions delivery to AWS",
    },
  },
  {
    skill: "Human approval controls",
    cells: { trippilot: "Explicit approval before any sandbox reservation" },
  },
  {
    skill: "Evaluation",
    cells: { alphabrief: "125-question retrieval benchmark and structural scope-isolation tests" },
  },
];
