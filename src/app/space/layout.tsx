import type { Metadata } from 'next';
import { AppLayout } from '~/components/app-shell/app-layout';

export const metadata: Metadata = {
  title: 'FormyGlow - Dashboard',
  description: 'Kelola skincare Anda dengan FormyGlow'
};

export default function SpaceLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
