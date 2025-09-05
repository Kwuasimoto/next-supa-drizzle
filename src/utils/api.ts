import { posts } from "../data/mocks";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

// Simulate API latency
const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchPosts = async (delay: number = 500): Promise<Post[]> => {
  await simulateDelay(delay);

  return posts.map((post) => ({
    ...post,
    fetchedAt: new Date().toISOString(),
  })) as Post[];
};

export const fetchPost = async (
  id: number,
  delay: number = 500
): Promise<Post | null> => {
  await simulateDelay(delay);

  const post = posts.find((p) => p.id === id);
  if (!post) return null;

  return {
    ...post,
    fetchedAt: new Date().toISOString(),
  } as Post;
};
