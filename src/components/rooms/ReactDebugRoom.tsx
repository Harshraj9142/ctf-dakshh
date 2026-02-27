"use client";

/**
 * 🔐 ROOM 1 — React Debug Room
 *
 * Concept: A modern dashboard UI with hidden flag parts.
 *
 * Flag: dakshh{react_debug_master}
 *
 * Flag locations:
 * 1. data-flag attribute on a hidden div (inspect DOM)
 * 2. Hidden React state revealed by Ctrl+Shift+D
 * 3. Exposed "sourcemap" comment in page source
 *
 * Intended solve path:
 * - Open DevTools, inspect elements → find data-flag
 * - Press Ctrl+Shift+D → debug panel reveals state
 * - View page source → find sourcemap comment
 * - Combine: react_ + debug_ + master
 *
 * Security lesson: Client-side data is never truly hidden.
 * React state, data attributes, and source maps are all accessible.
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    BarChart3,
    Users,
    Activity,
    Shield,
    Eye,
    EyeOff,
    Terminal,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ReactDebugRoom() {
    const [debugMode, setDebugMode] = useState(false);
    // 🔐 Flag part 2 hidden in React state — revealed by debug mode
    const [hiddenState] = useState({
        _internal: {
            debug_fragment: "debug_",
            timestamp: Date.now(),
            session: "x8f2k",
        },
    });

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            // Ctrl+Shift+D toggles debug mode
            if (e.ctrlKey && e.shiftKey && e.key === "D") {
                e.preventDefault();
                setDebugMode((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const stats = [
        { label: "Active Users", value: "12,847", icon: Users, change: "+12.5%" },
        { label: "Threats Blocked", value: "3,291", icon: Shield, change: "+8.2%" },
        { label: "Network Load", value: "67%", icon: Activity, change: "-2.1%" },
        { label: "Data Processed", value: "1.2TB", icon: BarChart3, change: "+15.7%" },
    ];

    return (
        <div className="space-y-6">
            {/* 🔐 Flag part 1: hidden as data-flag attribute. Inspect this element in DevTools. */}
            <div
                data-flag="react_"
                data-room="debug-dashboard"
                className="hidden"
                aria-hidden="true"
            />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold neon-text" style={{ fontFamily: "'Orbitron', monospace" }}>
                        System Dashboard
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Monitor real-time security metrics
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="default" className="animate-pulse-neon">
                        <Activity className="h-3 w-3 mr-1" /> LIVE
                    </Badge>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <stat.icon className="h-5 w-5 text-[var(--neon-cyan)]" />
                                    <span
                                        className={`text-xs font-bold ${stat.change.startsWith("+")
                                                ? "text-[var(--neon-green)]"
                                                : "text-[var(--neon-red)]"
                                            }`}
                                    >
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-2xl font-black text-[var(--text-primary)]">{stat.value}</p>
                                <p className="text-xs text-[var(--text-secondary)] mt-1">{stat.label}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Activity Feed */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[
                            { time: "2 min ago", event: "Firewall rule updated", type: "info" },
                            { time: "5 min ago", event: "Suspicious login detected", type: "warn" },
                            { time: "12 min ago", event: "SSL certificate renewed", type: "success" },
                            { time: "1 hr ago", event: "Database backup completed", type: "success" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-xs">
                                <span className="text-[var(--text-secondary)] w-20 shrink-0">{item.time}</span>
                                <div
                                    className={`w-1.5 h-1.5 rounded-full ${item.type === "warn"
                                            ? "bg-[var(--neon-yellow)]"
                                            : item.type === "success"
                                                ? "bg-[var(--neon-green)]"
                                                : "bg-[var(--neon-cyan)]"
                                        }`}
                                />
                                <span>{item.event}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Debug Panel — Hidden until Ctrl+Shift+D */}
            {debugMode && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border border-[var(--neon-yellow)] bg-[rgba(240,255,0,0.05)] rounded-lg p-4"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Terminal className="h-4 w-4 text-[var(--neon-yellow)]" />
                        <span className="text-xs font-bold text-[var(--neon-yellow)] uppercase tracking-wider">
                            Debug Panel Active
                        </span>
                    </div>
                    <pre className="text-xs text-[var(--neon-green)] font-mono overflow-x-auto">
                        {JSON.stringify(hiddenState, null, 2)}
                    </pre>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-2">
                        Hint: Combine what you found with the data attribute and the source comment below.
                    </p>
                </motion.div>
            )}

            {/* 🔐 Flag Part 3: Hidden in a "sourcemap" comment visible in page source / DevTools */}
            {/* //# sourceMappingURL=data:application/json;base64,eyJmbGFnX3BhcnRfMyI6Im1hc3RlciJ9 */}
            {/* Decoded: {"flag_part_3":"master"} */}

            <div className="text-center mt-6">
                <p className="text-xs text-[var(--text-secondary)]">
                    <Eye className="h-3 w-3 inline mr-1" />
                    Everything on the client is visible. Look deeper.
                </p>
            </div>
        </div>
    );
}
