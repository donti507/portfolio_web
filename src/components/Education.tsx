import { PageType } from '../types';
import { Calendar, School, MapPin } from 'lucide-react';

interface EducationProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Education({ setCurrentPage }: EducationProps) {
  return (
    <div className="pt-32 pb-24 px-4 md:px-12 max-w-[1200px] mx-auto">
      {/* Page Header */}
      <header className="mb-16">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
          ACADEMIC_TRAJECTORY
        </span>
        <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter mb-4 leading-none">
          Education
        </h1>
        {/* Amber underbar custom divider */}
        <div className="w-[60px] h-[3px] bg-[#FFB800] mt-3" />
        <p className="text-[11px] font-mono tracking-[0.2em] text-[#888888] uppercase mt-4">
          SYSTEM.EDU_STATE=ACTIVE // YEAR_02 // STATUS=ENROLLED
        </p>
      </header>

      {/* Primary Degree Hero Card */}
      <section className="mb-12 bg-[#0f0f0f] border border-white/8 border-l-4 border-l-[#FFB800] p-6 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/8 pb-4">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#888888]">
            UNDERGRADUATE_DEGREE
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800] animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#FFB800]">
              CURRENTLY ENROLLED
            </span>
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tighter uppercase mb-2">
          BSc in Applied Computer Science
        </h2>
        <h3 className="text-xl md:text-2xl font-sans font-extrabold text-[#FFB800] uppercase tracking-tight mb-8">
          WROCŁAW UNIVERSITY OF SCIENCE AND TECHNOLOGY
        </h3>

        {/* 4-col Stat Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6 border-y border-white/8 mb-10 text-left">
          <div className="border-r border-white/8 pr-4">
            <span className="text-[10px] font-mono font-bold text-[#888888] tracking-widest block mb-1">
              YEAR
            </span>
            <span className="text-lg font-sans font-bold text-white uppercase">2nd Year</span>
          </div>
          <div className="border-r border-white/8 pr-4">
            <span className="text-[10px] font-mono font-bold text-[#888888] tracking-widest block mb-1">
              FACULTY
            </span>
            <span className="text-lg font-sans font-bold text-white uppercase">W4N</span>
            <span className="text-[10px] text-[#888888] block tracking-tighter">Information &amp; Communication Technology</span>
          </div>
          <div className="border-r border-white/8 pr-4">
            <span className="text-[10px] font-mono font-bold text-[#888888] tracking-widest block mb-1">
              DEGREE TYPE
            </span>
            <span className="text-lg font-sans font-bold text-white uppercase">Bachelor of Science</span>
            <span className="text-[10px] text-[#888888] block tracking-tighter">3.5 years total</span>
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-[#888888] tracking-widest block mb-1">
              STATUS
            </span>
            <span className="inline-block bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-[4px]">
              ENROLLED
            </span>
          </div>
        </div>

        {/* Two-Column Details Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left - Programme Overview */}
          <div>
            <span className="text-[10px] font-mono text-[#FFB800] tracking-[0.2em] uppercase block mb-3 font-bold">
              PROGRAMME_OVERVIEW
            </span>
            <p className="text-sm text-[#cccccc] leading-relaxed mb-6 font-light">
              Applied Computer Science at W4N — algorithms, software engineering, data structures, machine learning, computer networks, systems programming. Conducted in English.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Algorithms', 'Data Structures', 'Machine Learning', 'Software Engineering', 'Computer Networks', 'Systems Programming'].map((tag) => (
                <span
                  key={tag}
                  className="bg-[#111111] border border-white/8 text-[#cccccc] text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-[4px]"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Academic Timeline */}
          <div>
            <span className="text-[10px] font-mono text-[#FFB800] tracking-[0.2em] uppercase block mb-4 font-bold">
              ACADEMIC_TIMELINE
            </span>
            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-1 before:top-1 before:bottom-1 before:w-[1px] before:border-l before:border-dashed before:border-[#FFB800]/40">
              
              {/* Year 1 */}
              <div className="relative">
                <span className="absolute -left-[24px] top-1.5 w-2 h-2 bg-[#FFB800] rotate-45" />
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="text-[10px] font-mono font-bold text-[#888888]">2024 – 2025</span>
                  <span className="bg-[#00d4aa]/10 border border-[#00d4aa]/25 text-[#00d4aa] text-[9px] font-mono font-bold px-2 py-0.5 rounded-[4px]">
                    COMPLETED
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase font-sans">Year 1 Academic Term</h4>
              </div>

              {/* Year 2 */}
              <div className="relative">
                <span className="absolute -left-[24px] top-1.5 w-2 h-2 bg-[#FFB800] rotate-45 animate-pulse" />
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="text-[10px] font-mono font-bold text-[#FFB800]">2025 – 2026</span>
                  <span className="bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] text-[9px] font-mono font-bold px-2 py-0.5 rounded-[4px] animate-pulse">
                    IN PROGRESS
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase font-sans">Year 2 Academic Term</h4>
              </div>

              {/* Year 3 */}
              <div className="relative">
                <span className="absolute -left-[24px] top-1.5 w-2 h-2 bg-[#111111] border border-white/20 rotate-45" />
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="text-[10px] font-mono font-bold text-[#888888]">2026 – 2027</span>
                  <span className="bg-[#111111] border border-white/8 text-[#888888] text-[9px] font-mono font-bold px-2 py-0.5 rounded-[4px]">
                    UPCOMING
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase font-sans">Year 3 Academic Term</h4>
              </div>

              {/* Year 3.5 / Graduation */}
              <div className="relative">
                <span className="absolute -left-[24px] top-1.5 w-2 h-2 bg-[#111111] border border-white/20 rotate-45" />
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="text-[10px] font-mono font-bold text-[#888888]">2027 – 2028 (March)</span>
                  <span className="bg-[#111111] border border-white/8 text-[#888888] text-[9px] font-mono font-bold px-2 py-0.5 rounded-[4px]">
                    GRADUATION
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase font-sans">Year 3.5 / Graduation Thesis</h4>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Institution Details Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1 */}
        <div className="bg-[#0f0f0f] border border-white/8 border-t-2 border-t-[#FFB800] p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <School className="w-5 h-5 text-[#FFB800]" />
              <span className="text-[10px] font-mono text-[#888888] tracking-widest">PWr UNIVERSITY</span>
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2 font-sans">
              Wrocław Tech
            </h3>
            <p className="text-xs text-[#888888] leading-relaxed font-sans mb-4">
              One of the largest and best technical universities in Poland, founded in 1945, hosting advanced research facilities.
            </p>
          </div>
          <div className="text-[9px] font-mono font-bold text-[#FFB800] tracking-widest uppercase border-t border-white/8 pt-3">
            EST. 1945 // WROCLAW, POLAND
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0f0f0f] border border-white/8 border-t-2 border-t-[#FFB800] p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono font-bold text-[#FFB800]">W4N</span>
              <span className="text-[10px] font-mono text-[#888888] tracking-widest">FACULTY</span>
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2 font-sans">
              Information &amp; Communication
            </h3>
            <p className="text-xs text-[#888888] leading-relaxed font-sans mb-4">
              Core division specializing in networks, diagnostics, statistical computation, and AI systems infrastructure.
            </p>
          </div>
          <div className="text-[9px] font-mono font-bold text-[#FFB800] tracking-widest uppercase border-t border-white/8 pt-3">
            FACULTY_CODE=W4N // ICT
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0f0f0f] border border-white/8 border-t-2 border-t-[#FFB800] p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <MapPin className="w-5 h-5 text-[#FFB800]" />
              <span className="text-[10px] font-mono text-[#888888] tracking-widest">LOCATION</span>
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2 font-sans">
              Wrocław Node
            </h3>
            <p className="text-xs text-[#888888] leading-relaxed font-sans mb-4">
              Silesian technological hub, rich in IT development ecosystem, modern laboratories, and collaborative science sectors.
            </p>
          </div>
          <div className="text-[9px] font-mono font-bold text-[#FFB800] tracking-widest uppercase border-t border-white/8 pt-3">
            LAT 51.1079° N // LON 17.0385° E
          </div>
        </div>
      </section>

      {/* Training Crosslink Row */}
      <section className="mb-12 bg-[#0f0f0f]/60 border border-[#FFB800]/20 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1 font-sans">
            Supplementary Programs &amp; Professional Guilds
          </h4>
          <p className="text-xs text-[#888888] font-sans">
            Review ULisses Fellow status, AI Adventure model evaluation, Harvard Aspire leadership logs, and Stanford CS106A cohorts.
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('experience')}
          className="border border-[#FFB800] hover:bg-[#FFB800]/10 text-[#FFB800] font-sans font-bold text-xs tracking-widest py-3 px-6 uppercase whitespace-nowrap active:scale-[0.98] transition-all cursor-pointer"
        >
          VIEW EXPERIENCE →
        </button>
      </section>

      {/* Bottom CTA Row */}
      <section className="border-l-4 border-l-[#FFB800] bg-[#0f0f0f] p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h4 className="text-base font-bold text-white uppercase tracking-wider mb-2 font-sans">
            Interested in Collaborative Research or Thesis Vetting?
          </h4>
          <p className="text-xs text-[#888888] font-sans max-w-xl">
            My logs and pipeline details are open for reviews. I am actively seeking research mentorship programs, technical internships, and distributed AI collaborations.
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <button
            onClick={() => setCurrentPage('contact')}
            className="btn-amber-filled hover:opacity-95 text-black font-sans font-bold text-xs tracking-widest py-4 px-8 uppercase active:scale-[0.98] transition-all cursor-pointer"
          >
            OPEN CONTACT PAGE
          </button>
          <span className="text-[9px] font-mono tracking-widest text-[#888888] uppercase select-none w-full text-center mt-1">
            RESPONSE_TIME=24–48HRS
          </span>
        </div>
      </section>
    </div>
  );
}
