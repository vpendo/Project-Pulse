from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.db.session import Base, engine
from backend.endpoints import projects


Base.metadata.create_all(bind=engine)


app = FastAPI(title="Project Pulse API")


# CORS for frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(projects.router)


@app.get("/")
def root():
    return {"message": "Welcome to Project Pulse API"}


