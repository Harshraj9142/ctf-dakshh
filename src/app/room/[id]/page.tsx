"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/store/useStore";

import ReactDebugRoom from "@/components/rooms/ReactDebugRoom";
import WasmVaultRoom from "@/components/rooms/WasmVaultRoom";
import TimeTravelRoom from "@/components/rooms/TimeTravelRoom";
import ServiceWorkerRoom from "@/components/rooms/ServiceWorkerRoom";
import CSSIllusionRoom from "@/components/rooms/CSSIllusionRoom";

const ROOM_COMPONENTS: Record<string, React.ComponentType> = {
    "1": ReactDebugRoom,
    "2": WasmVaultRoom,
    "3": TimeTravelRoom,
    "4": ServiceWorkerRoom,
    "5": CSSIllusionRoom,
};

export default function RoomPage() {
    const params = useParams();
    const router = useRouter();
    const roomId = params.id as string;
    const rooms = useStore((s) => s.rooms);
    const setRoomEntryTime = useStore((s) => s.setRoomEntryTime);

    const room = rooms.find((r) => r.id === parseInt(roomId));
    const RoomComponent = ROOM_COMPONENTS[roomId];

    useEffect(() => {
        setRoomEntryTime(Date.now());
    }, [setRoomEntryTime]);

    if (!room || !RoomComponent) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold neon-text mb-4">Room Not Found</h2>
                    <Button onClick={() => router.push("/")} variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Lobby
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen overflow-y-auto">
            <div className="max-w-2xl mx-auto p-6 pb-24">
                {/* Room Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-6"
                >
                    <Button
                        onClick={() => router.push("/")}
                        variant="ghost"
                        size="sm"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Lobby
                    </Button>

                    <div className="flex items-center gap-2">
                        <Badge variant={room.difficulty.toLowerCase() as "easy" | "medium" | "hard"}>
                            {room.difficulty}
                        </Badge>
                        <Badge variant={room.solved ? "solved" : "unsolved"}>
                            {room.solved ? "✓ Solved" : "Unsolved"}
                        </Badge>
                        <span className="text-xs text-[var(--text-secondary)]">{room.points} pts</span>
                    </div>
                </motion.div>

                {/* Room Title */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <h1
                        className="text-2xl font-black tracking-wider uppercase neon-text"
                        style={{ fontFamily: "'Orbitron', monospace" }}
                    >
                        {room.name}
                    </h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">{room.description}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Category: <span className="text-[var(--neon-cyan)]">{room.category}</span>
                    </p>
                </motion.div>

                {/* Room Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <RoomComponent />
                </motion.div>
            </div>
        </div>
    );
}
