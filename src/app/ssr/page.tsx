import Layout from "@/components/layout";
import DemoCard from "@/components/demo-card";
import PostCard from "@/components/post-card";
import { createPostRepository } from "@/data/repositories/better-posts";

// This configuration ensures data is rendered dynamically
export const dynamic = "force-dynamic";
export const revalidate = 0; // No caching

export default async function SSRDemo() {
  // This runs on the server for each request
  const postRepository = createPostRepository();
  const posts = await postRepository.getAll();
  const renderTime = new Date().toISOString();
  
  // Simulate server processing time
  const processingStart = Date.now();
  await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
  const processingTime = Date.now() - processingStart;

  return (
    <Layout title="Server-Side Rendering (SSR)" renderStrategy="SSR" showPerformance>
      <DemoCard
        title="SSR Blog Posts"
        description="Fresh data rendered on the server for each request"
        strategy="Server-Side Rendering"
        strategyType="SSR"
        renderTime={renderTime}
        explanation="🔄 This data is fetched and rendered on the server for EVERY request. Each user gets fresh, up-to-date content with server processing time (~200ms TTFB). Perfect for user-specific content, real-time data, or frequently changing information that needs to be SEO-friendly."
      >
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-medium">
              🔄 Dynamic Rendering Features:
            </div>
            <ul className="mt-2 text-sm text-blue-600 dark:text-blue-400 space-y-1">
              <li>• Fresh data on every request</li>
              <li>• Server processing time: ~{processingTime}ms</li>
              <li>• SEO-friendly with dynamic content</li>
              <li>• Rendered at: {new Date(renderTime).toLocaleString()}</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 dark:bg-yellow-900/20 dark:border-yellow-800">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              💡 <strong>Refresh this page</strong> to see the render time update - each request generates a new timestamp!
            </p>
          </div>
          <div className="grid gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} renderingStrategy="SSR" />
            ))}
          </div>
        </div>
      </DemoCard>
    </Layout>
  );
}
