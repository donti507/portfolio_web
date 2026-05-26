import { PageType } from '../types';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const footerLinks: { label: string; id: PageType }[] = [
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
    <footer className="w-full bg-[#0a0a0a] border-t border-white/8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 md:px-12 max-w-[1200px] mx-auto items-start text-left select-none">
        
        {/* Left Column: Brand Logo + Metadata Block */}
        <div className="space-y-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-2xl font-sans font-extrabold text-[#FFB800] tracking-tighter uppercase cursor-pointer"
          >
            AAY
          </button>
          <div className="space-y-1 font-mono text-[9px] text-[#888888] uppercase tracking-widest leading-relaxed">
            <div>PRINCIPAL_ARCHITECT // ENVIRONMENT: HIGH_PERFORMANCE_STAGE_IV</div>
            <div>LOCATION: NODE.EUR_PL // STATUS: NOMINAL</div>
          </div>
        </div>

        {/* Center Column: Curated Nav links */}
        <div>
          <span className="block font-mono text-[9px] text-[#888888] tracking-[0.2em] uppercase mb-4 font-bold">
            CURATED_LINKS_ROUTE
          </span>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 max-w-[280px]">
            {footerLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className="text-left font-mono text-[10px] uppercase text-[#888888] hover:text-[#FFB800] transition-colors cursor-pointer tracking-wider block"
                id={`footer-nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Solid Copyright ledger */}
        <div className="md:text-right md:self-end">
          <div className="font-mono text-[10px] text-[#888888] uppercase tracking-wider">
            © 2025 MD ALI ASHRAF YAD // ALL_RIGHTS_RESERVED
          </div>
        </div>

      </div>
    </footer>
  );
}
