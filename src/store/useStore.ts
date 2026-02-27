"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ACHIEVEMENTS, Achievement, ROOM_ACHIEVEMENT_MAP } from "@/lib/achievements";

export interface LeaderboardEntry {
    rank: number;
    name: string;
    score: number;
    solved: number;
}

export interface RoomInfo {
    id: number;
    name: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard";
    category: string;
    solved: boolean;
    solvedAt?: number;
    points: number;
}

interface StoreState {
    // Rooms
    rooms: RoomInfo[];
    solveRoom: (roomId: number) => void;
    getSolvedCount: () => number;

    // XP
    xp: number;
    addXP: (amount: number) => void;

    // Achievements
    achievements: Achievement[];
    unlockAchievement: (id: string) => void;

    // Settings
    theme: "cyber" | "terminal";
    toggleTheme: () => void;
    soundEnabled: boolean;
    toggleSound: () => void;
    motionEnabled: boolean;
    toggleMotion: () => void;

    // Konami
    konamiUnlocked: boolean;
    unlockKonami: () => void;

    // Dev room visited
    devRoomVisited: boolean;
    visitDevRoom: () => void;

    // Leaderboard (fake)
    leaderboard: LeaderboardEntry[];

    // Room entry time tracking
    roomEntryTime: number | null;
    setRoomEntryTime: (time: number | null) => void;
}

const FAKE_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, name: "sh4d0w_h4ck3r", score: 2500, solved: 5 },
    { rank: 2, name: "cyb3r_ph4ntom", score: 2000, solved: 4 },
    { rank: 3, name: "n30n_wr4ith", score: 1800, solved: 4 },
    { rank: 4, name: "d4rk_null", score: 1500, solved: 3 },
    { rank: 5, name: "gl1tch_b0t", score: 1200, solved: 3 },
    { rank: 6, name: "r00t_3xpl0it", score: 1000, solved: 2 },
    { rank: 7, name: "z3r0_d4y", score: 800, solved: 2 },
    { rank: 8, name: "h4x_m4ch1n3", score: 600, solved: 1 },
    { rank: 9, name: "c0d3_ninja", score: 400, solved: 1 },
    { rank: 10, name: "bin4ry_gh0st", score: 200, solved: 1 },
];

const INITIAL_ROOMS: RoomInfo[] = [
    {
        id: 1,
        name: "React Debug Room",
        description: "Inspect a modern dashboard UI. Find hidden flags in React state, data attributes, and sourcemaps.",
        difficulty: "Easy",
        category: "Web / React",
        solved: false,
        points: 300,
    },
    {
        id: 2,
        name: "WASM Vault Room",
        description: "Crack open a vault protected by WebAssembly. Reverse-engineer XOR encryption logic.",
        difficulty: "Hard",
        category: "Reverse Engineering",
        solved: false,
        points: 500,
    },
    {
        id: 3,
        name: "Time Travel Room",
        description: "Manipulate time itself. Fake a 365-day login streak to unlock the reward.",
        difficulty: "Medium",
        category: "Client-Side",
        solved: false,
        points: 400,
    },
    {
        id: 4,
        name: "Service Worker Proxy",
        description: "Intercept shadow network requests. Find the flag hidden in an obfuscated service worker.",
        difficulty: "Hard",
        category: "Network / SW",
        solved: false,
        points: 500,
    },
    {
        id: 5,
        name: "CSS Illusion Room",
        description: "Nothing is what it seems. Decode CSS variables, base64 SVGs, and pseudo-element secrets.",
        difficulty: "Medium",
        category: "CSS / Forensics",
        solved: false,
        points: 400,
    },
];

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            // Rooms
            rooms: INITIAL_ROOMS,
            solveRoom: (roomId: number) => {
                const state = get();
                const alreadySolved = state.rooms.find((r) => r.id === roomId)?.solved;
                if (alreadySolved) return;

                set((s) => ({
                    rooms: s.rooms.map((r) =>
                        r.id === roomId ? { ...r, solved: true, solvedAt: Date.now() } : r
                    ),
                }));

                // Add XP
                const room = state.rooms.find((r) => r.id === roomId);
                if (room) {
                    get().addXP(room.points);
                }

                // Unlock room achievement
                const achievementId = ROOM_ACHIEVEMENT_MAP[roomId];
                if (achievementId) {
                    get().unlockAchievement(achievementId);
                }

                // First blood
                if (state.getSolvedCount() === 0) {
                    get().unlockAchievement("first_blood");
                }

                // Speed demon check
                const entryTime = state.roomEntryTime;
                if (entryTime && Date.now() - entryTime < 60000) {
                    get().unlockAchievement("speed_demon");
                }

                // Completionist check (after solving)
                const newSolvedCount = get().rooms.filter((r) => r.solved).length;
                if (newSolvedCount === 5) {
                    get().unlockAchievement("completionist");
                }
            },
            getSolvedCount: () => get().rooms.filter((r) => r.solved).length,

            // XP
            xp: 0,
            addXP: (amount) => set((s) => ({ xp: s.xp + amount })),

            // Achievements
            achievements: ACHIEVEMENTS.map((a) => ({ ...a })),
            unlockAchievement: (id) =>
                set((s) => ({
                    achievements: s.achievements.map((a) =>
                        a.id === id ? { ...a, unlocked: true } : a
                    ),
                })),

            // Settings
            theme: "cyber",
            toggleTheme: () =>
                set((s) => ({ theme: s.theme === "cyber" ? "terminal" : "cyber" })),
            soundEnabled: false,
            toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
            motionEnabled: true,
            toggleMotion: () => set((s) => ({ motionEnabled: !s.motionEnabled })),

            // Konami
            konamiUnlocked: false,
            unlockKonami: () => {
                set({ konamiUnlocked: true });
                get().unlockAchievement("konami_master");
            },

            // Dev room
            devRoomVisited: false,
            visitDevRoom: () => {
                set({ devRoomVisited: true });
                get().unlockAchievement("secret_finder");
            },

            // Leaderboard
            leaderboard: FAKE_LEADERBOARD,

            // Room entry
            roomEntryTime: null,
            setRoomEntryTime: (time) => set({ roomEntryTime: time }),
        }),
        {
            name: "dakshh-cyber-rooms",
            partialize: (state) => ({
                rooms: state.rooms,
                xp: state.xp,
                achievements: state.achievements,
                theme: state.theme,
                soundEnabled: state.soundEnabled,
                motionEnabled: state.motionEnabled,
                konamiUnlocked: state.konamiUnlocked,
                devRoomVisited: state.devRoomVisited,
                leaderboard: state.leaderboard,
            }),
        }
    )
);
