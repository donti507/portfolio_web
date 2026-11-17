import { useState } from 'react';
import { Publication, PageType } from '../types';
import { Compass, Database, BookCheck } from 'lucide-react';

interface ResearchProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Research({ setCurrentPage }: ResearchProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'book' | 'conference' | 'journal' | 'progress'>('all');

  const skills = [
    { name: 'PYTHON', level: 95 },
    { name: 'PYTORCH / DEEP LEARNING', level: 80 },
    { name: 'BIOINFORMATICS', level: 85 },
    { name: 'REMOTE SENSING', level: 80 },
    { name: 'LLM INTEGRATION', level: 90 },
  ];

  const currentFocus = [
    { title: 'Pan-Cancer T Cell Atlas', dept: 'Computational Biology' },
    { title: 'ALAN-NeuroNet', dept: 'Multimodal Deep Learning' },
    { title: 'RICA Fellowship Application', dept: 'Credible AI' },
  ];

  const publications: Publication[] = [
    {
      type: 'book',
      status: 'IN PRESS · 2026',
      title: 'Privacy, Ethics, and Explainability in Medical NLP',
      authors: 'Chakraborty S., Bishwas D., Ballove T., Sarker P.K., Yad A.A., Mallik S., Biswas M.',
      publisher: 'CRC Press / Taylor & Francis Group — Chapter 14',
      actions: { doi: '#' },
    },
    {
      type: 'book',
      status: 'UNDER REVIEW · 2026',
      title: 'Quantum-Driven AI Agents in Healthcare and Genomics',
      authors: 'Biswas D., Gupta P., Ballove T., Mohapatra H., Howladar S., Yad M.A.A.',
      publisher: 'KIIT University & Wrocław University of Science and Technology',
    },
    {
      type: 'conference',
      status: 'UNDER REVIEW · 2026',
      title: 'Multi-Agent Reinforcement Learning for Strategic Management under Non-Stationary Competition',
      authors: 'Yad M.A.A. et al.',
      venue: 'ICSCST 2026, Track 4: AI/ML for Smart Systems. Paper ID: 1361',
    },
    {
      type: 'journal',
      status: 'UNDER REVIEW · 2026',
      title: 'Hybrid Deep Learning and Statistical Modeling of Future Temperature Trajectories and Heatwave Intensification in Arizona, USA',
      authors: 'Yad M.A.A. et al.',
      venue: 'Scientific Reports, Springer Nature',
      note: 'LSTM + Mann-Kendall testing, 25-year data, RMSE: 0.28',
    },
    {
      type: 'journal',
      status: 'READY FOR SUBMISSION · 2026',
      title: 'A Comparative Analysis of AI Integration in Education: Global Perspectives and the Current State of Bangladesh',
      authors: 'Yad M.A.A. et al.',
      target: 'Q1 Journal',
    },
    {
      type: 'progress',
      status: 'ACTIVE · 2026',
      title: 'Machine Learning-Assisted Molecular Docking for Drug-Target Interaction Prediction',
      authors: 'Yad M.A.A. (Lead Developer)',
      note: 'Developing ligand-protein binding affinity prediction and virtual screening pipelines.',
    },
    {
      type: 'progress',
      status: 'ACTIVE · 2026',
      title: 'Pan-Cancer T Cell Exhaustion Atlas: Cross-Cohort Bulk RNA-seq Meta-Analysis',
      authors: 'DeepBioLab Research Group',
      note: 'Co-author on cross-cohort cancer bioinformatic study.',
    },
  ];

  const filteredPublications = activeTab === 'all' 
    ? publications 
    : publications.filter(pub => pub.type === activeTab);

  return (
    <div className="pt-32 pb-24 px-4 md:px-12 max-w-[1200px] mx-auto animate-fadeIn">
      {/* Header Section */}
      <section className="mb-16">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
          SCHOLARLY_WORK
        </span>
        <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter mb-4 leading-none">
          Research &amp; Publications
        </h1>
        {/* UNDERBAR AMBER */}
        <div className="w-[60px] h-[3px] bg-[#FFB800] mt-3" />
        <p className="text-sm md:text-base text-[#888888] max-w-2xl font-sans mt-4">
          Exploring the intersections of bioinformatics, multi-modal deep architectures, high-performance computing, and trustworthy medical ethics.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Competencies Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Technical Proficiency Bars */}
          <div className="bg-[#0f0f0f] border border-white/8 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFB800]" />
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-6">
              TECHNICAL_PROFICIENCY
            </h3>
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#888888]">
                    <span>{skill.name}</span>
                    <span className="text-[#FFB800]">{skill.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5">
                    <div
                      className="h-full bg-[#FFB800]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Focus Sidebar Panel */}
          <div className="bg-[#0f0f0f] border border-white/8 p-6">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#FFB800]" />
              <span>CURRENT_FOCUS</span>
            </h3>
            <div className="space-y-4">
              {currentFocus.map((focus, idx) => (
                <div key={idx} className="flex gap-4 border-l border-white/8 pl-4 py-1 group hover:border-[#FFB800] transition-colors duration-150">
                  <div>
                    <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider group-hover:text-[#FFB800] transition-colors duration-150">
                      {focus.title}
                    </h4>
                    <span className="text-[9px] font-mono text-[#888888] tracking-widest uppercase block mt-1">
                      {focus.dept}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Biobank Context Note */}
          <div className="bg-[#0f0f0f] border border-[#FFB800]/20 p-6">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#FFB800]" />
              <span>BIOBANK_COHORT_SCALE</span>
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed font-light">
              We leverage multi-branch swaps (3D SwinTransformer + TabNet) on approximately **47,000 UK Biobank samples** to determine exact relationships between satellite lights and MRI brain scans securely.
            </p>
          </div>
        </aside>

        {/* Right Tab Switcher & Publications */}
        <div className="lg:col-span-8">
          
          {/* Tab Filter buttons conforming exactly to design layout */}
          <div className="flex flex-wrap gap-2 border-b border-white/8 pb-4 mb-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase border transition-all active:scale-95 duration-100 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#FFB800] text-black border-[#FFB800]'
                  : 'bg-[#0f0f0f] text-[#888888] border-white/8 hover:border-white hover:text-white_active'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveTab('book')}
              className={`px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase border transition-all active:scale-95 duration-100 cursor-pointer ${
                activeTab === 'book'
                  ? 'bg-[#FFB800] text-black border-[#FFB800]'
                  : 'bg-[#0f0f0f] text-[#888888] border-white/8 hover:border-white hover:text-white_active'
              }`}
            >
              BOOK CHAPTERS
            </button>
            <button
              onClick={() => setActiveTab('conference')}
              className={`px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase border transition-all active:scale-95 duration-100 cursor-pointer ${
                activeTab === 'conference'
                  ? 'bg-[#FFB800] text-black border-[#FFB800]'
                  : 'bg-[#0f0f0f] text-[#888888] border-white/8 hover:border-white hover:text-white_active'
              }`}
            >
              CONFERENCE
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase border transition-all active:scale-95 duration-100 cursor-pointer ${
                activeTab === 'journal'
                  ? 'bg-[#FFB800] text-black border-[#FFB800]'
                  : 'bg-[#0f0f0f] text-[#888888] border-white/8 hover:border-white hover:text-white_active'
              }`}
            >
              JOURNAL
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase border transition-all active:scale-95 duration-100 cursor-pointer ${
                activeTab === 'progress'
                  ? 'bg-[#FFB800] text-black border-[#FFB800]'
                  : 'bg-[#0f0f0f] text-[#888888] border-white/8 hover:border-white hover:text-white_active'
              }`}
            >
              IN PROGRESS
            </button>
          </div>

          {/* Publication list */}
          <div className="space-y-4">
            {filteredPublications.map((pub, index) => (
              <div
                key={index}
                className="bg-[#0f0f0f] border border-white/8 p-6 flex flex-col justify-between hover:border-white/20 hover:border-l-4 hover:border-l-[#FFB800] transition-all relative group select-none"
              >
                <div>
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-[#FFB800] uppercase tracking-widest">
                        {pub.status}
                      </span>
                    </div>
                    <span className="bg-[#111111] text-[#888888] border border-white/8 text-[8px] font-sans tracking-widest px-2 py-0.5 uppercase rounded-[4px]">
                      {pub.type === 'book' ? 'BOOK' : pub.type.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-base font-sans font-extrabold text-white uppercase tracking-tight mb-2 group-hover:text-[#FFB800] transition-colors leading-snug">
                    {pub.title}
                  </h3>

                  <div className="text-xs text-[#888888] font-sans font-light leading-relaxed mb-1">
                    <strong className="text-white font-medium">Authors:</strong> {pub.authors}
                  </div>

                  {pub.publisher && (
                    <div className="text-xs text-[#888888] font-sans italic mb-1">
                      <strong className="text-white not-italic font-bold text-[10px] tracking-wider uppercase font-mono">Publisher:</strong> {pub.publisher}
                    </div>
                  )}

                  {pub.venue && (
                    <div className="text-xs text-[#888888] font-sans italic mb-1">
                      <strong className="text-white not-italic font-bold text-[10px] tracking-wider uppercase font-mono">Venue:</strong> {pub.venue}
                    </div>
                  )}

                  {pub.note && (
                    <div className="text-xs text-[#FFB800] font-mono bg-[#111111] p-2.5 border border-white/8 mt-3">
                      PARAMETER NOTE: {pub.note}
                    </div>
                  )}

                  {pub.target && (
                    <div className="text-xs text-[#888888] font-sans italic block mt-1">
                      Target Placement: <span className="text-[#FFB800] not-italic font-sans font-bold">{pub.target}</span>
                    </div>
                  )}
                </div>

                {/* Actions indicators */}
                <div className="flex gap-4 border-t border-white/8 pt-4 mt-6">
                  {pub.actions?.doi ? (
                    <a
                      href={pub.actions.doi}
                      onClick={(e) => { e.preventDefault(); alert('Redirecting to Springer/Taylor publisher portal (Simulated)...'); }}
                      className="text-[10px] font-bold text-[#FFB800] tracking-widest uppercase hover:underline flex items-center gap-1 cursor-pointer font-mono"
                    >
                      DOI PORTAL <BookCheck className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[9px] font-mono font-bold text-[#888888] uppercase tracking-widest">
                      CREDENTIAL RECORD VERIFIED
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
