import AboutSection from '../components/AboutSection';
import MiniTimeline from '../components/MiniTimeline';
import { EditorialSectionReveal } from '../components/EditorialReveal';
import { PageTransition } from '../components/PageTransition';

export default function About() {
  return (
    <PageTransition>
      <div className="flex flex-col w-full">
        <EditorialSectionReveal>
          <AboutSection />
        </EditorialSectionReveal>

        <EditorialSectionReveal>
          <MiniTimeline />
        </EditorialSectionReveal>
      </div>
    </PageTransition>
  );
}
