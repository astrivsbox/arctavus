import Link from "next/link";

const games = [
  {
    slug: "ascendancy",
    title: "Ascendancy",
    tagline: "A game of faith, doubt, and deception.",
    players: "5–10 players",
    status: "playable",
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#0a0a0a" }}
    >
      <div className="w-full max-w-2xl">
        <h1 className="font-black text-5xl tracking-tight text-white mb-1">ARCTAVUS</h1>
        <p className="text-xs tracking-widest uppercase mb-12" style={{ color: "#5a4a3a" }}>
          Game Portal
        </p>

        <div className="space-y-3">
          {games.map(game => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className="flex items-center justify-between px-6 py-5 rounded group transition-all"
              style={{ background: "#0f0e0c", border: "1px solid #2a2010" }}
            >
              <div>
                <h2 className="font-black text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  {game.title}
                </h2>
                <p className="text-sm mt-0.5" style={{ color: "#8a7a6a" }}>{game.tagline}</p>
                <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: "#5a4a3a" }}>
                  {game.players}
                </p>
              </div>
              <span className="font-black text-xs tracking-widest uppercase px-3 py-1.5 rounded"
                style={{ border: "1px solid #c8a96e", color: "#c8a96e" }}>
                Play →
              </span>
            </Link>
          ))}
        </div>

        <p className="text-xs text-center mt-12 tracking-widest uppercase" style={{ color: "#3a2a1a" }}>
          More games coming soon
        </p>
      </div>
    </div>
  );
}
