'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { Home, BookOpen, Search as SearchIcon, UserCircle, LogIn, LogOut, Shield, Settings, Brain } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, isAdmin, logout } = useAuth();
  const { settings } = useSiteSettings();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl sm:text-3xl font-bold text-primary">
          {settings.siteName || "CODE XI"}
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-1 sm:gap-2">
              <Home size={18} /> <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/roadmaps" className="flex items-center gap-1 sm:gap-2">
              <BookOpen size={18} /> <span className="hidden sm:inline">Roadmaps</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/search" className="flex items-center gap-1 sm:gap-2">
              <SearchIcon size={18} /> <span className="hidden sm:inline">Search</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/recommendation" className="flex items-center gap-1 sm:gap-2">
               <Brain size={18} /> <span className="hidden sm:inline">Recommend</span>
            </Link>
          </Button>

          {isAdmin && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/dashboard" className="flex items-center gap-1 sm:gap-2">
                <Shield size={18} /> <span className="hidden sm:inline">Admin</span>
              </Link>
            </Button>
          )}

          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profile" className="flex items-center gap-1 sm:gap-2">
                  <UserCircle size={18} /> <span className="hidden sm:inline">Profile</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-1 sm:gap-2">
                <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login" className="flex items-center gap-1 sm:gap-2">
                <LogIn size={18} /> <span className="hidden sm:inline">Login</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
