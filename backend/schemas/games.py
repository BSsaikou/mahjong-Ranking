from datetime import datetime
from pydantic import BaseModel, Field
from typing import Annotated

class PlayerResult(BaseModel):
    seat: str
    nickname: str
    score: int

# 게임 등록 폼
class GameCreate(BaseModel):
    players: Annotated[list[PlayerResult], Field(min_length=4, max_length=4)]

class GameResponse(BaseModel):
    game_id: int
    played_at: datetime
    message: str

