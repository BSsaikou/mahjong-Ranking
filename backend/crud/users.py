from sqlalchemy.orm import Session
from backend.models.users import User
from backend.schemas.users import UserCreate

def create_user(db: Session, user: UserCreate):
    existing_user = db.query(User).filter_by(nickname=user.nickname).first()
    if existing_user:
        return None
    db_user = User(nickname=user.nickname)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_all_users(db: Session):
    return db.query(User).all()

def get_ranking(db: Session):
    users = db.query(User).order_by(User.total_uma.desc()).all()

    result = []

    for rank, user in enumerate(users, start=1):
        avg_uma = (
            user.total_uma / user.game_count
            if user.game_count > 0
            else 0
        )
        avg_rank = (
        (
            (user.rank1_count +
            user.rank2_count * 2 +
            user.rank3_count * 3 +
            user.rank4_count * 4) / user.game_count
            if user.game_count > 0
            else 0
        )
        )

        result.append({
            "id": user.id,
            "rank": rank,
            "nickname": user.nickname,
            "total_uma": user.total_uma,
            "game_count": user.game_count,
            "rank1_count": user.rank1_count,
            "rank2_count": user.rank2_count,
            "rank3_count": user.rank3_count,
            "rank4_count": user.rank4_count,
            "avg_uma": round(avg_uma, 2),
            "avg_rank": round(avg_rank, 2)
        })
    return result