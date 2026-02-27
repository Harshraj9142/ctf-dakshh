export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
    { id: "first_blood", title: "First Blood", description: "Solve your first challenge", icon: "🩸", unlocked: false },
    { id: "react_master", title: "React Inspector", description: "Solve the React Debug Room", icon: "⚛️", unlocked: false },
    { id: "wasm_wizard", title: "WASM Wizard", description: "Crack the WASM Vault", icon: "🔮", unlocked: false },
    { id: "time_lord", title: "Time Lord", description: "Travel through time", icon: "⏰", unlocked: false },
    { id: "shadow_walker", title: "Shadow Walker", description: "Intercept the service worker", icon: "👻", unlocked: false },
    { id: "css_sorcerer", title: "CSS Sorcerer", description: "See through CSS illusions", icon: "🎨", unlocked: false },
    { id: "completionist", title: "Completionist", description: "Solve all 5 rooms", icon: "🏆", unlocked: false },
    { id: "konami_master", title: "Konami Master", description: "Enter the secret code", icon: "🎮", unlocked: false },
    { id: "secret_finder", title: "Secret Finder", description: "Find the hidden dev room", icon: "🔍", unlocked: false },
    { id: "speed_demon", title: "Speed Demon", description: "Solve a room in under 60 seconds", icon: "⚡", unlocked: false },
];

export const ROOM_ACHIEVEMENT_MAP: Record<number, string> = {
    1: "react_master",
    2: "wasm_wizard",
    3: "time_lord",
    4: "shadow_walker",
    5: "css_sorcerer",
};
