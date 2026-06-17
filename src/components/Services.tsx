/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { translations, getServicesData } from '../data';
import { ServiceItem } from '../types';
import { 
  GraduationCap, 
  Briefcase, 
  FileCheck, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  CalendarClock,
  Sparkles
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-8 h-8 text-ams-gold" />,
  Briefcase: <Briefcase className="w-8 h-8 text-ams-gold" />,
  FileCheck: <FileCheck className="w-8 h-8 text-ams-gold" />,
  Compass: <Compass className="w-8 h-8 text-ams-gold" />,
};

export const Services: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const services = getServicesData(language);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'studies' | 'career' | 'visas' | 'integration'>('all');

  const filteredServices = services.filter(
    (s) => activeTab === 'all' || s.category === activeTab
  );

  const handleOpenDetailedModal = (service: ServiceItem) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden'; // Lock scrolling
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto'; // Unlock scrolling
  };

  const handleScrollToContact = () => {
    handleCloseModal();
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
    <section id="services" className="relative py-24 bg-ams-gray-light dark:bg-ams-blue-deep overflow-hidden">
      {/* Abstract light circles */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-ams-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-ams-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ams-gold/10 border border-ams-gold/20 text-ams-gold text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Excellence & Accompagnement</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif italic text-3xl sm:text-5xl text-ams-blue dark:text-white tracking-tight leading-tight"
          >
            {t.services.sectionTitle}
          </motion.h2>
          <p className="font-sans font-light text-slate-400 mt-4 text-base sm:text-lg">
            {t.services.sectionSubtitle}
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16">
          {(['all', 'studies', 'career', 'visas', 'integration'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-ams-gold to-ams-gold-dark text-ams-blue-deep shadow-md font-bold'
                  : 'bg-white hover:bg-slate-50 dark:bg-ams-blue-dark/50 dark:text-slate-300 dark:hover:bg-ams-blue-dark border border-slate-200 dark:border-slate-800'
              }`}
            >
              {t.services.categories[cat]}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                className="group relative overflow-hidden flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-white dark:bg-ams-blue-dark/60 border border-slate-200 dark:border-ams-gold/10 shadow-[0_4px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:border-ams-gold/30 hover:scale-[1.02] transition-all duration-300"
              >
                {/* Visual Glass Shimmer Hover Backgdrop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-ams-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Icon Card Shield */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-slate-100 dark:bg-ams-blue-dark border border-slate-200 dark:border-ams-gold/15 group-hover:border-ams-gold/40 transition-colors duration-300">
                      {ICON_MAP[service.iconName]}
                    </div>
                    {/* Tiny sequential order numeral */}
                    <span className="font-display font-bold text-slate-200 dark:text-slate-800 text-3xl select-none">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title and Short Description */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-ams-blue dark:text-white mb-4 tracking-wide group-hover:text-ams-gold transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="font-sans font-light text-slate-500 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* List bullets summary */}
                  <ul className="space-y-2 mb-8">
                    {service.subServices.slice(0, 3).map((item, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-ams-gold h-shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* More strategic button */}
                <button
                  onClick={() => handleOpenDetailedModal(service)}
                  className="inline-flex items-center gap-2 font-display font-bold text-xs sm:text-sm text-ams-gold hover:text-ams-gold-light tracking-wider uppercase transition-colors"
                >
                  <span>{t.services.learnMore}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Custom Quick Notice */}
        <div className="text-center mt-12 text-xs font-sans text-slate-400">
          {language === 'FR' 
            ? 'Toutes nos offres sont certifiées conformes aux processus administratifs de l\'OACI.' 
            : 'All administrative processing services are certified compliant with ICAO standard procedures.'}
        </div>
      </div>

      {/* Deluxe Modal Detail Window */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop filter blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-ams-blue-deep/80 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-ams-blue-dark border border-ams-gold/30 shadow-2xl p-6 sm:p-10 z-10 space-y-6"
            >
              {/* Close Button absolute */}
              <button
                onClick={handleCloseModal}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-ams-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Service header */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-slate-100 dark:bg-ams-blue-deep border border-slate-200 dark:border-ams-gold/15">
                  {ICON_MAP[selectedService.iconName]}
                </div>
                <div>
                  <span className="font-sans text-[10px] sm:text-xs font-bold tracking-widest text-ams-gold uppercase block">
                    AMS Sarl • {t.services.categories[selectedService.category]}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-ams-blue dark:text-white">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Extended narrative paragraph */}
              <p className="font-sans font-light text-slate-500 dark:text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
                {selectedService.longDescription}
              </p>

              {/* Core Breakdown layout Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Sub Services */}
                <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-ams-blue-deep/60 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-display font-medium text-amber-500 dark:text-ams-gold text-sm tracking-widest uppercase mb-4">
                    {t.services.includedTitle}
                  </h4>
                  <ul className="space-y-3">
                    {selectedService.subServices.map((sub, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-ams-gold mt-0.5 shrink-0" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits / Guarantees */}
                <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-ams-blue-deep/60 border border-slate-200 dark:border-slate-800 justify-between flex flex-col">
                  <div>
                    <h4 className="font-display font-medium text-amber-500 dark:text-ams-gold text-sm tracking-widest uppercase mb-4">
                      {t.services.benefitsTitle}
                    </h4>
                    <ul className="space-y-4">
                      {selectedService.benefits.map((ben, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-ams-gold" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Immediate Action inside Modal */}
                  <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={handleScrollToContact}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded bg-ams-gold hover:bg-ams-gold-light text-ams-blue-deep font-display font-bold tracking-wider uppercase text-xs transition-colors"
                    >
                      <CalendarClock className="w-4 h-4" />
                      <span>{t.nav.bookNow}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
