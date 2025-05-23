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
  const [founderName, setFounderName] = useState(settings.founderName);
  const [coFounderName, setCoFounderName] = useState(settings.coFounderName);
  const [siteName, setSiteName] = useState(settings.siteName);
  const { toast } = useToast();

  useEffect(() => {
    setFounderName(settings.founderName);
    setCoFounderName(settings.coFounderName);
    setSiteName(settings.siteName);
  }, [settings]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateSettings({ founderName, coFounderName, siteName });
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
              <Label htmlFor="coFounderName">Co-founder Name</Label>
              <Input
                id="coFounderName"
                type="text"
                value={coFounderName}
                onChange={(e) => setCoFounderName(e.target.value)}
                placeholder="Enter co-founder's name"
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
