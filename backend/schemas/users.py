from datetime import datetime
from pydantic import BaseModel

# 유저 등록
class UserCreate(BaseModel):
    nickname: str

# 유저 조회
class UserResponse(BaseModel):
    id: int
    nickname: str
    created_at: datetime
    model_config = {
        "from_attributes": True
    }

# 유저 닉네임 변경
class UserUpdate(BaseModel):
    nickname: str