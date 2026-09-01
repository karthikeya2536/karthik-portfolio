import { Project, ExperienceItem, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'Yemula Karthikeya',
  displayName: 'YEMULA KARTHIKEYA',
  role: 'Applied AI Engineer & Systems Architect',
  shortBio: 'B.Tech AI & ML specialist combining mathematical machine learning pipelines, heterogeneous graph embeddings, and precision interface architecture.',
  location: 'Secunderabad / Hyderabad, India',
  email: 'yemulakarthikeya@gmail.com',
  phone: '+91-8008799505',
  github: 'https://github.com/karthikeya2536',
  linkedin: 'https://www.linkedin.com/in/yemulakarthikeya/',
  status: 'Open for AI/ML Engineering & Systems Architecture Roles',
};

export const PROJECTS: Project[] = [
  {
    id: 'sonic-stream',
    title: 'SonicStream',
    subtitle: 'Heterogeneous Graph Neural Network Recommendation Engine',
    category: 'ML & Graph Neural Networks',
    timeline: 'Feb 2026',
    overview: 'High-throughput music recommendation engine combining PyTorch-based Heterogeneous GNNs modeling tri-partite user-song-artist graph embeddings for personalized real-time discovery.',
    architectureSummary: [
      'PyTorch Geometric Heterogeneous Graph Convolution (user -> listens -> song, artist -> produces -> song)',
      'FastAPI asynchronous microservice serving 128-dimensional embedding vectors with <18ms inference latency',
      'Containerized with multi-stage Docker builds, deployed on Hugging Face Spaces & Vercel with Google Firestore state sync',
    ],
    metrics: [
      { label: 'Inference Latency', value: '< 18ms', detail: 'Optimized via quantized ONNX runtime' },
      { label: 'Graph Topology', value: '3-Partite', detail: 'User, Song & Artist entity nodes' },
      { label: 'Embedding Dim', value: '128-D', detail: 'Cosine similarity ranking threshold' },
      { label: 'Throughput', value: '450 req/s', detail: 'Asynchronous FastAPI worker cluster' },
    ],
    tags: ['PyTorch', 'FastAPI', 'Graph Neural Networks', 'Docker', 'Google Firestore', 'Python', 'Hugging Face'],
    image: '/images/projects/sonicstream.png',
    githubUrl: 'https://github.com/karthikeya2536/Music-Recommendation-System',
    liveUrl: 'https://karthikeya2536.github.io/Music-Recommendation-System/',
    caseStudy: {
      problemStatement: 'Conventional collaborative filtering suffers severe cold-start degradation and fails to capture rich multi-relational acoustic topologies between emerging artists, genre clusters, and dynamic user listening trajectories.',
      architecturalSolution: 'Constructed a Heterogeneous Graph Neural Network architecture where message-passing aggregates semantic neighborhood information across user-song interaction edges and artist-genre lineage paths, generating robust 128-dimensional latent representations even for sparse user histories.',
      keyInnovations: [
        'Tri-partite node modeling with dual-attention edge weight normalization',
        'Cosine-distance KD-Tree indexing for sub-20ms nearest-neighbor candidate generation',
        'Containerized FastAPI microservice with automatic GPU/CPU fallback orchestration',
        'Asynchronous event telemetry streaming listening signals into Firestore for incremental graph updates',
      ],
      benchmarkResults: [
        '34% higher Precision@10 over traditional matrix factorization baselines',
        '88.4% user intent relevance retention across cold-start evaluation batches',
        'Sub-18ms p95 latency under simulated 500 concurrent client streams',
      ],
    },
  },
  {
    id: 'student-analytics',
    title: 'Student Performance Analytics',
    subtitle: 'Full-Stack Auto-Retraining ML Platform with Drift Detection',
    category: 'Full-Stack & Auto-ML',
    timeline: 'Apr 2025',
    overview: 'Full-stack predictive intelligence platform featuring Django REST and Next.js with automated Scikit-learn ML pipelines that monitor statistical data drift and trigger adaptive retraining to ensure grade forecast stability across academic semesters.',
    architectureSummary: [
      'Kolmogorov-Smirnov statistical test pipeline monitoring grade feature distributions and concept drift',
      'Automated background model re-fitting workflows with hyperparameter validation guards before promotion',
      'Third Normal Form PostgreSQL database architecture modeling multi-tenant student-course-grade dependencies',
      'Containerized with Docker Compose & orchestrated with GitHub Actions CI/CD automated test suites',
    ],
    metrics: [
      { label: 'Prediction Stability', value: '96.2%', detail: 'Across multi-semester curriculum changes' },
      { label: 'Drift Threshold', value: 'p < 0.05', detail: 'KS statistical distribution divergence trigger' },
      { label: 'Schema Design', value: '3NF Relational', detail: 'PostgreSQL normalized grade entities' },
      { label: 'Pipeline Automation', value: '100% CI/CD', detail: 'Automated test, build & release cycle' },
    ],
    tags: ['Python', 'Django REST', 'TypeScript', 'Scikit-learn', 'Docker', 'PostgreSQL', 'CI/CD'],
    image: '/images/projects/edupredict.png',
    githubUrl: 'https://github.com/karthikeya2536/student-performance-analysis',
    liveUrl: 'https://frontend-virid-pi-53.vercel.app',
    caseStudy: {
      problemStatement: 'Static academic performance models rapidly decay as course syllabi, grading rubrics, and cohort demographic attributes shift semester-over-semester, leading to silent prediction degradation.',
      architecturalSolution: 'Implemented an automated ML pipeline with statistical drift sentinels (KS tests & Population Stability Index) coupled to Django REST endpoints. When significant feature drift is detected, background workers auto-recalibrate regression models and enforce strict validation benchmarks before hot-swapping model artifacts.',
      keyInnovations: [
        'Statistical distribution shift detectors evaluating feature drift on every grade ingestion batch',
        'Hot-swappable model registry maintaining backward-compatible inference endpoints',
        'Normalized 3NF relational PostgreSQL database with composite indexing on student-semester vectors',
        'Full containerization with Docker and end-to-end CI/CD regression verification',
      ],
      benchmarkResults: [
        'Zero manual intervention required during 4 consecutive academic test cycles',
        '0.91 R² grade trajectory prediction accuracy maintained despite curriculum changes',
        'Under 45 seconds total automated pipeline retraining and hot-swap latency',
      ],
    },
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-zenith',
    role: 'AI Intern',
    organization: 'ZenithIndia',
    period: 'May 2025 – July 2025',
    location: 'India',
    type: 'Work Experience',
    summary: 'Engineered automated API data ingestion pipelines and developer productivity AI tools using quantized open-source LLMs and enterprise dashboards.',
    bulletPoints: [
      'Automated REST API data ingestion pipeline processing 10,000+ seller records daily using Python and Pandas, eliminating ~6 hours/day of manual data extraction.',
      'Designed executive Power BI dashboards tracking 10+ operational and seller KPIs adopted by company leadership for strategic decision-making.',
      'Built an AI-powered code comment and documentation generator utilizing Llama-2-7B (4-bit quantized via Hugging Face) and Streamlit, automating Python docstring generation.',
    ],
    metrics: { label: 'Daily Time Saved', value: '~6 Hours' },
    badge: 'Enterprise AI & ETL',
  },
  {
    id: 'exp-streetcause',
    role: 'Vice President',
    organization: 'Street Cause',
    period: '2024 – 2025',
    location: 'Secunderabad, India',
    type: 'Leadership',
    summary: 'Spearheaded social impact initiatives, youth empowerment drives, and cross-functional team execution for community development projects.',
    bulletPoints: [
      'Spearheaded fundraising initiatives securing INR 1.5L+, directly funding social impact projects for 1,000+ beneficiaries across underserved communities.',
      'Managed cross-functional teams to coordinate and execute 15+ large-scale community events, optimizing event workflows and boosting operational efficiency by 20%.',
      'Instituted structured budgeting and volunteer allocation systems to ensure transparent stewardship of resources.',
    ],
    metrics: { label: 'Funds Raised & Impact', value: 'INR 1.5L+ / 1,000+ People' },
    badge: 'Executive Leadership',
  },
  {
    id: 'edu-btech',
    role: 'B.Tech in Artificial Intelligence and Machine Learning',
    organization: 'St. Martins Engineering College',
    period: '2022 – 2026',
    location: 'Secunderabad, Telangana',
    type: 'Education',
    summary: 'Deep academic training in neural networks, mathematical optimization, statistical learning, algorithmic complexity, and cloud architecture.',
    bulletPoints: [
      'Achieved a strong academic record with a cumulative CGPA of 8.15.',
      'Core Coursework: Deep Learning, Graph Neural Networks, Statistical Machine Learning, Distributed Systems, Data Structures & Algorithms, Database Engineering.',
      'Led academic project teams in NLP classification and heterogeneous recommendation systems.',
    ],
    metrics: { label: 'Cumulative CGPA', value: '8.15 / 10' },
    badge: 'Undergraduate Degree',
  },
  {
    id: 'edu-intermediate',
    role: 'Board of Intermediate Education (MPC)',
    organization: 'MJPTBCWRJC',
    period: '2020 – 2022',
    location: 'Nizamabad, Telangana',
    type: 'Education',
    summary: 'Rigorous pre-engineering foundation in Mathematics, Physics, and Chemistry with top percentile academic standing.',
    bulletPoints: [
      'Graduated with 91.8% overall percentage.',
      'Distinction in advanced mathematics, analytical problem solving, and calculus.',
    ],
    metrics: { label: 'Graduation Percentage', value: '91.8%' },
    badge: 'Pre-Engineering',
  },
  {
    id: 'edu-ssc',
    role: 'Secondary School Certificate (SSC)',
    organization: 'Sri Vijaya Sai High School',
    period: '2019 – 2020',
    location: 'Bodhan, Telangana',
    type: 'Education',
    summary: 'Graduated with a perfect 10.0 CGPA score, demonstrating foundational excellence across mathematical and scientific disciplines.',
    bulletPoints: [
      'Awarded perfect 10 CGPA for outstanding academic performance across all subjects.',
    ],
    metrics: { label: 'High School CGPA', value: '10.0 / 10' },
    badge: 'High School Honors',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages & Core Computation',
    description: 'Foundational programming languages and query interfaces for data manipulation and systems design.',
    skills: [
      { name: 'Python', level: 'Core', context: 'OOP, Asynchronous I/O, Metaprogramming, AST Manipulation' },
      { name: 'SQL', level: 'Core', context: 'Complex Joins, Window Functions, Index Tuning, Normalization' },
      { name: 'TypeScript / JavaScript', level: 'Advanced', context: 'Type Systems, Async State Engines, Modern React' },
      { name: 'PostgreSQL / SQLite', level: 'Advanced', context: 'Schema Architecture, Relational Integrity, 3NF Modeling' },
    ],
  },
  {
    title: 'Machine Learning & AI Engineering',
    description: 'Neural network architectures, graph embeddings, statistical inference, and NLP models.',
    skills: [
      { name: 'PyTorch', level: 'Core', context: 'Custom Neural Layers, Heterogeneous Graphs, Loss Functions' },
      { name: 'Scikit-learn', level: 'Core', context: 'Supervised Regressors, Classifiers, Pipeline Drift Sentinels' },
      { name: 'Pandas & NumPy', level: 'Core', context: 'High-Throughput Vectorization, Matrix Algebra, Time Series' },
      { name: 'Graph Embeddings', level: 'Advanced', context: 'Heterogeneous Node Message Passing, Latent Projection' },
      { name: 'Feature Engineering & TF-IDF', level: 'Advanced', context: 'Distribution Normalization, Token Frequency Vectoring' },
      { name: 'Model Evaluation & Drift', level: 'Core', context: 'KS Tests, PSI, Precision@K, ROC-AUC, Validation Guards' },
    ],
  },
  {
    title: 'Backend Systems & API Architecture',
    description: 'Microservice orchestration, RESTful standards, asynchronous processing, and serving.',
    skills: [
      { name: 'FastAPI', level: 'Core', context: 'Asynchronous Routers, Pydantic Type Validation, OpenAPI Specs' },
      { name: 'Django REST Framework', level: 'Advanced', context: 'Model Serializers, ViewSets, Token Auth, ORM' },
      { name: 'REST API Design', level: 'Core', context: 'Idempotency, Pagination, Rate Limiting, HTTP Semantics' },
      { name: 'Google Firestore', level: 'Proficient', context: 'Real-time Document Collections, Async Subscription Streams' },
    ],
  },
  {
    title: 'MLOps, Containers & Deployment',
    description: 'Production infrastructure, continuous integration, containerization, and analytics.',
    skills: [
      { name: 'Docker & Docker Compose', level: 'Core', context: 'Multi-Stage Image Optimization, Container Isolation' },
      { name: 'Git & GitHub Actions', level: 'Core', context: 'Automated CI/CD Workflows, Version Control, Linting' },
      { name: 'Jupyter & Streamlit', level: 'Core', context: 'Exploratory Analysis, Interactive AI Rapid Tooling' },
      { name: 'Power BI', level: 'Advanced', context: 'Executive KPI Modeling, Data Relationships, DAX Measures' },
      { name: 'Vercel / Hugging Face / Render', level: 'Advanced', context: 'Cloud Hosting, Model Spaces, Static & Serverless Deployments' },
    ],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// PROFILE METRICS — surfaced on the Home page & Footer
// Aggregated from the existing PROJECTS, EXPERIENCES and PHILOSOPHY data so
// they stay consistent if a number changes upstream. Keep the source-of-truth
// in PROJECTS / EXPERIENCES and re-derive here.
// ────────────────────────────────────────────────────────────────────────────
export const PROFILE_METRICS = {
  // Hard numbers we already have evidence for in this file
  productionRecords: '10,000+/day',         // Zenith ETL
  inferenceLatencyMs: '<18ms',               // SonicStream
  embeddingDim: '128-D',                    // SonicStream
  predictionStabilityPct: '96.2%',          // EduPredict
  driftThreshold: 'p < 0.05',               // EduPredict
  leadershipFundsRaised: 'INR 1.5L+',        // Street Cause
  leadershipBeneficiaries: '1,000+',         // Street Cause
  leadershipEvents: '15+',                   // Street Cause
  yearsOfFocusedMLStudy: '3+',              // B.Tech 2022–2026 (4 yrs incl. foundation)
  cGPA: '8.15 / 10',                        // B.Tech
  intermediatePct: '91.8%',                  // MPC
  sscCGPA: '10.0 / 10',                     // SSC

  // Soft numbers — fill these from your live GitHub/LinkedIn
  // [ADD FROM GITHUB: total stars across repos]
  githubStars: '—',
  // [ADD FROM GITHUB: total forks / watchers / public repo count]
  githubRepos: '3+',
  // [ADD FROM LINKEDIN: total endorsements or recommendations]
  linkedinEndorsements: '—',
  // [ADD FROM GITHUB: languages % from contribution graph]
  primaryLanguage: 'Python · TypeScript',
};

// ────────────────────────────────────────────────────────────────────────────
// CURRENTLY — what I'm working on / exploring right now
// Shown on the Home page as a live status card and on the Contact page as
// "what I can help with".
// ────────────────────────────────────────────────────────────────────────────
export const CURRENTLY = {
  status: 'Open for AI/ML Engineering & Systems Architecture Roles',
  availableFrom: 'Immediate · MMXXVI',
  workingOn: [
    'Heterogeneous Graph Neural Network inference serving at sub-20ms p95',
    'Quantized LLM orchestration for code documentation tooling',
    'Statistical drift sentinels for production ML pipelines',
  ],
  exploring: [
    'Multi-agent systems and tool-use protocols',
    'Differential testing for ML model releases',
    'Vector database internals (HNSW, IVF-PQ)',
  ],
  openTo: [
    'AI/ML Engineering roles (full-time, MMXXVI)',
    'Heterogeneous GNN consultation',
    'High-throughput ETL architecture review',
    'Open source collaboration on ML tooling',
  ],
  responseSLA: 'Replies within 24 hours on business days (IST)',
};

// ────────────────────────────────────────────────────────────────────────────
// GITHUB FOOTPRINT — synthesised from the existing repo URLs in PROJECTS.
// Add more entries here as you publish new repos. The Work page will render
// this list as a strip of repo cards.
// ────────────────────────────────────────────────────────────────────────────
export const GITHUB_REPOS = [
  {
    name: 'Music-Recommendation-System',
    description:
      'Heterogeneous Graph Neural Network music recommender. Tri-partite user/song/artist embeddings served via FastAPI with ONNX runtime.',
    language: 'Python',
    topics: ['PyTorch', 'GNN', 'FastAPI', 'Docker', 'Firestore'],
    url: 'https://github.com/karthikeya2536/Music-Recommendation-System',
    // [ADD FROM GITHUB: actual star / fork / last-commit numbers]
    stars: '—',
    forks: '—',
    lastCommit: 'Feb 2026',
  },
  {
    name: 'student-performance-analysis',
    description:
      'Full-stack auto-retraining ML platform with statistical drift detection (KS test, PSI) and hot-swappable model registry.',
    language: 'Python',
    topics: ['Django REST', 'Next.js', 'Scikit-learn', 'PostgreSQL', 'CI/CD'],
    url: 'https://github.com/karthikeya2536/student-performance-analysis',
    stars: '—',
    forks: '—',
    lastCommit: 'Apr 2025',
  },
  {
    name: 'portfolio-monograph',
    description:
      'This portfolio — editorial React + Vite + GSAP build with custom cursor, smooth scroll, and a Victorian/editorial design system.',
    language: 'TypeScript',
    topics: ['React', 'Vite', 'GSAP', 'Tailwind v4', 'Motion'],
    url: 'https://github.com/karthikeya2536',
    stars: '—',
    forks: '—',
    lastCommit: 'Aug 2026',
  },
  // [ADD FROM GITHUB: append additional public repos here]
];
