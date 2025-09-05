import Layout from "@/components/layout";
import DemoCard from "@/components/demo-card";
import PostCard from "@/components/post-card";
import { usePostRepository } from "@/data/repositories/better-posts";

export default async function SSGDemo() {
  const postRepository = usePostRepository();
  const posts = await postRepository.getAll();

  return (
    <Layout title="Static Site Generation (SSG)">
      <DemoCard
        title="SSG Blog Posts"
        description="These posts were 'pre-rendered' at build time and served as static HTML"
        strategy="Static Generation"
        explanation="In real Next.js SSG, this data would be fetched at build time using getStaticProps(), and the HTML would be generated once and served to all users. This provides the fastest possible loading times and excellent SEO, but the data becomes stale until the next build. Perfect for content that doesn't change frequently like blog posts, documentation, or marketing pages."
      >
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </DemoCard>
    </Layout>
  );
}
