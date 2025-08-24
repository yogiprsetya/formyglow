import { InferSelectModel } from 'drizzle-orm';
import { z } from 'zod';
import { inventory } from '~/db/schema/inventory';
import {
  routineFrequencyEnum,
  routineItems,
  routines,
  routineTypeEnum,
  dayOfWeekEnum
} from '~/db/schema/routines';

export const createRoutineFormSchema = z.object({
  name: z.string().min(1, 'Nama routine harus diisi'),
  type: z.enum(routineTypeEnum.enumValues),
  description: z.string().optional(),
  isActive: z.boolean(),
  items: z
    .array(
      z.object({
        id: z.string(),
        product: z.object({
          id: z.string(),
          name: z.string(),
          brand: z.string(),
          category: z.string()
        }),
        order: z.number(),
        frequency: z.enum(routineFrequencyEnum.enumValues),
        notes: z.string().optional(),
        repeatOn: z.array(z.enum(dayOfWeekEnum.enumValues)).optional()
      })
    )
    .min(1, 'Minimal harus ada 1 produk')
});

// Schema untuk form edit routine item
export const editRoutineItemFormSchema = z.object({
  order: z.number().min(1, 'Urutan harus diisi'),
  frequency: z.enum(routineFrequencyEnum.enumValues),
  repeatOn: z.array(z.string()).optional(),
  notes: z.string().optional()
});

export type CreateRoutineFormData = z.infer<typeof createRoutineFormSchema>;
export type EditRoutineItemFormData = z.infer<typeof editRoutineItemFormSchema>;
export type CreateRoutineItem = CreateRoutineFormData['items'][number];

type Routine = InferSelectModel<typeof routines>;
type RoutineItem = InferSelectModel<typeof routineItems> & {
  product: InferSelectModel<typeof inventory>;
};

export interface SelectRoutine extends Routine {
  items: RoutineItem[];
}
