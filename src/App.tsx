import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectPage from './pages/ProjectPage';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import CustomCursor from './components/CustomCursor';
import { SmoothScrollProvider } from './components/SmoothScroll';
import { ExternalLinkCurtainProvider } from './components/ExternalLinkCurtain';
import { CustomScrollbar } from './components/CustomScrollbar';
import { ScrollToTop } from './components/ScrollToTop';
import { Preloader } from './components/Preloader';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SmoothScrollProvider>
          <ExternalLinkCurtainProvider>
            <ScrollToTop />
            <Preloader onComplete={() => console.log("App loaded")} />
            <div className="min-h-screen bg-[#F4EFE6] dark:bg-[#090807] text-[#111111] dark:text-[#F4EFE6] flex flex-col selection:bg-[#E04F2B] selection:bg-opacity-100 selection:text-[#F4EFE6] relative transition-colors duration-500">
              <CustomCursor />
              <CustomScrollbar />

              <Navigation onOpenResume={() => setResumeOpen(true)} />

              <main className="flex-1 w-full relative">
                {/* Page transitions are owned by each page's <PageTransition>
                    wrapper. Routing the keyed AnimatePresence here as well
                    caused the two systems to fight (the outer keyed wrapper
                    had no animation props, so the inner PageTransition's
                    `exit` animation never fired). */}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/work/:projectId" element={<ProjectPage />} />
                  <Route path="/work/:projectId/*" element={<ProjectPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
              <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
            </div>
          </ExternalLinkCurtainProvider>
        </SmoothScrollProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
