import { CURRENTLY, PROFILE_METRICS } from '../data/portfolioData';
import { contact, identity } from '../data/content';
import { ScrambleText } from './TextAnimations';
import { Parallax } from './Parallax';
import { HeadingReveal } from './HeadingReveal';
import { Mail, Clock, MapPin, Sparkles, Radio } from 'lucide-react';
import type { ReactNode } from 'react';

export default function ContactStrip() {
  return (
    <section
      id="contact-strip"
      className="relative w-full bg-[#F4F0EB] dark:bg-[#060505] text-[#111111] dark:text-[#F5EFEB] py-16 sm:py-24 border-b border-[#E2DBD2] dark:border-[#1E1C19] overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 space-y-10 sm:space-y-14">
        {/* Header */}
        <HeadingReveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#D5CCC0] dark:border-[#1E1C19] pb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#E04F2B] tracking-[0.24em] uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E04F2B] animate-pulse" />
                <ScrambleText duration={0.6} hoverScramble>
                  ( CHANNELS OPEN )
                </ScrambleText>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.05] tracking-tight mt-2">
                How to reach me
              </h2>
              <p className="max-w-2xl text-xs sm:text-sm text-[#555555] dark:text-[#A0988C] font-sans font-light leading-relaxed mt-2">
                The fastest path to my inbox, the response time to expect, and the kinds of
                inquiries I'll prioritise.
              </p>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E04F2B] font-semibold text-right">
              <div>STATUS · {CURRENTLY.status.toUpperCase()}</div>
              <div className="text-[#555] dark:text-[#E04F2B] mt-0.5 font-normal">
                {CURRENTLY.availableFrom.toUpperCase()}
              </div>
            </div>
          </div>
        </HeadingReveal>

        {/* Contact cards grid — built from contact.channels (max 3) */}
        <Parallax speed={-0.04}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D5CCC0] dark:bg-[#1E1C19] border border-[#D5CCC0] dark:border-[#1E1C19]">
            <Card
              icon={<Mail className="w-4 h-4" />}
              label={contact.channels[0]?.label ?? 'EMAIL'}
              value={contact.channels[0]?.value ?? identity.email}
              href={contact.channels[0]?.href}
            />
            <Card
              icon={<Clock className="w-4 h-4" />}
              label="RESPONSE SLA"
              value={CURRENTLY.responseSLA}
            />
            <Card
              icon={<MapPin className="w-4 h-4" />}
              label="LOCATION / TIMEZONE"
              value="Hyderabad, India · IST +5:30"
            />
          </div>
        </Parallax>

        {/* What I'll prioritise */}
        <Parallax speed={0.05}>
          <div className="border-t border-[#D5CCC0] dark:border-[#1E1C19] pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#E04F2B] tracking-[0.24em] uppercase font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <ScrambleText duration={0.5} hoverScramble>
                  PRIORITISE
                </ScrambleText>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#111] dark:text-[#F5EFEB] font-normal mt-2 mb-3">
                What I'll reply to first
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#333] dark:text-[#EADBCA] font-sans">
                {CURRENTLY.openTo.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#E04F2B] font-mono mt-0.5">▸</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#E04F2B] tracking-[0.24em] uppercase font-semibold">
                <Radio className="w-3.5 h-3.5" />
                <ScrambleText duration={0.5} hoverScramble>
                  CONTEXT
                </ScrambleText>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#111] dark:text-[#F5EFEB] font-normal mt-2 mb-3">
                What I bring
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#333] dark:text-[#EADBCA] font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-[#E04F2B] font-mono mt-0.5">·</span>
                  Production experience on systems at {PROFILE_METRICS.productionRecords} scale
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E04F2B] font-mono mt-0.5">·</span>
                  Inference latency budgets at {PROFILE_METRICS.inferenceLatencyMs} p95
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E04F2B] font-mono mt-0.5">·</span>
                  Drift-aware ML pipelines ({PROFILE_METRICS.predictionStabilityPct} stability)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E04F2B] font-mono mt-0.5">·</span>
                  Civic leadership at {PROFILE_METRICS.leadershipFundsRaised} budget scale
                </li>
              </ul>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}

function Card({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="bg-[#F4F0EB] dark:bg-[#0A0806] p-6 sm:p-7 h-full space-y-3 hover:bg-[#EAE4DC] dark:hover:bg-[#14100C] transition-colors">
      <div className="flex items-center gap-2 text-[#E04F2B]">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
          {label}
        </span>
      </div>
      <div className="font-mono text-sm sm:text-base text-[#111] dark:text-[#F5EFEB] break-words">
        {value}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block" data-cursor="pointer">
        {inner}
      </a>
    );
  }
  return inner;
}
