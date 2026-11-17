import { useSearchParams } from 'react-router-dom';
import { Button, FilterChips, ProjectCard, SectionHeading, label, panel } from '../components/ui';
import { cv } from '../components/Shell';
import { publishedProjects } from '../data/catalog';
import { home, person } from '../data/site';

const tiers = [
  { value: '', label: 'All' }, { value: 'research', label: 'Research' },
  { value: 'software', label: 'Software' }, { value: 'engineering', label: 'Engineering' },
];
const topics = [...new Set(publishedProjects.flatMap(project => project.tags))]
  .sort().map(tag => ({ value: tag, label: tag }));

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const tier = tiers.find(option => option.value === params.get('tier'))?.value ?? '';
  const tag = topics.find(option => option.value === params.get('tag'))?.value ?? '';
  function update(key: 'tier' | 'tag', value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }
  const filtered = publishedProjects.filter(project => (!tier || project.tier === tier) && (!tag || project.tags.includes(tag)));
  const featured = home.featuredProjectSlugs.flatMap(slug => filtered.filter(project => project.featured && project.slug === slug));
  const remaining = filtered.filter(project => !featured.includes(project));
  return <div className="mx-auto max-w-[1120px] space-y-8">
    <header className="space-y-3 border-b border-line pb-6">
      <p className={label}>Projects</p>
      <h1>Things I've built and questions I've asked</h1>
      <p className="max-w-3xl text-muted">Research first, then the software and engineering work around it. Every project links to code, and most to data or a preprint.</p>
    </header>
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterChips name="Project tier" options={tiers} value={tier} onChange={value => update('tier', value)} />
        <p className={label} role="status">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>
      </div>
      <FilterChips name="Project topic" options={[{ value: '', label: 'All topics' }, ...topics]} value={tag}
        onChange={value => update('tag', value === tag ? '' : value)} />
    </div>
    {!!featured.length && <section aria-label="Featured projects" className="grid gap-4 md:grid-cols-3">
      {featured.map(project => <ProjectCard key={project.slug} project={project} variant="featured" />)}
    </section>}
    {!!remaining.length && <section>
      <SectionHeading>More projects</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {remaining.map(project => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </section>}
    <aside className={panel + ' flex flex-wrap items-center justify-between gap-4 bg-tint p-5'}>
      <p className="font-heading text-headline-md">Want the details? My CV and preprint are here.</p>
      <div className="flex flex-wrap gap-2">{cv && <Button href={cv}>Download CV (PDF)</Button>}
        <Button href={person.links.arxiv} variant="primary">Read the preprint</Button></div>
    </aside>
  </div>;
}
