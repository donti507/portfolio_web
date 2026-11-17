import { Link } from 'react-router-dom';
import { Button, CitationCard, SectionHeading, Tags, Timeline, label } from '../components/ui';
import { cv } from '../components/Shell';
import { publishedProjects } from '../data/catalog';
import { education, honors, person, publications, skills } from '../data/site';
import { Experience } from './About';

function dateOrder(value: string) {
  const year = /(?:19|20)\d{2}/.exec(value)?.[0];
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(value.slice(0, 3));
  return Number(year ?? 0) * 12 + month;
}
const researchProjects = publishedProjects.filter(project => project.tier !== 'engineering')
  .sort((left, right) => dateOrder(right.dates) - dateOrder(left.dates));

export default function CV() {
  return <article className="cv mx-auto max-w-[1000px]">
    <header className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
      <div><p className={label}>CV</p><h1>{person.name}</h1><p className="mt-2 text-muted">{person.tagline}</p></div>
    </header>
    {cv && <div className="sticky top-22 z-10 mb-5 flex justify-end print:hidden"><Button href={cv} variant="primary">Download PDF</Button></div>}
    <div className="grid gap-6 md:grid-cols-[90px_minmax(0,1fr)]">
      <aside aria-label="Timeline years" className="hidden md:block print:hidden"><ol className={label + ' sticky top-38 space-y-5 border-l border-line pl-3'}>
        {['2026', '2025', '2024', '2023'].map(year => <li key={year}>{year}</li>)}
      </ol></aside>
      <div className="space-y-8">
        <section><SectionHeading>Education</SectionHeading><Timeline>{education.map(item => <li key={item.degree}>
          <p className={label}>{item.dates}</p><h3>{item.degree}</h3><p>{item.school} · {item.location}</p>
        </li>)}</Timeline></section>
        <section><SectionHeading>Honors</SectionHeading><Timeline>{honors.filter(item => !item.title.includes('IBM Z'))
          .map(item => <li key={item.title}><p className={label}>{item.date}</p><p>{item.title}</p></li>)}</Timeline></section>
        <section><SectionHeading>Publications</SectionHeading><div className="space-y-3">{publications.map(publication =>
          <CitationCard key={publication.title} publication={publication} compact />)}</div></section>
        <section><SectionHeading>Research projects</SectionHeading><ul className="divide-y divide-line border-y border-line">
          {researchProjects.map(project => <li key={project.slug} className="flex flex-wrap justify-between gap-2 py-2">
            <Link to={`/projects/${project.slug}`}>{project.shortTitle}</Link><span className={label}>{project.dates}</span>
          </li>)}
        </ul></section>
        <section><SectionHeading>Experience and leadership</SectionHeading><Experience /></section>
        <section><SectionHeading>Skills</SectionHeading><dl className="space-y-3">{Object.entries(skills).map(([name, values]) =>
          <div key={name}><dt className="mb-1 font-semibold">{name}</dt><dd><Tags values={values} /></dd></div>)}</dl></section>
      </div>
    </div>
  </article>;
}
