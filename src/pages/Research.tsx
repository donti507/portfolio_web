import { CitationCard, ProjectCard, SectionHeading, label } from '../components/ui';
import { projectBySlug } from '../data/catalog';
import { publications } from '../data/site';
import { Interests } from './Home';

export default function Research() {
  return <div className="mx-auto max-w-[1120px] space-y-10">
    <header className="space-y-3 border-b border-line pb-5"><p className={label}>Research</p><h1>Questions I'm working on</h1>
      <p className="text-muted">Two outputs so far, both public, with code.</p></header>
    <Interests />
    <section><SectionHeading>Publications</SectionHeading>
      <ol className="space-y-4">{publications.map((publication, index) =>
        <li className="grid grid-cols-[2rem_1fr] gap-2" key={publication.title}>
          <span aria-hidden="true" className={label + ' pt-4'}>{String(index + 1).padStart(2, '0')}</span>
          <CitationCard publication={publication} />
        </li>)}</ol>
    </section>
    <section><SectionHeading>In progress</SectionHeading>
      <div className="grid gap-4 md:grid-cols-3">{['trust-but-verify', 'adni-brain-age', 'budgetaware-hpo'].map(projectBySlug)
        .map(project => project && <ProjectCard key={project.slug} project={project} />)}</div>
    </section>
    <section className="rounded-lg bg-tint p-5"><SectionHeading>How I work</SectionHeading>
      <ul className="flex flex-wrap gap-x-6 gap-y-2"><li>Preregister</li><li>Release code and data</li><li>Report what failed</li></ul>
    </section>
  </div>;
}
