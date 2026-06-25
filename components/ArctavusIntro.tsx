"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ArctavusIntro() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("arctavus-intro-seen")) return;
    sessionStorage.setItem("arctavus-intro-seen", "1");
    setVisible(true);
    // start fade-out after tracing + PNG reveal are done
    const t = setTimeout(() => setFadeOut(true), 4000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "#060504",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.8s ease-out",
        pointerEvents: fadeOut ? "none" : "all",
      }}
      onTransitionEnd={() => { if (fadeOut) setVisible(false); }}
    >
      <style>{`
        @keyframes traceOuter {
          from { stroke-dashoffset: 1300; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes traceInner {
          from { stroke-dashoffset: 700; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes revealA {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { filter: invert(1) drop-shadow(0 0 8px rgba(255,255,255,0.3)); }
          50%       { filter: invert(1) drop-shadow(0 0 22px rgba(200,169,110,0.7)); }
        }
      `}</style>

      <div style={{ position: "relative", width: 200, height: 200 }}>

        {/* SVG tracing layer */}
        <svg
          viewBox="0 0 400 400"
          width="200" height="200"
          style={{ position: "absolute", inset: 0 }}
        >
          {/* Outer triangle — traces first */}
          <path
            d="M 200 20 L 15 385 L 385 385 Z"
            fill="none"
            stroke="#c8a96e"
            strokeWidth="3"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 6px rgba(200,169,110,0.8))",
              strokeDasharray: 1300,
              strokeDashoffset: 1300,
              animation: "traceOuter 1.7s cubic-bezier(0.4,0,0.2,1) 0.2s forwards",
            }}
          />

          {/* Inner triangle void — traces second */}
          <path
            d="M 200 95 L 120 305 L 280 305 Z"
            fill="none"
            stroke="#c8a96e"
            strokeWidth="2.5"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 5px rgba(200,169,110,0.7))",
              strokeDasharray: 700,
              strokeDashoffset: 700,
              animation: "traceInner 1s cubic-bezier(0.4,0,0.2,1) 1.6s forwards",
            }}
          />
        </svg>

        {/* Actual A PNG fades in after trace completes */}
        <div style={{
          position: "absolute", inset: 0,
          opacity: 0,
          animation: "revealA 0.6s ease-out 2.8s forwards",
        }}>
          <Image
            src="/arctavus-a.png"
            alt="Arctavus"
            fill
            style={{
              objectFit: "contain",
              animation: "glowPulse 2s ease-in-out 3.2s infinite",
              filter: "invert(1)",
            }}
          />
        </div>

      </div>
    </div>
  );
}
