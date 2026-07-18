from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.schemas.users import UserCreate, UserResponse
from backend.crud.users import create_user, get_user, get_all_users, get_ranking

router = APIRouter(
    prefix="/users",
    tags=["Users"],
    responses={404: {"description": "Not found"}}
)


# 유저 등록
@router.post("/", response_model=UserResponse)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

# id 기준 유저 조회
@router.get("/{user_id}", response_model=UserResponse)
def read_users(user_id: int, db: Session = Depends(get_db)):
    return get_user(db, user_id)

# 전체 유저 조회
@router.get("/", response_model=list[UserResponse])
def read_all_users(db: Session = Depends(get_db)):
    return get_all_users(db)
