'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useForm, useFieldArray, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { ArrowLeft, Save, Package, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createRoutineFormSchema, CreateRoutineItem, type CreateRoutineFormData } from '../../schema';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { dayOfWeekOptions, routineFrequencyOptions, routineTypeOptions } from '../../constant';
import { useRoutines } from '../../use-routines';
import { useRoutineData } from '../../use-routine';
import dynamic from 'next/dynamic';

type NewItem = Pick<CreateRoutineItem, 'frequency' | 'notes' | 'repeatOn'>;

const ProductPicker = dynamic(() => import('../../product-picker').then((m) => m.ProductPicker), {
  ssr: false
});

const ListedProduct = dynamic(() => import('../../listed-product').then((m) => m.ListedProduct), {
  ssr: false
});

export default function EditRoutinePage() {
  const params = useParams();
  const routineId = params.id as string;

  const { updateRoutine, isLoading: isUpdating } = useRoutines();
  const { routine, routineError, isLoadingRoutine } = useRoutineData(routineId);

  const [showProductPicker, setShowProductPicker] = useState(false);

  const [newItem, setNewItem] = useState<NewItem>({
    frequency: 'daily',
    notes: ''
  });

  const formMethod = useForm<CreateRoutineFormData>({
    resolver: zodResolver(createRoutineFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      type: 'evening',
      description: '',
      isActive: true,
      items: []
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset
  } = formMethod;

  const { fields } = useFieldArray({
    control,
    name: 'items'
  });

  // Load routine data into form when data is fetched
  useEffect(() => {
    if (routine && routine.items && !isDirty) {
      const formData: CreateRoutineFormData = {
        name: routine.name,
        type: routine.type,
        description: routine.description || '',
        isActive: routine.isActive ?? true,
        items: routine.items.map((item) => ({
          id: item.id,
          product: {
            id: item.id,
            name: item.product?.name || 'Unknown Product',
            brand: item.product?.brand || 'Unknown Brand',
            category: item.product?.skincareTypes || 'Unknown Category'
          },
          order: item.order,
          frequency: item.frequency || 'daily',
          notes: item.notes || '',
          repeatOn: item.repeatOn || []
        }))
      };

      reset(formData);
    }
  }, [routine, reset, isDirty]);

  const onSubmit = async (data: CreateRoutineFormData) => {
    try {
      await updateRoutine(routineId, data);
    } catch (error) {
      console.error('Error updating routine:', error);
      // Error handling is already done in the hook
    }
  };

  if (isLoadingRoutine) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
            <p className="text-gray-600 dark:text-gray-400">Memuat data routine...</p>
          </div>
        </div>
      </main>
    );
  }

  if (routineError) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error Memuat Routine</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Terjadi kesalahan saat memuat data routine. Silakan coba lagi.
          </p>
          <Button asChild>
            <Link href="/space/routines">Kembali ke Daftar Routine</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!routine) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Routine Tidak Ditemukan</h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Routine yang Anda cari tidak dapat ditemukan atau telah dihapus.
          </p>

          <Button asChild>
            <Link href="/space/routines">Kembali ke Daftar Routine</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/space/routines">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Routines
            </Link>
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Edit Routine</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Edit routine &quot;{routine.name}&quot; sesuai kebutuhan Anda
          </p>
        </div>
      </div>

      <FormProvider {...formMethod}>
        <form key={isDirty ? 'dirty' : 'clean'} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
              <CardDescription>Edit informasi dasar routine Anda</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Routine *</Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="name"
                        placeholder="e.g., Morning Glow, Evening Recovery"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                    )}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Routine</Label>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {routineTypeOptions.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Jelaskan routine Anda dan manfaatnya..."
                      rows={3}
                    />
                  )}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={field.value}
                      onChange={field.onChange}
                      className="rounded border-gray-300"
                    />
                  )}
                />
                <Label htmlFor="isActive">Set sebagai routine aktif</Label>
              </div>
            </CardContent>
          </Card>

          {/* Add Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produk Routine</CardTitle>
              <CardDescription>Edit produk dalam routine Anda sesuai urutan penggunaan</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Product Picker Button */}
              <div className="rounded-lg p-4 bg-gray-50 dark:bg-slate-900">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Pilih Produk dari Inventory</h4>

                  <Button
                    type="button"
                    onClick={() => setShowProductPicker(true)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Lihat Inventory
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frekuensi</Label>
                    <Select
                      value={newItem.frequency}
                      onValueChange={(value: 'daily' | 'weekly') =>
                        setNewItem((prev) => ({
                          ...prev,
                          frequency: value
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {routineFrequencyOptions.map((freq) => (
                          <SelectItem key={freq.value} value={freq.value}>
                            {freq.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Catatan Default (Opsional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Instruksi khusus atau catatan..."
                      value={newItem.notes}
                      onChange={(e) => setNewItem((prev) => ({ ...prev, notes: e.target.value }))}
                      rows={2}
                    />
                  </div>
                </div>

                {/* Repeated On Input for Weekly Frequency */}
                {newItem.frequency === 'weekly' && (
                  <div className="space-y-2">
                    <Label htmlFor="repeatedOn">Diulang Pada</Label>
                    <ToggleGroup
                      type="multiple"
                      value={newItem.repeatOn}
                      onValueChange={(value) =>
                        setNewItem((prev) => ({
                          ...prev,
                          repeatedOn: value as CreateRoutineItem['repeatOn']
                        }))
                      }
                      className="justify-start"
                      variant="outline"
                      size="lg"
                    >
                      {dayOfWeekOptions.map((day) => (
                        <ToggleGroupItem key={day.value} value={day.value}>
                          {day.label.substring(0, 3)}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </div>
                )}
              </div>

              <ListedProduct />

              {errors.items && <p className="text-sm text-red-500">{errors.items.message}</p>}
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" asChild>
              <Link href="/space/routines">Batal</Link>
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || isUpdating || fields.length === 0}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting || isUpdating ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>
        </form>

        <ProductPicker
          isOpen={showProductPicker}
          newItem={newItem}
          setNewItem={setNewItem}
          onClose={setShowProductPicker}
        />
      </FormProvider>
    </main>
  );
}
