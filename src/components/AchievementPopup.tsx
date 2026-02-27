"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

interface AchievementPopupProps {
    achievement: { title: string; icon: string; description: string } | null;
    onClose: () => void;
}

export default function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (achievement) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 300);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [achievement, onClose]);

    return (
        <AnimatePresence>
            {visible && achievement && (
                <motion.div
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 400, opacity: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="fixed top-4 right-4 z-[100] glass-panel p-4 border border-[var(--neon-yellow)] shadow-[0_0_20px_rgba(240,255,0,0.3)] max-w-sm"
                >
                    <div className="flex items-center gap-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                            <div className="flex items-center gap-2">
                                <Trophy className="h-4 w-4 text-[var(--neon-yellow)]" />
                                <span className="text-[var(--neon-yellow)] text-xs uppercase tracking-wider font-bold">
                                    Achievement Unlocked
                                </span>
                            </div>
                            <p className="text-[var(--text-primary)] font-bold mt-1">{achievement.title}</p>
                            <p className="text-[var(--text-secondary)] text-xs mt-0.5">{achievement.description}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
