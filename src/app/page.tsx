import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Brain, BookOpen, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-16 rounded-xl shadow-2xl" style={{background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))'}}>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Welcome to <span className="text-primary">CODE XI</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
          Your ultimate guide to mastering Computer Science. Explore comprehensive roadmaps, get personalized recommendations, and find the resources you need to succeed.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
            <Link href="/roadmaps">
              Explore Roadmaps <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/recommendation">
              Get Personalized Plan <Brain className="ml-2 h-5 w-5" />
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
              <Link href="/roadmaps">Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
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
              <Link href="/recommendation">Discover Your Path <ArrowRight className="ml-1 h-4 w-4" /></Link>
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
              <Link href="/search">Start Searching <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why CODE XI?</h2>
            <p className="text-muted-foreground mb-6">
              Navigating the vast world of computer science can be daunting. CODE XI simplifies this journey by providing structured learning paths and intelligent tools. Whether you're starting out or looking to specialize, we're here to help you achieve your goals.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center"><ArrowRight className="h-5 w-5 text-primary mr-2" /> Comprehensive and up-to-date content.</li>
              <li className="flex items-center"><ArrowRight className="h-5 w-5 text-primary mr-2" /> AI-powered personalization.</li>
              <li className="flex items-center"><ArrowRight className="h-5 w-5 text-primary mr-2" /> Easy-to-use interface.</li>
            </ul>
          </div>
          <div className="mt-6 md:mt-0">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Learning Journey"
              data-ai-hint="technology education"
              width={600}
              height={400}
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
