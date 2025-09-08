"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  invalidatePathAction,
  invalidateTagAction,
} from "@/actions/invalidate-actions";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Server Component interfaces
export interface InvalidateTagControlProps {
  tags?: string | string[];
  disabled?: boolean;
  className?: string;
  label?: string;
}

// Client Component interfaces
export interface InvalidateTagHandlerProps {
  tags?: string | string[];
  disabled?: boolean;
  className?: string;
  label?: string;
  canInvalidate?: boolean;
}

export function InvalidateTagHandler({
  tags,
  disabled,
  className,
  label,
  canInvalidate = true,
}: InvalidateTagHandlerProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleInvalidate = () => {
    if (!tags) return;

    startTransition(async () => {
      setResult(null);
      const response = await invalidateTagAction(tags);
      setResult(response);

      // Clear result after 3 seconds
      setTimeout(() => setResult(null), 3000);
    });
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleInvalidate}
        disabled={disabled || isPending || !tags || !canInvalidate}
        className={cn("cursor-pointer", className)}
        variant="outline"
        size="sm"
      >
        <RefreshCw
          className={`mr-2 h-4 w-4 ${isPending ? "animate-spin" : ""}`}
        />
        {isPending ? "Invalidating..." : label || "Invalidate Tags"}
      </Button>

      {result && (
        <div
          className={`flex items-center text-sm ${
            result.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {result.success ? (
            <CheckCircle className="mr-2 h-4 w-4" />
          ) : (
            <XCircle className="mr-2 h-4 w-4" />
          )}
          {result.message}
        </div>
      )}
    </div>
  );
}

export interface InvalidatePathControlProps {
  path: string;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export interface InvalidatePathHandlerProps {
  path: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  canInvalidate?: boolean;
}

export function InvalidatePathHandler({
  path,
  disabled,
  className,
  label,
  canInvalidate = true,
}: InvalidatePathHandlerProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleInvalidate = () => {
    if (!path) return;

    startTransition(async () => {
      setResult(null);
      const response = await invalidatePathAction(path);
      setResult(response);

      // Clear result after 3 seconds
      setTimeout(() => setResult(null), 3000);
    });
  };

  return (
    <>
      <Button
        onClick={handleInvalidate}
        disabled={disabled || isPending || !path || !canInvalidate}
        className={cn("cursor-pointer", className)}
        variant="outline"
      >
        <RefreshCw
          className={`mr-2 h-4 w-4 ${isPending ? "animate-spin" : ""}`}
        />
        {isPending ? "Invalidating..." : label || "Invalidate Path"}
      </Button>

      {result && (
        <div
          className={`flex items-center text-sm ${
            result.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {result.success ? (
            <CheckCircle className="mr-2 h-4 w-4" />
          ) : (
            <XCircle className="mr-2 h-4 w-4" />
          )}
          {result.message}
        </div>
      )}
    </>
  );
}
