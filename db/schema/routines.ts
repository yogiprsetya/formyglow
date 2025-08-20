import { text, timestamp, pgTable, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';
import { inventory } from './inventory';

export const routineTypeEnum = pgEnum('routine_type', ['morning', 'evening', 'custom']);

export const routineFrequencyEnum = pgEnum('routine_frequency', ['daily', 'weekly']);

export const dayOfWeekEnum = pgEnum('day_of_week', [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]);

export const routines = pgTable('routine', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  type: routineTypeEnum('type').default('evening').notNull(),
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
  order: integer('order').notNull(),
  frequency: routineFrequencyEnum('frequency').default('daily'),
  repeatOn: dayOfWeekEnum('repeat_on').array(), // array untuk mendukung multiple hari dalam seminggu
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow()
});
