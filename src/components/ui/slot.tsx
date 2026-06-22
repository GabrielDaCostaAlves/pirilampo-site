import * as React from "react";

/** Slot mínimo (estilo Radix): mescla as props no único filho recebido,
 *  permitindo `asChild`. Evita uma dependência extra. */
export const Slot = React.forwardRef<HTMLElement, { children?: React.ReactNode }>(
  ({ children, ...props }, ref) => {
    if (!React.isValidElement(children)) return null;
    const child = children as React.ReactElement<Record<string, unknown>>;
    return React.cloneElement(child, {
      ...props,
      ...child.props,
      className: [
        (props as { className?: string }).className,
        (child.props as { className?: string }).className,
      ]
        .filter(Boolean)
        .join(" "),
      ref,
    } as Record<string, unknown>);
  },
);
Slot.displayName = "Slot";
