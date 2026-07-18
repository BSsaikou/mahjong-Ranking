import Sidebar from "../components/Sidebar/Sidebar";
import UserCreate from "../components/UserCreate/UserCreate";
import TopRanking from "../components/TopRanking/TopRanking";
import RankingTable from "../components/RankingTable/RankingTable";
import GameRegistration from "../components/GameRegistration/GameRegistration";

export default function Dashboard() {
    return (
        <>
            <Sidebar />

            <UserCreate />

            <TopRanking />

            <RankingTable />

            <GameRegistration />
        </>
    );
}