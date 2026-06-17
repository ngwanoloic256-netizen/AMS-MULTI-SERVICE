/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'XAF' | 'EUR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (valueInEur: number, showSymbol?: boolean) => string;
  convertPrice: (valueInEur: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Conversion rates relative to EUR (Euro)
// 1 EUR = 655.957 XAF (Fixed parity)
// 1 EUR = 1.10 USD (Approximate mid-market rate)
const RATES = {
  EUR: 1.0,
  XAF: 655.957,
  USD: 1.10,
};

const SYMBOLS = {
  EUR: '€',
  XAF: 'FCFA',
  USD: '$',
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('ams_currency');
    return (saved === 'XAF' || saved === 'EUR' || saved === 'USD') ? (saved as Currency) : 'XAF';
  });

  const setCurrency = (cur: Currency) => {
    setCurrencyState(cur);
    localStorage.setItem('ams_currency', cur);
  };

  const convertPrice = (valueInEur: number): number => {
    return Math.round(valueInEur * RATES[currency]);
  };

  const formatPrice = (valueInEur: number, showSymbol: boolean = true): string => {
    const converted = convertPrice(valueInEur);
    
    // Format with thousand separators
    const formattedNum = new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 0,
    }).format(converted);

    if (!showSymbol) return formattedNum;

    if (currency === 'EUR') {
      return `${formattedNum} €`;
    } else if (currency === 'USD') {
      return `$${formattedNum}`;
    } else {
      return `${formattedNum} FCFA`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
