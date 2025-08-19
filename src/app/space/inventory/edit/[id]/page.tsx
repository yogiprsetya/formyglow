'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '~/components/ui/form';
import {
  ArrowLeft,
  Save,
  Calendar,
  Package,
  DollarSign,
  Hash,
  FileText,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { addProductFormSchema, type AddProductFormData } from '../../schema';
import { useInventory } from '~/app/space/inventory/use-inventory';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { categories } from '../../constant';

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { getProductById, updateProduct, isSubmitting, isLoading } = useInventory({ disabled: true });
  const [isProductNotFound, setProductNotFound] = useState(false);

  const form = useForm({
    resolver: zodResolver(addProductFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      brand: '',
      skincareTypes: 'cleanser',
      price: 0,
      size: '',
      quantity: 0,
      purchaseDate: '',
      expiryDate: '',
      openedDate: '',
      isOpen: false,
      notes: ''
    }
  });

  useEffect(() => {
    const fetchProduct = async () => {
      getProductById(productId)
        .then((res) => {
          if (res.success && res.data) {
            form.reset({
              name: res.data.name,
              brand: res.data.brand,
              skincareTypes: res.data.skincareTypes ?? 'cleanser',
              price: res.data.price,
              size: res.data.size,
              quantity: res.data.quantity,
              purchaseDate: res.data.purchaseDate ?? '',
              expiryDate: res.data.expiryDate ?? '',
              openedDate: res.data.openedDate ?? '',
              isOpen: res.data.isOpen ?? false,
              notes: res.data.notes ?? ''
            });
          }
        })
        .catch(() => setProductNotFound(true));
    };

    fetchProduct();
  }, [productId, getProductById, form]);

  const onSubmit = async (data: AddProductFormData) => {
    const { success } = await updateProduct(productId, data);

    if (success) {
      // Redirect to inventory page after successful update
      window.location.href = '/space/inventory';
    }
  };

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Memuat data produk...</span>
          </div>
        </div>
      </main>
    );
  }

  if (isProductNotFound) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Produk tidak ditemukan</h1>
          <Button asChild>
            <Link href="/space/inventory">Kembali ke Inventory</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/space/inventory">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Inventory
            </Link>
          </Button>
        </div>

        <div>
          <h1 className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white mb-2">Edit Produk</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Edit informasi produk skincare dalam inventory Anda
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="md:size-5 size-4" />
            Edit Informasi Produk
          </CardTitle>

          <CardDescription>Ubah informasi produk skincare yang ingin diedit</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Product Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Produk *</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Gentle Daily Cleanser" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand *</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: CeraVe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skincareTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>

                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga (dalam angka) *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                          <Input
                            placeholder="1500"
                            className="pl-10"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Masukkan harga dalam angka (contoh: 15 untuk $15.00)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ukuran *</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: 236ml" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="1"
                            className="pl-10"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Pembelian</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input type="date" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Kadaluarsa</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input type="date" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="openedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Dibuka</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input type="date" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="isOpen"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="flex items-center gap-2">
                          {field.value ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          Produk sudah dibuka
                        </FormLabel>
                        <FormDescription>Centang jika produk sudah dibuka dan digunakan</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Catatan
                      </FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-slate-800 dark:border-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Tambahkan catatan tentang produk (opsional)..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-6">
                <Button type="button" variant="outline" asChild disabled={isSubmitting}>
                  <Link href="/space/inventory">Batal</Link>
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Perubahan
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
