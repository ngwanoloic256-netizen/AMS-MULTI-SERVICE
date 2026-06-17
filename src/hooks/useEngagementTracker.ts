/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useCallback, useRef } from 'react';

export interface EngagementMetrics {
  pageViews: Record<string, number>;
  timeSpent: Record<string, number>; // in seconds
  interactions: {
    orientationTestsCompleted: number;
    messagesToAI: number;
    opportunityClicks: number;
    documentUploads: number;
    whatsappRedirects: number;
    languageSwitches: number;
    themeSwitches: number;
  };
  conversionFunnel: {
    visited: boolean;             // Step 1: Visited App (100%)
    tested: boolean;              // Step 2: Completed career orientation test
    aiChatted: boolean;           // Step 3: Consulted with AXE-BRIGHT AI
    booked: boolean;              // Step 4: Submitted consultation booking
    dashboardRegistered: boolean;   // Step 5: Created secure dashboard profile
    documentsUploaded: boolean;   // Step 6: Uploaded official dossier documents
  };
  lastActive: string;
}

const STORAGE_KEY = 'axe_bright_engagement_metrics';

const initialMetrics: EngagementMetrics = {
  pageViews: {
    home: 1,
    services: 0,
    offerings: 0,
    academy: 0,
    opportunities: 0,
    portal: 0,
    contact: 0,
  },
  timeSpent: {
    home: 0,
    services: 0,
    offerings: 0,
    academy: 0,
    opportunities: 0,
    portal: 0,
    contact: 0,
  },
  interactions: {
    orientationTestsCompleted: 0,
    messagesToAI: 0,
    opportunityClicks: 0,
    documentUploads: 0,
    whatsappRedirects: 0,
    languageSwitches: 0,
    themeSwitches: 0,
  },
  conversionFunnel: {
    visited: true,
    tested: false,
    aiChatted: false,
    booked: false,
    dashboardRegistered: false,
    documentsUploaded: false,
  },
  lastActive: new Date().toISOString(),
};

export const getStoredMetrics = (): EngagementMetrics => {
  if (typeof window === 'undefined') return initialMetrics;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMetrics));
    return initialMetrics;
  }
  try {
    const parsed = JSON.parse(stored);
    // Deep structural merge to ensure existing metrics aren't broken by schema changes
    return {
      pageViews: { ...initialMetrics.pageViews, ...parsed.pageViews },
      timeSpent: { ...initialMetrics.timeSpent, ...parsed.timeSpent },
      interactions: { ...initialMetrics.interactions, ...parsed.interactions },
      conversionFunnel: { ...initialMetrics.conversionFunnel, ...parsed.conversionFunnel },
      lastActive: parsed.lastActive || new Date().toISOString(),
    };
  } catch (e) {
    console.error('Failed to parse engagement metrics', e);
    return initialMetrics;
  }
};

export const useEngagementTracker = () => {
  const [metrics, setMetrics] = useState<EngagementMetrics>(getStoredMetrics);
  const activeSectionRef = useRef<string>('home');
  const timerRef = useRef<number | null>(null);

  // Sync state to LocalStorage
  const saveMetrics = useCallback((updated: EngagementMetrics) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setMetrics(updated);
  }, []);

  // Track explicit click / interface interactions
  const trackInteraction = useCallback((type: keyof EngagementMetrics['interactions']) => {
    const current = getStoredMetrics();
    current.interactions[type] += 1;
    current.lastActive = new Date().toISOString();

    // Side effects on funnel based on interactions
    if (type === 'orientationTestsCompleted') {
      current.conversionFunnel.tested = true;
    }
    if (type === 'messagesToAI') {
      current.conversionFunnel.aiChatted = true;
    }
    if (type === 'documentUploads') {
      current.conversionFunnel.documentsUploaded = true;
    }

    saveMetrics(current);
  }, [saveMetrics]);

  // Track funnel conversion steps directly
  const trackFunnelStep = useCallback((key: keyof EngagementMetrics['conversionFunnel'], value: boolean = true) => {
    const current = getStoredMetrics();
    current.conversionFunnel[key] = value;
    current.lastActive = new Date().toISOString();
    saveMetrics(current);
  }, [saveMetrics]);

  // Track visual page/section view counts
  const trackPageView = useCallback((section: string) => {
    const mappedSection = section.replace('#', '');
    const current = getStoredMetrics();
    if (current.pageViews[mappedSection] !== undefined) {
      current.pageViews[mappedSection] += 1;
    } else {
      current.pageViews[mappedSection] = 1;
    }
    current.lastActive = new Date().toISOString();
    saveMetrics(current);
  }, [saveMetrics]);

  // Handle active section ticking (time spent)
  useEffect(() => {
    // 1-second interval to tick active section time
    timerRef.current = window.setInterval(() => {
      const current = getStoredMetrics();
      const active = activeSectionRef.current;
      if (current.timeSpent[active] !== undefined) {
        current.timeSpent[active] += 1;
      } else {
        current.timeSpent[active] = 1;
      }
      saveMetrics(current);
    }, 1000);

    // Dynamic scroll section tracking integration
    const sections = ['home', 'services', 'offerings', 'academy', 'opportunities', 'portal', 'contact'];
    const observers = sections.map((sect) => {
      const el = document.getElementById(sect);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeSectionRef.current = sect;
              // Occasionally log section entry visits
              const r = Math.random();
              if (r < 0.1) { // 10% chance to count as an explicit focus view to keep counts realistic
                trackPageView(sect);
              }
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [saveMetrics, trackPageView]);

  return {
    metrics,
    trackInteraction,
    trackFunnelStep,
    trackPageView,
    refreshMetrics: () => setMetrics(getStoredMetrics()),
  };
};
