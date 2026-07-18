
export default function RankingTable({ranking}) {

    return(
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            maxHeight: "360px",
          }}
        >
          <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#d0d8e8 transparent" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                {["순위", "닉네임", "평균 순위", "판수", "평균 우마", "우마"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left font-semibold"
                    style={{ color: "#8090a8", fontSize: "0.75rem", letterSpacing: "0.04em", position: "sticky", top: 0, background: "#ffffff", zIndex: 1 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ranking.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom:
                      i < ranking.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                  }}
                  className="transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-5 py-3.5">
                    <span
                      className="w-7 h-7 rounded-full inline-flex items-center justify-center text-xs font-bold"
                      style={{ background: "rgba(0,0,0,0.06)", color: "#6070a0" }}
                    >
                      {row.rank}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-medium" style={{ color: "#1a2035" }}>
                    {row.nickname}
                  </td>
                  <td className="px-5 py-3.5" style={{ color: "#5a6a88" }}>
                    {row.avg_rank}
                  </td>
                  <td className="px-5 py-3.5" style={{ color: "#5a6a88" }}>
                    {row.game_count.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 font-semibold" style={{ color: "#16a34a" }}>
                    {row.avg_uma}
                  </td>
                  <td className="px-5 py-3.5 font-semibold" style={{ color: "#16a34a" }}>
                    {row.total_uma}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        );

    }