'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { SidebarMenu } from './sidebar-menu';
import { Logo } from '../common/logo';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Mobile Header with Menu Button */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-background">
          <Logo />
          <SidebarMenu />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
