"use client";
import { getSocket } from "@/lib/socket";
import type { GameState } from "@/lib/types";

const POWER_LABELS: Record<string, { title: string; desc: string }> = {
  peek:             { title: "Omen Sight",       desc: "The Ascendant may peek at the top 3 Omens in the draw pile." },
  investigate:      { title: "Loyalty Probe",    desc: "The Ascendant may investigate one player's faction." },
  execute:          { title: "Execution",        desc: "The Ascendant must execute one player. If The Prophet is executed, the Wardens win." },
  special_election: { title: "Special Election", desc: "The Ascendant may choose the next Ascendant." },
};

export default function ExecutivePhase({ state, myId }: { state: GameState; myId: string }) {
  const ascendant = state.players[state.ascendantIndex];
  const isAscendant = ascendant?.id === myId;
  const power = state.executivePower!;
  const config = POWER_LABELS[power];

  const isPeek = power === "peek";

  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8a7a6a" }}>Executive Power</p>
        <h2 className="font-black text-2xl tracking-tight" style={{ color: "#c84a3e" }}>{config.title}</h2>
        <p className="text-sm mt-2 max-w-sm mx-auto" style={{ color: "#8a7a6a" }}>{config.desc}</p>
      </div>

      {isAscendant && isPeek && (
        <button
          onClick={() => getSocket().emit("peek_omens")}
          className="w-full py-4 font-black text-sm tracking-widest uppercase rounded"
          style={{ background: "#1a1510", border: "1px solid #c8a96e", color: "#c8a96e" }}
        >
          Reveal the Omens
        </button>
      )}

      {isAscendant && !isPeek && (
        <div className="space-y-2">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#5a4a3a" }}>Select a player</p>
          {state.players
            .filter(p => p.isAlive && p.id !== myId)
            .map(p => (
              <button
                key={p.id}
                onClick={() => {
                  if (power === "execute") getSocket().emit("execute_player", { targetId: p.id });
                  if (power === "investigate") getSocket().emit("investigate", { targetId: p.id });
                  if (power === "special_election") getSocket().emit("special_election", { targetId: p.id });
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded transition-all hover:border-red-800"
                style={{ background: "#0f0e0c", border: "1px solid #2a2010" }}
              >
                <span className="font-bold text-sm" style={{ color: "#e8d5b0" }}>{p.name}</span>
                <span className="text-xs tracking-widest uppercase px-2 py-0.5 rounded"
                  style={{ border: "1px solid #c84a3e", color: "#c84a3e" }}>
                  Select
                </span>
              </button>
            ))}
        </div>
      )}

      {!isAscendant && (
        <p className="text-center text-sm tracking-wide mt-4" style={{ color: "#5a4a3a" }}>
          {ascendant?.name} is exercising executive power...
        </p>
      )}
    </div>
  );
}
