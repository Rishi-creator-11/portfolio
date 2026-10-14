// Technology-by-project evidence map. A cell exists only where the project's own source or docs show it.
export const evidenceProjects = [
  { id: "alphabrief", label: "AlphaBrief" },
  { id: "trippilot", label: "TripPilot" },
  { id: "jobscout", label: "Job Scout" },
  { id: "computer-use", label: "Computer-use agent" },
  { id: "metroprint", label: "MetroPrint" },
  { id: "pencil", label: "Pencil / Mario" },
];

export const evidenceRows = [
  {
    skill: "Model and LLM APIs",
    cells: {
      alphabrief: "OpenAI embeddings and answers, Cohere rerank, LLM-assisted relevance judging",
      trippilot: "Optional LLM request extractor behind a deterministic default",
      jobscout: "OpenAI or Anthropic scoring, tailoring and outreach drafts",
      "computer-use": "Anthropic API decider (recorded runs used a Claude Code relay)",
    },
  },
  {
    skill: "Retrieval and RAG",
    cells: { alphabrief: "Pinecone dense search and bm25s fused with RRF, reranked, scope-filtered before retrieval" },
  },
  {
    skill: "Python services",
    cells: {
      alphabrief: "FastAPI retrieval and generation API",
      trippilot: "FastAPI, Pydantic, SQLAlchemy async, Celery workers",
      jobscout: "FastAPI app with chat-command handlers",
      "computer-use": "Playwright automation, Pydantic artifact schema",
    },
  },
  {
    skill: "TypeScript, React, Next.js",
    cells: {
      alphabrief: "Next.js interface with scope controls and an evidence panel",
      trippilot: "Next.js App Router workspace with live progress",
      metroprint: "Next.js storefront and admin workspace",
      pencil: "React apps on a shared UI library (Word Mat, Polls, Timer and more)",
    },
  },
  {
    skill: "Databases and queues",
    cells: {
      alphabrief: "Pinecone vector indexes",
      trippilot: "PostgreSQL with pgvector, Redis, Celery",
      jobscout: "Supabase",
      metroprint: "Supabase (Postgres, Auth, Storage)",
    },
  },
  {
    skill: "Real-time and streaming",
    cells: {
      trippilot: "Server-sent events with Last-Event-ID replay",
      pencil: "RxJS shared state synchronized across participants (résumé: Yjs, WebSockets)",
    },
  },
  {
    skill: "Testing and CI",
    cells: {
      alphabrief: "362 backend tests on GitHub Actions with external services stubbed",
      trippilot: "API, web and Playwright regression tests",
      metroprint: "Automated tests around pricing and checkout",
      pencil: "GitHub Actions build, test and publish pipeline (résumé-reported)",
    },
  },
  {
    skill: "Human approval and escalation",
    cells: {
      trippilot: "Explicit approval before any sandbox reservation",
      jobscout: "Approval before any outward action",
      "computer-use": "Escalation to an operator when the agent is stuck",
    },
  },
  {
    skill: "Evaluation",
    cells: { alphabrief: "125-question retrieval benchmark and structural scope-isolation tests" },
  },
];
