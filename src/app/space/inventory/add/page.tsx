'use client';

import { Button } from '~/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { type AddProductFormData } from '../schema';
import { useInventory } from '~/app/space/inventory/use-inventory';
import { ProductForm } from '../product-form';

export default function AddProductPage() {
  const { addProduct, isSubmitting } = useInventory({ disabled: true });

  const handleSubmit = (data: AddProductFormData) => addProduct(data);

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
          <h1 className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Tambah Produk Baru
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Tambahkan produk skincare baru ke dalam inventory Anda
          </p>
        </div>
      </div>

      <ProductForm
        mode="add"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Tambah Produk"
        submitButtonIcon={<Plus className="h-4 w-4 mr-2" />}
        title="Informasi Produk"
        description="Isi informasi lengkap tentang produk skincare yang ingin ditambahkan"
      />
    </main>
  );
}
