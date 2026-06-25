export default function OmenBoard({ good, bad, tracker }: { good: number; bad: number; tracker: number }) {
  return (
    <div className="rounded p-4 mb-4" style={{ background: "#0f0e0c", border: "1px solid #2a2010" }}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#4a8a6e" }}>Good Omens</p>
          <div className="flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 flex-1 rounded"
                style={{ background: i < good ? "#4a8a6e" : "#1a2a20", border: "1px solid #2a3a28" }} />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#c84a3e" }}>Bad Omens</p>
          <div className="flex gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 flex-1 rounded"
                style={{ background: i < bad ? "#c84a3e" : "#2a1a1a", border: "1px solid #3a2020" }} />
            ))}
          </div>
        </div>
      </div>
      {tracker > 0 && (
        <p className="text-xs mt-3 text-center tracking-widest uppercase" style={{ color: "#c8a96e" }}>
          Election Tracker: {tracker}/3
        </p>
      )}
    </div>
  );
}
