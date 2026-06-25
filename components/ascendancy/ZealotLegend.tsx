import type { PrivateInfo } from "@/lib/types";

export default function ZealotLegend({ priv }: { priv: PrivateInfo }) {
  if (priv.role === "warden" || priv.zealotAllies.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-4 z-30 p-4 rounded"
      style={{
        background: "#0f0e0c",
        border: "1px solid #3a1a1a",
        boxShadow: "0 0 30px rgba(0,0,0,0.7)",
        minWidth: "180px",
      }}
    >
      <p
        className="text-xs tracking-widest uppercase mb-3 font-bold"
        style={{ color: "#5a3030" }}
      >
        Your Allies
      </p>
      {priv.zealotAllies.map((a) => (
        <div key={a.id} className="flex items-center justify-between gap-6 mb-2 last:mb-0">
          <span className="text-sm font-bold" style={{ color: "#e8d5b0" }}>
            {a.name}
          </span>
          <span
            className="text-xs font-black tracking-widest uppercase"
            style={{ color: a.role === "prophet" ? "#ff6b4a" : "#c84a3e" }}
          >
            {a.role === "prophet" ? "Prophet" : "Zealot"}
          </span>
        </div>
      ))}
    </div>
  );
}
