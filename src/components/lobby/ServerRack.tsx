"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ServerRackProps {
    position: [number, number, number];
    rotation?: [number, number, number];
}

export default function ServerRack({ position, rotation = [0, 0, 0] }: ServerRackProps) {
    const ledsRef = useRef<THREE.InstancedMesh>(null!);
    const ledCount = 24;

    const ledData = useMemo(() => {
        const data = [];
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                data.push({
                    x: -0.25 + col * 0.16,
                    y: 0.3 + row * 0.4,
                    speed: Math.random() * 3 + 1,
                    phase: Math.random() * Math.PI * 2,
                    color: Math.random() > 0.3 ? "#00f0ff" : Math.random() > 0.5 ? "#39ff14" : "#ff073a",
                });
            }
        }
        return data;
    }, []);

    const tempObject = useMemo(() => new THREE.Object3D(), []);
    const tempColor = useMemo(() => new THREE.Color(), []);

    useFrame((state) => {
        if (!ledsRef.current) return;
        const t = state.clock.elapsedTime;

        ledData.forEach((led, i) => {
            tempObject.position.set(led.x, led.y, 0.26);
            tempObject.scale.setScalar(1);
            tempObject.updateMatrix();
            ledsRef.current.setMatrixAt(i, tempObject.matrix);

            const brightness = (Math.sin(t * led.speed + led.phase) + 1) * 0.5;
            tempColor.set(led.color).multiplyScalar(brightness * 0.8 + 0.2);
            ledsRef.current.setColorAt(i, tempColor);
        });

        ledsRef.current.instanceMatrix.needsUpdate = true;
        if (ledsRef.current.instanceColor) {
            ledsRef.current.instanceColor.needsUpdate = true;
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* Rack body */}
            <mesh position={[0, 1.5, 0]}>
                <boxGeometry args={[0.8, 3, 0.5]} />
                <meshStandardMaterial
                    color="#0a0a15"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Front panel */}
            <mesh position={[0, 1.5, 0.26]}>
                <boxGeometry args={[0.7, 2.8, 0.01]} />
                <meshStandardMaterial
                    color="#111125"
                    metalness={0.7}
                    roughness={0.3}
                />
            </mesh>

            {/* LEDs */}
            <instancedMesh ref={ledsRef} args={[undefined, undefined, ledCount]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial />
            </instancedMesh>

            {/* Ventilation lines */}
            {[0.8, 1.3, 1.8, 2.3].map((y, i) => (
                <mesh key={i} position={[0, y, 0.27]}>
                    <boxGeometry args={[0.5, 0.005, 0.005]} />
                    <meshBasicMaterial color="#00f0ff" transparent opacity={0.2} />
                </mesh>
            ))}
        </group>
    );
}
