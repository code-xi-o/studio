
'use client';

import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import Link from 'next/link'; // Import Link for Instagram URLs

export default function Footer() {
  const { settings } = useSiteSettings();

  const formatInstagramUrl = (username?: string) => {
    if (!username) return '#';
    const handle = username.startsWith('@') ? username.substring(1) : username;
    return `https://instagram.com/${handle}`;
  }

  return (
    <footer className="border-t border-border mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {settings.siteName || "CODE XI"}. All rights reserved.</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-foreground">Founder: {settings.founderName}</p>
            {settings.founderLocation && <p>{settings.founderLocation}</p>}
            {settings.founderInstagram && (
              <p>
                Instagram:{' '}
                <Link href={formatInstagramUrl(settings.founderInstagram)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {settings.founderInstagram}
                </Link>
              </p>
            )}
          </div>
          <div>
            <p className="font-semibold text-foreground">Co-founder: {settings.coFounderName}</p>
            {settings.coFounderLocation && <p>{settings.coFounderLocation}</p>}
            {settings.coFounderInstagram && (
              <p>
                Instagram:{' '}
                <Link href={formatInstagramUrl(settings.coFounderInstagram)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {settings.coFounderInstagram}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
