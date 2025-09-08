import { db } from "../index";
import { posts, type PostSelect, type PostInsert } from "../schema/posts";
import { eq, desc, asc, ilike, or } from "drizzle-orm";

export class PostRepository {
  static async getAll(options?: {
    limit?: number;
    offset?: number;
    sortBy?: "publishedAt" | "title" | "author";
    sortOrder?: "asc" | "desc";
    author?: string;
  }): Promise<PostSelect[]> {
    // Simple approach: build different queries for different cases
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
      const query = db
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
    const query = db.select().from(posts).orderBy(orderByClause);

    if (limit && offset) {
      return await query.limit(limit).offset(offset);
    } else if (limit) {
      return await query.limit(limit);
    } else {
      return await query;
    }
  }

  static async getById(id: number): Promise<PostSelect | null> {
    const result = await db.select().from(posts).where(eq(posts.id, id));
    return result[0] || null;
  }

  static async create(data: PostInsert): Promise<PostSelect> {
    const result = await db.insert(posts).values(data).returning();
    return result[0];
  }

  static async update(
    id: number,
    data: Partial<PostInsert>
  ): Promise<PostSelect | null> {
    const result = await db
      .update(posts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();

    return result[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await db.delete(posts).where(eq(posts.id, id));
    return result.length > 0;
  }

  static async getByTags(tags: string[]): Promise<PostSelect[]> {
    // Simple tag filtering - in production you'd want proper JSON indexing
    const allPosts = await this.getAll();
    return allPosts.filter((post) =>
      post.tags.some((tag) => tags.includes(tag))
    );
  }

  static async search(query: string): Promise<PostSelect[]> {
    const searchQuery = `%${query}%`;
    return await db
      .select()
      .from(posts)
      .where(
        or(ilike(posts.title, searchQuery), ilike(posts.content, searchQuery))
      )
      .orderBy(desc(posts.publishedAt));
  }
}
