import { z } from 'zod';
import { dayOfWeekEnum, routineFrequencyEnum } from '~/db/index';

// Validasi schema untuk routine item
export const routineItemValidationSchema = z
  .object({
    routineId: z.string(),
    inventoryId: z.string(),
    order: z.number().int().positive(),
    frequency: z.enum(routineFrequencyEnum.enumValues),
    repeatOn: z.enum(dayOfWeekEnum.enumValues).optional(),
    notes: z.string().optional()
  })
  .refine(
    (data) => {
      // Jika frequency adalah 'weekly', maka repeatOn harus ada
      if (data.frequency === 'weekly') {
        return data.repeatOn !== undefined;
      }
      return true;
    },
    {
      message: "repeatOn is required when frequency is 'weekly'",
      path: ['repeatOn']
    }
  );

export type RoutineItemInput = z.infer<typeof routineItemValidationSchema>;
