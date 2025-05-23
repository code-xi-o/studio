'use client';

import { useState, type FormEvent } from 'react';
import { personalizedRoadmapRecommendation, type PersonalizedRoadmapRecommendationOutput } from '@/ai/flows/personalized-roadmap-recommendation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function RecommendationPage() {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [recommendation, setRecommendation] = useState<PersonalizedRoadmapRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await personalizedRoadmapRecommendation({ skills, interests });
      setRecommendation(result);
    } catch (err) {
      console.error("Error getting recommendation:", err);
      setError('Failed to generate recommendation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-2">Personalized Roadmap Recommendation</h1>
        <p className="text-lg text-muted-foreground">
          Let our AI guide you! Tell us your skills and interests, and we'll suggest a learning path.
        </p>
      </section>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center"><Wand2 className="h-6 w-6 mr-2 text-primary"/> Your Learning Profile</CardTitle>
          <CardDescription>Provide your current skills and interests to get a tailored roadmap.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="skills">Current Skills (comma-separated)</Label>
              <Input
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g., Python, Basic JavaScript, Problem Solving"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Interests (comma-separated)</Label>
              <Input
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., Artificial Intelligence, Web Development, Cybersecurity"
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Get Recommendation'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendation && (
        <Card className="mt-8 shadow-xl bg-card/70">
          <CardHeader>
            <CardTitle className="text-primary">Your Personalized Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              readOnly
              value={recommendation.roadmap}
              className="min-h-[200px] bg-muted/50 text-foreground"
              rows={10}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
