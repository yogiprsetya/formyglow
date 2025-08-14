import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FormyGlow - Dashboard',
  description: 'Kelola skincare Anda dengan FormyGlow'
};

export default function SpaceLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
