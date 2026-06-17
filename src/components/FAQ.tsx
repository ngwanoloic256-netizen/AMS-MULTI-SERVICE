/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { translations, getFAQData } from '../data';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const faqList = getFAQData(language);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-24 bg-ams-gray-light dark:bg-ams-blue-deep/50 overflow-hidden">
      {/* Absolute shapes decorations */}
      <div className="absolute right-0 top-1/2 w-64 h-64 bg-ams-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ams-gold/10 border border-ams-gold/20 text-ams-gold text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Foire Aux Questions</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif italic text-3xl sm:text-5xl text-ams-blue dark:text-white tracking-tight leading-tight"
          >
            {t.faq.sectionTitle}
          </motion.h2>
          <p className="font-sans font-light text-slate-400 mt-4 text-base">
            {t.faq.sectionSubtitle}
          </p>
        </div>

        {/* Accordions Deck list */}
        <div className="space-y-4">
          {faqList.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`rounded-xl border transition-all duration-300 ${
                  isExpanded
                    ? 'border-ams-gold bg-white dark:bg-ams-blue-dark/80 shadow-md ring-1 ring-ams-gold/15'
                    : 'border-slate-200 dark:border-slate-800/80 bg-white dark:bg-ams-blue-dark/25 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-display font-semibold text-sm sm:text-base text-ams-blue dark:text-white tracking-wide transition-colors hover:text-ams-gold cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-450 transition-transform duration-300 shrink-0 ml-4 ${
                    isExpanded ? 'rotate-180 text-ams-gold' : ''
                  }`} />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 font-sans font-light text-slate-500 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
