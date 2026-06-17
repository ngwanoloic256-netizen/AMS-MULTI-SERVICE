/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useCurrency } from './CurrencyContext';
import { translations, getDestinationsData } from '../data';
import { DestinationItem } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { 
  Building, 
  Search, 
  MapPin, 
  Timer, 
  ThermometerSun, 
  ChevronRight, 
  BookOpen, 
  Briefcase, 
  CheckCircle,
  Globe2,
  Lock
} from 'lucide-react';

export const Destinations: React.FC = () => {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const t = translations[language];
  const destinations = getDestinationsData(language);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('canada');
  const [detailedTab, setDetailedTab] = useState<'education' | 'career' | 'visa'>('education');

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.popularCities.some(city => city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedDestination = destinations.find(d => d.id === selectedCountryId) || destinations[0];

  const handleScrollToBooking = () => {
    const element = document.querySelector('#contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="destinations" className="relative py-24 bg-white dark:bg-ams-blue-dark overflow-hidden">
      {/* Decorative World Grid Blueprint Backdrop */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ams-gold/10 border border-ams-gold/20 text-ams-gold text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Globe2 className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Mobilité Globale Prestige</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif italic text-3xl sm:text-5xl text-ams-blue dark:text-white tracking-tight leading-tight"
          >
            {t.destinations.sectionTitle}
          </motion.h2>
          <p className="font-sans font-light text-slate-400 mt-4 text-base sm:text-lg">
            {t.destinations.sectionSubtitle}
          </p>
        </div>

        {/* Global Connection world visual map */}
        <InteractiveMap selectedCountryId={selectedCountryId} onSelectCountry={(id) => setSelectedCountryId(id)} />

        {/* Dynamic Search & Filters layout */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              aria-label="Search destination"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ams-gold bg-slate-50/50 dark:bg-ams-blue-deep/60 transition-colors"
              placeholder={t.destinations.searchPlaceholder}
            />
          </div>
        </div>

        {/* Two Columns Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Vetted Interactive Country Selector Cards Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredDestinations.map((dest, idx) => {
              const isActive = dest.id === selectedCountryId;
              return (
                <motion.button
                  key={dest.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                  onClick={() => {
                    setSelectedCountryId(dest.id);
                  }}
                  className={`relative overflow-hidden text-left p-4 rounded-xl border transition-all duration-300 group cursor-pointer ${
                    isActive
                      ? 'border-ams-gold bg-ams-blue/5 dark:bg-ams-blue-dark/50'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-ams-blue-dark/20 hover:border-ams-gold/40'
                  }`}
                >
                  {/* Backdrop background thumbnail photo */}
                  <div 
                    className="absolute inset-x-0 top-0 h-2 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundImage: `url(${dest.bgImage})` }}
                  />

                  <div className="pt-3">
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xl leading-none" role="img" aria-label={dest.name}>
                        {dest.flag}
                      </span>
                      <h3 className="font-display font-semibold text-sm sm:text-base text-ams-blue dark:text-white tracking-wide truncate group-hover:text-ams-gold transition-colors">
                        {dest.name}
                      </h3>
                    </div>

                    <p className="font-sans font-light text-[11px] text-slate-400 mt-2 line-clamp-2">
                      {dest.description}
                    </p>

                    <div className="flex items-center gap-1 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-medium">
                      <Timer className="w-3 h-3 text-ams-gold" />
                      <span>{dest.processingTime}</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
            
            {filteredDestinations.length === 0 && (
              <div className="col-span-2 text-center py-10 text-slate-400 font-sans text-sm">
                Aucune destination trouvée • No destination found
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Selective Blueprint Dossier Hub (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDestination.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-slate-200 dark:border-ams-gold/15 bg-white dark:bg-ams-blue-dark/45 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden"
              >
                {/* Visual Cover Banner with Flag & Title overlay */}
                <div 
                  className="relative h-64 sm:h-72 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedDestination.bgImage})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ams-blue-dark via-ams-blue-dark/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-ams-gold text-ams-blue-deep text-xs font-bold uppercase tracking-wider mb-2 shadow">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Secteur Actif</span>
                      </div>
                      <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-wide flex items-center gap-2">
                        <span>{selectedDestination.name}</span>
                        <span>{selectedDestination.flag}</span>
                      </h3>
                    </div>
                    {/* Circle badge of the processing speed */}
                    <div className="bg-ams-blue-deep/80 border border-ams-gold/30 px-3 py-2 rounded-lg text-right hidden sm:block">
                      <span className="text-[9px] text-slate-300 block uppercase font-sans tracking-widest">{t.destinations.processingTime}</span>
                      <span className="text-xs text-ams-gold font-bold font-mono">{selectedDestination.processingTime}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Executive Brief */}
                  <p className="font-sans font-light text-slate-500 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedDestination.description}
                  </p>

                  {/* Tabs system inside the country card */}
                  <div className="border-b border-slate-200 dark:border-slate-800">
                    <div className="flex gap-4 sm:gap-6 overflow-x-auto">
                      <button
                        onClick={() => setDetailedTab('education')}
                        className={`pb-3 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                          detailedTab === 'education'
                            ? 'border-ams-gold text-ams-blue dark:text-white font-bold'
                            : 'border-transparent text-slate-400 hover:text-slate-500'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-ams-gold" />
                        <span>{t.destinations.academicTitle}</span>
                      </button>
                      <button
                        onClick={() => setDetailedTab('career')}
                        className={`pb-3 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                          detailedTab === 'career'
                            ? 'border-ams-gold text-ams-blue dark:text-white font-bold'
                            : 'border-transparent text-slate-400 hover:text-slate-500'
                        }`}
                      >
                        <Briefcase className="w-3.5 h-3.5 text-ams-gold" />
                        <span>{t.destinations.careerTitle}</span>
                      </button>
                      <button
                        onClick={() => setDetailedTab('visa')}
                        className={`pb-3 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                          detailedTab === 'visa'
                            ? 'border-ams-gold text-ams-blue dark:text-white font-bold'
                            : 'border-transparent text-slate-400 hover:text-slate-500'
                        }`}
                      >
                        <Lock className="w-3.5 h-3.5 text-ams-gold" />
                        <span>{t.destinations.visaTitle}</span>
                      </button>
                    </div>
                  </div>

                  {/* Tab Details Content */}
                  <div className="py-2 min-h-[100px]">
                    <p className="font-sans font-light text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                      {(() => {
                        const originalText = selectedDestination.details[detailedTab];
                        if (selectedDestination.id === 'france' && detailedTab === 'visa') {
                          return language === 'FR'
                            ? `Études via Campus France. Obligation d'un justificatif financier de ${formatPrice(615)} minimum par mois d'études.`
                            : `Studies validated via Campus France. Strict monthly financial guarantee of ${formatPrice(615)} minimum required.`;
                        }
                        if (selectedDestination.id === 'germany' && detailedTab === 'visa') {
                          return language === 'FR'
                            ? `Obligation de déposer une preuve financière sous forme de "Compte Bloqué" (Sperrkonto) d'environ ${formatPrice(11900)} requis.`
                            : `Visa requires a German Blocked Bank Account (Sperrkonto) loaded with approx. ${formatPrice(11900)} to cover living security.`;
                        }
                        return originalText;
                      })()}
                    </p>
                  </div>

                  {/* Metadata Indicators Checklist (Cities & Climate) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                    <div>
                      <span className="font-display font-medium text-[10px] text-slate-400 uppercase tracking-widest block">
                        {t.destinations.popularCities}
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedDestination.popularCities.map((city) => (
                          <span 
                            key={city} 
                            className="bg-slate-100 dark:bg-ams-blue-deep text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded text-xs border border-slate-200 dark:border-slate-800"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-display font-medium text-[10px] text-slate-400 uppercase tracking-widest block">
                        {t.destinations.climate}
                      </span>
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-300 font-sans font-light">
                        <ThermometerSun className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{selectedDestination.climate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Indicators stats inside right panel */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-850">
                    <span className="font-display font-semibold text-[11px] text-amber-600 dark:text-ams-gold uppercase tracking-widest block mb-4">
                      {t.destinations.keyStatsTitle}
                    </span>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedDestination.keyStats.map((stat, sIdx) => {
                        let val = stat.value;
                        if (selectedDestination.id === 'germany' && stat.label.toLowerCase().includes('frais')) {
                          val = formatPrice(0);
                        }
                        return (
                          <div key={sIdx} className="p-3 bg-slate-50 dark:bg-ams-blue-deep/40 rounded border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] text-slate-400 block truncate">{stat.label}</span>
                            <span className="font-display font-bold text-sm sm:text-base text-ams-blue dark:text-white mt-0.5 block">{val}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Booking Link */}
                  <div className="pt-6 text-right">
                    <button
                      onClick={handleScrollToBooking}
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded bg-ams-blue-dark dark:bg-ams-blue-deep border border-ams-gold/30 hover:border-ams-gold hover:bg-ams-gold hover:text-ams-blue-deep font-sans font-bold text-xs tracking-wider uppercase text-white transition-all duration-300 shadow"
                    >
                      <span>{t.destinations.applyButton}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
