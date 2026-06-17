/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AMSLogoProps {
  className?: string;
  horizontal?: boolean;
  forceLightColor?: boolean;
}

export const AMSLogo: React.FC<AMSLogoProps> = ({ className = 'h-12 w-auto', forceLightColor = false }) => {
  const lightGroupClass = forceLightColor ? 'hidden' : 'dark:hidden';
  const darkGroupClass = forceLightColor ? 'block' : 'hidden dark:block';

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <svg
        viewBox="0 0 350 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none"
      >
        <defs>
          {/* Blue gradient for AMS text */}
          <linearGradient id="amsLetterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-color-blue-dark" stopColor="#1E3A8A" />
            <stop offset="60%" className="stop-color-blue-medium" stopColor="#1D4ED8" />
            <stop offset="100%" className="stop-color-blue-deep" stopColor="#0F172A" />
          </linearGradient>

          {/* Golden curve gradient */}
          <linearGradient id="amsGoldSwooshGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b58d1b" />
            <stop offset="30%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#f5e4a3" />
            <stop offset="70%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b58d1b" />
          </linearGradient>

          {/* Subtitle blue color or light grey */}
          <linearGradient id="amsSubtitleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>

          {/* Filter for glowing effects */}
          <filter id="softGlow" x="-5%" y="-5%" width="110%" height="110%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic group that adapts its color based on context class */}
        <g className={lightGroupClass}>
          {/* Main letters with customized stylish shape */}
          <text
            x="50%"
            y="105"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, 'SF Pro Display', 'Inter', sans-serif"
            fontWeight="950"
            fontSize="54"
            letterSpacing="-1.5"
            fill="url(#amsLetterGradient)"
            className="select-none tracking-tighter"
          >
            AXE-BRIGHT
          </text>
        </g>

        {/* Dark Mode Version of Letters (uses vivid high contrast white-gold highlight) */}
        <g className={darkGroupClass}>
          <text
            x="50%"
            y="105"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, 'SF Pro Display', 'Inter', sans-serif"
            fontWeight="950"
            fontSize="54"
            letterSpacing="-1.5"
            fill="#FFFFFF"
            className="select-none tracking-tighter"
          >
            AXE-BRIGHT
          </text>
        </g>

        {/* The elegant Golden Crescent sweeping arc curve */}
        {/* Starting narrow at left-bottom (22, 126), arching smoothly downward to right (328, 126) */}
        <path
          d="M 22,126 Q 175,98 328,126 Q 175,116 22,126 Z"
          fill="url(#amsGoldSwooshGradient)"
          className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
        />

        {/* Subtitles text strictly following user logo image */}
        <g className={lightGroupClass}>
          <text
            x="50%"
            y="156"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, 'SF Pro Display', 'Futura', sans-serif"
            fontWeight="800"
            fontSize="21"
            letterSpacing="3"
            fill="#0F172A"
          >
            HOLDING SARL
          </text>
        </g>

        <g className={darkGroupClass}>
          <text
            x="50%"
            y="156"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, 'SF Pro Display', 'Futura', sans-serif"
            fontWeight="800"
            fontSize="21"
            letterSpacing="3"
            fill="#E2E8F0"
          >
            HOLDING SARL
          </text>
        </g>
      </svg>
    </div>
  );
};
