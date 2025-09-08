import Layout from "@/components/layout";
import DemoCard from "@/components/demo-card";
import PostCard from "@/components/post-card";
import { createPostRepository } from "@/data/repositories/better-posts";
import { ISRControlsHybrid } from "@/components/isr-controls-hybrid";

// 0. Set cache validation age for page
export const revalidate = 60; // Revalidate page cache at interval (This is ISR.)

export default async function ISRDemo() {
  // 1. Initial DB Fetch to populate information
  const postRepository = createPostRepository();
  const posts = await postRepository.getAll();

  // 2. Save the time after the fetch
  const renderTime = new Date().toISOString();

  // 3. Simulate Server processing
  const processingStart = Date.now();
  await new Promise((resolve) => setTimeout(resolve, 0));
  const processingTime = Date.now() - processingStart;

  return (
    <Layout
      title="Incremental Static Regeneration (ISR)"
      renderStrategy="ISR"
      showPerformance
    >
      <DemoCard
        title="ISR Blog Posts"
        description="Static generation with automatic background updates every 60 seconds"
        strategy="Incremental Static Regeneration"
        strategyType="ISR"
        renderTime={renderTime}
        explanation="🔄 This page is statically generated but can be regenerated in the background at specified intervals (every 60 seconds). Users get fast static content while the system automatically updates stale data in the background. This combines the performance benefits of SSG with the freshness of SSR. Perfect for e-commerce product pages, news sites, or any content that changes periodically but doesn't need real-time updates."
      >
        <div className="space-y-3">
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
            <div className="flex items-center gap-2 font-medium text-purple-700 dark:text-purple-400">
              🔄 Incremental Static Regeneration Features:
            </div>
            <ul className="mt-2 space-y-1 text-sm text-purple-600 dark:text-purple-400">
              <li>• Static generation with background revalidation</li>
              <li>• Server processing time: ~{processingTime}ms</li>
              <li>• Revalidates every 60 seconds</li>
              <li>• Rendered at: {new Date(renderTime).toLocaleString()}</li>
            </ul>
          </div>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              💡 <strong>Refresh this page</strong> to see this page update, but
              only after the revalidation period (60 seconds) has passed.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/20">
            <ISRControlsHybrid />

            {/* SEO optimized SSR solution */}
            {/* <ISRControlsSSR /> */}

            {/* Example of less SEO friendly solution but more client interactivity (trade off) */}
            {/* <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
              🛠️ <strong>Manual Cache Invalidation:</strong>
            </p>
            <InvalidatePath path={"/isr"} label="Force Revalidate Now" /> */}
          </div>
          <div className="grid gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} renderingStrategy="ISR" />
            ))}
          </div>
        </div>
      </DemoCard>
    </Layout>
  );
}
