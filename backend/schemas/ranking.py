from pydantic import BaseModel

# 랭킹 조회는 따로 변경할 예정
class RankingResponse(BaseModel):
    id: int
    rank: int
    nickname: str
    total_uma: int
    game_count: int
    rank1_count: int
    rank2_count: int
    rank3_count: int
    rank4_count: int
    avg_uma: float
    avg_rank: float