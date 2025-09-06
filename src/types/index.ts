import type { PostModel, UserModel, RenderingStrategyModel } from "./models";

// Re-export database types and transform them for frontend use
export type { PostSelect, PostInsert } from "@/data/schema/posts";
export type {
  RenderingStrategySelect,
  RenderingStrategyInsert,
} from "@/data/schema/strategies";

// Rendering strategy types
export type StrategyType = "SSG" | "SSR" | "ISR" | "CSR";

// API response types
export interface ApiResponse<T> {
  data: T;
  timestamp: string;
  source: "cache" | "fresh" | "stale-while-revalidate";
  strategy: StrategyType;
}

export interface CacheOptions {
  revalidate?: number; // seconds for ISR
  tags?: string[]; // for cache invalidation
  fresh?: boolean; // force fresh fetch
}

export interface PostCardProps {
  post: PostModel;
  renderingStrategy?: string;
  showReadMore?: boolean;
}

// Component prop types
export interface DemoCardProps {
  title: string;
  description: string;
  strategy: string;
  fetchedAt?: string;
  children: React.ReactNode;
  explanation: string;
  isLoading?: boolean;
  strategyType?: StrategyType; // Add strategy type for visual indicators
  buildTime?: string; // For SSG build timestamp
  renderTime?: string; // For SSR render timestamp
}

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showNavigation?: boolean;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  timestamp: string;
}

// Utility types for Next.js
export interface PageProps<T = Record<string, never>> {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface LayoutPropsWithParams<T = Record<string, never>> {
  children: React.ReactNode;
  params: T;
}

// Route parameter types
export interface PostPageParams {
  id: string;
}

// Metadata types for SEO
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    type: string;
    url?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    card: "summary" | "summary_large_image";
    title: string;
    description: string;
    images?: string[];
  };
}

export type * from "./api";

// Re-export models
export type { PostModel, UserModel, RenderingStrategyModel } from "./models";

// Create type aliases for backward compatibility
export type Post = PostModel;
export type User = UserModel;
export type RenderingStrategy = RenderingStrategyModel;
