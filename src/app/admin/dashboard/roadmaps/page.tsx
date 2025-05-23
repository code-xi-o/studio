'use client';

import { roadmaps } from '@/lib/roadmap-data';
import type { Roadmap } from '@/types/roadmap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminRoadmapsPage() {
  const { toast } = useToast();

  const handleEdit = (slug: string) => {
    toast({ title: "Edit Roadmap", description: `Editing for ${slug} is not yet implemented.`, variant: "default" });
  };

  const handleDelete = (slug: string) => {
    toast({ title: "Delete Roadmap", description: `Deletion for ${slug} is not yet implemented.`, variant: "destructive" });
  };
  
  const handleAdd = () => {
    toast({ title: "Add Roadmap", description: `Adding new roadmaps is not yet implemented.`, variant: "default" });
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Roadmaps</h1>
        <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Roadmap
        </Button>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Existing Roadmaps</CardTitle>
          <CardDescription>View and manage current learning roadmaps. (Edit/Delete functionality is a placeholder).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Slug</TableHead>
                  <TableHead className="hidden sm:table-cell">Modules</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roadmaps.map((roadmap: Roadmap) => (
                  <TableRow key={roadmap.id}>
                    <TableCell className="font-medium">{roadmap.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{roadmap.slug}</TableCell>
                    <TableCell className="hidden sm:table-cell">{roadmap.modules.length}</TableCell>
                    <TableCell className="text-right space-x-1 sm:space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(roadmap.slug)}>
                        <Edit className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" /> <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(roadmap.slug)}>
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" /> <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-8 bg-accent/10 border-accent/30">
        <CardHeader>
            <CardTitle className="text-accent text-xl sm:text-2xl">Advanced Customization</CardTitle>
            <CardDescription className="text-accent/80">
                Future enhancements will allow detailed editing of roadmap modules, resources, and their properties directly within this panel.
                This includes adding new content types, reordering items, and managing prerequisites.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-accent/70">Stay tuned for more powerful roadmap management tools!</p>
        </CardContent>
      </Card>
    </div>
  );
}
