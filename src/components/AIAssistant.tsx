/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useEngagementTracker } from '../hooks/useEngagementTracker';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  GraduationCap, 
  Lock, 
  Briefcase, 
  Calendar,
  Compass,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  options?: { labelFR: string; labelEN: string; action: string }[];
}

export const AIAssistant: React.FC = () => {
  const { language } = useLanguage();
  const { trackInteraction } = useEngagementTracker();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  const initialWelcome = () => {
    return [
      {
        id: 'welcome-1',
        sender: 'assistant' as const,
        text: language === 'FR' 
          ? 'Bonjour, je suis AXE-BRIGHT Assistant. Je suis là pour vous guider dans votre projet international. Que souhaitez-vous faire aujourd\'hui ?'
          : 'Hello, I am AXE-BRIGHT Assistant. I am here to guide you in your international mobility endeavors. What would you like to achieve today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: [
          { labelFR: '🎓 Projet d\'études', labelEN: '🎓 Academic Study Project', action: 'studies' },
          { labelFR: '🛂 Démarches de visa', labelEN: '🛂 Visa & Consular Steps', action: 'visa' },
          { labelFR: '💼 Services professionnels', labelEN: '💼 Global Career Services', action: 'career' },
          { labelFR: '📅 Prendre un Rendez-vous', labelEN: '📅 Schedule Consultation', action: 'booking' }
        ]
      }
    ];
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages(initialWelcome());
    }
  }, [language]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string, actionType?: string) => {
    if (!text.trim()) return;

    trackInteraction('messagesToAI');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart AI typing lag
    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      let nextOptions: { labelFR: string; labelEN: string; action: string }[] = [];

      const normalizedInput = text.toLowerCase();
      const detectedAction = actionType || (
        normalizedInput.includes('etud') || normalizedInput.includes('study') ? 'studies' :
        normalizedInput.includes('visa') || normalizedInput.includes('passp') ? 'visa' :
        normalizedInput.includes('travail') || normalizedInput.includes('work') || normalizedInput.includes('career') || normalizedInput.includes('prof') ? 'career' :
        normalizedInput.includes('rdv') || normalizedInput.includes('book') || normalizedInput.includes('rendez') || normalizedInput.includes('calend') ? 'booking' : 'general'
      );

      if (detectedAction === 'studies') {
        replyText = language === 'FR'
          ? "Excellent choix d'avenir ! AXE-BRIGHT coopère avec plus de 250 universités agréées au Canada, en France et au Royaume-Uni. Je peux vous accompagner pour la recherche de bourses d'études de prestige, l'orientation académique ou l'accompagnement rigoureux de vos candidatures. Pourriez-vous me dire si vous disposez déjà d'un diplôme de Baccalauréat ou de Licence ?"
          : "An excellent choice for your future! AXE-BRIGHT cooperates with over 250 accredited universities and colleges in Canada, France, and the UK. We handle scholarship searches, academic guidance, and university application packets. Do you currently hold a High School Diploma or Bachelor's qualification?";
        nextOptions = [
          { labelFR: '🎓 Baccalauréat / High School', labelEN: '🎓 High School / Baccalaureate', action: 'bac' },
          { labelFR: '🎓 Licence / Bachelor (Bac+3)', labelEN: '🎓 Bachelor\'s Graduate (3y)', action: 'licence' },
          { labelFR: '🎓 Master / PhD (Bac+5)', labelEN: '🎓 Master or Doctorates', action: 'master' },
          { labelFR: '📅 Programmer mon audit maintenant', labelEN: '📅 Book my free Audit desk', action: 'booking' }
        ];
      } else if (detectedAction === 'visa') {
        replyText = language === 'FR'
          ? "La préparation consulaire est la pierre d'achoppement de toute mobilité. AXE-BRIGHT garantit un haut taux de succès grâce à la préparation minutieuse et la légalisation certifiée de vos relevés de compte et garanties financières. Nous prenons en charge les Visas d'Études, les Visas de Travail et les Visas Visiteurs. Quel pays suscite votre intérêt particulier ?"
          : "Consular review is the critical cornerstone of any mobility. AXE-BRIGHT secures world-class results through rigorous auditing of proof of funds, mock interviews, and administrative compliance. We support Student, Worker, and Visitor entry visas. Which destination corresponds to your vision?";
        nextOptions = [
          { labelFR: '🇨🇦 Canada immigration', labelEN: '🇨🇦 Canada pathways', action: 'canada' },
          { labelFR: '🇫🇷 France & Schengen', labelEN: '🇫🇷 France & Schengen zone', action: 'france' },
          { labelFR: '🇩🇪 Allemagne Ausbildung/Études', labelEN: '🇩🇪 Germany Ausbildung/Studies', action: 'germany' },
          { labelFR: '📅 Entretien Blanc gratuit', labelEN: '📅 Free mock trial appointment', action: 'booking' }
        ];
      } else if (detectedAction === 'career') {
        replyText = language === 'FR'
          ? "Nos solutions professionnelles couvrent l'accompagnement de carrière internationale, la redaction de CV aux normes de la destination (bilingues ou format canadien/européen), et la mise en contact avec des recruteurs partenaires à Dubaï (Émirats) ou en Allemagne. Souhaitez-vous postuler prochainement à une offre ?"
          : "Our corporate services include global recruitment matching, drafting target resume standards (canadian, europass format), and introducing clients to corporate recruiters in Dubai (UAE) or Germany. Are you ready to submit your application for review?";
        nextOptions = [
          { labelFR: '💼 Voir le Flux d\'Opportunités', labelEN: '💼 Access Jobs/Programs Feed', action: 'opportunities' },
          { labelFR: '📄 Rédiger mon CV sur-mesure', labelEN: '📄 Upgrade my Resume format', action: 'cv' },
          { labelFR: '📅 Prendre un RDV Stratégique', labelEN: '📅 Schedule strategic intake', action: 'booking' }
        ];
      } else if (detectedAction === 'booking') {
        replyText = language === 'FR'
          ? "Très bien. Je vous propose de programmer votre première consultation d'analyse gratuite avec l'un de nos officiers experts. Vous pouvez formuler vos besoins dans notre calendrier automatisé situé juste en dessous !"
          : "Splendid. Let's schedule your first complimentary intake advisory session with our direct mobility officers. Please fill in your details in our reservation calendar located at the bottom of the portal!";
        nextOptions = [
          { labelFR: '📅 Remplir le calendrier', labelEN: '📅 Go to scheduling form', action: 'scroll_booking' },
          { labelFR: '🟢 Parler immédiatement sur WhatsApp', labelEN: '🟢 Direct WhatsApp dispatch', action: 'whatsapp' }
        ];
      } else if (detectedAction === 'scroll_booking') {
        replyText = language === 'FR'
          ? "Déplacement vers le formulaire..."
          : "Scrolling to calendar...";
        setTimeout(() => {
          const element = document.querySelector('#contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      } else if (detectedAction === 'whatsapp') {
        window.open('https://wa.me/237693109773', '_blank');
        replyText = language === 'FR' ? 'Contact WhatsApp ouvert !' : 'WhatsApp window triggered!';
      } else if (detectedAction === 'opportunities') {
        setTimeout(() => {
          const element = document.querySelector('#opportunities-feed');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
        replyText = language === 'FR' ? "Déplacement vers le flux d'opportunités..." : "Redirecting to opportunities deck...";
      } else {
        replyText = language === 'FR'
          ? "Je prends note de votre demande. Notre cabinet AXE-BRIGHT HOLDING SARL reste disponible pour analyser chaque paramètre de votre projet. Plus spécifiquement, par quelle catégorie d'accompagnement pouvons-nous débuter aujourd'hui ?"
          : "I have registered your input. Our physical and digital offices at AXE-BRIGHT HOLDING SARL remain at your complete disposal to examine your profile parameters. Which category represents your focal interest today?";
        nextOptions = [
          { labelFR: '🎓 Études supérieures', labelEN: '🎓 Academic Pursuit', action: 'studies' },
          { labelFR: '🛂 Visa de transit/séjour', labelEN: '🛂 Visa Procurement', action: 'visa' },
          { labelFR: '📱 Contacter un officier local', labelEN: '📱 WhatsApp Advisor Desk', action: 'whatsapp' }
        ];
      }

      const assistMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: nextOptions.length > 0 ? nextOptions : undefined
      };

      setMessages(prev => [...prev, assistMsg]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Sparkles Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-slate-900 border border-ams-gold/30 dark:border-ams-gold text-white shadow-2xl transition-all cursor-pointer group"
        >
          <div className="relative">
            <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ams-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ams-gold"></span>
            </span>
            <MessageCircle className="w-5 h-5 text-ams-gold animate-pulse" />
          </div>
          <span className="font-display font-bold text-xs tracking-wider uppercase text-white hidden sm:block">
            {language === 'FR' ? 'AXE-BRIGHT IA Assistant' : 'AXE-BRIGHT AI Desk'}
          </span>
        </motion.button>
      </div>

      {/* Floating Chat Interface Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 left-6 z-50 w-[350px] sm:w-[400px] h-[500px] rounded-2xl border border-slate-200 dark:border-ams-gold/20 bg-white/95 dark:bg-ams-blue-dark/95 backdrop-blur-md shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header portion */}
            <div className="p-4 bg-slate-950/90 text-white flex items-center justify-between border-b border-ams-gold/15">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-ams-gold/15 border border-ams-gold/30 rounded-full text-ams-gold">
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs sm:text-sm tracking-wide text-white">AXE-BRIGHT AI Advisor Desk</h4>
                  <span className="text-[9px] text-emerald-400 font-mono block uppercase">● 24h/24 Online Bot</span>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-sans leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-ams-gold to-ams-gold-dark text-ams-blue-deep rounded-tr-none font-medium'
                        : 'bg-white dark:bg-ams-blue-deep/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[8px] text-slate-400 font-mono mt-1.5 block text-right">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Options triggers */}
                  {msg.sender === 'assistant' && msg.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.action}
                          onClick={() => handleSendMessage(language === 'FR' ? opt.labelFR : opt.labelEN, opt.action)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-ams-gold dark:bg-slate-900 dark:hover:bg-ams-gold/10 border border-slate-300 dark:border-slate-800 hover:border-ams-gold text-[10px] text-slate-600 dark:text-slate-300 hover:text-ams-gold rounded-full font-medium transition-colors cursor-pointer"
                        >
                          {language === 'FR' ? opt.labelFR : opt.labelEN}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing simulation */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-xl bg-white dark:bg-ams-blue-deep/40 border border-slate-100 dark:border-slate-800/60 max-w-[60px]">
                  <span className="w-1.5 h-1.5 bg-ams-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-ams-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-ams-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Message input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-850 flex gap-2"
            >
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={language === 'FR' ? 'Tapez votre message...' : 'Formulate requests...'}
                className="flex-grow p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-ams-gold"
              />
              <button 
                type="submit"
                className="p-2.5 bg-ams-gold text-ams-blue-deep rounded-lg hover:shadow-md cursor-pointer transition-colors"
                aria-label="Send automated response"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
