
'use client';

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SiteSettings {
  founderName: string;
  founderLocation: string;
  founderInstagram: string;
  coFounderName: string;
  coFounderLocation: string;
  coFounderInstagram: string;
  siteName: string;
}

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
}

const defaultSettings: SiteSettings = {
  founderName: 'KISHAN TIWARI',
  founderLocation: 'Sidhi, India, 486771',
  founderInstagram: '@justkishan_',
  coFounderName: 'YUVRAJ SINGH',
  coFounderLocation: 'Sidhi, India, 486771',
  coFounderInstagram: '@yuvrajsingh_o6',
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
      try {
        const parsedSettings = JSON.parse(storedSettings);
        // Ensure all fields from defaultSettings are present, even if not in localStorage
        // This handles cases where new settings fields are added
        setSettings(prev => ({ ...defaultSettings, ...prev, ...parsedSettings }));
      } catch (error) {
        console.error("Failed to parse site settings from localStorage", error);
        setSettings(defaultSettings); // Fallback to default if parsing fails
      }
    } else {
      setSettings(defaultSettings); // Set default if nothing in localStorage
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

