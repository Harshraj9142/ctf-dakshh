"use client";

/**
 * 🔐 ROOM 2 — WASM Vault Room
 *
 * Concept: A vault terminal protected by WebAssembly.
 *
 * Flag: dakshh{wasm_reverse_engineer}
 *
 * The WASM module exports a check_password function that XOR-encodes
 * the input and compares it against a hardcoded byte sequence.
 *
 * Intended solve path:
 * - Inspect the WASM module bytes in the source code
 * - Find the XOR key (0x42) and the target bytes
 * - XOR each target byte with 0x42 to recover the password
 * - The password is "VAULT_OPEN"
 * - Entering "VAULT_OPEN" displays the flag
 *
 * Security lesson: Client-side WASM is just obfuscation, not security.
 * All bytecode can be reverse-engineered.
 */

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Terminal, Cpu, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function WasmVaultRoom() {
    const [password, setPassword] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [attempts, setAttempts] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const wasmRef = useRef<{ check_password: (input: string) => boolean } | null>(null);

    const addLog = (msg: string) => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    useEffect(() => {
        // Create a minimal WASM module that XOR-checks the password
        // The password is "VAULT_OPEN" XOR'd with key 0x42
        // V=0x56^0x42=0x14, A=0x41^0x42=0x03, U=0x55^0x42=0x17, L=0x4C^0x42=0x0E,
        // T=0x54^0x42=0x16, _=0x5F^0x42=0x1D, O=0x4F^0x42=0x0D, P=0x50^0x42=0x12,
        // E=0x45^0x42=0x07, N=0x4E^0x42=0x0C

        addLog("Initializing WASM vault module...");

        // Simulated WASM check (actual WASM would be overkill for a CTF demo;
        // we simulate the same XOR logic in JS but present it as WASM)
        const xorKey = 0x42;
        const targetBytes = [0x14, 0x03, 0x17, 0x0e, 0x16, 0x1d, 0x0d, 0x12, 0x07, 0x0c];

        // 🔐 XOR key and target bytes visible here — reverse engineer to find password
        const checkPassword = (input: string): boolean => {
            if (input.length !== targetBytes.length) return false;
            for (let i = 0; i < input.length; i++) {
                if ((input.charCodeAt(i) ^ xorKey) !== targetBytes[i]) return false;
            }
            return true;
        };

        wasmRef.current = { check_password: checkPassword };

        setTimeout(() => {
            setLoading(false);
            addLog("WASM module loaded successfully");
            addLog("Vault ready. Enter password to unlock.");
            addLog(`[DEBUG] XOR Key: 0x${xorKey.toString(16).toUpperCase()}`);
            addLog(`[DEBUG] Target: [${targetBytes.map((b) => "0x" + b.toString(16).padStart(2, "0").toUpperCase()).join(", ")}]`);
        }, 1500);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!wasmRef.current || !password) return;

        setAttempts((a) => a + 1);
        addLog(`Attempt #${attempts + 1}: Checking password...`);

        const result = wasmRef.current.check_password(password);

        if (result) {
            setUnlocked(true);
            setError("");
            addLog("✅ Password accepted! Vault unlocked!");
            addLog("🏴 Flag: dakshh{wasm_reverse_engineer}");
        } else {
            setError("Access denied. Invalid password.");
            addLog("❌ Password rejected.");
        }
    };

    return (
        <div className="space-y-6">
            {/* Vault Header */}
            <div className="text-center">
                <motion.div
                    animate={unlocked ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {unlocked ? (
                        <Unlock className="h-16 w-16 mx-auto text-[var(--neon-green)] mb-4" />
                    ) : (
                        <Lock className="h-16 w-16 mx-auto text-[var(--neon-red)] mb-4 animate-pulse-neon" />
                    )}
                </motion.div>
                <h2
                    className="text-xl font-bold tracking-wider uppercase"
                    style={{
                        fontFamily: "'Orbitron', monospace",
                        color: unlocked ? "var(--neon-green)" : "var(--neon-red)",
                    }}
                >
                    {unlocked ? "VAULT UNLOCKED" : "WASM VAULT"}
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {unlocked
                        ? "Access granted. Flag retrieved."
                        : "Password protected by WebAssembly encryption"}
                </p>
            </div>

            {/* Password Form */}
            {!unlocked && (
                <Card>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Cpu className="h-4 w-4 text-[var(--neon-cyan)]" />
                                <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                                    WASM Vault Terminal
                                </span>
                            </div>
                            <Input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                placeholder="Enter vault password..."
                                disabled={loading}
                                className="font-mono"
                            />
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xs text-[var(--neon-red)] flex items-center gap-1"
                                >
                                    <AlertTriangle className="h-3 w-3" />
                                    {error}
                                </motion.p>
                            )}
                            <Button type="submit" variant="default" className="w-full" disabled={loading}>
                                {loading ? "Loading WASM..." : "Authenticate"}
                            </Button>
                        </form>
                        <p className="text-[10px] text-[var(--text-secondary)] mt-3 text-center">
                            Attempts: {attempts} | Hint: The password is XOR-encrypted in the WASM module
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Flag Display */}
            {unlocked && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 border-2 border-[var(--neon-green)] bg-[rgba(57,255,20,0.05)] rounded-lg text-center"
                >
                    <p className="text-lg font-mono font-bold text-[var(--neon-green)]">
                        dakshh&#123;wasm_reverse_engineer&#125;
                    </p>
                </motion.div>
            )}

            {/* Terminal Log */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Terminal className="h-4 w-4 text-[var(--neon-green)]" />
                        <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                            System Log
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
