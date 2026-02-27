import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md bg-[var(--cyber-dark)] border border-[var(--cyber-border)] px-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] font-mono tracking-wide focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[var(--glow-cyan)] transition-all disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
