import { useState } from 'react';
import { PhotographyItem } from '../types';
import { X, Camera, MapPin, Printer } from 'lucide-react';

export default function Photography() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotographyItem | null>(null);

  const categories = ['ALL', 'SCIENCE EVENTS', 'WROCLAW', 'NATURE', 'TRAVEL'];

  const photos = [
    { id: 1,  src: '/images/photography/photo-01.jpg', category: 'WROCLAW',        alt: 'Wroclaw Night' },
    { id: 2,  src: '/images/photography/photo-02.jpg', category: 'SCIENCE EVENTS', alt: 'Science Event 01' },
    { id: 3,  src: '/images/photography/photo-03.jpg', category: 'SCIENCE EVENTS', alt: 'Science Event 02' },
    { id: 4,  src: '/images/photography/photo-04.jpg', category: 'SCIENCE EVENTS', alt: 'Science Event 03' },
    { id: 5,  src: '/images/photography/photo-05.jpg', category: 'SCIENCE EVENTS', alt: 'Science Event 04' },
    { id: 6,  src: '/images/photography/photo-06.jpg', category: 'SCIENCE EVENTS', alt: 'Science Event 05' },
    { id: 7,  src: '/images/photography/photo-07.jpg', category: 'SCIENCE EVENTS', alt: 'Science Event 06' },
    { id: 8,  src: '/images/photography/photo-08.jpg', category: 'SCIENCE EVENTS', alt: 'Science Event 07' },
    { id: 9,  src: '/images/photography/photo-09.jpg', category: 'WROCLAW',        alt: 'Wroclaw 01' },
    { id: 10, src: '/images/photography/photo-10.jpg', category: 'WROCLAW',        alt: 'Wroclaw 02' },
    { id: 11, src: '/images/photography/photo-11.jpg', category: 'WROCLAW',        alt: 'Wroclaw 03' },
    { id: 12, src: '/images/photography/photo-12.jpg', category: 'WROCLAW',        alt: 'Wroclaw 04' },
    { id: 13, src: '/images/photography/photo-13.jpg', category: 'NATURE',         alt: 'Nature 01' },
    { id: 14, src: '/images/photography/photo-14.jpg', category: 'NATURE',         alt: 'Nature 02' },
    { id: 15, src: '/images/photography/photo-15.jpg', category: 'NATURE',         alt: 'Nature 03' },
    { id: 16, src: '/images/photography/photo-16.jpg', category: 'TRAVEL',         alt: 'Travel 01' },
    { id: 17, src: '/images/photography/photo-17.jpg', category: 'TRAVEL',         alt: 'Travel 02' },
    { id: 18, src: '/images/photography/photo-18.jpg', category: 'TRAVEL',         alt: 'Travel 03' },
  ];

  const photographyItems: PhotographyItem[] = photos.map(p => {
    let cleanCategory: 'Wroclaw' | 'Science Events' | 'Nature' | 'Travel' = 'Wroclaw';
    if (p.category === 'SCIENCE EVENTS') cleanCategory = 'Science Events';
    else if (p.category === 'NATURE') cleanCategory = 'Nature';
    else if (p.category === 'TRAVEL') cleanCategory = 'Travel';

    return {
      id: `photo-${p.id}`,
      title: p.alt,
      description: `A highly-resolved visual frame capturing ${p.alt.toLowerCase()} in high definition.`,
      category: cleanCategory,
      imageUrl: p.src,
      altText: p.alt
    };
  });

  const filteredPhotos = activeFilter === 'ALL'
    ? photographyItems
    : photographyItems.filter(p => p.category.toUpperCase() === activeFilter.toUpperCase());

  return (
    <div className="pt-32 pb-24 px-4 md:px-12 max-w-[1200px] mx-auto animate-fadeIn">
      {/* Header section matching exact copy requirements */}
      <header className="mb-12">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
          CURATED_COLLECTION
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-extrabold text-white uppercase tracking-tighter mb-4 leading-none">
          PHOTOGRAPHY // 18 CAPTURED FRAMES // ALL_RIGHTS_RESERVED
        </h1>
        {/* UNDERLINE BAR AMBER */}
        <div className="w-[60px] h-[3px] bg-[#FFB800] mt-3" />
        <p className="text-sm md:text-base text-[#888888] max-w-2xl font-sans font-light mt-4">
          Science, Cities &amp; Life Through My Lens. A visual exploration of structural symmetry, urban kinetic energy, and the microscopic patterns of discovery.
        </p>
      </header>

      {/* Filter Menu Tab Bar */}
      <div className="sticky top-20 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/8 py-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 text-[10px] font-mono font-bold tracking-widest uppercase border transition-all active:scale-95 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#FFB800] text-black border-[#FFB800]'
                  : 'bg-[#0f0f0f] text-[#888888] border-white/8 hover:border-white'
              }`}
              id={`photo-category-${cat.replace(' ', '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photography Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="break-inside-avoid bg-[#0f0f0f] border border-white/8 p-3 text-left group hover:border-white/20 transition-colors duration-200 cursor-zoom-in relative select-none"
          >
            {/* Left 4px accent bar for visual hierarchy matching overall experience */}
            <div className="absolute top-0 left-0 w-[4px] h-[30%] bg-[#FFB800] transition-all group-hover:h-full" />
            
            <div className="overflow-hidden relative bg-[#111111] mb-4">
              <img
                src={photo.imageUrl}
                alt={photo.altText}
                className="w-full h-auto grayscale filter group-hover:grayscale-0 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
                <span className="text-[9px] font-mono font-bold text-[#FFB800] tracking-widest uppercase mb-1">
                  {photo.category.toUpperCase()}
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                  {photo.title}
                </h3>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-[#888888] font-mono">
              <span className="font-bold tracking-wider">{photo.category.toUpperCase()}</span>
              <span className="text-[#FFB800] text-[9px] tracking-widest uppercase font-black">ZOOM_IN</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex justify-center items-center p-4 animate-fadeIn">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-[#888888] hover:text-white transition-colors cursor-pointer"
            id="lightbox-close-btn"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="bg-[#0f0f0f] border border-white/8 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* Image frame */}
            <div className="lg:col-span-8 bg-[#050505] p-4 flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.altText}
                className="max-h-[80vh] w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Side metadata panel */}
            <div className="lg:col-span-4 p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/8">
              <div>
                <span className="bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase inline-block mb-4">
                  {selectedPhoto.category.toUpperCase()}
                </span>
                <h2 className="text-2xl font-sans font-extrabold text-white uppercase tracking-tighter mb-4 leading-none">
                  {selectedPhoto.title}
                </h2>
                <div className="w-12 h-0.5 bg-[#FFB800] mb-6" />
                <p className="text-xs text-[#888888] leading-relaxed font-sans mb-8 font-light">
                  {selectedPhoto.description}
                </p>

                <div className="space-y-3 font-mono text-[10px] text-white/95 border-t border-white/8 pt-6">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#FFB800]" />
                    <span>EXIF DATA: ISO 100 | f/2.8 | 1/250s</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FFB800]" />
                    <span>LOCATION: {selectedPhoto.category === 'Wroclaw' ? 'WROCLAW, PL' : selectedPhoto.category === 'Travel' ? 'TOKYO, JP' : 'BIOSTAT_LAB'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`Custom order of "${selectedPhoto.title}" submitted successfully (Simulated).`)}
                className="btn-amber-filled text-black text-xs font-bold font-sans tracking-widest uppercase py-4 px-6 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-8 cursor-pointer"
              >
                REQUEST EXCLUSIVE PRINT <Printer className="w-4 h-4" />
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
