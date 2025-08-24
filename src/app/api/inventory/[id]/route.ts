import { NextRequest } from 'next/server';
import { db } from '~/db/config';
import { eq } from 'drizzle-orm';
import { createUpdateSchema } from 'drizzle-zod';
import { requireUserAuth } from '../../protect-route';
import { handleSuccessResponse } from '../../handle-success-res';
import { handleDataNotFound, handleExpiredSession, handleInvalidRequest } from '../../handle-error-res';
import { bodyParse } from '../../body-parse';
import { inventory } from '~/db/schema/inventory';

const schema = createUpdateSchema(inventory);

type Params = {
  params: Promise<{ id: string }>;
};

// GET /api/inventory/[id] - Get specific inventory item
export async function GET(req: NextRequest, context: Params) {
  const { id } = await context.params;

  return requireUserAuth(req, async (session) => {
    if (session) {
      const inventoryItems = await db.select().from(inventory).where(eq(inventory.id, id)).limit(1);
      return handleSuccessResponse(inventoryItems[0]);
    }

    return handleExpiredSession();
  });
}

// PUT /api/inventory/[id] - Update inventory item
export async function PUT(req: NextRequest, context: Params) {
  const { id } = await context.params;
  const body = await bodyParse(req);
  const { data, success, error } = schema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      const updatedInventory = await db
        .update(inventory)
        .set({
          ...data,
          updatedAt: new Date()
        })
        .where(eq(inventory.id, id))
        .returning();

      return handleSuccessResponse(updatedInventory[0]);
    }

    return handleExpiredSession();
  });
}

// DELETE /api/inventory/[id] - Delete inventory item
export async function DELETE(req: NextRequest, context: Params) {
  const { id } = await context.params;

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db.delete(inventory).where(eq(inventory.id, id)).returning();

      if (!result.length) return handleDataNotFound();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
}
