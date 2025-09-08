import { db, type DBSchema } from "@/data";
import { posts, type PostInsert, type PostSelect } from "@/data/schema/posts";
import { eq, desc, asc, ilike } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

// Better pattern: Instance-based with dependency injection
export class PostRepository {
  constructor(private database: PostgresJsDatabase<DBSchema> = db) {}

  async getAll(options?: {
    limit?: number;
    offset?: number;
    sortBy?: "publishedAt" | "title" | "author";
    sortOrder?: "asc" | "desc";
    author?: string;
  }): Promise<PostSelect[]> {
    const sortDirection = options?.sortOrder || "desc";
    const sortField = options?.sortBy || "publishedAt";
    const limit = options?.limit;
    const offset = options?.offset;

    // Get the correct order by clause
    let orderByClause;
    if (sortField === "title") {
      orderByClause =
        sortDirection === "asc" ? asc(posts.title) : desc(posts.title);
    } else if (sortField === "author") {
      orderByClause =
        sortDirection === "asc" ? asc(posts.author) : desc(posts.author);
    } else {
      orderByClause =
        sortDirection === "asc"
          ? asc(posts.publishedAt)
          : desc(posts.publishedAt);
    }

    // Build query based on filters
    if (options?.author) {
      const query = this.database
        .select()
        .from(posts)
        .where(ilike(posts.author, `%${options.author}%`))
        .orderBy(orderByClause);

      if (limit && offset) {
        return await query.limit(limit).offset(offset);
      } else if (limit) {
        return await query.limit(limit);
      } else {
        return await query;
      }
    }

    // Default query
    const query = this.database.select().from(posts).orderBy(orderByClause);

    if (limit && offset) {
      return await query.limit(limit).offset(offset);
    } else if (limit) {
      return await query.limit(limit);
    } else {
      return await query;
    }
  }

  async getById(id: number): Promise<PostSelect | null> {
    const result = await this.database
      .select()
      .from(posts)
      .where(eq(posts.id, id));
    return result[0] || null;
  }

  async create(data: PostInsert): Promise<PostSelect> {
    const result = await this.database.insert(posts).values(data).returning();
    return result[0];
  }

  async update(
    id: number,
    data: Partial<PostInsert>
  ): Promise<PostSelect | null> {
    const result = await this.database
      .update(posts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();

    return result[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.database.delete(posts).where(eq(posts.id, id));
    return result.length > 0;
  }
}

// Expose hook to make database
export const createPostRepository = (database?: PostgresJsDatabase<DBSchema>) =>
  new PostRepository(database);
