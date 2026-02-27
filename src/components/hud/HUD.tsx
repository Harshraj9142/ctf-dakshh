"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FlagModal from "@/components/FlagModal";
import AchievementPopup from "@/components/AchievementPopup";
import {
    Flag,
    LayoutDashboard,
    Trophy,
    Zap,
    Volume2,
    VolumeX,
    Monitor,
    Terminal,
    ChevronLeft,
    ChevronRight,
    Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HUD() {
    const [flagOpen, setFlagOpen] = useState(false);
    const [dashOpen, setDashOpen] = useState(false);
    const [pendingAchievement, setPendingAchievement] = useState<{
        title: string;
        icon: string;
        description: string;
    } | null>(null);

    const rooms = useStore((s) => s.rooms);
    const xp = useStore((s) => s.xp);
    const achievements = useStore((s) => s.achievements);
    const theme = useStore((s) => s.theme);
    const toggleTheme = useStore((s) => s.toggleTheme);
    const soundEnabled = useStore((s) => s.soundEnabled);
    const toggleSound = useStore((s) => s.toggleSound);

    const solvedCount = rooms.filter((r) => r.solved).length;
    const unlockedAchievements = achievements.filter((a) => a.unlocked);

    // Watch for new achievement unlocks
    const prevUnlocked = React.useRef(unlockedAchievements.length);
    useEffect(() => {
        if (unlockedAchievements.length > prevUnlocked.current) {
            const newest = unlockedAchievements[unlockedAchievements.length - 1];
            setPendingAchievement(newest);
        }
        prevUnlocked.current = unlockedAchievements.length;
    }, [unlockedAchievements]);

    return (
        <>
            {/* Top Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
                <div className="flex items-center justify-between p-4">
                    {/* Left: Logo */}
                    <div className="pointer-events-auto">
                        <h1 className="text-lg font-black tracking-[0.3em] uppercase neon-text animate-pulse-neon">
                            DAKSHH CYBER ROOMS
                        </h1>
                        <p className="text-[10px] text-[var(--text-secondary)] tracking-[0.2em] uppercase mt-0.5">
                            Capture The Flag Training Facility
                        </p>
                    </div>

                    {/* Right: Stats */}
                    <div className="pointer-events-auto flex items-center gap-3">
                        {/* XP */}
                        <div className="glass-panel px-3 py-1.5 flex items-center gap-2">
                            <Zap className="h-3.5 w-3.5 text-[var(--neon-yellow)]" />
                            <span className="text-xs font-bold text-[var(--neon-yellow)]">{xp} XP</span>
                        </div>

                        {/* Flags */}
                        <div className="glass-panel px-3 py-1.5 flex items-center gap-2">
                            <Target className="h-3.5 w-3.5 text-[var(--neon-green)]" />
                            <span className="text-xs font-bold text-[var(--neon-green)]">{solvedCount}/5</span>
                        </div>

                        {/* Sound Toggle */}
                        <Button variant="ghost" size="icon" onClick={toggleSound} className="h-8 w-8">
                            {soundEnabled ? (
                                <Volume2 className="h-4 w-4" />
                            ) : (
                                <VolumeX className="h-4 w-4" />
                            )}
                        </Button>

                        {/* Theme Toggle */}
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
                            {theme === "cyber" ? (
                                <Monitor className="h-4 w-4" />
                            ) : (
                                <Terminal className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
                <div className="flex items-end justify-between p-4">
                    {/* Dashboard Toggle */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="pointer-events-auto"
                        onClick={() => setDashOpen(!dashOpen)}
                    >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                    </Button>

                    {/* Submit Flag Button */}
                    <Button
                        variant="neon"
                        className="pointer-events-auto"
                        onClick={() => setFlagOpen(true)}
                    >
                        <Flag className="h-4 w-4 mr-2" />
                        Submit Flag
                    </Button>
                </div>
            </div>

            {/* Dashboard Sidebar */}
            <AnimatePresence>
                {dashOpen && (
                    <motion.div
                        initial={{ x: -400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -400, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-80 z-50 glass-panel border-r border-[var(--cyber-border)] overflow-y-auto p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-sm font-bold tracking-wider uppercase neon-text">Dashboard</h2>
                            <Button variant="ghost" size="icon" onClick={() => setDashOpen(false)} className="h-6 w-6">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* XP Bar */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Experience</span>
                                <span className="text-xs font-bold text-[var(--neon-yellow)]">{xp} XP</span>
                            </div>
                            <div className="h-2 bg-[var(--cyber-dark)] rounded-full overflow-hidden border border-[var(--cyber-border)]">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-magenta)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((xp / 2100) * 100, 100)}%` }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </div>

                        {/* Room Status */}
                        <div className="mb-6">
                            <h3 className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-3">Rooms</h3>
                            <div className="space-y-2">
                                {rooms.map((room) => (
                                    <div
                                        key={room.id}
                                        className="glass-card p-3 flex items-center justify-between"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold truncate">{room.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant={room.difficulty.toLowerCase() as "easy" | "medium" | "hard"}>
                                                    {room.difficulty}
                                                </Badge>
                                                <span className="text-[10px] text-[var(--text-secondary)]">{room.points} pts</span>
                                            </div>
                                        </div>
                                        <Badge variant={room.solved ? "solved" : "unsolved"}>
                                            {room.solved ? "Solved" : "Open"}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div>
                            <h3 className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                                Achievements ({unlockedAchievements.length}/{achievements.length})
                            </h3>
                            <div className="grid grid-cols-5 gap-2">
                                {achievements.map((a) => (
                                    <div
                                        key={a.id}
                                        className={`aspect-square flex items-center justify-center rounded-lg text-lg border transition-all ${a.unlocked
                                                ? "border-[var(--neon-yellow)] bg-[rgba(240,255,0,0.1)] shadow-[0_0_10px_rgba(240,255,0,0.2)]"
                                                : "border-[var(--cyber-border)] bg-[var(--cyber-dark)] opacity-30"
                                            }`}
                                        title={a.unlocked ? `${a.title}: ${a.description}` : "???"}
                                    >
                                        {a.unlocked ? a.icon : "🔒"}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Flag Modal */}
            <FlagModal open={flagOpen} onOpenChange={setFlagOpen} />

            {/* Achievement Popup */}
            <AchievementPopup
                achievement={pendingAchievement}
                onClose={() => setPendingAchievement(null)}
            />
        </>
    );
}
