import { projectContent, marioProject, workContent, minimal, xp, cardSpec, homeExperience, aboutLead } from "./content.js";
export const person = {
  name: "Rishi",
  legal: "Hrishit Kumar",
  email: "hrishitkumar.cs@gmail.com",
  phone: "(914) 446-0465",
  linkedin: "https://www.linkedin.com/in/rishi1111",
  github: "https://github.com/Rishi-creator-11",
  resume: "/Rishi_Kumar_Resume.pdf",
  location: "New York, NY",
};

export const stats = [
  { value: 0.88, decimals: 2, label: "MRR on a 125-question retrieval benchmark", tone: "cyan" },
  { value: 10, suffix: "K", label: "messages per second buffered through Kafka", tone: "amber" },
  { value: 100, prefix: "<", suffix: "ms", label: "state-update latency, down from ~500ms", tone: "cyan" },
  { value: 97, prefix: "~", label: "configurable products shipped for a print shop", tone: "amber" },
];

/* Diagram nodes: x,y are top-left in a 900x320 canvas. tone: core | store | edge */
export const projects = [
  {
    id: "alphabrief",
    cats: ["AI/LLM", "Backend"],
    year: "2026",
    name: "AlphaBrief",
    why: "I've always been into markets, and I got tired of AI answers about companies that sounded confident but came from nowhere. I wanted answers I could actually check, straight from the 10-K. So I built AlphaBrief, then spent most of my time trying to break it. It has 19 golden test cases, like 'did it catch Micron's HBM story' or 'did it flag Apple's tariff risk', plus 8 cases built to fail on purpose, like an inventory quote pretending to back up a claim about export controls. Every PR gets checked against them, and a live eval runs every night.",
    plain: "Research any public company at the speed of a question. Every claim backed by the filing itself.",
    simple: "Hybrid RAG over SEC filings · Pinecone + BM25 + Cohere rerank · cited answers · 0.88 MRR",
    tagline: "Research SEC 10-K filings and get answers that cite the filing.",
    status: "Live",
    period: "Apr 2026 – Present",
    headline: { value: "0.88", label: "MRR" },
    summary:
      "Ask a question about a public company and get a multi-year answer with citations back to the exact filing text. Retrieval is the hard part, so most of the work went into measuring it.",
    metrics: [
      { v: "0.88", l: "MRR" },
      { v: "0.70", l: "Recall@10" },
      { v: "0.62", l: "Precision@5" },
      { v: "−74%", l: "answer latency (7.6s to 2.0s)" },
      { v: "4,262", l: "chunks indexed" },
      { v: "320", l: "automated tests" },
    ],
    bullets: [
      "Hybrid retriever: Pinecone dense search plus BM25, merged with rank fusion and reranked by Cohere. Scored on a 125-question benchmark.",
      "Resumable SEC EDGAR ingestion with index-parity checks, so a crashed run picks up where it stopped instead of reprocessing filings.",
      "FastAPI filters by ticker and year before generation, so a comparison covers every company asked about and nothing leaks across companies or years.",
      "Cut median answer time from 7.6s to 2.0s (p95 from 19.5s to 5.4s) by bounding output tokens.",
    ],
    stack: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "Alembic", "PostgreSQL", "pgvector", "Pinecone", "BM25", "Cohere Rerank", "OpenAI", "Redis", "BeautifulSoup", "yfinance", "SEC EDGAR", "Pytest", "Next.js", "React", "TypeScript", "Playwright", "Vitest"],
    links: [
      { label: "Live demo", href: "https://secfrontend.vercel.app/" },
      { label: "Code", href: "https://github.com/Rishi-creator-11/Alphabrief" },
    ],
    images: ["/projects/alphabrief-hero.webp", "/projects/alphabrief-panel.webp"],
    diagram: {
      nodes: [
        { id: "edgar", x: 10, y: 132, label: "SEC EDGAR", sub: "10-K filings", tone: "edge" },
        { id: "ingest", x: 190, y: 132, label: "Ingestion", sub: "resumable, parity-checked", tone: "core" },
        { id: "dense", x: 380, y: 48, label: "Dense search", sub: "Pinecone", tone: "store" },
        { id: "bm25", x: 380, y: 216, label: "BM25", sub: "keyword match", tone: "store" },
        { id: "fuse", x: 570, y: 132, label: "Fusion + rerank", sub: "Cohere", tone: "core" },
        { id: "answer", x: 750, y: 132, label: "Scoped answer", sub: "ticker/year filter, citations", tone: "edge" },
      ],
      edges: [
        ["edgar", "ingest"],
        ["ingest", "dense"],
        ["ingest", "bm25"],
        ["dense", "fuse"],
        ["bm25", "fuse"],
        ["fuse", "answer"],
      ],
    },
  },
  {
    id: "chat",
    cats: ["Distributed", "Backend"],
    year: "2025",
    name: "Distributed Chat Platform",
    tagline: "Real-time chat that stays up when one server dies and absorbs traffic spikes.",
    status: "Deployed on AWS",
    period: "Sep 2025 – Dec 2025",
    headline: { value: "10K/s", label: "msgs via Kafka" },
    summary:
      "A chat system built across several servers instead of one. Messages fan out between instances in real time, and the database is kept off the hot path so a burst of writes can't slow delivery down.",
    metrics: [
      { v: "3", l: "Go Fiber instances" },
      { v: "100", l: "WebSocket connections per room" },
      { v: "10K/s", l: "messages buffered through Kafka" },
    ],
    bullets: [
      "Runs chat across 3 Go Fiber instances behind Nginx, syncing 100 WebSocket connections per room through Redis pub/sub.",
      "Kafka absorbs up to 10,000 messages per second. A consumer batches writes into Postgres so the database stays off the write-hot path.",
      "Dockerized stack deployed to AWS (EC2, S3) with Terraform and GitHub Actions CI/CD. Only a TLS-terminated Nginx proxy is exposed.",
    ],
    stack: ["Go", "Fiber", "WebSockets", "Redis", "Kafka", "PostgreSQL", "Nginx", "Docker", "Terraform", "AWS"],
    links: [],
    images: [],
    diagram: {
      nodes: [
        { id: "clients", x: 10, y: 48, label: "Clients", sub: "WebSocket", tone: "edge" },
        { id: "nginx", x: 190, y: 48, label: "Nginx", sub: "TLS proxy", tone: "edge" },
        { id: "fiber", x: 380, y: 48, label: "Go Fiber ×3", sub: "100 conns per room", tone: "core" },
        { id: "redis", x: 380, y: 216, label: "Redis pub/sub", sub: "syncs instances", tone: "store" },
        { id: "kafka", x: 570, y: 48, label: "Kafka", sub: "10K msgs/sec buffer", tone: "core" },
        { id: "consumer", x: 570, y: 216, label: "Batch consumer", sub: "grouped writes", tone: "core" },
        { id: "pg", x: 750, y: 216, label: "PostgreSQL", sub: "off the hot path", tone: "store" },
      ],
      edges: [
        ["clients", "nginx"],
        ["nginx", "fiber"],
        ["fiber", "redis"],
        ["fiber", "kafka"],
        ["kafka", "consumer"],
        ["consumer", "pg"],
      ],
    },
  },
  {
    id: "callpilot",
    cats: ["AI/LLM", "Full-Stack", "Backend"],
    year: "2026",
    name: "CallPilot",
    why: "It started with a conversation with a business owner. He was spending real time and money on people just to answer his phones, and he kept having to replace them. Some never really got the business. Some were just there for the paycheck. That stuck with me. So I started building CallPilot: an AI assistant that actually knows the business and sounds like someone who cares about it. If someone's going to sell your product, they should love it first.",
    plain: "Answers your phone like it belongs to your business. Knows it inside out, and never says anything wrong or off-topic.",
    simple: "AI voice assistant · Vapi + FastAPI + Supabase pgvector · semantic retrieval with confidence thresholds · Stripe billing",
    tagline: "A multi-business AI phone assistant that answers only from what the owner approved.",
    status: "Supervised pilot",
    period: "Nov 2026 – Present",
    headline: { value: "220+", label: "API endpoints" },
    summary:
      "Businesses approve their own facts, and the voice agent answers from those and nothing else. It also books appointments, captures leads, and bills by monthly call minutes.",
    metrics: [
      { v: "220+", l: "FastAPI endpoints" },
      { v: "280+", l: "pytest cases in CI" },
      { v: "36", l: "Supabase migrations" },
      { v: "240s", l: "hard per-call cap" },
    ],
    bullets: [
      "Built a FastAPI + Supabase (Postgres, row-level security) voice-agent platform on Vapi with 220+ REST endpoints across isolated business workspaces.",
      "Engineered pgvector semantic FAQ retrieval (gte-small embeddings, similarity and margin thresholds) that returns only owner-approved answers, so the agent never invents prices or bookings.",
      "Integrated Stripe subscriptions (signed webhooks, usage ledger, 80/95/100% alerts) and Google Calendar OAuth booking, enforcing monthly minute allowances and a 240-second per-call limit.",
      "Automated onboarding with an SSRF-safe website and PDF importer, backed by 36 Supabase migrations, 280+ pytest cases and GitHub Actions CI with live read-only smoke tests.",
    ],
    stack: ["Python", "FastAPI", "Uvicorn", "Pydantic", "httpx", "Supabase", "PostgreSQL", "pgvector", "Vapi", "ElevenLabs", "OpenAI", "Stripe", "Google Calendar API", "Pytest", "Render", "GitHub Actions"],
    links: [{ label: "Code", href: "https://github.com/Rishi-creator-11/callpilot" }],
    images: ["/projects/callpilot-og.png"],
    diagram: {
      nodes: [
        { id: "caller", x: 10, y: 132, label: "Caller", sub: "phone", tone: "edge" },
        { id: "vapi", x: 190, y: 132, label: "Vapi voice", sub: "speech in and out", tone: "store" },
        { id: "api", x: 380, y: 132, label: "FastAPI", sub: "webhooks, tool calls", tone: "core" },
        { id: "policy", x: 570, y: 48, label: "Approved facts", sub: "pgvector match", tone: "core" },
        { id: "db", x: 570, y: 216, label: "Supabase", sub: "RLS per business", tone: "store" },
        { id: "owner", x: 750, y: 132, label: "Owner app", sub: "approve, billing, calls", tone: "edge" },
      ],
      edges: [
        ["caller", "vapi"],
        ["vapi", "api"],
        ["api", "policy"],
        ["api", "db"],
        ["policy", "owner"],
        ["db", "owner"],
      ],
    },
  },
  {
    id: "agent-release-lab",
    cats: ["AI/LLM", "Full-Stack"],
    year: "2026",
    name: "Agent Release Lab",
    tagline: "A release gate for LLM agents: versioned test suites, deterministic graders, named regressions.",
    status: "Fixture mode",
    period: "Nov 2026",
    headline: { value: "30", label: "eval cases" },
    summary:
      "An adapted fork of an open-source LLM evaluation dashboard. I added a repeatable way to decide whether a new prompt version is safe to ship, and to name exactly which cases got worse.",
    metrics: [
      { v: "30", l: "synthetic business-agent cases" },
      { v: "2", l: "prompt versions, same dataset" },
      { v: "≥90%", l: "pass rate to release" },
      { v: "100%", l: "secret-refusal required" },
    ],
    bullets: [
      "Added a versioned suite of 30 synthetic support-agent cases covering JSON schema, grounded answers, tool selection, escalation and refusal to leak canary secrets.",
      "Wrote deterministic graders (strict JSON, exact tool name and arguments, required and forbidden facts, canary-leak detection) with no model judge and no text-overlap scoring.",
      "Built a release gate (≥90% pass, 100% secret refusal, at most one regression) and a /lab page that shows the verdict, per-case checks and the regressed cases by name.",
      "Locked public mode so visitors explore recorded runs only; live runs are capped and need a server-side key.",
    ],
    stack: ["TypeScript", "Next.js", "LLM evaluation", "Groq", "Gemini"],
    links: [
      { label: "Code", href: "https://github.com/Rishi-creator-11/LLM-Eval-Dashboard" },
      { label: "Upstream", href: "https://github.com/nakshaatraa/LLM-Eval-Dashboard" },
    ],
    images: [],
  },
  {
    id: "invoice-review",
    cats: ["AI/LLM", "Backend"],
    year: "2026",
    name: "Vendor Invoice Review",
    tagline: "Document AI that reconciles invoices against purchase orders and routes mismatches to a human.",
    status: "Fork with extensions",
    period: "Nov 2026",
    headline: { value: "20", label: "new tests" },
    summary:
      "An adapted fork of an open-source OCR and document-decision demo. I added purchase-order matching so a wrong quantity or total can't slip through, even if the model says it looks fine.",
    metrics: [
      { v: "63", l: "tests (43 upstream + 20 new)" },
      { v: "1¢", l: "total tolerance, Decimal math" },
      { v: "2", l: "original synthetic fixtures" },
    ],
    bullets: [
      "Added purchase-order reconciliation that compares supplier, PO number, quantities, unit prices and totals with Decimal arithmetic, keeping expected value, observed value and evidence for each check.",
      "Added a deterministic review rule: any mismatch routes the invoice to review with concrete reasons, and the LLM cannot override a failed rule.",
      "Added a write-once reviewer decision with timestamp and reason, plus public-demo controls: sandbox-token uploads, size and magic-byte validation, ephemeral files and per-IP caps.",
      "Fixed two upstream security issues found while adapting it: the SQLite database was publicly downloadable and document deletion was unauthenticated.",
    ],
    stack: ["Python", "FastAPI", "React", "Vite", "OCR", "OpenRouter", "Docker"],
    links: [
      { label: "Code", href: "https://github.com/Rishi-creator-11/doc-approval-demo" },
      { label: "Upstream", href: "https://github.com/madebyagents/doc-approval-demo" },
    ],
    images: [],
  },
  {
    id: "inventory-ops",
    cats: ["AI/LLM", "Full-Stack", "Backend"],
    year: "2026",
    name: "Inventory Ops Copilot",
    tagline: "An ERP agent that proposes reorders but can't write anything until a manager confirms.",
    status: "Fork with extensions",
    period: "Nov 2026",
    headline: { value: "409", label: "on duplicate confirm" },
    summary:
      "An adapted fork of an open-source, chat-driven ERP. I added a low-stock reorder workflow where the AI drafts and a human approves, with audit events and protection against double-submitting.",
    metrics: [
      { v: "1×", l: "confirm per proposal (atomic claim)" },
      { v: "8", l: "seeded print-supply items" },
      { v: "0", l: "shared-data writes from public sandbox" },
    ],
    bullets: [
      "Built an approval-gated reorder plugin that reads stock and open purchase orders, drafts quantities rounded to pack size with a per-line justification, and writes only after explicit confirmation.",
      "Added duplicate-confirmation protection with an atomic claim: a second confirm returns 409 with the original order, and stale proposals are refused.",
      "Logged every proposal, confirmation and denial as an audit event, reusing upstream role checks and document lifecycle hooks instead of bypassing them.",
      "Replaced the upstream shared-writer public demo with session-scoped sandboxes and per-session and hourly caps.",
    ],
    stack: ["Python", "FastAPI", "React", "TypeScript", "LLM tool calling", "Docker"],
    links: [
      { label: "Code", href: "https://github.com/Rishi-creator-11/lambda-erp" },
      { label: "Upstream", href: "https://github.com/lambdadevelopment/lambda-erp" },
    ],
    images: [],
  },
  {
    id: "quoteatlas",
    cats: ["AI/LLM", "Full-Stack"],
    year: "2026",
    name: "QuoteAtlas",
    tagline: "Upload supplier quotations, extract the terms with Claude, and compare offers side by side.",
    status: "In development",
    period: "Nov 2026",
    headline: { value: "5", label: "quotes compared" },
    summary:
      "A workspace for comparing supplier quotes. Missing costs are flagged instead of quietly treated as zero, so the cheapest-looking quote isn't cheaper by accident.",
    metrics: [
      { v: "5", l: "quotes side by side" },
      { v: "15+", l: "fields extracted per quote" },
      { v: "RLS", l: "owner-scoped storage" },
    ],
    bullets: [
      "Built AI extraction of supplier, unit price, quantity, freight, duties, taxes, fees, Incoterms, payment terms, lead time and warranty from uploaded quotations.",
      "Compares up to five quotes side by side and warns on missing cost components rather than calculating them as zero.",
      "Stores files in private Supabase Storage with owner-scoped row-level security and short-lived signed links, with Stripe subscriptions and trial quotas.",
    ],
    stack: ["TypeScript", "Next.js", "React", "Claude API", "Supabase", "Stripe", "Resend", "Zod", "pdf-lib", "Cloudflare", "Playwright", "Vitest"],
    links: [],
    images: [],
  },
];

export const work = [
  {
    id: "metroprint",
    name: "MetroPrint USA",
    role: "Contract Full-Stack Engineer",
    place: "New York, NY",
    period: "Jul – Sep 2026",
    headline: { value: "~97", label: "products" },
    summary:
      "Turned a print-shop owner's day-to-day workflows into a production web platform that customers can order from.",
    metrics: [
      { v: "~97", l: "configurable products" },
      { v: "80", l: "products ingested" },
      { v: "559", l: "exact-combination pricing rows" },
    ],
    bullets: ["Turned a print shop's daily workflow into a live ordering site with Claude Code.", "Loaded 80 products and 559 price combos, so checkout totals always match."],
    short: {"co": "MetroPrint", "role": "Full-Stack Engineer (Contract)", "loc": "New York, NY", "stats": [{"v": "~97", "l": "products"}, {"v": "559", "l": "price rows"}, {"v": "80", "l": "products loaded"}]},
    stack: ["Next.js", "TypeScript", "Supabase", "Claude Code"],
    links: [],
  },
  {
    id: "pencil",
    name: "Pencil Learning Technologies",
    role: "Software Engineer Intern",
    place: "San Francisco, CA",
    period: "Jun – Aug 2025",
    headline: { value: "<100ms", label: "from ~500ms" },
    summary:
      "Worked on the sync layer of Mario, a TypeScript SDK that keeps shared state consistent across everyone using an embedded app.",
    metrics: [
      { v: "<100ms", l: "state updates, from ~500ms" },
      { v: "−30%", l: "cross-client state drift" },
      { v: "10+", l: "apps integrated" },
      { v: "−15%", l: "release cycle time" },
    ],
    bullets: ["Built the sync engine for Mario, a published TypeScript SDK.", "Made live updates 5x faster and stopped lost edits with CRDTs."],
    short: {"co": "Pencil Spaces", "role": "SWE Intern", "loc": "San Francisco, CA", "stats": [{"v": "<100ms", "l": "updates, was ~500ms"}, {"v": "10+", "l": "apps integrated"}, {"v": "−30%", "l": "state drift"}]},
    stack: ["TypeScript", "Yjs (CRDT)", "JSON Patch", "GitHub Actions", "Docker", "npm"],
    links: [{ label: "Mario SDK on npm", href: "https://www.npmjs.com/package/@pncl/mario" }],
  },
  {
    id: "vip",
    name: "Vertically Integrated Program",
    role: "Software Engineer Intern",
    place: "Stony Brook, NY",
    period: "Aug – Dec 2024",
    headline: { value: "500+", label: "users" },
    summary: "A fintech app built by a team of 10, with secure money transfers and real users.",
    metrics: [{ v: "500+", l: "users" }, { v: "10", l: "person team" }, { v: "+30%", l: "transaction transparency" }],
    bullets: ["Built a fintech app with a team of 10 using React, Node.js and AWS, used by 500+ people.", "Wired up Plaid and Dwolla so users could link banks and move money securely."],
    short: {"co": "Stony Brook VIP", "role": "SWE Intern", "loc": "Stony Brook, NY", "stats": [{"v": "500+", "l": "users"}, {"v": "10", "l": "person team"}, {"v": "+30%", "l": "transaction transparency"}]},
    stack: ["React", "Node.js", "AWS EC2 / Lambda", "Plaid", "Dwolla", "Jest", "Postman"],
    links: [],
  },
  {
    id: "99yards",
    name: "99 Yards",
    role: "Software Engineer Intern",
    place: "New York, NY",
    period: "Jun – Aug 2024",
    headline: { value: "+25%", label: "hit-rate@10" },
    summary: "A recommender system and the data pipelines that keep it fresh.",
    metrics: [
      { v: "+25%", l: "offline hit-rate@10 vs. popularity" },
      { v: "1h→5min", l: "feature freshness lag" },
    ],
    bullets: ["Built a two-tower recommender in TensorFlow.", "Sped up data pipelines so recommendations stay fresh."],
    short: {"co": "99 Yards", "role": "SWE Intern", "loc": "New York, NY", "stats": [{"v": "+25%", "l": "hit-rate@10"}, {"v": "1h→5m", "l": "data freshness"}]},
    stack: ["TensorFlow", "Node.js", "PostgreSQL", "Data pipelines"],
    links: [],
  },
  {
    id: "geico",
    name: "GEICO",
    role: "Software Engineer Externship Program",
    place: "New York, NY",
    period: "Mar 2024 – Mar 2025",
    headline: { value: "12 mo", label: "externship" },
    summary: "A year-long externship, mentored by a GEICO engineering leader on system design.",
    metrics: [{ v: "12 mo", l: "1:1 mentorship" }],
    bullets: ["Mentored for a full year by Suresh Vasan, Senior Manager of Staff Software Engineering.", "Did system design reviews together on GEICO's production systems, talking through architecture tradeoffs."],
    short: {"co": "GEICO", "role": "SWE Extern", "loc": "New York, NY", "stats": [{"v": "12 mo", "l": "1:1 mentorship"}, {"v": "Prod", "l": "system design reviews"}]},
    stack: ["System design", "Architecture reviews", "Production systems"],
    links: [],
  },
  {
    id: "ta",
    name: "Stony Brook University",
    role: "Teaching Assistant, Java and Data Structures",
    place: "Stony Brook, NY",
    period: "Aug 2024 – May 2025",
    headline: { value: "200+", label: "submissions" },
    summary: "Taught recitations and reviewed student code.",
    metrics: [
      { v: "30+", l: "students per recitation group" },
      { v: "200+", l: "submissions reviewed" },
    ],
    bullets: ["Led weekly Java recitations for 30+ students.", "Reviewed 200+ data structures assignments and helped students debug their code."],
    short: {"co": "Stony Brook", "role": "Teaching Assistant", "loc": "Stony Brook, NY", "stats": [{"v": "30+", "l": "students/week"}, {"v": "200+", "l": "submissions reviewed"}]},
    stack: ["Java", "Data structures"],
    links: [],
  },
];

export const featured = ["callpilot", "alphabrief", "mario-sdk"];

// Layer the rewritten presentation fields on top of the original data.
projects.splice(1, 0, marioProject);
projects.forEach((p) => Object.assign(p, projectContent[p.id] || {}));
work.forEach((w) => Object.assign(w, workContent[w.id] || {}));
projects.forEach((p) => Object.assign(p, minimal[p.id] || {}));
work.forEach((w) => { if (xp[w.id]) w.xp = xp[w.id]; });
projects.forEach((p) => { if (cardSpec[p.id]) p.card = cardSpec[p.id]; });
// About page: the exact homepage accomplishment opens each role, followed by the remaining detail.
work.forEach((w) => {
  const lead = aboutLead[w.id], home = homeExperience.find((h) => h.id === w.id);
  if (lead && home && w.xp) w.xp = [home.text, ...lead.keep.map((i) => w.xp[i]).filter(Boolean)];
});

// Each project lives in exactly one category, so the filter counts add up to the total.
const PRIMARY_CATEGORY = {
  callpilot: "AI/LLM", alphabrief: "AI/LLM", "agent-release-lab": "AI/LLM",
  "invoice-review": "Backend", "inventory-ops": "Backend",
  quoteatlas: "Full-Stack",
  chat: "Distributed", "mario-sdk": "Distributed",
};
projects.forEach((p) => { if (PRIMARY_CATEGORY[p.id]) p.cats = [PRIMARY_CATEGORY[p.id]]; });

export const categories = ["All", "AI/LLM", "Backend", "Full-Stack", "Distributed"];

export const skills = [
  { group: "Languages", items: ["Python", "TypeScript", "Java", "JavaScript", "SQL", "Go"] },
  { group: "Backend and data", items: ["REST APIs", "Microservices", "Distributed systems", "Data pipelines", "PostgreSQL", "Redis", "Supabase", "WebSockets"] },
  { group: "AI and LLM", items: ["Claude Code", "Agentic AI", "RAG", "Retrieval and extraction pipelines", "LLM evaluation", "Pinecone", "Cohere"] },
  { group: "Cloud and DevOps", items: ["AWS (EC2, RDS, S3)", "Docker", "Terraform", "GitHub Actions CI/CD", "Vercel", "Linux", "Git"] },
];

export const education = {
  school: "Stony Brook University",
  degree: "B.S. in Computer Science, specialized in Artificial Intelligence and Data Science",
  grad: "2022 – 2026, graduated May 2026",
  gpa: "3.6 / 4.0",
  location: "Stony Brook, Long Island, New York",
  years: "2022 – 2026",
  awards: [
    { name: "Dean's List, 6 semesters", why: "Recognized for top academic standing across six semesters." },
    { name: "Far Beyond Scholarship", why: "Awarded for strong academic performance at Stony Brook, and for maintaining it." },
    { name: "Grumman Engineering Scholarship", why: "Recognized for internships, projects I built, and involvement in the department." },
  ],
};
