import { useState } from 'react';
import { PageType } from '../types';
import { Briefcase, Calendar, ChevronDown, ChevronUp, CheckCircle, Award, Compass, Zap } from 'lucide-react';

interface ExperienceProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Experience({ setCurrentPage }: ExperienceProps) {
  const [expandedId, setExpandedId] = useState<string | null>('deepbiolab');

  const timelineExperiences = [
    {
      id: 'deepbiolab',
      date: '2026 – Present',
      role: 'Co-Author & Research Assistant',
      org: 'DeepBioLab',
      desc: 'Pan-cancer bulk RNA-seq meta-analysis. ssGSEA and LASSO-Cox pipelines on massive multi-cohort cancer datasets. Co-author on manuscript in preparation.',
      tech: ['PyTorch', 'ssGSEA', 'LASSO-Cox', 'ComBat-seq', 'Bioinformatics', 'Survival Modeling']
    },
    {
      id: 'space',
      date: 'Apr 2026 – Present',
      role: 'Ground Support & Technical Writer',
      org: 'PWr in Space Team',
      desc: 'Co-authoring complex international documentation, payload reports, and security checklists for European academic space rocket projects.',
      tech: ['Technical Writing', 'Payload Reports', 'Security Checklists', 'Space Systems', 'Systems Engineering']
    },
    {
      id: 'ulisses',
      date: 'Jan 2026 – Present',
      role: 'ULisses Fellow',
      org: 'University of Lisbon',
      desc: 'Highly competitive program spanning marine engineering, sustainability materials, robotics, and environment tracking.',
      tech: ['Marine Science', 'Acoustic Robotics', 'Environmental Tracking', 'Sustainability Materials']
    },
    {
      id: 'ibmclub',
      date: 'Nov 2025 – Present',
      role: 'Founder & Executive President',
      org: 'IBM Z Club — Wrocław Tech',
      desc: 'Founded the Polish node of IBM Z Mainframe club. Secured exclusive supercomputer and mainframes hardware environments. Initiated collaborative academic channels.',
      tech: ['COBOL', 'Z Assembler', 'Mainframes', 'Zowe CLI', 'Enterprise Infrastructure', 'Leadership']
    },
    {
      id: 'ibmglobal',
      date: 'May 2025 – Present',
      role: 'IBM Z Campus Global Ambassador',
      org: 'IBM Enterprise Solutions',
      desc: 'Selected as the first student from Poland for IBM Z Global enterprise evangelism. Guided 150+ candidates through Z-System assembler architectures.',
      tech: ['IBM Z Xplore', 'USS', 'VSAM', 'Devops', 'Enterprise Systems']
    },
    {
      id: 'radioluz',
      date: 'Oct 2024 – Present',
      role: 'Scientific News Director & Presenter',
      org: 'Radio LUZ 91.6 FM',
      desc: 'Directing academic science broadcasts. Secured interviews with LANL (Los Alamos National Lab) scientists and edited the "Odra 5" quantum computing documentary podcast.',
      tech: ['Audio Production', 'Quantum Computing Journalism', 'Podcasting', 'Science Communication']
    },
    {
      id: 'harvardaspire',
      date: 'Jan 2023 – May 2023',
      role: 'Selected Leader',
      org: 'Harvard Aspire Leadership Program',
      desc: 'Completed elite cross-disciplinary international framework specializing in project coordination and distributed communication.',
      tech: ['Project Coordination', 'Distributed Systems Communication', 'Leadership Strategy', 'Social Impact']
    }
  ];

  const trainingHighlights = [
    {
      title: 'ULisses Marine Sustainability Fellowship',
      location: 'University of Lisbon',
      notes: 'Competitive international multi-branch environmental robotics program.'
    },
    {
      title: 'AI Adventure Cohorts',
      location: 'Warsaw',
      notes: 'Top-tier evaluation matrices & machine learning fine-tuning benchmarks.'
    },
    {
      title: 'Harvard Aspire Elite Leadership Program',
      location: 'Aspire Institute, USA',
      notes: 'Selected top-performing international leaders session series.'
    },
    {
      title: 'Stanford University CS106A Stream',
      location: 'Stanford Online',
      notes: 'Programming methodologies, focus on high-performance Python architectures.'
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-12 max-w-[1200px] mx-auto animate-fadeIn">
      {/* Page Header */}
      <header className="mb-16">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
          WORK_STRUCTURE
        </span>
        <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter mb-4 leading-none animate-slideUp">
          Experience &amp; <br />
          <span className="text-[#FFB800]">Collaborations</span>
        </h1>
        {/* Underbar */}
        <div className="w-[60px] h-[3px] bg-[#FFB800] mt-3" />
        <p className="text-[11px] font-mono tracking-[0.2em] text-[#888888] uppercase mt-4">
          SYSTEM.EXEC=STAGE_PROD // INTERNALS=VERIFIED // SCALE_UNLIMITED
        </p>
      </header>

      {/* Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Scholarly Archive */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-[10px] font-mono text-[#FFB800] tracking-[0.2em] uppercase block mb-3 font-bold">
              SCHOLARLY_ARCHIVE
            </span>
            <p className="text-sm text-[#888888] leading-relaxed font-light">
              A comprehensive ledger of computational analysis, high-performance computing validation, club leadership, and scientific journalism roles. Focused on making complex systems highly reliable and trustworthy.
            </p>
          </div>

          {/* Training Highlights block */}
          <div className="bg-[#0f0f0f] border border-white/8 p-6 space-y-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase block border-b border-white/8 pb-3">
              TRAINING_HIGHLIGHTS
            </span>
            <div className="space-y-4">
              {trainingHighlightEntries()}
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Timeline */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-[10px] font-mono text-[#FFB800] tracking-[0.2em] uppercase block mb-3 font-bold">
            TIMELINE_INTEGRATOR // CLICK_TO_EXPAND
          </span>

          <div className="space-y-3">
            {timelineExperiences.map((exp) => {
              const isExpanded = expandedId === exp.id;
              return (
                <div
                  key={exp.id}
                  className={`bg-[#0f0f0f] border border-white/8 transition-all duration-200 hover:border-white/20 select-none ${
                    isExpanded ? 'border-l-4 border-l-[#FFB800]' : ''
                  }`}
                >
                  {/* Collapsed Header Bar */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="p-5 flex justify-between items-center cursor-pointer select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-[#FFB800] font-bold tracking-wider">
                          {exp.date}
                        </span>
                        <span className="text-[#888888] text-[9px] font-mono uppercase tracking-widest">
                          // {exp.org.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider group-hover:text-[#FFB800]">
                        {exp.role}
                      </h3>
                    </div>
                    <div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#FFB800]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#888888]" />
                      )}
                    </div>
                  </div>

                  {/* Expandable Technical Details Drawer */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-white/8 bg-[#0a0a0a]/50 animate-slideDown">
                      <p className="text-xs text-[#cccccc] leading-relaxed font-light mb-4">
                        {exp.desc}
                      </p>
                      
                      {/* Tech Stack Pills */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-[#888888] tracking-widest uppercase block font-bold">
                          TECH_STACK::KEYWORDS
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tech.map((tag) => (
                            <span
                              key={tag}
                              className="bg-[#111111] border border-white/8 text-[#FFB800] font-mono text-[9px] px-2 py-0.5"
                            >
                              {tag.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  function trainingHighlightEntries() {
    return trainingHighlights.map((hl, index) => (
      <div key={index} className="flex gap-3 leading-relaxed border-l border-white/8 pl-4 py-1 group hover:border-[#FFB800] transition-colors">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#FFB800] rotate-45 inline-block" />
            <span className="text-xs font-sans font-bold text-white uppercase tracking-tight">
              {hl.title}
            </span>
          </div>
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">
            {hl.location}
          </span>
          <span className="text-[9px] font-mono text-[#888888] font-light leading-snug block">
            {hl.notes}
          </span>
        </div>
      </div>
    ));
  }
}
