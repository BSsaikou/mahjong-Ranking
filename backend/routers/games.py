from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.schemas.games import GameResponse, PlayerResult, GameCreate
from backend.crud.games import create_game

router = APIRouter(
    prefix="/games",
    tags=["games"],
    responses={404: {"description": "Not found"}}
)

@router.post("/", response_model=GameResponse)
def game_registration(game: GameCreate, db: Session = Depends(get_db)):
    return create_game(db, game)

