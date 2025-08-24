'use client';

import { Button } from '~/components/ui/button';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useRoutines } from './use-routines';
import { SelectRoutine } from './schema';

interface Props {
  onClose: () => void;
  item: Pick<SelectRoutine, 'id' | 'name'> | null;
}

export const DialogDeleteRoutine = ({ item, onClose }: Props) => {
  const { deleteRoutine, isSubmitting } = useRoutines({ disabled: !item });

  if (!item) return null;

  const cancelDelete = async () => {
    const { success } = await deleteRoutine(item.id);
    if (success) onClose();
  };

  return (
    <Dialog open={!!item} onOpenChange={(state) => !state && onClose()}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
              <AlertTriangle className="size-6 text-red-600 dark:text-red-400" />
            </div>

            <span>Hapus Produk</span>
          </DialogTitle>

          <DialogDescription>
            Apakah Anda yakin ingin menghapus routine <b>{item?.name}</b> ini? Tindakan ini tidak dapat
            dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Batal
          </Button>

          <Button variant="destructive" onClick={cancelDelete} className="flex-1">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
