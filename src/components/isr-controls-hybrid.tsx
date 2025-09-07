"use client";

import { useState } from "react";
import { Monitor, RefreshCw, Server } from "lucide-react";
import { invalidatePathFormAction } from "@/actions/invalidate-actions";
import { InvalidatePathHandler } from "@/components/invalidate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export function ISRControlsHybrid() {
  // TODO: State should come from a DB fetch for a true implementation
  const router = useRouter();
  const [useJS, setUseJS] = useState(false);

  return (
    <>
      {/* Mode Toggle */}
      <div className="mx-auto mb-6 flex w-fit flex-col items-center justify-center gap-4 rounded-lg border border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/20">
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
          Rendering Mode Selection
        </p>
        <div className="flex gap-3">
          <Button
            onClick={() => setUseJS(false)}
            variant="outline"
            size="sm"
            className={cn(
              "w-32 transition-all duration-200 sm:w-40",
              !useJS ? "btn-ssr-active bg-red-50!" : "btn-ssr-inactive"
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
              useJS ? "btn-csr-active" : "btn-csr-inactive"
            )}
          >
            <Monitor className="mr-1 h-3 w-3" />
            CSR Mode
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-2 items-center justify-items-center gap-6 sm:grid-cols-2 sm:grid-rows-1">
        <div className="flex flex-col items-center space-y-3">
          <p className="w-fit text-sm font-medium">
            Manual Cache Invalidation:
          </p>

          {useJS ? (
            // Smooth client-side version (Red for CSR)
            <InvalidatePathHandler
              path="/isr"
              label="Force Revalidate ISR Page"
              className="btn-control-csr"
            />
          ) : (
            // SEO-friendly form version (Blue for SSR)
            <form action={invalidatePathFormAction}>
              <Input type="hidden" name="path" value="/isr" />
              <Button type="submit" className="btn-control-ssr">
                <RefreshCw className="mr-2 h-4 w-4" />
                Force Revalidate ISR Page
              </Button>
            </form>
          )}

          <p className="max-w-xs text-center text-xs text-slate-600 dark:text-slate-400">
            {useJS ? "Client-side (smooth)" : "Server-side (SEO-friendly)"}
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <p className="w-fit text-sm font-medium">Manual Page Refresh:</p>

          {useJS ? (
            // Client-side refresh (Red for CSR)
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="btn-control-csr"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>
          ) : (
            // TODO Server-side navigation (Blue for SSR)
            <Button
              onClick={router.refresh}
              variant="outline"
              className="btn-control-ssr"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>
          )}

          <p className="max-w-xs text-center text-xs text-slate-600 dark:text-slate-400">
            {useJS ? "Client-side refresh" : "Server-side navigation"}
          </p>
        </div>
      </div>
    </>
  );
}
