"use client";
import { getSocket } from "@/lib/socket";
import type { GameState } from "@/lib/types";

export default function ElectionPhase({ state, myId }: { state: GameState; myId: string }) {
  const ascendant = state.players[state.ascendantIndex];
  const nominated = state.players.find(p => p.id === state.nominatedHighPriest);
  const myPlayer = state.players.find(p => p.id === myId);
  const hasVoted = state.votesCast > 0 && state.votes?.[myId] !== undefined;
  const allVoted = state.votesCast >= state.totalAlive;
  const canVote = myPlayer?.isAlive && !hasVoted;

  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8a7a6a" }}>Phase</p>
        <h2 className="font-black text-2xl tracking-tight" style={{ color: "#c8a96e" }}>Election</h2>
        <p className="text-sm mt-2" style={{ color: "#8a7a6a" }}>
          <span style={{ color: "#e8d5b0" }}>{ascendant?.name}</span>
          <span style={{ color: "#5a4a3a" }}> nominates </span>
          <span style={{ color: "#e8d5b0" }}>{nominated?.name}</span>
          <span style={{ color: "#5a4a3a" }}> as High Priest</span>
        </p>
        <p className="text-xs mt-2 tracking-widest uppercase" style={{ color: "#5a4a3a" }}>
          {state.votesCast}/{state.totalAlive} votes cast
        </p>
      </div>

      {canVote && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => getSocket().emit("vote", { vote: "faith" })}
            className="flex-1 py-5 font-black text-lg tracking-widest uppercase rounded transition-opacity hover:opacity-80"
            style={{ background: "#0a1a12", border: "1px solid #4a8a6e", color: "#4a8a6e" }}
          >
            FAITH
          </button>
          <button
            onClick={() => getSocket().emit("vote", { vote: "doubt" })}
            className="flex-1 py-5 font-black text-lg tracking-widest uppercase rounded transition-opacity hover:opacity-80"
            style={{ background: "#1a0a0a", border: "1px solid #c84a3e", color: "#c84a3e" }}
          >
            DOUBT
          </button>
        </div>
      )}

      {hasVoted && !allVoted && (
        <p className="text-center text-sm tracking-wide mb-6" style={{ color: "#5a4a3a" }}>
          Your vote has been cast. Awaiting others...
        </p>
      )}

      {/* Vote results after all voted */}
      {allVoted && state.votes && (
        <div className="space-y-2 mb-4">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#5a4a3a" }}>Votes</p>
          {state.players.filter(p => p.isAlive).map(p => (
            <div key={p.id} className="flex items-center justify-between px-4 py-2 rounded"
              style={{ background: "#0f0e0c", border: "1px solid #2a2010" }}>
              <span className="font-bold text-sm" style={{ color: "#e8d5b0" }}>{p.name}</span>
              <span
                className="text-xs font-black tracking-widest uppercase"
                style={{ color: state.votes![p.id] === "faith" ? "#4a8a6e" : "#c84a3e" }}
              >
                {state.votes![p.id] === "faith" ? "FAITH" : "DOUBT"}
              </span>
            </div>
          ))}
        </div>
      )}

      {!canVote && !hasVoted && (
        <p className="text-center text-sm tracking-wide" style={{ color: "#5a4a3a" }}>
          Awaiting votes...
        </p>
      )}
    </div>
  );
}
