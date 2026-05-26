import { PageType } from '../types';
import { Shield } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const navItems: { label: string; id: PageType }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Research', id: 'research' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Experience', id: 'experience' },
    { label: 'Photography', id: 'photography' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/6 h-20">
      <div className="flex justify-between items-center w-full px-4 md:px-12 max-w-[1200px] mx-auto h-full">
        {/* Left: Brand Logo in Barlow Condensed */}
        <button 
          onClick={() => setCurrentPage('home')}
          className="text-2xl font-sans font-extrabold text-[#FFB800] tracking-tighter hover:opacity-90 transition-opacity cursor-pointer uppercase"
          id="nav-logo"
        >
          AAY
        </button>
        
        {/* Center: Desktop links in IBM Plex Mono */}
        <div className="hidden lg:flex items-center gap-6 h-full font-mono">
          {navItems.map((item) => {
            const isActive = currentPage === item.id || (item.id === 'projects' && currentPage.startsWith('project-'));
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`h-full flex items-center px-1 border-b-2 text-[11px] uppercase tracking-widest transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'text-[#FFB800] border-[#FFB800] font-bold'
                    : 'text-[#888888] border-transparent hover:text-white hover:border-[#888888]'
                }`}
                id={`nav-item-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile menu select dropdown styled clean */}
        <div className="flex lg:hidden items-center">
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value as PageType)}
            className="bg-[#0f0f0f] text-[#FFB800] border border-white/8 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest focus:outline-none focus:border-[#FFB800] cursor-pointer"
            id="mobile-nav-select"
          >
            {navItems.map((item) => (
              <option key={item.id} value={item.id} className="bg-[#0a0a0a]">
                {item.label.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Security Badge Indicator */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-[#FFB800]/60 border border-[#FFB800]/20 px-2.5 py-1 select-none">
          <Shield className="w-3.5 h-3.5" />
          <span className="text-[9px] font-bold tracking-widest uppercase">
            SIGNAL VERIFIED
          </span>
        </div>
      </div>
    </nav>
  );
}
