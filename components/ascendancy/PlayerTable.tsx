import type { GameState } from "@/lib/types";

const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = 112;
const SEAT_R = 22;

function seatPos(i: number, n: number) {
  const angle = (2 * Math.PI * i / n) - Math.PI / 2;
  return {
    x: CENTER + Math.cos(angle) * RADIUS,
    y: CENTER + Math.sin(angle) * RADIUS,
    angle,
  };
}

const VOTE_CONFIG = {
  faith: { label: "Faith", color: "#4a8a6e", bg: "#0a1a10" },
  doubt: { label: "Doubt", color: "#c84a3e", bg: "#1a0808" },
};

export default function PlayerTable({ state }: { state: GameState }) {
  const players = state.players;
  const n = players.length;

  return (
    <div className="rounded p-4 mb-4" style={{ background: "#0f0e0c", border: "1px solid #2a2010" }}>
      <p className="text-xs tracking-widest uppercase mb-3 text-center" style={{ color: "#3a2a1a" }}>
        The Council
      </p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: SIZE, height: SIZE }}>

          {/* SVG layer: connector spokes + outer ring */}
          <svg
            width={SIZE} height={SIZE}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            {/* Outer decorative ring */}
            <circle cx={CENTER} cy={CENTER} r={RADIUS + SEAT_R + 4}
              fill="none" stroke="#1a1510" strokeWidth="1" strokeDasharray="4 6" />

            {/* Spokes from center to each seat */}
            {players.map((_, i) => {
              const { x, y } = seatPos(i, n);
              const innerR = 58;
              const ix = CENTER + Math.cos((2 * Math.PI * i / n) - Math.PI / 2) * innerR;
              const iy = CENTER + Math.sin((2 * Math.PI * i / n) - Math.PI / 2) * innerR;
              return (
                <line key={i}
                  x1={ix} y1={iy} x2={x} y2={y}
                  stroke="#1c1610" strokeWidth="1"
                />
              );
            })}
          </svg>

          {/* Center table */}
          <div style={{
            position: "absolute",
            left: CENTER, top: CENTER,
            transform: "translate(-50%, -50%)",
            width: 108, height: 108,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 38%, #1e1a12 0%, #0e0c08 65%, #080706 100%)",
            border: "2px solid #3a2a16",
            boxShadow: "0 0 40px rgba(0,0,0,0.9), inset 0 0 24px rgba(0,0,0,0.6), 0 0 8px rgba(200,169,110,0.08)",
          }}>
            {/* Inner concentric ring */}
            <div style={{
              position: "absolute", inset: 10,
              borderRadius: "50%",
              border: "1px solid #2a2010",
            }} />
            {/* Innermost ring */}
            <div style={{
              position: "absolute", inset: 22,
              borderRadius: "50%",
              border: "1px solid #1e1810",
            }} />
            {/* Center glyph — half sun / half moon */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg viewBox="0 0 32 32" width="26" height="26">
                {/* Left semicircle: moon */}
                <path d="M 16 3 A 13 13 0 0 0 16 29 Z" fill="#35304e" />
                {/* Right semicircle: sun */}
                <path d="M 16 3 A 13 13 0 0 1 16 29 Z" fill="#4a3a14" />
                {/* Vertical divider */}
                <line x1="16" y1="3" x2="16" y2="29" stroke="#0e0c08" strokeWidth="1" />
                {/* Moon crescent detail */}
                <path d="M 13 7 A 8 8 0 0 1 13 25 A 5.5 5.5 0 0 0 13 7" fill="#252038" />
                {/* Sun rays — right side only */}
                <line x1="29" y1="16" x2="26" y2="16" stroke="#6a5520" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="25.2" y1="7.8" x2="23.1" y2="9.9" stroke="#6a5520" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="25.2" y1="24.2" x2="23.1" y2="22.1" stroke="#6a5520" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Player seats */}
          {players.map((p, i) => {
            const { x, y } = seatPos(i, n);
            const isAsc = p.isAscendant;
            const isHP = p.isHighPriest;
            const isNom = p.id === state.nominatedHighPriest && !isHP;
            const vote = state.lastVotes?.[p.id] as "faith" | "doubt" | undefined;

            const borderColor = isAsc ? "#c8a96e"
              : isHP ? "#4a8a6e"
              : isNom ? "#c84a3e"
              : "#2a2010";

            const glowColor = isAsc ? "rgba(200,169,110,0.5)"
              : isHP ? "rgba(74,138,110,0.5)"
              : "none";

            const label = isAsc ? "Ascendant"
              : isHP ? "High Priest"
              : isNom ? "Nominated"
              : null;

            const labelColor = isAsc ? "#c8a96e"
              : isHP ? "#4a8a6e"
              : "#c84a3e";

            // Name truncated to fit
            const displayName = p.name.length > 9 ? p.name.slice(0, 8) + "…" : p.name;

            return (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  left: x, top: y,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: p.isAlive ? 1 : 0.28,
                  width: 72,
                }}
              >
                {/* Seat circle */}
                <div style={{
                  width: SEAT_R * 2, height: SEAT_R * 2,
                  borderRadius: "50%",
                  background: isAsc ? "#1a1508"
                    : isHP ? "#0a1a10"
                    : "#111008",
                  border: `2px solid ${borderColor}`,
                  boxShadow: isAsc || isHP
                    ? `0 0 10px ${glowColor}, inset 0 0 6px rgba(0,0,0,0.5)`
                    : "inset 0 0 6px rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: p.isAlive ? borderColor : "#3a2a1a",
                  flexShrink: 0,
                  transition: "border-color 0.4s, box-shadow 0.4s",
                }}>
                  {!p.isAlive ? "✕" : p.isBot ? "◈" : "·"}
                </div>

                {/* Name */}
                <p style={{
                  marginTop: 4,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: isAsc ? "#c8a96e" : isHP ? "#4a8a6e" : "#6a5a4a",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                }}>
                  {displayName}
                </p>

                {/* Role label */}
                {label && (
                  <p style={{
                    fontSize: 7,
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: labelColor,
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                  }}>
                    {label}
                  </p>
                )}

                {/* Vote indicator from last election */}
                {vote && (
                  <p style={{
                    fontSize: 7,
                    fontWeight: 900,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: VOTE_CONFIG[vote].color,
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                    marginTop: 1,
                  }}>
                    {VOTE_CONFIG[vote].label}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-5 mt-2">
        {[
          { color: "#c8a96e", label: "Ascendant" },
          { color: "#4a8a6e", label: "High Priest" },
          { color: "#c84a3e", label: "Nominated" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1">
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
            <span style={{ fontSize: 8, color: "#4a3a2a", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
