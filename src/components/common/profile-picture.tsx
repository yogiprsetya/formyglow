'use client';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { Skeleton } from '../ui/skeleton';

export const ProfilePicture = () => {
  const { data: session } = useSession();

  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={session?.user?.image ?? ''} alt={session?.user?.name || 'User'} />

      <AvatarFallback className="text-xs">
        {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
      </AvatarFallback>
    </Avatar>
  );
};

export const LoadingProfilePicture = () => <Skeleton className="size-8 rounded-full" />;
