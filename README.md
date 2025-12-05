# Project Pulse

Repo: https://github.com/vpendo/Project-Pulse.git  
Live frontend: https://projectpulsedashboard.netlify.app  
Live backend (API): https://project-pulse-4qj1.onrender.com

Full-stack project management dashboard:
- Landing, features, and dashboard pages built with React + TypeScript + Vite + Tailwind
- FastAPI + SQLite backend with RESTful CRUD for projects
- Axios-based frontend integration; data persists across refreshes

## Running locally

Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows (use source .venv/bin/activate on macOS/Linux)
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs at http://127.0.0.1:8000

Frontend
```bash
cd project-pulse-dashbord
pnpm install
pnpm  run dev
```
Frontend runs at http://localhost:5173

Set API base if needed:
```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Key endpoints
- `GET /projects` (paginated), `POST /projects`, `PUT /projects/{id}`, `DELETE /projects/{id}`
- `GET /projects/statuses`, `GET /projects/stats`

## Notes
- CORS allows local dev and the Netlify frontend.
- SQLite DB file is created automatically on first run in `backend/project_pulse.db`.

## Technical choices (brief)
- FastAPI: lightweight, async-friendly, great OpenAPI/Swagger out of the box.
- SQLite: zero-config persistence for a small take-home; easy to bundle with FastAPI.
- SQLAlchemy + Pydantic: clear models/schemas and validation.
- React + Vite + TypeScript: fast DX, type safety, and modern tooling.
- Tailwind CSS: rapid styling with consistent design tokens.
- axios + Context: simple data layer to keep dependencies minimal while calling the REST API.
