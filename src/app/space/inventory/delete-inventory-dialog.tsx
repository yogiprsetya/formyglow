'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DeleteInventoryDialogProps {
  itemId: string;
  itemName: string;
  onDelete: () => void;
  onCancel: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DeleteInventoryDialog({ itemId, itemName, onDelete, onCancel }: DeleteInventoryDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // TODO: Implementasi API call untuk delete
      // const response = await fetch(`/api/inventory/${itemId}`, {
      //   method: 'DELETE'
      // });

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Produk berhasil dihapus dari inventory');
      onDelete();
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      toast.error('Gagal menghapus produk. Silakan coba lagi.');
    } finally {
      setIsDeleting(false);
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
          Apakah Anda yakin ingin menghapus <span className="font-medium">{itemName}</span> dari inventory?
          Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} disabled={isDeleting} className="flex-1">
            Batal
          </Button>

          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="flex-1">
            {isDeleting ? (
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
}
