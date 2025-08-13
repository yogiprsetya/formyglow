import { text, timestamp, pgTable, integer } from 'drizzle-orm/pg-core';
import crypto from 'crypto';

export const ingredients = pgTable('ingredient', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  scientificName: text('scientific_name'),
  category: text('category').notNull(), // active, emollient, preservative, etc.
  description: text('description'),
  benefits: text('benefits').array(),
  sideEffects: text('side_effects').array(),
  safetyRating: integer('safety_rating'), // 1-5 scale
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow()
});

// Product ingredients (many-to-many)
// export const productIngredients = pgTable('product_ingredient', {
//   id: text('id')
//     .notNull()
//     .references(() => ingredients.id, { onDelete: 'cascade' }),
//   concentration: text('concentration'), // percentage atau ranking
//   isActive: boolean('is_active').default(true)
// });

// Ingredient conflicts (bahan yang tidak boleh digabung)
// export const ingredientConflicts = pgTable(
//   'ingredient_conflict',
//   {
//     ingredient1Id: text('ingredient_1_id')
//       .notNull()
//       .references(() => ingredients.id, { onDelete: 'cascade' }),
//     ingredient2Id: text('ingredient_2_id')
//       .notNull()
//       .references(() => ingredients.id, { onDelete: 'cascade' }),
//     reason: text('reason').notNull(),
//     severity: text('severity').notNull(), // low, medium, high
//     createdAt: timestamp('created_at', { mode: 'date' }).defaultNow()
//   },
//   (ic) => ({
//     compoundKey: primaryKey({ columns: [ic.ingredient1Id, ic.ingredient2Id] })
//   })
// );

// AI recommendations
// export const aiRecommendations = pgTable('ai_recommendation', {
//   id: text('id')
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   userId: text('user_id')
//     .notNull()
//     .references(() => users.id, { onDelete: 'cascade' }),
//   type: text('type').notNull(), // product, routine, ingredient
//   title: text('title').notNull(),
//   description: text('description').notNull(),
//   data: jsonb('data'), // structured data untuk recommendation
//   isRead: boolean('is_read').default(false),
//   createdAt: timestamp('created_at', { mode: 'date' }).defaultNow()
// });
