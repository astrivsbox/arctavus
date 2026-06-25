"use client";

import { useEffect, useRef } from "react";
import type { GameState, PrivateInfo } from "@/lib/types";

export default function GameOver({ state, myId, priv }: { state: GameState; myId: string; priv: PrivateInfo | null }) {
  const won = state.winner === "wardens" ? priv?.role === "warden" : priv?.role === "zealot" || priv?.role === "prophet";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const src = state.winner === "wardens" ? "/good-omen-victory.wav" : "/bad-omen-victory.wav";
    audioRef.current = new Audio(src);
    audioRef.current.volume = 0.6;
    audioRef.current.play().catch(() => {});
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [state.winner]);

  return (
    <div className="text-center py-8">
      <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#5a4a3a" }}>The Ascendancy Falls</p>
      <h2
        className="font-black text-5xl tracking-tight mb-3"
        style={{ color: state.winner === "wardens" ? "#4a8a6e" : "#c84a3e" }}
      >
        {state.winner === "wardens" ? "WARDENS WIN" : "ZEALOTS WIN"}
      </h2>
      <p className="text-sm mb-8" style={{ color: "#8a7a6a" }}>{state.winReason}</p>

      {priv && (
        <div className="inline-block px-6 py-3 rounded mb-8"
          style={{ background: won ? "#0a1a12" : "#1a0a0a", border: `1px solid ${won ? "#4a8a6e" : "#c84a3e"}` }}>
          <span className="font-black text-sm tracking-widest uppercase"
            style={{ color: won ? "#4a8a6e" : "#c84a3e" }}>
            {won ? "You Won" : "You Lost"}
          </span>
        </div>
      )}

      <div className="space-y-2 mt-4">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#5a4a3a" }}>All Roles Revealed</p>
        {state.players.map(p => {
          const role = state.revealedRoles?.[p.id];
          const roleLabel = role === "prophet" ? "The Prophet"
            : role === "zealot" ? "Zealot"
            : role === "warden" ? "Warden"
            : null;
          const roleColor = role === "warden" ? "#4a8a6e" : "#c84a3e";

          return (
            <div key={p.id} className="flex items-center justify-between px-4 py-3 rounded"
              style={{ background: "#0f0e0c", border: "1px solid #2a2010", opacity: p.isAlive ? 1 : 0.5 }}>
              <span className="font-bold text-sm" style={{ color: "#e8d5b0" }}>
                {p.name}
                {!p.isAlive && <span className="ml-2 text-xs" style={{ color: "#5a4a3a" }}>(executed)</span>}
              </span>
              {roleLabel && (
                <span className="text-xs font-black tracking-widest uppercase px-2 py-1 rounded"
                  style={{
                    color: roleColor,
                    background: role === "warden" ? "#0a1a10" : "#1a0808",
                    border: `1px solid ${roleColor}`,
                  }}>
                  {roleLabel}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => window.location.reload()}
        className="mt-8 px-8 py-3 font-black text-sm tracking-widest uppercase rounded"
        style={{ border: "1px solid #3a2a1a", color: "#c8a96e" }}
      >
        Play Again
      </button>
    </div>
  );
}
