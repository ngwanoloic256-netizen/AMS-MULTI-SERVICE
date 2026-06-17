/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { 
  PlusSquare, 
  Layers, 
  MapPin, 
  Globe2, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  FileText,
  BadgePercent,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface OfferingData {
  id: 'multi_service' | 'immigration' | 'vente_flash';
  titleFR: string;
  titleEN: string;
  taglineFR: string;
  taglineEN: string;
  descFR: string;
  descEN: string;
  icon: React.ReactNode;
  themeColor: string;
  highlightsFR: string[];
  highlightsEN: string[];
  badgeFR: string;
  badgeEN: string;
}

export const InteractiveOfferings: React.FC = () => {
  const { language } = useLanguage();
  const [selectedOffering, setSelectedOffering] = useState<'multi_service' | 'immigration' | 'vente_flash'>('multi_service');

  const offerings: OfferingData[] = [
    {
      id: 'multi_service',
      titleFR: 'AXE MULTI SERVICE',
      titleEN: 'AXE MULTI SERVICE',
      taglineFR: 'Ingénierie & Conformité Administrative',
      taglineEN: 'Engineering & Compliance Audits',
      descFR: 'Nous assurons la sécurité documentaire totale de vos projets : préparation bancaire blindée, traduction officielle hautement certifiée d\'actes et relevés de notes, conseil en assurances de visa, et montage des justificatifs financiers de subsistance.',
      descEN: 'We ensure total compliance and document security: robust bank statement verification, registered multi-lingual translations, global medical coverage, and ironclad financial guarantees aligned to world consular standards.',
      icon: <Layers className="w-6 h-6" />,
      themeColor: '#d4af37', // Gold
      badgeFR: 'Conformité Totale',
      badgeEN: 'Bulletproof Audit',
      highlightsFR: [
        'Traduction assermentée officielle ultra-rapide',
        'Montage financier irréprochable & certifié',
        'Légalisation administrative de bout en bout'
      ],
      highlightsEN: [
        'Vand-certified lightning-fast official translation',
        'Impeccable & accredited proof-of-funds structures',
        'Comprehensive administrative legalisation tracking'
      ]
    },
    {
      id: 'immigration',
      titleFR: 'AXE IMMIGRATION',
      titleEN: 'AXE IMMIGRATION',
      taglineFR: 'Études d\'Élite, Alternance (Ausbildung) & Mobilité Globale',
      taglineEN: 'Elite Academics, Ausbildung & Professional Relocations',
      descFR: 'La référence continentale pour votre intégration académique et professionnelle. Récupération d\'admissions directes prioritaires (Canada, Campus France, USA) et intégration directe aux filières d\'État Allemand (Ausbildung) avec salaire et gratuité de formation assurée.',
      descEN: 'A highly selective lane for global relocation and academic entry. Direct priority enrollments with elite business and engineering universities (Canada, France, USA) and placement in German auxiliary pathways (Ausbildung) with a contract from day one.',
      icon: <Compass className="w-6 h-6" />,
      themeColor: '#3b82f6', // Blue
      badgeFR: 'Partenaire Officiel d\'Élite',
      badgeEN: 'Official High-Tier Pathway',
      highlightsFR: [
        'Procédures directes Campus France simplifiées',
        'Contrat Ausbildung Allemand (Logement gratuit + 1400€/mois)',
        'Simulation immersive d\'entretien de visa'
      ],
      highlightsEN: [
        'Accelerated & simplified Campus France direct files',
        'German Ausbildung placement (Zero-tuition + 1,400€/month)',
        'Immersive mock interview coaching with senior experts'
      ]
    },
    {
      id: 'vente_flash',
      titleFR: 'AXE VENTE FLASH',
      titleEN: 'AXE VENTE FLASH',
      taglineFR: 'Quotas de Mobilité VIP & Bourses Limités',
      taglineEN: 'Limited VIP Intakes & Scholarship Allocations',
      descFR: 'Accédez en priorité absolue à des bourses de subsistance exclusives, des exemptions de frais d\'inscription universitaires étrangers et des contrats de recrutement réservés aux lauréats AXE-BRIGHT. Places d\'admissions de dernière minute et assistance consulaire d\'urgence.',
      descEN: 'First-priority emergency reservations for high-merit scholarship campaigns, global tuition fee exemptions, and direct corporate recruitment. Last-minute program reservations and high-speed executive visa assistance.',
      icon: <Flame className="w-6 h-6" />,
      themeColor: '#ef4444', // Flame red / Bright red
      badgeFR: 'Urgent • Validité Limitée',
      badgeEN: 'Urgent • Limited Offers',
      highlightsFR: [
        'Exemptions de frais d\'inscription prioritaires',
        'Bourses d\'excellence d\'études de dernière minute',
        'Traitement express de dossiers en 72 heures'
      ],
      highlightsEN: [
        'Highly anticipated direct tuition-fee waivers',
        'High-tier last-minute merit scholarship allocations',
        'Priority executive dossier setups within 72 hours'
      ]
    }
  ];

  const activeOffering = offerings.find(o => o.id === selectedOffering) || offerings[0];

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
    <div id="interactive-offerings-hub" className="w-full max-w-5xl mx-auto my-12 px-2 sm:px-6 relative z-30 select-none">
      
      {/* Dynamic interactive tabs panel */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
        {offerings.map((item) => {
          const isSelected = selectedOffering === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedOffering(item.id)}
              className={`w-full sm:w-auto px-6 py-4.5 rounded-xl border transition-all duration-300 flex items-center gap-3 font-display font-black text-xs sm:text-xs tracking-wider uppercase cursor-pointer ${
                isSelected
                  ? 'border-ams-gold bg-gradient-to-br from-slate-900/90 to-slate-950/90 dark:from-slate-950 dark:to-ams-blue-deep text-white shadow-[0_10px_30px_rgba(212,175,55,0.15)] ring-2 ring-ams-gold/20'
                  : 'border-white/10 dark:border-slate-800 bg-white/5 hover:bg-white/10 dark:bg-slate-900/30 dark:hover:bg-slate-900/50 text-slate-300 hover:text-white backdrop-blur'
              }`}
            >
              <div 
                className="p-1.5 rounded-lg flex items-center justify-center"
                style={{ 
                  backgroundColor: isSelected ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.05)',
                  color: isSelected ? '#d4af37' : 'currentColor'
                }}
              >
                {item.icon}
              </div>
              <div className="text-left">
                <span className="block font-bold leading-none">{language === 'FR' ? item.titleFR : item.titleEN}</span>
                <span className="block text-[8px] text-slate-400 font-sans font-light mt-0.5 tracking-wider">
                  {language === 'FR' ? item.badgeFR : item.badgeEN}
                </span>
              </div>
              {isSelected && (
                <motion.div 
                  layoutId="indicatorGlow" 
                  className="w-1.5 h-1.5 rounded-full bg-ams-gold ml-auto"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive responsive Card Content showcasing the beautiful selected service details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedOffering}
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -15 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl glass-panel border border-ams-gold/20 bg-gradient-to-b from-slate-900/80 to-slate-950/95 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between"
        >
          {/* Subtle decoration overlay lines inside cards */}
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none" 
            style={{ backgroundColor: activeOffering.themeColor }}
          />
          
          <div className="space-y-5 text-left flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold tracking-widest bg-ams-gold/10 border border-ams-gold/20 text-ams-gold px-2.5 py-1 roundeduppercase">
                {language === 'FR' ? activeOffering.badgeFR : activeOffering.badgeEN}
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wide flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-ams-gold" />
                <span>{language === 'FR' ? 'Accompagnement Garanti' : 'Guaranteed High-Trust'}</span>
              </span>
            </div>

            <h3 className="font-serif italic text-2xl sm:text-3xl font-normal leading-tight">
              {language === 'FR' ? activeOffering.titleFR : activeOffering.titleEN}
              <span className="block font-sans font-semibold text-lg sm:text-lg text-slate-200 mt-1 not-italic">
                {language === 'FR' ? activeOffering.taglineFR : activeOffering.taglineEN}
              </span>
            </h3>

            <p className="font-sans font-light text-slate-300 text-sm sm:text-base leading-relaxed antialiased">
              {language === 'FR' ? activeOffering.descFR : activeOffering.descEN}
            </p>

            {/* List of custom benefits inside the selected offering card */}
            <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(language === 'FR' ? activeOffering.highlightsFR : activeOffering.highlightsEN).map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 font-sans font-light">
                  <CheckCircle2 className="w-4 h-4 text-ams-gold shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 flex flex-col gap-3 min-w-[200px]">
            {/* Direct Instant Action Book Consultation */}
            <button
              onClick={handleScrollToBooking}
              className="w-full text-center px-6 py-4.5 rounded text-xs font-bold uppercase tracking-wider bg-white hover:bg-ams-gold text-slate-900 hover:text-slate-950 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-xl font-display"
            >
              <span>{language === 'FR' ? 'Postuler Directement' : 'Apply Directly Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Direct link connection button support WhatsApp */}
            <a
              href="https://wa.me/237699999999" // Premium placeholder linked to client WhatsApp contact
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-6 py-4 rounded text-xs font-medium uppercase tracking-wider border border-white/20 hover:border-ams-gold hover:bg-white/5 transition-all text-white flex items-center justify-center gap-2 font-sans"
            >
              <Zap className="w-4 h-4 text-ams-gold" />
              <span>{language === 'FR' ? 'Spécialiste WhatsApp' : 'Speak on WhatsApp'}</span>
            </a>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
};
