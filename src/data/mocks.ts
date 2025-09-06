import type { RenderingStrategy, Post } from "@/types";
import { Monitor, RotateCcw, Server, Zap } from "lucide-react";

// Users can be defined here if needed
// export const users: User[] = [];

export const strategies: RenderingStrategy[] = [
  {
    title: "Static Site Generation (SSG)",
    description: "Pre-rendered at build time for maximum performance",
    icon: Zap,
    path: "/ssg",
    color: "bg-green-500 hover:bg-green-600",
    badge: "Build Time",
    features: ["Fastest loading", "CDN friendly", "SEO optimized"],
  },
  {
    title: "Server-Side Rendering (SSR)",
    description: "Rendered fresh on each request with dynamic data",
    icon: Server,
    path: "/ssr",
    color: "bg-blue-500 hover:bg-blue-600",
    badge: "Per Request",
    features: ["Always fresh", "Dynamic content", "SEO friendly"],
  },
  {
    title: "Incremental Static Regeneration (ISR)",
    description: "Static generation with periodic background updates",
    icon: RotateCcw,
    path: "/isr",
    color: "bg-purple-500 hover:bg-purple-600",
    badge: "Hybrid",
    features: ["Best of both", "Background updates", "Scalable"],
  },
  {
    title: "Client-Side Rendering (CSR)",
    description: "Rendered in the browser after initial page load",
    icon: Monitor,
    path: "/csr",
    color: "bg-red-500 hover:bg-red-600",
    badge: "Client Side",
    features: ["Interactive", "SPA experience", "Dynamic UI"],
  },
];

export const posts: Post[] = [
  {
    id: 1,
    title: "Understanding Static Site Generation",
    content:
      "SSG pre-renders pages at build time, creating static HTML files that can be served instantly from a CDN.",
    author: "Next.js Team",
    publishedAt: new Date("2024-01-15T10:00:00Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["SSG", "Performance", "JAMstack"],
  },
  {
    id: 2,
    title: "Server-Side Rendering Explained",
    content:
      "SSR renders pages on the server for each request, ensuring fresh data and better SEO for dynamic content.",
    author: "React Team",
    publishedAt: new Date("2024-01-20T14:30:00Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["SSR", "SEO", "Dynamic"],
  },
  {
    id: 3,
    title: "Incremental Static Regeneration Benefits",
    content:
      "ISR combines the benefits of SSG and SSR by allowing static pages to be updated after deployment.",
    author: "Vercel Team",
    publishedAt: new Date("2024-01-25T09:15:00Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["ISR", "Hybrid", "Performance"],
  },
  {
    id: 4,
    title: "Client-Side Rendering Use Cases",
    content:
      "CSR is perfect for highly interactive applications where the initial load time is less critical than user experience.",
    author: "Frontend Masters",
    publishedAt: new Date("2024-02-01T16:45:00Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["CSR", "SPA", "Interactive"],
  },
  {
    id: 5,
    title: "Caching Strategies in Modern Web Apps",
    content:
      "Understanding browser caching, CDN caching, and application-level caching is crucial for optimal performance.",
    author: "Web Performance Team",
    publishedAt: new Date("2024-02-05T11:20:00Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["Caching", "Performance", "CDN"],
  },
];
