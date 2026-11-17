import React, { useEffect } from 'react';
import { PageType } from '../types';
import { navigateBackToProjects, initPageTransition } from '../utils/transition';
import { ExternalLink, ArrowLeft, Terminal, Cpu, Database, Activity, Eye } from 'lucide-react';

interface ProjectDetailProps {
  setCurrentPage: (page: PageType) => void;
}

export default function ProjectDetailAlanNeuroNet({ setCurrentPage }: ProjectDetailProps) {
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
        <span className="text-white">ALAN-NEURONET</span>
      </div>

      {/* HERO SECTION — 7/5 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              RESEARCH COLLAB · 2026
            </span>
            <span className="bg-white/5 border border-white/10 text-[#888888] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              BIOINFORMATICS AI / ML
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter leading-none">
            ALAN-NeuroNet
          </h1>

          <div className="border-l-2 border-[#FFB800] pl-6 py-1">
            <p className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider">
              3-Branch Neural Architecture // 3D SwinTransformer + TabNet // MRI Brain Age Gap
            </p>
          </div>

          <p className="text-sm text-[#cccccc] leading-relaxed font-light">
            First scientific framework to directly link satellite Artificial Light At Night (ALAN) pollution to MRI-derived Brain Age Gap in 47,000 UK Biobank participants. It implements a custom three-branch deep hybrid neural pipeline consisting of a 3D SwinTransformer for imaging features, a TabNet module for demographic/environmental data, and 8-head cross-attention multi-fusion nodes.
          </p>

          <p className="text-xs text-[#888888] leading-relaxed font-light">
            Ensuring extreme predictive integrity and biological verifiability. Equipped with full GradCAM++ and SHAP localized explanation maps to identify and isolate neural correlation markers.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="https://github.com/donti507"
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
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">PLATFORM CATEGORY</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">Multimodal Core</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">TECHNOLOGY STACK</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">PyTorch 2.0, Swin</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">PROJECT STATUS</span>
              <span className="text-base font-sans font-bold text-[#FFB800] uppercase mt-1 block">Under Review</span>
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
                NEURONET_COMPUTE_METRICS
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#00d4aa]" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">UK Biobank Cohort</span>
              <span className="text-white uppercase font-bold">47,210 Participants</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">G-CAM++ Convergence</span>
              <span className="text-white uppercase font-bold text-[#00d4aa]">98.4% Accuracy</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Attention Heads</span>
              <span className="text-[#FFB800] uppercase font-bold">8 Cross-Heads</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Explainer Modules</span>
              <span className="text-white uppercase font-bold">SHAP & GradCAM Unified</span>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-[#0a0a0a] border border-white/8 p-4 mt-8">
            <div className="text-[9px] font-mono text-[#888888] uppercase tracking-wider mb-2">DIAGNOSTIC VERDICT SUMMARY</div>
            <div className="flex justify-between items-baseline gap-4">
              <span className="text-lg font-sans font-extrabold text-white tracking-tight uppercase">
                Correlation Found
              </span>
              <span className="text-xs font-mono text-[#FFB800] uppercase font-bold">
                P-VAL &lt; 0.001
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES GRID — 2x3 bordered cards */}
      <section className="mb-16">
        <div className="mb-10 text-left">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
            CORE_CONSTRUCT_BLOCKS
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white uppercase tracking-tighter">
            Platform Capabilities
          </h2>
          <div className="w-[40px] h-[2px] bg-[#FFB800] mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'Three-Branch Architecture', text: 'Splits raw parameters cleanly into isolated Demographics, 3D Brain scans, and Environmental factors for optimal weights isolation.' },
            { num: '02', title: '3D SwinTransformer Input', text: 'Accepts volumetric T1-weighted structural MRI scans, processing spatial voxels at massive scale efficiently.' },
            { num: '03', title: 'TabNet Tabular Branch', text: 'Ingests clinical diagnostic vectors, utilizing custom-weighted sequential attention nodes to select predictive fields.' },
            { num: '04', title: '8-Head Cross-Attention', text: 'Fuses spatial MRI voxel vectors directly with TabNet output layers, mapping correlation nodes cleanly.' },
            { num: '05', title: 'SHAP Model Explainability', text: 'Generates global demographic attribute impact score cards, preventing correlation-causation overlapping.' },
            { num: '06', title: 'GradCAM++ Brain focus', text: 'Projects diagnostic focus maps back onto 3D MRI voxel arrays, isolating gray-matter decay points.' },
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
            NEURAL_PIPELINE_FLOW
          </h3>
          <div className="space-y-4">
            {[
              { step: 'Layer 01', name: 'Raw Spatial Imaging Core', tech: '3D SwinTransformer', desc: 'Accepting Raw T1 MRI Brain scans. Projects voxel structures into latent vector spaces.' },
              { step: 'Layer 02', name: 'Tabular Clinical Ingestion', tech: 'TabNet Attention', desc: 'Processing environmental parameters (ALAN levels, local covariates) with sequential masks.' },
              { step: 'Layer 03', name: 'Multimodal Fusion Junction', tech: '8-Head Cross-Attention', desc: 'Cross-aligns tabular features and spatial images, outputting Brain Age Gap predictions.' },
              { step: 'Layer 04', name: 'Local Interpretability Deck', tech: 'GradCAM++ & SHAP', desc: 'Synthesizes neural feedback vectors into clear, human-auditable spatial highlight heatmaps.' },
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
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0f0f0f] border border-white/8 p-6 grid grid-cols-2 gap-4">
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">47k</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Cohorts Analyzed</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">3 Branches</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Integrations</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-[#00d4aa] block">&lt; 0.001</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Significance (P)</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">2.0e-5</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Residual Error</span>
            </div>
          </div>

          <div className="bg-[#0f0f0f] border border-[#FFB800]/20 p-6 relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFB800]" />
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
              KINETIC FINDINGS OUTLINE
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed font-light">
              We identified highly correlated gray-matter volume deterioration rates inside cortical regions in subjects exposed to persistent high light-pollution. This research indicates that environmental urban light markers acts as an accelerator of biological brain aging.
            </p>
          </div>
        </div>
      </section>

      {/* TECH STACK ROW */}
      <section className="bg-[#0f0f0f] border border-white/8 p-6 md:p-8 mb-16 select-none">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6 text-left border-b border-white/8 pb-4">
          TECHNOLOGY_DESTRUCTIVE_STREAK_MATRIX
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">OPERATING / CORE</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Python, Conda Core</li>
              <li>Slurm HPC Execution</li>
              <li>CUDA Acceleration CUDA-12</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">NEURAL FRAMEWORK</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>PyTorch ML Core</li>
              <li>TabNet Tabular Core</li>
              <li>T1 structural transformers</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">EXPLAINER UNITS</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>SHAP Core Pack</li>
              <li>GradCAM++ Render</li>
              <li>Numpy Mathematical</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">DATA BASES</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>UK Biobank Repos</li>
              <li>SQLite Local Indices</li>
              <li>Copernicus DEM Mapping</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
