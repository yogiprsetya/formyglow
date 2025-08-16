'use client';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Plus, Calendar, TrendingUp, Package, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '~/components/common/stat-card';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="space-y-8 px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {session?.user?.name}! ✨
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          Ready to glow? Here&apos;s your skincare overview for today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-4">
        <StatCard variant="info" title="Products in Stock" stat="12" textHelper="+2 from last week" />

        <StatCard variant="success" title="Active Routines" stat="3" textHelper="Morning, Evening, Weekly" />

        <StatCard variant="warning" title="Progress Photos" stat="8" textHelper="Last updated 3 days ago" />

        <StatCard variant="purple" title="Expiring Soon" stat="2" textHelper="Within 30 days" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-indigo-600" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Manage your skincare essentials quickly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/space/inventory">
                <Package className="h-4 w-4 mr-2" />
                Manage Inventory
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/space/routines">
                <Clock className="h-4 w-4 mr-2" />
                View Routines
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/space/progress">
                <TrendingUp className="h-4 w-4 mr-2" />
                Track Progress
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-amber-600" />
              <span>Today&apos;s Routine</span>
            </CardTitle>
            <CardDescription>Your morning skincare routine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Gentle Daily Cleanser</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CeraVe</p>
                </div>
                <Badge variant="secondary">Cleanser</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Vitamin C Serum</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">The Ordinary</p>
                </div>
                <Badge variant="secondary">Serum</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">3</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Daily Moisturizing Lotion
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CeraVe</p>
                </div>
                <Badge variant="secondary">Moisturizer</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Your latest skincare activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Plus className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Added new product to inventory
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Niacinamide 10% + Zinc 1% - 2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Updated progress photo</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Week 4 progress - 1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Modified evening routine</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Added retinol serum - 3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Content untuk Demo Scrolling */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Additional Information</h3>

        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Section {index + 1}</CardTitle>
              <CardDescription>
                This is additional content to demonstrate scrolling functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
