// Interactive timeline entries. Dates come from the résumé; TripPilot's come from its repository commit history.
// `start` and `end` are [year, month] with `end` exclusive; `link` is a project id on /projects.
export const timelineLanes = [
  { id: "professional", label: "Professional" },
  { id: "projects", label: "Projects" },
  { id: "teaching", label: "Teaching" },
];

export const timeline = [
  {
    id: "yards", lane: "professional", short: "99 YARDS", title: "99 YARDS", role: "Software Engineer Intern",
    dates: "June 2024 – August 2024", start: [2024, 6], end: [2024, 9],
    points: ["Built a recommendation model that improved offline hit-rate@10 by approximately 25% over a popularity baseline.", "Reduced feature-data freshness lag from one hour to five minutes through incremental updates."],
  },
  {
    id: "vip", lane: "professional", short: "VIP", title: "Vertically Integrated Program, Stony Brook University", role: "Software Engineer Intern",
    dates: "August 2024 – December 2024", start: [2024, 8], end: [2025, 1],
    points: ["Shipped 15+ backend endpoints and reduced p95 response time by approximately 20%.", "Added validation, pagination, and query batching to prevent unbounded responses and repeated queries.", "Increased backend test coverage from approximately 50% to 90% and reduced manual QA by approximately 30%."],
  },
  {
    id: "ta", lane: "teaching", short: "Teaching Assistant", title: "Teaching Assistant | Java and Data Structures", role: "Stony Brook University",
    dates: "August 2024 – May 2025", start: [2024, 8], end: [2025, 6],
    points: ["Led weekly recitations for 30+ students and reviewed 200+ submissions, coaching debugging and problem-solving."],
  },
  {
    id: "pencil", lane: "professional", short: "Pencil", title: "Pencil Learning Technologies", role: "Software Engineer Intern",
    dates: "June 2025 – August 2025", start: [2025, 6], end: [2025, 9], link: "pencil",
    points: ["Built Mario synchronization infrastructure and integrated it into 10+ collaborative apps.", "Delivered client-side work including configurable Word Mat layouts and the Angular-to-React Polls rewrite.", "Automated builds, tests, and publishing, shortening the release cycle by 15% (résumé-reported)."],
  },
  {
    id: "dsp", lane: "projects", short: "Dist. Systems", title: "Distributed Systems Platform", role: "Supporting independent project",
    dates: "September 2025 – December 2025", start: [2025, 9], end: [2026, 1],
    points: ["Built a Go chat system across three application instances, supporting 100 connections per room, with Redis and Kafka (résumé-reported)."],
  },
  {
    id: "alphabrief", lane: "projects", short: "AlphaBrief", title: "AlphaBrief", role: "Independent project",
    dates: "April 2026 – Present", start: [2026, 4], end: [2026, 11], link: "alphabrief",
    points: ["A live research product covering 92 companies and 274 filings, with evidence users can inspect.", "Retrieval evaluated on a 125-question benchmark; scope isolation asserted by tests."],
  },
  {
    id: "trippilot", lane: "projects", short: "TripPilot", title: "TripPilot", role: "Independent project",
    dates: "2026 (repository commits: August 3 to September 12)", start: [2026, 8], end: [2026, 10], link: "trippilot",
    points: ["An editable travel-planning workflow with budget and timing checks, revision history, and approval-gated sandbox reservations."],
  },
  {
    id: "alumi", lane: "projects", short: "Alumi", title: "Alumi", role: "Independent project",
    dates: "August 2026 (repository commits: August 9 to 21)", start: [2026, 8], end: [2026, 9], link: "alumi",
    points: ["A live photo-print storefront with an upload customizer, cart, checkout and Supabase-backed orders; built with Bolt; payments in test mode."],
  },
  {
    id: "metroprint", lane: "professional", short: "MetroPrint", title: "MetroPrint USA", role: "Contract Full-Stack Engineer",
    dates: "July 2026 – September 2026", start: [2026, 7], end: [2026, 10], link: "metroprint",
    points: ["Built a production ordering platform and admin workspace with about 97 configurable products.", "Automated ingestion of 80 products and 559 pricing rows; validated combinations and checkout totals."],
  },
];

export const graduation = { label: "Graduated, Stony Brook (May 2026)", at: [2026, 5] };
export const timelineRange = { start: [2024, 6], end: [2026, 12] };
