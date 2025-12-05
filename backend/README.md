## Project Pulse – FastAPI Backend

Live API: https://project-pulse-4qj1.onrender.com  
Local default: http://127.0.0.1:8000

FastAPI + SQLite backend powering the Project Pulse dashboard with CRUD endpoints for projects.

### Tech Stack

- **FastAPI** – web framework
- **SQLite** – database
- **SQLAlchemy 2.x** – ORM
- **Pydantic v2** – request/response schemas and validation

### Prerequisites
- Python 3.11+
- pip

### Quickstart (local)
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # on Windows (use source .venv/bin/activate on macOS/Linux)
pip install -r requirements.txt
uvicorn main:app --reload
```
Server runs at http://127.0.0.1:8000 and creates `project_pulse.db` automatically.

### Verify locally
- Root: http://127.0.0.1:8000/ → Returns API info including deployment URL
- Health check: http://127.0.0.1:8000/api → Returns API status and configuration
- Docs: http://127.0.0.1:8000/docs
- List projects: http://127.0.0.1:8000/projects

### API Overview
- `GET /projects` – list with pagination/filter/sort (returns `{ total, page, page_size, items }`)
  - Query: `page`, `page_size`, `name`, `status` (`Not Started|In Progress|Completed`), `sort_by` (`newest|oldest|name_asc|name_desc`)
- `GET /projects/{id}` – fetch one
- `POST /projects` – create
- `PUT /projects/{id}` – update (partial)
- `DELETE /projects/{id}` – delete
- `GET /projects/statuses` – available statuses
- `GET /projects/stats` – totals by status

Example:
```bash
curl -X POST http://127.0.0.1:8000/projects \
  -H "Content-Type: application/json" \
  -d '{"name": "My Project", "description": "Test", "status": "Not Started"}'
```

### Configuration

The backend is configured to connect to the deployment URL: `https://project-pulse-4qj1.onrender.com`

Environment variables (optional, defaults provided):
- `API_BASE_URL` - API base URL (default: `https://project-pulse-4qj1.onrender.com`)
- `FRONTEND_URL` - Frontend URL for CORS (default: `https://projectpulsedashboard.netlify.app`)
- `ENVIRONMENT` - Environment mode: `production` or `development` (default: `production`)

Create a `.env` file in the backend directory for local development:
```env
# Local development settings
API_BASE_URL=http://127.0.0.1:8000
FRONTEND_URL=http://localhost:5173
ENVIRONMENT=development
```

**Note:** When running locally with `uvicorn main:app --reload`, the backend automatically runs at `http://127.0.0.1:8000` (port 8000 is uvicorn's default).

### Deployment notes
- Deployed on Render at https://project-pulse-4qj1.onrender.com
- Health check endpoint: `GET /api` - returns API status and configuration
- CORS allows:
  - http://localhost:5173
  - http://127.0.0.1:5173
  - https://projectpulsedashboard.netlify.app

### Common issues
- `ModuleNotFoundError: backend`: run `uvicorn backend.main:app --reload` from repo root (not inside backend without package path).
- Port busy: use `--port 8001`.
- Virtualenv not active: ensure prompt shows `(.venv)` and re-run `pip install -r requirements.txt`.


