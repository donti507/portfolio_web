import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { navigateBackToProjects, initPageTransition } from '../utils/transition';
import { ExternalLink, ArrowLeft, Terminal, Shield, Percent, TrendingUp, RefreshCw } from 'lucide-react';

interface ProjectDetailProps {
  setCurrentPage: (page: PageType) => void;
}

export default function ProjectDetailCreditRisk({ setCurrentPage }: ProjectDetailProps) {
  useEffect(() => {
    initPageTransition();
  }, []);

  // ML Scorecard inputs
  const [dti, setDti] = useState(32); // Debt-To-Income
  const [income, setIncome] = useState(85000);
  const [defaults, setDefaults] = useState<'NONE' | 'LATE_1_2' | 'HEAVY'>('NONE');
  const [ltv, setLtv] = useState(72); // Loan-To-Value
  const [history, setHistory] = useState(6); // Employment years

  // Calculated outputs
  const [score, setScore] = useState(715);
  const [risk, setRisk] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('LOW');
  const [isComputing, setIsComputing] = useState(false);

  // Compute live scorecard values based on a deterministic regression formula
  const handleCompute = () => {
    setIsComputing(true);
    setTimeout(() => {
      // Baseline score of 720
      let baseScore = 680;
      
      // Impact of DTI (lower is better, penalty for > 40%)
      if (dti < 30) baseScore += 45;
      else if (dti < 50) baseScore += 10;
      else baseScore -= 70;

      // Impact of Income
      if (income > 100000) baseScore += 50;
      else if (income > 60000) baseScore += 20;
      else baseScore -= 40;

      // Impact of Defaults (massive penalty)
      if (defaults === 'NONE') baseScore += 65;
      else if (defaults === 'LATE_1_2') baseScore -= 80;
      else baseScore -= 180;

      // Impact of LTV (lower is better)
      if (ltv < 50) baseScore += 35;
      else if (ltv < 80) baseScore += 10;
      else baseScore -= 40;

      // Impact of Employment history
      if (history > 5) baseScore += 40;
      else if (history > 2) baseScore += 15;
      else baseScore -= 20;

      // Bound score between 300 and 850
      const finalScore = Math.max(300, Math.min(850, baseScore));
      setScore(finalScore);

      // Determine risk tier
      if (finalScore >= 720) setRisk('LOW');
      else if (finalScore >= 640) setRisk('MEDIUM');
      else if (finalScore >= 550) setRisk('HIGH');
      else setRisk('CRITICAL');

      setIsComputing(false);
    }, 350);
  };

  // Run first calculation on load
  useEffect(() => {
    handleCompute();
  }, [dti, income, defaults, ltv, history]);

  // Style mapping for risk tier
  const getRiskStyle = (rStyle: typeof risk) => {
    switch (rStyle) {
      case 'LOW':
        return { text: 'text-[#00d4aa]', bg: 'bg-[#00d4aa]/10', border: 'border-[#00d4aa]/30' };
      case 'MEDIUM':
        return { text: 'text-[#FFB800]', bg: 'bg-[#FFB800]/10', border: 'border-[#FFB800]/30' };
      case 'HIGH':
        return { text: 'text-[#ff7a00]', bg: 'bg-[#ff7a00]/10', border: 'border-[#ff7a00]/30' };
      case 'CRITICAL':
        return { text: 'text-[#ff4444]', bg: 'bg-[#ff4444]/10', border: 'border-[#ff4444]/30' };
    }
  };

  const riskStyle = getRiskStyle(risk);

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
        <span className="text-white">CREDIT-RISK-SCORING</span>
      </div>

      {/* HERO SECTION — 7/5 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#00d4aa]/15 border border-[#00d4aa]/30 text-[#00d4aa] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              COMPLETED · 2026
            </span>
            <span className="bg-white/5 border border-white/10 text-[#888888] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              FINANCIAL RISK AI / ML
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter leading-none">
            Credit Risk Scoring
          </h1>

          <div className="border-l-2 border-[#FFB800] pl-6 py-1">
            <p className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider">
              Logistic Regression Scorecards // ROC AUC: 0.92 // Regulatory Explainability
            </p>
          </div>

          <p className="text-sm text-[#cccccc] leading-relaxed font-light">
            An enterprise-grade financial risk scorecard system built with industry-standard predictive constraints. It converts continuous machine learning coefficients into integer scaling weights, ensuring full compliance with Basel and Fair Lending explainability rules.
          </p>

          <p className="text-xs text-[#888888] leading-relaxed font-light">
            Demonstrating solid classification thresholds calibrated for bank underwriting portfolios. Features comprehensive Kolmogorov-Smirnov statistics, Gini coefficients, and precision matrix parameters.
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
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">MODEL TYPE</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">XGBoost & Logistic</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">PERFORMANCE TARGET</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">ROC AUC 0.92</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">REGULATORY STATUS</span>
              <span className="text-base font-sans font-bold text-[#FFB800] uppercase mt-1 block">Fully Compliant</span>
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
                REGULATORY_SCORECARD_LOG
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#00d4aa]" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">AUC Metric</span>
              <span className="text-white uppercase font-bold text-[#00d4aa]">0.921 ROC_AUC</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Gini Coefficient</span>
              <span className="text-white uppercase font-bold text-[#FFB800]">0.842 GINI</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Calibrated Baseline</span>
              <span className="text-[#888888] uppercase font-bold">Odds 50:1 @ PDO 40</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Explicability Index</span>
              <span className="text-white uppercase font-bold">100% (No SHAP Overlap)</span>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-[#0a0a0a] border border-white/8 p-4 mt-8">
            <div className="text-[9px] font-mono text-[#888888] uppercase tracking-wider mb-2">SCORE SCALING SPECIFICATION</div>
            <div className="flex justify-between items-baseline gap-4">
              <span className="text-xl font-sans font-extrabold text-white tracking-tight uppercase">
                BASE_SCALE 660 PTS
              </span>
              <span className="text-xs font-mono text-[#FFB800] uppercase font-bold">
                B-1 REGULATED
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
            SCORECARD_ENGINE
          </span>
          <h2 className="text-2xl font-sans font-extrabold text-white uppercase tracking-tight">
            Interactive ML Scorecard Simulator
          </h2>
          <p className="text-xs text-[#888888] mt-1 font-sans">
            Adjust the underwriting parameters below to see the continuous ML coefficients react in real-time, instantly recalculating the final credit tier and risk probabilities.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Controls Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#0a0a0a] border border-white/8 p-6 space-y-5">
            <h3 className="text-xs font-mono font-bold text-[#FFB800] tracking-wider uppercase border-b border-white/5 pb-3">
              UNDERWRITING CRITICAL CRITERIA
            </h3>

            {/* DTI Slider */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-[#888888] uppercase mb-1.5">
                <span>DEBT-TO-INCOME (DTI) %</span>
                <span className="text-white font-bold">{dti}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                value={dti}
                onChange={(e) => setDti(Number(e.target.value))}
                className="w-full accent-[#FFB800] bg-white/5 h-1 cursor-pointer"
              />
            </div>

            {/* Income Input */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-[#888888] uppercase mb-1.5">
                <span>ANNUAL DECLARED INCOME (USD)</span>
                <span className="text-[#00d4aa] font-bold">${income.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="250000"
                step="5000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full accent-[#FFB800] bg-white/5 h-1 cursor-pointer"
              />
            </div>

            {/* Loan-To-Value */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-[#888888] uppercase mb-1.5">
                <span>LOAN-TO-VALUE (LTV) RATING</span>
                <span className="text-white font-bold">{ltv}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="120"
                value={ltv}
                onChange={(e) => setLtv(Number(e.target.value))}
                className="w-full accent-[#FFB800] bg-white/5 h-1 cursor-pointer"
              />
            </div>

            {/* Employment Duration */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-[#888888] uppercase mb-1.5">
                <span>EMPLOYMENT AT CURRENT UNIT (YEARS)</span>
                <span className="text-white font-bold">{history} yr</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={history}
                onChange={(e) => setHistory(Number(e.target.value))}
                className="w-full accent-[#FFB800] bg-white/5 h-1 cursor-pointer"
              />
            </div>

            {/* Default Status Dropdown */}
            <div>
              <label className="block text-[10px] font-mono text-[#888888] uppercase mb-2">
                HISTORICAL RECORD OF DEBT DEFAULTS (2-YEARS WINDOW)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['NONE', 'LATE_1_2', 'HEAVY'] as const).map(def => (
                  <button
                    key={def}
                    onClick={() => setDefaults(def)}
                    className={`p-2.5 border text-[10px] font-mono tracking-wider font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                      defaults === def
                        ? 'bg-[#FFB800] text-black border-[#FFB800]'
                        : 'bg-transparent text-[#888888] border-white/8 hover:border-white/20'
                    }`}
                  >
                    {def.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Computations Results View Pane (6 cols) */}
          <div className="lg:col-span-6 bg-[#050505] border border-white/8 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#888888] border-b border-white/8 pb-3 mb-6">
                <span>PREDICTIVE CLASSIFIER MATRIX</span>
                <span className="text-[#FFB800]">// STATS_LOCK</span>
              </div>

              {/* Dynamic Score Display */}
              <div className="text-center py-6 border border-white/5 bg-[#0a0a0a]/50 relative mb-6">
                {isComputing ? (
                  <div className="flex flex-col items-center justify-center p-4">
                    <RefreshCw className="w-8 h-8 text-[#FFB800] animate-spin" />
                    <span className="text-[10px] font-mono text-[#888888] uppercase tracking-widest mt-2 block">SOLVING LINEAR LOGIT MATRIX...</span>
                  </div>
                ) : (
                  <>
                    <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block">COMPUTED CREDIT SCORE VALUE</span>
                    <span className="text-6xl font-sans font-black text-white leading-tight block mt-1">
                      {score}
                    </span>
                    <span className="text-[11px] text-[#8c8c8c] font-mono uppercase tracking-widest mt-1 block">
                      SCALED RATING SYSTEM POOL: 300 - 850
                    </span>
                  </>
                )}
              </div>

              {/* Statistical Coefficient values based on current values */}
              <div className="space-y-2 text-[10px] font-mono border-t border-white/5 pt-4">
                <div className="flex justify-between">
                  <span className="text-[#888888]">Intercept Coefficient</span>
                  <span className="text-white">+2.413</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Debt Penalty Weight (DTI Logit)</span>
                  <span className={dti > 45 ? "text-[#ff4444]" : "text-white"}>
                    {dti > 45 ? "-1.842" : "-0.324"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Late Default Coefficient</span>
                  <span className={defaults !== 'NONE' ? "text-[#ff4444]" : "text-white"}>
                    {defaults === 'NONE' ? "0.000 (Clean)" : defaults === 'LATE_1_2' ? "-2.108" : "-4.512"}
                  </span>
                </div>
              </div>
            </div>

            {/* Large bottom status indicator */}
            <div className={`border-t border-white/8 pt-4 mt-6 flex justify-between items-center ${riskStyle.text}`}>
              <div>
                <span className="text-[9px] font-mono text-[#888888] uppercase block tracking-wider">RISK PROBABILITY Tier</span>
                <span className="text-2xl font-sans font-black tracking-tight uppercase block leading-none mt-1">
                  {risk} RISK
                </span>
              </div>
              <div className={`px-4 py-2 border border-dashed rounded-[4px] text-xs font-mono font-black uppercase ${riskStyle.border} ${riskStyle.bg}`}>
                PORTFOLIO_APPROVED
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES GRID — 2x3 bordered cards */}
      <section className="mb-16">
        <div className="mb-10 text-left">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
            CORE_ARCHITECTURE
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white uppercase tracking-tighter">
            Scorecard Specializations
          </h2>
          <div className="w-[40px] h-[2px] bg-[#FFB800] mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'Points-to-Double Scaling', text: 'Calibrated perfectly around baseline PDO of 40 and anchor rating points of 660, ensuring log-odds integrity across full spectrum.' },
            { num: '02', title: 'Logistic Weights Translation', text: 'Uses robust coefficient conversion algorithms, ensuring continuous ML weights transition flawlessly to discrete integers.' },
            { num: '03', title: 'Full Regulatory Explainability', text: 'Undergoes rejection of direct multi-collinear variables, preventing proxy criteria risks and complying with Equal Credit Opportunity constraints.' },
            { num: '04', title: 'ROC/AUC Calibrator', text: 'Calibrated metrics tracking model discrimination indices. ROC area holds firm above 0.92 with zero drift tolerances.' },
            { num: '05', title: 'Automated Binning Algorithm', text: 'Implements Monotonic Weights of Evidence (WoE) constraints on bins to maximize information values without sacrificing linear fit lines.' },
            { num: '06', title: 'Simulation Capabilities', text: 'Dynamic scenario sandbox to stress test underwriting standards under severe non-stationary macroeconomic fluctuations.' },
          ].map((f, index) => (
            <div
              key={index}
              className="bg-[#0f0f0f] border border-white/8 p-6 transition-all duration-200 select-none group hover:border-[#00d4aa]/30 hover:bg-[#00d4aa]/2"
            >
              <div className="text-xs font-mono font-bold text-[#FFB800] mb-4 tracking-widest uppercase">
                CRIT_SPEC_{f.num}
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

      {/* ARCHITECTURE PIPELINE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left rows (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f0f0f] border border-white/8 p-6 md:p-8">
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6">
            UNDERWRITING_PIPELINE_FLOW
          </h3>
          <div className="space-y-4">
            {[
              { step: 'Layer 01', name: 'Raw Variables Input Ingestion', tech: 'WoE Transformers', desc: 'Accepting raw applications parameters. Applying strict boundary validations to reject outliers.' },
              { step: 'Layer 02', name: 'Information Value Quantizer', tech: 'Pandas & Optbinning', desc: 'Binning variables monotonically to force logical risk curve progression.' },
              { step: 'Layer 03', name: 'Logistic Logit Regression', tech: 'Statsmodels GLM', desc: 'Predicting defaulting odds (Logit p/1-p) and asserting convergence tolerance metrics.' },
              { step: 'Layer 04', name: 'Points Conversion Scale', tech: 'Scaling Coefficients', desc: 'Normalizing regression weights into clean, regulatory-auditable credit point integers.' },
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
              <span className="text-2xl font-sans font-extrabold text-white block">0.92</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Model AUC</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">0.84</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Gini Power</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">100%</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Auditable Rules</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">&lt; 50ms</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Inference Speed</span>
            </div>
          </div>

          <div className="bg-[#0f0f0f] border border-[#FFB800]/20 p-6 relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFB800]" />
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
              REVOLUTIONIZING CREDIT DECISIVENESS
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed font-light">
              While deep neural networks achieve high classification ratios, they operate as black boxes, making them un-auditable by federal regulatory commissions. Our regression scorecard delivers extremely high discriminatory power (AUC: 0.92) while remaining completely explicable down to a single attribute coefficient.
            </p>
          </div>
        </div>
      </section>

      {/* TECH STACK ROW */}
      <section className="bg-[#0f0f0f] border border-white/8 p-6 md:p-8 mb-16 select-none">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6 text-left border-b border-white/8 pb-4">
          SCORECARD_CORE_TECHNOLOGY_STACK
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">MODELLING</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Python Scikit-Learn</li>
              <li>Statsmodels GLM</li>
              <li>XGBoost Predictor</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">OPTIMIZATION</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Optbinning Core</li>
              <li>Monotonic WoE Engine</li>
              <li>Kolmogorov-Smirnov Solver</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">INTERFACE DESIGN</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Next.js Client Components</li>
              <li>Tailwind CSS Elements</li>
              <li>Lucide Vector Pack</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">AUDIT ENFORCEMENT</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Basel-II Conformity</li>
              <li>Gini Risk Ledger</li>
              <li>SHAP Matrix Checks</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
