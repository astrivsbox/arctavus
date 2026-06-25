"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { getSocket } from "@/lib/socket";
import type { GameState, PrivateInfo, OmenCard } from "@/lib/types";
import { playGoodOmen, playBadOmen } from "@/lib/sounds";
import Lobby from "./Lobby";
import NominationPhase from "./NominationPhase";
import ElectionPhase from "./ElectionPhase";
import LegislativePhase from "./LegislativePhase";
import ExecutivePhase from "./ExecutivePhase";
import GameOver from "./GameOver";
import OmenBoard from "./OmenBoard";
import RoleCard from "./RoleCard";
import MusicPlayer from "./MusicPlayer";
import AffiliationButton from "./AffiliationButton";
import ZealotLegend from "./ZealotLegend";
import PlayerTable from "./PlayerTable";

export default function GameClient() {
  const [state, setState] = useState<GameState | null>(null);
  const [priv, setPriv] = useState<PrivateInfo | null>(null);
  const [myId, setMyId] = useState<string>("");
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [showRole, setShowRole] = useState(false);
  const roleRevealedRef = useRef(false);
  const prevGoodRef = useRef<number | null>(null);
  const prevBadRef = useRef<number | null>(null);

  // Play sound when an omen is enacted (skip on initial load)
  useEffect(() => {
    if (!state || state.phase === "lobby") {
      prevGoodRef.current = null;
      prevBadRef.current = null;
      return;
    }
    if (prevGoodRef.current !== null && state.goodOmensEnacted > prevGoodRef.current) {
      playGoodOmen();
    }
    if (prevBadRef.current !== null && state.badOmensEnacted > prevBadRef.current) {
      playBadOmen();
    }
    prevGoodRef.current = state.goodOmensEnacted;
    prevBadRef.current = state.badOmensEnacted;
  }, [state?.goodOmensEnacted, state?.badOmensEnacted, state?.phase]);

  const notify = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  }, []);

  useEffect(() => {
    const socket = getSocket();
    socket.connect();
    setMyId(socket.id ?? "");

    socket.on("connect", () => setMyId(socket.id ?? ""));
    socket.on("game_state", (s: GameState) => setState(s));
    socket.on("private_info", (p: PrivateInfo) => {
      setPriv(p);
      // Only pop up the role card once, on the very first assignment at game start
      if (!roleRevealedRef.current) {
        setShowRole(true);
        roleRevealedRef.current = true;
      }
    });
    socket.on("room_created", ({ code }: { code: string }) => {
      setJoined(true);
      setCode(code);
      setError("");
    });
    socket.on("room_joined", ({ code }: { code: string }) => {
      setJoined(true);
      setCode(code);
      setError("");
    });
    socket.on("error", (msg: string) => setError(msg));
    socket.on("investigation_result", ({ faction, targetName }: { faction: string; targetName: string }) => {
      notify(`Investigation: ${targetName} is a ${faction === "warden" ? "WARDEN" : "ZEALOT"}`);
    });
    socket.on("peek_result", ({ cards }: { cards: OmenCard[] }) => {
      notify(`Top 3 Omens: ${cards.map(c => c.type === "good" ? "Good" : "Bad").join(", ")}`);
    });

    return () => { socket.removeAllListeners(); socket.disconnect(); };
  }, [notify]);

  const createRoom = () => {
    if (!name.trim()) return setError("Enter your name");
    getSocket().emit("create_room", { name: name.trim() });
  };

  const joinRoom = () => {
    if (!name.trim()) return setError("Enter your name");
    if (!code.trim()) return setError("Enter invite code");
    getSocket().emit("join_room", { code: code.trim().toUpperCase(), name: name.trim() });
  };

  if (!joined) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0a0a0a" }}>
        <div className="w-full max-w-md">
          <h1 className="font-black text-5xl text-white tracking-tight mb-2 text-center">ASCENDANCY</h1>
          <p className="text-center text-xs tracking-widest uppercase mb-10" style={{ color: "#8a7a6a" }}>
            The Order Awaits
          </p>

          <input
            className="w-full px-4 py-3 rounded mb-3 text-white font-bold text-sm tracking-wide outline-none"
            style={{ background: "#1a1510", border: "1px solid #3a2a1a", caretColor: "#c8a96e" }}
            placeholder="YOUR NAME"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={20}
          />

          <button
            onClick={createRoom}
            className="w-full py-3 font-black text-sm tracking-widest uppercase mb-3 rounded transition-opacity hover:opacity-80"
            style={{ background: "#c8a96e", color: "#0a0a0a" }}
          >
            Create Room
          </button>

          <div className="flex gap-2">
            <input
              className="flex-1 px-4 py-3 rounded text-white font-bold text-sm tracking-widest uppercase outline-none"
              style={{ background: "#1a1510", border: "1px solid #3a2a1a", caretColor: "#c8a96e" }}
              placeholder="INVITE CODE"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              maxLength={6}
            />
            <button
              onClick={joinRoom}
              className="px-6 py-3 font-black text-sm tracking-widest uppercase rounded transition-opacity hover:opacity-80"
              style={{ border: "1px solid #c8a96e", color: "#c8a96e" }}
            >
              Join
            </button>
          </div>

          {error && (
            <p className="text-center text-sm mt-4 font-bold" style={{ color: "#c84a3e" }}>{error}</p>
          )}
        </div>
      </div>
    );
  }

  if (!state) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
      <p className="text-white tracking-widest uppercase text-sm">Connecting...</p>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", color: "#e8d5b0" }}>
      {/* Notification toast */}
      {notification && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded font-bold text-sm tracking-wide text-center"
          style={{ background: "#1a1510", border: "1px solid #c8a96e", color: "#c8a96e", maxWidth: "90vw" }}
        >
          {notification}
        </div>
      )}

      {/* Role reveal overlay */}
      {showRole && priv && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setShowRole(false)}
        >
          <RoleCard role={priv.role} allies={priv.zealotAllies} onClose={() => setShowRole(false)} />
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-black text-2xl tracking-tight" style={{ color: "#c8a96e" }}>ASCENDANCY</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MusicPlayer playing={state.phase !== "lobby" && state.phase !== "game_over"} />
              {priv && <AffiliationButton priv={priv} />}
              <div className="text-xs font-black tracking-widest" style={{ color: "#3a2a1a" }}>
                {state.code}
              </div>
            </div>
          </div>
        </div>

        {/* Omen board */}
        {state.phase !== "lobby" && (
          <OmenBoard good={state.goodOmensEnacted} bad={state.badOmensEnacted} tracker={state.electionTracker} />
        )}

        {/* Round table player tracker */}
        {state.phase !== "lobby" && state.phase !== "game_over" && (
          <PlayerTable state={state} />
        )}

        {error && (
          <p className="text-sm font-bold mb-4 text-center" style={{ color: "#c84a3e" }}>{error}</p>
        )}

        {/* Phase components */}
        {state.phase === "lobby" && (
          <Lobby state={state} myId={myId} />
        )}
        {state.phase === "nomination" && (
          <NominationPhase state={state} myId={myId} />
        )}
        {state.phase === "election" && (
          <ElectionPhase state={state} myId={myId} />
        )}
        {(state.phase === "legislative_ascendant" || state.phase === "legislative_high_priest") && (
          <LegislativePhase state={state} myId={myId} priv={priv} />
        )}
        {state.phase === "executive" && (
          <ExecutivePhase state={state} myId={myId} />
        )}
        {state.phase === "game_over" && (
          <GameOver state={state} myId={myId} priv={priv} />
        )}
      </div>

      {/* Persistent zealot ally legend — bottom-right corner, only for Zealots/Prophet */}
      {priv && <ZealotLegend priv={priv} />}
    </div>
  );
}
