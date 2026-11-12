/* Blog posts. Body is an array of blocks: { p }, { h }, { ul: [] }, { code }. */
export const posts = [
  {
    slug: "how-callpilot-works",
    title: "How CallPilot works: a multi-tenant AI phone assistant",
    date: "2026-11-12",
    tags: ["CallPilot", "FastAPI", "pgvector", "Supabase", "Vapi", "Stripe"],
    excerpt:
      "The engineering behind a phone assistant that answers from owner-approved knowledge, keeps businesses isolated from each other, and books appointments without double-booking.",
    body: [
      { p: "CallPilot is a platform where a business approves its own knowledge, and a phone assistant answers callers from that knowledge, captures leads, and books appointments through a connected calendar. It is at the supervised-pilot stage. This is how it is built and why." },
      { h: "The engineering problem" },
      { p: "A phone assistant that improvises will quote wrong prices, claim bookings that never happened, or surface one business's information to another. So the work is mostly about three questions: when is retrieved knowledge reliable enough to say out loud, how are businesses kept isolated, and how do booking and billing stay correct when calls retry or providers fail." },
      { h: "Architecture" },
      { diagram: "callpilot" },
      { p: "A caller reaches a Vapi voice agent, which calls tool webhooks on a FastAPI backend. The backend resolves which business the call belongs to, retrieves approved knowledge from Supabase Postgres with pgvector, and either answers from it or falls back. Bookings go to Google Calendar, and call minutes feed a usage ledger tied to Stripe subscriptions." },
      { h: "Answering only from approved knowledge" },
      { p: "Each approved fact is embedded with gte-small and stored in pgvector. When a caller asks something, the best match has to clear a similarity threshold and beat the runner-up by a margin, and candidates are re-ranked by term overlap and intent. If two approved answers are close, the question is ambiguous, so the assistant asks or escalates instead of picking one. If nothing clears the bar, the lookup returns nothing, which is better than an estimate for something like a price." },
      { p: "The trade-off is that the assistant refuses more often than a free-form model would. For a business that is the right default. The thresholds are still provisional and need calibrating against real calls." },
      { h: "Keeping businesses isolated" },
      { p: "Every record carries an organization ID, tables deny direct client access, and the FastAPI backend checks workspace membership on every request (owner, admin or viewer). Voice webhooks get the same treatment: each call's assistant is verified against the workspace it claims, and a mismatch is rejected. Isolation is enforced on the server and does not depend on the voice provider behaving." },
      { h: "Booking without double-booking" },
      { p: "Google Calendar OAuth scheduling covers free/busy checks and creating, rescheduling and cancelling events. Each booking request carries an idempotency key derived from the workspace, call, start time, duration, name and service, so a retried tool call returns the original result and a taken slot returns a conflict." },
      { h: "Billing and usage controls" },
      { p: "Stripe subscriptions use signature-verified webhooks that are de-duplicated by event ID. Call minutes are tracked in a usage ledger with 80, 95 and 100 percent alerts, inbound calls are blocked once a workspace's allowance is spent, and a 240-second per-call cap is enforced through the voice provider." },
      { h: "Quality and results" },
      { ul: [
        "220+ FastAPI endpoints across isolated business workspaces.",
        "280+ pytest cases and 36 Supabase migrations, with CI that includes live read-only smoke tests.",
        "An SSRF-safe website and PDF importer for onboarding a business's existing content.",
      ] },
      { h: "What is next" },
      { p: "The next step is measuring the assistant on supervised real calls: task completion, response latency and unsupported-answer rate. Until that data exists, I would rather say what the system is designed to do than claim results it has not been measured on." },
    ],
  },
  {
    slug: "alphabrief-end-to-end",
    title: "AlphaBrief end to end: retrieval, scope control and evaluation",
    date: "2026-11-12",
    tags: ["AlphaBrief", "RAG", "Pinecone", "BM25", "Cohere", "Evaluation"],
    excerpt:
      "How a question about a public company becomes a cited answer, and how I measured each part of the pipeline.",
    body: [
      { p: "AlphaBrief answers questions about public companies from their SEC 10-K filings and cites the filing text it used. Most of the engineering went into retrieval quality, scope control and measurement, not into the LLM call." },
      { h: "The engineering problem" },
      { p: "Generic AI answers about companies sound confident but cannot be traced to a source, and a comparison across companies or years can quietly mix them up. A useful system needs retrieval that finds the right passages, scope control that prevents mixing, and measurements that prove both." },
      { h: "Architecture" },
      { diagram: "alphabrief" },
      { p: "Filings are pulled from SEC EDGAR and chunked into Pinecone, with a parallel BM25 index. A query is scoped by ticker and year, retrieved densely and by keyword, fused, reranked with Cohere, and passed to the generator with citations." },
      { h: "Hybrid retrieval" },
      { p: "Filings are full of exact terms such as product names, risk factors and tickers that dense embeddings blur. Combining Pinecone dense search with BM25, merging the rankings with reciprocal rank fusion, and reranking with Cohere covers both meaning and exact wording. On a 125-question benchmark it reaches 0.88 MRR, 0.70 Recall@10 and 0.62 Precision@5. The judgments behind that benchmark are model-assisted, not human-labeled." },
      { h: "Scope control" },
      { p: "Ticker and year filters are applied in FastAPI before generation, so the generator only sees passages from the requested companies and years. That is what gives full comparison coverage with zero cross-company or cross-year leakage, instead of hoping a prompt handles it." },
      { h: "Ingestion that can resume" },
      { p: "EDGAR ingestion is long and fails partway. The pipeline is resumable and uses index-parity checks, so a crashed run continues without reprocessing filings or leaving the index out of sync. It processed 4,262 Pinecone chunks and is covered by 320 automated tests." },
      { h: "Evaluation" },
      { p: "Around the benchmark there is a regression harness with golden cases, adversarial cases built to fail on purpose, a check on every pull request and a nightly live evaluation. The point is to catch a retrieval regression the day it happens." },
      { h: "Latency" },
      { p: "Bounding output tokens cut median answer time from 7.6s to 2.0s, and end-to-end p95 from 19.5s to 5.4s, a 74 percent reduction. There is a separate post on that change." },
    ],
  },
  {
    slug: "mario-sdk-shared-state",
    title: "Mario SDK: keeping shared state in sync with JSON Patch and Yjs",
    date: "2026-11-12",
    tags: ["Mario SDK", "TypeScript", "Yjs", "JSON Patch", "CRDTs"],
    excerpt:
      "What I built during my Pencil Spaces internship: a published npm library that shares state across clients and servers.",
    body: [
      { p: "In summer 2025 I was a software engineering intern at Pencil Spaces (Pencil Learning Technologies) in San Francisco. I built the core sync layer of Mario, a published TypeScript package for sharing state across clients and servers in embedded apps." },
      { h: "The engineering problem" },
      { p: "Shared state was synced by sending the full state on every change. Updates took around 500ms, clients drifted apart, and concurrent edits could overwrite each other, particularly around reconnects." },
      { h: "Sending diffs instead of state" },
      { p: "I replaced full-state sync with incremental JSON Patch diffs. Sending only what changed makes each update small, which is where the drop in state-update latency from about 500ms to under 100ms came from." },
      { h: "Merging concurrent edits" },
      { p: "I designed conflict-free merge logic with Yjs CRDTs. A CRDT merges concurrent changes deterministically, so two people editing at once do not overwrite each other, and state converges when a client reconnects. That prevents lost updates." },
      { h: "One SDK instead of per-app sync code" },
      { p: "Putting the logic in a shared package meant each embedded app could drop its own sync code. Integrating it into 10+ apps cut cross-client state drift by 30 percent and removed about 1K lines of per-app glue." },
      { h: "Shipping it" },
      { p: "I automated the typed build, test and npm publish with GitHub Actions and Docker, which trimmed release cycle time by 15 percent." },
      { h: "A note on the numbers" },
      { p: "These are the figures I measured and reported during the internship. The host apps belong to Pencil, so there is no public benchmark or demo, but the package itself is public on npm." },
    ],
  },
  {
    slug: "release-gates-for-llm-agents",
    title: "My agent got better on average and worse where it mattered",
    date: "2026-11-09",
    tags: ["LLM evaluation", "TypeScript", "Agents"],
    excerpt:
      "One average score told me a new prompt was better. It also hid two cases that broke. So I built a release gate that names them.",
    body: [
      { p: "I was comparing two prompt versions for a support agent. Version 2 scored higher overall, so it looked like an easy ship. Then I looked case by case. Two cases that passed on v1 failed on v2. The average hid that completely." },
      { p: "For an agent that calls tools and sees customer data, I care more about \"did anything break\" than \"did the average go up\". So I took an open-source LLM eval dashboard and added a way to answer that question." },
      { h: "What I built" },
      { ul: [
        "30 test cases, versioned, covering five things: valid JSON, grounded answers, picking the right tool, escalating when it should, and not leaking secrets.",
        "Graders that are plain code. Strict JSON parsing, exact tool name and arguments, facts that must or must not appear. No model grading another model.",
        "A canary secret planted in every case. If it shows up in the output, the case fails, whatever it was testing.",
        "A release gate: at least 90% pass, 100% on secret refusal, and no more than one regression. If it fails, it tells you which cases regressed.",
      ] },
      { h: "Being upfront about the numbers" },
      { p: "The run I published uses scripted outputs. It proves the graders and the gate work, but it doesn't measure a real model, and the page says so. Live runs need an API key, run at temperature 0, and have a hard cap on calls." },
      { p: "What I took from it: decide what blocks a release before you look at results, and make your tools point at the specific failure, not an average." },
    ],
  },
  {
    slug: "ai-assistant-that-never-makes-things-up",
    title: "I built an AI assistant that isn't allowed to make things up",
    date: "2026-11-08",
    tags: ["CallPilot", "pgvector", "FastAPI", "Voice AI"],
    excerpt:
      "If a phone agent guesses a price or says it booked something it didn't, the business pays for it. So CallPilot only answers from what the business has told it.",
    body: [
      { p: "The scariest thing a phone agent can do is sound confident and be wrong. Quote the wrong price. Say an appointment is booked when it isn't. So I gave CallPilot one rule: answer with a fact the business owner approved, word for word, or hand the call off." },
      { h: "How it decides what to say" },
      { p: "Every approved FAQ gets embedded (gte-small, 384 dimensions) and stored in Supabase with pgvector. When a caller asks something, the best match has to clear a similarity threshold and also beat the second-best match by a margin. If two answers are close, the question is ambiguous, so the agent asks or escalates instead of picking one." },
      { ul: [
        "No generated answers. What the caller hears is the text the owner approved.",
        "If there's no approved answer about price, it won't estimate one.",
        "Calls cap at 240 seconds, with a wrap-up cue at 215.",
      ] },
      { h: "Every business is its own workspace" },
      { p: "Data sits in tenant-scoped Postgres tables with row-level security, and only the server holds the key. Customer APIs check Supabase Auth tokens and organization membership on the server. I also added a unique constraint so two businesses can't claim the same Vapi assistant or phone number." },
      { h: "What I'd change" },
      { p: "I hosted it on Render's free tier to start. Free instances sleep, and a cold start can take longer than the voice provider is willing to wait. Anything a live phone call depends on needs always-on hosting and health checks. Lesson learned." },
    ],
  },
  {
    slug: "cutting-rag-latency-74-percent",
    title: "AlphaBrief was slow, and it wasn't the part I expected",
    date: "2026-10-14",
    tags: ["AlphaBrief", "RAG", "Latency"],
    excerpt:
      "I was ready to optimize retrieval. Then I timed each step. Cutting answer time from 7.6s to 2.0s took one change in generation.",
    body: [
      { p: "AlphaBrief felt slow, and my first guess was retrieval. That's the interesting part, so that's where I wanted the problem to be. Then I timed each stage. Retrieval was already fast. Most of the time went to the model writing much more than the answer needed." },
      { h: "The fix" },
      { p: "I set output-token limits by question type and tightened the answer format around citations. A comparison across companies gets more room. A single-fact lookup gets less." },
      { ul: [
        "Median answer generation went from 7.6s to 2.0s.",
        "End-to-end p95 went from 19.5s to 5.4s.",
        "Retrieval scores didn't move, because I didn't touch retrieval.",
      ] },
      { p: "Time the whole request before you optimize the part you like. Here the cheapest change was also the biggest one." },
    ],
  },
  {
    slug: "hybrid-retrieval-over-sec-filings",
    title: "Why I stopped trusting dense search alone on SEC filings",
    date: "2026-09-30",
    tags: ["AlphaBrief", "Pinecone", "BM25", "Evaluation"],
    excerpt:
      "Embeddings kept blurring exact terms like tickers and line items. Adding keyword search and a reranker fixed it, and a 125-question benchmark showed it.",
    body: [
      { p: "10-K filings are full of exact terms: tickers, segment names, specific line items. Dense embeddings are good at meaning, but they kept treating similar-sounding terms as the same thing. For financial questions, close enough is wrong." },
      { h: "What AlphaBrief does now" },
      { ul: [
        "Runs Pinecone dense search and BM25 keyword search side by side.",
        "Merges the two lists with rank fusion, then reranks the top results with Cohere.",
        "Filters by ticker and year before generating, so a comparison covers every company you asked about and doesn't mix them up.",
      ] },
      { h: "How I know it works" },
      { p: "Before tuning anything, I wrote a 125-question benchmark where I knew which passage answered each question. The hybrid retriever gets 0.88 MRR, 0.70 Recall@10 and 0.62 Precision@5. Ingestion from SEC EDGAR is resumable and checked for parity across 4,262 chunks, with 320 tests behind the pipeline." },
      { p: "Writing the benchmark first was the best decision on the project. After that, every change was something I measured instead of guessed." },
    ],
  },
];

export const readingTime = (post) => {
  const words = post.body
    .map((b) => b.p || b.h || (b.ul || []).join(" ") || b.code || "")
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
};
