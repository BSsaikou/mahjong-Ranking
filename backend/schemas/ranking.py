from pydantic import BaseModel

# 랭킹 조회는 따로 변경할 예정
class RankingResponse(BaseModel):
    rank: int
    nickname: str
    games: int
    uma: int