from fastapi import FastAPI

from backend.database import Base, engine

from backend.routers.users import router as user_router

app = FastAPI()

@app.on_event("startup")
def startup():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created")

app.include_router(user_router)