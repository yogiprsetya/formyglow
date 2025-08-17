import { NextRequest } from 'next/server';
import { db, inventory } from '~/db';
import { eq, desc, ilike, and } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { createMeta } from '../create-meta';
import { requireUserAuth } from '../protect-route';
import { handleSuccessResponse } from '../handle-success-res';
import { handleExpiredSession, handleInvalidRequest } from '../handle-error-res';
import { bodyParse } from '../body-parse';

const schema = createInsertSchema(inventory).omit({ userId: true });

function sanitizeDate(input: string | null | undefined): string | undefined {
  if (!input || input.trim() === '') {
    return undefined; // Drizzle converts undefined to NULL
  }
  return input;
}

// GET /api/inventory - Get all inventory items for current user
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const params = {
    limit: searchParams.get('limit'),
    keyword: searchParams.get('keyword'),
    page: searchParams.get('page'),
    sort: searchParams.get('sort') // expiryDate | createdAt | purchaseDate
  };

  let sortedBy = desc(inventory.createdAt);

  const limitRow = Number(params?.limit || 10);
  const searchCodition = params.keyword ? ilike(inventory.name, `%${params.keyword}%`) : undefined;
  const offset = params.page ? (Number(params.page) - 1) * limitRow : 0;
  const queryFilter = and(searchCodition);
  const sort = params.sort || 'createdAt';

  if (sort === 'expiryDate') {
    sortedBy = desc(inventory.expiryDate);
  }

  if (sort === 'purchaseDate') {
    sortedBy = desc(inventory.purchaseDate);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      const inventoryItems = await db
        .select()
        .from(inventory)
        .where(eq(inventory.userId, session.user.id))
        .orderBy(sortedBy)
        .offset(offset);

      const meta = await createMeta({
        table: inventory,
        limit: limitRow,
        page: Number(params.page || 1),
        query: queryFilter
      });

      return handleSuccessResponse(inventoryItems[0], meta);
    }

    return handleExpiredSession();
  });
}

// POST /api/inventory - Create new inventory item
export async function POST(req: NextRequest) {
  const body = await bodyParse(req);
  const { data, success, error } = schema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .insert(inventory)
        .values({
          ...data,
          purchaseDate: sanitizeDate(data.purchaseDate),
          expiryDate: sanitizeDate(data.expiryDate),
          openedDate: sanitizeDate(data.openedDate),
          userId: session.user.id
        })
        .returning();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
}
