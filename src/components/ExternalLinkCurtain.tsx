import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { gsap } from '../lib/gsap';

interface ExternalLinkContextType {
  navigateToExternal: (url: string, label?: string) => void;
}

const ExternalLinkContext = createContext<ExternalLinkContextType>({
  navigateToExternal: () => {},
});

export const useExternalLink = () => useContext(ExternalLinkContext);

export const ExternalLinkCurtainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const curtainPanelTopRef = useRef<HTMLDivElement | null>(null);
  const curtainPanelBottomRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  const [destinationInfo, setDestinationInfo] = useState<{ url: string; label: string }>({
    url: '',
    label: '',
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateToExternal = (url: string, label?: string) => {
    if (!url) return;

    let displayLabel = label;
    if (!displayLabel) {
      try {
        const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
        displayLabel = parsed.hostname.toUpperCase().replace('WWW.', '');
      } catch {
        displayLabel = 'EXTERNAL LINK';
      }
    }

    setDestinationInfo({ url, label: displayLabel });
    setIsTransitioning(true);

    const topPanel = curtainPanelTopRef.current;
    const bottomPanel = curtainPanelBottomRef.current;
    const labelEl = labelRef.current;
    const lineEl = lineRef.current;

    if (!topPanel || !bottomPanel) {
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsTransitioning(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Open the external target
        window.open(url, '_blank', 'noopener,noreferrer');

        // Graceful curtain exit — also fade the label and the center
        // hairline back to their initial state, so when the user
        // navigates back to the site via the browser history, no
        // overlay text is left on the page.
        gsap.to([topPanel, bottomPanel], {
          scaleY: 0,
          duration: 0.45,
          ease: 'power3.inOut',
          delay: 0.15,
          onComplete: () => {
            setIsTransitioning(false);
            // Reset the inner overlay elements so a future click starts
            // from the same state the first render used. Without this,
            // the label stays at opacity 1 and the hairline stays at
            // scaleX 1 after the curtain plays, which leaves "stuck"
            // text on the page when the user comes back.
            if (labelEl) gsap.set(labelEl, { opacity: 0, y: 15 });
            if (lineEl) gsap.set(lineEl, { scaleX: 0 });
          },
        });
      },
    });

    // Reset initial positions
    gsap.set(topPanel, { scaleY: 0, transformOrigin: 'top center' });
    gsap.set(bottomPanel, { scaleY: 0, transformOrigin: 'bottom center' });
    if (labelEl) gsap.set(labelEl, { opacity: 0, y: 15 });
    if (lineEl) gsap.set(lineEl, { scaleX: 0, transformOrigin: 'center center' });

    // 1. High contrast panels meet in center
    tl.to(
      [topPanel, bottomPanel],
      {
        scaleY: 1,
        duration: 0.38,
        ease: 'power4.inOut',
        stagger: 0.02,
      },
      0
    );

    // 2. Center hairline expands
    if (lineEl) {
      tl.to(
        lineEl,
        {
          scaleX: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.2
      );
    }

    // 3. Editorial departure metadata badge appears
    if (labelEl) {
      tl.to(
        labelEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
        },
        0.22
      );
    }
  };

  // Global click delegator for links marked as external or target="_blank"
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Respect an earlier handler that already called preventDefault
      // (e.g. analytics, custom event interceptors).
      if (e.defaultPrevented) return;
      // Re-entrant guard: a second click during the curtain animation
      // should not start a new transition on top of the running one.
      if (isTransitioning) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest('a') as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Honor an explicit opt-out. Useful for mailto:, tel:, or any
      // anchor the author wants to handle without the curtain.
      if (link.hasAttribute('data-skip-curtain')) return;

      // Only intercept truly external URLs. Skip in-page anchors,
      // relative paths, and OS-handler schemes.
      const isExternalHttp =
        href.startsWith('http://') || href.startsWith('https://');
      const isTargetBlank = link.getAttribute('target') === '_blank';

      if (!isExternalHttp && !isTargetBlank) return;
      // Guard against same-tab internal `<a target="_blank">` to /foo
      // routes — they should not be hijacked either.
      if (isTargetBlank && !isExternalHttp) {
        // Internal target=_blank (e.g. /contact opens in new tab).
        // Open directly without the curtain to avoid the same-site
        // reloading dance.
        e.preventDefault();
        e.stopPropagation();
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const customLabel =
        link.getAttribute('data-cursor-text') ||
        link.getAttribute('data-link-label') ||
        link.innerText.trim();

      navigateToExternal(href, customLabel);
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, [isTransitioning, navigateToExternal]);

  return (
    <ExternalLinkContext.Provider value={{ navigateToExternal }}>
      {children}

      {/* Fullscreen High-Contrast Editorial Curtain Overlay */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className={`fixed inset-0 z-[100000] pointer-events-none ${
          isTransitioning ? 'pointer-events-auto' : ''
        }`}
      >
        {/* Top Half Panel */}
        <div
          ref={curtainPanelTopRef}
          className="absolute top-0 inset-x-0 h-1/2 bg-[#0A0A0A] border-b border-[#E04F2B]/60 will-change-transform"
          style={{ transform: 'scaleY(0)' }}
        />

        {/* Bottom Half Panel */}
        <div
          ref={curtainPanelBottomRef}
          className="absolute bottom-0 inset-x-0 h-1/2 bg-[#0A0A0A] border-t border-[#E04F2B]/60 will-change-transform"
          style={{ transform: 'scaleY(0)' }}
        />

        {/* Center Hairline Line */}
        <div
          ref={lineRef}
          className="absolute top-1/2 inset-x-0 h-[2px] bg-[#E04F2B] -translate-y-1/2 will-change-transform z-10"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Central Departure Monogram & Route Telemetry */}
        <div
          ref={labelRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center select-none"
          style={{ opacity: 0 }}
        >
          <div className="bg-[#111111] border border-[#262626] px-6 py-4 flex flex-col items-center gap-2 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E04F2B] animate-ping" />
              <span className="font-mono text-[10px] tracking-[0.28em] text-[#E04F2B] uppercase font-bold">
                TRANSITIONING // EXTERNAL PROTOCOL
              </span>
            </div>
            <div className="font-serif text-2xl sm:text-3xl text-[#F4EFE6] tracking-tight">
              {destinationInfo.label || 'CONNECTING'}
            </div>
            <div className="font-mono text-[9px] text-[#777777] tracking-[0.2em] max-w-sm truncate">
              {destinationInfo.url}
            </div>
          </div>
        </div>
      </div>
    </ExternalLinkContext.Provider>
  );
};
