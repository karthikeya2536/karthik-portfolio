export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ML & Graph Neural Networks' | 'Full-Stack & Auto-ML' | 'Enterprise Ingestion & LLMs';
  timeline: string;
  overview: string;
  architectureSummary: string[];
  metrics: { label: string; value: string; detail: string }[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  caseStudy: {
    problemStatement: string;
    architecturalSolution: string;
    keyInnovations: string[];
    benchmarkResults: string[];
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'Work Experience' | 'Leadership' | 'Education';
  summary: string;
  bulletPoints: string[];
  metrics?: { label: string; value: string };
  badge?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Core' | 'Advanced' | 'Proficient';
    context: string;
  }[];
}
