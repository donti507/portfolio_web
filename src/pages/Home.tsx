import { Link } from 'react-router-dom';
import { Button, CitationCard, Figure, ProjectCard, SectionHeading, StatTile, label, panel } from '../components/ui';
import { cv, email } from '../components/Shell';
import { projectBySlug } from '../data/catalog';
import { asset, hasAsset } from '../data/assets';
import { home, person, publications, researchInterests } from '../data/site';

const interestSlugs = ['fly-connectome', 'adni-brain-age', 'budgetaware-hpo', 'trust-but-verify'];
export function Interests() {
  return <div className="grid gap-4 sm:grid-cols-2">{researchInterests.map((interest, index) => <article className={panel + ' p-5'} key={interest.title}>
    <h3><Link to={`/projects/${interestSlugs[index]}`}>{interest.title}</Link></h3>
    <p className="mt-2 text-muted">{interest.body}</p>
  </article>)}</div>;
}

export default function Home() {
  const figure = projectBySlug('fly-connectome')?.figures?.[0];
  const showFigure = figure && hasAsset(figure.src);
  return <div className="mx-auto max-w-[1120px] space-y-12">
    <section className={`grid items-start gap-7 ${showFigure ? 'md:grid-cols-[1.4fr_1fr]' : ''}`}>
      <div className="space-y-5">
        <p className={label}>{person.name} · Wrocław</p>
        <h1 className="md:text-[42px]">{home.heroTitle}</h1>
        <p className="max-w-3xl text-muted">{home.heroBody}</p>
        <div className="flex flex-wrap gap-2">
          <Button href={person.links.arxiv} variant="primary">Read the preprint</Button>
          {cv && <Button href={cv}>Download CV</Button>}<Button to="/projects" variant="ghost">View projects</Button>
        </div>
      </div>
      {showFigure && <Figure figure={{ ...figure, caption: 'Figure from arXiv:2610.29205' }} priority />}
      {hasAsset('portrait.jpg') && <img src={asset('portrait.jpg')} alt={person.name} className="w-full max-w-60 rounded-lg" />}
    </section>
    <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">{home.stats.map(stat => <StatTile key={stat.label} stat={stat} />)}</dl>
    <section><SectionHeading>Research questions</SectionHeading><Interests /></section>
    <section>
      <div className="flex flex-wrap justify-between gap-2"><SectionHeading>Featured work</SectionHeading><Link to="/projects">All projects →</Link></div>
      <div className="grid gap-4 md:grid-cols-3">{home.featuredProjectSlugs.map(projectBySlug).map(project => project &&
        <ProjectCard key={project.slug} project={project} variant="featured" />)}</div>
    </section>
    <section><SectionHeading>Latest preprint</SectionHeading><CitationCard publication={publications[0]} /></section>
    <section className={panel + ' p-5'}><SectionHeading>Now, Nov 2026</SectionHeading>
      <ul className="list-disc space-y-2 pl-5">{home.now.map(item => <li key={item}>{item}</li>)}</ul>
    </section>
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-tint p-5">
      <h2>Working on something related? I'd like to hear about it.</h2>
      <div className="flex gap-2"><Button href={email} variant="primary">Email</Button><Button to="/cv">CV</Button></div>
    </section>
  </div>;
}
