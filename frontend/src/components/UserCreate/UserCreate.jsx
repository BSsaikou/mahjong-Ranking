import { useState } from "react";
import { createUser } from "../../api/user";
import {showSuccess, showError} from "../Toast/Toast"

export default function UserCreate({onUserCreated}) {
        const [nickname, setNickname] = useState("");
        async function handleCreateUser() {
            if (!nickname.trim()) return;

            try {
                await createUser(nickname);
                showSuccess("회원이 생성되었습니다.");
                setNickname("");
                onUserCreated();
                } catch(err) {
                    showError("이미 존재하는 닉네임입니다.");
                    console.error(err);
                    }
            }
        return(
        <div
          className="rounded-2xl px-6 py-4 flex items-center gap-4"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="text-sm font-semibold shrink-0"
            style={{ color: "#1a2035" }}
          >
            유저 생성
          </div>
          <input
            type="text"
            placeholder="유저 이름을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateUser()}
            className="flex-1 rounded-lg px-3.5 py-2 text-sm outline-none"
            style={{
              background: "#f4f6fa",
              border: "1px solid rgba(0,0,0,0.09)",
              color: "#1a2035",
            }}
          />
          <button
            onClick={handleCreateUser}
            className="shrink-0 rounded-lg px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-85"
            style={{ background: "#c8a820", color: "#ffffff" }}
          >
            생성
          </button>
        </div>
            );
        }
