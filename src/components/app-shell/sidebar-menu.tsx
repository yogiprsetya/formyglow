'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { Menu, LogOut } from 'lucide-react';
import { LoadingProfilePicture } from '../common/profile-picture';
import dynamic from 'next/dynamic';
import { menuItems } from './sidebar-menu-items';
import { cn } from '~/utils/css';

const ProfilePicture = dynamic(
  () => import('~/components/common/profile-picture').then((m) => m.ProfilePicture),
  {
    ssr: false,
    loading: () => <LoadingProfilePicture />
  }
);

export function SidebarMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    // Implementasi logout sesuai kebutuhan
    console.log('Logout clicked');
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader className="pb-6 flex-row gap-2 space-y-0">
          <ProfilePicture />
          <p className="font-semibold">Personal Space</p>
        </SheetHeader>

        <div className="flex flex-col">
          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    item.href === pathname ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  )}
                >
                  <Icon className="size-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="mt-12">
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
      </SheetContent>
    </Sheet>
  );
}
