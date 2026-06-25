"use client";
import { getSocket } from "@/lib/socket";
import type { GameState } from "@/lib/types";

export default function NominationPhase({ state, myId }: { state: GameState; myId: string }) {
  const ascendant = state.players[state.ascendantIndex];
  const isAscendant = ascendant?.id === myId;

  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8a7a6a" }}>Phase</p>
        <h2 className="font-black text-2xl tracking-tight" style={{ color: "#c8a96e" }}>Nomination</h2>
        <p className="text-sm mt-1" style={{ color: "#5a4a3a" }}>
          <span style={{ color: "#e8d5b0" }}>{ascendant?.name}</span> must nominate a High Priest
        </p>
      </div>

      <div className="space-y-2">
        {state.players
          .filter(p => p.isAlive && p.id !== ascendant?.id)
          .map(p => {
            const ineligible = p.id === state.nominatedHighPriest;
            return (
              <button
                key={p.id}
                disabled={!isAscendant || !p.isAlive}
                onClick={() => isAscendant && getSocket().emit("nominate", { targetId: p.id })}
                className="w-full flex items-center justify-between px-4 py-3 rounded transition-opacity disabled:opacity-40"
                style={{
                  background: "#0f0e0c",
                  border: "1px solid #2a2010",
                  cursor: isAscendant ? "pointer" : "default",
                }}
              >
                <span className="font-bold text-sm" style={{ color: "#e8d5b0" }}>{p.name}</span>
                <div className="flex items-center gap-2">
                  {p.isAscendant && <span className="text-xs tracking-widest uppercase" style={{ color: "#c8a96e" }}>Ascendant</span>}
                  {isAscendant && (
                    <span className="text-xs tracking-widest uppercase px-2 py-0.5 rounded"
                      style={{ background: "#1a1510", color: "#8a7a6a", border: "1px solid #3a2a1a" }}>
                      Nominate
                    </span>
                  )}
                </div>
              </button>
            );
          })}
      </div>

      {!isAscendant && (
        <p className="text-center text-sm mt-6 tracking-wide" style={{ color: "#5a4a3a" }}>
          Awaiting {ascendant?.name}&apos;s nomination...
        </p>
      )}
    </div>
  );
}
