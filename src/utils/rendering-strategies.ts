import { headers } from 'next/headers';

export type RenderingStrategy = 'SSG' | 'SSR' | 'ISR' | 'CSR';

export interface RenderingConfig {
  strategy: RenderingStrategy;
  revalidate?: number; // for ISR
  fallback?: boolean | 'blocking'; // for SSG with dynamic paths
  cache?: 'force-cache' | 'no-store' | 'no-cache';
  tags?: string[]; // for cache tagging
}

export const RENDERING_STRATEGIES: Record<RenderingStrategy, RenderingConfig> = {
  SSG: {
    strategy: 'SSG',
    cache: 'force-cache',
    tags: ['static']
  },
  SSR: {
    strategy: 'SSR',
    cache: 'no-store',
    tags: ['dynamic']
  },
  ISR: {
    strategy: 'ISR',
    revalidate: 60, // 1 minute default
    cache: 'force-cache',
    tags: ['incremental']
  },
  CSR: {
    strategy: 'CSR',
    cache: 'no-cache',
    tags: ['client']
  }
};

export class RenderingOptimizer {
  static getOptimalStrategy(context: {
    hasUserContent?: boolean;
    requiresRealTime?: boolean;
    dataChangeFrequency?: 'high' | 'medium' | 'low';
    userAgent?: string;
  }): RenderingStrategy {
    const { hasUserContent, requiresRealTime, dataChangeFrequency } = context;

    // Real-time data or user-specific content requires SSR
    if (requiresRealTime || hasUserContent) {
      return 'SSR';
    }

    // Frequently changing data benefits from ISR
    if (dataChangeFrequency === 'high') {
      return 'ISR';
    }

    // Medium frequency can use ISR with longer revalidation
    if (dataChangeFrequency === 'medium') {
      return 'ISR';
    }

    // Static content benefits from SSG
    return 'SSG';
  }

  static async detectRenderingMode(): Promise<RenderingStrategy> {
    try {
      const headersList = await headers();
      const userAgent = headersList.get('user-agent');
      
      // Check if we're in a server context
      if (typeof window === 'undefined') {
        // Server-side rendering
        return userAgent?.includes('bot') ? 'SSG' : 'SSR';
      }
      
      // Client-side rendering
      return 'CSR';
    } catch {
      // Fallback to CSR if headers are not available
      return 'CSR';
    }
  }

  static getPerformanceMetrics(strategy: RenderingStrategy): {
    ttfb: string; // Time to First Byte
    fcp: string;  // First Contentful Paint
    lcp: string;  // Largest Contentful Paint
    description: string;
  } {
    switch (strategy) {
      case 'SSG':
        return {
          ttfb: '~50ms',
          fcp: '~200ms',
          lcp: '~400ms',
          description: 'Fastest - Pre-rendered at build time'
        };
      case 'ISR':
        return {
          ttfb: '~100ms',
          fcp: '~300ms',
          lcp: '~500ms',
          description: 'Fast - Cached with periodic regeneration'
        };
      case 'SSR':
        return {
          ttfb: '~200ms',
          fcp: '~400ms',
          lcp: '~600ms',
          description: 'Dynamic - Generated on each request'
        };
      case 'CSR':
        return {
          ttfb: '~50ms',
          fcp: '~800ms',
          lcp: '~1200ms',
          description: 'Interactive - Rendered on client'
        };
      default:
        return {
          ttfb: 'Unknown',
          fcp: 'Unknown',
          lcp: 'Unknown',
          description: 'Strategy not recognized'
        };
    }
  }
}

export const withRenderingStrategy = (strategy: RenderingStrategy) => {
  return {
    ...RENDERING_STRATEGIES[strategy],
    metadata: {
      strategy,
      timestamp: new Date().toISOString(),
      performance: RenderingOptimizer.getPerformanceMetrics(strategy)
    }
  };
};

// Cache configuration helpers
export const getCacheConfig = (strategy: RenderingStrategy) => {
  const config = RENDERING_STRATEGIES[strategy];
  
  const fetchOptions: RequestInit = {
    cache: config.cache,
  };

  if (config.revalidate) {
    fetchOptions.next = {
      revalidate: config.revalidate,
      tags: config.tags
    };
  }

  return fetchOptions;
};

// Route segment config helpers for app directory
export const getRouteConfig = (strategy: RenderingStrategy) => {
  switch (strategy) {
    case 'SSG':
      return {
        dynamic: 'force-static' as const,
        revalidate: false
      };
    case 'ISR':
      return {
        dynamic: 'force-static' as const,
        revalidate: 60 // seconds
      };
    case 'SSR':
      return {
        dynamic: 'force-dynamic' as const,
        revalidate: 0
      };
    case 'CSR':
      return {
        dynamic: 'force-dynamic' as const,
        fetchCache: 'force-no-store' as const
      };
    default:
      return {};
  }
};