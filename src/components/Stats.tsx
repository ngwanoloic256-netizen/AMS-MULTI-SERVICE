/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { translations, getStatsData } from '../data';
import { Users, Globe, Award, ShieldCheck } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Users: <Users className="w-6 h-6 text-ams-gold" />,
  Globe: <Globe className="w-6 h-6 text-ams-gold" />,
  Award: <Award className="w-6 h-6 text-ams-gold" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-ams-gold" />,
};

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const CountUp: React.FC<CounterProps> = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      
      // Easing function
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedRatio = easeOutQuad(progressRatio);

      setCount(Math.floor(easedRatio * end));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-display font-bold text-4xl sm:text-5xl text-ams-blue dark:text-white">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const Stats: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];
  const stats = getStatsData(language);

  // Parse the stats value to obtain appropriate count targets
  const getParsedValue = (val: string) => {
    const num = parseInt(val.replace(/[^0-9]/g, ''), 10);
    const suffix = val.replace(/[0-9,]/g, '');
    return { num, suffix };
  };

  return (
    <section className="relative py-16 bg-white dark:bg-ams-blue-dark border-t border-b border-slate-100 dark:border-slate-800/80 overflow-hidden">
      {/* Light decorative lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-1/4 top-0 w-px h-full bg-slate-300 dark:bg-slate-700" />
        <div className="absolute left-2/4 top-0 w-px h-full bg-slate-300 dark:bg-slate-700" />
        <div className="absolute left-3/4 top-0 w-px h-full bg-slate-300 dark:bg-slate-700" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => {
            const { num, suffix } = getParsedValue(stat.value);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center p-6 rounded-xl glass-panel-light dark:glass-panel border border-slate-100 dark:border-ams-gold/10 hover:border-ams-gold/30 transition-all duration-300 group"
              >
                {/* Icon wrapper */}
                <div className="flex items-center justify-center p-3 rounded-full bg-slate-100 dark:bg-ams-blue-light/5 border border-slate-200 dark:border-slate-800 mb-4 group-hover:scale-110 group-hover:border-ams-gold/40 transition-all duration-300">
                  {ICON_MAP[stat.iconName]}
                </div>

                {/* Animated Stat Value */}
                <span className="flex items-baseline gap-0.5 justify-center mt-1">
                  <CountUp end={num} suffix={suffix} />
                </span>

                {/* Stat label */}
                <p className="font-sans font-medium text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
