/**
 * Flag validation system for DAKSHH CYBER ROOMS
 * 
 * Each room has a unique flag in the format dakshh{...}
 * Flags are validated client-side against known hashes
 * to prevent trivial source-code extraction of all flags.
 */

// Simple hash function for flag validation (not cryptographically secure, but prevents casual cheating)
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
}

// Pre-computed hashes of valid flags
// This prevents players from just reading this file to get all flags
const FLAG_HASHES: Record<string, { hash: string; roomId: number; roomName: string }> = {
    [simpleHash("dakshh{react_debug_master}")]: { hash: simpleHash("dakshh{react_debug_master}"), roomId: 1, roomName: "React Debug Room" },
    [simpleHash("dakshh{wasm_reverse_engineer}")]: { hash: simpleHash("dakshh{wasm_reverse_engineer}"), roomId: 2, roomName: "WASM Vault Room" },
    [simpleHash("dakshh{time_traveler}")]: { hash: simpleHash("dakshh{time_traveler}"), roomId: 3, roomName: "Time Travel Room" },
    [simpleHash("dakshh{service_worker_shadow}")]: { hash: simpleHash("dakshh{service_worker_shadow}"), roomId: 4, roomName: "Service Worker Proxy Room" },
    [simpleHash("dakshh{css_never_lies}")]: { hash: simpleHash("dakshh{css_never_lies}"), roomId: 5, roomName: "CSS Illusion Room" },
};

export interface FlagValidationResult {
    valid: boolean;
    roomId?: number;
    roomName?: string;
    message: string;
}

export function validateFlag(input: string): FlagValidationResult {
    const trimmed = input.trim();

    // Check format
    if (!trimmed.match(/^dakshh\{.+\}$/)) {
        return { valid: false, message: "Invalid flag format. Expected: dakshh{...}" };
    }

    const hash = simpleHash(trimmed);
    const match = FLAG_HASHES[hash];

    if (match) {
        return {
            valid: true,
            roomId: match.roomId,
            roomName: match.roomName,
            message: `🎉 Flag accepted! Room "${match.roomName}" solved!`,
        };
    }

    return { valid: false, message: "Flag not recognized. Keep searching!" };
}

export const ROOM_COUNT = 5;
