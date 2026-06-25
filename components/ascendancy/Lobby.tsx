"use client";
import { getSocket } from "@/lib/socket";
import type { GameState } from "@/lib/types";

export default function Lobby({ state, myId }: { state: GameState; myId: string }) {
  const isHost = state.host === myId;
  const botCount = state.players.filter(p => p.isBot).length;
  const canAddBot = state.players.length < 10;

  return (
    <div className="mt-4">
      <div className="rounded p-5 mb-4" style={{ background: "#0f0e0c", border: "1px solid #2a2010" }}>
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8a7a6a" }}>Invite Code</p>
        <p className="font-black text-4xl tracking-widest" style={{ color: "#c8a96e" }}>{state.code}</p>
        <p className="text-xs mt-2" style={{ color: "#5a4a3a" }}>Share this with other players to join</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-xs tracking-widest uppercase" style={{ color: "#5a4a3a" }}>
          Players — {state.players.length}/10
        </p>
        {isHost && (
          <button
            onClick={() => getSocket().emit("add_bot")}
            disabled={!canAddBot}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold tracking-widest uppercase transition-opacity disabled:opacity-30"
            style={{ border: "1px solid #2a3a2a", color: "#6a9a6a", background: "#0f0e0c" }}
          >
            + Add Bot
          </button>
        )}
      </div>

      <div className="space-y-2 mb-6">
        {state.players.map(p => (
          <div
            key={p.id}
            className="flex items-center justify-between px-4 py-3 rounded"
            style={{ background: "#0f0e0c", border: `1px solid ${p.isBot ? "#1a2a1a" : "#2a2010"}` }}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm tracking-wide" style={{ color: p.isBot ? "#6a9a6a" : "#e8d5b0" }}>
                {p.name}
              </span>
              {p.isBot && (
                <span
                  className="text-xs font-black tracking-widest uppercase px-2 py-0.5 rounded"
                  style={{ background: "#0a1a0a", color: "#4a7a4a", border: "1px solid #2a4a2a" }}
                >
                  BOT
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {p.id === state.host && !p.isBot && (
                <span className="text-xs tracking-widest uppercase" style={{ color: "#8a7a6a" }}>Host</span>
              )}
              {isHost && p.isBot && (
                <button
                  onClick={() => getSocket().emit("remove_bot", { botId: p.id })}
                  className="text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-60"
                  style={{ color: "#5a3a3a" }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {botCount > 0 && (
        <p className="text-xs mb-4 text-center tracking-wide" style={{ color: "#4a5a4a" }}>
          {botCount} bot{botCount !== 1 ? "s" : ""} will play automatically
        </p>
      )}

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
