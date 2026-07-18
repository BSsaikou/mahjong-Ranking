import { useState } from "react";
import { Trophy, BarChart2 } from "lucide-react";
import "./Sidebar.css"

export default function Sidebar({
    activeTab,
    setActiveTab,
    }) {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    return (
      <aside
        className="flex flex-col w-52 min-h-screen shrink-0"
        style={{ background: "#0a1020", borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Logo */}
        <div className="px-6 pt-7 pb-6">
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#f0c040",
              fontSize: "1.35rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
             역곡마장
          </div>
          <div
            style={{
              color: "#6a7a99",
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              marginTop: "2px",
            }}
          >
            {activeTab === "ranking" ? "— LEADERBOARD —" : "— RECORD —"}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-3">
          <button
            onClick={() => setActiveTab("ranking")}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === "ranking" ? "rgba(240,192,64,0.12)" : "transparent",
              color: activeTab === "ranking" ? "#f0c040" : "#6a7a99",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Trophy size={16} />
            랭킹
          </button>
          <button
            onClick={() => setActiveTab("records")}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === "records" ? "rgba(240,192,64,0.12)" : "transparent",
              color: activeTab === "records" ? "#f0c040" : "#6a7a99",
              border: "none",
              cursor: "pointer",
            }}
          >
            <BarChart2 size={16} />
            기록
          </button>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Admin Login */}
        <div className="px-4 pb-6">
          <div
            className="text-xs font-semibold mb-3"
            style={{ color: "#8090b0", letterSpacing: "0.05em" }}
          >
            관리자 로그인
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <div className="text-xs mb-1" style={{ color: "#5a6a88" }}>
                아이디
              </div>
              <input
                type="text"
                placeholder="아이디를 입력하세요"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full rounded px-2.5 py-1.5 text-xs outline-none"
                style={{
                  background: "#141e30",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#c8d4e8",
                }}
              />
            </div>
            <div>
              <div className="text-xs mb-1" style={{ color: "#5a6a88" }}>
                비밀번호
              </div>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full rounded px-2.5 py-1.5 text-xs outline-none"
                style={{
                  background: "#141e30",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#c8d4e8",
                }}
              />
            </div>
            <button
              className="w-full rounded py-2 text-sm font-semibold mt-1 transition-opacity hover:opacity-90"
              style={{ background: "#c8a820", color: "#0a1020" }}
            >
              로그인
            </button>
          </div>
        </div>
      </aside>
        );
    }