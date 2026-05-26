import React, { useEffect } from 'react';
import { PageType } from '../types';
import { navigateBackToProjects, initPageTransition } from '../utils/transition';
import { ExternalLink, ArrowLeft, Terminal, Server, Cpu, Layers, HardDrive } from 'lucide-react';

interface ProjectDetailProps {
  setCurrentPage: (page: PageType) => void;
}

export default function ProjectDetailBudgetAware({ setCurrentPage }: ProjectDetailProps) {
  useEffect(() => {
    initPageTransition();
  }, []);

  return (
    <div className="pt-24 pb-24 px-4 md:px-12 max-w-[1240px] mx-auto animate-fadeIn select-none text-left">
      
      {/* 1. BACK TO PROJECTS Navigation Link */}
      <div className="mb-4">
        <button
          onClick={() => navigateBackToProjects(setCurrentPage)}
          className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-[#FFB800] uppercase hover:opacity-80 transition-opacity cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> BACK TO PROJECTS
        </button>
      </div>

      {/* 3. Breadcrumb */}
      <div className="mb-6 font-mono text-[10px] tracking-wider text-[#888888]/80 uppercase">
        <button 
          onClick={() => navigateBackToProjects(setCurrentPage)}
          className="hover:text-white transition-colors cursor-pointer"
        >
          PROJECTS
        </button> 
        <span className="mx-2 text-white/20">/</span> 
        <span className="text-white">BUDGETAWARE-HPO</span>
      </div>

      {/* HERO SECTION — 7/5 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              RESEARCH · 2026
            </span>
            <span className="bg-white/5 border border-white/10 text-[#888888] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              HIGH PERFORMANCE COMPUTING
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter leading-none">
            BudgetAware-HPO
          </h1>

          <div className="border-l-2 border-[#FFB800] pl-6 py-1">
            <p className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider">
              Parallelism-Aware HPO // 1,336 Trials across 4 Methods // PCSS Poznan Eagle HPC
            </p>
          </div>

          <p className="text-sm text-[#cccccc] leading-relaxed font-light">
            An advanced benchmarking framework designed for distributed parallelism-aware hyperparameter optimization on massive HPC clusters. It manages job queue allocations and prunes low-performing configurations dynamically across 1,336 model training cycles on CIFAR-10 and CIFAR-100 datasets.
          </p>

          <p className="text-xs text-[#888888] leading-relaxed font-light">
            Leveraging Tesla V100 hardware blocks hosted inside Eagle HPC at the Poznan Supercomputing and Networking Center (PCSS Poznan). Trials demonstrate that Hyperband structures reduce total GPU requirements by 65%.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="https://github.com/donti507/BudgetAware-HPO"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFB800] text-black font-sans font-bold uppercase tracking-widest text-xs px-6 py-4 border border-[#FFB800] hover:translate-x-1 transition-transform duration-150 inline-flex items-center gap-2"
            >
              GITHUB REPOSITORY <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigateBackToProjects(setCurrentPage)}
              className="border border-white/20 bg-transparent text-white font-sans font-bold uppercase tracking-widest text-xs px-6 py-4 hover:bg-white hover:text-black transition-all duration-150 cursor-pointer"
            >
              BACK TO PROJECTS
            </button>
          </div>

          {/* Stat Row */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/8 pt-8 mt-4">
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">COMPUTE PROFILE</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">Supercomputer Slurm</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">OPTIMIZATION LIBRARY</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">Optuna, Slurm</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">BENCHMARK OUTCOME</span>
              <span className="text-base font-sans font-bold text-[#FFB800] uppercase mt-1 block">65% Fewer GPU hr</span>
            </div>
          </div>
        </div>

        {/* Right Column - Terminal Status (5 cols) */}
        <div className="lg:col-span-5 bg-[#0f0f0f] border border-white/8 p-6 md:p-8 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#FFB800]" />
          
          <div className="flex justify-between items-center border-b border-white/8 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FFB800]" />
              <span className="font-mono text-[10px] font-bold text-white tracking-wider">
                HPO_BENCHMARK_LOG
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#00d4aa]" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Trials Ran</span>
              <span className="text-white uppercase font-bold">1,336 total trials</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">HPO Methods</span>
              <span className="text-white uppercase font-bold text-[#00d4aa]">4 Algorithms</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">GPU Core Cluster</span>
              <span className="text-[#FFB800] uppercase font-bold">Eagle HPC (PCSS)</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">GPU Hours savings</span>
              <span className="text-white uppercase font-bold">65% Less Overheads</span>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-[#0a0a0a] border border-white/8 p-4 mt-8">
            <div className="text-[9px] font-mono text-[#888888] uppercase tracking-wider mb-2">SCHEDULER CONVERGENCE</div>
            <div className="flex justify-between items-baseline gap-4">
              <span className="text-lg font-sans font-extrabold text-white tracking-tight uppercase">
                Hyperband Wins
              </span>
              <span className="text-xs font-mono text-[#FFB800] uppercase font-bold">
                EAGLE-NODES: OK
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES GRID — 2x3 bordered cards */}
      <section className="mb-16">
        <div className="mb-10 text-left">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
            DISTRIBUTED_CRITERIA
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white uppercase tracking-tighter">
            Optimization Features
          </h2>
          <div className="w-[40px] h-[2px] bg-[#FFB800] mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'HPC Distributed Trials', text: 'Splits 1,336 dynamic search tasks cleanly across parallel Tesla V100 GPU compute segments inside eagle server modules.' },
            { num: '02', title: 'Optuna Optimizer Engine', text: 'Leverages customizable database-backend scoring functions, logging best hyperparameter ratios dynamically.' },
            { num: '03', title: 'Unified Hyperband Sched', text: 'Applies early stopping algorithms to prune unpromising trials instantly, saving computing bounds.' },
            { num: '04', title: 'Slurm Multi-Task Allocation', text: 'Integrated directly with Slurm script configs, coordinating automatic node scheduling under strict resource restraints.' },
            { num: '05', title: 'CIFAR Multi-Class Calibrate', text: 'Calibrates HPO targets across both CIFAR-10 and CIFAR-100 structures, preventing spatial overfitting errors.' },
            { num: '06', title: 'Parallel Optimizer Node', text: 'Actively monitors queuing costs and wait delays, routing resource allocation to lower-overhead partitions.' },
          ].map((f, index) => (
            <div
              key={index}
              className="bg-[#0f0f0f] border border-white/8 p-6 transition-all duration-200 select-none group hover:border-[#00d4aa]/30 hover:bg-[#00d4aa]/2"
            >
              <div className="text-xs font-mono font-bold text-[#FFB800] mb-4 tracking-widest uppercase">
                FEATURE_STATE_{f.num}
              </div>
              <h3 className="text-lg font-sans font-bold text-white uppercase mb-2 tracking-tight group-hover:text-[#00d4aa] transition-colors leading-snug">
                {f.title}
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed font-light">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left rows (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f0f0f] border border-white/8 p-6 md:p-8">
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6">
            SCHEDULER_PIPELINE_FLOW
          </h3>
          <div className="space-y-4">
            {[
              { step: 'Layer 01', name: 'Optuna Ingestion Core', tech: 'Dynamic SQL Store', desc: 'Accepting raw parameter configurations. Initializes HPO trails under designated search bounds.' },
              { step: 'Layer 02', name: 'Slurm Task Allocator', tech: 'HPC Shell Scripts', desc: 'Coordinates automated job scripts, mounting distributed tensor scripts across Tesla partitions.' },
              { step: 'Layer 03', name: 'Parallel Aggressor Task', tech: 'Optuna Parallel API', desc: 'Tracks performance benchmarks concurrently in SQLite, comparing learning rates.' },
              { step: 'Layer 04', name: 'Hyperband Pruners Unit', tech: 'Dynamic Stopper Rules', desc: 'Identifies non-monotonic progression lines, aborting low-accuracy trials to reclaim limits.' },
            ].map((layer, lIdx) => (
              <div 
                key={lIdx} 
                className="flex gap-4 p-4 bg-[#0a0a0a] border border-white/8 hover:border-[#FFB800] transition-colors"
              >
                <div className="text-xs font-mono font-bold text-[#FFB800] whitespace-nowrap">
                  {layer.step}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{layer.name}</h4>
                  <p className="text-[11px] text-[#888888] mt-1 leading-relaxed font-light">{layer.desc}</p>
                  <span className="inline-block bg-white/5 text-[9px] font-mono text-[#888888] px-2 py-0.5 mt-2 rounded-[3px]">
                    {layer.tech}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right metrics + callout (5 cols) */}
        <div className="lg:col-span-12 lg:col-span-5 space-y-6">
          <div className="bg-[#0f0f0f] border border-white/8 p-6 grid grid-cols-2 gap-4">
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">1,336</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Total trials</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">4 Algorithms</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Tested</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-[#00d4aa] block">65%</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">GPU Hour Cut</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">Tesla V100</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Nodes</span>
            </div>
          </div>

          <div className="bg-[#0f0f0f] border border-[#FFB800]/20 p-6 relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFB800]" />
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
              PCSS EAGLE COMPUTE METRICS
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed font-light">
              Conventional coordinate searches accumulate massive computing costs (~hundreds of GPU cluster hours) in high-throughput settings. By utilizing early stopping Hyperband schedulers configured atop distributed Slurm blocks, we prune trailing convergence paths instantly, protecting PCSS supercomputer resource bounds.
            </p>
          </div>
        </div>
      </section>

      {/* TECH STACK ROW */}
      <section className="bg-[#0f0f0f] border border-white/8 p-6 md:p-8 mb-16 select-none">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6 text-left border-b border-white/8 pb-4">
          HPC_COMPILATION_AND_ORCHESTRATION_STACK
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">SCHEDULER CORES</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Python 3.10</li>
              <li>Slurm HPC Scripts</li>
              <li>Conda Virtuals</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">HPO ENGINES</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Optuna Framework</li>
              <li>Hyperband Core</li>
              <li>BOHB Optimizer</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">NEURAL MODELS</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>PyTorch ML</li>
              <li>CIFAR Classifier</li>
              <li>ResNet, VGG trialers</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">COMPUTE LABS</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Eagle HPC PCSS</li>
              <li>V100 Tesla Cores</li>
              <li>Linux Cluster Nodes</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
