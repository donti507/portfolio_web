import { useEffect, type ReactNode } from 'react';
import { HashRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { person } from './data/site';
import NotFound from './pages/NotFound';

function Page({ title, children }: { title: string; children?: ReactNode }) {
  useEffect(() => { document.title = `${title} · ${person.name}`; }, [title]);
  return children ?? <h1>{title}</h1>;
}

function Detail() {
  const { slug } = useParams();
  void slug;
  return <Page title="Page not found"><NotFound /></Page>;
}

function Pages() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
    <motion.div key={pathname} initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.15 }}>
      <Routes>
        <Route path="/" element={<Page title="Home" />} />
        <Route path="/research" element={<Page title="Research" />} />
        <Route path="/projects" element={<Page title="Projects" />} />
        <Route path="/projects/:slug" element={<Detail />} />
        <Route path="/cv" element={<Page title="CV" />} />
        <Route path="/about" element={<Page title="About" />} />
        <Route path="/photography" element={<Page title="Photography" />} />
        <Route path="/contact" element={<Page title="Contact" />} />
        <Route path="*" element={<Page title="Page not found"><NotFound /></Page>} />
      </Routes>
    </motion.div>
  </main>;
}

export default function App() {
  return <HashRouter><Pages /></HashRouter>;
}
