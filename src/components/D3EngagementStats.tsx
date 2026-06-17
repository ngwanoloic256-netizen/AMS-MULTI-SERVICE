/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { EngagementMetrics } from '../hooks/useEngagementTracker';
import { BarChart, Zap, Target, HelpCircle, Eye, Activity } from 'lucide-react';

interface D3EngagementStatsProps {
  metrics: EngagementMetrics;
}

export const D3EngagementStats: React.FC<D3EngagementStatsProps> = ({ metrics }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const funnelSvgRef = useRef<SVGSVGElement | null>(null);
  const barSvgRef = useRef<SVGSVGElement | null>(null);

  // Tab state for the engagement chart
  const [activeTab, setActiveTab] = useState<'time' | 'interactions'>('time');

  // Translations
  const t = {
    funnel: {
      title: language === 'FR' ? 'Entonnoir de Conversion Candidat' : 'Candidate Conversion Funnel',
      desc: language === 'FR' ? 'Progression de votre dossier à travers les étapes de qualification consulaire de notre cabinet' : 'Real-time tracking of your profile through our elite qualifications funnel',
      stages: [
        { key: 'visited', labelFR: '1. Navigation Initiale', labelEN: '1. Landing Visit', rate: 100 },
        { key: 'tested', labelFR: '2. Bilan d\'Orientation', labelEN: '2. Carrier Orientation', rate: 75 },
        { key: 'aiChatted', labelFR: '3. Consultation IA', labelEN: '3. AI Advisor Consultation', rate: 55 },
        { key: 'booked', labelFR: '4. Réservation RDV', labelEN: '4. Executive Booking', rate: 35 },
        { key: 'dashboardRegistered', labelFR: '5. Compte Sécurisé', labelEN: '5. Secured Portal Opened', rate: 20 },
        { key: 'documentsUploaded', labelFR: '6. Coffre-fort Activé', labelEN: '6. Official Dossier Filed', rate: 15 },
      ],
      userStatus: language === 'FR' ? 'Votre Position Actuelle' : 'Your Professional Status',
      benchmark: language === 'FR' ? 'Moyenne Cohorte' : 'Cohort Benchmark',
    },
    engagement: {
      title: language === 'FR' ? 'Moniteur d\'Exploration Actif' : 'Active Explorer Analytics',
      desc: language === 'FR' ? 'Analyse en temps réel de votre temps passif et de vos clics d\'engagement par module' : 'Real-time audit of your passive scroll duration & interactive triggers per module',
      toggleTime: language === 'FR' ? 'Durée (Seconds)' : 'Duration (Secs)',
      toggleInteractions: language === 'FR' ? 'Actions / Clics' : 'Actions / Clics',
      hoverTime: language === 'FR' ? 'secondes passées' : 'seconds focused',
      hoverInteractions: language === 'FR' ? 'interactions enregistrées' : 'interactions logged',
      noActivities: language === 'FR' ? 'Aucune action enregistrée pour l\'instant.' : 'No interaction events logged yet.',
    }
  };

  // Determine user's active funnel index
  const getUserFunnelStepIndex = () => {
    const { conversionFunnel } = metrics;
    if (conversionFunnel.documentsUploaded) return 5;
    if (conversionFunnel.dashboardRegistered) return 4;
    if (conversionFunnel.booked) return 3;
    if (conversionFunnel.aiChatted) return 2;
    if (conversionFunnel.tested) return 1;
    return 0; // Visited
  };

  // 1. Draw Funnel Chart using D3
  useEffect(() => {
    if (!funnelSvgRef.current) return;

    // Clear previous drawing
    const svg = d3.select(funnelSvgRef.current);
    svg.selectAll('*').remove();

    const width = 450;
    const height = 320;
    const margin = { top: 30, right: 30, bottom: 20, left: 30 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const userIndex = getUserFunnelStepIndex();
    const data = t.funnel.stages;

    // Scales
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.key))
      .range([0, innerHeight])
      .padding(0.25);

    // Dynamic colors based on active / logged-in status
    const fillColors = {
      dark: {
        completed: '#D4AF37', // Gold glow for completed
        active: '#10B981',    // Emerald green for active target
        pending: '#1E293B',   // Slate dark for pending
        text: '#F8FAFC',
        textMuted: '#94A3B8'
      },
      light: {
        completed: '#B8860B', // Dark goldenrod
        active: '#059669',    // Rich green
        pending: '#F1F5F9',   // Light gray
        text: '#0F172A',
        textMuted: '#64748B'
      }
    };

    const currentColors = theme === 'dark' ? fillColors.dark : fillColors.light;

    // Draw background tracks for visual depth
    g.selectAll('.track-bg')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'track-bg')
      .attr('y', d => yScale(d.key) || 0)
      .attr('x', 0)
      .attr('width', innerWidth)
      .attr('height', yScale.bandwidth())
      .attr('rx', 6)
      .attr('fill', theme === 'dark' ? '#0F172A' : '#F8FAFC')
      .attr('stroke', theme === 'dark' ? '#334155' : '#E2E8F0')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0.5);

    // Draw active conversion bars reflecting benchmark rate, representing funnel shape
    g.selectAll('.funnel-bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'funnel-bar')
      .attr('y', d => yScale(d.key) || 0)
      .attr('x', d => (innerWidth - (innerWidth * (d.rate / 100))) / 2) // Centered funnel effect
      .attr('width', 0) // Start from 0 for animation
      .attr('height', yScale.bandwidth())
      .attr('rx', 6)
      .attr('fill', (d, i) => {
        if (i === userIndex) return currentColors.active;
        return i < userIndex ? currentColors.completed : currentColors.pending;
      })
      .attr('opacity', (d, i) => {
        if (i === userIndex) return 1.0;
        return i < userIndex ? 0.85 : 0.4;
      })
      .transition()
      .duration(800)
      .attr('width', d => innerWidth * (d.rate / 100));

    // Stage text labels
    g.selectAll('.label-text')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label-text')
      .attr('y', d => (yScale(d.key) || 0) + yScale.bandwidth() / 2 + 4)
      .attr('x', 15)
      .attr('fill', currentColors.text)
      .attr('font-size', '10.5px')
      .attr('font-family', 'var(--font-sans)')
      .attr('font-weight', '500')
      .text(d => language === 'FR' ? d.labelFR : d.labelEN);

    // Conversion rate text labels
    g.selectAll('.rate-text')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'rate-text')
      .attr('y', d => (yScale(d.key) || 0) + yScale.bandwidth() / 2 + 4)
      .attr('x', innerWidth - 15)
      .attr('text-anchor', 'end')
      .attr('fill', currentColors.textMuted)
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-mono)')
      .attr('font-weight', 'bold')
      .text(d => `${d.rate}%`);

    // Draw "Status Highlight Line" for the user's step
    const targetY = (yScale(data[userIndex].key) || 0) + yScale.bandwidth() / 2;
    
    // Draw horizontal dashed connection
    g.append('line')
      .attr('x1', 0)
      .attr('y1', targetY)
      .attr('x2', innerWidth)
      .attr('y2', targetY)
      .attr('stroke', currentColors.active)
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '3,3')
      .attr('opacity', 0.85);

    // Draw pulsing user locator node
    g.append('circle')
      .attr('cx', innerWidth / 2)
      .attr('cy', targetY)
      .attr('r', 6)
      .attr('fill', currentColors.active)
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 1.5)
      .attr('class', 'pulse-node')
      .style('cursor', 'pointer');
      
  }, [metrics, language, theme]);

  // 2. Draw active Explorer bar metrics using D3
  useEffect(() => {
    if (!barSvgRef.current) return;

    // Clear previous drawing
    const svg = d3.select(barSvgRef.current);
    svg.selectAll('*').remove();

    const width = 450;
    const height = 320;
    const margin = { top: 25, right: 20, bottom: 40, left: 90 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Dynamic state data formatting
    let chartData: { name: string; value: number }[] = [];

    if (activeTab === 'time') {
      const sectionLabelsFR: Record<string, string> = {
        home: 'Accueil',
        services: 'Expertises',
        offerings: 'Formations',
        academy: 'Bibliothèque',
        opportunities: 'Opportunités',
        portal: 'Espace Client',
        contact: 'Réservation'
      };
      const sectionLabelsEN: Record<string, string> = {
        home: 'Welcome Desk',
        services: 'Expertises',
        offerings: 'Formations',
        academy: 'Academy',
        opportunities: 'Opportunities',
        portal: 'Client Space',
        contact: 'Booking Office'
      };

      chartData = Object.entries(metrics.timeSpent).map(([key, value]) => ({
        name: language === 'FR' ? (sectionLabelsFR[key] || key) : (sectionLabelsEN[key] || key),
        value: value as number,
      }));
    } else {
      const interactionLabelsFR = {
        orientationTestsCompleted: 'Tests Faits',
        messagesToAI: 'Chats Assistant',
        opportunityClicks: 'Clics Candidatures',
        documentUploads: 'Fichiers Envoyés',
        whatsappRedirects: 'Cli. WhatsApp',
        languageSwitches: 'Langues Alt',
        themeSwitches: 'Thèmes Alt'
      };
      const interactionLabelsEN = {
        orientationTestsCompleted: 'Career Assessment',
        messagesToAI: 'AI Chats',
        opportunityClicks: 'Allocs Taps',
        documentUploads: 'Secured Uploads',
        whatsappRedirects: 'WhatsApp Clicks',
        languageSwitches: 'Lang Shifts',
        themeSwitches: 'Theme Swaps'
      };

      chartData = Object.entries(metrics.interactions).map(([key, value]) => ({
        name: language === 'FR' 
          ? (interactionLabelsFR[key as keyof typeof interactionLabelsFR] || key) 
          : (interactionLabelsEN[key as keyof typeof interactionLabelsEN] || key),
        value: value as number,
      }));
    }

    // Set scales
    const yScale = d3.scaleBand()
      .domain(chartData.map(d => d.name))
      .range([0, innerHeight])
      .padding(0.3);

    const maxVal = d3.max(chartData, d => d.value) || 1;
    const xScale = d3.scaleLinear()
      .domain([0, maxVal])
      .range([0, innerWidth]);

    const colors = {
      dark: {
        bar: 'url(#bar-gradient-dark)',
        text: '#F8FAFC',
        textMuted: '#64748B',
        axisLine: '#334155'
      },
      light: {
        bar: 'url(#bar-gradient-light)',
        text: '#0F172A',
        textMuted: '#94A3B8',
        axisLine: '#E2E8F0'
      }
    };

    const currentColors = theme === 'dark' ? colors.dark : colors.light;

    // Define Gradients in SVG Defs
    const defs = svg.append('defs');
    
    // Dark mode purple/gold premium gradient
    const gradientDark = defs.append('linearGradient')
      .attr('id', 'bar-gradient-dark')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    gradientDark.append('stop').attr('offset', '0%').attr('stop-color', '#3B82F6').attr('stop-opacity', '0.6');
    gradientDark.append('stop').attr('offset', '100%').attr('stop-color', '#D4AF37').attr('stop-opacity', '0.9');

    // Light mode blue premium gradient
    const gradientLight = defs.append('linearGradient')
      .attr('id', 'bar-gradient-light')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    gradientLight.append('stop').attr('offset', '0%').attr('stop-color', '#1E3A8A').attr('stop-opacity', '0.7');
    gradientLight.append('stop').attr('offset', '100%').attr('stop-color', '#3B82F6').attr('stop-opacity', '0.9');

    // Add axes
    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale).tickSize(0))
      .select('.domain').remove();

    g.selectAll('.y-axis text')
      .attr('fill', theme === 'dark' ? '#E2E8F0' : '#334155')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-sans)');

    // Add horizontal gridlines
    const xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickSize(-innerHeight)
      .tickFormat(d3.format('d'));

    const xAxisGroup = g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    xAxisGroup.select('.domain')
      .attr('stroke', currentColors.axisLine);

    xAxisGroup.selectAll('.tick line')
      .attr('stroke', currentColors.axisLine)
      .attr('stroke-dasharray', '2,2')
      .attr('opacity', 0.4);

    xAxisGroup.selectAll('.tick text')
      .attr('fill', currentColors.textMuted)
      .attr('font-size', '9px')
      .attr('font-family', 'var(--font-mono)')
      .attr('dy', 10);

    // Draw active bars with animation
    g.selectAll('.engagement-bar')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'engagement-bar')
      .attr('y', d => yScale(d.name) || 0)
      .attr('x', 0)
      .attr('width', 0) // animate from 0
      .attr('height', yScale.bandwidth())
      .attr('rx', 3)
      .attr('fill', currentColors.bar)
      .transition()
      .duration(850)
      .attr('width', d => xScale(d.value));

    // Dynamic numeric displays beside the bars
    g.selectAll('.value-label')
      .data(chartData)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('y', d => (yScale(d.name) || 0) + yScale.bandwidth() / 2 + 3.5)
      .attr('x', d => Math.min(xScale(d.value) + 6, innerWidth - 5))
      .attr('fill', theme === 'dark' ? '#F1F5F9' : '#1E293B')
      .attr('font-size', '9.5px')
      .attr('font-family', 'var(--font-mono)')
      .attr('font-weight', 'semibold')
      .text(d => d.value);

  }, [metrics, language, theme, activeTab]);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-ams-gold/15 bg-white dark:bg-ams-blue-dark/40 p-6 sm:p-8 shadow space-y-6">
      
      {/* Widget Header area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-ams-gold uppercase font-mono text-xs font-semibold tracking-wider">
            <BarChart className="w-4 h-4" />
            <span>{language === 'FR' ? 'Centre d\'Analyse d\'Engagement' : 'Axe-Bright Client telemetry office'}</span>
          </div>
          <h3 className="font-serif italic text-xl sm:text-2xl text-ams-blue dark:text-white mt-1">
            {language === 'FR' ? 'Tableau de Bord de Conversion Personnel' : 'My Career Conversion Dashboard'}
          </h3>
          <p className="text-xs text-slate-400 font-light max-w-xl">
            {language === 'FR' 
              ? 'Visualisation en temps réel de votre score d\'engagement et du diagnostic de votre progression à travers l\'entonnoir d\'immigration'
              : 'Interactive real-time visual telemetry of your active site focus sessions & recruitment funnel steps'}
          </p>
        </div>

        {/* Dynamic score summary */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg shrink-0">
          <div className="p-2 bg-ams-gold/10 text-ams-gold rounded-full">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">{language === 'FR' ? 'Indice de Maturité' : 'Conversion Score'}</span>
            <span className="text-sm font-bold text-slate-800 dark:text-white font-mono">
              {Math.min(100, Math.round(((getUserFunnelStepIndex() + 1) / 6) * 100))}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* FUNNEL CARD (COLUMN 1) */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block uppercase tracking-wide flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-500" />
              <span>{t.funnel.title}</span>
            </span>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {t.funnel.desc}
            </p>
          </div>

          <div className="w-full flex items-center justify-center bg-slate-50/50 dark:bg-ams-blue-deep/30 rounded-xl border border-slate-200 dark:border-slate-800 py-3 relative overflow-hidden">
            <svg 
              ref={funnelSvgRef} 
              width="450" 
              height="320" 
              className="max-w-full h-auto text-slate-200 dark:text-slate-800"
            />
            {/* Ambient visual badge on funnel highlighting user progress */}
            <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.funnel.userStatus}</span>
            </div>
          </div>
        </div>

        {/* EXPLORER BAR CARD (COLUMN 2) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block uppercase tracking-wide flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-blue-500" />
                <span>{t.engagement.title}</span>
              </span>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t.engagement.desc}
              </p>
            </div>

            {/* Selector Toggles */}
            <div className="inline-flex bg-slate-100 dark:bg-slate-900/60 p-0.5 rounded border border-slate-200 dark:border-slate-800 shadow-inner">
              <button
                onClick={() => setActiveTab('time')}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded transition-all cursor-pointer ${
                  activeTab === 'time'
                    ? 'bg-white dark:bg-slate-800 text-ams-blue dark:text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.engagement.toggleTime}
              </button>
              <button
                onClick={() => setActiveTab('interactions')}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded transition-all cursor-pointer ${
                  activeTab === 'interactions'
                    ? 'bg-white dark:bg-slate-800 text-ams-blue dark:text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.engagement.toggleInteractions}
              </button>
            </div>
          </div>

          <div className="w-full flex items-center justify-center bg-slate-50/50 dark:bg-ams-blue-deep/30 rounded-xl border border-slate-200 dark:border-slate-800 py-3 relative overflow-hidden">
            <svg 
              ref={barSvgRef} 
              width="450" 
              height="320" 
              className="max-w-full h-auto text-slate-200 dark:text-slate-800"
            />
            
            {/* Context status tip */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 text-slate-400 text-[10px] font-mono tracking-wide background-transparent">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>
                {activeTab === 'time' 
                  ? (language === 'FR' ? 'Compteur accumulé en temps réel' : 'Real-time clock focus session')
                  : (language === 'FR' ? 'Indicateurs clés de performance d\'engagement' : 'Active engagement event triggers')}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
