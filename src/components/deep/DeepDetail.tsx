import { Link } from 'react-router-dom';
import type { DeepProject, SectionKey } from '../../data/deep';
import type { ProjectDetail } from '../../data/projects';
import { Button, StatusPill, Tags, TOC, label, panel } from '../ui';
import { BlockView } from './BlockView';
import { Dossier, MetricCard, PanelHeader, ProvenanceCard, StepCards, TerminalBlock } from './Panels';

function OriginalContent({ project, field }: {project: ProjectDetail; field: SectionKey}) {
  const value = project[field];
  if (!value) return null;
  if (field === 'reproduce' && typeof value === 'string') return <TerminalBlock file="Terminal" code={value} />;
  if (field === 'findings' && Array.isArray(value) && value.length > 1) {
    return <StepCards items={value.map((body, index) => ({title: 'Finding ' + (index + 1), body}))} />;
  }
  if (Array.isArray(value)) return <ul className="list-disc space-y-2 pl-5">{value.map(item => <li key={item}>{item}</li>)}</ul>;
  return <p>{value}</p>;
}

export function DeepDetail({ project, content, previous, next }: {project: ProjectDetail; content: DeepProject; previous?: ProjectDetail; next?: ProjectDetail}) {
  const primary = project.links.find(link => link.kind === 'paper') ?? project.links.find(link => link.kind === 'demo') ?? project.links[0];
  const sections = content.sections.map((section, index) => ({...section, number: String(index + 1).padStart(2,'0')}));
  const links = primary ? [primary, ...project.links.filter(link => link !== primary)] : [];
  return <article className="mx-auto min-w-0 max-w-[1280px] space-y-7">
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-2 text-sm">
      <p><Link to="/projects" className="underline underline-offset-2">Projects</Link> / <span aria-current="page">{project.shortTitle}</span></p>
      <Link to="/projects">← Back to all projects</Link>
    </nav>
    <header className="space-y-4 border-y border-line py-6 sm:py-8">
      <div className="flex flex-wrap items-center gap-2">
        <StatusPill>{project.status} · {project.dates}</StatusPill>
        <Tags values={project.tags} />
        {content.badges?.map(badge => <span className="rounded bg-coral-fill/15 px-2 py-1 font-mono text-xs text-coral" key={badge}>{badge}</span>)}
      </div>
      <h1 className="max-w-5xl">{project.title}</h1>
      <p className="max-w-4xl text-lg text-muted">{project.oneLiner}</p>
      <p className="text-sm text-muted">{project.role}{project.collaborators && <> · {project.collaborators}</>}</p>
      <div className="flex flex-wrap gap-2">{links.map(link => <Button key={link.href} href={link.href} variant={link === primary ? 'primary' : 'secondary'}>
        {link.kind === 'paper' ? 'Read the preprint' : link.label}
      </Button>)}</div>
    </header>
    {!!content.metrics.length && <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">{content.metrics.map(metric => <MetricCard key={metric.label} metric={metric} />)}</dl>}
    {content.artifact && <section className={panel + ' space-y-4 p-3 sm:p-5'}>
      <PanelHeader eyebrow={content.artifact.eyebrow} title={content.artifact.title} />
      <div className={`grid items-start gap-3 ${content.artifact.split ? 'md:grid-cols-2' : ''}`}>{content.artifact.blocks.map((block, index) =>
        <BlockView block={block} project={project} key={index} />)}</div>
    </section>}
    <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[150px_minmax(0,1fr)_210px] xl:grid-cols-[165px_minmax(0,1fr)_230px]">
      <div className="min-w-0 space-y-4 lg:sticky lg:top-25">
        <TOC sections={sections.map(section => ({ id: section.id, title: section.number + ' · ' + section.title }))} />
        <div className="hidden lg:block"><ProvenanceCard text={content.provenance ?? project.status} title={content.provenance ? undefined : 'Project status'} /></div>
      </div>
      <div className="min-w-0 lg:col-start-3 lg:row-start-1">
        <Dossier project={project} spec={content.dossier} />
      </div>
      <div className="min-w-0 space-y-8 lg:col-start-2 lg:row-start-1">
        {sections.map(section => <section id={section.id} tabIndex={-1} key={section.id} className="scroll-mt-28 space-y-4 border-t border-line pt-5">
          <div><p className={label + ' mb-1'}>Section {section.number}</p><h2>{section.title}</h2></div>
          {section.base?.map(field => <OriginalContent field={field} project={project} key={field} />)}
          {section.blocks.map((block, index) => <BlockView block={block} project={project} key={index} />)}
          {section.id === 'try' && primary?.kind === 'demo' && <Button href={primary.href} variant="primary">{primary.label}</Button>}
        </section>)}
      </div>
    </div>
    <nav aria-label="Adjacent projects" className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
      {previous && <Button to={`/projects/${previous.slug}`}>← {previous.shortTitle}</Button>}
      <Button to="/projects" variant="ghost">All projects</Button>
      {next && <Button to={`/projects/${next.slug}`}>{next.shortTitle} →</Button>}
    </nav>
  </article>;
}
