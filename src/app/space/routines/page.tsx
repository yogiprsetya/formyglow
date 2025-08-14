'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Input } from '~/components/ui/input';
import { Plus, Clock, Sun, Moon, Star, Edit, Trash2, Play } from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '~/components/common/stat-card';

// Mock data untuk demo
const mockRoutines = [
  {
    id: '1',
    name: 'Morning Glow',
    type: 'morning',
    description: 'Start your day with a fresh, glowing complexion',
    isActive: true,
    items: [
      {
        id: '1',
        product: {
          name: 'Gentle Daily Cleanser',
          brand: 'CeraVe',
          category: 'cleanser'
        },
        order: 1,
        frequency: 'daily',
        notes: 'Gentle cleansing to remove overnight buildup'
      },
      {
        id: '2',
        product: {
          name: 'Vitamin C Serum',
          brand: 'The Ordinary',
          category: 'serum'
        },
        order: 2,
        frequency: 'daily',
        notes: 'Brightening and antioxidant protection'
      },
      {
        id: '3',
        product: {
          name: 'Daily Moisturizing Lotion',
          brand: 'CeraVe',
          category: 'moisturizer'
        },
        order: 3,
        frequency: 'daily',
        notes: 'Hydration and barrier protection'
      },
      {
        id: '4',
        product: {
          name: 'Supergoop Play',
          brand: 'Supergoop',
          category: 'sunscreen'
        },
        order: 4,
        frequency: 'daily',
        notes: 'SPF 50 protection'
      }
    ]
  },
  {
    id: '2',
    name: 'Evening Recovery',
    type: 'evening',
    description: 'Nighttime repair and recovery routine',
    isActive: true,
    items: [
      {
        id: '5',
        product: {
          name: 'Hydrating Facial Cleanser',
          brand: 'CeraVe',
          category: 'cleanser'
        },
        order: 1,
        frequency: 'daily',
        notes: 'Remove makeup and daily grime'
      },
      {
        id: '6',
        product: {
          name: 'Resurfacing Retinol Serum',
          brand: 'CeraVe',
          category: 'serum'
        },
        order: 2,
        frequency: 'alternate',
        notes: 'Anti-aging and cell turnover'
      },
      {
        id: '7',
        product: {
          name: 'PM Facial Moisturizing Lotion',
          brand: 'CeraVe',
          category: 'moisturizer'
        },
        order: 3,
        frequency: 'daily',
        notes: 'Rich night moisturizer'
      }
    ]
  },
  {
    id: '3',
    name: 'Weekly Reset',
    type: 'custom',
    description: 'Weekly deep treatment and exfoliation',
    isActive: false,
    items: [
      {
        id: '8',
        product: {
          name: 'AHA 30% + BHA 2% Peeling Solution',
          brand: 'The Ordinary',
          category: 'exfoliant'
        },
        order: 1,
        frequency: 'weekly',
        notes: 'Chemical exfoliation - use on Sunday evenings'
      },
      {
        id: '9',
        product: {
          name: 'Cicapair Tiger Grass Cream',
          brand: 'Dr. Jart+',
          category: 'moisturizer'
        },
        order: 2,
        frequency: 'weekly',
        notes: 'Soothing and recovery'
      }
    ]
  }
];

const routineTypes = [
  { value: 'morning', label: 'Morning', icon: Sun, color: 'text-amber-600' },
  { value: 'evening', label: 'Evening', icon: Moon, color: 'text-indigo-600' },
  { value: 'custom', label: 'Custom', icon: Star, color: 'text-purple-600' }
];

export default function RoutinesPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to continue</h1>
          <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const filteredRoutines = mockRoutines.filter((routine) => {
    const matchesSearch =
      routine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || routine.type === selectedType;
    const matchesActive = !showActiveOnly || routine.isActive;

    return matchesSearch && matchesType && matchesActive;
  });

  const getRoutineTypeInfo = (type: string) => {
    return routineTypes.find((t) => t.value === type) || routineTypes[2];
  };

  const getRoutineStats = () => {
    const totalRoutines = mockRoutines.length;
    const activeRoutines = mockRoutines.filter((r) => r.isActive).length;
    const totalProducts = mockRoutines.reduce((sum, r) => sum + r.items.length, 0);
    const avgProductsPerRoutine = totalRoutines > 0 ? Math.round(totalProducts / totalRoutines) : 0;

    return { totalRoutines, activeRoutines, totalProducts, avgProductsPerRoutine };
  };

  const stats = getRoutineStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
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
              <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, {session.user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Routines</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Create and manage your personalized skincare routines
              </p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <Link href="/space/routines/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Routine
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard variant="info" title="Total Routines" icon={Clock} stat={stats.totalRoutines} />
          <StatCard variant="success" title="Active Routines" icon={Play} stat={stats.activeRoutines} />
          <StatCard variant="warning" title="Total Products" icon={Star} stat={stats.activeRoutines} />
          <StatCard variant="purple" title="Avg per Routine" icon={Plus} stat={stats.avgProductsPerRoutine} />
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search routines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-slate-800 dark:border-slate-600 text-sm"
                >
                  <option value="all">All Types</option>
                  {routineTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <Button
                  variant={showActiveOnly ? 'default' : 'outline'}
                  onClick={() => setShowActiveOnly(!showActiveOnly)}
                  className="flex items-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Active Only</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Routines Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredRoutines.map((routine) => {
            const typeInfo = getRoutineTypeInfo(routine.type);
            const TypeIcon = typeInfo.icon;

            return (
              <Card key={routine.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <TypeIcon className={`h-5 w-5 ${typeInfo.color}`} />
                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                          {routine.name}
                        </CardTitle>
                        <Badge variant={routine.isActive ? 'default' : 'secondary'} className="ml-auto">
                          {routine.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {routine.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Routine Steps */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">Steps:</h4>
                    {routine.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            {item.order}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.product.brand} • {item.product.category}
                          </p>
                          {item.notes && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.notes}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {item.frequency}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredRoutines.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No routines found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm || selectedType !== 'all' || showActiveOnly
                  ? 'Try adjusting your search or filters'
                  : 'Start building your skincare routines'}
              </p>
              <Button asChild>
                <Link href="/space/routines/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Routine
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
