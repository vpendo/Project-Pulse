import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_BASE_URL: str = os.getenv("API_BASE_URL", "https://project-pulse-4qj1.onrender.com")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "https://projectpulsedashboard.netlify.app")
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "production")
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

# For local development, backend runs at http://127.0.0.1:8000
# Set ENVIRONMENT=development and API_BASE_URL=http://127.0.0.1:8000 in .env for local dev

