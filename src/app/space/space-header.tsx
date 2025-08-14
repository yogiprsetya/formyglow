'use client';

import { Clock } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export const SpaceHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>

              <span className="text-xl font-bold text-gray-900 dark:text-white">FormyGlow</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={session?.user?.image ?? ''} alt={session?.user?.name || 'User'} />

              <AvatarFallback className="text-xs">
                {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};
