from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
# env 파일로 보안 강화
USER = "omocat"
PASSWORD = "1qpdidkssud"
HOST = "localhost"
PORT = "5432"
DB = "ProjectDatabase"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

DATABASE_URL = (
    f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}"
)
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()