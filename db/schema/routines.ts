import { text, timestamp, pgTable, boolean, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { inventory } from './inventory';

export const routines = pgTable('routine', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  type: text('type').notNull(), // morning, evening, custom
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()
});

export const routineItems = pgTable('routine_item', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  routineId: text('routine_id')
    .notNull()
    .references(() => routines.id, { onDelete: 'cascade' }),
  inventoryId: text('inventory_id')
    .notNull()
    .references(() => inventory.id, { onDelete: 'cascade' }),
  order: integer('order').notNull(), // urutan penggunaan
  frequency: text('frequency').default('daily'), // daily, alternate, weekly
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow()
});
