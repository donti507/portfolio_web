import { useState } from 'react';
import { Button, FilterChips, SectionHeading, Timeline, label, panel } from '../components/ui';
import { publishedExperience } from '../data/catalog';
import { certifications } from '../data/site';
import { photos } from '../data/photos';
import { PhotoImage } from '../components/PhotoImage';

export function Experience() {
  return <Timeline>{publishedExperience.map(entry => <li key={entry.role} className="space-y-1">
    <p className={label}>{entry.dates} · {entry.type}</p><h3>{entry.role}</h3><p className="text-sm text-muted">{entry.org}</p>
    <ul className="list-disc space-y-1 pl-5">{entry.points.map(point => <li key={point}>{point}</li>)}</ul>
  </li>)}</Timeline>;
}

const groups = ['All', 'AI & data', 'Cloud & systems', 'Competitions', 'Other'].map(value => ({ value, label: value }));

export default function About() {
  const [group, setGroup] = useState('All');
  const [expanded, setExpanded] = useState(false);
  const matches = certifications.filter(item => group === 'All' || item.group === group);
  const shown = expanded ? matches : matches.slice(0, 6);
  // TODO(Ali): personal background paragraph
  return <div className="mx-auto max-w-[1120px] space-y-9">
    <header className="max-w-3xl space-y-3"><h1>About</h1>
      <p>In Wrocław I study Applied Computer Science and spend most of my time on research about connectomes, HPC and LLM reliability.</p>
      <p>Outside research I present science news on Radio LUZ, run an IBM Z club and help a student rocketry team.</p>
    </header>
    <section><SectionHeading>Experience</SectionHeading><Experience /></section>
    <section className="space-y-4">
      <SectionHeading>Certifications</SectionHeading>
      <FilterChips name="Certification groups" options={groups} value={group} onChange={value => { setGroup(value); setExpanded(false); }} />
      <div className={panel + ' overflow-hidden'}>
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-tint"><tr><th scope="col" className="p-2 sm:p-3">Certification</th><th scope="col" className="p-2 sm:p-3">Issuer</th><th scope="col" className="p-2 sm:p-3">Date</th></tr></thead>
          <tbody>{shown.map(item => <tr key={item.title} className="border-t border-line">
            <th scope="row" className="p-2 font-semibold sm:p-3">{item.title}</th>
            <td className="p-2 sm:p-3">{item.issuer}</td><td className="p-2 sm:p-3">{item.date}</td>
          </tr>)}</tbody>
        </table>
      </div>
      {matches.length > 6 && <Button onClick={() => setExpanded(value => !value)}>{expanded ? 'Show fewer' : `Show all ${matches.length}`}</Button>}
    </section>
    {photos.length >= 3 && <section><SectionHeading>Photography</SectionHeading>
      <div className="mb-4 grid grid-cols-3 items-start gap-3">{photos.slice(0, 3).map(photo =>
        <PhotoImage key={photo.src800} photo={photo} sizes="33vw" className="rounded-lg border border-line" />)}</div>
      <Button to="/photography">See more photos →</Button>
    </section>}
  </div>;
}
