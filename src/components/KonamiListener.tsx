"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

const KONAMI_CODE = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA",
];

export default function KonamiListener() {
    const position = useRef(0);
    const unlockKonami = useStore((s) => s.unlockKonami);
    const konamiUnlocked = useStore((s) => s.konamiUnlocked);

    useEffect(() => {
        if (konamiUnlocked) return;

        const handler = (e: KeyboardEvent) => {
            const expected = KONAMI_CODE[position.current];
            if (e.code === expected) {
                position.current++;
                if (position.current === KONAMI_CODE.length) {
                    unlockKonami();
                    position.current = 0;
                }
            } else {
                position.current = 0;
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [konamiUnlocked, unlockKonami]);

    return null;
}
