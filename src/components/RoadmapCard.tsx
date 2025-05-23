import type { Roadmap } from '@/types/roadmap';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface RoadmapCardProps {
  roadmap: Roadmap;
}

export default function RoadmapCard({ roadmap }: RoadmapCardProps) {
  const IconComponent = roadmap.icon as LucideIcon | undefined; // Type assertion

  return (
    <Card className="h-full flex flex-col hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
          {IconComponent && <IconComponent className="h-10 w-10 text-primary" />}
          <CardTitle className="text-2xl">{roadmap.title}</CardTitle>
        </div>
        <CardDescription className="min-h-[3em]">{roadmap.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/roadmaps/${roadmap.slug}`}>
            View Roadmap <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
