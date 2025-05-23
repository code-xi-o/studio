'use client';

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SiteSettings {
  founderName: string;
  coFounderName: string;
  siteName: string;
}

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
}

const defaultSettings: SiteSettings = {
  founderName: 'KISHAN TIWARI',
  coFounderName: 'YUVRAJ SINGH',
  siteName: 'CODE XI',
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider = ({ children }: PropsWithChildren) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedSettings = localStorage.getItem('codepath_siteSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);
  
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('codepath_siteSettings', JSON.stringify(settings));
    }
  }, [settings, isMounted]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = (): SiteSettingsContextType => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};