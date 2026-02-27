"use client";

import React, { useEffect } from "react";
import { useStore } from "@/store/useStore";
import HUD from "@/components/hud/HUD";
import CustomCursor from "@/components/CustomCursor";
import KonamiListener from "@/components/KonamiListener";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const theme = useStore((s) => s.theme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <>
            <CustomCursor />
            <KonamiListener />
            <HUD />
            <main className="h-screen w-screen overflow-hidden">{children}</main>
        </>
    );
}
