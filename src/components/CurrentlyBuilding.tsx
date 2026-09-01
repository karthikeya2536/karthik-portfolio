import { CURRENTLY, PROFILE_METRICS } from '../data/portfolioData';
import { ScrambleText } from './TextAnimations';
import { Parallax } from './Parallax';
import { HeadingReveal } from './HeadingReveal';
import { Magnetic } from './Magnetic';
import { Radio, Sparkles, Compass, ArrowUpRight, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export default function CurrentlyBuilding() {
  return (
    <section
      id="currently"
      className="relative w-full bg-[#F4F0EB] dark:bg-[#0A0806] text-[#111111] dark:text-[#F5EFEB] py-16 sm:py-24 border-b border-[#E2DBD2] dark:border-[#2A231C] overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 space-y-10 sm:space-y-14">
        {/* Header */}
        <HeadingReveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#D5CCC0] dark:border-[#2A231C] pb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#E04F2B] tracking-[0.24em] uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E04F2B] animate-pulse" />
                <ScrambleText duration={0.6} hoverScramble>
                  ( LIVE STATUS )
                </ScrambleText>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.05] tracking-tight mt-2">
                Currently Building &amp; Exploring
              </h2>
              <p className="max-w-2xl text-xs sm:text-sm text-[#555555] dark:text-[#A0988C] font-sans font-light leading-relaxed mt-2">
                A working snapshot of what I'm shipping, what I'm reading into, and what I'd
                love to be hired to do next.
              </p>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#555555] dark:text-[#A0988C] text-right space-y-0.5">
              <div className="text-[#E04F2B] dark:text-[#E04F2B] font-semibold">
                STATUS: {CURRENTLY.status.toUpperCase()}
              </div>
              <div>AVAILABLE FROM: {CURRENTLY.availableFrom.toUpperCase()}</div>
            </div>
          </div>
        </HeadingReveal>

        {/* Three columns: working on, exploring, open to */}
        <Parallax speed={-0.05}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D5CCC0] dark:bg-[#2A231C] border border-[#D5CCC0] dark:border-[#2A231C]">
            <Column
              icon={<Cpu className="w-3.5 h-3.5" />}
              kicker="WORKING ON"
              title="Shipping right now"
              items={CURRENTLY.workingOn}
              accent="#E04F2B"
            />
            <Column
              icon={<Compass className="w-3.5 h-3.5" />}
              kicker="EXPLORING"
              title="Reading into next"
              items={CURRENTLY.exploring}
              accent="#E04F2B"
            />
            <Column
              icon={<Sparkles className="w-3.5 h-3.5" />}
              kicker="OPEN TO"
              title="Hire me for this"
              items={CURRENTLY.openTo}
              accent="#E04F2B"
            />
          </div>
        </Parallax>

        {/* Bottom strip: response SLA + primary language */}
        <Parallax speed={0.04}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#D5CCC0] dark:border-[#2A231C] pt-5">
            <div className="flex items-center gap-3">
              <Radio className="w-4 h-4 text-[#E04F2B]" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#111111] dark:text-[#F5EFEB]">
                RESPONSE SLA · {CURRENTLY.responseSLA}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[#555555] dark:text-[#A0988C]">
              <span className="font-mono text-[10px] uppercase tracking-widest">PRIMARY STACK</span>
              <span className="font-mono text-xs text-[#111111] dark:text-[#F5EFEB]">
                {PROFILE_METRICS.primaryLanguage}
              </span>
            </div>
            <Magnetic strength={0.3}>
              {/* Use react-router Link to navigate to the contact page.
                  The previous href="#contact" was a broken fragment
                  identifier — no element on the page has id="contact". */}
              <Link
                to="/contact"
                className="group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[#E04F2B] hover:text-[#F06138] transition-colors"
                data-cursor="pointer"
              >
                Open the channels
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Magnetic>
          </div>
        </Parallax>
      </div>
    </section>
  );
}

function Column({
  icon,
  kicker,
  title,
  items,
  accent,
}: {
  icon: ReactNode;
  kicker: string;
  title: string;
  items: string[];
  accent: string;
}) {
  return (
    <div className="bg-[#F4F0EB] dark:bg-[#0A0806] p-6 sm:p-7 space-y-4 h-full">
      <div className="flex items-center justify-between border-b border-[#D5CCC0] dark:border-[#2A231C] pb-3">
        <div className="flex items-center gap-2" style={{ color: accent }}>
          {icon}
          <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
            {kicker}
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#888] dark:text-[#E04F2B]">
          {items.length} ITEMS
        </span>
      </div>
      <h3 className="font-serif text-lg sm:text-xl text-[#111111] dark:text-[#F5EFEB] font-normal leading-snug">
        {title}
      </h3>
      <ul className="space-y-2.5 text-[#333333] dark:text-[#EADBCA] font-sans text-xs sm:text-sm">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span className="font-mono text-[10px] mt-0.5" style={{ color: accent }}>
              ▸
            </span>
            <span className="leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
