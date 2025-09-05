import type { Post, RenderingStrategy, StrategyType } from './index';

// API endpoint response types
export interface GetPostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}

export interface GetStrategiesResponse {
  strategies: RenderingStrategy[];
  total: number;
}

export interface GetPostByIdResponse {
  post: Post;
}

// API request types
export interface GetPostsRequest {
  page?: number;
  limit?: number;
  tags?: string[];
  author?: string;
  sortBy?: 'publishedAt' | 'title' | 'author';
  sortOrder?: 'asc' | 'desc';
}

export interface CreatePostRequest {
  title: string;
  content: string;
  author: string;
  tags: string[];
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: number;
}

// Cache configuration types
export interface CacheConfig {
  strategy: StrategyType;
  maxAge: number; // seconds
  staleWhileRevalidate?: number; // seconds
  tags?: string[];
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
}

// Performance monitoring types
export interface PerformanceMetrics {
  renderTime: number; // milliseconds
  cacheHit: boolean;
  dataFetchTime?: number; // milliseconds
  hydrationTime?: number; // milliseconds
  strategy: StrategyType;
  timestamp: string;
}

// Webhook types for ISR revalidation
export interface RevalidationWebhook {
  type: 'post-update' | 'strategy-change' | 'cache-clear';
  payload: {
    postIds?: number[];
    tags?: string[];
    paths?: string[];
  };
  timestamp: string;
  signature: string;
}

// Edge cases and error handling
export interface NotFoundError {
  type: 'NOT_FOUND';
  resource: string;
  id: string | number;
  message: string;
}

export interface ValidationError {
  type: 'VALIDATION_ERROR';
  field: string;
  message: string;
  value: unknown;
}

export interface RateLimitError {
  type: 'RATE_LIMIT';
  resetTime: string;
  remainingRequests: number;
  message: string;
}

export type ApiErrorType = NotFoundError | ValidationError | RateLimitError;

// Next.js specific types
export interface NextApiRequest {
  query: { [key: string]: string | string[] };
  body: unknown;
  method?: string;
  url?: string;
  headers: { [key: string]: string | string[] | undefined };
}

export interface NextApiResponse<T = unknown> {
  status: number;
  data?: T;
  error?: ApiErrorType;
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}