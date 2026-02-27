"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamic import to avoid SSR issues with Three.js
const LobbyScene = dynamic(() => import("@/components/lobby/LobbyScene"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-[var(--cyber-darker)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-2xl font-bold tracking-[0.5em] uppercase mb-4"
          style={{
            fontFamily: "'Orbitron', monospace",
            color: "var(--neon-cyan)",
            textShadow: "0 0 20px rgba(0,240,255,0.5)",
          }}
        >
          INITIALIZING
        </motion.div>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [1, 2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: i * 0.15,
              }}
              className="w-1 h-4 bg-[var(--neon-cyan)]"
            />
          ))}
        </div>
        <p
          className="text-xs mt-4 tracking-wider uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Loading Cyber Rooms...
        </p>
      </motion.div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="h-screen w-screen relative">
      <LobbyScene />

      {/* Mobile Fallback */}
      <div className="md:hidden absolute inset-0 z-40 bg-[var(--cyber-darker)] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <h2
            className="text-xl font-black tracking-wider uppercase mb-4 neon-text"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            DAKSHH CYBER ROOMS
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            For the full 3D experience, please visit on a desktop browser.
          </p>
          <div className="space-y-3">
            {[
              { id: 1, name: "React Debug Room", diff: "Easy" },
              { id: 2, name: "WASM Vault Room", diff: "Hard" },
              { id: 3, name: "Time Travel Room", diff: "Medium" },
              { id: 4, name: "Service Worker Proxy", diff: "Hard" },
              { id: 5, name: "CSS Illusion Room", diff: "Medium" },
            ].map((room) => (
              <a
                key={room.id}
                href={`/room/${room.id}`}
                className="block glass-card p-4 text-left hover:border-[var(--neon-cyan)] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{room.name}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                    {room.diff}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
