"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import {
    EffectComposer,
    Bloom,
    Vignette,
    ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import Door from "./Door";
import HologramGlobe from "./HologramGlobe";
import ServerRack from "./ServerRack";
import Particles from "./Particles";

function Floor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial
                color="#080812"
                metalness={0.9}
                roughness={0.1}
                envMapIntensity={0.5}
            />
        </mesh>
    );
}

function Walls() {
    return (
        <group>
            {/* Back wall */}
            <mesh position={[0, 4, -8]}>
                <planeGeometry args={[20, 8]} />
                <meshStandardMaterial
                    color="#0a0a18"
                    metalness={0.5}
                    roughness={0.7}
                />
            </mesh>

            {/* Neon strips on back wall */}
            {[-6, -3, 0, 3, 6].map((x, i) => (
                <mesh key={i} position={[x, 0.5, -7.95]}>
                    <boxGeometry args={[0.02, 8, 0.02]} />
                    <meshBasicMaterial
                        color={i % 2 === 0 ? "#00f0ff" : "#ff00e5"}
                        transparent
                        opacity={0.4}
                    />
                </mesh>
            ))}

            {/* Side walls */}
            <mesh position={[-10, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[16, 8]} />
                <meshStandardMaterial color="#0a0a18" metalness={0.5} roughness={0.7} />
            </mesh>
            <mesh position={[10, 4, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[16, 8]} />
                <meshStandardMaterial color="#0a0a18" metalness={0.5} roughness={0.7} />
            </mesh>

            {/* Ceiling */}
            <mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 16]} />
                <meshStandardMaterial color="#060610" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Ceiling neon strips */}
            {[-4, 0, 4].map((x, i) => (
                <mesh key={`ceil-${i}`} position={[x, 7.98, 0]}>
                    <boxGeometry args={[0.03, 0.03, 14]} />
                    <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
                </mesh>
            ))}
        </group>
    );
}

function GridFloor() {
    return (
        <gridHelper
            args={[40, 40, "#00f0ff", "#0a0a2a"]}
            position={[0, 0.01, 0]}
        />
    );
}

function LobbyLighting() {
    return (
        <>
            <ambientLight intensity={0.15} color="#1a1a3a" />
            <pointLight position={[0, 7, 0]} intensity={2} color="#00f0ff" distance={15} />
            <pointLight position={[-5, 3, -3]} intensity={1} color="#ff00e5" distance={10} />
            <pointLight position={[5, 3, -3]} intensity={1} color="#00f0ff" distance={10} />
            <pointLight position={[0, 1, 5]} intensity={0.5} color="#39ff14" distance={8} />
            <spotLight
                position={[0, 8, 0]}
                angle={0.4}
                penumbra={0.5}
                intensity={3}
                color="#00f0ff"
                target-position={[0, 0, 0]}
            />
        </>
    );
}

function LobbyContent() {
    // Door layout in a semicircle arrangement
    const doorPositions: {
        roomId: number;
        pos: [number, number, number];
        rot: [number, number, number];
        label: string;
        difficulty: string;
    }[] = [
            { roomId: 1, pos: [-6, 0, -6], rot: [0, 0.3, 0], label: "REACT DEBUG", difficulty: "Easy" },
            { roomId: 2, pos: [-3, 0, -7], rot: [0, 0.15, 0], label: "WASM VAULT", difficulty: "Hard" },
            { roomId: 3, pos: [0, 0, -7.5], rot: [0, 0, 0], label: "TIME TRAVEL", difficulty: "Medium" },
            { roomId: 4, pos: [3, 0, -7], rot: [0, -0.15, 0], label: "SERVICE WORKER", difficulty: "Hard" },
            { roomId: 5, pos: [6, 0, -6], rot: [0, -0.3, 0], label: "CSS ILLUSION", difficulty: "Medium" },
        ];

    return (
        <>
            <LobbyLighting />
            <Floor />
            <GridFloor />
            <Walls />

            {/* Doors */}
            {doorPositions.map((d) => (
                <Door
                    key={d.roomId}
                    roomId={d.roomId}
                    position={d.pos}
                    rotation={d.rot}
                    label={d.label}
                    difficulty={d.difficulty}
                />
            ))}

            {/* Hologram Globe */}
            <HologramGlobe />

            {/* Server Racks */}
            <ServerRack position={[-9, 0, -3]} rotation={[0, Math.PI / 2, 0]} />
            <ServerRack position={[-9, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <ServerRack position={[-9, 0, 3]} rotation={[0, Math.PI / 2, 0]} />
            <ServerRack position={[9, 0, -3]} rotation={[0, -Math.PI / 2, 0]} />
            <ServerRack position={[9, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
            <ServerRack position={[9, 0, 3]} rotation={[0, -Math.PI / 2, 0]} />

            {/* Particles */}
            <Particles count={400} />

            {/* Stars background */}
            <Stars radius={100} depth={50} count={2000} factor={3} saturation={0} fade />
        </>
    );
}

export default function LobbyScene() {
    return (
        <Canvas
            camera={{ position: [0, 4, 10], fov: 60, near: 0.1, far: 100 }}
            gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.2,
            }}
            style={{ background: "#050508" }}
        >
            <Suspense fallback={null}>
                <LobbyContent />
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={18}
                    minPolarAngle={0.3}
                    maxPolarAngle={Math.PI / 2.1}
                    target={[0, 2, -2]}
                    autoRotate
                    autoRotateSpeed={0.3}
                />
                <EffectComposer>
                    <Bloom
                        intensity={1.5}
                        luminanceThreshold={0.1}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                    <Vignette eskil={false} offset={0.1} darkness={0.8} />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL}
                        offset={new THREE.Vector2(0.0005, 0.0005)}
                    />
                </EffectComposer>
            </Suspense>
        </Canvas>
    );
}
