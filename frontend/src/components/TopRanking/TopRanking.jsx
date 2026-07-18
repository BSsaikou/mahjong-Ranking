

const podiumColors = {
    1: "#f0c040",
    2: "#a8b8d0",
    3: "#cd7f32",
};

function CrownIcon({ color }) {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
      <path
        d="M2 20L6 8L12 14L16 4L20 14L26 8L30 20H2Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="2" y="20" width="28" height="3" rx="1.5" fill={color} />
    </svg>
  );
}

export default function TopRanking({ranking}) {
    const top3 = ranking.slice(0, 3);
    const displayOrder = [1, 0, 2];
    return (
        <div className="flex gap-4 items-end">
          {displayOrder.map((index) => {
            const player = top3[index];
            if (!player) return null;

            const isFirst = player.rank === 1;

            return (
              <div
                key={player.id}
                className="rounded-2xl flex flex-col items-center px-4 relative"
                style={{
                  flex: isFirst ? "1.4" : "1",
                  paddingTop: isFirst ? "2rem" : "1.5rem",
                  paddingBottom: isFirst ? "1.75rem" : "1.25rem",
                  background: "#ffffff",
                  border: isFirst
                    ? "1px solid rgba(240,192,64,0.4)"
                    : "1px solid rgba(0,0,0,0.07)",
                  boxShadow: isFirst
                    ? "0 6px 32px rgba(240,192,64,0.15)"
                    : "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                {/* Crown */}
                <div className="mb-2" style={{ transform: isFirst ? "scale(1.3)" : "scale(1)" }}>
                  <CrownIcon color={podiumColors[player.rank]} />
                </div>

                {/* Rank badge */}
                <div
                  className="rounded-full flex items-center justify-center font-bold mb-3"
                  style={{
                    width: isFirst ? "3rem" : "2.5rem",
                    height: isFirst ? "3rem" : "2.5rem",
                    fontSize: isFirst ? "1.25rem" : "1rem",
                    background:
                      player.rank === 1
                        ? "radial-gradient(circle, #f0c040, #c8900a)"
                        : player.rank === 2
                        ? "radial-gradient(circle, #c0c8d8, #7a8898)"
                        : "radial-gradient(circle, #e09050, #8a4820)",
                    color: "#0a1020",
                  }}
                >
                  {player.rank}
                </div>

                {/* Name */}
                <div
                  className="font-bold mb-3"
                  style={{ color: "#1a2035", fontSize: isFirst ? "1.1rem" : "0.95rem" }}
                >
                  {player.nickname}
                </div>

                {/* Stats */}
                <div className="flex gap-4 w-full justify-center">
                  <div className="flex flex-col items-center">
                    <span className="text-xs mb-0.5" style={{ color: "#8090a8" }}>
                      평균 순위
                    </span>
                    <span
                      className="font-semibold"
                      style={{ fontSize: isFirst ? "0.95rem" : "0.85rem", color: "#3a4a60" }}
                    >
                      {player.avg_rank}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs mb-0.5" style={{ color: "#8090a8" }}>
                      판수
                    </span>
                    <span
                      className="font-semibold"
                      style={{ fontSize: isFirst ? "0.95rem" : "0.85rem", color: "#3a4a60" }}
                    >
                      {player.game_count}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs mb-0.5" style={{ color: "#8090a8" }}>
                      우마
                    </span>
                    <span
                      className="font-semibold"
                      style={{ fontSize: isFirst ? "0.95rem" : "0.85rem", color:
                                                                                player.total_uma >= 0
                                                                                    ? "#16a34a"
                                                                                    : "#dc2626" }}
                    >
                      {player.total_uma > 0 ? "+" : ""}
                      {player.total_uma.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        );
    }