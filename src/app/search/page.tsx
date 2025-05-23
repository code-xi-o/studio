'use client';

import { useState, type FormEvent } from 'react';
import { intelligentResourceSearch, type IntelligentResourceSearchOutput, type IntelligentResourceSearchInput } from '@/ai/flows/intelligent-resource-search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search as SearchIcon, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { roadmaps } from '@/lib/roadmap-data'; 
import Link from 'next/link';

export default function IntelligentSearchPage() {
  const [query, setQuery] = useState('');
  const [selectedRoadmap, setSelectedRoadmap] = useState('');
  const [results, setResults] = useState<IntelligentResourceSearchOutput['results'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedRoadmap) {
      setError("Please select a roadmap to search within.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const input: IntelligentResourceSearchInput = { query, roadmap: selectedRoadmap };
      const searchOutput = await intelligentResourceSearch(input);
      setResults(searchOutput.results);
    } catch (err) {
      console.error("Error performing search:", err);
      setError('Failed to perform search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 px-4">
      <section className="text-center pt-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Intelligent Resource Search</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Find specific resources within our roadmaps using AI-powered search.
        </p>
      </section>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-xl sm:text-2xl"><SearchIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary"/> Search Parameters</CardTitle>
          <CardDescription>Enter your query and select a roadmap to search within.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="query">Search Query</Label>
              <Input
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'Intro to Neural Networks in Python'"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roadmap">Roadmap</Label>
              <Select onValueChange={setSelectedRoadmap} value={selectedRoadmap}>
                <SelectTrigger id="roadmap" className="w-full">
                  <SelectValue placeholder="Select a roadmap" />
                </SelectTrigger>
                <SelectContent>
                  {roadmaps.map((roadmap) => (
                    <SelectItem key={roadmap.id} value={roadmap.title}>
                      {roadmap.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search Resources'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && (
        <Card className="mt-8 shadow-xl bg-card/70">
          <CardHeader>
            <CardTitle className="text-primary text-xl sm:text-2xl">Search Results</CardTitle>
            <CardDescription>{results.length > 0 ? `Found ${results.length} relevant resources.` : "No resources found matching your query."}</CardDescription>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <ul className="space-y-4">
                {results.map((result, index) => (
                  <li key={index} className="p-3 sm:p-4 border border-border rounded-md hover:bg-muted/50 transition-colors">
                    <Link href={result.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-base sm:text-lg text-foreground hover:text-primary flex justify-between items-center group">
                      {result.title}
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
                    <Link href={result.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 block break-all">
                      {result.url}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">No results matched your criteria. Try a different query or roadmap.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
