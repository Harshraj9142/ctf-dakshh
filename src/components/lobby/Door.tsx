"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

interface DoorProps {
    roomId: number;
    position: [number, number, number];
    rotation?: [number, number, number];
    label: string;
    difficulty: string;
}

export default function Door({ roomId, position, rotation = [0, 0, 0], label, difficulty }: DoorProps) {
    const meshRef = useRef<THREE.Group>(null!);
    const glowRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = React.useState(false);
    const router = useRouter();
    const rooms = useStore((s) => s.rooms);
    const setRoomEntryTime = useStore((s) => s.setRoomEntryTime);
    const solved = rooms.find((r) => r.id === roomId)?.solved || false;

    const baseColor = solved ? "#39ff14" : "#00f0ff";
    const hoverColor = solved ? "#7fff50" : "#ff00e5";

    useFrame((state) => {
        if (!meshRef.current) return;
        // Subtle float animation
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + roomId) * 0.05;

        // Glow pulse
        if (glowRef.current) {
            const mat = glowRef.current.material as THREE.MeshBasicMaterial;
            const intensity = hovered ? 0.8 : 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
            mat.opacity = intensity;
        }
    });

    const handleClick = () => {
        setRoomEntryTime(Date.now());
        router.push(`/room/${roomId}`);
    };

    const difficultyColor = difficulty === "Easy" ? "#39ff14" : difficulty === "Medium" ? "#f0ff00" : "#ff073a";

    return (
        <group
            ref={meshRef}
            position={position}
            rotation={rotation}
            onClick={handleClick}
            onPointerOver={() => {
                setHovered(true);
                document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = "none";
            }}
        >
            {/* Door Frame */}
            <mesh position={[0, 1.2, 0]}>
                <boxGeometry args={[1.4, 2.6, 0.15]} />
                <meshStandardMaterial
                    color="#111122"
                    metalness={0.8}
                    roughness={0.3}
                />
            </mesh>

            {/* Door Panel */}
            <mesh position={[0, 1.2, 0.08]}>
                <boxGeometry args={[1.1, 2.3, 0.05]} />
                <meshStandardMaterial
                    color={hovered ? "#1a1a3a" : "#0a0a1f"}
                    metalness={0.6}
                    roughness={0.4}
                    emissive={hovered ? hoverColor : baseColor}
                    emissiveIntensity={hovered ? 0.3 : 0.1}
                />
            </mesh>

            {/* Neon border lines */}
            {/* Top */}
            <mesh position={[0, 2.45, 0.12]}>
                <boxGeometry args={[1.3, 0.03, 0.03]} />
                <meshBasicMaterial color={hovered ? hoverColor : baseColor} />
            </mesh>
            {/* Bottom */}
            <mesh position={[0, -0.05, 0.12]}>
                <boxGeometry args={[1.3, 0.03, 0.03]} />
                <meshBasicMaterial color={hovered ? hoverColor : baseColor} />
            </mesh>
            {/* Left */}
            <mesh position={[-0.65, 1.2, 0.12]}>
                <boxGeometry args={[0.03, 2.5, 0.03]} />
                <meshBasicMaterial color={hovered ? hoverColor : baseColor} />
            </mesh>
            {/* Right */}
            <mesh position={[0.65, 1.2, 0.12]}>
                <boxGeometry args={[0.03, 2.5, 0.03]} />
                <meshBasicMaterial color={hovered ? hoverColor : baseColor} />
            </mesh>

            {/* Door handle */}
            <mesh position={[0.4, 1.2, 0.15]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial
                    color={baseColor}
                    emissive={baseColor}
                    emissiveIntensity={0.5}
                    metalness={1}
                    roughness={0}
                />
            </mesh>

            {/* Glow plane behind door */}
            <mesh ref={glowRef} position={[0, 1.2, -0.1]}>
                <planeGeometry args={[2, 3.5]} />
                <meshBasicMaterial
                    color={hovered ? hoverColor : baseColor}
                    transparent
                    opacity={0.2}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Status indicator light */}
            <mesh position={[0, 2.7, 0.1]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color={solved ? "#39ff14" : "#ff073a"} />
            </mesh>

            {/* Floating label */}
            <Html
                position={[0, 3.0, 0]}
                center
                distanceFactor={6}
                style={{ pointerEvents: "none" }}
            >
                <div className="text-center whitespace-nowrap">
                    <div
                        className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-sm"
                        style={{
                            color: hovered ? hoverColor : baseColor,
                            textShadow: `0 0 10px ${baseColor}`,
                            background: "rgba(0,0,0,0.7)",
                            border: `1px solid ${baseColor}40`,
                            fontFamily: "'Orbitron', monospace",
                        }}
                    >
                        {label}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <span
                            className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
                            style={{
                                color: difficultyColor,
                                background: "rgba(0,0,0,0.7)",
                                border: `1px solid ${difficultyColor}40`,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            {difficulty}
                        </span>
                        {solved && (
                            <span
                                className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
                                style={{
                                    color: "#39ff14",
                                    background: "rgba(57,255,20,0.1)",
                                    border: "1px solid rgba(57,255,20,0.3)",
                                    fontFamily: "'JetBrains Mono', monospace",
                                }}
                            >
                                ✓ Solved
                            </span>
                        )}
                    </div>
                </div>
            </Html>

            {/* Point light for door glow */}
            <pointLight
                position={[0, 1.2, 0.5]}
                color={hovered ? hoverColor : baseColor}
                intensity={hovered ? 2 : 0.5}
                distance={3}
            />
        </group>
    );
}
