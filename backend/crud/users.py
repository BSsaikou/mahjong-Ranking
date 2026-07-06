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