"use client";

import { InvalidatePathHandler } from "@/components/invalidate";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";

export function ISRControls() {
  return (
    <div className="grid grid-cols-1 grid-rows-2 items-center justify-items-center sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex flex-col items-center space-y-2">
        <p className="w-fit text-sm font-medium">Manual Cache Invalidation:</p>
        <InvalidatePathHandler
          path="/isr"
          label="Force Revalidate ISR Page"
          className="bg-secondary cursor-pointer transition-colors hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
        />
        <p className="max-w-32 text-center text-xs text-gray-500">
          Server-side cache invalidation
        </p>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <p className="w-fit text-sm font-medium">Manual Page Refresh:</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          size="sm"
          className="bg-secondary cursor-pointer transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Page
        </Button>
        <p className="max-w-32 text-center text-xs text-gray-500">
          Client-side refresh without server action
        </p>
      </div>
    </div>
  );
}
