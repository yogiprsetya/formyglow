'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Input } from '~/components/ui/input';
import {
  Plus,
  TrendingUp,
  Camera,
  Heart,
  Edit,
  Trash2,
  Image as ImageIcon,
  Smile,
  Frown,
  Meh
} from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '~/components/common/stat-card';
import dynamic from 'next/dynamic';
import { Skeleton } from '~/components/ui/skeleton';

const Header = dynamic(() => import('../space-header').then((m) => m.SpaceHeader), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-16 sticky top-0 z-50" />
});

// Mock data untuk demo
const mockProgressPhotos = [
  {
    id: '1',
    title: 'Week 1 - Starting Point',
    description: 'Beginning of my skincare journey',
    beforeImageUrl: '/api/placeholder/300/300',
    afterImageUrl: null,
    photoDate: '2024-01-01',
    skinCondition: 'breakout',
    notes: 'Experiencing some acne and uneven texture. Starting with basic routine.'
  },
  {
    id: '2',
    title: 'Week 2 - First Improvements',
    description: 'Starting to see some changes',
    beforeImageUrl: '/api/placeholder/300/300',
    afterImageUrl: '/api/placeholder/300/300',
    photoDate: '2024-01-08',
    skinCondition: 'improving',
    notes: 'Acne is starting to clear up. Skin feels less irritated.'
  },
  {
    id: '3',
    title: 'Week 4 - Significant Progress',
    description: 'Major improvements in texture and tone',
    beforeImageUrl: '/api/placeholder/300/300',
    afterImageUrl: '/api/placeholder/300/300',
    photoDate: '2024-01-22',
    skinCondition: 'good',
    notes: 'Skin is much clearer now. Texture has improved significantly. Feeling more confident!'
  }
];

const mockProgressNotes = [
  {
    id: '1',
    title: 'Feeling Great Today!',
    content:
      'My skin has been responding really well to the new routine. The vitamin C serum is making a noticeable difference in brightness.',
    mood: 'happy',
    skinFeel: 'smooth',
    date: '2024-01-25'
  },
  {
    id: '2',
    title: 'Minor Breakout',
    content:
      'Had a small breakout today, probably from stress. Going to stick to gentle products and avoid over-exfoliating.',
    mood: 'stressed',
    skinFeel: 'irritated',
    date: '2024-01-23'
  },
  {
    id: '3',
    title: 'Product Testing',
    content:
      'Tried the new niacinamide serum today. No immediate reaction, which is good. Will monitor over the next few days.',
    mood: 'excited',
    skinFeel: 'normal',
    date: '2024-01-20'
  }
];

const skinConditions = [
  { value: 'excellent', label: 'Excellent', icon: Smile, color: 'text-green-600' },
  { value: 'good', label: 'Good', icon: Smile, color: 'text-blue-600' },
  { value: 'normal', label: 'Normal', icon: Meh, color: 'text-yellow-600' },
  { value: 'breakout', label: 'Breakout', icon: Frown, color: 'text-red-600' },
  { value: 'dry', label: 'Dry', icon: Frown, color: 'text-orange-600' },
  { value: 'oily', label: 'Oily', icon: Meh, color: 'text-purple-600' }
];

const moods = [
  { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-600' },
  { value: 'excited', label: 'Excited', icon: Heart, color: 'text-pink-600' },
  { value: 'calm', label: 'Calm', icon: Meh, color: 'text-blue-600' },
  { value: 'stressed', label: 'Stressed', icon: Frown, color: 'text-orange-600' },
  { value: 'tired', label: 'Tired', icon: Frown, color: 'text-gray-600' }
];

export default function ProgressPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedMood, setSelectedMood] = useState('all');

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

  const filteredPhotos = mockProgressPhotos.filter((photo) => {
    const matchesSearch =
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = selectedCondition === 'all' || photo.skinCondition === selectedCondition;

    return matchesSearch && matchesCondition;
  });

  const filteredNotes = mockProgressNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = selectedMood === 'all' || note.mood === selectedMood;

    return matchesSearch && matchesMood;
  });

  const getProgressStats = () => {
    const totalPhotos = mockProgressPhotos.length;
    const beforeAfterPhotos = mockProgressPhotos.filter((p) => p.afterImageUrl).length;
    const totalNotes = mockProgressNotes.length;
    const avgMood =
      mockProgressNotes.reduce((sum, n) => {
        const moodValues = { happy: 5, excited: 4, calm: 3, stressed: 2, tired: 1 };
        return sum + (moodValues[n.mood as keyof typeof moodValues] || 3);
      }, 0) / totalNotes;

    return { totalPhotos, beforeAfterPhotos, totalNotes, avgMood: Math.round(avgMood) };
  };

  const stats = getProgressStats();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getConditionInfo = (condition: string) => {
    return skinConditions.find((c) => c.value === condition) || skinConditions[2];
  };

  const getMoodInfo = (mood: string) => {
    return moods.find((m) => m.value === mood) || moods[2];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Progress Tracking</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your skincare journey with photos and notes
              </p>
            </div>
            <div className="flex space-x-3">
              <Button asChild variant="outline">
                <Link href="/space/progress/photo">
                  <Camera className="h-4 w-4 mr-2" />
                  Add Photo
                </Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <Link href="/space/progress/note">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard variant="info" title="Total Photos" icon={Camera} stat={stats.totalPhotos} />
          <StatCard variant="success" title="Before/After" icon={TrendingUp} stat={stats.beforeAfterPhotos} />
          <StatCard variant="warning" title="Progress Notes" icon={Heart} stat={stats.totalNotes} />
          <StatCard variant="purple" title="Avg Mood" icon={Smile} stat={`${stats.avgMood}/5`} />
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search progress entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-slate-800 dark:border-slate-600 text-sm"
                >
                  <option value="all">All Skin Conditions</option>
                  {skinConditions.map((condition) => (
                    <option key={condition.value} value={condition.value}>
                      {condition.label}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-slate-800 dark:border-slate-600 text-sm"
                >
                  <option value="all">All Moods</option>
                  {moods.map((mood) => (
                    <option key={mood.value} value={mood.value}>
                      {mood.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Photos Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Progress Photos</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/space/progress/photo">
                <Camera className="h-4 w-4 mr-2" />
                Add New Photo
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => {
              const conditionInfo = getConditionInfo(photo.skinCondition);
              const ConditionIcon = conditionInfo.icon;

              return (
                <Card key={photo.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                          {photo.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          {photo.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className={`${conditionInfo.color} border-current`}>
                        <ConditionIcon className="h-3 w-3 mr-1" />
                        {conditionInfo.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Photo Placeholder */}
                    <div className="w-full h-48 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>

                    {/* Photo Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Date:</span>
                        <span className="font-medium">{formatDate(photo.photoDate)}</span>
                      </div>
                      {photo.afterImageUrl && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Type:</span>
                          <span className="font-medium text-green-600">Before/After</span>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    {photo.notes && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 p-3 rounded-lg">
                        <p className="font-medium mb-1">Notes:</p>
                        <p>{photo.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        View
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

          {/* Empty State for Photos */}
          {filteredPhotos.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No progress photos found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Start documenting your skincare journey with photos
                </p>
                <Button asChild>
                  <Link href="/space/progress/photo">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Your First Photo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Progress Notes Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Progress Notes</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/space/progress/note">
                <Plus className="h-4 w-4 mr-2" />
                Add New Note
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => {
              const moodInfo = getMoodInfo(note.mood);
              const MoodIcon = moodInfo.icon;
              const skinFeelInfo = getConditionInfo(note.skinFeel);
              const SkinFeelIcon = skinFeelInfo.icon;

              return (
                <Card key={note.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                          {note.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          {formatDate(note.date)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={`${moodInfo.color} border-current`}>
                          <MoodIcon className="h-3 w-3 mr-1" />
                          {moodInfo.label}
                        </Badge>
                        <Badge variant="outline" className={`${skinFeelInfo.color} border-current`}>
                          <SkinFeelIcon className="h-3 w-3 mr-1" />
                          {skinFeelInfo.label}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 p-3 rounded-lg">
                      <p>{note.content}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
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

          {/* Empty State for Notes */}
          {filteredNotes.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No progress notes found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Start documenting your skincare journey with notes
                </p>
                <Button asChild>
                  <Link href="/space/progress/note">
                    <Plus className="h-4 w-4 mr-2" />
                    Write Your First Note
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
