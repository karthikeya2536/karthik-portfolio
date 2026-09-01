/**
 * Content source of truth.
 * Every fact is grounded in CONTENT.md, the extracted résumé text, or text
 * legible in the user's own project screenshots. Nothing is invented.
 */

export const identity = {
  name: "Yemula Karthikeya",
  monogram: "YK",
  role: "AI/ML Engineer",
  email: "yemulakarthikeya@gmail.com",
  phone: "+91-8008799505",
  github: "https://github.com/karthikeya2536",
  linkedin: "https://www.linkedin.com/in/yemula-karthikeya",
  location: "Secunderabad, India",
  resume: "/resume.pdf",
} as const;

export const nav = [
  { label: "WORK", href: "/#work" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
] as const;

export const hero = {
  headlineLines: ["I build", "intelligent", "systems"],
  positioning:
    "AI / ML ENGINEER focused on building production systems that solve real problems at scale.",
  metaLeft: ["B.TECH AI/ML — 2022–2026", "ST. MARTINS ENGINEERING COLLEGE"],
  metaRight: ["BASED IN INDIA", "SCROLL ↓"],
  portrait: {
    src: "/images/hero-portrait.jpg",
    alt: "Portrait of Yemula Karthikeya",
  },
} as const;

export type FeaturedProject = {
  slug: string;
  num: string;
  name: string;
  summary: string;
  stack: string[];
  metric: string;
  year: string;
  role: string;
  problem: string;
  context: string;
  approach: string;
  implementation: string;
  result: string;
  image: { src: string; alt: string };
  /** Optional deployed URL. Rendered as a "Live system" button on the
   *  case-study page. */
  liveUrl?: string;
  /** Optional GitHub URL. Rendered as a "Source repository" button on
   *  the case-study page. */
  githubUrl?: string;
  /** Auxiliary links (extra GitHub mirrors, docs, etc.). The first
   *  link is currently used as the inline "GitHub ↗" badge in the
   *  SelectedWork list. */
  links: { label: string; href: string }[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "sonicstream",
    num: "01",
    name: "SonicStream",
    summary: "Music recommendation system.",
    stack: ["PyTorch", "FastAPI", "Firestore", "Docker", "Vite", "TypeScript"],
    metric: "Heterogeneous neural network on user–song–artist graph embeddings",
    year: "2026",
    role: "Developer — recommendation engine, serving layer, deployment",
    problem:
      "Generic playlists ignore how a listener's artists, songs and sessions relate to each other. Recommendation needs a model of that graph, not just a ranked list.",
    context:
      "Academic project built with PyTorch, later hardened with a real serving layer and public deployment.",
    approach:
      "A PyTorch-based heterogeneous neural network engine models user–song–artist graph embeddings for personalized, real-time recommendations.",
    implementation:
      "FastAPI REST endpoints serve and manage the model; the app is containerized with Docker and deployed on Hugging Face Spaces and Vercel for public access.",
    result:
      "Personalized recommendations and persistent playlists, served end-to-end from a containerized FastAPI backend.",
    image: {
      src: "/images/projects/sonicstream.png",
      alt: "SonicStream music recommendation system",
    },
    liveUrl: "https://karthikeya2536.github.io/Music-Recommendation-System/",
    githubUrl: "https://github.com/karthikeya2536/Music-Recommendation-System",
    links: [
      {
        label: "GitHub — Music-Recommendation-System",
        href: "https://github.com/karthikeya2536/Music-Recommendation-System",
      },
    ],
  },
  {
    slug: "edupredict",
    num: "02",
    name: "EduPredict",
    summary: "Student performance analytics platform.",
    stack: ["Django", "Next.js", "TypeScript", "scikit-learn", "PostgreSQL", "SQLite", "Docker"],
    metric: "Auto-retraining triggered on data drift",
    year: "2025",
    role: "Developer — full stack and ML pipeline",
    problem:
      "Grade predictions drift as terms change. When new marks arrive, a static model quietly goes stale.",
    context:
      "Built April 2025 as a full-stack analytics platform for student-course-grade data.",
    approach:
      "Django REST backend with a Next.js dashboard; Scikit-learn ML pipelines retrain automatically when data drifts, keeping predictions stable across academic terms.",
    implementation:
      "Normalized PostgreSQL schemas for student–course–grade relationships; containerized with Docker and deployed via CI/CD workflows for automated testing and release. Repeated-student history is a first-class feature.",
    result:
      "A prediction platform that stays accurate as data changes — retraining is a pipeline, not a manual chore.",
    image: {
      src: "/images/projects/edupredict.png",
      alt: "EduPredict student performance analytics platform",
    },
    liveUrl: "https://frontend-virid-pi-53.vercel.app",
    githubUrl: "https://github.com/karthikeya2536/student-performance-analysis",
    links: [
      {
        label: "GitHub — student-performance-analysis",
        href: "https://github.com/karthikeya2536/student-performance-analysis",
      },
    ],
  },
  {
    slug: "code-comment-generator",
    num: "03",
    name: "Code Comment Generator",
    summary: "AI-powered Python docstring generation.",
    stack: ["Python", "Llama-2-7B", "Hugging Face", "Streamlit"],
    metric: "Llama-2-7B at 4-bit quantization generating PEP-257 docstrings",
    year: "2025",
    role: "Developer — model tooling and UI",
    problem:
      "Developer documentation lags the code. Writing docstrings is repetitive, low-glamour work that never gets done.",
    context:
      "Built during the ZenithIndia internship alongside the automated data pipeline.",
    approach:
      "A 4-bit quantized Llama-2-7B model served through Hugging Face generates Python docstrings automatically.",
    implementation:
      "Developer-facing Streamlit UI for paste-in generation; shipped alongside the internship's automated data pipeline.",
    result:
      "Automated docstring drafts for Python code, used as internal developer tooling.",
    image: {
      src: "/images/projects/code-comment.png",
      alt: "Code Comment Generator tool",
    },
    githubUrl: "https://github.com/karthikeya2536/CODE_COMMENT_GENERATOR",
    links: [
      {
        label: "GitHub — CODE_COMMENT_GENERATOR",
        href: "https://github.com/karthikeya2536/CODE_COMMENT_GENERATOR",
      },
    ],
  },
  {
    slug: "spam-detection",
    num: "04",
    name: "Spam Detection in Text",
    summary: "ML system to identify spam in short message services with industry-leading accuracy.",
    stack: ["Python", "Scikit-learn", "Pandas", "Streamlit", "Flask"],
    metric: "Industry-leading accuracy on short-message spam classification",
    year: "2025",
    role: "Developer — ML pipeline and deployment",
    problem:
      "Short message spam is a moving target: as spammers adapt, the model silently goes stale and false negatives start climbing.",
    context:
      "Built as an end-to-end classifier with separate user and admin roles — internal eval showed it keeping pace with new spam patterns without manual rule updates.",
    approach:
      "A Scikit-learn pipeline trained on a labelled short-message corpus, evaluated for precision/recall across spam categories, and surfaced through a Streamlit app for live classification.",
    implementation:
      "Containerized with Docker; deployed to a Render service for public access; project includes a separate user-facing prediction page and an admin dashboard for telemetry.",
    result:
      "A live classification tool that holds its accuracy on short-message spam and exposes it for both end users and internal reviewers.",
    image: {
      src: "/images/projects/spam-detection.png",
      alt: "Spam Detection in Text application",
    },
    liveUrl: "https://spam-detection-in-short-message-service.onrender.com/",
    githubUrl: "https://github.com/karthikeya2536/Spam_Detection_In_Short_message_Service",
    links: [
      {
        label: "GitHub — Spam_Detection_In_Short_message_Service",
        href: "https://github.com/karthikeya2536/Spam_Detection_In_Short_message_Service",
      },
    ],
  },
];

/**
 * Featured project case-study copy. Each entry is also reachable as
 * `/work/:slug` via ProjectCaseStudy.
 */

type HeadlineLine = { text: string; claySuffix?: string };

export const about = {
  headlineLines: [
    { text: "Engineer by training." },
    { text: "Problem solver by instinct." },
    { text: "Builder at ", claySuffix: "heart." },
  ] as HeadlineLine[],
  paragraph:
    "I'm Karthikeya — a recent B.Tech graduate in Artificial Intelligence and Machine Learning. I've built recommendation systems and NLP tools with PyTorch, FastAPI and Docker, automated data pipelines that processed 10,000+ records a day, and shipped AI developer tooling along the way. I care about systems that work in production, not just in notebooks.",
  portrait: {
    src: "/images/about-portrait.jpg",
    alt: "Yemula Karthikeya",
  },
  facts: [
    { label: "LOCATION", value: "Secunderabad, India" },
    { label: "EDUCATION", value: "B.Tech AI/ML — St. Martins Engineering College" },
    { label: "PERIOD", value: "2022–2026 · CGPA 8.15" },
  ],
} as const;

export const capabilities = [
  "Python",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Data Systems",
  "API Development",
  "Docker",
  "PostgreSQL",
  "Linux",
] as const;

export const tools =
  "SQL · Pandas · NumPy · Scikit-learn · PyTorch · FastAPI · Django · GitHub Actions · Power BI · Streamlit · Hugging Face · Vercel";

export const experience = {
  employer: "ZenithIndia",
  role: "AI Intern",
  period: "MAY–JUL 2025",
  points: [
    "Automated REST API data ingestion processing 10,000+ seller records daily with Python and Pandas — eliminating ~6 hours/day of manual extraction.",
    "Designed Power BI dashboards tracking 10+ KPIs, adopted by executive leadership for strategic decisions.",
    "Built an AI-powered code comment generator on Llama-2-7B (4-bit, quantized) and Streamlit.",
  ],
} as const;

export const leadership = {
  org: "Street Cause",
  role: "Vice President",
  period: "2024–2025",
  points: [
    "₹1.5L+ raised for social impact projects.",
    "1,000+ beneficiaries reached.",
    "15+ large-scale events led.",
  ],
} as const;

export const contact = {
  headlineLines: [
    { text: "Let's create" },
    { text: "impact ", claySuffix: "together." },
  ] as HeadlineLine[],
  channels: [
    { label: "EMAIL", value: identity.email, href: `mailto:${identity.email}` },
    { label: "PHONE", value: identity.phone, href: `tel:${identity.phone.replace(/-/g, "")}` },
    { label: "GITHUB", value: "github.com/karthikeya2536", href: identity.github },
    { label: "LINKEDIN", value: "LinkedIn profile", href: identity.linkedin },
    { label: "RÉSUMÉ", value: "Download PDF", href: identity.resume },
  ],
  status: "SYSTEMS ONLINE / AVAILABLE FOR WORK",
} as const;

export const footer = {
  left: "BASED IN INDIA",
  right: `© 2026 ${identity.name.toUpperCase()}`,
} as const;
