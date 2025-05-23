
'use client'; 

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Brain, BookOpen, Search, Users, Loader2 } from 'lucide-react'; 
import Image from 'next/image';
import Link from 'next/link';
import { useSiteSettings } from '@/contexts/SiteSettingsContext'; 
import { useEffect, useState } from 'react';
import type { GenerateHomepageImageOutput} from '@/ai/flows/generate-homepage-image-flow';
import { generateHomepageImage } from '@/ai/flows/generate-homepage-image-flow';


export default function HomePage() {
  const { settings } = useSiteSettings(); 
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  useEffect(() => {
    async function fetchImage() {
      setIsLoadingImage(true);
      try {
        const result: GenerateHomepageImageOutput = await generateHomepageImage();
        setGeneratedImageUrl(result.imageUrl);
      } catch (error) {
        console.error("Failed to generate homepage image:", error);
        setGeneratedImageUrl(null); // Fallback to placeholder if error
      } finally {
        setIsLoadingImage(false);
      }
    }
    fetchImage();
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-16 rounded-xl shadow-2xl" style={{background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))'}}>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Welcome to <span className="text-primary">{settings.siteName || "CODE XI"}</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
          Your ultimate guide to mastering Computer Science. Explore comprehensive roadmaps, get personalized recommendations, and find the resources you need to succeed.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
            <Link href="/roadmaps">
              <span>Explore Roadmaps <ArrowRight className="ml-2 h-5 w-5" /></span>
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/recommendation">
              <span>Get Personalized Plan <Brain className="ml-2 h-5 w-5" /></span>
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/team">
              <span>Meet Our Team <Users className="ml-2 h-5 w-5" /></span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 sm:gap-8">
        <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <CardTitle className="text-xl sm:text-2xl">Curated Roadmaps</CardTitle>
            </div>
            <CardDescription>
              Step-by-step guides for AI/ML, Data Science, Cybersecurity, and Web Development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" asChild className="text-primary p-0">
              <Link href="/roadmaps">
                <span>Learn More <ArrowRight className="ml-1 h-4 w-4" /></span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="h-8 w-8 text-primary" />
              <CardTitle className="text-xl sm:text-2xl">AI Recommendations</CardTitle>
            </div>
            <CardDescription>
              Get a personalized learning path based on your skills and interests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" asChild className="text-primary p-0">
              <Link href="/recommendation">
                <span>Discover Your Path <ArrowRight className="ml-1 h-4 w-4" /></span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <Search className="h-8 w-8 text-primary" />
              <CardTitle className="text-xl sm:text-2xl">Intelligent Search</CardTitle>
            </div>
            <CardDescription>
              Quickly find specific resources and information within the roadmaps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" asChild className="text-primary p-0">
              <Link href="/search">
                <span>Start Searching <ArrowRight className="ml-1 h-4 w-4" /></span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why {settings.siteName || "CODE XI"}?</h2>
            <p className="text-muted-foreground mb-6">
              Navigating the vast world of computer science can be daunting. {settings.siteName || "CODE XI"} simplifies this journey by providing structured learning paths and intelligent tools. Whether you're starting out or looking to specialize, we're here to help you achieve your goals.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center"><ArrowRight className="h-5 w-5 text-primary mr-2" /> Comprehensive and up-to-date content.</li>
              <li className="flex items-center"><ArrowRight className="h-5 w-5 text-primary mr-2" /> AI-powered personalization.</li>
              <li className="flex items-center"><ArrowRight className="h-5 w-5 text-primary mr-2" /> Easy-to-use interface.</li>
            </ul>
          </div>
          <div className="mt-6 md:mt-0">
            {isLoadingImage ? (
              <div className="flex flex-col items-center justify-center w-full h-[400px] bg-muted/30 rounded-lg shadow-xl animate-pulse">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Generating image for your journey...</p>
              </div>
            ) : (
              <Image
                src={generatedImageUrl || "https://placehold.co/600x400.png"} 
                alt="Learning Journey Illustration"
                data-ai-hint="technology education digital art" 
                width={600}
                height={400} 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                unoptimized={!!generatedImageUrl} 
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
