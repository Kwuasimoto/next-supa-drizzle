import Layout from "@/components/layout";
import DemoCard from "@/components/demo-card";
import PostCard from "@/components/post-card";
import { createPostRepository } from "@/data/repositories/better-posts";

// This configuration ensures the page is statically generated
export const dynamic = 'force-static';

export default async function SSGDemo() {
  const postRepository = createPostRepository();
  const posts = await postRepository.getAll();
  
  // Simulate build time (this would be the actual build time in production)
  const buildTime = new Date().toISOString();

  return (
    <Layout title="Static Site Generation (SSG)" renderStrategy="SSG" showPerformance>
      <DemoCard
        title="SSG Blog Posts"
        description="Pre-rendered at build time - blazing fast delivery!"
        strategy="Static Generation"
        strategyType="SSG"
        buildTime={buildTime}
        explanation="⚡ These posts were pre-rendered at BUILD TIME and served as static HTML. Every user gets the same cached version, resulting in lightning-fast loading times (~50ms TTFB) and excellent SEO. The data remains the same until the next build, making this perfect for content that doesn't change frequently like blog posts, documentation, or marketing pages."
      >
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-900/20 dark:border-green-800">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-medium">
              ⚡ Static Content Benefits:
            </div>
            <ul className="mt-2 text-sm text-green-600 dark:text-green-400 space-y-1">
              <li>• Instant loading from CDN</li>
              <li>• Same content for all users</li>
              <li>• Perfect SEO optimization</li>
              <li>• Built at: {new Date(buildTime).toLocaleString()}</li>
            </ul>
          </div>
          <div className="grid gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} renderingStrategy="SSG" />
            ))}
          </div>
        </div>
      </DemoCard>
    </Layout>
  );
}
