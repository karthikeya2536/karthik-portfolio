import { useEffect, useRef, useState } from 'react';
import { X, Printer, Copy, Check, FileText } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { identity } from '../data/content';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playChime, playPressKey, playTick } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  // Track the "COPIED" reset timer so we can clear it if the modal
  // unmounts (or the user re-copies) before the 2s window elapses.
  const copyResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current) {
        clearTimeout(copyResetTimeoutRef.current);
        copyResetTimeoutRef.current = null;
      }
    };
  }, []);

  if (!isOpen) return null;

  const handleCopyText = async () => {
    const rawResume = `CURRICULUM VITAE
YEMULA KARTHIKEYA
Applied AI & Systems Engineer
Email: yemulakarthikeya@gmail.com | Phone: +91-8008799505
Location: Hyderabad, India
LinkedIn: https://www.linkedin.com/in/yemulakarthikeya/
GitHub: https://github.com/karthikeya2536

PROFESSIONAL SUMMARY
Recent B.Tech graduate in Artificial Intelligence and Machine Learning with hands-on internship experience in data pipeline automation and AI-powered developer tools. Built academic projects in NLP and recommendation systems using PyTorch, Scikit-learn, FastAPI, and Docker. Strong foundation in Python, SQL, and supervised learning with practical exposure to model training, evaluation, and REST API development.

EDUCATION
- St. Martins Engineering College, Secunderabad (2022 - 2026)
  B.Tech in Artificial Intelligence and Machine Learning | CGPA: 8.15 / 10
- MJPTBCWRJC, Nizamabad (2020 - 2022)
  Board of Intermediate Education (MPC) | Percentage: 91.8%
- Sri Vijaya Sai High School, Bodhan (2019 - 2020)
  Secondary School Certificate | CGPA: 10.0 / 10

TECHNICAL SKILLS
- Languages & Databases: Python, SQL, PostgreSQL, SQLite
- ML & AI: PyTorch, Scikit-learn, Pandas, NumPy, Feature Engineering, NLP, Graph Embeddings, Recommendation Systems, TF-IDF, Supervised Learning, Model Evaluation
- Backend & APIs: FastAPI, Django REST Framework, REST API Design
- MLOps & Tooling: Docker, Git, GitHub Actions CI/CD, Jupyter Notebook, Streamlit, Power BI
- Deployment & Hosting: Vercel, Hugging Face Spaces, Render

WORK EXPERIENCE
AI Intern | ZenithIndia (May 2025 - July 2025)
- Automated REST API data ingestion pipeline processing 10,000+ seller records daily using Python and Pandas, eliminating ~6 hours/day of manual data extraction.
- Designed Power BI dashboards tracking 10+ KPIs adopted by executive leadership for strategic decision-making.
- Built an AI-powered developer documentation generator using Llama-2-7B (4-bit quantized, Hugging Face) and Streamlit for automated Python docstring generation.

PROJECTS
- Student Performance Analytics Platform (Apr 2025)
  Full-stack analytics platform (Django REST + Next.js) with auto-retraining Scikit-learn ML pipelines triggered on data drift.
  Tech: Python, Django, TypeScript, SQLite, Scikit-learn, Docker
- SonicStream - Music Recommendation System (Feb 2026)
  Music streaming platform with PyTorch-based Heterogeneous Neural Network engine modeling user-song-artist graph embeddings.
  Tech: Python, PyTorch, FastAPI, Docker, Google Firestore

CIVIC LEADERSHIP
- Vice President | Street Cause (2024 - 2025)
  Spearheaded fundraising securing INR 1.5L+, funding social projects for 1,000+ beneficiaries across 15+ events.`;

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(rawResume);
      setCopied(true);
      if (copyResetTimeoutRef.current) clearTimeout(copyResetTimeoutRef.current);
      copyResetTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
      playChime();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy resume text:', err);
    }
  };

  const handlePrint = () => {
    playPressKey();
    window.print();
  };

  const handleClose = () => {
    playTick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D0D0D]/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#F4F0EB] text-[#111111] border border-[#111111] shadow-2xl my-8">
        
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between p-3.5 sm:p-4 gap-2 border-b border-[#E2DBD2] bg-[#EFEAE3]">
          <div className="flex items-center gap-2 font-mono text-xs text-[#111111] font-semibold">
            <FileText className="w-4 h-4 text-[#E3532C] shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-none">CURRICULUM VITAE · YEMULA KARTHIKEYA</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <Magnetic strength={0.2} staggerScale={false}>
              <button
                onClick={handleCopyText}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-mono border border-[#D5CCC0] text-[#111111] hover:bg-[#111111] hover:text-[#F4F0EB] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#E3532C]" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'COPIED' : 'COPY RAW'}</span>
                <span className="sm:hidden">{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.2} staggerScale={false}>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 text-xs font-mono bg-[#E3532C] text-[#F4F0EB] font-semibold hover:bg-[#F06138] transition-colors cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PRINT</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.2} staggerScale={false}>
              <button
                onClick={handleClose}
                className="p-1 text-[#6E6862] hover:text-[#111111] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="p-5 sm:p-10 lg:p-12 text-[#111111] space-y-6 sm:space-y-8 max-h-[80vh] overflow-y-auto font-sans print:max-h-none print:p-0 print:overflow-visible">
          
          {/* Header */}
          <div className="border-b border-[#D5CCC0] pb-6 space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111]">
              Yemula Karthikeya
            </h1>
            <p className="font-mono text-xs text-[#E3532C] uppercase tracking-wider">
              AI / ML Engineer & Systems Architect · Hyderabad, India
            </p>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#6E6862] pt-1">
              <a href={`mailto:${identity.email}`} className="hover:text-[#111111] underline">
                {identity.email}
              </a>
              <span>•</span>
              <a href={`tel:${identity.phone.replace(/-/g, "")}`} className="hover:text-[#111111]">
                {identity.phone}
              </a>
              <span>•</span>
              <a href={identity.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#111111] underline">
                LinkedIn
              </a>
              <span>•</span>
              <a href={identity.github} target="_blank" rel="noreferrer" className="hover:text-[#111111] underline">
                GitHub
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="font-mono text-xs font-semibold tracking-wider text-[#E3532C] uppercase border-b border-[#E2DBD2] pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-[#111111] leading-relaxed font-light">
              Recent B.Tech graduate in Artificial Intelligence and Machine Learning with hands-on internship experience in data pipeline automation and AI-powered developer tools. Built academic projects in NLP and recommendation systems using PyTorch, Scikit-learn, FastAPI, and Docker. Strong foundation in Python, SQL, and supervised learning with practical exposure to model training, evaluation, and REST API development.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-semibold tracking-wider text-[#E3532C] uppercase border-b border-[#E2DBD2] pb-1">
              EDUCATION
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline">
                <div>
                  <div className="font-semibold text-[#111111]">St. Martins Engineering College, Secunderabad</div>
                  <div className="text-[#6E6862]">B.Tech in Artificial Intelligence and Machine Learning</div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div>2022 – 2026</div>
                  <div className="text-[#E3532C] font-semibold">CGPA: 8.15 / 10</div>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <div>
                  <div className="font-semibold text-[#111111]">MJPTBCWRJC, Nizamabad</div>
                  <div className="text-[#6E6862]">Board of Intermediate Education (MPC)</div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div>2020 – 2022</div>
                  <div className="text-[#E3532C] font-semibold">Percentage: 91.8%</div>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <div>
                  <div className="font-semibold text-[#111111]">Sri Vijaya Sai High School, Bodhan</div>
                  <div className="text-[#6E6862]">Secondary School Certificate</div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div>2019 – 2020</div>
                  <div className="text-[#E3532C] font-semibold">CGPA: 10.0 / 10</div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="font-mono text-xs font-semibold tracking-wider text-[#E3532C] uppercase border-b border-[#E2DBD2] pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1.5 text-xs text-[#111111]">
              <div><strong className="font-medium">Languages & Databases:</strong> Python, SQL, PostgreSQL, SQLite</div>
              <div><strong className="font-medium">ML & AI:</strong> PyTorch, Scikit-learn, Pandas, NumPy, Feature Engineering, NLP, Graph Embeddings, Recommendation Systems, TF-IDF, Supervised Learning, Model Evaluation</div>
              <div><strong className="font-medium">Backend & APIs:</strong> FastAPI, Django REST Framework, REST API Design</div>
              <div><strong className="font-medium">MLOps & Tooling:</strong> Docker, Git, GitHub Actions, Jupyter Notebook, Streamlit, Power BI</div>
              <div><strong className="font-medium">Deployment:</strong> Vercel, Hugging Face Spaces, Render</div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-semibold tracking-wider text-[#E3532C] uppercase border-b border-[#E2DBD2] pb-1">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline">
                <div className="font-semibold text-[#111111]">AI Intern | ZenithIndia</div>
                <div className="font-mono text-xs text-[#E3532C]">May 2025 – July 2025</div>
              </div>
              <ul className="space-y-1 text-[#6E6862] text-xs">
                <li>• Automated REST API data ingestion pipeline processing 10,000+ seller records daily using Python and Pandas, eliminating ~6 hours/day of manual data extraction.</li>
                <li>• Designed Power BI dashboards tracking 10+ KPIs adopted by executive leadership for strategic decision-making.</li>
                <li>• Built an AI-powered developer documentation generator using Llama-2-7B (4-bit quantized, Hugging Face) and Streamlit for automated Python docstring generation.</li>
              </ul>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-semibold tracking-wider text-[#E3532C] uppercase border-b border-[#E2DBD2] pb-1">
              ENGINEERED PROJECTS
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="space-y-1">
                <div className="flex justify-between items-baseline font-semibold text-[#111111]">
                  <span>SonicStream – Neural Music Recommendation System</span>
                  <span className="font-mono text-xs text-[#E3532C]">Feb 2026</span>
                </div>
                <p className="text-xs text-[#6E6862]">
                  Developed music streaming platform with PyTorch-based Heterogeneous Neural Network engine modeling user-song-artist graph embeddings for personalized real-time recommendations. Containerized with Docker and served via FastAPI.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline font-semibold text-[#111111]">
                  <span>Student Performance Analytics Platform</span>
                  <span className="font-mono text-xs text-[#E3532C]">Apr 2025</span>
                </div>
                <p className="text-xs text-[#6E6862]">
                  Built full-stack analytics platform (Django REST + Next.js) with auto-retraining Scikit-learn ML pipelines triggered on data drift, ensuring grade prediction stability across academic terms.
                </p>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <div className="space-y-2">
            <h2 className="font-mono text-xs font-semibold tracking-wider text-[#E3532C] uppercase border-b border-[#E2DBD2] pb-1">
              LEADERSHIP & CIVIC INITIATIVES
            </h2>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-baseline font-semibold text-[#111111]">
                <span>Vice President | Street Cause</span>
                <span className="font-mono text-xs text-[#E3532C]">2024 – 2025</span>
              </div>
              <p className="text-[#6E6862]">
                Spearheaded fundraising initiatives securing INR 1.5L+, funding social impact projects for 1,000+ beneficiaries across 15+ large-scale events.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
