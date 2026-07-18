from sqlalchemy import Column, Integer, String, DateTime, Numeric
from sqlalchemy.orm import relationship

from backend.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nickname = Column(String(30), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    total_uma = Column(Integer, default=0, nullable=False)
    game_count = Column(Integer, default=0, nullable=False)
    rank1_count = Column(Integer, default=0, nullable=False)
    rank2_count = Column(Integer, default=0, nullable=False)
    rank3_count = Column(Integer, default=0, nullable=False)
    rank4_count = Column(Integer, default=0, nullable=False)
    game_results = relationship("GameResult", back_populates="user")