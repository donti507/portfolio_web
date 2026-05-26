import { useState } from 'react';
import { Project, PageType } from '../types';
import { navigateToProjectDetail } from '../utils/transition';
import { ExternalLink, Terminal, Cpu, Globe, CheckCircle2 } from 'lucide-react';

interface ProjectsProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Projects({ setCurrentPage }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filterTabs = ['ALL', 'AI/ML', 'BIOINFORMATICS', 'HPC', 'ENVIRONMENTAL', 'WEB'];

  const projects: Project[] = [
    {
      title: 'ALAN-NeuroNet',
      category: 'AI/ML',
      status: 'RESEARCH COLLAB',
      description: 'First framework to directly link satellite nighttime light (ALAN) to MRI-derived Brain Age Gap in 47,000 UK Biobank participants. 3-branch architecture: 3D SwinTransformer + TabNet + 8-head cross-attention. GradCAM++ and SHAP explainability.',
      tags: ['PyTorch', 'SwinTransformer', 'SHAP', 'GradCAM', 'UK Biobank'],
      github: 'https://github.com/donti507',
      featured: true,
    },
    {
      title: 'BudgetAware-HPO',
      category: 'HPC',
      status: 'RESEARCH',
      description: 'Parallelism-aware hyperparameter optimization at HPC scale. 1,336 trials across 4 HPO methods on CIFAR-10/100 using Tesla V100 GPUs at Eagle HPC (PCSS Poznan). Hyperband achieves 65% fewer GPU hours than Random Search.',
      tags: ['Python', 'Optuna', 'HPC', 'SLURM', 'CIFAR'],
      github: 'https://github.com/donti507/BudgetAware-HPO',
      featured: true,
    },
    {
      title: 'BanglaTruth',
      category: 'AI/ML',
      status: 'COMPLETED · Mar-Apr 2026',
      description: 'Bilingual AI fact-checking platform (English + Bangla) using Llama 3.3 (70B) and Llama 3.1 (8B) in parallel via asyncio. 5-verdict system with majority-vote aggregation. 40% faster processing.',
      tags: ['Python', 'Llama', 'FastAPI', 'Supabase', 'Streamlit'],
      github: 'https://github.com/donti507',
      featured: true,
    },
    {
      title: 'Remote Sensing: Flood Risk',
      category: 'ENVIRONMENTAL',
      status: 'ACTIVE · 2026',
      description: 'Per-pixel flood risk system fusing Copernicus DEM, HYDRO IMGW real-time gauges, and ICON/GFS forecasts. Calibrated on September 2024 Central European flood. FastAPI + OpenLayers web platform for Siechnice Municipality.',
      organization: 'PWr in Space, Wroclaw University of Science and Technology',
      tags: ['Sentinel-2', 'FastAPI', 'OpenLayers', 'GEE', 'Python'],
      github: 'https://github.com/donti507',
      featured: false,
    },
    {
      title: 'StudentOS (ZEN_OS)',
      category: 'WEB',
      status: 'ACTIVE · 2026',
      description: 'LLM-powered personalized daily planner for researchers. Next.js 14 + TypeScript + Tailwind. 6 integrated views: Dashboard, Kanban, Calendar, Analytics, Vault, Dante AI. USOS API for academic outcome prediction.',
      tags: ['Next.js', 'TypeScript', 'LLM', 'USOS API', 'Tailwind'],
      github: 'https://github.com/donti507',
      featured: false,
    },
    {
      title: 'Multilingual Sentiment Analyzer',
      category: 'AI/ML',
      status: 'COMPLETED · Jan-Mar 2026',
      description: '5-language sentiment analysis (English, Urdu, Bangla, Polish, Hindi) with 6-class emotion breakdown via Hugging Face Transformers. Groq/Llama 3 narrative summaries. Batch analysis + CSV export.',
      tags: ['Python', 'Hugging Face', 'Groq', 'Streamlit', 'langdetect'],
      github: 'https://github.com/donti507',
      featured: false,
    },
    {
      title: 'Credit Risk Scoring Model',
      category: 'AI/ML',
      status: 'COMPLETED · 2026',
      description: 'Predictive logical scorecard model demonstrating optimal validation thresholds (AUC: 0.92, Gini: 0.84). Monotonic binning WoE conversion for legal auditable transparency.',
      tags: ['Python', 'Scikit-Learn', 'Statsmodels', 'Optbinning'],
      github: 'https://github.com/donti507',
      featured: false,
    },
  ];

  // Specific custom mapping so 'BIOINFORMATICS' works nicely with ALAN-NeuroNet since it uses brain scans.
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'BIOINFORMATICS' && project.title === 'ALAN-NeuroNet') return true;
    return project.category.toUpperCase() === activeFilter.toUpperCase();
  });

  // Dynamic route mapping based on model titles
  const getProjectRoute = (title: string): PageType => {
    const norm = title.toLowerCase();
    if (norm.includes('alan')) return 'project-alan-neuronet';
    if (norm.includes('budget')) return 'project-budgetaware-hpo';
    if (norm.includes('bangla')) return 'project-banglatruth';
    if (norm.includes('remote')) return 'project-remote-sensing-flood';
    if (norm.includes('student') || norm.includes('zen')) return 'project-zen-os';
    if (norm.includes('sentiment') || norm.includes('multilingual')) return 'project-multilingual-sentiment';
    if (norm.includes('credit') || norm.includes('risk')) return 'project-credit-risk';
    return 'projects';
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-12 max-w-[1200px] mx-auto animate-fadeIn select-none text-left">
      {/* Header Section */}
      <header className="mb-12">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
          PORTFOLIO_LEDGER
        </span>
        <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter mb-4 leading-none">
          Selected Projects
        </h1>
        {/* UNDERLINE BAR AMBER */}
        <div className="w-[60px] h-[3px] bg-[#FFB800] mt-3" />
        <p className="text-sm text-[#888888] max-w-2xl font-sans mt-4">
          A showcase of engineering rigor and scientific inquiry, ranging from high-performance computing to advanced neural network architectures.
        </p>
      </header>

      {/* Filter Tabs and Dynamic Project Counter conforming exactly to brand style */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 border-b border-white/8 pb-4">
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 text-[10px] font-mono font-bold tracking-widest uppercase border transition-all active:scale-95 cursor-pointer ${
                activeFilter === tab
                  ? 'bg-[#FFB800] text-black border-[#FFB800]'
                  : 'bg-[#0f0f0f] text-[#888888] border-white/8 hover:border-white hover:text-white'
              }`}
              id={`filter-btn-${tab}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-[10px] font-mono tracking-[0.2em] text-[#888888] uppercase font-bold shrink-0">
          {filteredProjects.length} RECORDS ACCESSIBLE // TOTAL {projects.length}
        </span>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => {
          const isCompleted = project.status.includes('COMPLETED');
          const route = getProjectRoute(project.title);
          return (
            <div
              key={index}
              tabIndex={0}
              onClick={() => navigateToProjectDetail(route, setCurrentPage)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigateToProjectDetail(route, setCurrentPage);
                }
              }}
              className={`bg-[#0f0f0f] border border-white/8 p-6 md:p-8 flex flex-col justify-between min-h-[420px] transition-all duration-150 group hover:border-[#FFB800] select-none cursor-pointer relative outline-none focus:ring-1 focus:ring-[#FFB800] rounded-[2px] ${
                project.featured ? 'border-l-4 border-l-[#FFB800]' : 'hover:border-l-4 hover:border-l-[#FFB800]'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4 gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 pr-14">
                    {project.featured && (
                      <span className="bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] text-[8px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-[3px]">
                        FEATURED
                      </span>
                    )}

                    {isCompleted ? (
                      <span className="bg-[#00d4aa]/15 border border-[#00d4aa]/30 text-[#00d4aa] text-[8px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-[3px]">
                        {project.status.toUpperCase()}
                      </span>
                    ) : (
                      <span className="bg-white/5 border border-white/10 text-[#888888] text-[8px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-[3px]">
                        {project.status.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-start">
                    <span className="text-[8px] font-mono font-bold tracking-wider text-[#FFB800] opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none whitespace-nowrap">
                      → VIEW PROJECT
                    </span>
                    <span className="text-[#888888] group-hover:text-[#FFB800] transition-colors">
                      {project.featured ? <Cpu className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-sans font-extrabold uppercase text-white mb-3 group-hover:text-[#FFB800] transition-colors duration-150 leading-tight">
                  {project.title}
                </h3>

                <p className="text-xs text-[#888888] leading-relaxed mb-6 font-light">
                  {project.description}
                </p>

                {project.organization && (
                  <div className="text-[9px] font-mono text-[#FFB800] border-t border-white/8 pt-3 mb-6">
                    ORGD: {project.organization.toUpperCase()}
                  </div>
                )}
              </div>

              <div>
                {/* Tech tag list */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="bg-[#111111] text-[#888888] border border-white/8 text-[9px] font-mono px-2 py-0.5 rounded-[3px]"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card navigation
                    }}
                    className="inline-flex items-center gap-2 bg-transparent border border-white/10 text-white font-sans font-bold text-[10px] tracking-widest uppercase px-4 py-2 hover:bg-white hover:text-black transition-colors duration-150 font-sans cursor-pointer relative z-10 rounded-[2px]"
                    id={`project-github-btn-${index}`}
                  >
                    GITHUB <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}


