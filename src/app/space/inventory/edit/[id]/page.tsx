'use client';

import { Button } from '~/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { type AddProductFormData } from '../../schema';
import { useInventory } from '../../use-inventory';
import { useParams } from 'next/navigation';
import { useProduct } from '../../use-product';
import { ProductForm } from '../../product-form';
import { Loader2 } from 'lucide-react';

export default function EditProductPage() {
  const params = useParams();

  const productId = params.id as string;

  const { updateProduct, isSubmitting } = useInventory({ disabled: true });
  const { product, isLoading, error } = useProduct(productId);

  const handleSubmit = (data: AddProductFormData) => updateProduct(productId, data);

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

  if (error || !product) {
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

      <ProductForm
        mode="edit"
        initialData={{
          name: product.name,
          brand: product.brand,
          skincareTypes: product.skincareTypes || 'cleanser',
          price: product.price,
          size: product.size,
          quantity: product.quantity,
          purchaseDate: product.purchaseDate || '',
          expiryDate: product.expiryDate || '',
          openedDate: product.openedDate || '',
          isOpen: product.isOpen || false,
          notes: product.notes || ''
        }}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Simpan Perubahan"
        submitButtonIcon={<Save className="h-4 w-4 mr-2" />}
        title="Edit Informasi Produk"
        description="Ubah informasi produk skincare yang ingin diedit"
      />
    </main>
  );
}
