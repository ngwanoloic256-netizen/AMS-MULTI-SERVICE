/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { translations, getProcessStepsData } from '../data';
import { CalendarRange, Sparkles, Compass, Lightbulb, ClipboardCheck } from 'lucide-react';

const ICONS = [
  <CalendarRange className="w-6 h-6 text-ams-gold" />,
  <Lightbulb className="w-6 h-6 text-ams-gold" />,
  <ClipboardCheck className="w-6 h-6 text-ams-gold" />,
  <Compass className="w-6 h-6 text-ams-gold" />,
];

export const Timeline: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const steps = getProcessStepsData(language);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  return (
    <section id="process" className="relative py-24 bg-ams-gray-light dark:bg-ams-blue-deep/50 overflow-hidden">
      {/* Absolute linear lines backgrounds */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 dark:bg-slate-800/60 -translate-y-1/2 z-0 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ams-gold/10 border border-ams-gold/20 text-ams-gold text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Processus Certifié</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif italic text-3xl sm:text-5xl text-ams-blue dark:text-white tracking-tight leading-tight"
          >
            {t.process.sectionTitle}
          </motion.h2>
          <p className="font-sans font-light text-slate-400 mt-4 text-base sm:text-lg">
            {t.process.sectionSubtitle}
          </p>
        </div>

        {/* Horizontal step markers for Lg screens / Vertical adaptive for mob */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, idx) => {
            const isSelected = activeStepIdx === idx;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative flex flex-col p-6 rounded-2xl bg-white dark:bg-ams-blue-dark border transition-all duration-300 pointer group ${
                  isSelected
                    ? 'border-ams-gold ring-1 ring-ams-gold/30 shadow-[0_12px_30px_rgba(212,175,55,0.08)]'
                    : 'border-slate-200 dark:border-slate-800/80 hold hover:border-ams-gold/40 shadow-sm'
                }`}
                onClick={() => setActiveStepIdx(idx)}
              >
                {/* Numeric badge indicator */}
                <div className="absolute top-[24px] right-[24px] font-mono text-xs font-bold text-slate-300 dark:text-slate-700 tracking-wider">
                  STEP {step.step}
                </div>

                {/* Circular Icon bubble */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-6 transition-all duration-300 ${
                  isSelected
                    ? 'bg-ams-gold/20 border border-ams-gold scale-110'
                    : 'bg-slate-100 dark:bg-ams-blue-deep border border-slate-200 dark:border-slate-800'
                }`}>
                  {ICONS[idx]}
                </div>

                {/* Content info */}
                <h3 className={`font-display font-bold text-lg sm:text-xl tracking-wide mb-3 ${
                  isSelected ? 'text-ams-gold' : 'text-ams-blue dark:text-white'
                }`}>
                  {step.title}
                </h3>
                
                <p className="font-sans font-light text-slate-500 dark:text-slate-300 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Progress dot on bottom border for large screens */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 hidden lg:block">
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    isSelected ? 'bg-ams-gold border-white dark:border-ams-blue-deep' : 'bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-700'
                  }`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom micro notice */}
        <div className="text-center mt-16 font-sans text-xs text-slate-400">
          {language === 'FR' 
            ? '*Un contrat de mandat écrit de prestations de services est signé pour chaque dossier accepté.' 
            : '*A formal written service agreement contract is executed for each finalized administrative portfolio.'}
        </div>

      </div>
    </section>
  );
};
