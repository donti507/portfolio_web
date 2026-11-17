import { useEffect, type ReactNode } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { person } from './data/site';
import Home from "./pages/Home";
import Research from "./pages/Research";
import CV from "./pages/CV";
import About from "./pages/About";
import Photography from "./pages/Photography";
import Contact from "./pages/Contact";
import NotFound from './pages/NotFound';
import ProjectDetail from "./pages/ProjectDetail";
import { projectBySlug } from "./data/catalog";
import { useParams } from "react-router-dom";
import Projects from "./pages/Projects";
import { Shell } from "./components/Shell";

function Page({ title, children }: { title: string; children?: ReactNode }) {
  useEffect(() => { document.title = `${title} · ${person.name}`; }, [title]);
  return children ?? <h1>{title}</h1>;
}

function Detail() {
  const { slug } = useParams();
  const project = projectBySlug(slug ?? "");
  return <Page title={project?.shortTitle ?? "Page not found"}><ProjectDetail /></Page>;
}

function Pages() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <main tabIndex={-1} id="main-content" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
    <motion.div key={pathname} initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.15 }}>
      <Routes>
        <Route path="/" element={<Page title="Home"><Home /></Page>} />
        <Route path="/research" element={<Page title="Research"><Research /></Page>} />
        <Route path="/projects" element={<Page title="Projects"><Projects /></Page>} />
        <Route path="/projects/:slug" element={<Detail />} />
        <Route path="/cv" element={<Page title="CV"><CV /></Page>} />
        <Route path="/about" element={<Page title="About"><About /></Page>} />
        <Route path="/photography" element={<Page title="Photography"><Photography /></Page>} />
        <Route path="/contact" element={<Page title="Contact"><Contact /></Page>} />
        <Route path="*" element={<Page title="Page not found"><NotFound /></Page>} />
      </Routes>
    </motion.div>
  </main>;
}

export default function App() {
  return <HashRouter><Shell><Pages /></Shell></HashRouter>;
}
