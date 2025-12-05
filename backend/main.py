from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.session import Base, engine
from endpoints import projects
from config import settings


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Project Pulse API",
    description="FastAPI backend for Project Pulse dashboard",
    version="1.0.0"
)


# CORS configuration
cors_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    settings.FRONTEND_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(projects.router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Project Pulse API",
        
    }


@app.get("/api")
def health_check():
    return {
        "status": "healthy",
        "api_url": settings.API_BASE_URL,
        "environment": settings.ENVIRONMENT
    }


