'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Input } from '~/components/ui/input';
import { Plus, Clock, Sun, Moon, Star, Edit, Trash2, Play } from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '~/components/common/stat-card';
import { useRoutines } from './use-routines';

const routineTypes = [
  { value: 'morning', label: 'Morning', icon: Sun, color: 'text-amber-600' },
  { value: 'evening', label: 'Evening', icon: Moon, color: 'text-indigo-600' },
  { value: 'custom', label: 'Custom', icon: Star, color: 'text-purple-600' }
];

export default function RoutinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const { routines, isLoading } = useRoutines();

  // const filteredRoutines = routines.filter((routine) => {
  //   const matchesSearch =
  //     routine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     (routine.description && routine.description.toLowerCase().includes(searchTerm.toLowerCase()));
  //   const matchesType = selectedType === 'all' || routine.type === selectedType;
  //   const matchesActive = !showActiveOnly || routine.isActive;

  //   return matchesSearch && matchesType && matchesActive;
  // });

  const getRoutineTypeInfo = (type: string) => {
    return routineTypes.find((t) => t.value === type) || routineTypes[2];
  };

  const getRoutineStats = () => {
    const totalRoutines = routines.length;
    const activeRoutines = routines.filter((r) => r.isActive).length;
    // Note: items count will be 0 since we're not fetching routine items in the list
    const totalProducts = 0;
    const avgProductsPerRoutine = totalRoutines > 0 ? Math.round(totalProducts / totalRoutines) : 0;

    return { totalRoutines, activeRoutines, totalProducts, avgProductsPerRoutine };
  };

  const stats = getRoutineStats();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex md:items-center justify-between max-md:flex-col max-md:gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-4 mb-8">
        <StatCard variant="info" title="Total Routines" icon={Clock} stat={stats.totalRoutines} />
        <StatCard variant="success" title="Active Routines" icon={Play} stat={stats.activeRoutines} />
        <StatCard variant="warning" title="Total Products" icon={Star} stat={stats.totalProducts} />
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

      {/* Loading State */}
      {isLoading && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading routines...</p>
          </CardContent>
        </Card>
      )}

      {/* Routines Grid */}
      {!isLoading && routines.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {routines.map((routine) => {
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
                  {/* Routine Info */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">Routine Info:</h4>
                    <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Type: <span className="font-medium capitalize">{routine.type}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Status:{' '}
                        <span className="font-medium">{routine.isActive ? 'Active' : 'Inactive'}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Created:{' '}
                        <span className="font-medium">
                          {new Date(routine.createdAt ?? '').toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/space/routines/edit/${routine.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
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
      )}

      {/* Empty State */}
      {!isLoading && routines.length === 0 && (
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
  );
}
