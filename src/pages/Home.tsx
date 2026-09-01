import Hero from '../components/Hero';
import SelectedWork from '../components/SelectedWork';
import ImpactRibbon from '../components/ImpactRibbon';
import CapabilitiesConstellation from '../components/CapabilitiesConstellation';
import CurrentlyBuilding from '../components/CurrentlyBuilding';
import { EditorialSectionReveal } from '../components/EditorialReveal';
import { PageTransition } from '../components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col w-full">
        <Hero />

        <EditorialSectionReveal>
          <SelectedWork />
        </EditorialSectionReveal>

        <EditorialSectionReveal>
          <ImpactRibbon />
        </EditorialSectionReveal>

        <EditorialSectionReveal>
          <CapabilitiesConstellation />
        </EditorialSectionReveal>

        <EditorialSectionReveal>
          <CurrentlyBuilding />
        </EditorialSectionReveal>
      </div>
    </PageTransition>
  );
}
