import { lazy, Suspense, useEffect, useRef, type ReactNode } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { person } from './data/site';
import { Shell } from "./components/Shell";

const Home = lazy(() => import("./pages/Home"));
const Research = lazy(() => import("./pages/Research"));
const CV = lazy(() => import("./pages/CV"));
const About = lazy(() => import("./pages/About"));
const Photography = lazy(() => import("./pages/Photography"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Projects = lazy(() => import("./pages/Projects"));

function Page({ title, children }: { title: string; children?: ReactNode }) {
  useEffect(() => { document.title = `${title} · ${person.name}`; }, [title]);
  return children ?? <h1>{title}</h1>;
}

function Pages() {
  const { pathname } = useLocation();
  const content = useRef<HTMLDivElement>(null);
  const previousPath = useRef(pathname);
  useEffect(() => {
    if (window.scrollY || window.scrollX) window.scrollTo(0, 0);
    const changed = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (!changed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    void import('motion/mini').then(({ animate }) => {
      if (!cancelled && content.current) animate(content.current, { opacity: [0.85, 1] }, { duration: 0.15 });
    });
    return () => { cancelled = true; };
  }, [pathname]);
  return <main tabIndex={-1} id="main-content" className="mx-auto min-h-[calc(100svh-5rem)] w-full max-w-7xl px-4 py-10 sm:px-8">
    <div key={pathname} ref={content}>
      <Suspense fallback={<p role="status">Loading…</p>}>
        <Routes>
          <Route path="/" element={<Page title="Home"><Home /></Page>} />
          <Route path="/research" element={<Page title="Research"><Research /></Page>} />
          <Route path="/projects" element={<Page title="Projects"><Projects /></Page>} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/cv" element={<Page title="CV"><CV /></Page>} />
          <Route path="/about" element={<Page title="About"><About /></Page>} />
          <Route path="/photography" element={<Page title="Photography"><Photography /></Page>} />
          <Route path="/contact" element={<Page title="Contact"><Contact /></Page>} />
          <Route path="*" element={<Page title="Page not found"><NotFound /></Page>} />
        </Routes>
      </Suspense>
    </div>
  </main>;
}

export default function App() {
  return <HashRouter><Shell><Pages /></Shell></HashRouter>;
}
