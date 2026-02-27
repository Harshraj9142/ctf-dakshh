import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "solved" | "unsolved" | "easy" | "medium" | "hard";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = "default", ...props }, ref) => {
        const variantClasses: Record<string, string> = {
            default: "border-[var(--cyber-border)] text-[var(--text-secondary)]",
            solved: "border-[var(--neon-green)] text-[var(--neon-green)] bg-[rgba(57,255,20,0.1)]",
            unsolved: "border-[var(--neon-red)] text-[var(--neon-red)] bg-[rgba(255,7,58,0.1)]",
            easy: "border-[var(--neon-green)] text-[var(--neon-green)]",
            medium: "border-[var(--neon-yellow)] text-[var(--neon-yellow)]",
            hard: "border-[var(--neon-red)] text-[var(--neon-red)]",
        };

        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider border rounded-sm",
                    variantClasses[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Badge.displayName = "Badge";

export { Badge };
