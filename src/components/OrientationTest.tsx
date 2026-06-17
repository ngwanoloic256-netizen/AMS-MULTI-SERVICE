/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useCurrency } from './CurrencyContext';
import { useEngagementTracker } from '../hooks/useEngagementTracker';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  RotateCcw, 
  MapPin, 
  Compass, 
  GraduationCap, 
  CircleDollarSign, 
  Languages, 
  Briefcase, 
  Calendar,
  MessageCircleCode,
  ZoomIn
} from 'lucide-react';

interface Question {
  id: string;
  labelFR: string;
  labelEN: string;
  key: string;
  options: {
    value: string;
    textFR: string;
    textEN: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'goal',
    labelFR: 'Quel est votre objectif principal ?',
    labelEN: 'What is your primary objective?',
    key: 'goal',
    options: [
      { value: 'studies', textFR: 'Faire des études supérieures / Spécialisation', textEN: 'Higher education / Specialization' },
      { value: 'career', textFR: 'Travailler & Développer une carrière globale', textEN: 'Work & Build a global career' },
      { value: 'visit', textFR: 'Visiter / Immigrer / Court séjour', textEN: 'Visit / Explanatory residency / Short stay' }
    ]
  },
  {
    id: 'education',
    labelFR: 'Quel est de niveau d\'études actuel ?',
    labelEN: 'What is your current level of education?',
    key: 'education',
    options: [
      { value: 'bac', textFR: 'Baccalauréat / Fin d\'études secondaires', textEN: 'High School Diploma / Baccalaureate' },
      { value: 'licence', textFR: 'Licence / Bachelor (Bac+3)', textEN: 'Bachelor\'s Degree (Bac+3)' },
      { value: 'master', textFR: 'Master / École d\'Agrégation (Bac+5)', textEN: 'Master\'s Degree or PhD' },
      { value: 'other', textFR: 'Diplômes professionnels / Autres', textEN: 'Professional Diplomas / Other certifications' }
    ]
  },
  {
    id: 'experience',
    labelFR: 'Quelle est votre expérience professionnelle ?',
    labelEN: 'What is your professional work experience?',
    key: 'experience',
    options: [
      { value: 'none', textFR: 'Aucune (Jeune diplômé ou Étudiant)', textEN: 'None (Young graduate or Student)' },
      { value: 'mid', textFR: 'Entre 1 et 3 ans d\'expérience', textEN: '1 to 3 years of experience' },
      { value: 'senior', textFR: 'Plus de 3 ans de pratique solide', textEN: 'More than 3 years of solid experience' }
    ]
  },
  {
    id: 'budget',
    labelFR: 'Quel est le budget annuel disponible pour votre projet ?',
    labelEN: 'What is the annual flexible budget for your project?',
    key: 'budget',
    options: [
      { value: 'low', textFR: 'Moins de 5 000 € / $ (Prestige économique)', textEN: 'Under €/$ 5,000 (Economic tier)' },
      { value: 'mid', textFR: 'Entre 5 000 € et 15 000 € / $', textEN: 'Between €/$ 5,000 & €/$ 15,000' },
      { value: 'high', textFR: 'Plus de 15 000 € / $ (Soutien complet)', textEN: 'Above €/$ 15,000 (Premium full funding)' }
    ]
  },
  {
    id: 'languages',
    labelFR: 'Quelles langues maîtrisez-vous à l\'écrit/oral ?',
    labelEN: 'Which languages do you master?',
    key: 'languages',
    options: [
      { value: 'fr', textFR: 'Français uniquement (Excellent niveau)', textEN: 'French only (Excellent level)' },
      { value: 'en', textFR: 'Anglais uniquement (Certificats IELTS/TOEFL)', textEN: 'English only (IELTS/TOEFL score)' },
      { value: 'both', textFR: 'Français et Anglais (Bilingue certifié)', textEN: 'Both French & English (Bilingual level)' }
    ]
  },
  {
    id: 'age',
    labelFR: 'Quelle est votre tranche d\'âge ?',
    labelEN: 'What is your age group?',
    key: 'age',
    options: [
      { value: 'under25', textFR: 'Moins de 25 ans', textEN: 'Under 25 years old' },
      { value: '25to35', textFR: 'Entre 25 et 35 ans', textEN: '25 to 35 years old' },
      { value: 'over35', textFR: 'Plus de 35 ans', textEN: 'Over 35 years old' }
    ]
  }
];

interface ScoreResult {
  country: string;
  flag: string;
  score: number;
  reasonFR: string;
  reasonEN: string;
  opportunityFR: string;
  opportunityEN: string;
}

export const OrientationTest: React.FC = () => {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { trackInteraction } = useEngagementTracker();
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1: Intro screen, QUESTIONS.length: results
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<ScoreResult[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleStart = () => {
    setCurrentStep(0);
    setAnswers({});
    setTestCompleted(false);
  };

  const handleSelectOption = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        calculateResults();
        setCurrentStep(QUESTIONS.length);
        setTestCompleted(true);
        trackInteraction('orientationTestsCompleted');
      }
    }, 250);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      setCurrentStep(-1);
    }
  };

  const calculateResults = () => {
    const goal = answers['goal'];
    const education = answers['education'];
    const experience = answers['experience'];
    const budget = answers['budget'];
    const languages = answers['languages'];
    const age = answers['age'];

    // Multi-criteria algorithms for real destination compatibility score
    const scoreMap: Record<string, number> = {
      'Canada': 75,
      'France': 75,
      'Allemagne': 72,
      'USA': 70,
      'UK': 70,
      'Émirats arabes unis': 68
    };

    // 1. Goal influence
    if (goal === 'studies') {
      scoreMap['Canada'] += 8;
      scoreMap['France'] += 12;
      scoreMap['Allemagne'] += 10;
      scoreMap['UK'] += 7;
      scoreMap['USA'] += 5;
    } else if (goal === 'career') {
      scoreMap['Canada'] += 10;
      scoreMap['Émirats arabes unis'] += 15;
      scoreMap['Allemagne'] += 12;
      scoreMap['USA'] += 8;
    } else if (goal === 'visit') {
      scoreMap['France'] += 8;
      scoreMap['Émirats arabes unis'] += 10;
      scoreMap['Canada'] += 5;
    }

    // 2. Budget influence 
    if (budget === 'high') {
      scoreMap['USA'] += 15;
      scoreMap['UK'] += 15;
      scoreMap['Canada'] += 10;
    } else if (budget === 'mid') {
      scoreMap['Canada'] += 12;
      scoreMap['France'] += 10;
      scoreMap['Émirats arabes unis'] += 8;
    } else if (budget === 'low') {
      scoreMap['Allemagne'] += 15; // Free tuition in Germany public univs!
      scoreMap['France'] += 12; // Low tuition fee options!
      scoreMap['USA'] -= 20; // Very expensive
      scoreMap['UK'] -= 15;
    }

    // 3. Language settings
    if (languages === 'fr') {
      scoreMap['France'] += 15;
      scoreMap['Canada'] += 10; // Quebec immigration
      scoreMap['USA'] -= 10;
      scoreMap['UK'] -= 15;
      scoreMap['Allemagne'] -= 5;
    } else if (languages === 'en') {
      scoreMap['USA'] += 15;
      scoreMap['UK'] += 18;
      scoreMap['Canada'] += 12;
      scoreMap['Émirats arabes unis'] += 10;
      scoreMap['France'] -= 5;
    } else if (languages === 'both') {
      scoreMap['Canada'] += 18; // Super high bonus for bilingual
      scoreMap['France'] += 10;
      scoreMap['USA'] += 10;
      scoreMap['UK'] += 12;
      scoreMap['Allemagne'] += 5;
    }

    // 4. Age and Experience
    if (age === 'under25' && goal === 'studies') {
      scoreMap['Canada'] += 5;
      scoreMap['France'] += 8;
    } else if (age === 'over35' && experience === 'senior') {
      scoreMap['Canada'] += 10; // Express Entry
      scoreMap['Émirats arabes unis'] += 12; // Golden visa / Dubai pro recruitment
    }

    // Clamp values between 40 and 97
    const output: ScoreResult[] = Object.keys(scoreMap).map(country => {
      const finalScore = Math.min(97, Math.max(42, scoreMap[country]));
      let flag = '🇨🇦';
      let reasonFR = '';
      let reasonEN = '';
      let opportunityFR = '';
      let opportunityEN = '';

      if (country === 'Canada') {
        flag = '🇨🇦';
        reasonFR = 'Éligibilité maximale due aux seuils d\'immigration préférentiels pour les francophones/bilingues ou étudiants qualifiés.';
        reasonEN = 'Highest compatibility owing to immigration thresholds preferring bilingual/French profiles and skilled academic paths.';
        opportunityFR = 'Procédure accélérée de permis d\'études (Volet direct) ou Entrée Express.';
        opportunityEN = 'Student Direct Stream expedited permit or Fast-track Express Entry profile.';
      } else if (country === 'France') {
        flag = '🇫🇷';
        reasonFR = 'Recommandé pour l\'excellence académique à tarif accessible et l\'intégration facilitée des diplômés de la zone francophone.';
        reasonEN = 'Highly recommended for world-class affordable higher education and streamlined visas for French-speaking regions.';
        opportunityFR = 'Sélection Campus France simplifiée, écoles d\'ingénieurs et de commerce d\'élite.';
        opportunityEN = 'Campus France simplified pathway, premier engineering and elite business schools.';
      } else if (country === 'Allemagne') {
        flag = '🇩🇪';
        reasonFR = 'Idéal pour le budget d\'études gratuit et l\'énorme besoin de main-d\'œuvre technologique et d\'ingénieurs.';
        reasonEN = 'Excellent fit for zero-tuition universities and high demand for engineering & tech professionals.';
        opportunityFR = 'Visa recherche d\'emploi, programmes de formation en alternance "Ausbildung".';
        opportunityEN = 'German Jobseeker Visa, block account financial structure, and premium Ausbildungs.';
      } else if (country === 'USA') {
        flag = '🇺🇸';
        reasonFR = 'Exige des garanties financières robustes mais offre le prestige des universités de l\'Ivy League et la puissance de la Silicon Valley.';
        reasonEN = 'Requires robust financial backing, but grants ultimate Ivy League academic prestige & Silicon Valley careers.';
        opportunityFR = 'Programmes STEM, bourses institutionnelles prestigieuses et visa F1.';
        opportunityEN = 'STEM-designated pathways, premium institutional backing, and F-1 student visas.';
      } else if (country === 'UK') {
        flag = '🇬🇧';
        reasonFR = 'Bénéficiez du nouveau Graduate Route Visa de 2 ans post-études et du plus haut standard scientifique d\'Europe.';
        reasonEN = 'Profit from the UK Graduate Route Visa granting 2 years open-work post-studies and premium scientific research.';
        opportunityFR = 'Master de 1 an intensif, universités Russell Group d\'élite internationale.';
        opportunityEN = '1-Year intensive Master programs, prestigious Russell Group elite business hubs.';
      } else if (country === 'Émirats arabes unis') {
        flag = '🇦🇪';
        reasonFR = 'Plaque tournante mondiale offrant une fiscalité nulle, des carrières luxueuses et une intégration commerciale fulgurante (Dubaï & Abu Dhabi).';
        reasonEN = 'Global flagship hub offering zero-tax high paying jobs, prestigious career opportunities, and direct business start-up hubs.';
        opportunityFR = 'Visa de résidence Dubaï de 2 à 10 ans, embauche contractuelle directe.';
        opportunityEN = 'Dubai residency plans (2 to 10 years), fast direct corporate sponsorships.';
      }

      return {
        country,
        flag,
        score: finalScore,
        reasonFR,
        reasonEN,
        opportunityFR,
        opportunityEN
      };
    }).sort((a,b) => b.score - a.score);

    setResults(output);
  };

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
    <div id="orientation-test" className="py-20 bg-slate-50 dark:bg-slate-950/60 border-t border-b border-slate-100 dark:border-ams-gold/15 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-80 h-80 bg-ams-gold/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-blue-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ams-gold/10 border border-ams-gold/20 text-ams-gold text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'FR' ? 'Algorithme d\'orientation exclusif' : 'Exclusive mobility orientation matchmaking'}</span>
          </div>
          <h2 className="font-serif italic text-3xl sm:text-4xl text-ams-blue dark:text-white leading-tight">
            {language === 'FR' ? 'Découvrez Votre Destination Idéale en 2 Minutes' : 'Discover Your Perfect Destination in 2 Minutes'}
          </h2>
          <p className="font-sans font-light text-slate-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            {language === 'FR' 
              ? 'Répondez à 6 questions hautement qualifiées pour obtenir instantanément vos taux de compatibilité administrative et consulaire.'
              : 'Answer 6 strategic questions to immediately evaluate your immigration, visa, and study success metrics on our partner countries.'}
          </p>
        </div>

        {/* Dynamic Card Container with Framer Motion */}
        <div className="bg-white dark:bg-ams-blue-dark/50 border border-slate-200 dark:border-ams-gold/15 rounded-2xl p-6 sm:p-10 shadow-xl min-h-[360px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {currentStep === -1 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6 text-center my-auto py-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-ams-gold to-ams-gold-dark text-white flex items-center justify-center mx-auto shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                    {language === 'FR' ? 'Diagnostic Stratégique Gratuit' : 'Free Strategic Assessment Diagnostic'}
                  </h3>
                  <p className="font-sans font-light text-slate-500 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    {language === 'FR' 
                      ? 'Notre simulateur croise vos diplômes, votre niveau linguistique et votre budget avec les règlements consulaires en vigueur.'
                      : 'Our diagnostic matches your academic background, language scores, and budget guidelines with updated direct diplomatic codes.'}
                  </p>
                </div>
                
                <button
                  onClick={handleStart}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-ams-gold to-ams-gold-dark text-ams-blue-deep font-display font-extrabold tracking-wider uppercase text-xs rounded hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                >
                  <span>{language === 'FR' ? "Lancer l'évaluation" : 'Get Matches Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {currentStep >= 0 && currentStep < QUESTIONS.length && (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Progress bar info */}
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-2">
                  <span>STEP {currentStep + 1} OF {QUESTIONS.length}</span>
                  <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% COMPLETE</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-ams-gold h-full transition-all duration-300" 
                    style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                {/* Question title */}
                <h3 className="font-display font-medium text-lg sm:text-xl text-slate-800 dark:text-white leading-snug">
                  {language === 'FR' ? QUESTIONS[currentStep].labelFR : QUESTIONS[currentStep].labelEN}
                </h3>

                {/* Options list */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {QUESTIONS[currentStep].options.map((opt) => {
                    let text = language === 'FR' ? opt.textFR : opt.textEN;
                    if (QUESTIONS[currentStep].key === 'budget') {
                      if (opt.value === 'low') {
                        text = language === 'FR' 
                          ? `Moins de ${formatPrice(5000)} (Prestige économique)` 
                          : `Under ${formatPrice(5000)} (Economic tier)`;
                      } else if (opt.value === 'mid') {
                        text = language === 'FR'
                          ? `Entre ${formatPrice(5000)} et ${formatPrice(15000)}`
                          : `Between ${formatPrice(5000)} & ${formatPrice(15000)}`;
                      } else if (opt.value === 'high') {
                        text = language === 'FR'
                          ? `Plus de ${formatPrice(15000)} (Soutien complet)`
                          : `Above ${formatPrice(15000)} (Premium full funding)`;
                      }
                    }
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(QUESTIONS[currentStep].key, opt.value)}
                        className={`w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-ams-gold bg-slate-50/50 hover:bg-ams-gold/5 dark:bg-ams-blue-deep/30 dark:hover:bg-ams-gold/5 text-slate-700 dark:text-slate-200 hover:text-ams-gold font-sans text-sm sm:text-base font-light transition-all duration-300 flex items-center justify-between cursor-pointer group`}
                      >
                        <span>{text}</span>
                        <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 group-hover:border-ams-gold flex items-center justify-center p-1 transition-colors">
                          <div className="w-full h-full rounded-full bg-transparent group-hover:bg-ams-gold transition-colors" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Back button */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-start">
                  <button
                    onClick={handleBack}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{language === 'FR' ? 'Étape précédente' : 'Back to previous step'}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === QUESTIONS.length && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Result header */}
                <div className="text-center py-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="inline-flex p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full mb-3">
                    <CheckCircle className="w-6 h-6 animate-bounce" />
                  </div>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-slate-900 dark:text-white">
                    {language === 'FR' ? 'Vos Scores de Compatibilité' : 'Your Matching Compatibility Dashboard'}
                  </h3>
                  <p className="font-sans font-light text-slate-400 text-xs sm:text-sm mt-1">
                    {language === 'FR' 
                      ? 'Classement calculé sur la base de vos critères d\'orientation de mobilité.' 
                      : 'Hierarchical matchmaking computed based on your visa criteria points.'}
                  </p>
                </div>

                {/* Matchings List */}
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {results.slice(0, 3).map((match, idx) => (
                    <div 
                      key={match.country}
                      className={`p-5 rounded-xl border bg-slate-50/50 dark:bg-ams-blue-deep/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        idx === 0 
                          ? 'border-ams-gold shadow-md shadow-ams-gold/5 scale-[1.01]' 
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="space-y-2 flex-grow max-w-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl leading-none" role="img" aria-label={match.country}>{match.flag}</span>
                          <h4 className="font-display font-extrabold text-slate-800 dark:text-white text-base sm:text-lg flex items-center gap-2">
                            <span>{match.country}</span>
                            {idx === 0 && (
                              <span className="text-[9px] bg-ams-gold/15 border border-ams-gold/30 text-ams-gold uppercase px-1.5 py-0.5 rounded font-mono font-medium tracking-wider">
                                {language === 'FR' ? 'Recommandé' : 'Match Peak'}
                              </span>
                            )}
                          </h4>
                        </div>
                        <p className="font-sans font-light text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                          {language === 'FR' ? match.reasonFR : match.reasonEN}
                        </p>
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-1.5 text-[11px] text-ams-gold font-light">
                          <span className="font-semibold uppercase tracking-wider">{language === 'FR' ? 'Option :' : 'Option:'}</span>
                          <span>{language === 'FR' ? match.opportunityFR : match.opportunityEN}</span>
                        </div>
                      </div>

                      {/* Score circle / percentage pill */}
                      <div className="flex flex-row md:flex-col items-center justify-between md:justify-center p-3 bg-white dark:bg-ams-blue-dark/50 border border-slate-200 dark:border-slate-800 min-w-[120px] rounded-lg text-center gap-2 md:gap-0">
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest">{language === 'FR' ? 'Affinité' : 'Score affinity'}</span>
                        <span className="font-mono text-xl sm:text-2xl font-bold text-amber-500 dark:text-ams-gold">{match.score}%</span>
                        <div className="w-16 bg-slate-100 dark:bg-slate-900 h-1 rounded-full overflow-hidden mt-1 hidden md:block">
                          <div className="bg-ams-gold h-full" style={{ width: `${match.score}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer advice */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="font-display font-medium text-xs text-slate-800 dark:text-white">
                      {language === 'FR' ? 'Intéressé par ces correspondances ?' : 'Interested in these matching results?'}
                    </p>
                    <p className="font-sans font-light text-[11px] text-slate-400 leading-tight">
                      {language === 'FR' 
                        ? 'Analysez ces scores avec un conseiller AXE-BRIGHT lors de votre entretien gratuit.' 
                        : 'Review this custom report with an AXE-BRIGHT counselor during your free audit session.'}
                    </p>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={handleStart}
                      className="px-4 py-2 text-xs border border-slate-200 dark:border-slate-800 hover:border-ams-gold text-slate-500 hover:text-white rounded transition-colors cursor-pointer"
                    >
                      {language === 'FR' ? 'Recommencer' : 'Retake test'}
                    </button>
                    <button
                      onClick={handleScrollToBooking}
                      className="px-5 py-2.5 text-xs bg-ams-gold text-ams-blue-deep font-sans font-bold uppercase rounded hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{language === 'FR' ? 'Enregistrer & Prendre RDV' : 'Save & Book Consul'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
