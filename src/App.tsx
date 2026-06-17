/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { Destinations } from './components/Destinations';
import { Timeline } from './components/Timeline';
import { Testimonials } from './components/Testimonials';
import { OfficeGallery } from './components/OfficeGallery';
import { FAQ } from './components/FAQ';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { ScrollReveal } from './components/ScrollReveal';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { CurrencyProvider } from './components/CurrencyContext';
import { OrientationTest } from './components/OrientationTest';
import { ClientDashboard } from './components/ClientDashboard';
import { AIAssistant } from './components/AIAssistant';
import { AMSAcademy } from './components/AMSAcademy';
import { OpportunitiesFeed } from './components/OpportunitiesFeed';
import { ArrowUp, PhoneCall, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function MainApp() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [welcomeToast, setWelcomeToast] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Check live agent status based on operating hours (8 AM to 6 PM local time)
  useEffect(() => {
    const checkStatus = () => {
      const hour = new Date().getHours();
      setIsOnline(hour >= 8 && hour < 18);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Scroll tracking for progress ring & back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Total scrollable height
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show a welcome corporate advisory toast on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeToast(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`min-h-screen font-sans ${
      theme === 'dark' 
        ? 'bg-ams-blue-deep text-slate-100 dark' 
        : 'bg-slate-50 text-slate-800'
    } transition-colors duration-300 selection:bg-ams-gold selection:text-ams-blue-deep`}>
      
      {/* Fixed Sticky Header */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        
        <ScrollReveal>
          <Stats />
        </ScrollReveal>

        <ScrollReveal>
          <Services />
        </ScrollReveal>

        <ScrollReveal>
          <Destinations />
        </ScrollReveal>

        <ScrollReveal>
          <OrientationTest />
        </ScrollReveal>

        <ScrollReveal>
          <OpportunitiesFeed />
        </ScrollReveal>

        <ScrollReveal>
          <Timeline />
        </ScrollReveal>

        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>

        <ScrollReveal>
          <AMSAcademy />
        </ScrollReveal>

        <ScrollReveal>
          <OfficeGallery />
        </ScrollReveal>

        <ScrollReveal>
          <FAQ />
        </ScrollReveal>

        <ScrollReveal>
          <ClientDashboard />
        </ScrollReveal>

        <ScrollReveal>
          <BookingForm />
        </ScrollReveal>
      </main>

      {/* Footer Solutions */}
      <Footer />

      {/* Floating Buttons layout & micro-interactions */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Progressive Back to Top Ring */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleScrollToTop}
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-ams-blue-dark border border-slate-200 dark:border-ams-gold/25 shadow-lg group focus:outline-none cursor-pointer"
              aria-label="Scroll back to top"
            >
              {/* SVG circular track progress */}
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="transparent"
                  className="text-slate-100 dark:text-slate-800/80"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="url(#blueWhiteGradient)"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
                  className="transition-all duration-100"
                />
                <defs>
                  <linearGradient id="blueWhiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bfdbfe" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>

              <ArrowUp className="w-4 h-4 text-slate-700 dark:text-ams-gold group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Dynamic Consultation Call widget with Live Agent Status */}
        <div id="whatsapp-floating-widget" className="relative group flex items-center">
          {/* Status Label Tooltip that slides/fades out beautifully */}
          <div 
            id="whatsapp-status-tooltip"
            className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-xl border border-slate-700/50 dark:border-slate-700/80 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0 pointer-events-none whitespace-nowrap z-50 flex items-center gap-2"
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="font-sans">
              {language === 'FR' 
                ? (isOnline ? 'Support en ligne (WhatsApp)' : 'Agent absent (WhatsApp)')
                : (isOnline ? 'Support Online (WhatsApp)' : 'Agent Away (WhatsApp)')}
            </span>
          </div>

          <a
            id="whatsapp-action-btn"
            href="https://wa.me/237693109773"
            target="_blank"
            rel="noreferrer"
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Direct support calling line"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" style={{ animationDuration: '3s' }} />
            
            {/* Live Indicator Dot Wrapper */}
            <span id="live-status-dot-wrapper" className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
              {isOnline ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-[2.5px] border-white dark:border-slate-900 shadow-sm"></span>
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-[2.5px] border-white dark:border-slate-900 shadow-sm"></span>
              )}
            </span>
          </a>
        </div>
      </div>

      {/* Welcome Corporate Advisory Toast */}
      <AnimatePresence>
        {welcomeToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.5 }}
            className="fixed bottom-6 left-6 z-50 max-w-sm rounded-xl p-5 border border-slate-200 dark:border-ams-gold/25 bg-white dark:bg-ams-blue-dark/95 backdrop-blur-md shadow-2xl flex gap-3.5"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-ams-gold/15 text-ams-gold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-grow space-y-1 pr-4">
              <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-white">
                AXE-BRIGHT HOLDING SARL
              </h4>
              <p className="font-sans font-light text-slate-500 dark:text-slate-300 text-xs leading-relaxed">
                {language === 'FR' 
                  ? 'Nos experts en mobilité internationale sont disponibles. Planifiez votre audit stratégique aujourd\'hui !' 
                  : 'Our worldwide mobility experts are online. Schedule your strategic audit session today.'}
              </p>
            </div>
            <button 
              onClick={() => setWelcomeToast(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-bold"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AIAssistant />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CurrencyProvider>
          <MainApp />
        </CurrencyProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
