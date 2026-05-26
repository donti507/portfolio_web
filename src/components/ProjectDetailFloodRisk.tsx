import React, { useEffect } from 'react';
import { PageType } from '../types';
import { navigateBackToProjects, initPageTransition } from '../utils/transition';
import { ExternalLink, ArrowLeft, Terminal, Compass, CloudRain, ShieldCheck, MapPin } from 'lucide-react';

interface ProjectDetailProps {
  setCurrentPage: (page: PageType) => void;
}

export default function ProjectDetailFloodRisk({ setCurrentPage }: ProjectDetailProps) {
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
        <span className="text-white">REMOTE_SENSING_FLOOD</span>
      </div>

      {/* HERO SECTION — 7/5 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              ACTIVE · 2026
            </span>
            <span className="bg-white/5 border border-white/10 text-[#888888] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded-[4px]">
              ENVIRONMENTAL GEOSPATIAL GIS
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter leading-none">
            Flood Risk GIS
          </h1>

          <div className="border-l-2 border-[#FFB800] pl-6 py-1">
            <p className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider">
              Per-Pixel Spatial Analytics // Copernicus DEM + HYDRO IMGW // Siechnice Municipality Web
            </p>
          </div>

          <p className="text-sm text-[#cccccc] leading-relaxed font-light">
            An advanced per-pixel environmental forecasting system that fuses Copernicus Digital Elevation Models (DEM) with real-time IMGW hydraulic gauge trackers and historical GFS climate reports. It provides real-time flood inundation models directly accessible via web interfaces.
          </p>

          <p className="text-xs text-[#888888] leading-relaxed font-light">
            Calibrated against raw datasets retrieved during the severe September 2024 Central European flash floods. Built using FastAPI and OpenLayers to deliver crisp, hardware-accelerated mapping vectors to emergency responders in Siechnice Municipality.
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
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">Municipal Web GIS</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">TECHNOLOGY STACK</span>
              <span className="text-base font-sans font-bold text-white uppercase mt-1 block">Copernicus GEE, PyGIS</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#888888] block uppercase tracking-wider">OPERATION STATUS</span>
              <span className="text-base font-sans font-bold text-[#FFB800] uppercase mt-1 block">Active Deploy</span>
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
                FLOOD_SENSING_ENGINE
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#00d4aa]" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">DEM Grid Resolution</span>
              <span className="text-white uppercase font-bold">Copernicus 30m Frame</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Gauge Sync Intervals</span>
              <span className="text-white uppercase font-bold text-[#00d4aa]">IMGW Real-Time API</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Spatial Coverage Boundaries</span>
              <span className="text-[#FFB800] uppercase font-bold">Siechnice Municipality</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#888888]">Calibration baseline</span>
              <span className="text-white uppercase font-bold">Sept 2024 Flood Matrix</span>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-[#0a0a0a] border border-white/8 p-4 mt-8">
            <div className="text-[9px] font-mono text-[#888888] uppercase tracking-wider mb-2">FLOW HYDRAULIC ACCURACY STATUS</div>
            <div className="flex justify-between items-baseline gap-4">
              <span className="text-lg font-sans font-extrabold text-white tracking-tight uppercase">
                Pixel Convergence
              </span>
              <span className="text-xs font-mono text-[#FFB800] uppercase font-bold">
                GRID_RESOLVED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES GRID — 2x3 bordered cards */}
      <section className="mb-16">
        <div className="mb-10 text-left">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
            SPATIAL_INTEGRATIONS_MATRIX
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white uppercase tracking-tighter">
            System Workspace Features
          </h2>
          <div className="w-[40px] h-[2px] bg-[#FFB800] mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'Per-Pixel GIS Analytics', text: 'Applies discrete numerical water flow equations over dynamic terrain height grids, mapping risk levels to individual 30m coordinates.' },
            { num: '02', title: 'Copernicus DEM Fusion', text: 'Merges high-fidelity digital elevation arrays with hydrographic slope vectors, predicting collection basins cleanly.' },
            { num: '03', title: 'HYDRO IMGW Gauge Sync', text: 'Pipes live river height measurements direct from nearby weather stations to update flood boundaries recursively.' },
            { num: '04', title: 'Meteorological ICON Forecasts', text: 'Runs multi-day atmospheric models to anticipate rainfall densities, computing water volume accumulations.' },
            { num: '05', title: 'OpenLayers Client Interface', text: 'Hardware-accelerated web view presenting high-contrast canvas overlays directly to civil coordinators.' },
            { num: '06', title: 'Sept 2024 Flood Calibration', text: 'Audits predictive flow outlines against historical radar images, minimizing false alarms and warning errors.' },
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
            GEOSPATIAL_PIPELINE_FLOW
          </h3>
          <div className="space-y-4">
            {[
              { step: 'Layer 01', name: 'Raw Raster Ingestion Engine', tech: 'Google Earth Engine API', desc: 'Queries satellite images and digital elevation layers. Resolves tile alignment grids.' },
              { step: 'Layer 02', name: 'Hydraulic Inundation Model', tech: 'PyGIS Computes', desc: 'Processes water flow progressions across varying slope configurations and gauges.' },
              { step: 'Layer 03', name: 'Web Vector Compiler', tech: 'FastAPI GeoJSON', desc: 'Transforms large-scale spatial metrics into lightweight, compressible GeoJSON boundaries.' },
              { step: 'Layer 04', name: 'Geospatial Canvas Renderer', tech: 'OpenLayers Frontend', desc: 'Maps flood risk levels perfectly over customizable topographic satellite base layers.' },
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
              <span className="text-2xl font-sans font-extrabold text-white block">30 Meters</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">DEM Grid Resol.</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">15 min</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Gauge Sync Rates</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-[#00d4aa] block">&lt; 10s</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Render Delay</span>
            </div>
            <div className="border-l-2 border-[#FFB800] pl-4 py-1">
              <span className="text-2xl font-sans font-extrabold text-white block">100%</span>
              <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider block mt-1 font-bold">Open Access</span>
            </div>
          </div>

          <div className="bg-[#0f0f0f] border border-[#FFB800]/20 p-6 relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFB800]" />
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
              MUNICIPAL APPLICATION METRICS
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed font-light">
              Emergency responders frequently suffer from delayed spatial descriptions in critical moments. By establishing lightning-fast FastAPI serialization layers, our system pushes geographic vector updates below 10 seconds, accelerating evacuation responses in low-lying residential sectors.
            </p>
          </div>
        </div>
      </section>

      {/* TECH STACK ROW */}
      <section className="bg-[#0f0f0f] border border-white/8 p-6 md:p-8 mb-16 select-none">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6 text-left border-b border-white/8 pb-4">
          GEOSPATIAL_HARDWARE_DESTRUCTIVE_INTEGRATION_STACK
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">GIS CORE / SOURCES</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>Copernicus Sentinel-2</li>
              <li>Google Earth Engine</li>
              <li>NASA DEM Grid 30m</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">SERVER MICROSERVICE</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>FastAPI Python Core</li>
              <li>GeoPandas Calculations</li>
              <li>HYDRO IMGW API</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">INTERACTIVE WEB</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>OpenLayers Vectors</li>
              <li>Tailwind Map Layers</li>
              <li>HTML5 Canvas GIS</li>
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#888888] uppercase tracking-widest block font-bold mb-2">DB / GEO SPATIAL</span>
            <ul className="space-y-1 text-xs text-white font-mono font-medium">
              <li>GeoPackage Formats</li>
              <li>PostGIS Postgres Link</li>
              <li>JSON Geo Layers</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
