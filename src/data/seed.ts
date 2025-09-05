import { db } from "./index";
import { posts, renderingStrategies } from "./schema";
import { posts as mockPosts, strategies as mockStrategies } from "./mocks";

export async function seedDatabase() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await db.delete(posts);
    await db.delete(renderingStrategies);

    // Seed rendering strategies
    console.log("📊 Seeding rendering strategies...");
    const strategiesData = mockStrategies.map((strategy) => ({
      title: strategy.title,
      description: strategy.description,
      path: strategy.path,
      color: strategy.color,
      badge: strategy.badge,
      features: strategy.features,
    }));

    await db.insert(renderingStrategies).values(strategiesData);

    // Seed posts
    console.log("📝 Seeding posts...");
    const postsData = mockPosts.map((post) => ({
      title: post.title,
      content: post.content,
      author: post.author,
      publishedAt: new Date(post.publishedAt),
      tags: post.tags,
    }));

    await db.insert(posts).values(postsData);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("🎉 Seeding completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding failed:", error);
      process.exit(1);
    });
}
