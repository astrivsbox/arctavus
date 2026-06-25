export type Role = "warden" | "zealot" | "prophet";
export type Phase =
  | "lobby"
  | "nomination"
  | "election"
  | "legislative_ascendant"
  | "legislative_high_priest"
  | "executive"
  | "game_over";

export type OmenCard = { type: "good" | "bad"; id: number };

export type Player = {
  id: string;
  name: string;
  isAlive: boolean;
  isAscendant: boolean;
  isHighPriest: boolean;
};

export type GameState = {
  code: string;
  phase: Phase;
  players: Player[];
  ascendantIndex: number;
  nominatedHighPriest: string | null;
  goodOmensEnacted: number;
  badOmensEnacted: number;
  electionTracker: number;
  executivePower: "peek" | "investigate" | "execute" | "special_election" | null;
  winner: "wardens" | "zealots" | null;
  winReason: string | null;
  host: string;
  drawPileCount: number;
  discardPileCount: number;
  votesCast: number;
  totalAlive: number;
  votes?: Record<string, "faith" | "doubt">;
};

export type PrivateInfo = {
  role: Role;
  zealotAllies: { id: string; name: string; role: Role }[];
  drawnOmens: OmenCard[];
  highPriestOptions: OmenCard[];
};
