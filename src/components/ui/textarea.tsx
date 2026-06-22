import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-24 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm text-ink shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/30 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
