import RoadmapCard from '@/components/RoadmapCard';
import { roadmaps } from '@/lib/roadmap-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Roadmaps | CodePath Navigator',
  description: 'Browse comprehensive roadmaps for various Computer Science specializations.',
};

export default function RoadmapsPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-2">Explore Our Roadmaps</h1>
        <p className="text-lg text-muted-foreground">
          Choose a path and start your learning journey today.
        </p>
      </section>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {roadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} />
        ))}
      </div>
    </div>
  );
}
