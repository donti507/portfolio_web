import React, { useRef, useEffect, useState } from 'react';
import { PageType, ProgressCardItem } from '../types';
import { ArrowRight, Activity, Terminal, ExternalLink } from 'lucide-react';
import gsap from 'gsap';

interface HomeProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
  
  // Stats details
  const stats = [
    { label: 'Book Chapters', value: '2' },
    { label: 'Active Projects', value: '6' },
    { label: 'Research Papers', value: '3' },
    { label: 'UK Biobank Participants', value: '47K' },
  ];

  // Currently Working On cards
  const currentWorks: ProgressCardItem[] = [
    {
      name: 'Pan-Cancer T Cell Exhaustion Atlas',
      category: 'BIOINFORMATICS',
      progress: 65,
      status: 'Manuscript Stage',
    },
    {
      name: 'ALAN-NeuroNet',
      category: 'AI/ML',
      progress: 80,
      status: 'Active Development',
    },
    {
      name: 'Flood Risk Platform',
      category: 'ENVIRONMENTAL',
      progress: 75,
      status: 'Active Deployment',
    },
  ];

  // Bio Timeline entries (corrected chronological order showing the professional path)
  const timelineEvents = [
    {
      date: '2026 – Present',
      role: 'DeepBioLab Research Assistant',
      desc: 'Pan-cancer bulk RNA-seq meta-analysis across 20+ cancer types. ComBat-seq, ssGSEA, LASSO-Cox survival modeling. Co-author on manuscript under review.',
    },
    {
      date: 'Apr 2026 – Present',
      role: 'Technical Writer & Ground Support',
      org: 'PWr in Space',
      desc: 'Technical documentation and scientific articles for international academic rocketry team.',
    },
    {
      date: 'Jan 2026 – Present',
      role: 'ULisses Fellow',
      org: 'University of Lisbon',
      desc: 'Competitive international program: marine science, environmental sustainability, materials science, robotics.',
    },
    {
      date: 'Nov 2025 – Present',
      role: 'Founder',
      org: 'IBM Z Mainframe & Cloud Club — PWR',
      desc: 'Founded university\'s first IBM Z Club. Secured supercomputer access. Global collaborations: King\'s College London, Caltech, UC San Diego.',
    },
    {
      date: 'May 2025 – Present',
      role: 'IBM Z Campus Ambassador',
      desc: 'First student from Poland selected for IBM Z Global Ambassador Program. Guiding students through IBM Z Xplore enterprise systems.',
    },
    {
      date: 'Oct 2024 – Present',
      role: 'Scientific News Editor',
      org: 'Radio LUZ 91.6',
      desc: 'Research-based science broadcasting. Podcast on "Odra 5" — Eastern Europe\'s first quantum computer. Secured interview with LANL Staff Scientist.',
    },
    {
      date: 'Jan 2023 – May 2023',
      role: 'Harvard Aspire Leadership Program',
      desc: 'Leadership, communication, project management. Organised 13+ university sessions.',
    },
  ];

  // Hero section page load GSAP entrance animations
  useEffect(() => {
    // Photo container animates in from right
    gsap.from('.hero-photo-container', {
      opacity: 0,
      x: 40,
      duration: 1,
      delay: 0.4,
      ease: 'power2.out'
    });

    // Meta block fades up after photo
    gsap.from('.photo-meta', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.8,
      ease: 'power2.out'
    });

    // Amber border-frame draws in
    gsap.from('.hero-photo-border-frame', {
      opacity: 0,
      duration: 0.6,
      delay: 1.0
    });
  }, []);

  // Mouse move spotlight listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x: `${x}px`, y: `${y}px` });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Particle mesh background logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = Math.min(80, Math.floor((width * height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Simple grid lines at 0.5px thickness conforming to AAY
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render points and lines using `#FFB800`
      ctx.fillStyle = 'rgba(255, 184, 0, 0.45)';
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(255, 184, 0, ${0.1 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]" ref={containerRef}>
      {/* Parallax spotlight follow background */}
      <div 
        className="hero-glow-follow" 
        style={{
          '--mouse-x': mousePos.x,
          '--mouse-y': mousePos.y,
        } as React.CSSProperties}
      />

      {/* Dynamic Particle Mesh Hero Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-screen select-none">
        <canvas ref={canvasRef} className="w-full h-full opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col justify-center min-h-screen px-4 md:px-12 max-w-[1240px] mx-auto pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center hero-grid w-full">
          {/* Left Column (60%) */}
          <div className="lg:col-span-12 xl:col-span-7 lg:col-span-7 text-left w-full">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0f0f0f] border border-white/8 mb-6 rounded-[4px]">
              <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#FFB800] uppercase">
                ACTIVE RESEARCH PHASE
              </span>
            </div>

            <p className="text-[10px] font-mono tracking-[0.3em] font-bold text-[#FFB800] uppercase mb-1">
              PRINCIPAL_ARCHITECT
            </p>
            <h1 className="text-5xl md:text-8xl font-sans font-extrabold text-white tracking-tighter leading-none uppercase mb-6">
              MD Ali Ashraf Yad
            </h1>

            <p className="text-lg md:text-2xl text-[#cccccc] border-l-2 border-[#FFB800] pl-6 py-1 max-w-3xl mb-12 leading-relaxed font-sans font-light">
              "Building AI that is not just accurate — but explanation-backed and trustworthy."
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mb-20">
              <button
                onClick={() => setCurrentPage('projects')}
                className="btn-amber-filled text-[#0a0a0a] font-sans font-bold uppercase tracking-widest text-xs px-8 py-4 border border-[#FFB800] hover:translate-x-1.5 transition-transform duration-150 flex items-center gap-2 cursor-pointer"
                id="hero-explore-btn"
              >
                EXPLORE WORK <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="border border-white/25 bg-transparent text-white font-sans font-bold uppercase tracking-widest text-xs px-8 py-4 hover:bg-white hover:text-black transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
                id="hero-contact-btn"
              >
                CONTACT PORTAL
              </button>
            </div>

            {/* Stat Counters Dashboard */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#0f0f0f] border border-white/8 p-6 text-left relative group hover:border-[#FFB800] transition-colors duration-150"
                >
                  <div className="text-3xl lg:text-4xl font-sans font-extrabold text-[#FFB800] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-widest text-[#888888] uppercase">
                    {stat.label}
                  </div>
                  <div className="absolute right-3 top-3 opacity-20 group-hover:opacity-100 group-hover:text-[#FFB800] transition-opacity duration-150 text-[#888888]">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (40%) */}
          <div className="lg:col-span-12 xl:col-span-5 lg:col-span-5 w-full flex flex-col justify-center relative select-none mt-12 lg:mt-0">
            <div className="hero-photo-container">
              {/* Identity label */}
              <span className="identity-label">IDENTITY_VERIFIED</span>
              
              {/* Custom target border element for GSAP and CSS hover styling */}
              <div className="hero-photo-border-frame" />
              
              {/* Main Photo Wrapper with Scan line effect */}
              <div className="hero-photo-wrapper">
                <img
                  src="/portfolio_web/images/dante-hero.jpg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/portfolio_web/images/dante-hero.jpg";
                  }}
                  alt="MD Ali Ashraf Yad"
                  className="hero-photo"
                />
              </div>
            </div>

            {/* Bottom meta block */}
            <div className="photo-meta">
              {/* Status row */}
              <div className="photo-status">
                <span className="status-dot"></span>
                <span className="status-label">AVAILABLE FOR OPPORTUNITIES</span>
              </div>

              {/* Name + role details */}
              <div className="photo-identity">
                <p className="photo-name">MD ALI ASHRAF YAD</p>
                <p className="photo-role">BSc Applied CS · PWr · Year 2</p>
                <p className="photo-location">Wrocław, Poland</p>
              </div>
            </div>

            {/* Bottom classified label */}
            <p className="classified-label">IMG_CLASSIFIED // ACCESS_GRANTED</p>
          </div>
        </div>
      </section>

      {/* SECTION: "Currently Working On" */}
      <section className="relative z-10 py-24 bg-[#0f0f0f] border-y border-white/8 px-4 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 text-left">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
              ACTIVE_STREAMS
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white uppercase tracking-tighter">
              Currently Working On
            </h2>
            <div className="w-[60px] h-[3px] bg-[#FFB800] mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentWorks.map((work, idx) => (
              <div
                key={idx}
                className="bg-[#0a0a0a] border border-white/8 p-6 flex flex-col justify-between min-h-[230px] relative group hover:border-[#FFB800] transition-colors"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <span className="bg-white/5 text-[#888888] border border-white/8 text-[9px] font-mono tracking-widest px-2.5 py-1 font-bold rounded-[4px]">
                      {work.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full animate-pulse" />
                      <span className="text-[9px] font-mono font-bold text-[#FFB800] uppercase tracking-wider">
                        {work.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-sans font-bold text-white uppercase tracking-tight mb-6 leading-snug group-hover:text-[#FFB800] transition-colors duration-150">
                    {work.name}
                  </h3>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[9px] font-mono font-bold text-[#888888] mb-2 tracking-wider">
                    <span>PROGRESS STATE</span>
                    <span className="text-[#FFB800]">{work.progress}%</span>
                  </div>
                  {/* Linear progress bar in #FFB800 */}
                  <div className="w-full h-1 bg-white/5">
                    <div
                      className="h-full bg-[#FFB800] transition-all duration-500"
                      style={{ width: `${work.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT & BIOGRAPHY SECTION */}
      <section className="relative z-10 py-24 bg-[#0a0a0a] px-4 md:px-12" id="about">
        <div className="max-w-[1200px] mx-auto text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Bio Column */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
                  ACADEMIC_PROFILE
                </span>
                <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white uppercase tracking-tighter">
                  The Journey
                </h2>
                <div className="w-[60px] h-[3px] bg-[#FFB800] mt-3" />
              </div>
              
              <p className="text-sm text-[#cccccc] leading-relaxed font-light">
                I am a dedicated researcher specializing in <strong className="font-bold text-white">Computational Biology</strong>, <strong className="font-bold text-white">Multimodal Deep Learning</strong>, and <strong className="font-bold text-white">Trustworthy AI</strong>. Currently leveraging statistical modeling and high-performance computing to solve high-impact real-world problems.
              </p>
              
              <p className="text-xs text-[#888888] leading-relaxed font-light">
                My work spans massive medical bioinformatics datasets like the 47,000-participant UK Biobank, high-performance optimization at HPC scale, and multilingual NLP architectures to deliver verifiable clinical and smart system outcomes.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="border-l-2 border-[#FFB800] pl-4">
                  <span className="text-2xl font-sans font-extrabold text-white block">47K</span>
                  <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block font-bold">Biobank Cohort</span>
                </div>
                <div className="border-l-2 border-[#FFB800] pl-4">
                  <span className="text-2xl font-sans font-extrabold text-white block">20+</span>
                  <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block font-bold">Cancer Types</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Journey Timeline */}
            <div className="lg:col-span-8">
              <div className="border border-white/8 bg-[#0f0f0f] p-6 md:p-10">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#FFB800]" />
                  <span>INTERACTIVE_CHRONOLOGY</span>
                </h3>

                <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-1 before:top-1 before:bottom-1 before:w-[1px] before:border-l before:border-dashed before:border-white/10">
                  {timelineEvents.map((item, idx) => (
                    <div key={idx} className="relative group">
                      {/* Left dot index indicator matching the design rules */}
                      <span className="absolute -left-[24px] top-1.5 w-2 h-2 rounded-full bg-[#FFB800] group-hover:scale-125 transition-transform" />
                      
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] font-mono font-bold text-[#FFB800] mb-2 uppercase tracking-wide gap-1">
                        <span>{item.date}</span>
                        {item.org && <span className="text-[#888888]">// {item.org.toUpperCase()}</span>}
                      </div>

                      <h4 className="text-sm font-sans font-bold text-white uppercase tracking-tight group-hover:text-[#FFB800] transition-colors duration-150 mb-1.5">
                        {item.role}
                      </h4>

                      <p className="text-xs text-[#888888] leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK COLLABORATION/CONTACT SECTION */}
      <section className="relative z-10 py-24 bg-[#0f0f0f] border-t border-white/8 px-4 md:px-12">
        <div className="max-w-[1200px] mx-auto text-left md:text-center">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
            GET_IN_TOUCH
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-white uppercase tracking-tighter mb-4 leading-none">
            Initiate Contact
          </h2>
          <div className="w-[60px] h-[3px] bg-[#FFB800] md:mx-auto mt-3 mb-6" />
          <p className="text-sm text-[#888888] max-w-xl md:mx-auto mb-10 leading-relaxed font-light">
            Have questions about my active deep learning projects, computational biology collaborations, or club events? Route directly over our secure communication portal.
          </p>
          <div className="max-w-md md:mx-auto flex flex-col md:flex-row gap-2">
            <input
              type="email"
              placeholder="YOUR_EMAIL_ADDRESS"
              className="w-full bg-[#0a0a0a] border border-white/8 text-white p-4 text-xs font-mono placeholder-[#888888]/40 uppercase tracking-widest focus:outline-none focus:border-[#FFB800]"
              id="collab-email-input"
            />
            <button
              onClick={() => setCurrentPage('contact')}
              className="btn-amber-filled text-black font-sans font-bold uppercase tracking-widest text-xs py-4 px-8 border border-[#FFB800] hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              id="collab-submit-btn"
            >
              Connect
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
