import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Copy, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProjectDetail, Stat, Figure as FigureData } from '../../data/projects';
import { asset, hasAsset } from '../../data/assets';

export const panel = 'rounded-lg border border-line bg-card';
export const label = 'font-mono text-xs uppercase tracking-wide text-muted';

export function Button({ children, href, to, variant = 'secondary', onClick }: {
  children: ReactNode; href?: string; to?: string; variant?: 'primary' | 'secondary' | 'ghost'; onClick?: () => void;
}) {
  const styles = {
    primary: 'border-primary bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary',
    secondary: 'border-line bg-card text-primary hover:bg-tint',
    ghost: 'border-transparent text-primary hover:bg-tint',
  };
  const className = `inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-3.5 py-2 text-sm font-semibold ${styles[variant]}`;
  if (to) return <Link className={className} to={to}>{children}</Link>;
  if (href) return <a className={className} href={href}>{children}</a>;
  return <button type="button" className={className} onClick={onClick}>{children}</button>;
}

export function StatusPill({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 font-mono text-xs text-tertiary">
    <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />{children}
  </span>;
}

export function StatTile({ stat }: { stat: Stat }) {
  return <div className={panel + ' p-4'}>
    <dt className="font-heading text-3xl text-coral">{stat.value}</dt>
    <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
  </div>;
}

export function Tags({ values }: { values: string[] }) {
  return <ul className="flex flex-wrap gap-2">{values.map(value => <li key={value} className="rounded bg-tint px-2 py-1 font-mono text-xs text-muted">{value}</li>)}</ul>;
}

export function FilterChips({ options, value, onChange, name }: {
  options: Array<{ value: string; label: string }>; value: string; onChange: (value: string) => void; name: string;
}) {
  return <div className="flex flex-wrap gap-2" role="group" aria-label={name}>{options.map(option =>
    <button key={option.value} type="button" aria-pressed={option.value === value} onClick={() => onChange(option.value)}
      className="min-h-9 rounded-full border border-line bg-card px-3 text-sm text-muted hover:bg-tint aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary">
      {option.label}
    </button>)}</div>;
}

import figureDimensions from "../../data/figure-dimensions.json";
import photos from "../../data/photography.json";
interface MediaSize { width: number; height: number }
const dimensions: Record<string, MediaSize> = { ...figureDimensions, ...Object.fromEntries(photos.map(photo => [photo.src, photo])) };
export function Figure({ figure, priority = false, interactive = true }: {
  figure: FigureData; priority?: boolean; interactive?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  if (!hasAsset(figure.src)) return null;
  const webp = figure.src.replace(/\.png$/, '.webp');
  const size = dimensions[figure.src];
  const image = (large = false) => <picture className="block">
    {webp !== figure.src && hasAsset(webp) && <source type="image/webp" srcSet={asset(webp)} />}
    <img src={asset(figure.src)} alt={figure.alt} width={size?.width} height={size?.height}
      loading={priority || large ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined}
      className={large ? 'max-h-[74dvh] w-auto object-contain' : 'h-auto w-full rounded-md object-contain'} />
  </picture>;
  return <figure className={panel + ' overflow-hidden p-3'}>
    {interactive ? <button type="button" aria-label={`Enlarge ${figure.alt}`} className="block w-full"
      onClick={() => { dialog.current?.showModal(); setOpen(true); }}>{image()}</button> : image()}
    {figure.caption && <figcaption className="mt-2 text-sm text-muted">{figure.caption}</figcaption>}
    {interactive && <dialog ref={dialog} onClose={() => setOpen(false)} aria-label={figure.alt}
      className="fixed inset-0 m-auto max-h-[94dvh] max-w-[94vw] rounded-lg bg-card p-4 text-ink backdrop:bg-ink/75">
      <button type="button" autoFocus aria-label="Close image" className="mb-2 ml-auto block p-2"
        onClick={() => dialog.current?.close()}><X /></button>
      {open && image(true)}
    </dialog>}
  </figure>;
}

export function ProjectCard({ project, variant = 'compact', placement }: {
  project: ProjectDetail;
  variant?: 'compact' | 'featured';
  placement?: 'lead' | 'support';
}) {
  const featured = variant === 'featured';
  const figure = featured ? project.figures?.[0] : undefined;
  const linkNames = { paper: 'Paper', code: 'Code', prereg: 'Preregistration', demo: 'Demo', data: 'Data' } as const;
  const links = project.links.slice(0, 3);
  const artwork = figure && <Figure figure={placement === 'support' ? { ...figure, caption: '' } : figure} interactive={false} />;
  return <article className={panel + ' relative flex min-w-0 flex-col gap-3 p-5 hover:border-primary/40' +
    (placement === 'lead' ? ' lg:row-span-2' : '')}>
    {!placement && artwork}
    <div><StatusPill>{project.status} · {project.dates}</StatusPill></div>
    <div className={placement === 'support' && figure && hasAsset(figure.src) ? 'grid grid-cols-[5rem_minmax(0,1fr)] items-start gap-3' : ''}>
      {placement === 'support' && artwork}
      <div className="space-y-2">
        <h3><Link className="text-ink after:absolute after:inset-0 after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-primary"
          to={`/projects/${project.slug}`}>{featured ? project.title : project.shortTitle}</Link></h3>
        <p className="text-sm text-muted">{project.oneLiner}</p>
      </div>
    </div>
    {placement === 'lead' && artwork}
    {featured && !!project.stats.length && <dl className="grid grid-cols-2 gap-2">{project.stats.slice(0, 2).map(stat => <StatTile key={stat.label} stat={stat} />)}</dl>}
    <Tags values={(featured ? project.stack : project.tags).slice(0, 4)} />
    <div className="mt-auto flex flex-wrap gap-4 border-t border-line pt-3 text-sm">{links.map(link =>
      <a className="relative z-10 inline-flex items-center gap-1" key={link.href} href={link.href}>
        {linkNames[link.kind]} <ArrowUpRight aria-hidden="true" size={15} />
      </a>)}</div>
  </article>;
}

export function TOC({ sections }: { sections: Array<{ id: string; title: string }> }) {
  const [active, setActive] = useState(sections[0]?.id);
  const sectionIds = sections.map(section => section.id).join(' ');
  useEffect(() => {
    function update() {
      const ids = sectionIds.split(' ');
      const current = [...ids].reverse().find(id => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 165);
      setActive(current ?? ids[0]);
    }
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [sectionIds]);
  return <nav aria-label="On this page" className="flex gap-2 overflow-auto pb-2 lg:sticky lg:top-25 lg:block">
    <p className={label + ' mb-3 hidden lg:block'}>On this page</p>
    {sections.map(section => <button type="button" key={section.id} aria-current={active === section.id ? 'location' : undefined}
      className="min-h-9 shrink-0 rounded border border-line px-3 text-left text-sm text-muted hover:bg-tint aria-[current=location]:bg-tint aria-[current=location]:text-primary lg:block lg:w-full lg:border-transparent"
      onClick={() => { const target = document.getElementById(section.id); target?.scrollIntoView(); target?.focus({ preventScroll: true }); }}>
      {section.title}
    </button>)}
  </nav>;
}

export function LimitsCallout({ children }: { children: ReactNode }) {
  return <div className="rounded-r-lg border-l-4 border-limits-border bg-limits p-5">{children}</div>;
}

export function CopyButton({ value, text = 'Copy' }: { value: string; text?: string }) {
  const [message, setMessage] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setMessage('Copied');
    } catch {
      setMessage('Unable to copy');
    }
  }
  return <><Button onClick={copy}><Copy size={15} aria-hidden="true" />{text}</Button>
    <span role="status" className="ml-2 text-sm text-muted">{message}</span></>;
}

export function CodeBlock({ value }: { value: string }) {
  return <div className="min-w-0 rounded-lg bg-code p-4">
    <div className="mb-3"><CopyButton value={value} /></div>
    <pre className="overflow-auto whitespace-pre-wrap break-words font-mono text-sm text-ink"><code>{value}</code></pre>
  </div>;
}

export function SideCard({ title, children }: { title: string; children: ReactNode }) {
  return <aside className={panel + ' space-y-3 p-5'}><h3>{title}</h3>{children}</aside>;
}

export function CitationCard({ publication, compact = false }: {
  publication: { title: string; authors: string; kind: string; venue: string; note: string; links: object; bibtex?: string };
  compact?: boolean;
}) {
  const labels: Record<string, string> = { paper: 'Read the preprint', code: 'Code', prereg: 'Preregistration', demo: 'Demo', data: 'Data' };
  return <article className={panel + ' space-y-3 p-5'}>
    <p className={label}>{publication.kind} · {publication.venue}</p>
    <h3>{publication.title}</h3><p className="text-sm text-muted">{publication.authors}</p>
    <p className="text-sm text-muted italic">{publication.note}</p>
    {!compact && <div className="flex flex-wrap gap-2">{Object.entries(publication.links).map(([kind, href]) =>
      href && labels[kind] && <Button key={kind} href={href}>{labels[kind]}</Button>)}</div>}
    {publication.bibtex && <details><summary className="cursor-pointer text-sm font-semibold text-primary">Cite (BibTeX)</summary>
      <CodeBlock value={publication.bibtex} /></details>}
  </article>;
}

export function Timeline({ children }: { children: ReactNode }) {
  return <ol className="space-y-5 border-l-2 border-line pl-5">{children}</ol>;
}

export function SectionHeading({ children, eyebrow }: { children: ReactNode; eyebrow?: string }) {
  return <header className="mb-5">{eyebrow && <p className={label + ' mb-2'}>{eyebrow}</p>}<h2>{children}</h2></header>;
}
