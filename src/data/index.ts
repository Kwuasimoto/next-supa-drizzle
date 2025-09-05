import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";

// Re-export all schemas to keep imports clean.
import * as schema from "./schema";

dotenv.config({ path: ".env.production" });

// Create client
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

export type DBSchema = typeof schema;
export * from "./schema";
