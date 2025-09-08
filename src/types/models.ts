import { LucideIcon } from "lucide-react";

export interface UserModel {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// Frontend-safe types (with proper serialization)
export interface PostModel {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedAt: Date; // ISO 8601 date string (serialized from Date)
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// UI-specific types that extend database types
export interface RenderingStrategyModel {
  title: string;
  description: string;
  icon: LucideIcon; // UI-specific - not in database
  path: string;
  color: string;
  badge: string;
  features: string[];
}
