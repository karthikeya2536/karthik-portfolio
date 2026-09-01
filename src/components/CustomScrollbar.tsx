import React, { useEffect, useRef, useState } from 'react';
import { useScrollMotion } from './SmoothScroll';

export function CustomScrollbar() {
  const { scrollProgress, scrollTo } = useScrollMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Hide the native scrollbar
  useEffect(() => {
    document.documentElement.style.setProperty('--hide-scrollbar', '1');
    const style = document.createElement('style');
    style.innerHTML = `
      ::-webkit-scrollbar {
        display: none;
      }
      * {
        scrollbar-width: none; /* Firefox */
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
      document.documentElement.style.removeProperty('--hide-scrollbar');
    };
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    handleDrag(e);
  };

  const handleDrag = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!trackRef.current) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    
    // Calculate progress based on mouse position within the track
    let newProgress = (clientY - trackRect.top) / trackRect.height;
    newProgress = Math.max(0, Math.min(1, newProgress));
    
    // Calculate target scroll Y
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = newProgress * totalScroll;
    
    scrollTo(targetY, { immediate: false, duration: 0.1 });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDrag, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  return (
    <div
      className="fixed right-0 top-0 bottom-0 w-6 z-[100] group hidden md:block"
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {/* Track hairline — only visible on hover, or once the user has
          actually scrolled past 1% (so it doesn't draw a stray vertical
          line at the top of the page before any scroll has happened). */}
      <div
        className={`absolute right-2 top-4 bottom-4 w-px transition-colors ${
          scrollProgress > 1
            ? 'bg-[#111111]/15'
            : 'bg-transparent group-hover:bg-[#111111]/20'
        }`}
        ref={trackRef}
      />
      <div
        className="absolute right-2 top-4 bottom-4 w-px pointer-events-none"
      >
        <div
          className="absolute right-[-1px] w-[3px] h-12 bg-[#E04F2B] transform -translate-y-1/2 rounded-full transition-transform duration-75 ease-out shadow-sm"
          style={{ top: `${scrollProgress}%` }}
        />
        {/* Subtle text indicator */}
        <div
          className="absolute right-3 font-mono text-[9px] text-[#E04F2B] font-bold tracking-widest transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap select-none"
          style={{ top: `${scrollProgress}%` }}
        >
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </div>
  );
}
