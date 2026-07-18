import {postgames} from "../../api/games"
import {useState} from "react";
import {showSuccess, showError} from "../Toast/Toast"


export default function GameRegistration({onGameRegistration}){
    const SEATS = [
  { key: "east",  label: "동", color: "#e05a3a", bg: "#fff0ed" },
  { key: "south", label: "남", color: "#2a9d5c", bg: "#edfaf3" },
  { key: "west",  label: "서", color: "#d4830a", bg: "#fff8ed" },
  { key: "north", label: "북", color: "#2a6db5", bg: "#edf4ff" },
];
    const [gameRecord, setGameRecord] = useState(
        SEATS.map((s) => ({ seat: s.key, nickname: "", score: ""}))
  );

    function updateEntry(idx, field, value) {
        setGameRecord((prev) => prev.map((e, i) => (i === idx ? { ...e, [field]: value } : e)));
  }

    async function saveRecord() {
        let filled = gameRecord
            .filter((e) => e.nickname.trim() && e.score.trim())
            .map((e) => ({
                ...e,
                score: Number(e.score),
        }));
        if (filled.length !== 4) { showError("닉네임과 점수를 입력해주세요."); return; }
        let totalScore = filled.reduce((sum, player) => sum + player.score, 0);

        if (totalScore === 1000){
            filled.forEach((e) => {
                e.score *= 100;
                });

            totalScore = filled.reduce((sum, player) => sum + player.score, 0);
            }
        if (totalScore !== 100000){
            showError("전체 점수가 부족하거나 큽니다.");
            return;
            }
        try {
            await postgames( {players: filled} );
            showSuccess("기록이 저장되었습니다.");
            setGameRecord(SEATS.map((s) => ({ seat: s.key, nickname: "", score: "" })));
            onGameRegistration();
        } catch(err) {
            showError("오류가 발생했습니다.");
            console.error(err);
            }
  }
    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <h1 className="text-xl font-bold" style={{ color: "#1a2035" }}>
                게임 기록 등록
              </h1>
              <p className="text-sm mt-1" style={{ color: "#8090a8" }}>
                게임이 끝난 후, 각 유저의 자리와 점수를 입력하여 기록을 저장하세요.
              </p>
            </div>

            {/* Entry Table */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Table header */}
              <div
                className="grid px-6 py-3 text-xs font-semibold"
                style={{
                  gridTemplateColumns: "80px 1fr 1fr 40px",
                  color: "#8090a8",
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                  letterSpacing: "0.04em",
                }}
              >
                <span>자리</span>
                <span>닉네임</span>
                <span>점수</span>
                <span />
              </div>

              {/* Rows */}
              {SEATS.map((seat, idx) => (
                <div
                  key={seat.key}
                  className="grid items-center px-6 py-4"
                  style={{
                    gridTemplateColumns: "80px 1fr 1fr 40px",
                    borderBottom: idx < SEATS.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                  }}
                >
                  {/* Seat badge */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold"
                      style={{ background: seat.bg, color: seat.color }}
                    >
                      {seat.label}
                    </div>
                  </div>

                  {/* Name input */}
                  <div className="pr-4">
                    <input
                      type="text"
                      placeholder="닉네임을 입력하세요"
                      value={gameRecord[idx].nickname}
                      onChange={(e) => updateEntry(idx, "nickname", e.target.value)}
                      className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none"
                      style={{
                        background: "#f4f6fa",
                        border: "1px solid rgba(0,0,0,0.08)",
                        color: "#1a2035",
                      }}
                    />
                  </div>

                  {/* Score input */}
                  <div className="pr-4">
                    <input
                      type="number"
                      step="100"
                      placeholder="점수를 입력하세요"
                      value={gameRecord[idx].score}
                      onChange={(e) => updateEntry(idx, "score", e.target.value)}
                      className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none"
                      style={{
                        background: "#f4f6fa",
                        border: "1px solid rgba(0,0,0,0.08)",
                        color: "#1a2035",
                      }}
                    />
                  </div>

                  {/* 점 label */}
                  <span className="text-sm font-medium" style={{ color: "#8090a8" }}>점</span>
                </div>
              ))}
            </div>

            {/* Save button */}
            <div className="flex justify-end">
              <button
                onClick={saveRecord}
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
                style={{ background: "#1a2035", color: "#ffffff" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 2H4L2 4v9a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1zm-5 11a2 2 0 110-4 2 2 0 010 4zm2-7H4V3h6v3z" fill="currentColor"/>
                </svg>
                기록 저장
              </button>
            </div>
          </div>
        )
    }