import { useState } from 'react';
import { Certification } from '../types';
import { Shield, Cpu, Landmark, Trophy, ExternalLink } from 'lucide-react';

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'enterprise' | 'network' | 'competitions'>('all');

  const categories = [
    { label: 'ALL', value: 'all' },
    { label: 'AI & MACHINE LEARNING', value: 'ai' },
    { label: 'IBM & ENTERPRISE', value: 'enterprise' },
    { label: 'INFRASTRUCTURE & NETWORKING', value: 'network' },
    { label: 'COMPETITIONS & LEADERSHIP', value: 'competitions' },
  ];

  const certifications: Certification[] = [
    // AI & Machine Learning
    {
      title: 'Supervised Machine Learning: Regression & Classification',
      issuer: 'Stanford / DeepLearning.AI',
      date: 'Apr 2023',
      category: 'ai',
    },
    {
      title: 'Data Science Math Skills',
      issuer: 'Duke University',
      date: 'Apr 2023',
      category: 'ai',
    },
    {
      title: 'Introduction to Generative AI',
      issuer: 'Santander Open Academy',
      date: 'Sep 2025',
      category: 'ai',
    },
    {
      title: 'Financial Markets',
      issuer: 'Yale University',
      date: 'May 2026',
      category: 'ai',
    },

    // IBM & Enterprise
    {
      title: 'IBM Z Xplore Advanced (COBOL, Z Assembler, VSAM, USS, Zowe CLI)',
      issuer: 'IBM Enterprise Solutions',
      date: 'Nov 2025',
      id: '81fa46e5',
      category: 'enterprise',
    },
    {
      title: 'IBM Z Xplore Concepts',
      issuer: 'IBM Mainframes',
      date: 'May 2025',
      category: 'enterprise',
    },
    {
      title: 'AI & Data Specialization',
      issuer: 'IBM',
      date: 'Dec 2025',
      category: 'enterprise',
    },

    // Networking & Infrastructure
    {
      title: 'CCNA: Switching, Routing & Wireless Essentials',
      issuer: 'Cisco Networking Academy',
      date: 'Feb 2026',
      id: '51c5ee1b',
      category: 'network',
    },
    {
      title: 'CCNA: Introduction to Networks',
      issuer: 'Cisco Systems',
      date: 'Feb 2026',
      id: '018db25d',
      category: 'network',
    },
    {
      title: 'Get Started with Pub/Sub Skill Badge',
      issuer: 'Google Cloud Platform',
      date: 'May 2026',
      category: 'network',
    },

    // Competitions & Leadership
    {
      title: 'CS50x Puzzle Day 2026',
      issuer: 'Harvard University',
      date: 'Apr 2026',
      category: 'competitions',
    },
    {
      title: 'Exercising Leadership: Foundational Principles',
      issuer: 'Harvard Aspire Institute',
      date: 'May 2023',
      category: 'competitions',
    },
  ];

  const filteredCerts = activeCategory === 'all'
    ? certifications
    : certifications.filter(cert => cert.category === activeCategory);

  return (
    <div className="pt-32 pb-24 px-4 md:px-12 max-w-[1200px] mx-auto animate-fadeIn">
      {/* Header Section */}
      <header className="mb-12 border-l-4 border-[#FFB800] pl-6">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
          VALIDATED EXPERTISE
        </span>
        <h1 className="text-4xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter leading-none">
          Certifications &amp; <br />
          <span className="text-[#FFB800]">Digital Badges</span>
        </h1>
        {/* UNDERLINE BAR AMBER */}
        <div className="w-[60px] h-[3px] bg-[#FFB800] mt-3" />
      </header>

      {/* Category Filter */}
      <div className="mb-12 flex flex-wrap gap-2 border-b border-white/8 pb-6">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value as any)}
            className={`px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase border transition-all cursor-pointer ${
              activeCategory === cat.value
                ? 'bg-[#FFB800] text-black border-[#FFB800]'
                : 'bg-[#0f0f0f] text-[#888888] border-white/8 hover:border-white hover:text-white_active'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Hero Highlight Box - Bento Style */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Google Top 50 Highlight Card */}
          <div className="lg:col-span-8 bg-[#0f0f0f] border border-white/8 p-8 relative overflow-hidden group hover:border-[#FFB800]">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#FFB800] z-10" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-6">
              <div>
                <span className="bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] font-mono font-bold text-[10px] tracking-widest px-3 py-1 inline-block uppercase">
                  PRESTIGIOUS RECOGNITION
                </span>
                <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white uppercase tracking-tighter mt-4 leading-tight">
                  Google Top 50 European Challenge 2026
                </h2>
              </div>
              <div className="flex-shrink-0">
                <img
                  alt="Google Cloud Challenge Badge"
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 grayscale-0 filter drop-shadow-[0_0_12px_rgba(255,184,0,0.25)] rounded-none"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm581qLeAoV8WBZu_1w3hX-6YpBTJj9TsPOu4sCUcFMTTQ9qptTC9832M3R7Jz8Oc1L_CuQW0q5esf_3kgeU-xkin2G8XlsRRWO0yqfaA_V6WopE6JbjZWOFQ3tOQ8iBYIl8kVtf2OvtpvjFI0ZWHCUZKv5kzjc-E_c_0Khit1QMPL2BmVroKSdw1CBBzUEwIcyGHcDrW2Z2KiqVptD8FYsFo92SxgxOHpkV9bTwYU4RBXdOvIgmqebi1GenpPW7xPR6Ipt6Ns5a4"
                />
              </div>
            </div>

            <p className="text-sm text-[#888888] leading-relaxed max-w-2xl mb-8 relative z-10 font-sans font-light">
              Ranked among the elite 50 students across Europe in the 22-nation Technical University Challenge. Validating advanced problem-solving, cloud architecture, and algorithmic efficiency at scale.
            </p>

            <div className="flex flex-wrap items-center gap-4 relative z-10">
              <button
                onClick={() => alert('Verifying verification identifier G-TOP50-2026... STATUS-VERIFIED.')}
                className="bg-[#FFB800] text-black px-6 py-3 font-sans font-bold text-[10px] tracking-widest uppercase hover:translate-x-1 transition-transform flex items-center gap-2 cursor-pointer"
              >
                VERIFY CREDENTIAL <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <span className="text-[#888888] font-mono text-[10px] uppercase font-bold tracking-wide">
                Issued: Jan 2026
              </span>
            </div>
          </div>

          {/* Quick Stats Grid Column */}
          <div className="lg:col-span-4 grid grid-rows-2 gap-6">
            <div className="bg-[#0f0f0f] border border-white/8 p-6 flex flex-col justify-center relative group hover:border-[#FFB800]">
              <h3 className="text-3xl font-sans font-extrabold text-[#FFB800] mb-1">15+</h3>
              <p className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-widest">
                verified digital badges
              </p>
            </div>
            <div className="bg-[#0f0f0f] border border-white/8 p-6 flex flex-col justify-center relative group hover:border-[#FFB800]">
              <h3 className="text-3xl font-sans font-extrabold text-[#FFB800] mb-1">5</h3>
              <p className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-widest">
                enterprise specializations
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Category Sections */}
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, index) => {
            return (
              <div
                key={index}
                className="bg-[#0f0f0f] border border-white/8 p-6 flex flex-col justify-between min-h-[190px] group hover:border-white/20 hover:border-l-4 hover:border-l-[#FFB800] transition-all select-none"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <span className="bg-[#111111] text-[#888888] border border-white/8 text-[8px] font-bold font-mono tracking-widest px-2.5 py-1 rounded-[4px]">
                      {cert.issuer.toUpperCase()}
                    </span>
                    <span className="text-[#FFB800]">
                      {cert.category === 'ai' ? (
                        <Cpu className="w-4 h-4" />
                      ) : cert.category === 'enterprise' ? (
                        <Landmark className="w-4 h-4" />
                      ) : cert.category === 'network' ? (
                        <Shield className="w-4 h-4" />
                      ) : (
                        <Trophy className="w-4 h-4" />
                      )}
                    </span>
                  </div>

                  <h4 className="text-sm font-sans font-bold text-white uppercase tracking-tight mb-2 group-hover:text-[#FFB800] transition-colors leading-snug">
                    {cert.title}
                  </h4>

                  {cert.id && (
                    <div className="text-[10px] font-mono font-bold text-[#FFB800] tracking-wider mb-2">
                      VERIFIER ID: {cert.id}
                    </div>
                  )}
                </div>

                <div className="border-t border-white/8 pt-3 mt-4 flex justify-between items-center text-[10px] font-sans font-medium text-[#888888]">
                  <span>DATE: {cert.date.toUpperCase()}</span>
                  <span className="text-[#FFB800] text-[8px] tracking-widest font-bold uppercase font-mono">
                    verified secure badge
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
