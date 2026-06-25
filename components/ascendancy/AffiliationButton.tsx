"use client";

import { useState } from "react";
import type { PrivateInfo } from "@/lib/types";

const ROLE_CONFIG = {
  warden:  { label: "WARDEN",      color: "#4a8a6e", faction: "Warden" },
  zealot:  { label: "ZEALOT",      color: "#c84a3e", faction: "Zealot" },
  prophet: { label: "THE PROPHET", color: "#c84a3e", faction: "Zealot — Hidden Sovereign" },
};

export default function AffiliationButton({ priv }: { priv: PrivateInfo }) {
  const [revealed, setRevealed] = useState(false);
  const config = ROLE_CONFIG[priv.role];

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        className="px-3 py-1.5 rounded text-xs font-bold tracking-widest uppercase transition-colors"
        style={{
          border: `1px solid ${revealed ? config.color : "#3a2a1a"}`,
          color: revealed ? config.color : "#8a7a6a",
          background: "#0f0e0c",
        }}
      >
        {revealed ? config.label : "Reveal Affiliation"}
      </button>

      {revealed && (
        <div
          className="absolute right-0 top-full mt-2 z-50 p-4 rounded min-w-[200px]"
          style={{ background: "#0f0e0c", border: `1px solid ${config.color}`, boxShadow: `0 0 20px rgba(0,0,0,0.8)` }}
        >
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#5a4a3a" }}>Your Role</p>
          <p className="font-black text-xl tracking-tight mb-1" style={{ color: config.color }}>
            {config.label}
          </p>
          <p className="text-xs" style={{ color: "#8a7a6a" }}>{config.faction}</p>
        </div>
      )}
    </div>
  );
}
