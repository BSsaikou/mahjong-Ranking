from sqlalchemy.orm import Session
from backend.models.games import Game
from backend.models.users import User
from backend.models.game_results import GameResult
from backend.schemas.games import GameCreate
from fastapi import HTTPException
def uma_calculator(player, rank):
    base = int((player.score - 30000) / 1000)
    if rank == 1:
        uma = 20
        oka = 20
    elif rank == 2:
        uma = 10
        oka = 0
    elif rank == 3:
        uma = -10
        oka = 0
    else:
        uma = -20
        oka = 0
    result = base + uma + oka
    return result

def create_game(db: Session, game: GameCreate):
    try:

        db_game = Game()
        db.add(db_game)     # Session에 등록
        db.flush()      # db로 보냄 (rollback()시 사라짐)
        game_id = db_game.id
        sorted_player = sorted(
            game.players,
            key=lambda p: p.score,
            reverse=True
        )
        for rank, player in enumerate(sorted_player, start=1):
            game_result = GameResult()
            game_result.game_id = game_id
            user = db.query(User).filter_by(nickname=player.nickname).first() # player 닉네임을 가진 user 열을 가져옴
            if user is None:
                raise HTTPException(status_code=400, detail="User not found")
            # 게임 정보 기록
            game_result.user_id = user.id
            game_result.score = player.score
            game_result.rank = rank
            uma = uma_calculator(player, rank)
            game_result.uma = uma
            # 유저 전적 업데이트
            user.total_uma += uma
            user.game_count += 1
            field_name = f"rank{rank}_count"
            setattr(user, field_name, getattr(user, field_name) + 1)
            db.add(game_result)
        db.commit()
    except:
        db.rollback()
        raise   # fastapi에 오류 전달
    return {
        "game_id": db_game.id,
        "played_at": db_game.played_at,
        "message": "게임이 정상적으로 등록되었습니다."
    }




