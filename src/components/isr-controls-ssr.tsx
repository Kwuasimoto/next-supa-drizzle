import { RefreshCw } from "lucide-react";
import { invalidatePathFormAction } from "@/actions/invalidate-actions";

export function ISRControlsSSR() {
  return (
    <div className="grid grid-cols-1 grid-rows-2 items-center justify-items-center gap-4 sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex flex-col items-center space-y-2">
        <p className="w-fit text-sm font-medium">Manual Cache Invalidation:</p>

        {/* Enhanced form with loading state */}
        <form action={invalidatePathFormAction}>
          <input type="hidden" name="path" value="/isr" />
          <button
            type="submit"
            className="border-input bg-secondary ring-offset-background focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"
          >
            <RefreshCw className={`mr-2 h-4 w-4`} />
            Force Revalidate ISR Page
          </button>
        </form>

        <p className="max-w-32 text-center text-xs text-gray-500">
          Server-side cache invalidation
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <p className="w-fit text-sm font-medium">Manual Page Refresh:</p>

        <a
          href="/isr?refresh=true"
          className="border-input bg-secondary ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Page
        </a>

        <p className="max-w-32 text-center text-xs text-gray-500">
          Server-side page refresh
        </p>
      </div>
    </div>
  );
}
