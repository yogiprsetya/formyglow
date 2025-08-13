import { text, timestamp, pgTable, integer } from 'drizzle-orm/pg-core';
import { users } from './users';

export const profiles = pgTable('profile', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  skinType: text('skin_type').notNull(), // oily, dry, combination, normal, sensitive
  skinConcerns: text('skin_concerns').array(), // acne, aging, hyperpigmentation, etc.
  age: integer('age'),
  gender: text('gender'), // male, female, other
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()
});
