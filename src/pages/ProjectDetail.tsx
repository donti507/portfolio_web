import { useEffect } from 'react';
import { person } from '../data/site';
import { Link, useParams } from 'react-router-dom';
import { Button, CodeBlock, Figure, LimitsCallout, SideCard, StatTile, StatusPill, Tags, TOC, label } from '../components/ui';
import { publishedProjects, projectBySlug } from '../data/catalog';
import { hasAsset } from '../data/assets';
import type { ProjectDetail as Project } from '../data/projects';
import NotFound from './NotFound';
import Signature from './Signature';
import { deepProjects } from "../data/deep";
import { DeepDetail } from "../components/deep/DeepDetail";

const unordered = (items: string[]) => <ul className="list-disc space-y-2 pl-5">{items.map(item => <li key={item}>{item}</li>)}</ul>;

function Details({ project }: { project: Project }) {
  const index = publishedProjects.indexOf(project);
  const previous = publishedProjects[index - 1];
  const next = publishedProjects[index + 1];
  const content = deepProjects[project.slug];
  if (content) return <DeepDetail project={project} content={content} previous={previous} next={next} />;
  const primary = project.links.find(link => link.kind === 'paper') ??
    project.links.find(link => link.kind === 'demo') ?? project.links.find(link => link.kind === 'code');
  const ongoing = project.status === 'Ongoing' || project.status === 'Pre-analysis';
  const figures = project.figures?.filter(figure => hasAsset(figure.src)) ?? [];
  const hasSignatureFigure = project.slug === 'fly-connectome' || project.slug === 'connectometwin';
  const bodyFigures = hasSignatureFigure ? figures.filter(figure => figure.src !== project.figures?.[0]?.src) : figures;
  const sections = [
    { id: 'question', title: 'The question', body: project.question && <p>{project.question}</p> },
    { id: 'importance', title: 'Why it matters', body: project.why && <p>{project.why}</p> },
    { id: 'approach', title: 'What I did', body: project.approach.length ? <ol className="list-decimal space-y-2 pl-5">
      {project.approach.map(item => <li key={item}>{item}</li>)}</ol> : null },
    { id: 'findings', title: 'What I found', body: ongoing ? <div className="rounded-lg bg-tint p-5">
      <p className={label + ' mb-2'}>In progress</p>{!!project.findings.length && unordered(project.findings)}
    </div> : project.findings.length ? unordered(project.findings) : null },
    { id: 'limits', title: 'What this does not show', body: project.limits.length ? <LimitsCallout>{unordered(project.limits)}</LimitsCallout> : null },
    { id: 'reproduce', title: 'Reproduce it', body: project.reproduce && <CodeBlock value={project.reproduce} /> },
    { id: 'next', title: "What's next", body: project.next && <p>{project.next}</p> },
  ].filter(section => section.body);
  return <article className="mx-auto max-w-[1120px] space-y-8">
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-2 text-sm">
      <p><Link to="/projects">Projects</Link><span aria-hidden="true"> / </span><span aria-current="page">{project.shortTitle}</span></p>
      <Link to="/projects">← Back to all projects</Link>
    </nav>
    <header className="space-y-4 border-y border-line py-7 sm:py-9">
      <StatusPill>{project.status} · {project.dates}</StatusPill>
      <h1 className="max-w-4xl">{project.title}</h1>
      <p className="max-w-3xl text-lg text-muted">{project.oneLiner}</p>
      <p className="text-sm text-muted">{project.role}{project.collaborators && <> · {project.collaborators}</>}</p>
      <div className="flex flex-wrap gap-2">{project.links.map(link =>
        <Button key={link.href} href={link.href} variant={link === primary ? 'primary' : 'secondary'}>{link.label}</Button>)}</div>
    </header>
    {!!project.stats.length && <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">{project.stats.map(stat => <StatTile key={stat.label} stat={stat} />)}</dl>}
    {project.slug === 'fly-connectome' && project.figures?.[0] && <Figure figure={project.figures[0]} />}
    <Signature project={project} />
    <div className="grid gap-7 lg:grid-cols-[160px_minmax(0,1fr)_230px]">
      <div className="min-w-0"><TOC sections={sections} /></div>
      <div className="min-w-0 space-y-8">
        {sections.map(section => <div key={section.id}>
          <section id={section.id} tabIndex={-1} className="scroll-mt-28 space-y-3">
            <h2>{section.title}</h2>{section.body}
          </section>
          {section.id === 'findings' && !!bodyFigures.length && <div className="mt-6 space-y-4">
            {bodyFigures.map(figure => <Figure key={figure.src} figure={figure} />)}
          </div>}
        </div>)}
      </div>
      <div><SideCard title="Project details">
        <dl className="space-y-2 text-sm">
          <div><dt className={label}>Dates</dt><dd>{project.dates}</dd></div>
          <div><dt className={label}>Role</dt><dd>{project.role}</dd></div>
          {project.collaborators && <div><dt className={label}>Collaborators</dt><dd>{project.collaborators}</dd></div>}
        </dl>
        <Tags values={project.stack} />
        <ul className="space-y-2 text-sm">{project.links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
      </SideCard></div>
    </div>
    <nav aria-label="Adjacent projects" className="flex flex-wrap justify-between gap-4 border-t border-line pt-5">
      {previous && <Link to={`/projects/${previous.slug}`}>← {previous.shortTitle}</Link>}
      {next && <Link className="ml-auto" to={`/projects/${next.slug}`}>{next.shortTitle} →</Link>}
    </nav>
  </article>;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectBySlug(slug ?? '');
  useEffect(() => {
    document.title = `${project?.shortTitle ?? 'Page not found'} · ${person.name}`;
  }, [project]);
  return project ? <Details project={project} /> : <NotFound />;
}
