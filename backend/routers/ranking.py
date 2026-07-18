from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.schemas.ranking import RankingResponse
from backend.crud.users import get_ranking

router = APIRouter(
    prefix="/ranking",
    tags=["ranking"],
    responses={404: {"description": "Not found"}}
)

# 랭킹 조회
@router.get("/", response_model=list[RankingResponse])
def read_ranking(db: Session = Depends(get_db)):
    return get_ranking(db)