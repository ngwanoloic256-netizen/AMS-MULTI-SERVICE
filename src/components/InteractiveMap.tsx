/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { MapPin, Globe2, Sparkles, Navigation } from 'lucide-react';

interface InteractiveMapProps {
  selectedCountryId: string;
  onSelectCountry: (id: string) => void;
}

interface MapTarget {
  id: string;
  nameFR: string;
  nameEN: string;
  flag: string;
  x: number;
  y: number;
  regionFR: string;
  regionEN: string;
  speedFR: string;
  speedEN: string;
}

const MAP_TARGETS: MapTarget[] = [
  {
    id: 'canada',
    nameFR: 'Canada',
    nameEN: 'Canada',
    flag: '🇨🇦',
    x: 108,
    y: 85,
    regionFR: 'Amérique du Nord',
    regionEN: 'North America',
    speedFR: '8-12 semaines',
    speedEN: '8-12 weeks'
  },
  {
    id: 'france',
    nameFR: 'France',
    nameEN: 'France',
    flag: '🇫🇷',
    x: 236,
    y: 88,
    regionFR: 'Europe de l\'Ouest',
    regionEN: 'Western Europe',
    speedFR: '4-6 semaines',
    speedEN: '4-6 weeks'
  },
  {
    id: 'usa',
    nameFR: 'États-Unis',
    nameEN: 'United States',
    flag: '🇺🇸',
    x: 95,
    y: 102,
    regionFR: 'Amérique du Nord',
    regionEN: 'North America',
    speedFR: '4-8 semaines',
    speedEN: '4-8 weeks'
  },
  {
    id: 'uk',
    nameFR: 'Royaume-Uni',
    nameEN: 'United Kingdom',
    flag: '🇬🇧',
    x: 226,
    y: 78,
    regionFR: 'Europe de l\'Ouest',
    regionEN: 'Western Europe',
    speedFR: '3-6 semaines',
    speedEN: '3-6 weeks'
  },
  {
    id: 'germany',
    nameFR: 'Allemagne',
    nameEN: 'Germany',
    flag: '🇩🇪',
    x: 248,
    y: 82,
    regionFR: 'Europe Centrale',
    regionEN: 'Central Europe',
    speedFR: '6-10 semaines',
    speedEN: '6-10 weeks'
  },
  {
    id: 'uae',
    nameFR: 'Émirats Arabes Unis',
    nameEN: 'United Arab Emirates',
    flag: '🇦🇪',
    x: 308,
    y: 135,
    regionFR: 'Moyen-Orient',
    regionEN: 'Middle East',
    speedFR: '3-4 semaines',
    speedEN: '3-4 weeks'
  }
];

// Headquarters in Cameroon
const CAMEROON_HQ = {
  name: 'AXE-BRIGHT Yaoundé Jouvence',
  flag: '🇨🇲',
  x: 246,
  y: 182
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ selectedCountryId, onSelectCountry }) => {
  const { language } = useLanguage();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <div className="relative rounded-2xl border border-slate-200 dark:border-ams-gold/15 bg-slate-900 overflow-hidden shadow-2xl p-4 sm:p-6 mb-12 select-none">
      
      {/* Grid Pattern overlay for tech design */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none">
          <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
        </svg>
      </div>

      {/* Decorative luxury lights */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-ams-gold/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header and status overlay info inside the map block */}
      <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
        <div>
          <span className="font-sans text-[10px] sm:text-xs font-bold tracking-widest text-[#d4af37] uppercase block flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            {language === 'FR' ? 'RÉSEAU DE MOBILITÉ TRANSCONTINENTAL' : 'TRANSCONTINENTAL MOBILITY NETWORK'}
          </span>
          <h4 className="font-serif italic text-base sm:text-lg text-white mt-0.5">
            {language === 'FR' ? 'Carte des liaisons internationales' : 'Global Connection Blueprint'}
          </h4>
        </div>
        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
            <span>Yaoundé, Jouvence (Siège Admin 🇨🇲)</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10 hidden sm:block" />
          <span className="hidden sm:inline">{language === 'FR' ? 'Accompagnement d\'Élite' : 'Accredited Channels'}</span>
        </div>
      </div>

      {/* Actual SVG World Map Layout */}
      <div className="relative w-full overflow-x-auto py-2 flex justify-center">
        <div className="relative w-[500px] min-w-[500px] h-[250px] aspect-[2/1]">
          
          <svg
            viewBox="0 0 500 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            {/* World continents placeholder outline shapes represent geographical maps */}
            <g opacity="0.12" fill="#E2E8F0" className="dark:fill-slate-800">
              {/* North America */}
              <path d="M40,50 L140,40 L160,70 L140,110 L100,120 L50,110 L40,80 Z" />
              {/* South America */}
              <path d="M110,130 L150,140 L170,180 L140,230 L110,210 L100,160 Z" />
              {/* Greenland */}
              <path d="M140,20 L180,15 L190,35 L150,40 Z" />
              {/* Eurasia / Europe */}
              <path d="M190,50 L280,30 L380,40 L450,55 L430,120 L350,110 L270,110 L200,90 Z" />
              {/* Africa */}
              <path d="M210,120 L270,115 L295,135 L330,150 L310,210 L260,215 L220,170 Z" />
              {/* Australia */}
              <path d="M380,180 L440,170 L460,210 L410,225 Z" />
            </g>

            {/* Transcontinental Golden Connection Arcs (Curves from Yaoundé Cameroon to each destination) */}
            <g>
              {MAP_TARGETS.map((target) => {
                const isActive = selectedCountryId === target.id;
                const isHovered = hoveredCountry === target.id;
                
                // SVG arc path calculus linking Cameroon (246, 182) to Target
                const xMid = (CAMEROON_HQ.x + target.x) / 2;
                const yMid = (CAMEROON_HQ.y + target.y) / 2 - 40; // curve upwards

                return (
                  <g key={target.id}>
                    {/* Pulsing glow background path for highlighted arc */}
                    {(isActive || isHovered) && (
                      <path
                        d={`M ${CAMEROON_HQ.x} ${CAMEROON_HQ.y} Q ${xMid} ${yMid} ${target.x} ${target.y}`}
                        stroke="#d4af37"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        opacity="0.18"
                        fill="none"
                        className="animate-pulse"
                      />
                    )}

                    {/* Standard thin route path */}
                    <path
                      id={`route-${target.id}`}
                      d={`M ${CAMEROON_HQ.x} ${CAMEROON_HQ.y} Q ${xMid} ${yMid} ${target.x} ${target.y}`}
                      stroke={isActive ? '#d4af37' : isHovered ? '#f5e4a3' : 'rgba(212,175,55,0.22)'}
                      strokeWidth={isActive ? '1.8' : '1'}
                      strokeDasharray="4 3"
                      strokeLinecap="round"
                      fill="none"
                      className="transition-all duration-300"
                    />

                    {/* Animated white particle indicator following the arc direction */}
                    {isActive && (
                      <circle r="2.5" fill="#FFFFFF">
                        <animateMotion
                          dur="3s"
                          repeatCount="indefinite"
                          path={`M ${CAMEROON_HQ.x} ${CAMEROON_HQ.y} Q ${xMid} ${yMid} ${target.x} ${target.y}`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Cameroon HQ Marker pin (glowing star) */}
            <g transform={`translate(${CAMEROON_HQ.x}, ${CAMEROON_HQ.y})`}>
              {/* Outer pulsing wave */}
              <circle r="9" fill="#d4af37" opacity="0.25">
                <animate attributeName="r" values="3;12;3" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Core Star */}
              <circle r="4.5" fill="#d4af37" stroke="#ffffff" strokeWidth="1" />
            </g>

            {/* Destination Pins and labels */}
            {MAP_TARGETS.map((target) => {
              const isActive = selectedCountryId === target.id;
              const isHovered = hoveredCountry === target.id;

              return (
                <g 
                  key={target.id} 
                  transform={`translate(${target.x}, ${target.y})`}
                  className="cursor-pointer"
                  onClick={() => onSelectCountry(target.id)}
                  onMouseEnter={() => setHoveredCountry(target.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  {/* Glowing background anchor */}
                  {(isActive || isHovered) && (
                    <circle r="7.5" fill="#d4af37" opacity="0.3" className="animate-pulse" />
                  )}

                  {/* Core dot marker */}
                  <circle 
                    r={isActive ? '4.8' : '3.2'} 
                    fill={isActive ? '#ffffff' : '#d4af37'} 
                    stroke={isActive ? '#d4af37' : '#ffffff'} 
                    strokeWidth={isActive ? '1.8' : '0.8'}
                    className="transition-all duration-300"
                  />

                  {/* Tiny text flag tag adjacent to point */}
                  <text
                    y="-8"
                    textAnchor="middle"
                    fontSize="10"
                    className="select-none pointer-events-none drop-shadow-sm font-sans"
                  >
                    {target.flag}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Absolute floating panel tooltips for map details */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5 pointer-events-none bg-slate-950/85 border border-white/5 p-3 rounded-lg backdrop-blur-md max-w-[170px] z-20 text-white shadow-lg">
            <span className="text-[9px] uppercase tracking-wider text-amber-500 font-bold block">{language === 'FR' ? 'Destination focus' : 'Active destination'}</span>
            {(() => {
              const current = MAP_TARGETS.find(t => t.id === selectedCountryId) || MAP_TARGETS[0];
              return (
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold block leading-none">{current.flag}</span>
                    <span className="text-xs font-bold block truncate">{language === 'FR' ? current.nameFR : current.nameEN}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal block truncate">{language === 'FR' ? current.regionFR : current.regionEN}</span>
                  <div className="pt-1.5 border-t border-white/5 flex flex-col">
                    <span className="text-[8px] text-slate-400 block uppercase font-mono">{language === 'FR' ? 'Traitement' : 'Process Period'}</span>
                    <span className="text-[10px] text-amber-400 font-bold font-mono">{language === 'FR' ? current.speedFR : current.speedEN}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Secondary helper indicator */}
          <div className="absolute bottom-2 right-2 text-[9px] text-slate-500 font-mono tracking-wide pointer-events-none bg-slate-950/40 px-2 py-0.5 rounded">
            {language === 'FR' ? 'Sélectionner un repère pour voir les offres' : 'Select a node pin to refresh dossiers'}
          </div>

        </div>
      </div>

    </div>
  );
};
