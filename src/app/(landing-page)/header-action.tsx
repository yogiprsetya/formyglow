'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';

export const HeaderAction = () => {
  const { status } = useSession();

  if (status === 'loading') {
    return <Skeleton className="w-32 h-10" />;
  }

  return (
    <div className="flex items-center space-x-4">
      {status === 'authenticated' ? (
        <Button asChild variant="miro" className="btn-miro">
          <Link href="/space">My Personal Space</Link>
        </Button>
      ) : (
        <Button asChild variant="outline" className="btn-miro">
          <Link href="/signin">Sign In</Link>
        </Button>
      )}
    </div>
  );
};
