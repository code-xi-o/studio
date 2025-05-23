'use client';

import type { PropsWithChildren} from 'react';
import { useEffect, useState } from 'react'; // Moved useState import to the top
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Loader2 } from 'lucide-react';

export default function AdminDashboardLayout({ children }: PropsWithChildren) {
  const { isAdmin, user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user || !isAdmin) {
        router.replace('/admin');
      }
      setIsLoading(false);
    }, 100); 

    return () => clearTimeout(timer);
  }, [user, isAdmin, router]);

  if (isLoading || !user || !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-background p-4">
        <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-primary" />
        <p className="ml-3 sm:ml-4 text-lg sm:text-xl">Loading Admin Area...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
