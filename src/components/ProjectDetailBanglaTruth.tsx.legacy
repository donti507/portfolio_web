import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { navigateBackToProjects, initPageTransition } from '../utils/transition';
import { ExternalLink, ArrowLeft, Terminal, ShieldAlert, Cpu, CheckCircle2, RefreshCw } from 'lucide-react';

interface ProjectDetailProps {
  setCurrentPage: (page: PageType) => void;
}

export default function ProjectDetailBanglaTruth({ setCurrentPage }: ProjectDetailProps) {
  useEffect(() => {
    initPageTransition();
  }, []);

  // Sandbox interactive states
  const [claim, setClaim] = useState('NASA confirms 3 days of total darkness on Earth in December 2026.');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);
  const [verdict, setVerdict] = useState<'FALSE' | 'TRUE' | 'MISLEADING' | 'UNVERIFIABLE' | 'PARTIALLY_TRUE'>('FALSE');
  const [confidence, setConfidence] = useState(94);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([
    'SYSTEM: Initializing verification pipeline...',
    'API: Spawning concurrent asyncio workers...',
    'WORKER 01: Llama-3.3-70B returned verdict [FALSE] with confidence 0.96',
    'WORKER 02: Llama-3.1-8B returned verdict [FALSE] with confidence 0.92',
    'AGGREGATOR: Majority vote consensus achieved: 2/2 FALSE',
    'EXPLAINER: GradCAM weight mapping completed successfully.'
  ]);

  const sampleClaims = [
    {
      en: 'NASA confirms 3 days of total darkness on Earth in December 2026.',
      bn: 'নাসা নিশ্চিত করেছে যে ২০২৬ সালের ডিসেম্বরে পৃথিবীতে ৩ দিন সম্পূর্ণ অন্ধকার থাকবে।',
      verdict: 'FALSE' as const,
      confidence: 98,
      logs: [
        'SYSTEM: Initializing verification pipeline...',
        'API: Spawning concurrent asyncio workers...',
        'WORKER 01: Llama-3.3-70B returned verdict [FALSE] (conf = 0.99)',
        'WORKER 02: Llama-3.1-8B returned verdict [FALSE] (conf = 0.97)',
        'AGGREGATOR: Majority vote consensus achieved: 2/2 FALSE',
        'EXPLAINER: Attentional weight checks confirm viral hoax pattern.'
      ]
    },
    {
      en: 'WHO reports 15% reduction in global stress index due to adaptive AI frameworks.',
      bn: 'হু রিপোর্ট করেছে যে অভিযোজিত এআই কাঠামোর কারণে বৈশ্বিক মানসিক চাপ ১৫% হ্রাস পেয়েছে।',
      verdict: 'MISLEADING' as const,
      confidence: 84,
      logs: [
        'SYSTEM: Initializing verification pipeline...',
        'API: Spawning concurrent asyncio workers...',
        'WORKER 01: Llama-3.3-70B returned verdict [MISLEADING] (conf = 0.88)',
        'WORKER 02: Llama-3.1-8B returned verdict [FALSE] (conf = 0.80)',
        'AGGREGATOR: Resolved to [MISLEADING] via Llama-3.3 seniority override.',
        'EXPLAINER: Found dynamic mixing of Satire + Unverified surveys.'
      ]
    },
    {
      en: 'Bangladesh is building its largest satellite ground terminal in Cox\'s Bazar.',
      bn: 'কক্সবাজারে বাংলাদেশের বৃহত্তম স্যাটেলাইট গ্রাউন্ড টার্মিনাল নির্মাণ করা হচ্ছে।',
      verdict: 'TRUE' as const,
      confidence: 91,
      logs: [
        'SYSTEM: Initializing verification pipeline...',
        'API: Spawning concurrent asyncio workers...',
        'WORKER 01: Llama-3.3-70B returned verdict [TRUE] (conf = 0.93)',
        'WORKER 02: Llama-3.1-8B returned verdict [TRUE] (conf = 0.89)',
        'AGGREGATOR: Majority vote consensus achieved: 2/2 TRUE',
        'EXPLAINER: Context matched with IMGW / SPARRSO local press bulletins.'
      ]
    }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalyzed(false);
    const mockLogs = [
      'SYSTEM: Connection established...',
      'SYSTEM: Running dynamic language translation lookup...',
      'API: Querying Llama 3.3 (70B) & Llama 3.1 (8B) models...',
      'WORKER: Running semantic token vector match...',
    ];
    setAnalysisLogs(mockLogs);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < 3) {
        setAnalysisLogs(prev => [...prev, `WORKER: Evaluating sub-tokens [Step ${idx + 1}/3]...`]);
        idx++;
      } else {
        clearInterval(interval);
        // Randomize verdict for simulation
        const randomVerdicts: ('FALSE' | 'TRUE' | 'MISLEADING' | 'PARTIALLY_TRUE')[] = ['FALSE', 'TRUE', 'MISLEADING', 'PARTIALLY_TRUE'];
        const selected = randomVerdicts[Math.floor(Math.random() * randomVerdicts.length)];
        setVerdict(selected);
        const randomConf = Math.floor(Math.random() * 20) + 78;
        setConfidence(randomConf);
        setAnalysisLogs(prev => [
          ...prev,
          `WORKER 01: Llama-3.3-70B returned verdict [${selected}] (conf = 0.91)`,
          `WORKER 02: Llama-3.1-8B returned verdict [${selected}] (conf = 0.84)`,
          `AGGREGATOR: Consensus reached [${selected}] via majority vote rule.`,
          'SYSTEM: Pipeline complete. Fact ledger compiled.'
        ]);
        setIsAnalyzing(false);
        setAnalyzed(true);
      }
    }, 450);
  };

  const handleSelectSample = (item: typeof sampleClaims[0]) => {
    setClaim(item.en);
    setVerdict(item.verdict);
    setConfidence(item.confidence);
    setAnalysisLogs(item.logs);
    setAnalyzed(true);
    setIsAnalyzing(false);
  };

  // Verdict style mapping
  const getVerdictStyle = (v: typeof verdict) => {
    switch (v) {
      case 'TRUE':
        return { text: 'text-[#00d4aa]', bg: 'bg-[#00d4aa]/10', border: 'border-[#00d4aa]/30' };
      case 'FALSE':
        return { text: 'text-[#ff4444]', bg: 'bg-[#ff4444]/10', border: 'border-[#ff4444]/30' };
      case 'MISLEADING':
        return { text: 'text-[#FFB800]', bg: 'bg-[#FFB800]/10', border: 'border-[#FFB800]/30' };
      default:
        return { text: 'text-[#888888]', bg: 'bg-white/5', border: 'border-white/10' };
    }
  };

  const verStyle = getVerdictStyle(verdict);

  return (
    <div className="pt-24 pb-24 px-4 md:px-12 max-w-[1200px] mx-auto animate-fadeIn select-none text-left">
      
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
        <span className="text-white">BANGLATRUTH</span>
      </div>

      {/* HERO SECTION — 7/5 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#00d4aa]/15 border border-[#00d4aa]/30 text-[#00d4aa] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              COMPLETED · APR 2026
            </span>
            <span className="bg-white/5 border border-white/10 text-[#888888] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              AI/ML FACT CHECKING
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter leading-none">
            BanglaTruth
          </h1>

          <div className="border-l-2 border-[#FFB800] pl-6 py-1">
            <p className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider">
              Bilingual LLM Orchestration // Parallel Inference // Majority-Vote Aggregation
            </p>
          </div>

          <p className="text-sm text-[#cccccc] leading-relaxed font-light">
            BanglaTruth is a production-ready, highly parallelized bilingual AI fact-checking platform (English and Bangla). It leverages concurrent asyncio routines to run Llama 3.3 (70B) and Llama 3.1 (8B) models in parallel, computing consensus outputs using a robust 5-verdict majority-vote aggregator back-end.
          </p>

          <p className="text-xs text-[#888888] leading-relaxed font-light">
            By avoiding sequential generation bottlenecks, the platform achieves 40% faster validation throughput on local systems, integrating deep contextual databases and translation token matching.
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
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">Bilingual Verifier</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">TECHNOLOGY STACK</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">Llama Models, FastAPI</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">PERFORMANCE ADVANTAGE</span>
              <span className="text-base font-sans font-bold text-[#FFB800] uppercase mt-1 block">40% Faster</span>
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
                ORCHESTRATION_BENCHMARK_LOG
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Primary Agent</span>
              <span className="text-white uppercase font-bold">Llama-3.3 (70B)</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Secondary Agent</span>
              <span className="text-white uppercase font-bold">Llama-3.1 (8B)</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Parallel Processing</span>
              <span className="text-[#00d4aa] uppercase font-bold">Asyncio Threaded (40%)</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Majority Consensus</span>
              <span className="text-white uppercase font-bold">Rule-Based Vote</span>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-[#0a0a0a] border border-white/8 p-4 mt-8">
            <div className="text-[9px] font-mono text-[#888888] uppercase tracking-wider mb-2">VERDICT SUMMARY STATE</div>
            <div className="flex justify-between items-baseline gap-4">
              <span className="text-2xl font-sans font-extrabold text-white tracking-tight uppercase">
                2/2 CONVERGED
              </span>
              <span className="text-xs font-mono text-[#FFB800] uppercase font-bold">
                LATENCY: 1.2s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* NEW INTERACTIVE SANDBOX SECTION */}
      <section className="bg-[#0f0f0f] border border-white/8 p-6 md:p-10 mb-16 relative">
        <div className="absolute top-0 left-0 w-[4px] h-[40px] bg-[#FFB800]" />
        
        <header className="mb-8">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#FFB800] uppercase block mb-1">
            SIMULATION_PORTAL
          </span>
          <h2 className="text-2xl font-sans font-extrabold text-white uppercase tracking-tight">
            Interactive AI Fact-Checking Sandbox
          </h2>
          <p className="text-xs text-[#888888] mt-1 font-sans">
            Submit any query or click a quick-test sample claim below to simulate how our dual Llama-3 agent pipeline consensus vote behaves in real-time.
          </p>
        </header>

        {/* Quick select samples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {sampleClaims.map((sample, sIdx) => (
            <button
              key={sIdx}
              onClick={() => handleSelectSample(sample)}
              className="bg-[#0a0a0a] border border-white/8 p-4 text-left hover:border-white/20 hover:border-l-2 hover:border-l-[#FFB800] transition-all cursor-pointer select-none"
            >
              <div className="text-[9px] font-mono text-[#888888] mb-1.5 font-bold uppercase tracking-wider">
                SAMPLE 0{sIdx + 1} // Expected: {sample.verdict}
              </div>
              <p className="text-xs text-white truncate font-light uppercase">{sample.en}</p>
              <p className="text-[10px] text-[#888888] truncate mt-1">বাং: {sample.bn}</p>
            </button>
          ))}
        </div>

        {/* Form Input and Terminal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Form Side (5 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 bg-[#0a0a0a] border border-white/8 p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold tracking-wider text-[#888888] uppercase mb-2">
                  CLAIM STATEMENT FOR VERIFICATION (ENG / BNG)
                </label>
                <textarea
                  value={claim}
                  onChange={(e) => setClaim(e.target.value)}
                  placeholder="TYPE ENGLISH OR BANGLA CLAIM HERE FOR REAL-TIME DESTRUCTIVE ANALYSIS..."
                  rows={4}
                  className="w-full bg-[#050505] border border-white/8 text-white text-xs font-mono p-4 placeholder-white/20 uppercase tracking-wider focus:outline-none focus:border-[#FFB800] resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-grow btn-amber-filled text-[#050505] font-sans font-bold uppercase tracking-widest text-xs py-4 px-6 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> ANALYZING...
                    </>
                  ) : (
                    <>
                      ANALYZE CLAIM <Cpu className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="text-[9px] font-mono text-[#888888]/60 uppercase tracking-widest border-t border-white/5 pt-4">
              PIPELINE WORKERS: 2 CONCURRENT | LATENCY OPTIMIZED
            </div>
          </div>

          {/* Terminal Console Log Side (6 cols) */}
          <div className="lg:col-span-6 bg-[#050505] border border-white/8 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#888888] border-b border-white/8 pb-3 mb-4">
                <span>CONCURRENT WORKER TELEMETRY</span>
                <span className="text-[#FFB800]">// ACTIVE_DUMP</span>
              </div>
              
              <div className="space-y-2.5 font-mono text-[10px] h-32 overflow-y-auto pr-2 scrollbar-thin">
                {analysisLogs.map((log, lIdx) => (
                  <div key={lIdx} className="leading-tight text-white/80 select-none">
                    <span className="text-[#FFB800]">❯</span> {log}
                  </div>
                ))}
                {isAnalyzing && (
                  <div className="text-[#FFB800] animate-pulse">❯ RUNNING STATISTICAL HEURISTIC CLASSIFIERS...</div>
                )}
              </div>
            </div>

            {/* Results Output panel */}
            <div className="border-t border-white/8 pt-4 mt-6">
              {analyzed ? (
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-[#888888] uppercase block tracking-wider">CONSENSUS VERDICT</span>
                    <span className={`text-xl font-sans font-black uppercase tracking-tight ${verStyle.text}`}>
                      {verdict}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#888888] uppercase block tracking-wider">CONFIDENCE WEIGHT</span>
                    <span className="text-xl font-sans font-black text-white">{confidence}%</span>
                  </div>
                  <div className={`px-3 py-1.5 border border-dashed text-[10px] font-mono uppercase font-bold rounded-[4px] ${verStyle.border} ${verStyle.text} ${verStyle.bg}`}>
                    VERIFIED_LEDGER
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-xs font-mono text-[#888888]/40 uppercase tracking-widest">
                  Awaiting sandbox claim analysis...
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* FEATURES GRID — 2x3 bordered cards */}
      <section className="mb-16">
        <div className="mb-10 text-left">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
            CAPABILITY_MATRIX
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white uppercase tracking-tighter">
            Platform Capabilities
          </h2>
          <div className="w-[40px] h-[2px] bg-[#FFB800] mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'Concurrent LLM Querying', text: 'Handles multiple API calls concurrently via python asyncio, bypassing the lock latency of standard sequential generation engines.' },
            { num: '02', title: 'Majority-Vote Pipeline', text: 'Integrates discrete rule-based majority consensus selectors to aggregate individual model outputs into verified fact points.' },
            { num: '03', title: 'Bilingual Tokenization', text: 'Tailored specifically for both English and Bangla grammatical constraints, with automated embedding matching.' },
            { num: '04', title: 'GradCAM Explanations', text: 'Provides visualization mappings of linguistic features, highlighting high-weight tokens that triggered the fact-verdict.' },
            { num: '05', title: 'Robust Web Dashboard', text: 'Built cleanly using Streamlit/FastAPI, giving scientists and researchers instantaneous access to verification states.' },
            { num: '06', title: 'Database Persistence', text: 'Preserves parsed claims, token ratios, and verdict telemetry securely inside our Supabase storage backend.' },
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
        {/* Left pipeline rows (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f0f0f] border border-white/8 p-6 md:p-8">
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6">
            DIAGNOSTIC_PIPELINE_FLOW
          </h3>
          <div className="space-y-4">
            {[
              { step: 'Layer 01', name: 'Claims Ingestion Engine', tech: 'FastAPI Router', desc: 'Secure asynchronous capture of multilingual statement strings via HTTPS.' },
              { step: 'Layer 02', name: 'Embedding Mapping & Match', tech: 'Groq API Workers', desc: 'Translational token alignments to identify corresponding contextual references.' },
              { step: 'Layer 03', name: 'Parallel API Execution', tech: 'Asyncio Routine', desc: 'Fires independent API requests to Llama 3.3 and Llama 3.1 concurrently.' },
              { step: 'Layer 04', name: 'Consensus Vote Decision', tech: 'Aggregation Processor', desc: 'Applies rigorous weighted voting and logs final target conviction.' },
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
              <span className="text-2xl font-sans font-extrabold text-white block">2</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Parallel Models</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">40%</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Latency Reduction</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">5</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Verdict Ranks</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">100%</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Open Source</span>
            </div>
          </div>

          <div className="bg-[#0f0f0f] border border-[#FFB800]/20 p-6 relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFB800]" />
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
              TECHNICAL_CHALLENGE_SOLVED
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed font-light">
              Conventional factual checking systems call separate agentic layers sequentially. This causes heavy latency accumulation (~5-10s per check). By refactoring our microservice architecture using co-routines, we query both large-scale consensus models simultaneously, compressing aggregate response times down to 1.2s.
            </p>
          </div>
        </div>
      </section>

      {/* TECH STACK ROW */}
      <section className="bg-[#0f0f0f] border border-white/8 p-6 md:p-8 mb-16 select-none">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6 text-left border-b border-white/8 pb-4">
          SYSTEM_DESTRUCTIVE_INTEGRATION_STACK
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">BACKEND</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Python Asyncio</li>
              <li>FastAPI Micro</li>
              <li>Super API Workers</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">AI-ML MODELS</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Llama 3.3 (70B)</li>
              <li>Llama 3.1 (8B)</li>
              <li>Attention Maps</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">FRONTEND CLIENT</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Streamlit Client</li>
              <li>Tailwind Styles</li>
              <li>Terminal Widgets</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">PERSISTENCE DATA</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Supabase DB</li>
              <li>PostgreSQL Storage</li>
              <li>JSON Ledger Files</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
