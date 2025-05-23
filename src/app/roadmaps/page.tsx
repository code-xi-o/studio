import RoadmapCard from '@/components/RoadmapCard';
import { roadmaps } from '@/lib/roadmap-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Roadmaps | CODE XI',
  description: 'Browse comprehensive roadmaps for various Computer Science specializations.',
};

export default function RoadmapsPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="text-center pt-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Explore Our Roadmaps</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Choose a path and start your learning journey today.
        </p>
      </section>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {roadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} />
        ))}
      </div>
    </div>
  );
}
