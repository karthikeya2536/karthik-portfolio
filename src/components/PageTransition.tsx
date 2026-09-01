import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const location = useLocation();

  return (
    <div style={{ perspective: '2000px' }} className="w-full">
      {/* AnimatePresence is required for the motion.div's `exit` prop
          to actually fire on route change. The keyed location.pathname
          tells AnimatePresence to remove the previous page and mount
          the new one as a coordinated transition. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(12px)', x: 0, rotateY: 0, rotateX: 0 }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0, rotateY: 0, rotateX: 0 }}
          exit={{ opacity: 0, x: '-100vw', filter: 'blur(8px)', scale: 0.98, rotateY: -10, rotateX: 0 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ transformOrigin: '0% 50%', transformStyle: 'preserve-3d' }}
          className={`w-full min-h-[calc(100vh-80px)] ${className}`}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
