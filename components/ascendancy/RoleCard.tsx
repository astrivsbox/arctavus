import type { Role } from "@/lib/types";

const ROLE_CONFIG = {
  warden: {
    title: "WARDEN",
    subtitle: "Guardian of the Order",
    description: "Protect the realm. Enact Good Omens. Unmask The Prophet.",
    color: "#4a8a6e",
    bg: "#0a1a12",
    border: "#1a3a22",
  },
  zealot: {
    title: "ZEALOT",
    subtitle: "Servant of Chaos",
    description: "Spread the Bad Omens. Conceal The Prophet. Seize control.",
    color: "#c84a3e",
    bg: "#1a0a0a",
    border: "#3a1a1a",
  },
  prophet: {
    title: "THE PROPHET",
    subtitle: "The Hidden Sovereign",
    description: "You are the Prophet. You are also a Zealot. Ascend to High Priest once 3 Bad Omens are enacted.",
    color: "#c84a3e",
    bg: "#1a0a0a",
    border: "#3a1a1a",
  },
};

type Ally = { id: string; name: string; role: Role };

export default function RoleCard({
  role,
  allies,
  onClose,
}: {
  role: Role;
  allies: Ally[];
  onClose: () => void;
}) {
  const config = ROLE_CONFIG[role];

  return (
    <div
      className="w-full max-w-sm rounded-lg p-8 text-center"
      style={{ background: config.bg, border: `1px solid ${config.border}` }}
      onClick={e => e.stopPropagation()}
    >
      <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#5a4a3a" }}>Your Role</p>
      <h2 className="font-black text-4xl tracking-tight mb-1" style={{ color: config.color }}>
        {config.title}
      </h2>
      <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#8a7a6a" }}>{config.subtitle}</p>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "#8a7a6a" }}>{config.description}</p>

      {allies.length > 0 && (
        <div className="mb-6">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#5a4a3a" }}>
            Your Allies
          </p>
          {allies.map(a => (
            <div key={a.id} className="flex items-center justify-between px-3 py-2 rounded mb-1"
              style={{ background: "#1a0a0a", border: "1px solid #3a1a1a" }}>
              <span className="font-bold text-sm" style={{ color: "#e8d5b0" }}>{a.name}</span>
              <span className="text-xs tracking-widest uppercase" style={{ color: config.color }}>
                {a.role === "prophet" ? "The Prophet" : "Zealot"}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onClose}
        className="w-full py-3 font-black text-sm tracking-widest uppercase rounded"
        style={{ border: `1px solid ${config.border}`, color: config.color }}
      >
        I Understand
      </button>
    </div>
  );
}
