import { NextRequest } from 'next/server';
import { db, routines, routineItems } from '~/db';
import { eq, and } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { requireUserAuth } from '../../protect-route';
import { handleSuccessResponse } from '../../handle-success-res';
import { handleExpiredSession, handleInvalidRequest } from '../../handle-error-res';
import { bodyParse } from '../../body-parse';

// Schema untuk update routine
const routineUpdateSchema = createInsertSchema(routines).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true
});

// Schema untuk update routine items
// const routineItemUpdateSchema = createInsertSchema(routineItems).omit({
//   id: true,
//   routineId: true,
//   createdAt: true
// });

// GET /api/routines/[id] - Get specific routine with items
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const routineId = params.id;

  return requireUserAuth(req, async (session) => {
    if (session) {
      try {
        // Get routine
        const [routine] = await db
          .select()
          .from(routines)
          .where(and(eq(routines.id, routineId), eq(routines.userId, session.user.id)));

        if (!routine) {
          return handleInvalidRequest('Routine not found');
        }

        // Get routine items
        const items = await db
          .select()
          .from(routineItems)
          .where(eq(routineItems.routineId, routineId))
          .orderBy(routineItems.order);

        const result = {
          ...routine,
          items
        };

        return handleSuccessResponse(result);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return handleInvalidRequest('Failed to fetch routine');
      }
    }

    return handleExpiredSession();
  });
}

// PUT /api/routines/[id] - Update routine and items
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const routineId = params.id;
  const body = await bodyParse(req);

  const { routine: routineData, items: routineItemsData } = body;

  const routineValidation = routineUpdateSchema.safeParse(routineData);
  if (!routineValidation.success) {
    return handleInvalidRequest(routineValidation.error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      try {
        // Verify routine belongs to user
        const [existingRoutine] = await db
          .select()
          .from(routines)
          .where(and(eq(routines.id, routineId), eq(routines.userId, session.user.id)));

        if (!existingRoutine) {
          return handleInvalidRequest('Routine not found');
        }

        // Update routine
        const [updatedRoutine] = await db
          .update(routines)
          .set({
            ...routineValidation.data,
            updatedAt: new Date()
          })
          .where(eq(routines.id, routineId))
          .returning();

        // Handle routine items update
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let updatedItems: any[] = [];
        if (routineItemsData && Array.isArray(routineItemsData)) {
          // Delete existing items
          await db.delete(routineItems).where(eq(routineItems.routineId, routineId));

          // Insert new items
          if (routineItemsData.length > 0) {
            updatedItems = await db
              .insert(routineItems)
              .values(
                routineItemsData.map((item, index) => ({
                  ...item,
                  routineId,
                  order: item.order || index + 1
                }))
              )
              .returning();
          }
        }

        const result = {
          ...updatedRoutine,
          items: updatedItems
        };

        return handleSuccessResponse(result);
      } catch (error) {
        console.error('Error updating routine:', error);
        return handleInvalidRequest('Failed to update routine');
      }
    }

    return handleExpiredSession();
  });
}

// DELETE /api/routines/[id] - Delete routine and all its items
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const routineId = params.id;

  return requireUserAuth(req, async (session) => {
    if (session) {
      try {
        // Verify routine belongs to user
        const [existingRoutine] = await db
          .select()
          .from(routines)
          .where(and(eq(routines.id, routineId), eq(routines.userId, session.user.id)));

        if (!existingRoutine) {
          return handleInvalidRequest('Routine not found');
        }

        // Delete routine (cascade will delete routine items)
        await db.delete(routines).where(eq(routines.id, routineId));

        return handleSuccessResponse({ message: 'Routine deleted successfully' });
      } catch (error) {
        console.error('Error deleting routine:', error);
        return handleInvalidRequest('Failed to delete routine');
      }
    }

    return handleExpiredSession();
  });
}
