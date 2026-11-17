import React, { useEffect } from 'react';
import { PageType } from '../types';
import { navigateBackToProjects, initPageTransition } from '../utils/transition';
import { ExternalLink, ArrowLeft, Terminal, MessageSquare, Globe2, BarChart3, Database } from 'lucide-react';

interface ProjectDetailProps {
  setCurrentPage: (page: PageType) => void;
}

export default function ProjectDetailSentiment({ setCurrentPage }: ProjectDetailProps) {
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
        <span className="text-white">MULTILINGUAL_SENTIMENT</span>
      </div>

      {/* HERO SECTION — 7/5 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#00d4aa]/15 border border-[#00d4aa]/30 text-[#00d4aa] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              COMPLETED · MAR 2026
            </span>
            <span className="bg-white/5 border border-white/10 text-[#888888] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              NATURAL LANGUAGE PROCESSING AI
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter leading-none">
            Sentiment Analyzer
          </h1>

          <div className="border-l-2 border-[#FFB800] pl-6 py-1">
            <p className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider">
              5-Language Sentiment Coverage // Hugging Face Transformers + Groq // 6 Emotion Classes
            </p>
          </div>

          <p className="text-sm text-[#cccccc] leading-relaxed font-light">
            An advanced natural language processing toolkit delivering 5-language sentiment analysis (English, Urdu, Bangla, Polish, and Hindi). It runs Hugging Face multilingual transformer models to map emotional states into 6 granular classes: happiness, sadness, anger, fear, surprise, and love.
          </p>

          <p className="text-xs text-[#888888] leading-relaxed font-light">
            Utilizes Groq Llama 3 endpoints to output rich contextual qualitative summaries on input records. Features robust chunk-based batch processing, and instant structured CSV export functionality to store parsed datasets.
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
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">PLATFORM TYPE</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">NLP Pipeline AI</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">TECHNOLOGY STACK</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">HF Transformers, Groq</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">PROJECT STATUS</span>
              <span className="text-base font-sans font-bold text-[#FFB800] uppercase mt-1 block">Completed Run</span>
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
                SENTIMENT_ANALYS_LOGS
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#00d4aa]" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Languages Covered</span>
              <span className="text-white uppercase font-bold">5 distinct tongues</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Class Emotion Breakdown</span>
              <span className="text-white uppercase font-bold text-[#00d4aa]">6 classes</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Model Core API</span>
              <span className="text-[#FFB800] uppercase font-bold">Transformers + Groq</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Export Format Structure</span>
              <span className="text-white uppercase font-bold">Batch CSV Pipeline</span>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-[#0a0a0a] border border-white/8 p-4 mt-8">
            <div className="text-[9px] font-mono text-[#888888] uppercase tracking-wider mb-2">CLASSIFIER CONFIDENCE METRICS</div>
            <div className="flex justify-between items-baseline gap-4">
              <span className="text-lg font-sans font-extrabold text-white tracking-tight uppercase">
                Accuracy Ok
              </span>
              <span className="text-xs font-mono text-[#FFB800] uppercase font-bold">
                VAL_F1: 0.884
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES GRID — 2x3 bordered cards */}
      <section className="mb-16">
        <div className="mb-10 text-left">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
            LINGUISTIC_MATRIX
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white uppercase tracking-tighter">
            Platform Capabilities
          </h2>
          <div className="w-[40px] h-[2px] bg-[#FFB800] mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', title: '5-Language Sentiment Cover', text: 'Splits raw text strings across English, Urdu, Bangla, Polish, and Hindi models using dedicated translation matrices.' },
            { num: '02', title: '6-Class Emotion Breakdown', text: 'Classifies input paragraphs across six key emotions (Happiness, Sadness, Anger, Fear, Surprise, Love).' },
            { num: '03', title: 'Hugging Face Core Models', text: 'Applies robust, tokenized XML-RoBERTa embeddings to track semantic patterns regardless of spelling drift.' },
            { num: '04', title: 'Groq/Llama-3 Summarization', text: 'Queries high-throughput Llama 3 models concurrently to produce qualitative narrative descriptions.' },
            { num: '05', title: 'CSV Batch Export Capabilities', text: 'Pipes multi-row text lists through classification queues, outputting detailed analytics files instantly.' },
            { num: '06', title: 'Langdetect Translation Router', text: 'Automatically routes input fragments to respective language workers without manual selector overrides.' },
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
            NATURAL_LANGUAGE_PIPELINE_FLOW
          </h3>
          <div className="space-y-4">
            {[
              { step: 'Layer 01', name: 'Raw Ingestion Input Gate', tech: 'FastAPI Router', desc: 'Accepts raw text or multi-row CSV files and triggers validation pipelines.' },
              { step: 'Layer 02', name: 'Linguistic Router Nodes', tech: 'Langdetect Framework', desc: 'Senses paragraph languages, routing text strings to corresponding model heads.' },
              { step: 'Layer 03', name: 'Classifier Inference Deck', tech: 'HuggingFace PyTorch', desc: 'Evaluates sentiment tokens, mapping emotional density matrices.' },
              { step: 'Layer 04', name: 'Qualitative Reports Engine', tech: 'Groq/Llama 3 API', desc: 'Generates narrative analysis logs, compiling outputs into a download ledger.' },
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
              <span className="text-2xl font-sans font-extrabold text-white block">5</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Languages</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">6 Classes</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Emotion Scores</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-[#00d4aa] block">0.884</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Weighted F1</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">&lt; 15ms</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Token Latency</span>
            </div>
          </div>

          <div className="bg-[#0f0f0f] border border-[#FFB800]/20 p-6 relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFB800]" />
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
              MULTILINGUAL ACCURACY IN NLP
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed font-light">
              Conventional sentiment score models suffer from localized colloquial mismatch inside Urdu, Bangla, and Hindi scripts. By mapping raw sentences into robust target models calibrated under regional datasets, our platform maintains consistent classifications with minimal error variances.
            </p>
          </div>
        </div>
      </section>

      {/* TECH STACK ROW */}
      <section className="bg-[#0f0f0f] border border-white/8 p-6 md:p-8 mb-16 select-none">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6 text-left border-b border-white/8 pb-4">
          NLP_CLASSIFIER_CORE_STACK
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">BACKEND DESK</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>FastAPI Micro</li>
              <li>Python 3.10</li>
              <li>Streamlit Client</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">INTELLIGENT INTEGRATION</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Hugging Face Embeds</li>
              <li>Groq API Worker</li>
              <li>Llama 3 Models</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">PIPELINES</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Langdetect Router</li>
              <li>Pandas Calculations</li>
              <li>NumPy Framework</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">EXPORT EXCEL</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>CSV File Export</li>
              <li>PostgreSQL Memory</li>
              <li>Git Revision Pack</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
