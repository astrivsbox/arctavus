"use client";

import { useEffect, useRef, useState } from "react";

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="4.5" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
      const r = deg * Math.PI / 180;
      return (
        <line key={deg}
          x1={12 + Math.cos(r) * 7} y1={12 + Math.sin(r) * 7}
          x2={12 + Math.cos(r) * 9.5} y2={12 + Math.sin(r) * 9.5}
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        />
      );
    })}
  </svg>
);

const MoonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function OmenBoard({ good, bad, tracker }: { good: number; bad: number; tracker: number }) {
  const prevGood = useRef(good);
  const prevBad = useRef(bad);
  const [flashGood, setFlashGood] = useState<number | null>(null);
  const [flashBad, setFlashBad] = useState<number | null>(null);

  useEffect(() => {
    if (good > prevGood.current) {
      setFlashGood(good - 1);
      const t = setTimeout(() => setFlashGood(null), 1400);
      prevGood.current = good;
      return () => clearTimeout(t);
    }
    prevGood.current = good;
  }, [good]);

  useEffect(() => {
    if (bad > prevBad.current) {
      setFlashBad(bad - 1);
      const t = setTimeout(() => setFlashBad(null), 1400);
      prevBad.current = bad;
      return () => clearTimeout(t);
    }
    prevBad.current = bad;
  }, [bad]);

  return (
    <>
      <style>{`
        @keyframes omenGoodFlash {
          0%   { background: #a0ffcc; box-shadow: 0 0 18px #4a8a6e, 0 0 6px #a0ffcc; }
          60%  { background: #5aaa80; box-shadow: 0 0 10px #4a8a6e; }
          100% { background: #4a8a6e; box-shadow: none; }
        }
        @keyframes omenBadFlash {
          0%   { background: #ff6060; box-shadow: 0 0 22px #c84a3e, 0 0 8px #ff4040; }
          60%  { background: #dd4040; box-shadow: 0 0 12px #c84a3e; }
          100% { background: #c84a3e; box-shadow: none; }
        }
      `}</style>

      <div className="rounded p-4 mb-4" style={{ background: "#0f0e0c", border: "1px solid #2a2010" }}>
        <div className="flex justify-between items-start gap-4">

          {/* Good Omens */}
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-2">
              <span style={{ color: "#4a8a6e" }}><SunIcon /></span>
              <p className="text-xs tracking-widest uppercase" style={{ color: "#4a8a6e" }}>Good Omens</p>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 flex-1 rounded"
                  style={{
                    background: i < good ? "#4a8a6e" : "#1a2a20",
                    border: `1px solid ${i < good ? "#5aaa80" : "#2a3a28"}`,
                    animation: i === flashGood ? "omenGoodFlash 1.4s ease-out forwards" : "none",
                    transition: i < good && i !== flashGood ? "background 0.3s" : "none",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bad Omens */}
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-2">
              <span style={{ color: "#c84a3e" }}><MoonIcon /></span>
              <p className="text-xs tracking-widest uppercase" style={{ color: "#c84a3e" }}>Bad Omens</p>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-8 flex-1 rounded"
                  style={{
                    background: i < bad ? "#c84a3e" : "#2a1a1a",
                    border: `1px solid ${i < bad ? "#dd4040" : "#3a2020"}`,
                    animation: i === flashBad ? "omenBadFlash 1.4s ease-out forwards" : "none",
                    transition: i < bad && i !== flashBad ? "background 0.3s" : "none",
                  }}
                />
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
    </>
  );
}
