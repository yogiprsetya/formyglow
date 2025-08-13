import { text, timestamp, pgTable, integer, boolean, date } from 'drizzle-orm/pg-core';
import { users } from './users';

export const inventory = pgTable('inventory', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(1),
  purchaseDate: date('purchase_date'),
  expiryDate: date('expiry_date'),
  openedDate: date('opened_date'),
  isOpen: boolean('is_open').default(false),
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()
});
