"use client";

/**
 * 🔐 ROOM 5 — CSS Illusion Room
 *
 * Concept: Flag hidden in CSS.
 *
 * Flag: dakshh{css_never_lies}
 *
 * Flag locations:
 * 1. CSS custom property --flag-part-1, --flag-part-2, --flag-part-3 in globals.css
 * 2. base64-encoded SVG background on an element
 * 3. ::after pseudo-element with content property
 *
 * Intended solve path:
 * - Open DevTools → Inspect the room elements
 * - Check computed styles → find CSS custom properties
 * - Decode the base64 SVG → find embedded text
 * - Check pseudo-elements → find content value
 * - Combine: dakshh{ + css_never + _lies}
 *
 * Security lesson: CSS is fully inspectable. Never hide
 * sensitive data in stylesheets, variables, or pseudo-elements.
 */

import React from "react";
import { motion } from "framer-motion";
import { Palette, Eye, Layers, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CSSIllusionRoom() {
    // Base64 SVG containing hidden flag part
    // Decoded: <svg><text>css_never_lies</text></svg>
    const hiddenSvgBg = `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iNTAiPjx0ZXh0IHg9IjEwIiB5PSIzMCIgZmlsbD0iIzAwZjBmZiIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSI+Y3NzX25ldmVyX2xpZXM8L3RleHQ+PC9zdmc+")`;

    return (
        <div className="space-y-6 css-illusion-room">
            {/* Header */}
            <div className="text-center">
                <Palette className="h-12 w-12 mx-auto text-[var(--neon-magenta)] mb-3" />
                <h2
                    className="text-xl font-bold tracking-wider uppercase neon-text-magenta"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                >
                    CSS Illusion Chamber
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                    What you see is not always what it is
                </p>
            </div>

            {/* Illusory Art Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Card 1: Animated gradient */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="aspect-square rounded-lg overflow-hidden relative"
                    style={{
                        background:
                            "linear-gradient(135deg, #ff00e5, #00f0ff, #39ff14, #ff00e5)",
                        backgroundSize: "400% 400%",
                        animation: "cyber-gradient 6s ease infinite",
                    }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Layers className="h-8 w-8 text-white/70" />
                    </div>
                </motion.div>

                {/* Card 2: Contains hidden SVG background with flag */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="aspect-square rounded-lg overflow-hidden relative css-hidden-flag"
                    style={{
                        background: `var(--cyber-dark) ${hiddenSvgBg}`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "200px 50px",
                    }}
                >
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <Eye className="h-8 w-8 text-[var(--neon-cyan)]/50" />
                    </div>
                </motion.div>

                {/* Card 3: Rotating patterns */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="aspect-square rounded-lg overflow-hidden relative"
                    style={{ background: "var(--cyber-dark)" }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="absolute inset-[-50%]"
                        style={{
                            background:
                                "conic-gradient(from 0deg, transparent 0deg, #00f0ff20 30deg, transparent 60deg)",
                        }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-[var(--neon-cyan)]" />
                    </div>
                </motion.div>

                {/* Card 4: Glitch effect */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="aspect-square rounded-lg overflow-hidden relative"
                    style={{ background: "var(--cyber-dark)" }}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <motion.div
                            animate={{
                                x: [0, -2, 2, -1, 0],
                                opacity: [1, 0.8, 1, 0.9, 1],
                            }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="text-[var(--neon-magenta)] text-xs font-mono"
                        >
                            {"<style> .hidden { ... } </style>"}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Hint Cards */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">The Art of Deception</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-xs text-[var(--text-secondary)]">
                        This room hides its secrets in the language of style itself.
                    </p>
                    <div className="space-y-2">
                        <div className="glass-card p-3 text-xs">
                            <span className="text-[var(--neon-cyan)]">Clue 1:</span>{" "}
                            <span className="text-[var(--text-secondary)]">
                                CSS custom properties hold the first secret. Inspect the{" "}
                                <code>.css-illusion-room</code> class.
                            </span>
                        </div>
                        <div className="glass-card p-3 text-xs">
                            <span className="text-[var(--neon-magenta)]">Clue 2:</span>{" "}
                            <span className="text-[var(--text-secondary)]">
                                An SVG hides in plain sight, encoded in base64. Check background-image properties.
                            </span>
                        </div>
                        <div className="glass-card p-3 text-xs">
                            <span className="text-[var(--neon-green)]">Clue 3:</span>{" "}
                            <span className="text-[var(--text-secondary)]">
                                Pseudo-elements speak in whispers. Check <code>::after</code> content.
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Visual hint */}
            <div className="text-center">
                <p className="text-[10px] text-[var(--text-secondary)]">
                    Remember: in CSS, everything is transparent to those who inspect.
                </p>
            </div>
        </div>
    );
}
