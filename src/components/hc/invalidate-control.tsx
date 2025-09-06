// Server Components for handling server-side logic
import { InvalidateTagHandler, InvalidatePathHandler } from "./invalidate-handler";
import type { InvalidateTagControlProps, InvalidatePathControlProps } from "./invalidate-handler";

export async function InvalidateTagControl({
  tags,
  disabled,
  className,
  label,
}: InvalidateTagControlProps) {
  // Server-side validation could go here
  const canInvalidate = true; // Could check permissions, environment, etc.
  
  return (
    <InvalidateTagHandler
      tags={tags}
      disabled={disabled}
      className={className}
      label={label}
      canInvalidate={canInvalidate}
    />
  );
}

export async function InvalidatePathControl({
  path,
  disabled,
  className,
  label,
}: InvalidatePathControlProps) {
  // Server-side validation could go here
  const canInvalidate = true; // Could check permissions, environment, etc.
  
  return (
    <InvalidatePathHandler
      path={path}
      disabled={disabled}
      className={className}
      label={label}
      canInvalidate={canInvalidate}
    />
  );
}

// Re-export types
export type { InvalidateTagControlProps, InvalidatePathControlProps } from "./invalidate-handler";