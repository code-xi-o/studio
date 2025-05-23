import type { LucideIcon } from 'lucide-react';

export interface RoadmapResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'course' | 'tool' | 'documentation';
  url: string;
  description?: string;
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  resources: RoadmapResource[];
  subModules?: RoadmapModule[]; // For nested modules
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon?: LucideIcon | string; // Allow string for potential custom SVG paths or emoji
  modules: RoadmapModule[];
}
