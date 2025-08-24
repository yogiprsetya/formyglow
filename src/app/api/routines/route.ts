import { NextRequest } from 'next/server';
import { db } from '~/db/config';
import { eq, desc, and } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { createMeta } from '../create-meta';
import { requireUserAuth } from '../protect-route';
import { handleSuccessResponse } from '../handle-success-res';
import { handleExpiredSession, handleInvalidRequest } from '../handle-error-res';
import { bodyParse } from '../body-parse';
import z from 'zod';
import { routineItems, routines } from '~/db/schema/routines';

const routineSchema = createInsertSchema(routines).omit({
  userId: true,
  createdAt: true,
  updatedAt: true
});

const routineItemSchema = createInsertSchema(routineItems).omit({
  routineId: true,
  createdAt: true
});

// Schema untuk request body yang berisi routine dan items
const createRoutineSchema = z.object({
  ...routineSchema.shape,
  items: z.array(routineItemSchema).optional()
});

// GET /api/routines - Get all routines for current user
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const params = {
    limit: searchParams.get('limit'),
    page: searchParams.get('page'),
    type: searchParams.get('type') as z.infer<typeof routineSchema>['type'], // morning, evening, custom
    isActive: searchParams.get('isActive') // true, false
  };

  const limitRow = Number(params?.limit || 10);
  const offset = params.page ? (Number(params.page) - 1) * limitRow : 0;

  return requireUserAuth(req, async (session) => {
    if (session) {
      // Build filter conditions
      const filters = [eq(routines.userId, session.user.id)];

      if (params.type) {
        filters.push(eq(routines.type, params.type));
      }

      if (params.isActive !== null && params.isActive !== undefined) {
        filters.push(eq(routines.isActive, params.isActive === 'true'));
      }

      const routinesList = await db
        .select()
        .from(routines)
        .where(and(...filters))
        .orderBy(desc(routines.createdAt))
        .limit(limitRow)
        .offset(offset);

      const meta = await createMeta({
        table: routines,
        limit: limitRow,
        page: Number(params.page || 1),
        query: and(...filters)
      });

      return handleSuccessResponse(routinesList, meta);
    }

    return handleExpiredSession();
  });
}

// POST /api/routines - Create new routine with items
export async function POST(req: NextRequest) {
  const body = await bodyParse(req);
  const { data: payload, success, error } = createRoutineSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  // Extract routine dan items dari data yang sudah divalidasi
  const { items, ...data } = payload;
  const validatedItems: z.infer<typeof routineItemSchema>[] = [];

  if (items && Array.isArray(items)) {
    for (const item of items) {
      validatedItems.push(item);
    }
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      try {
        // Insert routine
        const [newRoutine] = await db
          .insert(routines)
          .values({
            ...data,
            userId: session.user.id
          })
          .returning();

        // Insert routine items jika ada
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let routineItemsResult: any[] = [];

        if (validatedItems.length > 0) {
          routineItemsResult = await db
            .insert(routineItems)
            .values(
              validatedItems.map((item, index) => ({
                ...item,
                routineId: newRoutine.id,
                order: item.order || index + 1
              }))
            )
            .returning();
        }

        // Return routine dengan items
        const result = {
          ...newRoutine,
          items: routineItemsResult
        };

        return handleSuccessResponse(result);
      } catch (error) {
        console.error('Error creating routine:', error);
        return handleInvalidRequest(error instanceof Error ? error.message : 'Failed to create routine');
      }
    }

    return handleExpiredSession();
  });
}
