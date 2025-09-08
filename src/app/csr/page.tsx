"use client";

import { Suspense, useEffect, useState } from "react";
import DemoCard from "@/components/demo-card-csr";
import Layout from "@/components/layout";
import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import type { PostModel } from "@/types/models";
import { InputForm } from "@/components/csr-cache-ttl-input";

interface ApiResponse {
  data: PostModel[];
  meta: {
    count: number;
    timestamp: string;
    processingTime: number;
    dbTime: number;
  };
}

interface ApiError {
  error: string;
  message: string;
  timestamp: string;
  processingTime: number;
}

export default function CSRDemo() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [renderTime, setRenderTime] = useState(new Date());
  const [ttl, setTTL] = useState(0);
  const [apiTiming, setApiTiming] = useState<{
    total: number;
    db: number;
  } | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    const fetchStart = Date.now();

    try {
      console.log("🔄 [CSR] Fetching posts from API...");

      const response = await fetch(`/api/posts?ttl=${ttl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result: ApiResponse = await response.json();
      const clientTime = Date.now() - fetchStart;

      console.log(`✅ [CSR] Posts fetched successfully in ${clientTime}ms`);
      console.log(
        `📊 [CSR] Server processing: ${result.meta.processingTime}ms, DB: ${result.meta.dbTime}ms`
      );

      setPosts(result.data);
      setApiTiming({
        total: result.meta.processingTime,
        db: result.meta.dbTime,
      });
      setRenderTime(new Date());
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch posts";
      console.error("❌ [CSR] Error fetching posts:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPosts();
  });

  return (
    <Layout
      title="Client Side Rendering (CSR)"
      renderStrategy="CSR"
      showPerformance
    >
      <DemoCard
        title="CSR Blog Posts"
        description="Dynamic content fetched from API on the client-side"
        strategy="Client Side Rendering"
        strategyType="CSR"
        renderTime={renderTime.toISOString()}
        explanation="🖥️ This data is fetched on the CLIENT-SIDE using JavaScript after the initial page load. Content updates dynamically without page refreshes, providing a smooth SPA experience. Perfect for highly interactive applications, dashboards, or content that changes frequently based on user actions."
      >
        <div className="space-y-3">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <div className="flex items-center gap-2 font-medium text-red-700 dark:text-red-400">
              🖥️ Client-Side Rendering Features:
            </div>
            <ul className="mt-2 space-y-1 text-sm text-red-600 dark:text-red-400">
              <li>• Client-side state management</li>
              <li>• API request time: ~{apiTiming?.total || 0}ms</li>
              <li>• Database query time: ~{apiTiming?.db || 0}ms</li>
              <li>• Rendered at: {renderTime.toLocaleString()}</li>
            </ul>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              💡 <strong>Click &quot;Fetch Posts&quot;</strong> to see real-time
              data updates without page refresh!
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-col items-center space-y-2">
            <p className="w-fit text-sm font-medium">Manual Data Fetch:</p>
            <Button
              onClick={fetchPosts}
              disabled={loading}
              variant="outline"
              size="sm"
              className="bg-secondary cursor-pointer transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Fetching..." : "Fetch Posts"}
            </Button>

            <InputForm className="" onChange={setTTL} />
            <p className="max-w-xs text-center text-xs text-slate-600 dark:text-slate-400">
              Client-side API call
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Error loading posts:
                </span>
              </div>
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Posts Grid */}
          <Suspense
            fallback={[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
              />
            ))}
          >
            <div className="grid gap-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} renderingStrategy="CSR" />
              ))}
            </div>
          </Suspense>
        </div>
      </DemoCard>
    </Layout>
  );
}
