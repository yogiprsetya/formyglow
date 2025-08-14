// import { useSession } from 'next-auth/react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Plus, Calendar, TrendingUp, Package, Clock, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '~/components/common/stat-card';

export default function HomePage() {
  // const { data: session, status } = useSession();

  // if (status === 'loading') {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
  //     </div>
  //   );
  // }

  // if (!session) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center space-y-6">
  //         <div className="space-y-2">
  //           <h1 className="text-4xl font-bold text-gray-900 dark:text-white">FormyGlow</h1>
  //           <p className="text-xl text-gray-600 dark:text-gray-300">
  //             Your Personal Skincare Management Assistant
  //           </p>
  //         </div>
  //         <p className="text-gray-500 dark:text-gray-400 max-w-md">
  //           Discover, manage, and track your skincare journey with AI-powered recommendations and ingredient
  //           safety checks.
  //         </p>
  //         <div className="space-y-4">
  //           <Button
  //             asChild
  //             size="lg"
  //             className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
  //           >
  //             <Link href="/auth/signin">Get Started</Link>
  //           </Button>
  //           <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
  //             <div className="flex items-center space-x-2">
  //               <Shield className="h-4 w-4 text-green-500" />
  //               <span>Ingredient Safety</span>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <Sparkles className="h-4 w-4 text-purple-500" />
  //               <span>AI Recommendations</span>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <Heart className="h-4 w-4 text-pink-500" />
  //               <span>Personalized Care</span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">FormyGlow</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src="https://avatars.githubusercontent.com/u/124599?v=4"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">User Name</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, User Name! ✨
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ready to glow? Here&apos;s your skincare overview for today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard variant="info" title="Products in Stock" stat="12" textHelper="+2 from last week" />

          <StatCard
            variant="success"
            title="Active Routines"
            stat="3"
            textHelper="Morning, Evening, Weekly"
          />

          <StatCard variant="warning" title="Progress Photos" stat="8" textHelper="Last updated 3 days ago" />

          <StatCard variant="purple" title="Expiring Soon" stat="2" textHelper="Within 30 days" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                <Link href="/inventory">
                  <Package className="h-4 w-4 mr-2" />
                  Manage Inventory
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/routines">
                  <Clock className="h-4 w-4 mr-2" />
                  View Routines
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/progress">
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
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Modified evening routine
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Added retinol serum - 3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
