
'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useSiteSettings();
  const [siteName, setSiteName] = useState(settings.siteName);
  const [founderName, setFounderName] = useState(settings.founderName);
  const [founderLocation, setFounderLocation] = useState(settings.founderLocation);
  const [founderInstagram, setFounderInstagram] = useState(settings.founderInstagram);
  const [coFounderName, setCoFounderName] = useState(settings.coFounderName);
  const [coFounderLocation, setCoFounderLocation] = useState(settings.coFounderLocation);
  const [coFounderInstagram, setCoFounderInstagram] = useState(settings.coFounderInstagram);
  const { toast } = useToast();

  useEffect(() => {
    setSiteName(settings.siteName);
    setFounderName(settings.founderName);
    setFounderLocation(settings.founderLocation);
    setFounderInstagram(settings.founderInstagram);
    setCoFounderName(settings.coFounderName);
    setCoFounderLocation(settings.coFounderLocation);
    setCoFounderInstagram(settings.coFounderInstagram);
  }, [settings]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateSettings({ 
      siteName,
      founderName, 
      founderLocation,
      founderInstagram,
      coFounderName,
      coFounderLocation,
      coFounderInstagram,
    });
    toast({
      title: "Settings Updated",
      description: "Site settings have been successfully saved.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Site Settings</h1>
      <Card className="max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Customize Your Site</CardTitle>
          <CardDescription>Update general information about your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name (Brand in Header)</Label>
              <Input
                id="siteName"
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="e.g., CODE XI"
              />
            </div>
            
            <h3 className="text-lg font-semibold pt-4 border-t border-border">Founder Details</h3>
            <div className="space-y-2">
              <Label htmlFor="founderName">Founder Name</Label>
              <Input
                id="founderName"
                type="text"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                placeholder="Enter founder's name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founderLocation">Founder Location</Label>
              <Input
                id="founderLocation"
                type="text"
                value={founderLocation}
                onChange={(e) => setFounderLocation(e.target.value)}
                placeholder="e.g., Sidhi, India, 486771"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founderInstagram">Founder Instagram ID (e.g., @username)</Label>
              <Input
                id="founderInstagram"
                type="text"
                value={founderInstagram}
                onChange={(e) => setFounderInstagram(e.target.value)}
                placeholder="@username"
              />
            </div>

            <h3 className="text-lg font-semibold pt-4 border-t border-border">Co-founder Details</h3>
            <div className="space-y-2">
              <Label htmlFor="coFounderName">Co-founder Name</Label>
              <Input
                id="coFounderName"
                type="text"
                value={coFounderName}
                onChange={(e) => setCoFounderName(e.target.value)}
                placeholder="Enter co-founder's name"
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="coFounderLocation">Co-founder Location</Label>
              <Input
                id="coFounderLocation"
                type="text"
                value={coFounderLocation}
                onChange={(e) => setCoFounderLocation(e.target.value)}
                placeholder="e.g., Sidhi, India, 486771"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coFounderInstagram">Co-founder Instagram ID (e.g., @username)</Label>
              <Input
                id="coFounderInstagram"
                type="text"
                value={coFounderInstagram}
                onChange={(e) => setCoFounderInstagram(e.target.value)}
                placeholder="@username"
              />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
