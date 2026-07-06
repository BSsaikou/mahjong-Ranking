from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.orm import relationship

from backend.database import Base
from datetime import datetime

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    played_at = Column(DateTime, default=datetime.now, nullable=False)

    game_results = relationship("GameResult", back_populates="game")