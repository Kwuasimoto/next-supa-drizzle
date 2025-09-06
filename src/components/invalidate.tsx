// Re-export new Control/Handler pattern components
export {
  InvalidateTagControl,
  InvalidatePathControl,
  type InvalidateTagControlProps,
  type InvalidatePathControlProps,
} from "./hc/invalidate-control";

export {
  InvalidateTagHandler,
  InvalidatePathHandler,
  type InvalidateTagHandlerProps,
  type InvalidatePathHandlerProps,
} from "./hc/invalidate-handler";

// Backward compatibility - default to Server Components (Control pattern)
export { InvalidateTagControl as InvalidateTag } from "./hc/invalidate-control";
export { InvalidatePathControl as InvalidatePath } from "./hc/invalidate-control";

// Backward compatibility types
export type { InvalidateTagControlProps as InvalidateTagProps } from "./hc/invalidate-handler";
export type { InvalidatePathControlProps as InvalidatePathProps } from "./hc/invalidate-handler";
