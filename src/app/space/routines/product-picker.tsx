'use client';

import { Package, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { useInventory } from '../inventory/use-inventory';
import { Dispatch, FC, SetStateAction } from 'react';
import { Badge } from '~/components/ui/badge';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { SelectInventory } from '../inventory/schema';
import { CreateRoutineFormData, CreateRoutineItem } from './schema';

type NewItem = Pick<CreateRoutineItem, 'frequency' | 'notes' | 'repeatOn'>;

type Props = {
  isOpen: boolean;
  onClose: (state: boolean) => void;
  newItem: NewItem;
  setNewItem: Dispatch<SetStateAction<NewItem>>;
};

export const ProductPicker: FC<Props> = ({ isOpen, onClose, newItem, setNewItem }) => {
  const { data, isLoading, setSearchKeyword, keyword } = useInventory({ disabled: !isOpen });

  const { control, trigger } = useFormContext<CreateRoutineFormData>();

  const { fields, append } = useFieldArray({
    control,
    name: 'items'
  });

  const addItem = (product: SelectInventory) => {
    const item = {
      id: Date.now().toString(),
      product: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.skincareTypes || 'cleanser'
      },
      order: fields.length + 1,
      frequency: newItem.frequency,
      notes: newItem.notes || '',
      repeatOn: newItem.frequency === 'weekly' ? newItem.repeatOn || [] : []
    };
    console.log(item);

    append(item);

    // Reset new item form
    setNewItem({
      frequency: 'daily',
      notes: '',
      repeatOn: []
    });

    onClose(false);
    trigger('items');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(state) => onClose(state)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pilih Produk dari Inventory</DialogTitle>
        </DialogHeader>

        <div>
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

              <Input
                placeholder="Cari produk berdasarkan nama, brand, atau kategori..."
                value={keyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Memuat inventory...</p>
            </div>
          ) : data?.data?.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Produk tidak ditemukan
              </h3>

              <p className="text-gray-500 dark:text-gray-400">
                {keyword
                  ? 'Coba sesuaikan kata kunci pencarian'
                  : 'Inventory Anda kosong. Tambahkan beberapa produk terlebih dahulu!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {data?.data?.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors cursor-pointer"
                  onClick={() => addItem(product)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{product.name}</h4>

                    <Badge variant="outline" className="text-xs">
                      {product.skincareTypes}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{product.brand}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Ukuran: {product.size}</span>
                    <span>Qty: {product.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
