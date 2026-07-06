from datetime import datetime
from pydantic import BaseModel

# 유저 등록
class UserCreate(BaseModel):
    nickname: str

# 유저 조회
class UserResponse(BaseModel):
    id: int
    nickname: str
    uma: int
    game_count: int
    created_at: datetime

# 유저 닉네임 변경
class UserUpdate(BaseModel):
    nickname: str