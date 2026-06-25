"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ playing }: { playing: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing && !muted) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing, muted]);

  if (!playing) return null;

  return (
    <button
      onClick={() => setMuted(m => !m)}
      className="flex items-center gap-2 px-3 py-1.5 rounded transition-opacity hover:opacity-80 text-xs font-bold tracking-widest uppercase"
      style={{
        border: "1px solid #3a2a1a",
        color: muted ? "#5a4a3a" : "#c8a96e",
        background: "#0f0e0c",
      }}
      title={muted ? "Unmute music" : "Mute music"}
    >
      {muted ? (
        <>
          <span>♪</span>
          <span>Off</span>
        </>
      ) : (
        <>
          <span>♪</span>
          <span>On</span>
        </>
      )}
    </button>
  );
}
