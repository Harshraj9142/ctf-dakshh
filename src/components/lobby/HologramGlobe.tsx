"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HologramGlobe() {
    const groupRef = useRef<THREE.Group>(null!);
    const wireRef = useRef<THREE.Mesh>(null!);
    const innerRef = useRef<THREE.Mesh>(null!);
    const ringRef = useRef<THREE.Mesh>(null!);
    const ring2Ref = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            groupRef.current.position.y = 2.5 + Math.sin(t * 0.8) * 0.15;
        }

        if (wireRef.current) {
            wireRef.current.rotation.y = t * 0.3;
            wireRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
        }

        if (innerRef.current) {
            innerRef.current.rotation.y = -t * 0.5;
            innerRef.current.rotation.z = t * 0.2;
        }

        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2;
            ringRef.current.rotation.z = t * 0.4;
        }

        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = Math.PI / 3 + Math.cos(t * 0.3) * 0.3;
            ring2Ref.current.rotation.z = -t * 0.3;
        }
    });

    return (
        <group ref={groupRef} position={[0, 2.5, 0]}>
            {/* Outer wireframe sphere */}
            <mesh ref={wireRef}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial
                    color="#00f0ff"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Inner glowing sphere */}
            <mesh ref={innerRef}>
                <icosahedronGeometry args={[0.6, 2]} />
                <meshBasicMaterial
                    color="#ff00e5"
                    wireframe
                    transparent
                    opacity={0.2}
                />
            </mesh>

            {/* Core glow */}
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshBasicMaterial
                    color="#00f0ff"
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Orbital ring 1 */}
            <mesh ref={ringRef}>
                <torusGeometry args={[1.3, 0.015, 8, 64]} />
                <meshBasicMaterial
                    color="#00f0ff"
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Orbital ring 2 */}
            <mesh ref={ring2Ref}>
                <torusGeometry args={[1.5, 0.01, 8, 64]} />
                <meshBasicMaterial
                    color="#ff00e5"
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Point light at center */}
            <pointLight color="#00f0ff" intensity={3} distance={8} />
            <pointLight color="#ff00e5" intensity={1} distance={5} />
        </group>
    );
}
