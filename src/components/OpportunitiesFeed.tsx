/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useCurrency } from './CurrencyContext';
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Filter, 
  Calendar, 
  Search, 
  ArrowUpRight, 
  Sparkles,
  Award,
  Clock
} from 'lucide-react';

interface Opportunity {
  id: string;
  titleFR: string;
  titleEN: string;
  category: 'studies' | 'career' | 'event';
  country: 'Canada' | 'France' | 'Allemagne' | 'UK' | 'USA' | 'UAE';
  locationFR: string;
  locationEN: string;
  descFR: string;
  descEN: string;
  tagsFR: string[];
  tagsEN: string[];
  dateString: string;
  badgeFR?: string;
  badgeEN?: string;
}

const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'can-scholar',
    titleFR: 'Programme exclusif de Bourse d\'Excellence d\'Études',
    titleEN: 'Exclusive Premium Academic Excellence Scholarship Campaign',
    category: 'studies',
    country: 'Canada',
    locationFR: 'Université de Montréal / Laval, Canada',
    locationEN: 'University of Montreal / Laval, Canada',
    descFR: 'Soutien financier d\'intégration institutionnel pour les cycles de Baccalauréat et Maîtrise en Génie Informatique, Gestion de projets et Sciences Humaines.',
    descEN: 'Bespoke integration funding for elite Bachelor & Master cohorts in Software Engineering, Project Management, and Social Sciences.',
    tagsFR: ['Bourse partielle', 'Rentree Septembre 2026', 'Bac+3 / Licence requis'],
    tagsEN: ['Partial funding', 'September 2026 Intake', 'Bachelor req.'],
    dateString: '2026-06-30',
    badgeFR: 'Financement d\'élite',
    badgeEN: 'Top Tier Funding'
  },
  {
    id: 'ger-ausbild',
    titleFR: 'Formation Allemande en Électromécanique & Nursing (Ausbildung)',
    titleEN: 'German Registered Nursing & Electromechanics Ausbildungs',
    category: 'career',
    country: 'Allemagne',
    locationFR: 'Stuttgart / Francfort, Allemagne',
    locationEN: 'Stuttgart / Frankfurt, Germany',
    descFR: 'Bénéficiez du programme d\'alternance d\'État Allemand. Frais de scolarité entièrement gratuits et indemnité de stage mensuelle de 1 100 € à 1 400 € assurée dès le premier mois.',
    descEN: 'Enroll in the state auxiliary apprenticeship program. Zero-tuition fee structure combined with monthly base pocket-stipends of €1,100 - €1,400.',
    tagsFR: ['Logement pris en charge', 'Indemnité garantie', 'Niveau B1 Allemand minimum'],
    tagsEN: ['Housing assistance', 'Guaranteed Salary', 'German Level B1 req.'],
    dateString: '2026-07-15',
    badgeFR: 'Alternance Allemande',
    badgeEN: 'Ausbildung Special'
  },
  {
    id: 'fra-campus',
    titleFR: 'Recrutement Privé Campus France - Écoles de Commerce & d\'Ingénieur',
    titleEN: 'Campus France Elite Direct Admission Recruitment - Business Schools',
    category: 'studies',
    country: 'France',
    locationFR: 'Paris / Lyon / Toulouse, France',
    locationEN: 'Paris / Lyon / Toulouse, France',
    descFR: 'Sessions Directes de diplomation avec étude accélérée du dossier d\'admission consulaire. Dispense partielle de frais d\'inscription différenciés réservée aux lauréats AXE-BRIGHT.',
    descEN: 'Fast-tracked administrative admission audits across prestigious business schools under Russell-like Elite campuses. Partial fee waivers for AXE-BRIGHT scholars.',
    tagsFR: ['Écoles d\'élite', 'Accompagnement Visa inclus', 'Aucun concours Requis'],
    tagsEN: ['Elite institutions', 'Full Visa Prep included', 'No exam required'],
    dateString: '2026-06-25',
    badgeFR: 'Campus France Direct',
    badgeEN: 'Direct Admission'
  },
  {
    id: 'uae-dubai-tech',
    titleFR: 'Contrats Mobilité Carrière Informatique & Intelligence Artificielle',
    titleEN: 'Enterprise IT & AI Software Engineering Vacancies',
    category: 'career',
    country: 'UAE',
    locationFR: 'Downtown Dubai Silicon Oasis, Émirats Arabes Unis',
    locationEN: 'Downtown Dubai Silicon Oasis, UAE',
    descFR: 'AXE-BRIGHT HOLDING SARL met en contact direct les ingénieurs seniors francophones et anglophones avec des hubs technologiques de premier plan dans le golfe.',
    descEN: 'We bridge top developers with enterprise IT hubs located in tax-free hubs. Sponsor accommodation and Golden Residency plan included.',
    tagsFR: ['Salaire non-taxable', 'Billet d\'avion annuel', 'Visa Résidence Dubaï'],
    tagsEN: ['Tax-free compensation', 'Annual Flight flights', 'Dubai Residency Visa'],
    dateString: '2026-08-01',
    badgeFR: 'Emploi Premium',
    badgeEN: 'Tax-Free Career'
  },
  {
    id: 'ams-webinar',
    titleFR: 'Webinaire de Consultation : Réussir son Garand & Compte Bloqué',
    titleEN: 'AXE-BRIGHT Webinar: Formatting Blocked Bank Accounts & Proof of Funds',
    category: 'event',
    country: 'Canada',
    locationFR: 'Visioconférence Google Meet interactive',
    locationEN: 'Interactive live Zoom / Google Meet room',
    descFR: 'Séance d\'information stratégique animée par notre PDG fondateur et experts juridiques pour structurer votre attestation bancaire irréprochable.',
    descEN: 'Strategic compliance training led by our Senior Officers. Prevent standard diplomatic rejections by clarifying origin of blocked currencies.',
    tagsFR: ['Accès gratuit', 'Sessions de Questions/Réponses', 'Enregistrement Replay offert'],
    tagsEN: ['Free access', 'Live Q&A Desk', 'Recorded Replay access'],
    dateString: '2026-06-20',
    badgeFR: 'Séminaire Direct',
    badgeEN: 'Live Briefing'
  }
];

export const OpportunitiesFeed: React.FC = () => {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<'all' | 'studies' | 'career' | 'event'>('all');
  const [selectedCountry, setSelectedCountry] = useState<'all' | 'Canada' | 'France' | 'Allemagne' | 'UK' | 'USA' | 'UAE'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = OPPORTUNITIES.filter(opt => {
    const matchesCategory = activeCategory === 'all' || opt.category === activeCategory;
    const matchesCountry = selectedCountry === 'all' || opt.country === selectedCountry;
    const textSearch = (language === 'FR' ? opt.titleFR + opt.descFR : opt.titleEN + opt.descEN).toLowerCase();
    const matchesQuery = searchQuery.trim() === '' || textSearch.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCountry && matchesQuery;
  });

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
    <div id="opportunities-feed" className="py-24 bg-slate-50 dark:bg-slate-950/40 border-t border-b border-slate-100 dark:border-slate-900 relative overflow-hidden text-slate-800 dark:text-slate-100">
      
      {/* Absolute backgrounds */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-ams-gold/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ams-gold/10 border border-ams-gold/20 text-ams-gold text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'FR' ? 'Flux d\'Opportunités Exclusives' : 'Exclusive Opportunity Pipelines'}</span>
          </div>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-ams-blue dark:text-white leading-tight">
            {language === 'FR' ? 'Programmes & Offres en Vedette' : 'Programs & Featured Vacancies'}
          </h2>
          <p className="font-sans font-light text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            {language === 'FR'
              ? 'Découvrez les quotas d\'admission prioritaires négociés par AXE-BRIGHT HOLDING SARL auprès de ses partenaires universitaires et recruteurs mondiaux.'
              : 'Browse active priority intake allocations and global career vacancies secured through our corporate relations desks.'}
          </p>
        </div>

        {/* Filters control desk bar */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-ams-blue-dark/50 p-5 sm:p-6 mb-10 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Real Search bar */}
            <div className="relative w-full md:w-80">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'FR' ? 'Rechercher un poste/programme' : 'Search positions or campaigns...'}
                className="w-full text-xs p-3 pl-10 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-ams-gold focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Category tags selector */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { key: 'all', FR: 'Tous les projets', EN: 'All Categories' },
                { key: 'studies', FR: 'Études', EN: 'Academic Studies' },
                { key: 'career', FR: 'Carrières', EN: 'Vacancies / Jobs' },
                { key: 'event', FR: 'Événements', EN: 'Briefings & Events' }
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    activeCategory === cat.key
                      ? 'bg-ams-gold text-ams-blue-deep shadow'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {language === 'FR' ? cat.FR : cat.EN}
                </button>
              ))}
            </div>

            {/* Country quick selectors */}
            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2 justify-center md:justify-end">
                <Filter className="w-3.5 h-3.5 text-ams-gold" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value as any)}
                  className="p-2.5 rounded-lg text-xs border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-ams-gold focus:bg-white"
                >
                  <option value="all">{language === 'FR' ? 'Toutes destinations' : 'All countries'}</option>
                  <option value="Canada">Canada 🇨🇦</option>
                  <option value="France">France 🇫🇷</option>
                  <option value="Allemagne">Allemagne 🇩🇪</option>
                  <option value="UK">Royaume-Uni 🇬🇧</option>
                  <option value="USA">Établissements US 🇺🇸</option>
                  <option value="UAE">Émirats arabes 🇦🇪</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Items list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-white dark:bg-ams-blue-dark/50 border border-slate-200 dark:border-ams-gold/15 hover:border-ams-gold/40 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-ams-gold/10 text-ams-gold rounded-full">
                        {item.category === 'studies' ? <GraduationCap className="w-5 h-5" /> : item.category === 'career' ? <Briefcase className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                      </div>
                      <div>
                        {item.badgeFR && (
                          <span className="text-[9px] bg-amber-500/10 border border-amber-500/25 text-amber-500 uppercase px-2 py-0.5 rounded font-bold font-mono">
                            {language === 'FR' ? item.badgeFR : item.badgeEN}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 block mt-0.5 font-mono flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-ams-gold" />
                          <span>{language === 'FR' ? item.locationFR : item.locationEN}</span>
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <Clock className="w-3 h-3 text-ams-gold" />
                      <span>Exp: {item.dateString}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug hover:text-ams-gold transition-colors">
                    {language === 'FR' ? item.titleFR : item.titleEN}
                  </h3>

                   <p className="font-sans font-light text-slate-500 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mt-3">
                    {(() => {
                      if (item.id === 'ger-ausbild') {
                        return language === 'FR'
                          ? `Bénéficiez du programme d'alternance d'État Allemand. Frais de scolarité entièrement gratuits et indemnité de stage mensuelle de ${formatPrice(1100)} à ${formatPrice(1400)} assurée dès le premier mois.`
                          : `Enroll in the state auxiliary apprenticeship program. Zero-tuition fee structure combined with monthly base pocket-stipends of ${formatPrice(1100)} - ${formatPrice(1400)}.`;
                      }
                      return language === 'FR' ? item.descFR : item.descEN;
                    })()}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-850/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'FR' ? item.tagsFR : item.tagsEN).map((tag, tIdx) => (
                      <span key={tIdx} className="bg-slate-150/40 dark:bg-slate-900 px-2 py-0.5 rounded text-[10px] text-slate-400 border border-slate-200 dark:border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={handleScrollToBooking}
                    className="py-2.5 px-4 bg-ams-blue-dark hover:bg-ams-gold hover:text-ams-blue-deep dark:bg-slate-900 dark:hover:bg-amber-500 text-white text-xs font-bold uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-1 border border-slate-200 dark:border-slate-800 whitespace-nowrap"
                  >
                    <span>{language === 'FR' ? 'Postuler via AXE-BRIGHT' : 'Apply via AXE-BRIGHT'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Fallback Empty logs selection */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-sans text-sm">
            {language === 'FR' ? 'Aucune opportunité active ne correspond à vos filtres.' : 'No active campaign matching your criteria currently.'}
          </div>
        )}

      </div>
    </div>
  );
};
