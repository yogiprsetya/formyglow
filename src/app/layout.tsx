import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { NextAuthProvider } from '~/components/app-shell/NextAuthProvider';
import { SWRProvider } from '~/components/app-shell/SWRProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FormyGlow - Personal Skincare Management',
  description: 'Your personal skincare assistant for managing products, routines, and tracking progress'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextAuthProvider>
            <SWRProvider>
              <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                {children}
              </div>
            </SWRProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
