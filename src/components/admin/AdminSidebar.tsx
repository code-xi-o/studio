'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, BookOpenText, Settings, Users, LogOut, Palette, Workflow } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { settings } = useSiteSettings();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin'); 
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/dashboard/roadmaps', label: 'Roadmaps', icon: Workflow },
    { href: '/admin/dashboard/settings', label: 'Site Settings', icon: Settings },
    // { href: '/admin/dashboard/users', label: 'Users', icon: Users }, // Example for future
    // { href: '/admin/dashboard/appearance', label: 'Appearance', icon: Palette }, // Example for future
  ];

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground p-4 space-y-6 border-r border-sidebar-border h-full flex flex-col shadow-lg">
      <div>
        <Link href="/admin/dashboard" className="text-2xl font-bold text-primary mb-6 block">
          {settings.siteName} Admin
        </Link>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={`w-full justify-start text-base ${pathname === item.href ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'}`}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="mt-auto">
         <Button
            variant="ghost"
            className="w-full justify-start text-base hover:bg-sidebar-accent/50"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
      </div>
    </aside>
  );
}
