import NotesAndContact from '../components/NotesAndContact';
import ContactStrip from '../components/ContactStrip';
import { EditorialSectionReveal } from '../components/EditorialReveal';
import { PageTransition } from '../components/PageTransition';

export default function Contact() {
  return (
    <PageTransition>
      <div className="flex flex-col w-full">
        <EditorialSectionReveal>
          <NotesAndContact />
        </EditorialSectionReveal>

        <EditorialSectionReveal>
          <ContactStrip />
        </EditorialSectionReveal>
      </div>
    </PageTransition>
  );
}
