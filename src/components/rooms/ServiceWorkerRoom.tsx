"use client";

/**
 * 🔐 ROOM 4 — Service Worker Proxy Room
 *
 * Concept: A fake API endpoint intercepted by a service worker.
 *
 * Flag: dakshh{service_worker_shadow}
 *
 * The room tries to fetch /api/secret, but a service worker
 * intercepts and returns a fake response. The real flag is
 * embedded in the service worker source code.
 *
 * Intended solve path:
 * - Click "Fetch Secret Data"
 * - Notice the response seems suspicious
 * - Open DevTools → Application → Service Workers
 * - Or navigate to /sw.js directly
 * - Read the service worker source → find the flag
 *
 * Security lesson: Service workers can intercept and modify
 * any network request. Always verify responses server-side.
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Wifi,
    WifiOff,
    Globe,
    Shield,
    Terminal,
    FileCode,
    AlertTriangle,
    RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ServiceWorkerRoom() {
    const [swRegistered, setSwRegistered] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [attempts, setAttempts] = useState(0);

    const addLog = (msg: string) => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    useEffect(() => {
        // Register service worker
        if ("serviceWorker" in navigator) {
            addLog("Checking for service worker support...");
            navigator.serviceWorker
                .register("/sw.js")
                .then(() => {
                    setSwRegistered(true);
                    addLog("✅ Service worker registered");
                    addLog("Shadow proxy active — intercepting /api/secret");
                })
                .catch((err) => {
                    addLog(`⚠️ SW registration failed: ${err.message}`);
                    addLog("Hint: The flag is in /sw.js — visit it directly");
                });
        } else {
            addLog("⚠️ Service workers not supported");
            addLog("Hint: Visit /sw.js directly in your browser");
        }
    }, []);

    const fetchSecret = async () => {
        setFetching(true);
        setAttempts((a) => a + 1);
        addLog(`Fetch attempt #${attempts + 1}: GET /api/secret`);

        try {
            const res = await fetch("/api/secret");
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
            addLog(`Response received: ${JSON.stringify(data)}`);
            addLog("🤔 Something seems off about this response...");
            addLog("💡 Hint: Who answered this request? Check the service worker.");
        } catch (err) {
            addLog("❌ Fetch failed. The service worker should intercept this.");
            setResponse("Error fetching data. Check DevTools > Application > Service Workers");
        }

        setFetching(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <Globe className="h-12 w-12 mx-auto text-[var(--neon-cyan)] mb-3" />
                <h2
                    className="text-xl font-bold tracking-wider uppercase neon-text"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                >
                    Shadow Proxy
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                    A service worker lurks between you and the server
                </p>
            </div>

            {/* Service Worker Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Service Worker Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {swRegistered ? (
                                <Wifi className="h-4 w-4 text-[var(--neon-green)]" />
                            ) : (
                                <WifiOff className="h-4 w-4 text-[var(--neon-red)]" />
                            )}
                            <span className="text-sm">
                                {swRegistered ? "Shadow Proxy Active" : "Not Registered"}
                            </span>
                        </div>
                        <Badge variant={swRegistered ? "solved" : "unsolved"}>
                            {swRegistered ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-2">
                        Scope: /sw.js | Intercepting: /api/secret
                    </p>
                </CardContent>
            </Card>

            {/* Fetch Button */}
            <Button onClick={fetchSecret} variant="neon" className="w-full" disabled={fetching}>
                {fetching ? (
                    <motion.span className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Fetching...
                    </motion.span>
                ) : (
                    <>
                        <Globe className="h-4 w-4 mr-2" />
                        Fetch Secret Data (/api/secret)
                    </>
                )}
            </Button>

            {/* Response Display */}
            {response && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                            <FileCode className="h-4 w-4" />
                            API Response
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-black rounded-md p-3 text-xs font-mono text-[var(--neon-yellow)] overflow-x-auto">
                            {response}
                        </pre>
                        <div className="mt-3 flex items-start gap-2 text-xs text-[var(--neon-yellow)]">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <p>
                                This response was intercepted by the service worker. The <b>real</b> flag
                                is hidden inside <code className="text-[var(--neon-cyan)]">/sw.js</code>.
                                View its source code.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Terminal Log */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Terminal className="h-4 w-4 text-[var(--neon-green)]" />
                        <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                            Network Log
                        </span>
                    </div>
                    <div className="bg-black rounded-md p-3 font-mono text-xs max-h-48 overflow-y-auto space-y-1">
                        {logs.map((log, i) => (
                            <div key={i} className="text-[var(--neon-green)]">
                                {log}
                            </div>
                        ))}
                        <span className="animate-pulse-neon">▊</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
