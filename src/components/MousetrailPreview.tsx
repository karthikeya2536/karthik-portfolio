// Floating mousetrail preview that follows the cursor with eased
// (lerped) movement and fades in/out as a card row is hovered.
//
// The mousetrail is intended to be a *sibling* of the card list, not a
// replacement — the cards handle their own hover state, click navigation,
// and visual design. This component only renders the floating image and
// is `pointer-events: none` so it never interferes with the cards.
//
// The preview is rendered into a React portal at document.body so it
// escapes any ancestor `transform` / `filter` / `perspective` that
// would otherwise turn `position: fixed` into a scroll-relative
// position. (Several ancestors in this app use GSAP transforms and
// `will-change-transform` for scroll-driven animations.)

import { useEffect, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';

// The ImageData shape this component expects from its consumer. Lifted
// out of the now-deleted ui/image-reveal.tsx; if you add an shadcn-style
// image-reveal later, move this back to that module and re-import.
export interface ImageData {
  id: number;
  src: string;
  alt: string;
  href?: string;
}

export interface MousetrailPreviewProps {
  /** The images to show. The order should match the cards' visual order. */
  images: ImageData[];
  /** The container whose rows the mousetrail listens to (for mouseenter/leave). */
  containerRef: RefObject<HTMLElement | null>;
  /** The data-attribute used to find each card row. Default: `data-trail-row`. */
  rowSelector?: string;
  /** The data-attribute on each row that holds the row's index. */
  indexAttr?: string;
  /** Preview image width in pixels. Default: 320. */
  width?: number;
  /** Preview image height in pixels. Default: 200. */
  height?: number;
  /** How aggressively the preview follows the cursor (0..1). Default: 0.55.
   *  Higher = snappier; the preview catches up to the cursor faster
   *  when moving between cards. */
  ease?: number;
  /** Pixel offset from the cursor to the preview's top-left corner. */
  offsetX?: number;
  offsetY?: number;
}

export default function MousetrailPreview({
  images,
  containerRef,
  rowSelector = 'data-trail-row',
  indexAttr = 'data-trail-index',
  width = 320,
  height = 200,
  ease = 0.55,
  offsetX = 12,
  offsetY = 12,
}: MousetrailPreviewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.85);
  const rafRef = useRef<number | null>(null);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mirror the cursor position into a ref so the rAF loop can read it
  // without React state churn.
  const targetPosRef = useRef({ x: 0, y: 0 });
  // The preview's own position lives in a ref too — the rAF loop writes
  // to it directly and we project it to the DOM in the same loop, so
  // the preview never has to wait for a React render to update.
  const posRef = useRef({ x: 0, y: 0 });
  // Live handle to the floating div so the rAF can update its style
  // without forcing a React re-render.
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Track the cursor. Un-throttled — throttling made the preview
  // visibly lag on the lower cards. We ALSO write directly to the
  // preview element here so the preview tracks the cursor immediately,
  // even if the rAF loop is somehow stalled. The rAF loop then smooths
  // the position via lerp on top of this.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      // If the preview is mounted and visible, snap it to the cursor
      // immediately so there's zero visible lag between the cursor
      // and the preview.
      const el = previewRef.current;
      if (el) {
        el.style.transform = `translate3d(${e.clientX + offsetX}px, ${e.clientY + offsetY}px, 0) scale(${scaleRef.current})`;
        posRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [offsetX, offsetY]);

  // Lerp toward the cursor on every frame WHILE A ROW IS ACTIVE.
  // When no row is active, the rAF loop is paused so the component
  // does not consume CPU when the user is not hovering the list.
  // The loop writes directly to the DOM via previewRef, so we don't
  // pay for a React render on every animation frame.
  useEffect(() => {
    if (activeIndex === null) return;
    const tick = () => {
      const target = targetPosRef.current;
      const prev = posRef.current;
      // Lerp the ref in place — no React state update.
      prev.x += (target.x - prev.x) * ease;
      prev.y += (target.y - prev.y) * ease;
      // Project to the DOM. We do this every frame so the preview
      // visually catches up to the cursor even on the lower rows.
      const el = previewRef.current;
      if (el) {
        el.style.transform = `translate3d(${prev.x + offsetX}px, ${prev.y + offsetY}px, 0) scale(${scaleRef.current})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [activeIndex, ease, offsetX, offsetY]);

  // Mirror the scale state into a ref so the rAF loop can read the
  // latest value without re-binding the effect.
  const scaleRef = useRef(scale);
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  // When the active row changes, snap the preview's position to the
  // current cursor location. Without this, the preview would have to
  // lerp from wherever it was on the previous row, which makes it
  // look "stuck" on the first card when the user moves down the list.
  useEffect(() => {
    if (activeIndex === null) return;
    posRef.current = { ...targetPosRef.current };
  }, [activeIndex]);

  // Listen to row enter/leave via the container ref.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const handleEnter = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // Walk up to the row element (the one with [data-trail-row]).
      let row: HTMLElement | null = target.closest(`[${rowSelector}]`);
      if (!row) return;
      const idxAttr = row.getAttribute(indexAttr);
      const idx = idxAttr ? Number(idxAttr) : NaN;
      if (Number.isNaN(idx)) return;

      // Cancel any pending hide, then show.
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      setActiveIndex(idx);
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = setTimeout(() => {
        setOpacity(1);
        setScale(1);
      }, 40);
    };

    const handleLeave = (e: Event) => {
      // Only hide when the cursor leaves the entire container, not
      // when it crosses between rows.
      const related = (e as MouseEvent).relatedTarget as Node | null;
      if (related && root.contains(related)) return;
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = null;
      }
      setOpacity(0);
      setScale(0.85);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        setActiveIndex(null);
      }, 250);
    };

    root.addEventListener('mouseover', handleEnter as EventListener);
    root.addEventListener('mouseout', handleLeave as EventListener);
    return () => {
      root.removeEventListener('mouseover', handleEnter as EventListener);
      root.removeEventListener('mouseout', handleLeave as EventListener);
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [containerRef, rowSelector, indexAttr]);

  // Touch devices: don't render the floating preview (mobile shows the
  // image inline below the title instead — handled by the card itself
  // if you want to add that; out of scope for the mousetrail).
  const isCoarsePointer =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  const active = activeIndex !== null ? images[activeIndex] : null;

  if (isCoarsePointer || !active) return null;

  // Render into document.body so the preview escapes any ancestor
  // transform/filter that would otherwise break position:fixed.
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={previewRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[80] pointer-events-none rounded-md overflow-hidden border border-[#3a3a3a] bg-[#0A0A0A] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] will-change-transform"
      style={{
        // Initial position matches the cursor so the preview is
        // visually anchored on the very first frame after mount.
        // The rAF loop then takes over and updates the transform
        // directly via previewRef.
        transform: `translate3d(${targetPosRef.current.x + offsetX}px, ${targetPosRef.current.y + offsetY}px, 0) scale(${scale})`,
        width: `${width}px`,
        height: `${height}px`,
        opacity,
        transition: 'opacity 220ms ease-out',
      }}
    >
      <img
        src={active.src}
        alt=""
        className="w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#F3EFEA]">
        {active.alt}
      </div>
    </div>,
    document.body
  );
}
