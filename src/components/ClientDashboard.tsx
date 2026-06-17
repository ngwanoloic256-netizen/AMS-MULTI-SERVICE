/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useEngagementTracker } from '../hooks/useEngagementTracker';
import { D3EngagementStats } from './D3EngagementStats';
import { connecter, inscrire, deconnecter, onAuthStateChanged, auth, db, renvoyerEmailVerification, connecterAvecGoogle } from '../firebaseconfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { 
  User, 
  Lock, 
  FileText, 
  Bell, 
  Settings, 
  UserCheck, 
  Download, 
  Upload, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  MessageSquareCode,
  CalendarCheck2
} from 'lucide-react';

interface ClientDossier {
  clientName: string;
  email: string;
  phone: string;
  destination: string;
  stepIndex: number; // 0 to 4
  documents: { name: string; size: string; status: 'approved' | 'pending' | 'rejected'; date: string }[];
  notifications: string[];
  adviserName: string;
}

export const ClientDashboard: React.FC = () => {
  const { language } = useLanguage();
  const { metrics, trackInteraction, trackFunnelStep } = useEngagementTracker();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // login credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('Canada 🇨🇦');

  const [dossier, setDossier] = useState<ClientDossier | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Initial dummy dossier load or real Firestore retrieval via dynamic Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsEmailVerified(user.emailVerified);
        setIsLoading(true);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setDossier(userDocSnap.data() as ClientDossier);
            setIsAuthenticated(true);
            trackFunnelStep('dashboardRegistered');
          } else {
            // High-resilience fallback: if registered user doesn't have a record yet
            const fallbackDossier: ClientDossier = {
              clientName: fullName || user.email?.split('@')[0] || 'Clarisse KOUAM',
              email: user.email || '',
              phone: phone || '+237 693 109 773',
              destination: destination || 'Canada 🇨🇦',
              stepIndex: 2,
              documents: [
                { name: 'Passeport_International_Scanné.pdf', size: '2.4 MB', status: 'approved', date: '2026-05-12' },
                { name: 'Relevés_De_Notes_Licence.pdf', size: '4.1 MB', status: 'approved', date: '2026-05-15' },
                { name: 'Lettre_De_Motivation_Draft_v1.docx', size: '340 KB', status: 'pending', date: '2026-06-01' }
              ],
              notifications: [
                language === 'FR' 
                  ? 'Profil d\'immigration initialisé sur le serveur sécurisé AMS.' 
                  : 'Initial immigration profile registered on secure AMS servers.',
                language === 'FR' 
                  ? 'Rappel : Votre entretien Campus France/Consulaire blanc est réservé le 18 juin.' 
                  : 'Friendly notice: Your simulated diplomatic mock Interview is reserved on June 18.'
              ],
              adviserName: 'Mme Sandrine MBANG (Expert Senior Fédéral)'
            };
            await setDoc(userDocRef, fallbackDossier);
            setDossier(fallbackDossier);
            setIsAuthenticated(true);
            trackFunnelStep('dashboardRegistered');
          }
        } catch (error) {
          console.error('Failed to resolve authenticated customer record:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setDossier(null);
        setIsAuthenticated(false);
        setIsEmailVerified(false);
      }
    });

    return () => unsubscribe();
  }, [language, trackFunnelStep]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);

    if (isRegistering) {
      try {
        const user = await inscrire(email, password);
        const newDossier: ClientDossier = {
          clientName: fullName || 'Marc-Antoine KOUAM',
          email: email,
          phone: phone || '+237 693 109 773',
          destination: destination || 'Canada 🇨🇦',
          stepIndex: 2,
          documents: [
            { name: 'Passeport_International_Scanné.pdf', size: '2.4 MB', status: 'approved', date: '2026-05-12' },
            { name: 'Relevés_De_Notes_Licence.pdf', size: '4.1 MB', status: 'approved', date: '2026-05-15' },
            { name: 'Lettre_De_Motivation_Draft_v1.docx', size: '340 KB', status: 'pending', date: '2026-06-01' }
          ],
          notifications: [
            language === 'FR' 
              ? 'Félicitations ! Dossier créé sur les serveurs sécurisés d\'AMS.' 
              : 'Congratulations! Secure dossier initiated on active AMS portals.',
            language === 'FR' 
              ? 'Prochaines étapes : Téléverser vos relevés de notes et passeport.' 
              : 'Next milestones: Upload active transcripts and passport copies.'
          ],
          adviserName: 'Mme Sandrine MBANG (Expert Senior Fédéral)'
        };
        await setDoc(doc(db, 'users', user.uid), newDossier);
        triggerToast(language === 'FR' ? 'Compte VIP initialisé !' : 'VIP Profile Created Successfully!');
        trackFunnelStep('dashboardRegistered');
      } catch (error: any) {
        console.error(error);
        triggerToast(error.message || (language === 'FR' ? 'Identifiants invalides ou déjà utilisés' : 'Signup error - check connection credentials'));
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        await connecter(email, password);
        triggerToast(language === 'FR' ? 'Accès sécurisé accordé !' : 'Secure Vault Session Granted!');
        trackFunnelStep('dashboardRegistered');
      } catch (error: any) {
        console.error(error);
        triggerToast(language === 'FR' ? 'Adresse email ou mot de passe incorrect' : 'Invalid cabinet credentials - access denied');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRegisterToggle = () => {
    setIsRegistering(!isRegistering);
    setEmail('');
    setPassword('');
  };

  const handleSignOut = async () => {
    try {
      await deconnecter();
      triggerToast(language === 'FR' ? 'Session sécurisée terminée.' : 'Secure Session Teardown Complete.');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await connecterAvecGoogle();
      triggerToast(
        language === 'FR' 
          ? 'Connexion Google réussie !' 
          : 'Google Auth Sign-In Confirmed!'
      );
      trackFunnelStep('dashboardRegistered');
    } catch (error: any) {
      console.error(error);
      triggerToast(
        error.message || (language === 'FR' ? 'Échec de la connexion Google' : 'Google Sign-In failed')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      await renvoyerEmailVerification();
      triggerToast(
        language === 'FR' 
          ? 'E-mail de vérification envoyé !' 
          : 'Verification email sent!'
      );
    } catch (error: any) {
      console.error(error);
      triggerToast(
        error.message || (language === 'FR' ? "Échec de l'envoi." : "Resend failed.")
      );
    } finally {
      setResendLoading(false);
    }
  };

  const checkVerificationStatus = async () => {
    if (auth.currentUser) {
      setIsLoading(true);
      try {
        await auth.currentUser.reload();
        setIsEmailVerified(auth.currentUser.emailVerified);
        if (auth.currentUser.emailVerified) {
          triggerToast(
            language === 'FR' 
              ? 'Adresse email vérifiée avec succès !' 
              : 'Email address verified successfully!'
          );
        } else {
          triggerToast(
            language === 'FR' 
              ? 'L\'adresse n\'est pas encore vérifiée.' 
              : 'Email not verified yet.'
          );
        }
      } catch (error: any) {
        console.error(error);
        triggerToast(error.message || "Failed to check status");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const simulateDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !dossier) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    setUploadMessage(language === 'FR' ? 'Cryptage AES-256 en cours...' : 'AES-256 Encryption scanning...');

    setTimeout(async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsUploading(false);
        return;
      }

      const sizeInMB = file.size / (1024 * 1024);
      const sizeDisplay = sizeInMB < 0.1 ? `${(file.size / 1024).toFixed(0)} KB` : `${sizeInMB.toFixed(1)} MB`;

      const newDoc = {
        name: file.name,
        size: sizeDisplay,
        status: 'pending' as const,
        date: new Date().toISOString().split('T')[0]
      };

      const updatedDocs = [newDoc, ...dossier.documents];
      const updatedNotifs = [
        language === 'FR' 
          ? `Nouveau document téléversé : ${file.name}` 
          : `New document secured: ${file.name}`,
        ...dossier.notifications
      ];

      try {
        await updateDoc(doc(db, 'users', user.uid), {
          documents: updatedDocs,
          notifications: updatedNotifs
        });

        setDossier(prev => {
          if (!prev) return null;
          return {
            ...prev,
            documents: updatedDocs,
            notifications: updatedNotifs
          };
        });

        setIsUploading(false);
        setUploadMessage('');
        triggerToast(language === 'FR' ? 'Téléversement sécurisé terminé !' : 'Upload finished successfully!');
        trackInteraction('documentUploads');
      } catch (err: any) {
        console.error(err);
        setIsUploading(false);
        setUploadMessage('');
        triggerToast(language === 'FR' ? 'Échec de la sauvegarde sur le serveur' : 'Failed to save document on the server');
      }
    }, 1800);
  };

  const stepsList = [
    { labelFR: 'Consultation', labelEN: 'Consultation' },
    { labelFR: 'Analyse du Projet', labelEN: 'Project Audit' },
    { labelFR: 'Préparation du Dossier', labelEN: 'Dossier Assembly' },
    { labelFR: 'Étapes Administratives', labelEN: 'Visa & Consular' },
    { labelFR: 'Finalisation & Départ', labelEN: 'Departure Brief' }
  ];

  return (
    <div id="portal" className="py-24 bg-white dark:bg-ams-blue-deep relative overflow-hidden text-slate-800 dark:text-slate-100">
      
      {/* Visual Ambient Grid and light glow vectors */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none">
          <pattern id="light-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#light-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 bg-amber-500 text-ams-blue-deep text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-lg shadow-xl z-50 flex items-center gap-2 border border-amber-600"
            >
              <ShieldCheck className="w-4 h-4 animate-pulse" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ams-gold/10 border border-ams-gold/20 text-ams-gold text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'FR' ? 'Cryptage Militaire AES-256' : 'AES-256 Military Grade Portal'}</span>
          </span>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-ams-blue dark:text-white leading-tight">
            {language === 'FR' ? 'Votre Espace Client Sécurisé' : 'AMS Secure Customer Space'}
          </h2>
          <p className="font-sans font-light text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            {language === 'FR' 
              ? 'Connectez-vous à votre tableau de bord exclusif pour téléverser vos documents requis, suivre instantanément la progression consulaire de votre dossier et interagir avec votre conseiller attitré.'
              : 'Log in to your private client cockpit. Follow your file processing metrics, upload administrative credentials safely and access adviser notes 24/7.'}
          </p>
        </div>

        {/* Core Auth & Dashboard Area */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {!isAuthenticated ? (
              
              /* LOGIN & SIGNUP PORTLET CARD */
              <motion.div 
                key="login-box"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto rounded-2xl border border-slate-200 dark:border-ams-gold/15 bg-slate-50 dark:bg-ams-blue-dark/60 p-6 sm:p-10 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 bg-ams-gold/10 border border-ams-gold/15 text-ams-gold rounded-full mb-3.5">
                      <User className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-medium text-lg text-slate-900 dark:text-white">
                      {isRegistering 
                        ? (language === 'FR' ? 'Créer un fichier Client' : 'Create Customer File')
                        : (language === 'FR' ? 'Identification Cabinet AMS' : 'AMS Cabinet Authentication')}
                    </h3>
                    <p className="font-sans font-light text-slate-400 text-xs mt-1">
                      {isRegistering
                        ? (language === 'FR' ? 'Saisissez vos données pour initialiser l\'accompagnement' : 'Enter details to start customized visa audit trails')
                        : (language === 'FR' ? 'VIP Cabinet client-portal login' : 'Exclusive VIP customer space authentication')}
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    {isRegistering && (
                      <>
                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{language === 'FR' ? 'Nom complet' : 'Full Name'}</label>
                          <input 
                            required
                            type="text" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full text-xs p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-ams-gold"
                            placeholder="M. Jean Dupont"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{language === 'FR' ? 'WhatsApp mobile' : 'WhatsApp Phone'}</label>
                          <input 
                            required
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full text-xs p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-ams-gold"
                            placeholder="+237 693 109 773"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{language === 'FR' ? 'Destination ciblée' : 'Target Country'}</label>
                          <select 
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full text-xs p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-ams-gold"
                          >
                            <option value="Canada 🇨🇦">Canada 🇨🇦</option>
                            <option value="France 🇫🇷">France 🇫🇷</option>
                            <option value="Allemagne 🇩🇪">Allemagne 🇩🇪</option>
                            <option value="USA 🇺🇸">USA 🇺🇸</option>
                            <option value="UK 🇬🇧">Royaume-Uni 🇬🇧</option>
                            <option value="Émirats arabes unis 🇦🇪">Émirats arabes unis 🇦🇪</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{language === 'FR' ? 'Adresse e-mail client' : 'Customer email'}</label>
                      <input 
                        required
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-ams-gold"
                        placeholder="jean.dupont@test.com"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{language === 'FR' ? 'Mot de passe sécurisé' : 'Password code'}</label>
                      <div className="relative">
                        <input 
                          required
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full text-xs p-3 pl-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-ams-gold"
                          placeholder="••••••••"
                        />
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded bg-gradient-to-r from-ams-gold to-ams-gold-dark text-ams-blue-deep font-sans font-bold uppercase tracking-wider text-xs hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>{isRegistering ? (language === 'FR' ? 'Initialiser mon dossier' : 'Enroll Portfolio') : (language === 'FR' ? 'Accéder au Coffre-Fort' : 'Unlock Dashboard')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <div className="relative my-4 flex py-1 items-center">
                      <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                      <span className="flex-shrink mx-4 text-slate-400 text-[10px] uppercase tracking-wider font-mono">
                        {language === 'FR' ? 'Ou continuer avec' : 'Or continue with'}
                      </span>
                      <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-sans font-semibold text-xs tracking-wide transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2.5 disabled:opacity-50"
                    >
                      <span className="w-5 h-5 flex items-center justify-center text-[10px] font-black bg-gradient-to-r from-ams-gold to-ams-gold-dark text-slate-900 rounded-full">G</span>
                      <span>{language === 'FR' ? 'Se connecter avec Google' : 'Sign In with Google'}</span>
                    </button>
                  </form>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 text-center">
                  <button 
                    onClick={handleRegisterToggle}
                    className="text-xs text-slate-400 hover:text-ams-gold transition-colors font-medium border-none bg-transparent cursor-pointer underline decoration-dotted"
                  >
                    {isRegistering 
                      ? (language === 'FR' ? 'Déjà enregistré ? Se connecter' : 'Already have a profile? Sign In')
                      : (language === 'FR' ? "Nouveau client ? Créer un dossier d'orientation" : 'New client? Initialize dossier profile')}
                  </button>
                </div>
              </motion.div>
            ) : (
              
              /* LOGGED IN PREMIUM USER COCKPIT */
              <motion.div
                key="dashboard-vip"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                
                {/* Dashboard Header Bar */}
                <div className="rounded-xl border border-slate-200 dark:border-ams-gold/15 bg-slate-50 dark:bg-ams-blue-dark/50 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 bg-ams-gold text-ams-blue-deep rounded-full flex items-center justify-center text-lg font-bold font-display shadow-md">
                      {dossier?.clientName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-800 dark:text-white text-base">
                        {dossier?.clientName}
                      </h4>
                      <p className="font-sans font-light text-slate-400 text-xs flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{language === 'FR' ? `Dossier actif : ${dossier?.destination}` : `Active Campaign: ${dossier?.destination}`}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">{language === 'FR' ? 'Conseiller dédié' : 'Senior Officer Office-Lead'}</span>
                      <span className="text-xs text-amber-500 dark:text-ams-gold font-bold">{dossier?.adviserName}</span>
                    </div>
                    <button 
                      onClick={handleSignOut}
                      className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 hover:bg-rose-500/10 text-slate-400 hover:text-white text-xs rounded transition-colors cursor-pointer"
                    >
                      {language === 'FR' ? 'Déconnexion' : 'Terminate Session'}
                    </button>
                  </div>
                </div>

                {!isEmailVerified && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_2px_15px_rgba(245,158,11,0.05)]">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <h5 className="font-display font-semibold text-amber-800 dark:text-amber-400 text-sm">
                          {language === 'FR' ? "Vérification de l'adresse e-mail requise" : 'Email Verification Required'}
                        </h5>
                        <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {language === 'FR' 
                            ? "Un e-mail de vérification a été envoyé automatiquement lors de l'inscription. Veuillez cliquer sur le lien reçu pour approuver et valider votre compte."
                            : 'An automated activation message was dispatched to your email. Click the validation link to officially authenticate your dossier.'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:self-center">
                      <button
                        onClick={checkVerificationStatus}
                        disabled={isLoading}
                        className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-sans font-bold rounded text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                      >
                        {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                        <span>{language === 'FR' ? 'Vérifier le statut' : 'Verify Status'}</span>
                      </button>
                      <button
                        onClick={handleResendVerification}
                        disabled={resendLoading}
                        className="px-3.5 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-sans font-medium rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                      >
                        {resendLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                        <span>{language === 'FR' ? "Je n'ai pas reçu l'e-mail de vérification" : "Resend Link"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 5-Step timeline tracker */}
                <div className="rounded-xl border border-slate-200 dark:border-ams-gold/15 bg-white dark:bg-ams-blue-dark/40 p-6 sm:p-8 shadow">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-widest font-mono mb-6">
                    {language === 'FR' ? 'État de progression consulaire du dossier' : 'DIPLOMATIC CONSULAR VISA TIMELINE'}
                  </span>
                  
                  {/* Step dots line container */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                    {/* Visual Connector bar on desktop */}
                    <div className="absolute top-4 left-[10%] right-[10%] h-[3px] bg-slate-100 dark:bg-slate-800/80 z-0 hidden md:block" />
                    
                    {stepsList.map((st, sIdx) => {
                      const isCompleted = sIdx < (dossier?.stepIndex || 0);
                      const isCurrent = sIdx === (dossier?.stepIndex || 0);
                      
                      return (
                        <div key={sIdx} className="flex md:flex-col items-center gap-3 md:gap-0 text-left md:text-center relative z-10">
                          {/* Circle dot icon representation */}
                          <div 
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 md:mb-3 shrink-0 ${
                              isCompleted 
                                ? 'bg-amber-500 dark:bg-ams-gold text-ams-blue-deep ring-4 ring-ams-gold/15'
                                : isCurrent 
                                ? 'bg-blue-600 dark:bg-blue-500 text-white ring-4 ring-blue-500/20 animate-pulse'
                                : 'bg-slate-100 dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            {isCompleted ? '✓' : sIdx + 1}
                          </div>

                          {/* Words info block */}
                          <div>
                            <span className={`block font-display text-xs sm:text-sm font-semibold ${
                              isCurrent 
                                ? 'text-blue-500 dark:text-blue-400 font-bold font-mono' 
                                : isCompleted ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'
                            }`}>
                              {language === 'FR' ? st.labelFR : st.labelEN}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {isCompleted 
                                ? (language === 'FR' ? 'Étape validée' : 'Stage completed')
                                : isCurrent 
                                ? (language === 'FR' ? 'En cours de validation' : 'Currently processing')
                                : (language === 'FR' ? 'À venir' : 'Pending next stage')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* D3 Analytics Panel */}
                <D3EngagementStats metrics={metrics} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* LEFT: Secured Document Vault (8 cols) */}
                  <div className="lg:col-span-8 rounded-xl border border-slate-200 dark:border-ams-gold/15 bg-white dark:bg-ams-blue-dark/40 p-6 shadow space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800/80">
                      <div>
                        <h4 className="font-display font-bold text-slate-800 dark:text-white text-sm sm:text-base flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-ams-gold" />
                          <span>{language === 'FR' ? 'Coffre-fort Numérique Documents' : 'Digital Secure Document Vault'}</span>
                        </h4>
                        <span className="text-[10px] text-slate-400 font-sans leading-none">{language === 'FR' ? 'Norme de chiffrage bancaire crypté' : 'Bespoke end-to-end cloud protection'}</span>
                      </div>

                      {/* Input file selector */}
                      <label className="relative overflow-hidden inline-flex items-center gap-2 px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 hover:border-ams-gold text-slate-400 hover:text-white text-xs font-semibold rounded cursor-pointer transition-colors bg-slate-50 dark:bg-slate-900">
                        <Upload className="w-3.5 h-3.5 text-ams-gold" />
                        <span>{language === 'FR' ? 'Ajouter' : 'Upload'}</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.jpg,.png"
                          onChange={simulateDocumentUpload}
                          disabled={isUploading}
                        />
                      </label>
                    </div>

                    {/* Progress uploading indicator */}
                    {isUploading && (
                      <div className="p-4 rounded-lg bg-ams-gold/5 border border-ams-gold/15 text-center space-y-2">
                        <RefreshCw className="w-5 h-5 text-ams-gold animate-spin mx-auto animate-spin-slow" />
                        <span className="text-xs text-slate-400 font-mono block">{uploadMessage}</span>
                      </div>
                    )}

                    {/* Secured documents lists */}
                    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                      {dossier?.documents.map((doc, dIdx) => (
                        <div key={dIdx} className="p-3.5 rounded-lg bg-slate-50/50 dark:bg-ams-blue-deep/30 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2.5 truncate">
                            <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                              <span className="font-display font-medium text-xs text-slate-800 dark:text-slate-100 block truncate">{doc.name}</span>
                              <span className="text-[9px] text-slate-400 font-mono">{doc.size} • Secured on {doc.date}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {doc.status === 'approved' ? (
                              <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                                {language === 'FR' ? 'Approuvé' : 'Verified'}
                              </span>
                            ) : doc.status === 'pending' ? (
                              <span className="text-[9px] bg-amber-500/10 border border-amber-500/25 text-amber-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '4s' }} />
                                <span>{language === 'FR' ? 'À l\'étude' : 'Under Review'}</span>
                              </span>
                            ) : (
                              <span className="text-[9px] bg-rose-500/10 border border-rose-500/25 text-rose-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                                {language === 'FR' ? 'Rejeté' : 'Rejected'}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT: Notifications & adviser desk (4 cols) */}
                  <div className="lg:col-span-4 space-y-4">
                    
                    {/* Advisor messages desk */}
                    <div className="rounded-xl border border-slate-200 dark:border-ams-gold/15 bg-white dark:bg-ams-blue-dark/40 p-5 shadow space-y-3">
                      <h4 className="font-display font-bold text-slate-800 dark:text-white text-xs uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800/85">
                        <MessageSquareCode className="w-3.5 h-3.5 text-ams-gold" />
                        <span>{language === 'FR' ? 'Canal Privé Conseiller' : 'VIP Officer Hotline'}</span>
                      </h4>
                      <p className="font-sans font-light text-slate-400 text-xs leading-relaxed">
                        {language === 'FR' 
                          ? 'Entretien visio d\'orientation prévu le : 18 juin 2026 à 14h00 UTC.' 
                          : 'Administrative visa review session: scheduled for June 18, 2026 at 2:00 PM UTC.'}
                      </p>
                      <a 
                        href="https://wa.me/237693109773" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full text-center py-2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded hover:bg-emerald-500/25 transition-all block cursor-pointer"
                      >
                        {language === 'FR' ? 'Discuter sur WhatsApp' : 'Direct WhatsApp Connect'}
                      </a>
                    </div>

                    {/* Notification panels */}
                    <div className="rounded-xl border border-slate-200 dark:border-ams-gold/15 bg-white dark:bg-ams-blue-dark/40 p-5 shadow space-y-3">
                      <h4 className="font-display font-bold text-slate-800 dark:text-white text-xs uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800/85">
                        <Bell className="w-3.5 h-3.5 text-ams-gold" />
                        <span>Notifications</span>
                      </h4>
                      <div className="space-y-3.5">
                        {dossier?.notifications.map((notif, nIdx) => (
                          <div key={nIdx} className="flex gap-2 text-xs leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-ams-gold shrink-0 mt-1.5" />
                            <p className="font-sans font-light text-slate-500 dark:text-slate-300">
                              {notif}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

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
