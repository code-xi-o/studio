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
    case 'article': return <FileText className="h-5 w-5 text-primary mr-2" />;
    case 'video': return <Youtube className="h-5 w-5 text-primary mr-2" />;
    case 'course': return <BookOpen className="h-5 w-5 text-primary mr-2" />;
    case 'tool': return <Construction className="h-5 w-5 text-primary mr-2" />;
    case 'documentation': return <FileText className="h-5 w-5 text-primary mr-2" />;
    default: return <FileText className="h-5 w-5 text-primary mr-2" />;
  }
};

const ModuleDisplay = ({ moduleItem }: { moduleItem: RoadmapModule }) => (
  <Card className="mb-6 bg-card/80 shadow-md">
    <CardHeader>
      <CardTitle className="text-2xl text-primary">{moduleItem.title}</CardTitle>
      <CardDescription>{moduleItem.description}</CardDescription>
    </CardHeader>
    <CardContent>
      {moduleItem.resources.length > 0 && (
        <>
          <h4 className="text-lg font-semibold mb-3 text-foreground/90">Resources:</h4>
          <ul className="space-y-3">
            {moduleItem.resources.map((resource) => (
              <li key={resource.id} className="p-3 border border-border rounded-md hover:bg-muted/50 transition-colors">
                <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground hover:text-primary">
                  <ResourceIcon type={resource.type} />
                  <span className="flex-grow">{resource.title} ({resource.type})</span>
                  <ExternalLink className="h-4 w-4 ml-2 text-muted-foreground" />
                </Link>
                {resource.description && <p className="text-sm text-muted-foreground mt-1 ml-7">{resource.description}</p>}
              </li>
            ))}
          </ul>
        </>
      )}
      {moduleItem.subModules && moduleItem.subModules.length > 0 && (
         <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2 text-foreground/90">Sub-Modules:</h4>
            <Accordion type="single" collapsible className="w-full">
              {moduleItem.subModules.map((subModule) => (
                <AccordionItem value={subModule.id} key={subModule.id} className="border-border">
                  <AccordionTrigger className="text-left hover:text-primary">{subModule.title}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-3">{subModule.description}</p>
                    {subModule.resources.length > 0 && (
                       <ul className="space-y-2">
                        {subModule.resources.map((resource) => (
                          <li key={resource.id} className="p-2 border border-border/50 rounded-md hover:bg-muted/30 transition-colors">
                             <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground hover:text-primary">
                              <ResourceIcon type={resource.type} />
                              <span className="flex-grow">{resource.title} ({resource.type})</span>
                              <ExternalLink className="h-4 w-4 ml-2 text-muted-foreground" />
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
    </CardContent>
  </Card>
);


export default function RoadmapPage({ params }: Props) {
  const roadmap = getRoadmapBySlug(params.slug);

  if (!roadmap) {
    notFound();
  }

  const IconComponent = roadmap.icon as any;

  return (
    <div className="space-y-8">
      <section className="text-center py-8 rounded-lg shadow-lg" style={{background: 'linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--accent) / 0.05))'}}>
        {IconComponent && <IconComponent className="h-16 w-16 text-primary mx-auto mb-4" />}
        <h1 className="text-4xl font-bold mb-2">{roadmap.title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{roadmap.description}</p>
      </section>

      <Accordion type="multiple" collapsible={false} defaultValue={roadmap.modules.map(m => m.id)} className="w-full space-y-4">
        {roadmap.modules.map((moduleItem) => (
          <AccordionItem value={moduleItem.id} key={moduleItem.id} className="border border-border rounded-lg bg-card/50 shadow-sm">
            <AccordionTrigger className="p-6 text-2xl font-semibold hover:text-primary hover:no-underline">
              {moduleItem.title}
            </AccordionTrigger>
            <AccordionContent className="p-6 pt-0">
              <p className="text-muted-foreground mb-6 text-base">{moduleItem.description}</p>
              {moduleItem.resources.length > 0 && (
                <>
                  <h4 className="text-xl font-semibold mb-3 text-foreground/90">Key Resources:</h4>
                  <ul className="space-y-4">
                    {moduleItem.resources.map((resource) => (
                      <li key={resource.id} className="p-4 border border-border/70 rounded-md hover:bg-muted/50 transition-colors shadow-sm">
                        <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground hover:text-primary group">
                          <ResourceIcon type={resource.type} />
                          <span className="flex-grow font-medium">{resource.title} <span className="text-xs text-muted-foreground">({resource.type})</span></span>
                          <ExternalLink className="h-5 w-5 ml-2 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                        {resource.description && <p className="text-sm text-muted-foreground mt-1.5 ml-7">{resource.description}</p>}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {moduleItem.subModules && moduleItem.subModules.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xl font-semibold mb-3 text-foreground/90">Further Topics:</h4>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {moduleItem.subModules.map((subModule) => (
                      <AccordionItem value={subModule.id} key={subModule.id} className="border border-border/50 rounded-md bg-card/30">
                        <AccordionTrigger className="p-4 text-lg font-medium hover:text-primary hover:no-underline">
                          {subModule.title}
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0">
                          <p className="text-muted-foreground mb-4">{subModule.description}</p>
                          {subModule.resources.length > 0 && (
                            <ul className="space-y-3">
                              {subModule.resources.map((resource) => (
                                <li key={resource.id} className="p-3 border border-border/30 rounded-md hover:bg-muted/30 transition-colors">
                                  <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground hover:text-primary group">
                                    <ResourceIcon type={resource.type} />
                                    <span className="flex-grow">{resource.title} <span className="text-xs text-muted-foreground">({resource.type})</span></span>
                                    <ExternalLink className="h-4 w-4 ml-2 text-muted-foreground group-hover:text-primary transition-colors" />
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
