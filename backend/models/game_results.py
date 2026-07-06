from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from backend.database import Base

class GameResult(Base):
    __tablename__ = "game_results"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey("games.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Integer, nullable=False)
    rank = Column(Integer, nullable=False)
    uma = Column(Integer, default=0)

    game = relationship("Game", back_populates="game_results")
    user = relationship("User", back_populates="game_results")



