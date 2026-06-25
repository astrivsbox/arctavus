"use client";
import { getSocket } from "@/lib/socket";
import type { GameState } from "@/lib/types";

export default function Lobby({ state, myId }: { state: GameState; myId: string }) {
  const isHost = state.host === myId;

  return (
    <div className="mt-4">
      <div className="rounded p-5 mb-4" style={{ background: "#0f0e0c", border: "1px solid #2a2010" }}>
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8a7a6a" }}>Invite Code</p>
        <p className="font-black text-4xl tracking-widest" style={{ color: "#c8a96e" }}>{state.code}</p>
        <p className="text-xs mt-2" style={{ color: "#5a4a3a" }}>Share this with other players to join</p>
      </div>

      <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#5a4a3a" }}>
        Players — {state.players.length}/10
      </p>

      <div className="space-y-2 mb-6">
        {state.players.map(p => (
          <div
            key={p.id}
            className="flex items-center justify-between px-4 py-3 rounded"
            style={{ background: "#0f0e0c", border: "1px solid #2a2010" }}
          >
            <span className="font-bold text-sm tracking-wide" style={{ color: "#e8d5b0" }}>{p.name}</span>
            {p.id === state.host && (
              <span className="text-xs tracking-widest uppercase" style={{ color: "#8a7a6a" }}>Host</span>
            )}
          </div>
        ))}
      </div>

      {isHost ? (
        <button
          onClick={() => getSocket().emit("start_game")}
          disabled={state.players.length < 5}
          className="w-full py-4 font-black text-sm tracking-widest uppercase rounded transition-opacity disabled:opacity-30"
          style={{ background: "#c8a96e", color: "#0a0a0a" }}
        >
          {state.players.length < 5
            ? `Need ${5 - state.players.length} more player${5 - state.players.length !== 1 ? "s" : ""}`
            : "Begin the Ascendancy"}
        </button>
      ) : (
        <p className="text-center text-sm tracking-wide" style={{ color: "#5a4a3a" }}>
          Waiting for host to begin...
        </p>
      )}
    </div>
  );
}
