import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CURRENTLY, PROFILE_METRICS } from '../data/portfolioData';
import { identity, footer } from '../data/content';
import { playPressKey, playTick } from '../utils/sound';

const QUICK_LINKS = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'WORK', path: '/work' },
  { label: 'CONTACT', path: '/contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    playPressKey();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = () => {
    // Quiet tick on the link click — the page-level route transition
    // and Lenis smooth scroll are the dominant feedback channels.
    playTick();
  };

  return (
    <footer className="w-full bg-[#0D0D0D] dark:bg-[#060505] text-[#8E8A84] py-10 sm:py-12 border-t border-[#242424] dark:border-[#1E1C19] font-mono text-xs transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 space-y-6">
        {/* Top row: brand + quick links + status */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pb-6 border-b border-[#1E1C19]">
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-3 text-[#F3EFEA]">
              <span className="font-bold tracking-tighter text-sm border border-[#F3EFEA] px-2 py-0.5">
                {identity.monogram}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#8E8A84]">
                {identity.name.toUpperCase()} · {identity.location.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-[#666] leading-relaxed max-w-md font-sans">
              {identity.role}
            </p>
            <div className="text-[10px] uppercase tracking-widest text-[#E3532C] flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E3532C] animate-pulse" />
              {CURRENTLY.status}
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-[#555]">
              NAVIGATE
            </div>
            <nav className="flex flex-col gap-1.5">
              {QUICK_LINKS.map((l) => (
                // Use react-router Link for client-side navigation. The
                // previous <a href={l.path}> caused a full page reload
                // on every click, losing Lenis scroll, theme, and
                // preloader state.
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={handleNavClick}
                  className="text-[11px] text-[#C4B5A5] hover:text-[#E3532C] transition-colors w-fit"
                  data-cursor="pointer"
                >
                  → {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4 space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-[#555]">
              ELSEWHERE
            </div>
            <div className="flex flex-col gap-1.5">
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#C4B5A5] hover:text-[#E3532C] transition-colors w-fit"
                data-cursor="pointer"
              >
                → GitHub · {PROFILE_METRICS.githubRepos} public repos
              </a>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#C4B5A5] hover:text-[#E3532C] transition-colors w-fit"
                data-cursor="pointer"
              >
                → LinkedIn · {identity.location}
              </a>
              <a
                href={`mailto:${identity.email}`}
                data-skip-curtain
                className="text-[11px] text-[#C4B5A5] hover:text-[#E3532C] transition-colors w-fit break-all"
                data-cursor="pointer"
              >
                → {identity.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: copyright + back to top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px]">
            <span>{footer.right}</span>
            <span className="text-[#333]">·</span>
            <span className="text-[#666]">
              BUILT WITH REACT · VITE · GSAP · TAILWIND V4
            </span>
            <span className="text-[#333]">·</span>
            <span className="text-[#666]">{footer.left}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#E3532C] hover:text-[#F06138] transition-colors cursor-pointer"
            data-cursor="pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
