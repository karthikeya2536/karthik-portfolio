import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectCaseStudy from '../components/ProjectCaseStudy';
import { useScrollMotion } from '../components/SmoothScroll';

/**
 * Dedicated case-study page for a single project. URL form: /work/:projectId
 * (the `:projectId` segment is the content.ts slug, e.g. "sonicstream").
 *
 * `ProjectCaseStudy` itself handles slug lookup against both data files and
 * renders either the full or short-form case study, so this page is just
 * a route wrapper that scrolls to top on slug change.
 */
export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { scrollTo } = useScrollMotion();

  useEffect(() => {
    scrollTo(0, { immediate: true, duration: 0 });
  }, [projectId, scrollTo]);

  return <ProjectCaseStudy projectId={projectId} />;
}
