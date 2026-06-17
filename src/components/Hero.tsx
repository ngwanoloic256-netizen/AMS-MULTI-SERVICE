/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { translations } from '../data';
import { ChevronRight, Sparkles, Navigation, Send, HelpCircle } from 'lucide-react';
import { InteractiveOfferings } from './InteractiveOfferings';

const BACKGROUND_SLIDES = [
  // Skyline of modern international city
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
  // Students at global campus library
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2000',
  // Travel visual: wings over clouds / modern airport terminal
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000'
];

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BACKGROUND_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToSection = (href: string) => {
    const element = document.querySelector(href);
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ams-blue-deep">
      {/* Background Slides with AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${BACKGROUND_SLIDES[currentSlide]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
        {/* Luxury Vignette and gradient overlays */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-ams-blue-dark/60 to-ams-blue-deep/95 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-ams-blue-deep/50 via-ams-blue-dark/80 to-ams-blue-deep z-10" />
      </div>

      {/* Hero content container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16 min-h-screen flex flex-col justify-center items-center">
        {/* Certification / Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-ams-gold/20 mb-8 sm:mb-10 shadow-[0_4px_15px_rgba(7,23,57,0.3)]"
        >
          <Sparkles className="w-4 h-4 text-ams-gold animate-pulse" />
          <span className="font-sans font-medium text-xs sm:text-xs tracking-wider uppercase text-ams-gold-light">
            {t.hero.trustPilot}
          </span>
        </motion.div>

        {/* Corporate High-End Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4 max-w-5xl"
        >
          <h1 className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-tight">
            <span className="font-serif italic font-normal gold-text-gradient block mb-1">
              AXE-BRIGHT HOLDING SARL
            </span>
            <span className="block text-2xl sm:text-4xl lg:text-5xl font-light text-slate-100 tracking-normal mt-2">
              {t.hero.title}{' '}
              <span className="font-semibold text-white relative">
                {t.hero.highlight}
                <span className="absolute left-0 bottom-1 w-full h-[3px] bg-ams-gold/60 rounded-full" />
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Dynamic & Interactive offerings panel right after the brand title */}
        <InteractiveOfferings />

        {/* Bespoke subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans font-light text-slate-300 antialiased text-base sm:text-xl max-w-3xl leading-relaxed mt-8 text-shadow-sm"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Interactive buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 w-full sm:w-auto"
        >
          {/* Primary Action */}
          <button
            onClick={() => handleScrollToSection('#contact')}
            className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded font-display font-bold tracking-wider uppercase text-xs sm:text-sm bg-gradient-to-r from-ams-gold via-ams-gold-light to-ams-gold text-ams-blue-deep shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t.hero.ctaPrimary}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </button>

          {/* Secondary Action */}
          <button
            onClick={() => handleScrollToSection('#services')}
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded font-display font-medium tracking-wider uppercase text-xs sm:text-sm text-white glass-panel border border-white/20 hover:border-ams-gold transition-all duration-300 hover:bg-white/5"
          >
            <span className="flex items-center gap-2">
              {t.hero.ctaSecondary}
              <Navigation className="w-3.5 h-3.5 text-ams-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </span>
          </button>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 hidden sm:flex"
          onClick={() => handleScrollToSection('#services')}
        >
          <span className="font-sans text-[10px] tracking-widest text-slate-400 uppercase">
            {language === 'FR' ? 'Faites défiler' : 'Scroll down'}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1.5 h-6 rounded-full bg-ams-gold/80"
          />
        </motion.div>
      </div>
    </section>
  );
};
