'use client';

import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Package, Calendar, DollarSign, Hash, FileText, Eye } from 'lucide-react';
import Link from 'next/link';
import type { SelectInventory } from './schema';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';

interface Props {
  item?: Partial<SelectInventory>;
  onClose: () => void;
}

export const DialogViewInventory = ({ item, onClose }: Props) => {
  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (dateString: string) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isExpiringSoon = item?.expiryDate ? getDaysUntilExpiry(item.expiryDate) <= 30 : false;

  return (
    <Dialog open={!!item} onOpenChange={(state) => !state && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Produk</DialogTitle>
        </DialogHeader>

        <>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{item?.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">{item?.brand}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="capitalize">
                {item?.skincareTypes}
              </Badge>

              {item?.isOpen && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Eye className="h-3 w-3 mr-1" />
                  Open
                </Badge>
              )}

              {isExpiringSoon && (
                <Badge variant="destructive">
                  <Calendar className="h-3 w-3 mr-1" />
                  Expiring Soon
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">Harga:</span>
                <span className="font-medium">{formatPrice(item?.price ?? 0)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">Ukuran:</span>
                <span className="font-medium">{item?.size}</span>
              </div>

              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">Quantity:</span>
                <span className="font-medium">{item?.quantity}</span>
              </div>
            </div>

            <div className="space-y-3">
              {item?.purchaseDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">Dibeli:</span>
                  <span className="font-medium">{formatDate(item?.purchaseDate)}</span>
                </div>
              )}

              {item?.expiryDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">Kadaluarsa:</span>
                  <span className={`font-medium ${isExpiringSoon ? 'text-red-600' : ''}`}>
                    {formatDate(item.expiryDate)}
                    {isExpiringSoon && ` (${getDaysUntilExpiry(item.expiryDate)} hari lagi)`}
                  </span>
                </div>
              )}

              {item?.openedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">Dibuka:</span>
                  <span className="font-medium">{formatDate(item.openedDate)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {item?.notes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">Catatan:</span>
              </div>
              <div className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 p-3 rounded-lg">
                {item.notes}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" asChild className="flex-1">
              <Link href={`/space/inventory/edit/${item?.id}`}>Edit Produk</Link>
            </Button>

            <Button variant="outline" onClick={onClose} className="flex-1">
              Tutup
            </Button>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};
