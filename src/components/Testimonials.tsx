/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { translations, getTestimonialsData } from '../data';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const testimonials = getTestimonialsData(language);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % testimonials.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[currentIdx];

  return (
    <section id="testimonials" className="relative py-24 bg-white dark:bg-ams-blue-dark overflow-hidden">
      {/* Absolute decorative glow circles */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-ams-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ams-gold/10 border border-ams-gold/20 text-ams-gold text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Success Stories</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif italic text-3xl sm:text-5xl text-ams-blue dark:text-white tracking-tight leading-tight"
          >
            {t.testimonials.sectionTitle}
          </motion.h2>
          <p className="font-sans font-light text-slate-400 mt-4 text-base sm:text-lg">
            {t.testimonials.sectionSubtitle}
          </p>
        </div>

        {/* Carousel slide and controls */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <div className="relative z-10 min-h-[300px] sm:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="rounded-2xl p-6 sm:p-12 border border-slate-200 dark:border-ams-gold/15 bg-white dark:bg-ams-blue-deep/60 shadow-[0_10px_35px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row gap-8 items-center"
              >
                {/* Quote decoration */}
                <Quote className="absolute top-[24px] right-[24px] w-16 h-16 text-slate-100 dark:text-slate-800/80 -z-10 rotate-180 pointer-events-none" />

                {/* Avatar layout */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full border-2 border-ams-gold scale-105 animate-pulse" />
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    referrerPolicy="no-referrer"
                    className="w-20 col sm:w-24 h-20 sm:h-24 rounded-full object-cover shadow"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-ams-blue-dark rounded-full p-1 border border-slate-100 dark:border-slate-800 shadow-md">
                    <span className="text-lg leading-none" role="img" aria-label="country-flag">
                      {activeTestimonial.flag}
                    </span>
                  </div>
                </div>

                {/* Text testimonials core */}
                <div className="flex-grow space-y-4 text-center sm:text-left">
                  {/* Rating Stars */}
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    {[...Array(activeTestimonial.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-ams-gold text-ams-gold" />
                    ))}
                  </div>

                  {/* Testimonial Quote quote text */}
                  <p className="font-sans font-light text-slate-600 dark:text-slate-200 text-sm sm:text-base leading-relaxed italic">
                    "{activeTestimonial.text}"
                  </p>

                  {/* Name and Designation */}
                  <div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-ams-blue dark:text-white tracking-wide">
                      {activeTestimonial.name}
                    </h4>
                    <span className="font-sans font-medium text-xs text-amber-500 dark:text-ams-gold tracking-widest uppercase">
                      {activeTestimonial.role} — {activeTestimonial.destination}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Control Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-ams-blue-dark text-slate-500 dark:text-slate-300 hover:border-ams-gold dark:hover:border-ams-gold hover:text-ams-gold transition-colors block cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination indicators dots */}
            <div className="flex items-center gap-1.5 mx-2">
              {testimonials.map((test, idx) => (
                <button
                  key={test.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIdx ? 'w-6 bg-ams-gold' : 'w-2 bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-ams-blue-dark text-slate-500 dark:text-slate-300 hover:border-ams-gold dark:hover:border-ams-gold hover:text-ams-gold transition-colors block cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
