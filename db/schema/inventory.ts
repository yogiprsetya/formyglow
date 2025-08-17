import { text, timestamp, pgTable, integer, boolean, date, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const skincareTypesEnum = pgEnum('skincare_types', [
  'cleanser',
  'serum',
  'moisturizer',
  'sunscreen',
  'exfoliant',
  'mask',
  'oil',
  'eye-cream'
]);

export const inventory = pgTable('inventory', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  brand: text('brand').notNull(),
  size: text('size').notNull(),
  price: integer('price').notNull().default(0),
  quantity: integer('quantity').notNull().default(1),
  skincareTypes: skincareTypesEnum().default('cleanser'),
  purchaseDate: date('purchase_date'),
  expiryDate: date('expiry_date'),
  openedDate: date('opened_date'),
  isOpen: boolean('is_open').default(false),
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()
});
