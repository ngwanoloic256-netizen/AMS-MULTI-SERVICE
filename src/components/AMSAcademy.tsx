/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { 
  BookOpen, 
  Download, 
  CheckSquare, 
  ArrowRight, 
  Star, 
  Flame, 
  Award,
  Video,
  FileCheck
} from 'lucide-react';

interface ResourceItem {
  id: string;
  titleFR: string;
  titleEN: string;
  category: 'guide' | 'checklist' | 'video';
  durationFR: string;
  durationEN: string;
  descFR: string;
  descEN: string;
  pointsFR: string[];
  pointsEN: string[];
}

const RESOURCES: ResourceItem[] = [
  {
    id: 'studies-guide',
    titleFR: 'Comment préparer son projet d\'études à l\'étranger',
    titleEN: 'Preparing your Higher Education Study draft abroad',
    category: 'guide',
    durationFR: '12 pages • PDF',
    durationEN: '12 pages • PDF',
    descFR: 'Le guide complet étape par étape couvrant le choix du programme, la prise de contact Campus France, les bourses de subsistance et l\'assurance de visa.',
    descEN: 'The blueprint covering program selection, reaching Campus France, applying for fellowships, and consular pre-evaluations.',
    pointsFR: [
      'Choix stratégique du programme universitaire',
      'Critères d\'éligibilité académique universels',
      'Montage financier irréprochable'
    ],
    pointsEN: [
      'Bespoke university program screening',
      'Standard GPA conversion standards',
      'Proof of funds structure requirements'
    ]
  },
  {
    id: 'errors-avoid',
    titleFR: 'Les erreurs courantes à éviter lors de la préparation d\'un dossier consulaire',
    titleEN: 'Critical errors to avoid during Visa Application setups',
    category: 'checklist',
    durationFR: 'Lecture : 5 min',
    durationEN: 'Reading: 5 mins',
    descFR: 'Une liste de contrôle critique pour auditer vos relevés bancaires, prouver vos attaches familiales réelles et réussir l\'entretien consulaire blanc.',
    descEN: 'A security compliance audit document. Match mock account requirements and state clear return ties to optimize target visa outputs.',
    pointsFR: [
      'Justification de la provenance des fonds financiers',
      'Cohérence absolue du plan d\'études / parcours pro',
      'Simulation d\'entrevue et gestion du stress diplomatic'
    ],
    pointsEN: [
      'Clarity of origin regarding blocked assets',
      'Flow of studies aligning perfectly with resume history',
      'Handling mock interviews and diplomatic queries'
    ]
  },
  {
    id: 'canada-settling',
    titleFR: 'Guide d\'installation au Canada : Logement et assurances',
    titleEN: 'Canada settling handbook: Accommodations & health care',
    category: 'guide',
    durationFR: '18 pages • PDF',
    durationEN: '18 pages • PDF',
    descFR: 'Toutes les astuces et formalités administratives indispensables pour l\'obtention du NAS, l\'ouverture de compte de banque et l\'adaptation hivernale.',
    descEN: 'The newcomer playbook for obtaining your SIN number, opening bank accounts, securing private leases, and choosing robust adaptation networks.',
    pointsFR: [
      'Recherche anticipée de colocation sécurisée',
      'Formalités bancaires et forfait mobile local',
      'Se repérer et vaincre le choc culturel initial'
    ],
    pointsEN: [
      'Bespoke residential lease guides',
      'Opening local zero-fee banks',
      'Resolving transport and cultural adaptation phases'
    ]
  }
];

export const AMSAcademy: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'guide' | 'checklist'>('all');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filteredResources = RESOURCES.filter(res => {
    if (selectedCategory === 'all') return true;
    return res.category === selectedCategory;
  });

  const triggerDownload = (id: string, title: string) => {
    setDownloadSuccess(id);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <div id="academy" className="py-24 bg-white dark:bg-ams-blue-dark relative overflow-hidden text-slate-800 dark:text-slate-100">
      
      {/* Decorative Blueprint background layout */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-ams-gold/3 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Resource Header info */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ams-gold/10 border border-ams-gold/20 text-ams-gold text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'FR' ? 'AXE-BRIGHT Academy • Bibliothèque exclusive' : 'AXE-BRIGHT Academy • Exclusive resources library'}</span>
          </div>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-ams-blue dark:text-white leading-tight">
            {language === 'FR' ? 'Centre de Ressources & Savoirs' : 'Academic & Resource Center'}
          </h2>
          <p className="font-sans font-light text-slate-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {language === 'FR' 
              ? 'Accédez librement aux guides d\'installation, fichiers administratifs et recommandations rédigées par nos experts seniors d\'immigration.'
              : 'Empower your steps: access complimentary settling playbooks, visa error checklist briefs, and academic planning templates.'}
          </p>

          {/* Categories Tab selector */}
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-ams-gold text-ams-blue-deep font-bold shadow'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-white'
              }`}
            >
              {language === 'FR' ? 'Tout voir' : 'All items'}
            </button>
            <button
              onClick={() => setSelectedCategory('guide')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                selectedCategory === 'guide'
                  ? 'bg-ams-gold text-ams-blue-deep font-bold shadow'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-white'
              }`}
            >
              {language === 'FR' ? 'Guides d\'installation' : 'Settling Guides (PDF)'}
            </button>
            <button
              onClick={() => setSelectedCategory('checklist')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                selectedCategory === 'checklist'
                  ? 'bg-ams-gold text-ams-blue-deep font-bold shadow'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-white'
              }`}
            >
              {language === 'FR' ? 'Checklists consulaire' : 'Visa Checklists'}
            </button>
          </div>
        </div>

        {/* Resources Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredResources.map((res, index) => (
              <motion.div
                layout
                key={res.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl border border-slate-200 dark:border-ams-gold/15 bg-slate-50 dark:bg-ams-blue-dark/40 shadow-md hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between h-full hover:-translate-y-1 relative"
              >
                
                {/* Visual Category badge */}
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[10px] font-bold text-amber-500 dark:text-ams-gold uppercase tracking-widest bg-ams-gold/10 px-2.5 py-1 rounded">
                    {res.category === 'guide' 
                      ? (language === 'FR' ? 'Guide Premium' : 'Premium Handout') 
                      : (language === 'FR' ? 'Liste consulaire' : 'Critical checklist')}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {language === 'FR' ? res.durationFR : res.durationEN}
                  </span>
                </div>

                {/* Info titles and descriptions */}
                <div className="space-y-4">
                  <h3 className="font-serif italic text-lg sm:text-xl text-slate-900 dark:text-white leading-snug group-hover:text-ams-gold transition-colors">
                    {language === 'FR' ? res.titleFR : res.titleEN}
                  </h3>
                  <p className="font-sans font-light text-slate-500 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {language === 'FR' ? res.descFR : res.descEN}
                  </p>

                  {/* Bullet micro point benefits */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    {(language === 'FR' ? res.pointsFR : res.pointsEN).map((p, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
                        <FileCheck className="w-3.5 h-3.5 text-ams-gold shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instant simulation Action Download link button */}
                <div className="pt-6 mt-6">
                  <button
                    onClick={() => triggerDownload(res.id, language === 'FR' ? res.titleFR : res.titleEN)}
                    className={`w-full py-3 px-4 text-xs font-sans font-bold uppercase rounded tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      downloadSuccess === res.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-ams-blue-dark dark:bg-ams-blue-deep border border-ams-gold/20 text-white hover:border-ams-gold'
                    }`}
                  >
                    {downloadSuccess === res.id ? (
                      <>
                        <FileCheck className="w-4 h-4 animate-bounce" />
                        <span>{language === 'FR' ? 'Téléchargé avec succès' : 'Saved File to Desk'}</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>{language === 'FR' ? 'Télécharger (.PDF)' : 'Secure download (.PDF)'}</span>
                      </>
                    )}
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
