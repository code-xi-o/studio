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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Roadmaps</h1>
        <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Roadmap
        </Button>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Existing Roadmaps</CardTitle>
          <CardDescription>View and manage current learning roadmaps. (Edit/Delete functionality is a placeholder).</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roadmaps.map((roadmap: Roadmap) => (
                <TableRow key={roadmap.id}>
                  <TableCell className="font-medium">{roadmap.title}</TableCell>
                  <TableCell>{roadmap.slug}</TableCell>
                  <TableCell>{roadmap.modules.length}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(roadmap.slug)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(roadmap.slug)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="mt-8 bg-accent/10 border-accent/30">
        <CardHeader>
            <CardTitle className="text-accent">Advanced Customization</CardTitle>
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
