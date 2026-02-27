"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface NeonTextProps {
    text: string;
    position: [number, number, number];
    rotation?: [number, number, number];
    color?: string;
    fontSize?: number;
}

export default function NeonText({
    text,
    position,
    rotation = [0, 0, 0],
    color = "#00f0ff",
    fontSize = 0.3,
}: NeonTextProps) {
    const ref = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (ref.current) {
            const mat = ref.current.material as THREE.MeshBasicMaterial;
            if (mat) {
                mat.opacity = 0.7 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
            }
        }
    });

    return (
        <Text
            ref={ref}
            position={position}
            rotation={rotation}
            fontSize={fontSize}
            color={color}
            font="/fonts/orbitron.woff"
            anchorX="center"
            anchorY="middle"
            material-transparent
            material-opacity={0.9}
        >
            {text}
        </Text>
    );
}
