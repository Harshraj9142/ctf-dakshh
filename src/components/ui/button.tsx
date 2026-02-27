import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider font-mono",
    {
        variants: {
            variant: {
                default:
                    "bg-transparent border border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[rgba(0,240,255,0.1)] hover:shadow-[var(--glow-cyan)] hover:-translate-y-0.5",
                destructive:
                    "bg-transparent border border-[var(--neon-red)] text-[var(--neon-red)] hover:bg-[rgba(255,7,58,0.1)]",
                outline:
                    "border border-[var(--cyber-border)] text-[var(--text-secondary)] hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)]",
                secondary:
                    "bg-[var(--cyber-card)] border border-[var(--cyber-border)] text-[var(--text-primary)] hover:border-[var(--neon-magenta)]",
                ghost:
                    "text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] hover:bg-[rgba(0,240,255,0.05)]",
                link: "text-[var(--neon-cyan)] underline-offset-4 hover:underline",
                neon: "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-magenta)] text-black font-bold hover:opacity-90 hover:shadow-[var(--glow-cyan)]",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-8 px-4 text-xs",
                lg: "h-12 px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
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
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
