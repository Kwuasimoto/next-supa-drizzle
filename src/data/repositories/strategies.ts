import { db } from "../index";
import { renderingStrategies, type RenderingStrategy, type NewRenderingStrategy } from "../schema/strategies";
import { eq, ilike } from "drizzle-orm";

export class StrategyRepository {
  static async getAll(): Promise<RenderingStrategy[]> {
    return await db
      .select()
      .from(renderingStrategies)
      .orderBy(renderingStrategies.id);
  }

  static async getById(id: number): Promise<RenderingStrategy | null> {
    const result = await db
      .select()
      .from(renderingStrategies)
      .where(eq(renderingStrategies.id, id));
    
    return result[0] || null;
  }

  static async getByPath(path: string): Promise<RenderingStrategy | null> {
    const result = await db
      .select()
      .from(renderingStrategies)
      .where(eq(renderingStrategies.path, path));
    
    return result[0] || null;
  }

  static async create(data: NewRenderingStrategy): Promise<RenderingStrategy> {
    const result = await db
      .insert(renderingStrategies)
      .values(data)
      .returning();
    
    return result[0];
  }

  static async update(id: number, data: Partial<NewRenderingStrategy>): Promise<RenderingStrategy | null> {
    const result = await db
      .update(renderingStrategies)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(renderingStrategies.id, id))
      .returning();
    
    return result[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await db
      .delete(renderingStrategies)
      .where(eq(renderingStrategies.id, id));
    
    return result.length > 0;
  }

  static async search(query: string): Promise<RenderingStrategy[]> {
    const searchQuery = `%${query}%`;
    return await db
      .select()
      .from(renderingStrategies)
      .where(ilike(renderingStrategies.title, searchQuery))
      .orderBy(renderingStrategies.id);
  }
}