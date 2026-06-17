/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { useCurrency } from './CurrencyContext';
import { translations } from '../data';
import { Globe, Sun, Moon, Menu, X, Landmark, Compass, Award } from 'lucide-react';
import { AMSLogo } from './AMSLogo';

export const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.destinations, href: '#destinations' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.testimonials, href: '#testimonials' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        id="app-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? theme === 'light'
              ? 'py-3 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/50'
              : 'py-3 bg-ams-blue-deep/90 backdrop-blur-md shadow-lg border-b border-ams-gold/15'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Title */}
            <a href="#home" onClick={(e) => handleScrollToSection(e, '#home')} className="block group">
              <AMSLogo className="h-14 sm:h-16 w-auto" forceLightColor={!isScrolled || theme === 'dark'} />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleScrollToSection(e, item.href)}
                    className={`font-sans font-medium text-sm transition-all duration-300 tracking-wide relative group py-2 ${
                      isScrolled
                        ? theme === 'light'
                          ? 'text-slate-700 hover:text-ams-blue'
                          : 'text-slate-300 hover:text-ams-gold'
                        : 'text-slate-200 hover:text-ams-gold'
                    }`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-ams-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>

              {/* Utility Tools */}
              <div className={`flex items-center gap-4 pl-4 border-l transition-colors duration-300 ${
                isScrolled
                  ? theme === 'light'
                    ? 'border-slate-300'
                    : 'border-slate-800'
                  : 'border-white/20'
              }`}>
                {/* Premium Segmented Language Controller */}
                <div id="lang-switcher-desktop" className="relative inline-flex bg-slate-100 hover:bg-slate-200/50 dark:bg-slate-900/40 dark:hover:bg-slate-900/60 border border-slate-300/60 dark:border-slate-800 p-0.5 rounded-full transition-all duration-300 shadow-inner">
                  <button
                    onClick={() => setLanguage('FR')}
                    className={`relative px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 z-10 cursor-pointer ${
                      language === 'FR'
                        ? 'text-white font-extrabold'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {language === 'FR' && (
                      <motion.span
                        layoutId="activeLang"
                        className="absolute inset-0 rounded-full z-[-1] shadow-md"
                        style={{ backgroundColor: 'var(--color-ams-gold)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="text-[11px] leading-none">🇫🇷</span>
                    <span>FR</span>
                  </button>
                  <button
                    onClick={() => setLanguage('EN')}
                    className={`relative px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 z-10 cursor-pointer ${
                      language === 'EN'
                        ? 'text-white font-extrabold'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {language === 'EN' && (
                      <motion.span
                        layoutId="activeLang"
                        className="absolute inset-0 rounded-full z-[-1] shadow-md"
                        style={{ backgroundColor: 'var(--color-ams-gold)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="text-[11px] leading-none">🇬🇧</span>
                    <span>EN</span>
                  </button>
                </div>

                {/* Premium Segmented Currency Controller */}
                <div id="currency-switcher-desktop" className="relative inline-flex bg-slate-100 hover:bg-slate-200/50 dark:bg-slate-900/40 dark:hover:bg-slate-900/60 border border-slate-300/60 dark:border-slate-800 p-0.5 rounded-full transition-all duration-300 shadow-inner">
                  <button
                    onClick={() => setCurrency('XAF')}
                    className={`relative px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-300 flex items-center z-10 cursor-pointer ${
                      currency === 'XAF'
                        ? 'text-white font-extrabold'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {currency === 'XAF' && (
                      <motion.span
                        layoutId="activeCurrency"
                        className="absolute inset-0 rounded-full z-[-1] shadow-md"
                        style={{ backgroundColor: 'var(--color-ams-gold)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>XAF</span>
                  </button>
                  <button
                    onClick={() => setCurrency('EUR')}
                    className={`relative px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-300 flex items-center z-10 cursor-pointer ${
                      currency === 'EUR'
                        ? 'text-white font-extrabold'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {currency === 'EUR' && (
                      <motion.span
                        layoutId="activeCurrency"
                        className="absolute inset-0 rounded-full z-[-1] shadow-md"
                        style={{ backgroundColor: 'var(--color-ams-gold)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>EUR</span>
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`relative px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-300 flex items-center z-10 cursor-pointer ${
                      currency === 'USD'
                        ? 'text-white font-extrabold'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {currency === 'USD' && (
                      <motion.span
                        layoutId="activeCurrency"
                        className="absolute inset-0 rounded-full z-[-1] shadow-md"
                        style={{ backgroundColor: 'var(--color-ams-gold)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>USD</span>
                  </button>
                </div>

                {/* Premium Segmented Theme Controller */}
                <div id="theme-switcher-desktop" className="relative inline-flex bg-slate-100 hover:bg-slate-200/50 dark:bg-slate-900/40 dark:hover:bg-slate-900/60 border border-slate-300/60 dark:border-slate-800 p-0.5 rounded-full transition-all duration-300 shadow-inner">
                  <button
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={`relative p-1.5 rounded-full text-xs transition-all duration-300 flex items-center justify-center z-10 cursor-pointer ${
                      theme === 'light'
                        ? 'text-ams-blue font-extrabold'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title="Light Mode"
                    aria-label="Switch to light mode"
                  >
                    {theme === 'light' && (
                      <motion.span
                        layoutId="activeTheme"
                        className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full z-[-1] shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                  <button
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={`relative p-1.5 rounded-full text-xs transition-all duration-300 flex items-center justify-center z-10 cursor-pointer ${
                      theme === 'dark'
                        ? 'text-ams-gold font-extrabold'
                        : 'text-slate-500'
                    }`}
                    title="Dark Mode"
                    aria-label="Switch to dark mode"
                  >
                    {theme === 'dark' && (
                      <motion.span
                        layoutId="activeTheme"
                        className="absolute inset-0 bg-white dark:bg-slate-850 rounded-full z-[-1] shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Moon className="w-3.5 h-3.5 text-ams-gold" />
                  </button>
                </div>

                {/* Premium Call to Action */}
                <a
                  href="#contact"
                  onClick={(e) => handleScrollToSection(e, '#contact')}
                  className={`relative overflow-hidden inline-flex items-center justify-center px-4 py-2 text-xs font-bold tracking-wider uppercase rounded border border-ams-gold bg-ams-gold/10 hover:bg-ams-gold hover:text-ams-blue-deep transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] ${
                    isScrolled && theme === 'light'
                      ? 'text-ams-blue hover:text-white'
                      : 'text-white'
                  }`}
                >
                  {t.nav.bookNow}
                </a>
              </div>
            </div>

            {/* Mobile Actions Menu Trigger */}
            <div className="flex lg:hidden items-center gap-3">
              {/* Premium Segmented Language Controller for Mobile */}
              <div id="lang-switcher-mobile" className="relative inline-flex bg-slate-100 dark:bg-slate-900 border border-slate-300/50 dark:border-slate-850 p-0.5 rounded-full shadow-inner">
                <button
                  onClick={() => setLanguage('FR')}
                  className={`relative px-2 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300 flex items-center gap-1 z-10 cursor-pointer ${
                    language === 'FR'
                      ? 'text-white font-extrabold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {language === 'FR' && (
                    <motion.span
                      layoutId="activeLangMobile"
                      className="absolute inset-0 rounded-full z-[-1]"
                      style={{ backgroundColor: 'var(--color-ams-gold)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>🇫🇷</span>
                  <span>FR</span>
                </button>
                <button
                  onClick={() => setLanguage('EN')}
                  className={`relative px-2 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300 flex items-center gap-1 z-10 cursor-pointer ${
                    language === 'EN'
                      ? 'text-white font-extrabold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {language === 'EN' && (
                    <motion.span
                      layoutId="activeLangMobile"
                      className="absolute inset-0 rounded-full z-[-1]"
                      style={{ backgroundColor: 'var(--color-ams-gold)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>🇬🇧</span>
                  <span>EN</span>
                </button>
              </div>

              {/* Premium Segmented Currency Controller for Mobile */}
              <div id="currency-switcher-mobile" className="relative inline-flex bg-slate-100 dark:bg-slate-900 border border-slate-300/50 dark:border-slate-850 p-0.5 rounded-full shadow-inner">
                <button
                  onClick={() => setCurrency('XAF')}
                  className={`relative px-1.5 py-0.5 rounded-full text-[9px] font-bold transition-all duration-300 flex items-center z-10 cursor-pointer ${
                    currency === 'XAF'
                      ? 'text-white font-extrabold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {currency === 'XAF' && (
                    <motion.span
                      layoutId="activeCurrencyMobile"
                      className="absolute inset-0 rounded-full z-[-1]"
                      style={{ backgroundColor: 'var(--color-ams-gold)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>XAF</span>
                </button>
                <button
                  onClick={() => setCurrency('EUR')}
                  className={`relative px-1.5 py-0.5 rounded-full text-[9px] font-bold transition-all duration-300 flex items-center z-10 cursor-pointer ${
                    currency === 'EUR'
                      ? 'text-white font-extrabold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {currency === 'EUR' && (
                    <motion.span
                      layoutId="activeCurrencyMobile"
                      className="absolute inset-0 rounded-full z-[-1]"
                      style={{ backgroundColor: 'var(--color-ams-gold)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>EUR</span>
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`relative px-1.5 py-0.5 rounded-full text-[9px] font-bold transition-all duration-300 flex items-center z-10 cursor-pointer ${
                    currency === 'USD'
                      ? 'text-white font-extrabold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {currency === 'USD' && (
                    <motion.span
                      layoutId="activeCurrencyMobile"
                      className="absolute inset-0 rounded-full z-[-1]"
                      style={{ backgroundColor: 'var(--color-ams-gold)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>USD</span>
                </button>
              </div>

              {/* Premium Segmented Theme Controller for Mobile */}
              <div id="theme-switcher-mobile" className="relative inline-flex bg-slate-100 dark:bg-slate-900 border border-slate-300/50 dark:border-slate-850 p-0.5 rounded-full shadow-inner">
                <button
                  onClick={() => theme !== 'light' && toggleTheme()}
                  className={`relative p-1 rounded-full transition-all duration-300 flex items-center justify-center z-10 cursor-pointer ${
                    theme === 'light' ? 'text-amber-500' : 'text-slate-400'
                  }`}
                  aria-label="Switch to light mode"
                >
                  {theme === 'light' && (
                    <motion.span
                      layoutId="activeThemeMobile"
                      className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full z-[-1] shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Sun className="w-3 h-3 text-amber-500" />
                </button>
                <button
                  onClick={() => theme !== 'dark' && toggleTheme()}
                  className={`relative p-1 rounded-full transition-all duration-300 flex items-center justify-center z-10 cursor-pointer ${
                    theme === 'dark' ? 'text-ams-gold' : 'text-slate-400'
                  }`}
                  aria-label="Switch to dark mode"
                >
                  {theme === 'dark' && (
                    <motion.span
                      layoutId="activeThemeMobile"
                      className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full z-[-1] shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Moon className="w-3 h-3 text-ams-gold" />
                </button>
              </div>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md border transition-colors ${
                  isScrolled
                    ? theme === 'light'
                      ? 'border-slate-300 hover:border-ams-gold text-slate-700'
                      : 'border-slate-800 hover:border-ams-gold text-slate-200'
                    : 'border-white/20 hover:border-ams-gold text-white'
                }`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-ams-gold" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className={`fixed top-[64px] left-0 w-full z-45 backdrop-blur-lg shadow-2xl py-6 xl:hidden ${
              theme === 'light'
                ? 'bg-white/95 border-b border-slate-200/80'
                : 'bg-ams-blue-deep/98 border-b border-ams-gold/20'
            }`}
          >
            <div className="px-4 sm:px-6 space-y-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleScrollToSection(e, item.href)}
                    className={`block px-4 py-3 text-base font-display font-semibold rounded transition-all duration-300 ${
                      theme === 'light'
                        ? 'text-slate-700 hover:text-ams-blue hover:bg-slate-100'
                        : 'text-slate-300 hover:text-white hover:bg-ams-gold/10'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className={`pt-4 border-t flex flex-col gap-3 ${
                theme === 'light' ? 'border-slate-200' : 'border-slate-800'
              }`}>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollToSection(e, '#contact')}
                  className="w-full text-center py-3 rounded bg-ams-gold text-ams-blue-deep font-display font-bold tracking-wider uppercase text-sm shadow-md hover:bg-ams-gold-dark transition-all duration-300"
                >
                  {t.nav.bookNow}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
