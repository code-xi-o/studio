import { getRoadmapBySlug, roadmaps } from '@/lib/roadmap-data';
import type { Roadmap, RoadmapModule, RoadmapResource } from '@/types/roadmap';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExternalLink, BookOpen, Youtube, FileText, Construction } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const roadmap = getRoadmapBySlug(params.slug);
  if (!roadmap) {
    return {
      title: 'Roadmap Not Found',
    };
  }
  return {
    title: `${roadmap.title} | CODE XI`,
    description: roadmap.description,
  };
}

export async function generateStaticParams() {
  return roadmaps.map((roadmap) => ({
    slug: roadmap.slug,
  }));
}

const ResourceIcon = ({ type }: { type: RoadmapResource['type'] }) => {
  switch (type) {
    case 'article': return <FileText className="h-5 w-5 text-primary mr-2 shrink-0" />;
    case 'video': return <Youtube className="h-5 w-5 text-primary mr-2 shrink-0" />;
    case 'course': return <BookOpen className="h-5 w-5 text-primary mr-2 shrink-0" />;
    case 'tool': return <Construction className="h-5 w-5 text-primary mr-2 shrink-0" />;
    case 'documentation': return <FileText className="h-5 w-5 text-primary mr-2 shrink-0" />;
    default: return <FileText className="h-5 w-5 text-primary mr-2 shrink-0" />;
  }
};

export default function RoadmapPage({ params }: Props) {
  const roadmap = getRoadmapBySlug(params.slug);

  if (!roadmap) {
    notFound();
  }

  const IconComponent = roadmap.icon as any;

  return (
    <div className="space-y-8">
      <section className="text-center py-8 rounded-lg shadow-lg" style={{background: 'linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--accent) / 0.05))'}}>
        {IconComponent && <IconComponent className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />}
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 px-4">{roadmap.title}</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">{roadmap.description}</p>
      </section>

      <Accordion type="multiple" collapsible={false} defaultValue={roadmap.modules.map(m => m.id)} className="w-full space-y-4">
        {roadmap.modules.map((moduleItem) => (
          <AccordionItem value={moduleItem.id} key={moduleItem.id} className="border border-border rounded-lg bg-card/50 shadow-sm">
            <AccordionTrigger className="p-4 sm:p-6 text-xl sm:text-2xl font-semibold hover:text-primary hover:no-underline text-left">
              {moduleItem.title}
            </AccordionTrigger>
            <AccordionContent className="p-4 sm:p-6 pt-0">
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">{moduleItem.description}</p>
              {moduleItem.resources.length > 0 && (
                <>
                  <h4 className="text-lg sm:text-xl font-semibold mb-3 text-foreground/90">Key Resources:</h4>
                  <ul className="space-y-3 sm:space-y-4">
                    {moduleItem.resources.map((resource) => (
                      <li key={resource.id} className="p-3 sm:p-4 border border-border/70 rounded-md hover:bg-muted/50 transition-colors shadow-sm">
                        <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground hover:text-primary group">
                          <ResourceIcon type={resource.type} />
                          <span className="flex-grow font-medium text-sm sm:text-base">{resource.title} <span className="text-xs text-muted-foreground">({resource.type})</span></span>
                          <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-2 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        </Link>
                        {resource.description && <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 ml-7">{resource.description}</p>}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {moduleItem.subModules && moduleItem.subModules.length > 0 && (
                <div className="mt-4 sm:mt-6">
                  <h4 className="text-lg sm:text-xl font-semibold mb-3 text-foreground/90">Further Topics:</h4>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {subModule.subModules.map((subModule) => (
                      <AccordionItem value={subModule.id} key={subModule.id} className="border border-border/50 rounded-md bg-card/30">
                        <AccordionTrigger className="p-3 sm:p-4 text-base sm:text-lg font-medium hover:text-primary hover:no-underline text-left">
                          {subModule.title}
                        </AccordionTrigger>
                        <AccordionContent className="p-3 sm:p-4 pt-0">
                          <p className="text-muted-foreground mb-3 sm:mb-4 text-sm">{subModule.description}</p>
                          {subModule.resources.length > 0 && (
                            <ul className="space-y-2 sm:space-y-3">
                              {subModule.resources.map((resource) => (
                                <li key={resource.id} className="p-2 sm:p-3 border border-border/30 rounded-md hover:bg-muted/30 transition-colors">
                                  <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground hover:text-primary group">
                                    <ResourceIcon type={resource.type} />
                                    <span className="flex-grow text-sm">{resource.title} <span className="text-xs text-muted-foreground">({resource.type})</span></span>
                                    <ExternalLink className="h-4 w-4 ml-2 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                                  </Link>
                                  {resource.description && <p className="text-xs text-muted-foreground mt-1 ml-7">{resource.description}</p>}
                                </li>
                              ))}
                            </ul>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
