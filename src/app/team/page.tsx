
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Instagram as InstagramIcon, Users } from 'lucide-react';
import Link from 'next/link';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useEffect } from 'react';

export default function TeamPage() {
  const { settings } = useSiteSettings();

  useEffect(() => {
    document.title = `Meet Our Team | ${settings.siteName || "CODE XI"}`;
  }, [settings.siteName]);

  const formatInstagramUrl = (username?: string) => {
    if (!username) return '#';
    const handle = username.startsWith('@') ? username.substring(1) : username;
    return `https://instagram.com/${handle}`;
  };

  const founderNameIsDefaultOrEmpty = !settings.founderName || settings.founderName === 'KISHAN TIWARI';
  const founderDetailsMissing = !settings.founderLocation && !settings.founderInstagram;
  const showFounderNotAvailable = founderNameIsDefaultOrEmpty && founderDetailsMissing;

  const coFounderNameIsDefaultOrEmpty = !settings.coFounderName || settings.coFounderName === 'YUVRAJ SINGH';
  const coFounderDetailsMissing = !settings.coFounderLocation && !settings.coFounderInstagram;
  const showCoFounderNotAvailable = coFounderNameIsDefaultOrEmpty && coFounderDetailsMissing;

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-8">
      <section className="text-center">
        <Users className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Meet Our Team</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          The people behind {settings.siteName || "CODE XI"}.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <Card className="hover:shadow-accent/20 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-accent">Founder</CardTitle>
            <CardDescription>{settings.founderName || 'N/A'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {settings.founderLocation && (
              <p className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-primary shrink-0" />
                {settings.founderLocation}
              </p>
            )}
            {settings.founderInstagram && (
              <p className="flex items-center text-muted-foreground">
                <InstagramIcon className="h-4 w-4 mr-2 text-primary shrink-0" />
                <Link href={formatInstagramUrl(settings.founderInstagram)} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                  {settings.founderInstagram}
                </Link>
              </p>
            )}
            {showFounderNotAvailable && <p className="text-muted-foreground">Details not available.</p>}
          </CardContent>
        </Card>

        <Card className="hover:shadow-accent/20 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-accent">Co-Founder</CardTitle>
            <CardDescription>{settings.coFounderName || 'N/A'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {settings.coFounderLocation && (
              <p className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-primary shrink-0" />
                {settings.coFounderLocation}
              </p>
            )}
            {settings.coFounderInstagram && (
              <p className="flex items-center text-muted-foreground">
                <InstagramIcon className="h-4 w-4 mr-2 text-primary shrink-0" />
                <Link href={formatInstagramUrl(settings.coFounderInstagram)} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                  {settings.coFounderInstagram}
                </Link>
              </p>
            )}
            {showCoFounderNotAvailable && <p className="text-muted-foreground">Details not available.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
