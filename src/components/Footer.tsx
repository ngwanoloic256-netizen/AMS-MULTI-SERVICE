/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from './LanguageContext';
import { translations } from '../data';
import { Landmark, Phone, Mail, MapPin, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';
import { AMSLogo } from './AMSLogo';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <footer className="relative bg-ams-blue-dark dark:bg-ams-blue-deep border-t border-ams-gold/15 pt-20 pb-10 overflow-hidden text-slate-300">
      
      {/* Decorative vertical gold bar design */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-ams-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          
          {/* Logo brand & description column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#home" onClick={(e) => handleScrollToSection(e, '#home')} className="block group">
              <AMSLogo className="h-20 w-auto -ml-3" />
            </a>

            <p className="font-sans font-light text-slate-400 text-sm leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            {/* Social Medias Grid */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com/' },
                { icon: <Facebook className="w-4 h-4" />, href: 'https://facebook.com/' },
                { icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com/' },
                { icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com/' }
              ].map((soc, sIdx) => (
                <a
                  key={sIdx}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-800 bg-ams-blue-deep hover:border-ams-gold hover:text-ams-gold transition-colors text-slate-400"
                  aria-label={`Visit social channel ${sIdx + 1}`}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white border-b border-slate-800 pb-3">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              {[
                { label: t.nav.home, href: '#home' },
                { label: t.nav.services, href: '#services' },
                { label: t.nav.destinations, href: '#destinations' },
                { label: t.nav.process, href: '#process' },
                { label: t.nav.testimonials, href: '#testimonials' },
                { label: t.nav.contact, href: '#contact' },
              ].map((lK) => (
                <li key={lK.href}>
                  <a
                    href={lK.href}
                    onClick={(e) => handleScrollToSection(e, lK.href)}
                    className="hover:text-ams-gold transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span>/</span>
                    <span>{lK.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Contact details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white border-b border-slate-800 pb-3">
              AMS Offices & Support
            </h4>
            
            <ul className="space-y-4 font-sans text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-ams-gold shrink-0 mt-0.5" />
                <span>{t.footer.headquarters}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-ams-gold shrink-0" />
                <a href="tel:+237693109773" className="hover:text-white transition-colors">
                  (+237) 693 10 97 73
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-ams-gold shrink-0" />
                <a href="mailto:amsmultiservice@gmail.com" className="hover:text-white transition-colors">
                  amsmultiservice@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Policies Under Section */}
        <div className="border-t border-slate-800/80 pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-slate-400">
          
          {/* Logo copyright */}
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} <strong className="text-white">AMS Axe Multi Services Sarl</strong>. {t.footer.rights}
          </div>

          {/* Legal and terms */}
          <div className="flex gap-4 sm:gap-6 flex-wrap justify-center font-medium">
            <a href="#home" className="hover:text-white transition-colors">{t.footer.legal}</a>
            <span>•</span>
            <a href="#home" className="hover:text-white transition-colors">{t.footer.terms}</a>
            <span>•</span>
            <a href="#home" className="hover:text-white transition-colors">{t.footer.privacy}</a>
          </div>

        </div>

      </div>
    </footer>
  );
};
