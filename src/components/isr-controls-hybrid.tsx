"use client";

import { useState } from "react";
import { Monitor, RefreshCw, Server } from "lucide-react";
import { invalidatePathFormAction } from "@/actions/invalidate-actions";
import { InvalidatePathHandler } from "@/components/invalidate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ISRControlsHybrid() {
  // TODO: State should come from a DB fetch for a true implementation
  const [useJS, setUseJS] = useState(false);

  return (
    <>
      {/* Mode Toggle */}
      <div className="mx-auto mb-4 flex w-fit flex-col items-center justify-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/20">
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
          Rendering Mode Selection
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => setUseJS(false)}
            variant="outline"
            size="sm"
            className={cn(
              "w-32 transition-all duration-200 sm:w-40",
              !useJS
                ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                : "cursor-pointer bg-white hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            )}
          >
            <Server className="mr-1 h-3 w-3" />
            SSR Mode
          </Button>
          <Button
            onClick={() => setUseJS(true)}
            variant="outline"
            size="sm"
            className={cn(
              "w-32 transition-all duration-200 sm:w-40",
              useJS
                ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
                : "cursor-pointer bg-white hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:bg-zinc-900 dark:text-zinc-100"
            )}
          >
            <Monitor className="mr-1 h-3 w-3" />
            CSR Mode
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-2 items-center justify-items-center gap-4 sm:grid-cols-2 sm:grid-rows-1">
        <div className="flex flex-col items-center space-y-2">
          <p className="w-fit text-sm font-medium">
            Manual Cache Invalidation:
          </p>

          {useJS ? (
            // Smooth client-side version (Red for CSR)
            <InvalidatePathHandler
              path="/isr"
              label="Force Revalidate ISR Page"
              className="bg-secondary cursor-pointer transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            />
          ) : (
            // SEO-friendly form version (Blue for SSR)
            <form action={invalidatePathFormAction}>
              <input type="hidden" name="path" value="/isr" />
              <button
                type="submit"
                className="border-input bg-secondary ring-offset-background focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Force Revalidate ISR Page
              </button>
            </form>
          )}

          <p className="max-w-32 text-center text-xs text-slate-600 dark:text-slate-400">
            {useJS ? "Client-side (smooth)" : "Server-side (SEO-friendly)"}
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <p className="w-fit text-sm font-medium">Manual Page Refresh:</p>

          {useJS ? (
            // Client-side refresh (Red for CSR)
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
              className="bg-secondary cursor-pointer transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>
          ) : (
            // Server-side navigation (Blue for SSR)
            <a
              href="/isr?refresh=true"
              className="border-input bg-secondary ring-offset-background focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Page
            </a>
          )}

          <p className="max-w-32 text-center text-xs text-slate-600 dark:text-slate-400">
            {useJS ? "Client-side refresh" : "Server-side navigation"}
          </p>
        </div>
      </div>
    </>
  );
}
