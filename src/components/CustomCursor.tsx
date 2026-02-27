"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only apply custom cursor on non-touch devices
        if (typeof window !== "undefined" && "ontouchstart" in window) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX - 4}px`;
                dotRef.current.style.top = `${e.clientY - 4}px`;
            }
            if (ringRef.current) {
                ringRef.current.style.left = `${e.clientX - 15}px`;
                ringRef.current.style.top = `${e.clientY - 15}px`;
            }
        };

        document.body.classList.add("custom-cursor");
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.body.classList.remove("custom-cursor");
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot hidden md:block" />
            <div ref={ringRef} className="cursor-ring hidden md:block" />
        </>
    );
}
