// This is an extended configuration to work with supabase postgresql in production.
import { defineConfig } from 'drizzle-kit';
import * as dotenv from "dotenv"

dotenv.config({ path: '.env.local' });
const isProd = process.env.PRODUCTION === "true";

export default defineConfig({
  out: './drizzle',
  dialect: "postgresql",
  schema: './src/db/schema',

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

  migrations: {
    prefix: "timestamp",
    table: `__drizzle_${isProd ? "prod" : "dev"}_migrations__`,
    schema: "public",
  },

  strict: true,
  verbose: true,
});