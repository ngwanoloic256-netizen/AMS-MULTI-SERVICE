/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useEngagementTracker } from '../hooks/useEngagementTracker';
import { translations } from '../data';
import { BookingFormInput } from '../types';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  MessageSquare, 
  User, 
  Phone, 
  Mail, 
  Map, 
  Sparkles,
  ClipboardList,
  MessageCircleCode
} from 'lucide-react';

export const BookingForm: React.FC = () => {
  const { language } = useLanguage();
  const { trackInteraction, trackFunnelStep } = useEngagementTracker();
  const t = translations[language];

  // Form input states
  const [formData, setFormData] = useState<BookingFormInput>({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    projectType: 'studies',
    preferredDate: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [localBookings, setLocalBookings] = useState<BookingFormInput[]>([]);

  // Load existing mock bookings from local storage to show a personal dynamic history dashboard
  useEffect(() => {
    const saved = localStorage.getItem('ams_appointments');
    if (saved) {
      try {
        setLocalBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name as keyof BookingFormInput]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormInput, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.booking.fieldsRequired;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t.booking.fieldsRequired;
    } else if (formData.phone.length < 7) {
      newErrors.phone = t.booking.invalidPhone;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.booking.fieldsRequired;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = t.booking.invalidEmail;
      }
    }

    if (!formData.country.trim()) {
      newErrors.country = t.booking.fieldsRequired;
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = t.booking.fieldsRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate luxury API transmission lag
    setTimeout(() => {
      const updatedBookings = [formData, ...localBookings];
      setLocalBookings(updatedBookings);
      localStorage.setItem('ams_appointments', JSON.stringify(updatedBookings));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      trackFunnelStep('booked');
    }, 2200);
  };

  // Trigger click to WhatsApp directly prefilled with booking data for immediate connection
  const handleDirectWhatsApp = () => {
    trackInteraction('whatsappRedirects');
    const textMessage = `Bonjour AXE-BRIGHT, Je m'appelle ${formData.fullName}. J'ai soumis un dossier de mobilité pour l'opportunité : ${formData.country} (${t.booking.projectTypes[formData.projectType as keyof typeof t.booking.projectTypes] || formData.projectType}). Email : ${formData.email}. Téléphone : ${formData.phone}. Pouvons-nous valider notre RDV pour le ${formData.preferredDate} ? Merci.`;
    const escaped = encodeURIComponent(textMessage);
    // standard WhatsApp international API trigger
    const whatsappUrl = `https://wa.me/237693109773?text=${escaped}`; // Dedicated corporate line
    window.open(whatsappUrl, '_blank');
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      country: '',
      projectType: 'studies',
      preferredDate: '',
      message: ''
    });
    setIsSuccess(false);
  };

  return (
    <section id="contact" className="relative py-24 bg-white dark:bg-ams-blue-deep overflow-hidden">
      {/* Absolute visual patterns background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-ams-gold/5 via-transparent to-transparent opacity-40 dark:opacity-75 z-0" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-ams-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ams-gold/10 border border-ams-gold/20 text-ams-gold text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation Privée</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif italic text-3xl sm:text-5xl text-ams-blue dark:text-white tracking-tight leading-tight"
          >
            {t.booking.sectionTitle}
          </motion.h2>
          <p className="font-sans font-light text-slate-400 mt-4 text-base">
            {t.booking.sectionSubtitle}
          </p>
        </div>

        {/* Form and personal dynamic queue Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Main Booking Panel (7 cols or 12 cols if no local bookings) */}
          <div className={`${localBookings.length > 0 ? 'lg:col-span-7' : 'lg:col-span-8 lg:col-start-2'} transition-all duration-300`}>
            <div className="rounded-2xl border border-slate-200 dark:border-ams-gold/15 bg-white dark:bg-ams-blue-dark/50 p-6 sm:p-10 shadow-[0_15px_45px_col-slate-500/5] dark:shadow-[0_15px_45px_rgba(0,0,0,0.3)]">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="booking-form-core"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Two sections: Personal info / Relocation details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Nom complet */}
                      <div className="space-y-1.5">
                        <label htmlFor="fullName" className="font-display font-semibold text-xs tracking-wider uppercase text-slate-600 dark:text-slate-350 block">
                          {t.booking.fullName} *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-3 rounded-lg border text-sm bg-slate-50/50 dark:bg-ams-blue-deep/60 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ams-gold transition-colors ${
                              errors.fullName 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-slate-200 dark:border-slate-800'
                            }`}
                            placeholder={t.booking.fullNamePlaceholder}
                          />
                        </div>
                        {errors.fullName && (
                          <span className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.fullName}
                          </span>
                        )}
                      </div>

                      {/* Téléphone WhatsApp */}
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="font-display font-semibold text-xs tracking-wider uppercase text-slate-600 dark:text-slate-355 block">
                          {t.booking.phone} *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-3 rounded-lg border text-sm bg-slate-50/50 dark:bg-ams-blue-deep/60 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ams-gold transition-colors ${
                              errors.phone 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-slate-200 dark:border-slate-800'
                            }`}
                            placeholder={t.booking.phonePlaceholder}
                          />
                        </div>
                        {errors.phone && (
                          <span className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      {/* E-mail */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="font-display font-semibold text-xs tracking-wider uppercase text-slate-600 dark:text-slate-355 block">
                          {t.booking.email} *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-3 rounded-lg border text-sm bg-slate-50/50 dark:bg-ams-blue-deep/60 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ams-gold transition-colors ${
                              errors.email 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-slate-200 dark:border-slate-800'
                            }`}
                            placeholder={t.booking.emailPlaceholder}
                          />
                        </div>
                        {errors.email && (
                          <span className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </span>
                        )}
                      </div>

                      {/* Pays de destination */}
                      <div className="space-y-1.5">
                        <label htmlFor="country" className="font-display font-semibold text-xs tracking-wider uppercase text-slate-600 dark:text-slate-355 block">
                          {t.booking.country} *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Map className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            name="country"
                            id="country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-3 rounded-lg border text-sm bg-slate-50/50 dark:bg-ams-blue-deep/60 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ams-gold transition-colors ${
                              errors.country 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-slate-200 dark:border-slate-800'
                            }`}
                            placeholder={t.booking.countryPlaceholder}
                          />
                        </div>
                        {errors.country && (
                          <span className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.country}
                          </span>
                        )}
                      </div>

                      {/* Nature du Projet Type dropdown */}
                      <div className="space-y-1.5">
                        <label htmlFor="projectType" className="font-display font-semibold text-xs tracking-wider uppercase text-slate-600 dark:text-slate-355 block">
                          {t.booking.projectType} *
                        </label>
                        <select
                          name="projectType"
                          id="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="block w-full px-3 py-3 border border-slate-200 dark:border-slate-800 rounded-lg text-sm bg-white dark:bg-ams-blue-deep/60 focus:outline-none focus:ring-2 focus:ring-ams-gold text-slate-700 dark:text-white"
                        >
                          <option value="studies">{t.booking.projectTypes.studies}</option>
                          <option value="career">{t.booking.projectTypes.career}</option>
                          <option value="visaVisitor">{t.booking.projectTypes.visaVisitor}</option>
                          <option value="visaWork">{t.booking.projectTypes.visaWork}</option>
                          <option value="visaStudent">{t.booking.projectTypes.visaStudent}</option>
                          <option value="other">{t.booking.projectTypes.other}</option>
                        </select>
                      </div>

                      {/* Date d'entretien */}
                      <div className="space-y-1.5">
                        <label htmlFor="preferredDate" className="font-display font-semibold text-xs tracking-wider uppercase text-slate-600 dark:text-slate-355 block">
                          {t.booking.preferredDate} *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="preferredDate"
                            id="preferredDate"
                            required
                            aria-label="Preferred consultation date"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className={`block w-full px-3 py-[10px] rounded-lg border text-sm bg-slate-50/50 dark:bg-ams-blue-deep/60 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ams-gold text-slate-700 dark:text-white transition-colors ${
                              errors.preferredDate 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-slate-200 dark:border-slate-800'
                            }`}
                          />
                        </div>
                        {errors.preferredDate && (
                          <span className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.preferredDate}
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Expression des besoins message box */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="font-display font-semibold text-xs tracking-wider uppercase text-slate-600 dark:text-slate-355 block">
                        {t.booking.message}
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 text-slate-400">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          name="message"
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded-lg text-sm bg-slate-50/50 dark:bg-ams-blue-deep/60 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ams-gold text-slate-700 dark:text-white transition-colors"
                          placeholder={t.booking.messagePlaceholder}
                        />
                      </div>
                    </div>

                    {/* Form submit button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2.5 py-4 rounded bg-gradient-to-r from-ams-gold to-ams-gold-dark text-ams-blue-deep font-display font-bold tracking-wider uppercase text-xs sm:text-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-ams-blue-deep border-t-transparent rounded-full animate-spin" />
                            <span>{t.booking.submitting}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{t.booking.submit}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </motion.form>
                ) : (
                  /* Success Notification message panel */
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6 space-y-6"
                  >
                    <div className="inline-flex items-center justify-center p-3.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                      <CheckCircle className="w-12 h-12" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                        {t.booking.successTitle}
                      </h3>
                      <p className="font-sans font-light text-slate-500 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                        {t.booking.successMessage}
                      </p>
                    </div>

                    {/* Quick direct Action: WhatsApp redirection integration */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                      {/* WhatsApp trigger */}
                      <button
                        onClick={handleDirectWhatsApp}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-semibold text-xs tracking-wider uppercase shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer"
                      >
                        <MessageCircleCode className="w-4 h-4" />
                        <span>Contacter WhatsApp Direct</span>
                      </button>

                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-ams-blue-deep hover:bg-slate-50 text-slate-500 dark:text-slate-400 font-sans font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                      >
                        <span>Faire un autre projet</span>
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* SIDE COLUMN: Dynamic Local Bookings Personal Dashboard Queue (5 cols) */}
          {localBookings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 flex flex-col justify-between"
            >
              <div className="rounded-2xl border border-slate-200 dark:border-ams-gold/15 bg-white dark:bg-ams-blue-dark/30 p-6 shadow-sm flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <ClipboardList className="w-5 h-5 text-ams-gold" />
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-ams-blue dark:text-white tracking-wide">
                        {language === 'FR' ? 'Vos consultations' : 'Your Relocations'}
                      </h4>
                      <p className="font-sans font-normal text-[10px] text-slate-400 uppercase tracking-widest">
                        Queue locale active
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mt-6 max-h-[300px] overflow-y-auto pr-1">
                    {localBookings.map((bk, bIdx) => (
                      <div key={bIdx} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-ams-blue-deep/30 space-y-2 relative overflow-hidden">
                        {/* Status tag */}
                        <span className="absolute top-4 right-4 bg-amber-100 dark:bg-amber-500/10 border border-amber-500/15 font-mono text-[9px] font-bold text-amber-500 px-1.5 py-0.5 rounded uppercase">
                          Pending
                        </span>

                        <span className="font-display font-bold text-sm text-slate-800 dark:text-white block pr-14 truncate">
                          {bk.fullName}
                        </span>

                        <p className="font-sans font-normal text-xs text-slate-400 space-y-0.5">
                          <span className="block">{t.booking.country} : <strong className="text-slate-500 dark:text-slate-200">{bk.country}</strong></span>
                          <span className="block">Type : <strong className="text-slate-500 dark:text-slate-200">{t.booking.projectTypes[bk.projectType as keyof typeof t.booking.projectTypes] || bk.projectType}</strong></span>
                          <span className="block">Entretien : <strong className="text-slate-500 dark:text-slate-200">{bk.preferredDate}</strong></span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs font-sans text-slate-400 mt-6 lg:mt-0">
                  {language === 'FR'
                    ? "Besoin d'aide immédiate ? Contactez un auditeur au (+237) 693 10 97 73"
                    : 'Emergency advisory needed? Contact an auditor at (+237) 693 10 97 73'}
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};
