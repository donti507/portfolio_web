import { useState } from 'react';
import { PageType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Research from './components/Research';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Photography from './components/Photography';
import Education from './components/Education';
import Contact from './components/Contact';
import ProjectDetailBanglaTruth from './components/ProjectDetailBanglaTruth';
import ProjectDetailCreditRisk from './components/ProjectDetailCreditRisk';
import ProjectDetailZenOS from './components/ProjectDetailZenOS';
import ProjectDetailAlanNeuroNet from './components/ProjectDetailAlanNeuroNet';
import ProjectDetailBudgetAware from './components/ProjectDetailBudgetAware';
import ProjectDetailFloodRisk from './components/ProjectDetailFloodRisk';
import ProjectDetailSentiment from './components/ProjectDetailSentiment';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Handle page render based on current state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'research':
        return <Research setCurrentPage={setCurrentPage} />;
      case 'projects':
        return <Projects setCurrentPage={setCurrentPage} />;
      case 'certifications':
        return <Certifications />;
      case 'experience':
        return <Experience setCurrentPage={setCurrentPage} />;
      case 'photography':
        return <Photography />;
      case 'education':
        return <Education setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact />;
      case 'project-banglatruth':
        return <ProjectDetailBanglaTruth setCurrentPage={setCurrentPage} />;
      case 'project-credit-risk':
        return <ProjectDetailCreditRisk setCurrentPage={setCurrentPage} />;
      case 'project-zen-os':
        return <ProjectDetailZenOS setCurrentPage={setCurrentPage} />;
      case 'project-alan-neuronet':
        return <ProjectDetailAlanNeuroNet setCurrentPage={setCurrentPage} />;
      case 'project-budgetaware-hpo':
        return <ProjectDetailBudgetAware setCurrentPage={setCurrentPage} />;
      case 'project-remote-sensing-flood':
        return <ProjectDetailFloodRisk setCurrentPage={setCurrentPage} />;
      case 'project-multilingual-sentiment':
        return <ProjectDetailSentiment setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#cccccc] flex flex-col font-sans select-none antialiased selection:bg-[#FFB800] selection:text-[#0c0c0c]">
      {/* Sticky navigation header */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main content viewport with fade and slight shift transitions conforming to design instructions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            id="page-content-wrapper"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Structured footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
