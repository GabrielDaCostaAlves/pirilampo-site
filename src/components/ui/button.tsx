import * as React from "react";
import { Slot } from "@/components/ui/slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-sky text-white shadow-[0_8px_24px_-8px_rgba(61,146,207,0.6)] hover:bg-sky-deep hover:-translate-y-0.5",
        glow: "bg-glow text-ink shadow-[0_8px_28px_-6px_rgba(244,183,58,0.65)] hover:bg-glow-deep hover:-translate-y-0.5",
        blossom:
          "bg-blossom text-white shadow-[0_8px_24px_-8px_rgba(236,111,163,0.55)] hover:bg-blossom-deep hover:-translate-y-0.5",
        outline:
          "border-2 border-line bg-white text-ink hover:border-sky hover:text-sky-deep",
        ghost: "text-ink hover:bg-cloud",
        link: "text-sky-deep underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-13 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
