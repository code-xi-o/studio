'use client';

import type { PropsWithChildren} from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Loader2 } from 'lucide-react';

export default function AdminDashboardLayout({ children }: PropsWithChildren) {
  const { isAdmin, user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give AuthContext time to load from localStorage
    const timer = setTimeout(() => {
      if (!user || !isAdmin) {
        router.replace('/admin');
      }
      setIsLoading(false);
    }, 100); // Adjust delay if needed, or use a more robust loading state from AuthContext

    return () => clearTimeout(timer);
  }, [user, isAdmin, router]);

  if (isLoading || !user || !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl">Loading Admin Area...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}

// Need to import useState
import { useState } from 'react';
