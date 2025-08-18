'use client';

import { Button } from '~/components/ui/button';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { useInventory } from './use-inventory';
import type { SelectInventory } from './schema';

interface Props {
  item: Pick<SelectInventory, 'id' | 'name'>;
  onCancel: () => void;
}

export const DialogDeleteInventory = ({ item, onCancel }: Props) => {
  const { deleteProduct, isSubmitting } = useInventory();

  const handleDelete = async () => {
    const { success } = await deleteProduct(item.id);

    if (success) {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hapus Produk</h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Apakah Anda yakin ingin menghapus <b>{item.name}</b> dari inventory? Tindakan ini tidak dapat
          dibatalkan.
        </p>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting} className="flex-1">
            Batal
          </Button>

          <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting} className="flex-1">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
