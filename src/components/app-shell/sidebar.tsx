'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { LogOut } from 'lucide-react';
import { Logo } from '../common/logo';
import { menuItems } from './sidebar-menu-items';
import { cn } from '~/utils/css';

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // Implementasi logout sesuai kebutuhan
    console.log('Logout clicked');
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-background border-r min-h-screen">
      {/* Header */}
      <div className="p-6 border-b">
        <Logo />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                item.href === pathname ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
