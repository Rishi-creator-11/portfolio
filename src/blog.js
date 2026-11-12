/* Blog posts. Body is an array of blocks: { p }, { h }, { ul: [] }, { code }. */
export const posts = [
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
    title: "I built an AI phone assistant that answers only from approved facts",
    date: "2026-11-08",
    tags: ["CallPilot", "pgvector", "FastAPI", "Voice AI"],
    excerpt:
      "If a phone agent guesses a price or says it booked something it didn't, the business pays for it. So CallPilot's lookup returns only what the business has approved, or nothing.",
    body: [
      { p: "The scariest thing a phone agent can do is sound confident and be wrong. Quote the wrong price. Say an appointment is booked when it isn't. So I gave CallPilot one rule: answer with a fact the business owner approved, word for word, or hand the call off." },
      { h: "How it decides what to say" },
      { p: "Every approved FAQ gets embedded (gte-small, 384 dimensions) and stored in Supabase with pgvector. When a caller asks something, the best match has to clear a similarity threshold and also beat the second-best match by a margin. If two answers are close, the question is ambiguous, so the agent asks or escalates instead of picking one." },
      { ul: [
        "The lookup returns approved text verbatim, or nothing. Keeping the voice model faithful to that text on live calls is what I test next.",
        "If there's no approved answer about price, the lookup returns nothing instead of an estimate.",
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
