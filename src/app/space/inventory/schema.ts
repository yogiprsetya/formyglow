import { z } from 'zod';
import { skincareTypesEnum, inventory } from '~/db/schema/inventory';
import { type InferSelectModel } from 'drizzle-orm';

// Schema untuk form add product
export const addProductFormSchema = z.object({
  name: z.string().min(1, 'Nama produk harus diisi'),
  brand: z.string().min(1, 'Brand harus diisi'),
  size: z.string().min(1, 'Ukuran harus diisi'),
  price: z.number().min(1, 'Harga harus diisi angka'),
  quantity: z.number().min(1, 'Quantity harus diisi angka'),
  skincareTypes: z.enum(skincareTypesEnum.enumValues),
  purchaseDate: z.string().optional(),
  expiryDate: z.string().optional(),
  openedDate: z.string().optional(),
  isOpen: z.boolean().default(false),
  notes: z.string().optional()
});

// Type inference
export type AddProductFormData = z.infer<typeof addProductFormSchema>;
export type SelectInventory = InferSelectModel<typeof inventory>;
