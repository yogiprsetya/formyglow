import { text, timestamp, pgTable, date } from 'drizzle-orm/pg-core';
import { users } from './users';

export const progress = pgTable('progress', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  beforeImageUrl: text('before_image_url'),
  afterImageUrl: text('after_image_url'),
  photoDate: date('photo_date').notNull(),
  skinCondition: text('skin_condition'), // good, breakout, dry, etc.
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow()
});
