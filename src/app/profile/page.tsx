'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle, Settings, Shield, Loader2, LogOut, UserCog } from 'lucide-react'; 
import { Progress } from "@/components/ui/progress";

export default function ProfilePage() {
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
     const timer = setTimeout(() => {
      if (!user) {
        router.replace('/login');
      }
      setIsLoading(false);
    }, 100);
     return () => clearTimeout(timer);
  }, [user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-primary" />
         <p className="ml-3 sm:ml-4 text-lg sm:text-xl">Loading Profile...</p>
      </div>
    );
  }
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const userProgress = [
    { roadmap: 'AI/ML', progress: 75, lastAccessed: '2 days ago' },
    { roadmap: 'Web Development', progress: 40, lastAccessed: '5 days ago' },
  ];
  const savedResources = [
    { title: 'Advanced React Patterns', type: 'article', roadmap: 'Web Development' },
    { title: 'Intro to TensorFlow', type: 'course', roadmap: 'AI/ML' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <Card className="shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary/30 to-accent/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="rounded-full border-4 border-background shadow-lg bg-muted flex items-center justify-center h-24 w-24 sm:h-32 sm:w-32 shrink-0">
            <UserCog className="h-16 w-16 sm:h-20 sm:w-20 text-foreground/70" aria-label="Profile model icon" />
          </div>
          <div className="flex-grow text-center sm:text-left">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Welcome, {user.username}!</CardTitle>
            <CardDescription className="text-base sm:text-lg text-foreground/80 mt-1">
              This is your personal dashboard. Track your progress and manage your settings.
              {isAdmin && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground"><Shield className="h-3 w-3 mr-1" />Admin</span>}
            </CardDescription>
          </div>
           <Button onClick={handleLogout} variant="outline" className="w-full sm:w-auto sm:ml-auto self-center sm:self-start mt-4 sm:mt-0">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Your Learning Progress</CardTitle>
            <CardDescription>Overview of your progress in different roadmaps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userProgress.map(item => (
              <div key={item.roadmap}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{item.roadmap}</span>
                  <span className="text-sm text-muted-foreground">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="w-full h-2.5 sm:h-3 [&>div]:bg-primary" aria-label={`${item.roadmap} progress ${item.progress}%`} />
                <p className="text-xs text-muted-foreground mt-1">Last accessed: {item.lastAccessed}</p>
              </div>
            ))}
             {userProgress.length === 0 && <p className="text-muted-foreground">No progress tracked yet. Start a roadmap!</p>}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Account Settings</CardTitle>
            <CardDescription>Manage your account preferences and details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-sm sm:text-base" disabled>
              <UserCircle className="mr-2 h-5 w-5" /> Edit Profile (Coming Soon)
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm sm:text-base" disabled>
              <Settings className="mr-2 h-5 w-5" /> Change Password (Coming Soon)
            </Button>
            {isAdmin && (
              <Button variant="default" className="w-full justify-start bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base" onClick={() => router.push('/admin/dashboard')}>
                <Shield className="mr-2 h-5 w-5" /> Go to Admin Panel
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Saved Resources</CardTitle>
            <CardDescription>Your collection of saved articles, videos, and courses.</CardDescription>
          </CardHeader>
          <CardContent>
            {savedResources.length > 0 ? (
                <ul className="space-y-3">
                {savedResources.map(item => (
                    <li key={item.title} className="p-3 border rounded-md flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
                        <div className="flex-grow">
                            <span className="font-medium text-sm sm:text-base">{item.title}</span>
                            <span className="text-xs text-muted-foreground ml-2 block sm:inline">({item.type} from {item.roadmap})</span>
                        </div>
                        <Button variant="ghost" size="sm" disabled className="self-start sm:self-center">View</Button>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-muted-foreground">You haven't saved any resources yet.</p>
            )}
          </CardContent>
        </Card>
    </div>
  );
}
