from datetime import datetime
from pydantic import BaseModel

class PlayerResult(BaseModel):
    user_id: int
    score: int

# 게임 등록 폼
class GameCreate(BaseModel):
    played_at: datetime
    players: list[PlayerResult]