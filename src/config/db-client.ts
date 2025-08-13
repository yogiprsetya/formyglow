import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from 'db/schema/users';
import * as ingredients from 'db/schema/skincare';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const client = postgres(process.env.POSTGRES_URL || '', { prepare: false });

const db = drizzle(client, { schema: { users, ingredients } });

export { db };
