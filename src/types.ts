/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'FR' | 'EN';
export type Theme = 'light' | 'dark';

export interface ServiceDetail {
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  category: string;
  iconName: string;
  title: string;
  description: string;
  subServices: string[];
  longDescription: string;
  benefits: string[];
}

export interface DestinationItem {
  id: string;
  name: string;
  code: string;
  flag: string;
  bgImage: string;
  description: string;
  details: {
    education: string;
    career: string;
    visa: string;
  };
  keyStats: {
    label: string;
    value: string;
  }[];
  popularCities: string[];
  climate: string;
  processingTime: string;
}

export interface StatsItem {
  value: string;
  numericValue: number;
  label: string;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  avatar: string;
  destination: string;
  flag: string;
  rating: number;
  role: string;
  text: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BookingFormInput {
  fullName: string;
  phone: string;
  email: string;
  country: string;
  projectType: string;
  preferredDate: string;
  message: string;
}

export interface TranslationBundle {
  nav: {
    home: string;
    services: string;
    destinations: string;
    process: string;
    testimonials: string;
    contact: string;
    bookNow: string;
  };
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustPilot: string;
  };
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    learnMore: string;
    close: string;
    benefitsTitle: string;
    includedTitle: string;
    categories: {
      all: string;
      studies: string;
      career: string;
      visas: string;
      integration: string;
    };
  };
  destinations: {
    sectionTitle: string;
    sectionSubtitle: string;
    searchPlaceholder: string;
    allRegions: string;
    popularCities: string;
    processingTime: string;
    climate: string;
    keyStatsTitle: string;
    applyButton: string;
    academicTitle: string;
    careerTitle: string;
    visaTitle: string;
  };
  whyChooseUs: {
    sectionTitle: string;
    sectionSubtitle: string;
    yearsOfExperience: string;
    countriesAvailable: string;
    successRate: string;
    clientsAccompanied: string;
  };
  process: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  testimonials: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  faq: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  booking: {
    sectionTitle: string;
    sectionSubtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    country: string;
    countryPlaceholder: string;
    projectType: string;
    projectPlaceholder: string;
    projectTypes: {
      studies: string;
      career: string;
      visaVisitor: string;
      visaWork: string;
      visaStudent: string;
      other: string;
    };
    preferredDate: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    fieldsRequired: string;
    invalidEmail: string;
    invalidPhone: string;
  };
  footer: {
    tagline: string;
    headquarters: string;
    quickLinks: string;
    legal: string;
    terms: string;
    privacy: string;
    rights: string;
  };
}
