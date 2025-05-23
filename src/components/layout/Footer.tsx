'use client';

import { useSiteSettings } from '@/contexts/SiteSettingsContext';

export default function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="border-t border-border mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {settings.siteName || "CODE XI"}. All rights reserved.</p>
        <div className="mt-2 text-sm">
          <p>Founder: {settings.founderName}</p>
          <p>Co-founder: {settings.coFounderName}</p>
        </div>
      </div>
    </footer>
  );
}
