'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpenText, Settings, Users, Workflow } from 'lucide-react';

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome, {user?.username || 'Admin'}!</CardTitle>
          <CardDescription>This is your CODE XI admin dashboard. Manage roadmaps, site settings, and more.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow">
          <CardHeader>
            <Workflow className="h-10 w-10 text-primary mb-3" />
            <CardTitle>Manage Roadmaps</CardTitle>
            <CardDescription>View, edit, or add new learning roadmaps.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/admin/dashboard/roadmaps">Go to Roadmaps</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow">
          <CardHeader>
            <Settings className="h-10 w-10 text-primary mb-3" />
            <CardTitle>Site Settings</CardTitle>
            <CardDescription>Customize site name, founder details, etc.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/admin/dashboard/settings">Go to Settings</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Example for future expansion */}
        {/* <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow">
          <CardHeader>
            <Users className="h-10 w-10 text-primary mb-3" />
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage registered users.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled asChild className="w-full">
              <Link href="#">Go to Users (Coming Soon)</Link>
            </Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
