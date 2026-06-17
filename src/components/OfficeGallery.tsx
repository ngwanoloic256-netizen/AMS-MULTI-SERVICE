/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, ZoomIn, X, Users, MapPin, HeartHandshake } from 'lucide-react';

import imageOffice from '../assets/images/ams_yaounde_office_1781352727703.jpg';
import imageMeeting from '../assets/images/ams_team_meeting_1781352742902.jpg';
import imageConsultation from '../assets/images/ams_consultation_1781352758759.jpg';

interface GalleryItem {
  src: string;
  titleFR: string;
  titleEN: string;
  descFR: string;
  descEN: string;
  tagFR: string;
  tagEN: string;
  icon: React.ReactNode;
}

export const OfficeGallery: React.FC = () => {
  const { language } = useLanguage();
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      src: imageOffice,
      titleFR: "Cabinet Conseil Yaoundé",
      titleEN: "Yaoundé Advising Suite",
      descFR: "Un espace moderne et confidentiel situé au Carrefour Jouvence pour analyser vos projets académiques et professionnels.",
      descEN: "A highly modern, confidential environment located at Carrefour Jouvence tailored to design your academic and corporate paths.",
      tagFR: "Infrastructures",
      tagEN: "Infrastructure",
      icon: <Building2 className="w-4 h-4" />
    },
    {
      src: imageMeeting,
      titleFR: "Comité de Stratégie",
      titleEN: "Consular Strategy Sessions",
      descFR: "Nos experts se réunissent pour monter méticuleusement vos dossiers financiers et administratifs.",
      descEN: "Our dedicated consultants design and audit financial proofs and administrative visa dossiers with utmost care.",
      tagFR: "Équipe Élite",
      tagEN: "Elite Team",
      icon: <Users className="w-4 h-4" />
    },
    {
      src: imageConsultation,
      titleFR: "Accompagnement d'Élite",
      titleEN: "Elite Bespoke Coaching",
      descFR: "Un suivi individuel pas à pas, de l'élaboration du projet d'immigration jusqu'à l'obtention définitive du visa.",
      descEN: "One-on-one tailored coaching sessions, navigating from step-one evaluation up to visa authorization.",
      tagFR: "Succès Garanti",
      tagEN: "Success Driven",
      icon: <HeartHandshake className="w-4 h-4" />
    }
  ];

  const t = {
    FR: {
      tag: "Immersion Prestige",
      title: "Notre Cabinet à Yaoundé",
      subtitle: "Parcourez en images le cadre d'accueil haut de gamme d'AMS Axe Multi Services au Carrefour Jouvence, conçu pour la réussite de vos mobilités internationales.",
      viewFull: "Cliquer pour agrandir",
      location: "Carrefour Jouvence, Yaoundé, Cameroun",
      workingHours: "Lun - Ven : 8:00 - 18:00 | Sam : 9:00 - 13:00"
    },
    EN: {
      tag: "Prestige Immersion",
      title: "Our Yaoundé Headquarters",
      subtitle: "Tour the luxury setting of AMS Axe Multi Services in Carrefour Jouvence, customized to host your ultimate transition and international relocation blueprints.",
      viewFull: "Click to expand",
      location: "Carrefour Jouvence, Yaoundé, Cameroon",
      workingHours: "Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 1:00 PM"
    }
  };

  const currentT = t[language];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white dark:from-ams-blue-deep dark:to-ams-blue-dark/95 border-t border-b border-slate-100 dark:border-ams-gold/10 overflow-hidden">
      
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-ams-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ams-gold/10 border border-ams-gold/20 text-ams-gold text-xs font-semibold uppercase tracking-wider"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{currentT.tag}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif italic text-3xl sm:text-5xl text-ams-blue dark:text-white tracking-tight leading-tight"
          >
            {currentT.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans font-light text-slate-500 dark:text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            {currentT.subtitle}
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-ams-blue-dark border border-slate-100 dark:border-ams-gold/15 shadow-md hover:shadow-2xl dark:shadow-black/40 transition-all duration-500 cursor-pointer flex flex-col h-full min-h-[420px]"
              onClick={() => setActiveImage(item)}
            >
              {/* Image Container */}
              <div className="relative flex-grow overflow-hidden aspect-[4/3] w-full">
                {/* Master Glassmorphism Overlay (visible on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/75 to-slate-950/30 opacity-0 group-hover:opacity-100 backdrop-blur-[12px] transition-all duration-500 z-20 flex flex-col justify-end p-6 border-b border-white/5">
                  <div className="space-y-3 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    {/* Hover Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-white text-[10px] uppercase font-bold tracking-widest">
                      {item.icon}
                      <span>{language === 'FR' ? item.tagFR : item.tagEN}</span>
                    </div>

                    {/* Title in Glassmorphism Card */}
                    <h4 className="font-serif italic text-xl text-white tracking-wide">
                      {language === 'FR' ? item.titleFR : item.titleEN}
                    </h4>

                    {/* Rich Caption description */}
                    <p className="font-sans font-light text-slate-200 text-xs sm:text-sm leading-relaxed max-w-sm">
                      {language === 'FR' ? item.descFR : item.descEN}
                    </p>

                    {/* Interactive Click Tip */}
                    <div className="pt-2 flex items-center gap-1.5 text-blue-300 dark:text-blue-400 text-xs font-semibold">
                      <ZoomIn className="w-4 h-4 animate-pulse" />
                      <span>{currentT.viewFull}</span>
                    </div>
                  </div>
                </div>

                {/* Subtly animated main image */}
                <img
                  src={item.src}
                  alt={language === 'FR' ? item.titleFR : item.titleEN}
                  className="w-full h-full object-cover transform group-hover:scale-112 transition-transform duration-750 ease-out select-none"
                  referrerPolicy="no-referrer"
                />

                {/* Constant Badge Tag (hidden on hover when the card displays full caption) */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase font-bold tracking-widest leading-none transition-opacity duration-300 group-hover:opacity-0">
                  {item.icon}
                  <span>{language === 'FR' ? item.tagFR : item.tagEN}</span>
                </div>
              </div>

              {/* Static Text Body (for standard desktop state) */}
              <div className="p-6 bg-white dark:bg-ams-blue-dark border-t border-slate-50 dark:border-slate-900 flex-none flex flex-col justify-between space-y-2 group-hover:bg-slate-50/50 dark:group-hover:bg-ams-blue-deep/40 transition-colors duration-500">
                <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
                  {language === 'FR' ? item.titleFR : item.titleEN}
                </h3>
                <p className="font-sans font-light text-slate-500 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {language === 'FR' ? item.descFR : item.descEN}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Local Office Details footer callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl border border-ams-gold/15 bg-ams-gold/5 dark:bg-ams-gold/3 text-center flex flex-col md:flex-row items-center justify-center gap-6 text-sm"
        >
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <MapPin className="w-4 h-4 text-ams-gold" />
            <span className="font-semibold">{currentT.location}</span>
          </div>
          <div className="hidden md:block text-slate-300">|</div>
          <div className="text-slate-500 dark:text-slate-400">
            {currentT.workingHours}
          </div>
        </motion.div>

      </div>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 z-55 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
              aria-label="Close custom zoomed layout"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-ams-blue-deep border border-ams-gold/30 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-950">
                <img
                  src={activeImage.src}
                  alt={language === 'FR' ? activeImage.titleFR : activeImage.titleEN}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Subtitles inside Lightbox container */}
              <div className="p-6 md:p-8 space-y-2 bg-gradient-to-t from-ams-blue-deep to-slate-900 border-t border-ams-gold/15">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ams-gold/15 border border-ams-gold/25 text-ams-gold text-[10px] font-bold uppercase tracking-wider">
                  {language === 'FR' ? activeImage.tagFR : activeImage.tagEN}
                </span>
                <h3 className="font-display font-medium text-2xl text-white">
                  {language === 'FR' ? activeImage.titleFR : activeImage.titleEN}
                </h3>
                <p className="font-sans font-light text-slate-300 text-sm leading-relaxed">
                  {language === 'FR' ? activeImage.descFR : activeImage.descEN}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
