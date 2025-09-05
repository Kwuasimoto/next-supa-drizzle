import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Re-export all schemas to keep imports clean.
import * as schema from "./schema"

// Create client
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

export * from "./schema";