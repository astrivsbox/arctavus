"use client";

import { useEffect, useRef, useState } from "react";

export default function ArctavusIntro() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("arctavus-intro-seen")) return;
    sessionStorage.setItem("arctavus-intro-seen", "1");
    setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => setFadeOut(true);

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "#060504",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.7s ease-out",
        pointerEvents: fadeOut ? "none" : "all",
        cursor: "pointer",
      }}
      onTransitionEnd={() => { if (fadeOut) setVisible(false); }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={dismiss}
        style={{
          width: "min(420px, 80vw)",
          height: "auto",
          filter: "invert(1)",
        }}
      >
        <source src="/logo-intro.webm" type="video/webm" />
      </video>
    </div>
  );
}
