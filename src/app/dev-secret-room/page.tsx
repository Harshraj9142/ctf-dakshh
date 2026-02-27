"use client";

/**
 * 🔐 Hidden Developer Room
 *
 * This page is only accessible via /dev-secret-room
 * Hinted at in robots.txt (Disallow: /dev-secret-room)
 * and sitemap.xml
 *
 * Contains debug tools and easter eggs.
 * Visiting this page unlocks the "Secret Finder" achievement.
 */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Terminal,
    Code2,
    Bug,
    Cpu,
    Activity,
    Monitor,
    HardDrive,
    Wifi,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function DevSecretRoom() {
    const visitDevRoom = useStore((s) => s.visitDevRoom);
    const devRoomVisited = useStore((s) => s.devRoomVisited);
    const rooms = useStore((s) => s.rooms);
    const xp = useStore((s) => s.xp);
    const achievements = useStore((s) => s.achievements);
    const router = useRouter();
    const [fps, setFps] = useState(0);

    useEffect(() => {
        visitDevRoom();
    }, [visitDevRoom]);

    // FPS counter
    useEffect(() => {
        let frames = 0;
        let lastTime = performance.now();

        const loop = () => {
            frames++;
            const now = performance.now();
            if (now - lastTime >= 1000) {
                setFps(frames);
                frames = 0;
                lastTime = now;
            }
            requestAnimationFrame(loop);
        };

        const id = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(id);
    }, []);

    const systemInfo = [
        { label: "Platform", value: typeof navigator !== "undefined" ? navigator.platform : "N/A", icon: Monitor },
        { label: "User Agent", value: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 50) + "..." : "N/A", icon: Cpu },
        { label: "Language", value: typeof navigator !== "undefined" ? navigator.language : "N/A", icon: Code2 },
        { label: "Online", value: typeof navigator !== "undefined" ? String(navigator.onLine) : "N/A", icon: Wifi },
        { label: "Memory", value: typeof performance !== "undefined" && (performance as any).memory ? `${Math.round((performance as any).memory.usedJSHeapSize / 1048576)} MB` : "N/A", icon: HardDrive },
        { label: "FPS", value: String(fps), icon: Activity },
    ];

    return (
        <div className="h-screen w-screen overflow-y-auto flex justify-center items-center">
            <div className="w-full max-w-2xl p-6 pt-20 pb-24 border border-transparent">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Bug className="h-6 w-6 text-[var(--neon-yellow)]" />
                        <h1
                            className="text-2xl font-black tracking-wider uppercase"
                            style={{
                                fontFamily: "'Orbitron', monospace",
                                color: "var(--neon-yellow)",
                                textShadow: "0 0 20px rgba(240,255,0,0.5)",
                            }}
                        >
                            DEV ROOM
                        </h1>
                        <Badge variant="solved">SECRET</Badge>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                        You found the hidden developer room! Achievement unlocked: Secret Finder 🔍
                    </p>
                    <Button onClick={() => router.push("/")} variant="ghost" size="sm" className="mt-2">
                        ← Back to Lobby
                    </Button>
                </motion.div>

                {/* System Info */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Terminal className="h-4 w-4" />
                            System Debug Info
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            {systemInfo.map((info) => (
                                <div key={info.label} className="glass-card p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <info.icon className="h-3 w-3 text-[var(--neon-cyan)]" />
                                        <span className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                                            {info.label}
                                        </span>
                                    </div>
                                    <p className="text-xs font-mono text-[var(--text-primary)] truncate">
                                        {info.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Game State */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-sm">Game State Dump</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-black rounded-md p-3 text-xs font-mono text-[var(--neon-green)] overflow-x-auto max-h-64 overflow-y-auto">
                            {JSON.stringify(
                                {
                                    rooms: rooms.map((r) => ({
                                        id: r.id,
                                        name: r.name,
                                        solved: r.solved,
                                        solvedAt: r.solvedAt,
                                    })),
                                    xp,
                                    achievements: achievements
                                        .filter((a) => a.unlocked)
                                        .map((a) => a.id),
                                },
                                null,
                                2
                            )}
                        </pre>
                    </CardContent>
                </Card>

                {/* Easter egg */}
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-xs text-[var(--text-secondary)] mb-2">
                            You are a true hacker. This room has no flag — it&apos;s the reward itself.
                        </p>
                        <p className="text-xs text-[var(--neon-cyan)]">
                            Konami code: ↑↑↓↓←→←→BA (anywhere on the site)
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
