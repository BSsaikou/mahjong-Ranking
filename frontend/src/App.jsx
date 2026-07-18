import { useState, useEffect } from "react";
import { Trophy, BarChart2, Crown } from "lucide-react";
import Sidebar from "./components/Sidebar/Sidebar";
import UserCreate from "./components/UserCreate/UserCreate"
import TopRanking from "./components/TopRanking/TopRanking"
import RankingTable from "./components/RankingTable/RankingTable"
import GameRegistration from "./components/GameRegistration/GameRegistration"
import { getRanking } from "./api/ranking";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("ranking");
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
      loadRanking();
      }, []);

  async function loadRanking() {
    try {
        const response = await getRanking();
        setRanking(response.data);
    } catch (err) {
        console.error(err);
    }
}

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#f0f2f5", fontFamily: "'Noto Sans KR', sans-serif" }}
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main */}
      <main className="flex-1 flex flex-col p-6 gap-6 min-w-0">

        {/* ===== 기록 페이지 ===== */}
        {activeTab === "records" && <>
          <GameRegistration
            onGameRegistration={loadRanking}
          />
          <ToastContainer />
        </>}

        {/* ===== 랭킹 페이지 ===== */}
        {activeTab === "ranking" && <>

        <UserCreate
            onUserCreated={loadRanking}
        />

        <ToastContainer />

        <TopRanking
            ranking={ranking}
        />

        <RankingTable
            ranking={ranking}
        />
        </>}
      </main>
    </div>
  );
}
