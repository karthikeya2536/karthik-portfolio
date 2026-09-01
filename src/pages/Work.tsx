import SelectedWork from '../components/SelectedWork';
import OpenSourceFootprint from '../components/OpenSourceFootprint';
import { EditorialSectionReveal } from '../components/EditorialReveal';
import { PageTransition } from '../components/PageTransition';

export default function Work() {
  return (
    <PageTransition>
      <div className="flex flex-col w-full">
        <EditorialSectionReveal>
          <SelectedWork />
        </EditorialSectionReveal>

        <EditorialSectionReveal>
          <OpenSourceFootprint />
        </EditorialSectionReveal>
      </div>
    </PageTransition>
  );
}
