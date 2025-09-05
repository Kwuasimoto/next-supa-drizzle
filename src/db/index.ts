import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Re-export all schemas to keep imports clean.
export * from "./schema/users"

// Create client
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

