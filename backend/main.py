from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import Base, engine
from backend.routers.users import router as user_router
from backend.routers.games import router as game_router
from backend.routers.ranking import router as ranking_router
@asynccontextmanager
async def lifespan(_: FastAPI):
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created")
    yield
    print("Server shutting down...")

app = FastAPI(lifespan=lifespan)
app.include_router(user_router)
app.include_router(game_router)
app.include_router(ranking_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)