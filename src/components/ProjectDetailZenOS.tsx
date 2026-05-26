import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { navigateBackToProjects, initPageTransition } from '../utils/transition';
import { ExternalLink, ArrowLeft, Terminal, LayoutDashboard, Database, KanbanSquare, Bot, AlertTriangle, Send } from 'lucide-react';

interface ProjectDetailProps {
  setCurrentPage: (page: PageType) => void;
}

export default function ProjectDetailZenOS({ setCurrentPage }: ProjectDetailProps) {
  useEffect(() => {
    initPageTransition();
  }, []);

  // Sandbox active tabs
  const [activeTab, setActiveTab] = useState<'dashboard' | 'kanban' | 'dante'>('dashboard');

  // Dante AI states
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'dante'; text: string }>>([
    { sender: 'dante', text: 'Greeting researcher. I am Dante AI, integrated directly with your university USOS grading registry. Ask me to predict academic outcomes or search your local Vault sources.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isDanteTyping, setIsDanteTyping] = useState(false);

  // Send message to Dante simulation
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');
    setIsDanteTyping(true);

    setTimeout(() => {
      let botResponse = 'Unable to predict outcome. Please sync USOS API credentials.';
      
      const textLower = userText.toLowerCase();
      if (textLower.includes('gpa') || textLower.includes('academic') || textLower.includes('semester')) {
        botResponse = 'USOS ANALYTICS: Based on current ECTS accumulations (30) and historically checked course coefficients in structural biology, your forecasted semester outcome is 4.86 GPA. Keep up current daily research sessions.';
      } else if (textLower.includes('literature') || textLower.includes('papers') || textLower.includes('alan')) {
        botResponse = 'LOCAL VAULT: Retrieved 3 papers matching "ALAN (Artificial Light At Night)". 1. Chakraborty et al. (2026), 2. UK Biobank Neuro-Swin study. High-confidence recommendation is to prioritize revision of chapter 14 draft.';
      } else {
        botResponse = 'DANTE REPORT: Log identified. Your researcher statistics show continuous compliance. Streamlined focus has increased study session completion rates by 12% this week.';
      }

      setMessages(prev => [...prev, { sender: 'dante', text: botResponse }]);
      setIsDanteTyping(false);
    }, 400);
  };

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
        <span className="text-white">ZEN-OS</span>
      </div>

      {/* HERO SECTION — 7/5 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              ACTIVE DESIGN · 2026
            </span>
            <span className="bg-white/5 border border-white/10 text-[#888888] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              RESEARCHER PRODUCTIVITY SUITE
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter leading-none">
            StudentOS (ZEN_OS)
          </h1>

          <div className="border-l-2 border-[#FFB800] pl-6 py-1">
            <p className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider">
              LLM Planner // USOS API Academic Prediction // Six Workspace Views
            </p>
          </div>

          <p className="text-sm text-[#cccccc] leading-relaxed font-light">
            StudentOS (ZEN_OS) is an advanced, LLM-powered personalized daily workspace specifically designed for researchers and scientists. Unified under a severe, custom-styled dashboard, it merges ECTS outcome metrics with daily study pipelines.
          </p>

          <p className="text-xs text-[#888888] leading-relaxed font-light">
            Integrating 6 distinct, interconnected workspaces: Dashboard overview, Kanban task grids, Research Calendar, Session Analytics, local Document Vault, and the Dante AI academic companion fetching records over real university USOS grading APIs.
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
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">SYSTEM SCALE</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">6 Unified modules</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">CORE INTEGRATION</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">USOS Endpoint API</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">COMPLIANT BASE</span>
              <span className="text-base font-sans font-bold text-[#FFB800] uppercase mt-1 block">Next.js 14, TS</span>
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
                ZEN_OS_KERNEL_LOGS
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Connected API Endpoint</span>
              <span className="text-[#00d4aa] uppercase font-bold">USOS_ENDPOINT_CONNECTED</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Dante Engine Status</span>
              <span className="text-white uppercase font-bold">LLAMA_3_INF_ACTIVE</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Document Sync (Vault)</span>
              <span className="text-white uppercase font-bold">144 SOURCE_RECORDS</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Task Schedulers</span>
              <span className="text-white uppercase font-bold">CRON_HEURISTICS_OK</span>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-[#0a0a0a] border border-white/8 p-4 mt-8">
            <div className="text-[9px] font-mono text-[#888888] uppercase tracking-wider mb-2">ECTS REGISTRY FORECAST STATUS</div>
            <div className="flex justify-between items-baseline gap-4">
              <span className="text-xl font-sans font-extrabold text-[#FFB800] tracking-tight uppercase">
                PREDICTIVITY ACTIVE
              </span>
              <span className="text-xs font-mono text-[#8c8c8c] uppercase font-bold">
                Q-3 UNDERGRAD
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
            VIRTUALIZED_FRAMEWORK
          </span>
          <h2 className="text-2xl font-sans font-extrabold text-white uppercase tracking-tight">
            Interactive ZEN_OS Sandbox Environment
          </h2>
          <p className="text-xs text-[#888888] mt-1 font-sans">
            Shift between some of our active workspace views mockups to see how the integrated Kanban board or Dante AI helper responds to dynamic operations.
          </p>
        </header>

        {/* Workspace View Switcher Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest border transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-[#FFB800] text-black border-[#FFB800]'
                : 'bg-[#0a0a0a] text-[#888888] border-white/8 hover:border-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest border transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'kanban'
                ? 'bg-[#FFB800] text-black border-[#FFB800]'
                : 'bg-[#0a0a0a] text-[#888888] border-white/8 hover:border-white'
            }`}
          >
            <KanbanSquare className="w-3.5 h-3.5" /> Kanban Grid
          </button>
          <button
            onClick={() => setActiveTab('dante')}
            className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest border transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'dante'
                ? 'bg-[#FFB800] text-black border-[#FFB800]'
                : 'bg-[#0a0a0a] text-[#888888] border-white/8 hover:border-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" /> Dante AI Chat
          </button>
        </div>

        {/* Active Sandbox View Frame */}
        <div className="min-h-[350px] bg-[#0a0a0a] border border-white/8 p-6 relative">
          
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono font-bold text-[#FFB800] uppercase tracking-wider">ZEN_OS DASHBOARD OUTLINE</span>
                <span className="text-[9px] font-mono text-[#8c8c8c]">SESSION: NOMINAL</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0f0f0f] border border-white/8 p-4">
                  <span className="text-[9px] font-mono text-[#888888] uppercase block font-bold leading-none mb-1">ECTS TO DATE</span>
                  <span className="text-3xl font-sans font-black text-white">90 Credits</span>
                  <p className="text-[10px] text-[#888888] font-mono mt-1">Status: Safe (Ahead of curve)</p>
                </div>
                <div className="bg-[#0f0f0f] border border-white/8 p-4">
                  <span className="text-[9px] font-mono text-[#888888] uppercase block font-bold leading-none mb-1">RESEARCH TIME</span>
                  <span className="text-3xl font-sans font-black text-[#FFB800]">122 Hours</span>
                  <p className="text-[10px] text-[#888888] font-mono mt-1">Metric: Daily Average 4.2h</p>
                </div>
                <div className="bg-[#0f0f0f] border border-white/8 p-4">
                  <span className="text-[9px] font-mono text-[#888888] uppercase block font-bold leading-none mb-1">DANTE INDEXES</span>
                  <span className="text-3xl font-sans font-black text-[#00d4aa]">Nominal</span>
                  <p className="text-[10px] text-[#888888] font-mono mt-1">Accuracy Factor: 0.982</p>
                </div>
              </div>

              {/* Quick warning */}
              <div className="border border-[#FFB800]/20 bg-[#FFB800]/2 p-3.5 flex gap-3 items-center text-xs text-[#FFB800]">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>USOS METRIC CHECK: Semester boundary assessment is scheduled in 4 days. Syncing terminal keys now.</span>
              </div>
            </div>
          )}

          {/* Kanban Board View */}
          {activeTab === 'kanban' && (
            <div className="animate-fadeIn space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono font-bold text-[#FFB800] uppercase tracking-wider">ACTIVE RESEARCH TASK KANBAN</span>
                <span className="text-[9px] font-mono text-[#8c8c8c]">COLLABORATOR MODE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* To Do */}
                <div className="bg-[#0f0f0f] border border-white/8 p-4 space-y-3">
                  <span className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-wide border-b border-white/5 pb-1 block">To Do</span>
                  <div className="bg-[#0a0a0a] border border-white/8 p-3 hover:border-[#FFB800] transition-colors">
                    <h4 className="text-xs font-bold text-white uppercase font-sans">Revise CRC Press Book Chapter</h4>
                    <span className="text-[8px] font-mono text-[#888888] block mt-2">DUE: 3 DAYS</span>
                  </div>
                </div>
                {/* In Progress */}
                <div className="bg-[#0f0f0f] border border-white/8 p-4 space-y-3">
                  <span className="text-[10px] font-mono font-bold text-[#FFB800] uppercase tracking-wide border-b border-white/5 pb-1 block">In Progress</span>
                  <div className="bg-[#0a0a0a] border border-[#FFB800]/30 p-3">
                    <h4 className="text-xs font-bold text-white uppercase font-sans">Train SwinTransformer on MRI</h4>
                    <span className="text-[8px] font-mono text-[#FFB800] block mt-2">ACTIVE SESSION</span>
                  </div>
                </div>
                {/* Completed */}
                <div className="bg-[#0f0f0f] border border-white/8 p-4 space-y-3">
                  <span className="text-[10px] font-mono font-bold text-[#00d4aa] uppercase tracking-wide border-b border-white/5 pb-1 block">Completed</span>
                  <div className="bg-[#0a0a0a] border border-[#00d4aa]/30 p-3 opacity-60">
                    <h4 className="text-xs font-bold text-white uppercase line-through font-sans">Submit Flood Risk Proposal</h4>
                    <span className="text-[8px] font-mono text-[#00d4aa] block mt-2">VERIFIED OK</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dante AI Chat View */}
          {activeTab === 'dante' && (
            <div className="flex flex-col justify-between h-[300px] animate-fadeIn">
              <div className="overflow-y-auto space-y-3 max-h-[220px] pr-2 scrollbar-thin flex-grow">
                {messages.map((m, mIdx) => (
                  <div key={mIdx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 max-w-[80%] text-xs font-mono border ${
                      m.sender === 'user'
                        ? 'bg-[#0f0f0f] text-white border-white/10'
                        : 'bg-white/5 text-[#FFB800] border-[#FFB800]/20'
                    }`}>
                      <span className="text-[8px] opacity-40 uppercase block mb-1">
                        {m.sender === 'user' ? 'RESEARCHER' : 'DANTE_AI_KERNEL'}
                      </span>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isDanteTyping && (
                  <div className="text-xs font-mono text-[#FFB800] animate-pulse">
                    ❯ DANTE IS INGESTING STATISTICAL TARGET MATRIX...
                  </div>
                )}
              </div>

              {/* Chat form Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-white/5 pt-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Dante: 'Predict my semester GPA' or 'Recommend literature'..."
                  className="flex-grow bg-[#0f0f0f] border border-white/8 text-white text-xs font-mono p-3 uppercase focus:outline-none focus:border-[#FFB800]"
                />
                <button
                  type="submit"
                  className="bg-[#FFB800] text-black px-5 hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>
      </section>

      {/* FEATURE CARD MATRIX — 2x3 */}
      <section className="mb-16">
        <div className="mb-10 text-left">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
            INTEGRATED_MODULES_CORES
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white uppercase tracking-tighter">
            System Workspace Features
          </h2>
          <div className="w-[40px] h-[2px] bg-[#FFB800] mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'Unified Research Dashboard', text: 'Centralizes ECTS, active daily milestones, task progress multipliers, and compiler feedback inside a severe high-contrast card UI.' },
            { num: '02', title: 'Interactive Kanban Boards', text: 'Granular status tracking designed around research steps. Integrates priority weight tags conforming exactly to Slurm requirements.' },
            { num: '03', title: 'Academic Dante Chatbot', text: 'State-of-the-art LLM companion answering context questions using local Vault papers and predictive grader data.' },
            { num: '04', title: 'USOS API Grader predict', text: 'Secure integration linking directly with University USOS profiles to automatically forecast semester grades and ECTS gaps.' },
            { num: '05', title: 'Crystalline Session Logs', text: 'Keeps exhaustive chronological archives of study time densities, giving visual stats feedback on effort coefficients.' },
            { num: '06', title: 'Document Vault Storage', text: 'Enables secure local archiving of scholar citation lists and raw telemetry. Highlights keywords with zero leakage dangers.' },
          ].map((f, index) => (
            <div
              key={index}
              className="bg-[#0f0f0f] border border-white/8 p-6 transition-all duration-200 select-none group hover:border-[#00d4aa]/30 hover:bg-[#00d4aa]/2"
            >
              <div className="text-xs font-mono font-bold text-[#FFB800] mb-4 tracking-widest uppercase">
                ZEN_MODULE_{f.num}
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

      {/* PIPELINE ARCHITECTURE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left pipeline layers (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f0f0f] border border-white/8 p-6 md:p-8">
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6">
            WORKSPACE_KINETIC_LAYERS
          </h3>
          <div className="space-y-4">
            {[
              { step: 'Layer 01', name: 'User Authentication Portal', tech: 'Client OAuth Link', desc: 'Secure sign-on and storage mappings for scholar profile credentials.' },
              { step: 'Layer 02', name: 'University USOS Registry Fetcher', tech: 'USOS JSON Endpoints', desc: 'Pulls academic reports and correlates previous performance records.' },
              { step: 'Layer 03', name: 'Prompt Orchestration Engine', tech: 'Llama Inference API', desc: 'Routes conversation threads to Dante AI with ECTS and local paper contexts.' },
              { step: 'Layer 04', name: 'Dashboard Widget Binder', tech: 'Framer Motion & State', desc: 'Reflows Kanban queues and analytics charts based on local database actions.' },
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

        {/* Right stats + callout (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0f0f0f] border border-white/8 p-6 grid grid-cols-2 gap-4">
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">6</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Workspace Views</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">4.86 GPA</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Predicted Outcome</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">100%</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Secure Sync</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">Next.js 14</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Core Stack</span>
            </div>
          </div>

          <div className="bg-[#0f0f0f] border border-[#FFB800]/20 p-6 relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFB800]" />
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
              THE VALUE OF SEMANTIC RESEARCH ASSISTANCE
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed font-light">
              Conventional productivity apps operate in informational isolation, forcing researchers to bounce between separate academic databases, planners, and registries. ZEN_OS aggregates these layers, correlating grades direct from USOS with local scholar citation notebooks via Dante AI context routing.
            </p>
          </div>
        </div>
      </section>

      {/* SYSTEM TECH STACK FOOTER */}
      <section className="bg-[#0f0f0f] border border-white/8 p-6 md:p-8 mb-16 select-none">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6 text-left border-b border-white/8 pb-4">
          ZEN_OS_COMPILATION_ENGINE_ENVIRONMENT_STACK
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">DEVELOPMENT CORE</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Next.js 14 (App)</li>
              <li>TypeScript Typed</li>
              <li>Framer Motion Core</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">INTELLIGENT INTEGRATION</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Llama 3 Local APIs</li>
              <li>Contextual Vault Embeds</li>
              <li>Prompt Heuristics</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">ACADEMIC REGISTRY</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>USOS REST Endpoints</li>
              <li>Cisco CCNA Wireless</li>
              <li>Grade Predictor Logits</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">STYLING CANOPY</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Tailwind CSS Directs</li>
              <li>Space Grotesk Fonts</li>
              <li>JetBrains Mono Tables</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
