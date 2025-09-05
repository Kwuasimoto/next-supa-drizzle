import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";

// Re-export all schemas to keep imports clean.
import * as schema from "./schema";

const isProd = process.env.PRODUCTION === "true";
dotenv.config({ path: isProd ? ".env.production" : ".env.local" });

// Create client
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

export * from "./schema";
