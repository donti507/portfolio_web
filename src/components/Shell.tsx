import { useRef } from 'react';
import { Github, Mail, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { person } from '../data/site';
import { asset, hasAsset } from '../data/assets';

const navigation = [
  ['Home', '/'], ['Research', '/research'], ['Projects', '/projects'],
  ['CV', '/cv'], ['About', '/about'], ['Contact', '/contact'],
];
export const email = 'mailto:' + person.email;
export const cv = hasAsset(person.links.cv) ? asset(person.links.cv) : undefined;

export function Shell({ children }: { children: React.ReactNode }) {
  const menu = useRef<HTMLDialogElement>(null);
  const links = navigation.map(([name, to]) => <NavLink key={to} to={to} end={to === '/'}
    onClick={() => menu.current?.close()}
    className="py-2 text-ink aria-[current=page]:text-primary aria-[current=page]:underline decoration-2 underline-offset-8">{name}</NavLink>);
  return <div className="flex min-h-screen flex-col">
    <a href="#main-content" onClick={event => {
      event.preventDefault();
      document.getElementById('main-content')?.focus();
    }} className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-card focus:p-3">Skip to content</a>
    <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
            <Link to="/" className="font-heading text-headline-md text-ink">{person.name}</Link>
            <span className="rounded bg-teal/10 px-2 py-0.5 font-mono text-xs text-tertiary">{person.statusBadge}</span>
          </div>
          <div className="font-mono text-xs text-muted">Wrocław · CS &amp; NeuroAI</div>
        </div>
        <nav aria-label="Main" className="hidden gap-5 text-sm lg:flex">{links}</nav>
        <div className="flex items-center gap-2">
          <a className="hidden p-2 sm:block" aria-label="GitHub" href={person.links.github}><Github size={20} /></a>
          <a className="hidden p-2 sm:block" aria-label="Email" href={email}><Mail size={20} /></a>
          <button type="button" className="p-2 lg:hidden" aria-label="Open menu" onClick={() => menu.current?.showModal()}><Menu /></button>
        </div>
      </div>
    </header>
    <dialog ref={menu} aria-label="Navigation menu" className="fixed top-0 right-0 left-auto m-0 h-dvh max-h-dvh w-72 bg-surface p-6 text-ink backdrop:bg-ink/40">
      <button type="button" autoFocus className="mb-4 p-2" aria-label="Close menu" onClick={() => menu.current?.close()}><X /></button>
      <nav aria-label="Mobile" className="flex flex-col gap-2">{links}</nav>
      <div className="mt-4 flex gap-5"><a href={person.links.github}>GitHub</a><a href={email}>Email</a></div>
    </dialog>
    {children}
    <footer className="mt-auto border-t border-line bg-limits">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-9 sm:px-8 md:grid-cols-2">
        <div><p className="font-heading text-headline-md">{person.name}</p><p className="mt-2 text-sm text-muted">{person.tagline}</p></div>
        <div className="md:text-right">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm md:justify-end">
            <a href={person.links.github}>GitHub</a><a href={person.links.linkedin}>LinkedIn</a>
            <a href={person.links.arxiv}>arXiv</a><a href={email}>Email</a>{cv && <a href={cv}>CV PDF</a>}
          </div>
          <p className="mt-4 font-mono text-xs text-muted">© 2026 {person.name} · Code MIT</p>
        </div>
      </div>
    </footer>
  </div>;
}
