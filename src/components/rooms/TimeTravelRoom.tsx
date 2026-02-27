"use client";

/**
 * 🔐 ROOM 3 — Time Travel Room
 *
 * Concept: Daily login reward system.
 *
 * Flag: dakshh{time_traveler}
 *
 * The room shows a daily login streak counter.
 * When the streak reaches 365, the flag is revealed.
 *
 * Intended solve path:
 * - Open DevTools → Application → Local Storage
 * - Find the key "dakshh-time-travel-streak"
 * - Change its value to 365
 * - Refresh or click "Claim Reward"
 * - Flag revealed
 *
 * Security lesson: localStorage is trivially modifiable.
 * Never use client-side storage for access control or rewards.
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Gift, Star, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STREAK_KEY = "dakshh-time-travel-streak";
const LAST_LOGIN_KEY = "dakshh-time-travel-last-login";
const TARGET_STREAK = 365;

export default function TimeTravelRoom() {
    const [streak, setStreak] = useState(0);
    const [lastLogin, setLastLogin] = useState<string | null>(null);
    const [canClaim, setCanClaim] = useState(false);
    const [flagRevealed, setFlagRevealed] = useState(false);

    useEffect(() => {
        // Load from localStorage
        const savedStreak = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);
        const savedLastLogin = localStorage.getItem(LAST_LOGIN_KEY);
        setStreak(savedStreak);
        setLastLogin(savedLastLogin);

        // Check if user can claim today
        const today = new Date().toDateString();
        if (savedLastLogin !== today) {
            setCanClaim(true);
        }

        // Check if flag should be revealed
        if (savedStreak >= TARGET_STREAK) {
            setFlagRevealed(true);
        }
    }, []);

    const claimDailyReward = () => {
        // Re-read from localStorage each time (allows manipulation)
        const currentStreak = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);
        const newStreak = currentStreak + 1;
        const today = new Date().toDateString();

        localStorage.setItem(STREAK_KEY, String(newStreak));
        localStorage.setItem(LAST_LOGIN_KEY, today);

        setStreak(newStreak);
        setLastLogin(today);
        setCanClaim(false);

        if (newStreak >= TARGET_STREAK) {
            setFlagRevealed(true);
        }
    };

    const checkStreak = () => {
        // Re-read from localStorage (this is the manipulation entry point)
        const currentStreak = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);
        setStreak(currentStreak);
        if (currentStreak >= TARGET_STREAK) {
            setFlagRevealed(true);
        }
    };

    const progressPercent = Math.min((streak / TARGET_STREAK) * 100, 100);
    const milestones = [7, 30, 90, 180, 365];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <Clock className="h-12 w-12 mx-auto text-[var(--neon-magenta)] mb-3" />
                <h2
                    className="text-xl font-bold tracking-wider uppercase neon-text-magenta"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                >
                    Time Travel Chamber
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Maintain a 365-day login streak to unlock the temporal vault
                </p>
            </div>

            {/* Streak Counter */}
            <Card>
                <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Zap className="h-5 w-5 text-[var(--neon-yellow)]" />
                        <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                            Current Streak
                        </span>
                    </div>
                    <motion.div
                        key={streak}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-5xl font-black mb-2"
                        style={{
                            fontFamily: "'Orbitron', monospace",
                            color: streak >= TARGET_STREAK ? "var(--neon-green)" : "var(--neon-cyan)",
                        }}
                    >
                        {streak}
                    </motion.div>
                    <p className="text-xs text-[var(--text-secondary)]">/ {TARGET_STREAK} days</p>

                    {/* Progress Bar */}
                    <div className="mt-4 h-3 bg-[var(--cyber-dark)] rounded-full overflow-hidden border border-[var(--cyber-border)]">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background:
                                    progressPercent >= 100
                                        ? "var(--neon-green)"
                                        : "linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))",
                            }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    </div>

                    {/* Milestones */}
                    <div className="flex justify-between mt-3">
                        {milestones.map((m) => (
                            <div key={m} className="text-center">
                                <Star
                                    className={`h-3 w-3 mx-auto ${streak >= m ? "text-[var(--neon-yellow)]" : "text-[var(--text-secondary)]"
                                        }`}
                                    fill={streak >= m ? "var(--neon-yellow)" : "none"}
                                />
                                <span className="text-[9px] text-[var(--text-secondary)]">{m}d</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
                <Button
                    onClick={claimDailyReward}
                    variant="neon"
                    className="flex-1"
                    disabled={!canClaim && streak < TARGET_STREAK}
                >
                    <Gift className="h-4 w-4 mr-2" />
                    {canClaim ? "Claim Daily Login" : "Already Claimed"}
                </Button>
                <Button onClick={checkStreak} variant="outline" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Check Streak
                </Button>
            </div>

            {/* Flag Reveal */}
            {flagRevealed ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 border-2 border-[var(--neon-green)] bg-[rgba(57,255,20,0.05)] rounded-lg text-center"
                >
                    <Trophy className="h-8 w-8 mx-auto text-[var(--neon-yellow)] mb-3" />
                    <p className="text-xs uppercase tracking-wider text-[var(--neon-green)] mb-2">
                        365-Day Streak Achieved!
                    </p>
                    <p className="text-lg font-mono font-bold text-[var(--neon-green)]">
                        dakshh&#123;time_traveler&#125;
                    </p>
                </motion.div>
            ) : (
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="text-xs text-[var(--text-secondary)]">
                            💡 Hint: The streak is stored in localStorage. Can you travel through time?
                        </p>
                        <p className="text-[10px] text-[var(--text-secondary)] mt-1">
                            Key: <code className="text-[var(--neon-cyan)]">{STREAK_KEY}</code>
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
