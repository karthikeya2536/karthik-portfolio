import { useNavigate, useLocation } from 'react-router-dom';
import { ScrambleText } from './TextAnimations';
import { Magnetic } from './Magnetic';
import { playPageTurnSound, playTactileClick, setSoundEnabled as setAmbientEnabled, getSoundEnabled as getAmbientEnabled } from '../lib/audioFeedback';
import { playTick, playPop, setSoundEnabled as setUiEnabled, getSoundEnabled as getUiEnabled } from '../utils/sound';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

interface NavigationProps {
  onOpenResume?: () => void;
}

export default function Navigation({ onOpenResume }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Combined sound toggle: clicking the speaker icon mutes/unmutes
  // both the ambient sounds (lib/audioFeedback) and the discrete UI
  // sounds (utils/sound). Persisted in localStorage.
  const [soundOn, setSoundOn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('portfolio-sound');
      if (saved !== null) return saved === '1';
    } catch {
      /* storage unavailable */
    }
    return true;
  });

  useEffect(() => {
    setAmbientEnabled(soundOn);
    setUiEnabled(soundOn);
    try {
      localStorage.setItem('portfolio-sound', soundOn ? '1' : '0');
    } catch {
      /* storage unavailable */
    }
  }, [soundOn]);

  const toggleSound = () => {
    setSoundOn((prev) => !prev);
  };

  const handleNavClick = (path: string) => {
    // Tick for the small nav button press, full page-turn for the route
    // change itself.
    playTick();
    playPageTurnSound(1.2);
    playTactileClick('high');
    if (location.pathname !== path) {
      window.scrollTo(0, 0);
      navigate(path);
    }
  };

  const handleThemeToggle = () => {
    // Pop for the small toggle press; the ThemeContext handles the
    // ambient page-turn sound for the visual switch.
    playPop();
    toggleTheme();
  };

  const activeSection = location.pathname.substring(1) || '';

  const navItemClass = (pathName: string) => `flex items-center gap-1 sm:gap-1.5 transition-colors hover:text-[#E04F2B] cursor-pointer py-2 px-1 ${
    activeSection === pathName || (pathName === '' && activeSection === '') ? 'text-[#E04F2B]' : ''
  }`;

  return (
    <header className="w-full bg-[#F4EFE6] dark:bg-[#090807] text-[#111111] dark:text-[#F4EFE6] transition-colors duration-500 z-40 relative border-b border-[#111111]/10 dark:border-[#F4EFE6]/10">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 pt-3 sm:pt-5 pb-2 flex items-center justify-between">
        {/* Brand Logo YK - Architectural Box Emblem */}
        <Magnetic strength={0.3}>
          <button
            onClick={() => handleNavClick('/')}
            className="group flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none py-1"
            data-cursor="pointer"
            aria-label="Home"
          >
            <motion.div 
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
              className="border border-[#111111] dark:border-[#F4EFE6] px-2.5 sm:px-3 py-1 sm:py-1.5 bg-transparent group-hover:bg-[#111111] dark:group-hover:bg-[#F4EFE6] transition-all duration-300"
            >
              <span className="font-serif font-bold text-xl sm:text-3xl tracking-tight text-[#111111] dark:text-[#F4EFE6] group-hover:text-[#F4EFE6] dark:group-hover:text-[#090807] transition-colors leading-none block">
                YK
              </span>
            </motion.div>
            <div className="hidden md:flex flex-col text-left">
              <span className="font-mono text-[9px] tracking-[0.24em] text-[#111111] dark:text-[#F4EFE6] uppercase font-semibold">
                YEMULA KARTHIKEYA
              </span>
              <span className="font-mono text-[8px] tracking-[0.2em] text-[#777777] dark:text-[#888888] uppercase">
                AI/ML · FOLIO '26
              </span>
            </div>
          </button>
        </Magnetic>

        {/* Nav links: 01 HOME   02 ABOUT   03 WORK   04 CONTACT   [THEME SWITCH] */}
        <nav className="flex items-center gap-1.5 xs:gap-3 sm:gap-6 lg:gap-8 text-[9px] xs:text-[10px] sm:text-[12px] font-['Syne',sans-serif] font-bold tracking-[0.08em] xs:tracking-[0.12em] sm:tracking-[0.2em] text-[#111111] dark:text-[#F4EFE6] select-none flex-wrap sm:flex-nowrap justify-end">
          <Magnetic strength={0.2}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('/')}
              className={navItemClass('')}
              data-cursor="pointer"
            >
              <span className="font-mono text-[8px] sm:text-[9px] text-[#E04F2B] font-medium">01</span>
              <ScrambleText as="span" duration={0.4} hoverScramble>
                HOME
              </ScrambleText>
            </motion.button>
          </Magnetic>

          <Magnetic strength={0.2}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('/about')}
              className={navItemClass('about')}
              data-cursor="pointer"
            >
              <span className="font-mono text-[8px] sm:text-[9px] text-[#E04F2B] font-medium">02</span>
              <ScrambleText as="span" duration={0.4} hoverScramble>
                ABOUT
              </ScrambleText>
            </motion.button>
          </Magnetic>

          <Magnetic strength={0.2}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('/work')}
              className={navItemClass('work')}
              data-cursor="pointer"
            >
              <span className="font-mono text-[8px] sm:text-[9px] text-[#E04F2B] font-medium">03</span>
              <ScrambleText as="span" duration={0.4} hoverScramble>
                WORK
              </ScrambleText>
            </motion.button>
          </Magnetic>

          <Magnetic strength={0.2}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('/contact')}
              className={navItemClass('contact')}
              data-cursor="pointer"
            >
              <span className="font-mono text-[8px] sm:text-[9px] text-[#E04F2B] font-medium">04</span>
              <ScrambleText as="span" duration={0.4} hoverScramble>
                CONTACT
              </ScrambleText>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E04F2B] inline-block flex-shrink-0 animate-pulse ml-0.5 sm:ml-1" />
            </motion.button>
          </Magnetic>

          <Magnetic strength={0.25}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={toggleSound}
              aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
              className="group flex items-center gap-1.5 px-2 sm:px-3 py-1 border border-[#111111]/30 dark:border-[#F4EFE6]/30 bg-transparent hover:border-[#E04F2B] dark:hover:border-[#E04F2B] transition-all duration-300 cursor-pointer select-none ml-1 sm:ml-3"
              data-cursor="pointer"
            >
              <span className="font-mono text-[10px] sm:text-[12px] leading-none text-[#111111] dark:text-[#F4EFE6] group-hover:text-[#E04F2B] transition-colors">
                {soundOn ? '♪' : '×'}
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] font-medium text-[#111111] dark:text-[#F4EFE6] group-hover:text-[#E04F2B] transition-colors uppercase">
                {soundOn ? 'SOUND' : 'MUTE'}
              </span>
            </motion.button>
          </Magnetic>

          {/* Theme Switcher Button */}
          <Magnetic strength={0.25}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleThemeToggle}
              aria-label={`Switch to ${theme === 'cream' ? 'Midnight' : 'Cream'} mode`}
              className="group flex items-center gap-1.5 px-2 sm:px-3 py-1 border border-[#111111]/30 dark:border-[#F4EFE6]/30 bg-transparent hover:border-[#E04F2B] dark:hover:border-[#E04F2B] transition-all duration-300 cursor-pointer select-none ml-1 sm:ml-3"
              data-cursor="pointer"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E04F2B] inline-block transition-transform duration-300 group-hover:scale-125" />
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] font-medium text-[#111111] dark:text-[#F4EFE6] group-hover:text-[#E04F2B] transition-colors uppercase">
                {theme === 'cream' ? 'MIDNIGHT' : 'CREAM'}
              </span>
              <span className="font-mono text-[8px] text-[#777777] dark:text-[#888888] font-normal hidden xs:inline">
                {theme === 'cream' ? '◐' : '◑'}
              </span>
            </motion.button>
          </Magnetic>
        </nav>
      </div>
    </header>
  );
}
