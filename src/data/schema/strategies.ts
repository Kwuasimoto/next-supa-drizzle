import { pgTable, text, serial, timestamp, json } from "drizzle-orm/pg-core";

export const renderingStrategies = pgTable("rendering_strategies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  path: text("path").notNull().unique(),
  color: text("color").notNull(),
  badge: text("badge").notNull(),
  features: json("features").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type RenderingStrategySelect = typeof renderingStrategies.$inferSelect;
export type RenderingStrategyInsert = typeof renderingStrategies.$inferInsert;
