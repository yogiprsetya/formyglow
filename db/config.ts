import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { loadEnvConfig } from '@next/env';

// Import all schemas
import { users } from './schema/users';
import { profiles } from './schema/profiles';
import { inventory } from './schema/inventory';
import { routines } from './schema/routines';
import { progress } from './schema/progress';
import { ingredients } from './schema/skincare';

loadEnvConfig(process.cwd());

const client = postgres(process.env.POSTGRES_URL || '', { prepare: false });

const db = drizzle(client, {
  schema: {
    users,
    profiles,
    inventory,
    routines,
    progress,
    ingredients
  }
});

export { db };
