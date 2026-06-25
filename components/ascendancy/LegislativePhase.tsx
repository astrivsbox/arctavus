"use client";
import { getSocket } from "@/lib/socket";
import type { GameState, PrivateInfo, OmenCard } from "@/lib/types";

function OmenCardUI({ card, index, onSelect, label }: { card: OmenCard; index: number; onSelect?: (i: number) => void; label: string }) {
  return (
    <button
      onClick={() => onSelect?.(index)}
      disabled={!onSelect}
      className="flex-1 py-8 rounded font-black text-sm tracking-widest uppercase transition-all hover:scale-105 disabled:hover:scale-100"
      style={{
        background: card.type === "good" ? "#0a1a12" : "#1a0a0a",
        border: `2px solid ${card.type === "good" ? "#4a8a6e" : "#c84a3e"}`,
        color: card.type === "good" ? "#4a8a6e" : "#c84a3e",
        cursor: onSelect ? "pointer" : "default",
      }}
    >
      <div className="text-2xl mb-2">{card.type === "good" ? "◈" : "⬟"}</div>
      {card.type === "good" ? "Good Omen" : "Bad Omen"}
      <div className="text-xs mt-1 opacity-60">{label}</div>
    </button>
  );
}

export default function LegislativePhase({
  state,
  myId,
  priv,
}: {
  state: GameState;
  myId: string;
  priv: PrivateInfo | null;
}) {
  const ascendant = state.players[state.ascendantIndex];
  const isAscendant = ascendant?.id === myId;
  const isHighPriest = state.players.find(p => p.id === myId)?.isHighPriest;

  if (state.phase === "legislative_ascendant") {
    return (
      <div>
        <div className="text-center mb-6">
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8a7a6a" }}>Phase</p>
          <h2 className="font-black text-2xl tracking-tight" style={{ color: "#c8a96e" }}>The Ascendant Chooses</h2>
          {!isAscendant && (
            <p className="text-sm mt-2" style={{ color: "#5a4a3a" }}>
              {ascendant?.name} is reviewing the Omens...
            </p>
          )}
        </div>

        {isAscendant && priv && priv.drawnOmens.length > 0 && (
          <>
            <p className="text-xs tracking-widest uppercase mb-4 text-center" style={{ color: "#8a7a6a" }}>
              Discard one — the others go to the High Priest
            </p>
            <div className="flex gap-3">
              {priv.drawnOmens.map((card, i) => (
                <OmenCardUI
                  key={i}
                  card={card}
                  index={i}
                  onSelect={(idx) => getSocket().emit("ascendant_discard", { cardIndex: idx })}
                  label="Discard"
                />
              ))}
            </div>
          </>
        )}

        {isAscendant && (!priv || priv.drawnOmens.length === 0) && (
          <p className="text-center text-sm" style={{ color: "#5a4a3a" }}>Loading Omens...</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8a7a6a" }}>Phase</p>
        <h2 className="font-black text-2xl tracking-tight" style={{ color: "#c8a96e" }}>The High Priest Enacts</h2>
        {!isHighPriest && (
          <p className="text-sm mt-2" style={{ color: "#5a4a3a" }}>
            The High Priest is selecting an Omen...
          </p>
        )}
      </div>

      {isHighPriest && priv && priv.highPriestOptions.length > 0 && (
        <>
          <p className="text-xs tracking-widest uppercase mb-4 text-center" style={{ color: "#8a7a6a" }}>
            Enact one Omen — discard the other
          </p>
          <div className="flex gap-3">
            {priv.highPriestOptions.map((card, i) => (
              <OmenCardUI
                key={i}
                card={card}
                index={i}
                onSelect={(idx) => getSocket().emit("high_priest_enact", { cardIndex: idx })}
                label="Enact"
              />
            ))}
          </div>
        </>
      )}

      {isHighPriest && (!priv || priv.highPriestOptions.length === 0) && (
        <p className="text-center text-sm" style={{ color: "#5a4a3a" }}>Loading Omens...</p>
      )}
    </div>
  );
}
