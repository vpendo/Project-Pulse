## Project Pulse – FastAPI Backend

This is the **FastAPI + SQLite** backend for the Project Pulse dashboard. It exposes a simple REST API for managing projects and is designed to be consumed by the existing React + TypeScript + Vite frontend.

### Tech Stack

- **FastAPI** – web framework
- **SQLite** – database
- **SQLAlchemy 2.x** – ORM
- **Pydantic v2** – request/response schemas and validation

### Prerequisites

Before you begin, make sure you have:

- **Python 3.11 or higher** installed on your system
- **pip** (Python package manager) – usually comes with Python
- **Git** (optional, for cloning the repository)

### Step-by-Step Setup & Installation

#### Step 1: Navigate to Project Root

Open your terminal/command prompt and navigate to the `Project-Pulse` directory:

```bash
cd "C:/Users/pendo/OneDrive/Desktop/Agri Connect/Project-Pulse"
```

**Note:** Adjust the path based on your actual project location.

#### Step 2: Create Virtual Environment

Create a Python virtual environment to isolate dependencies:

**Windows (PowerShell/CMD):**
```bash
cd backend
python -m venv .venv
```

**Windows (Git Bash):**
```bash
cd backend
python -m venv .venv
```

**macOS/Linux:**
```bash
cd backend
python3 -m venv .venv
```

#### Step 3: Activate Virtual Environment

Activate the virtual environment:

**Windows (PowerShell):**
```powershell
.venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
.venv\Scripts\activate.bat
```

**Windows (Git Bash):**
```bash
source .venv/Scripts/activate
```

**macOS/Linux:**
```bash
source .venv/bin/activate
```

**✅ Success indicator:** Your terminal prompt should show `(.venv)` at the beginning.

#### Step 4: Install Dependencies

Install all required Python packages:

```bash
pip install -r requirements.txt
```

**Expected output:** You should see packages being installed:
```
Collecting fastapi==0.115.5
Collecting uvicorn[standard]==0.32.1
Collecting SQLAlchemy==2.0.36
...
Successfully installed fastapi-0.115.5 uvicorn-0.32.1 ...
```

**If you encounter errors:**
- Make sure your virtual environment is activated
- Try upgrading pip: `python -m pip install --upgrade pip`
- On Windows, you might need: `python -m pip install -r requirements.txt`

#### Step 5: Navigate Back to Project Root

Go back to the `Project-Pulse` root directory (one level up):

```bash
cd ..
```

You should now be in: `Project-Pulse/` (not `Project-Pulse/backend/`)

#### Step 6: Run the Backend Server

Start the FastAPI development server:

```bash
uvicorn backend.main:app --reload
```

**Important:** Run this command from the `Project-Pulse` root directory, NOT from inside the `backend` folder.

**✅ Success indicator:** You should see:
```
INFO:     Will watch for changes in these directories: ['...\\Project-Pulse\\backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx] using StatReload
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Verify Installation

#### Test 1: Root Endpoint

Open your browser and visit:
```
http://127.0.0.1:8000/
```

You should see:
```json
{"message": "Welcome to Project Pulse API"}
```

#### Test 2: Interactive API Documentation

Visit the Swagger UI:
```
http://127.0.0.1:8000/docs
```

You should see an interactive API documentation page where you can test all endpoints.

#### Test 3: Health Check (if available)

Visit:
```
http://127.0.0.1:8000/projects/
```

You should see an empty list `[]` (or a list of projects if any exist).

### Database

- **Database file:** `project_pulse.db` (SQLite database)
- **Location:** Created automatically in the `backend` directory
- **Tables:** Created automatically on first server startup via `Base.metadata.create_all(...)`
- **No manual setup required:** The database and tables are created automatically when you run the server for the first time.

### Common Commands

**Start the server:**
```bash
uvicorn backend.main:app --reload
```

**Stop the server:**
Press `Ctrl + C` in the terminal

**Deactivate virtual environment:**
```bash
deactivate
```

**Reinstall dependencies (if needed):**
```bash
pip install -r requirements.txt --force-reinstall
```

### Troubleshooting

#### Problem: `ModuleNotFoundError: No module named 'backend'`

**Solution:** Make sure you're running the command from the `Project-Pulse` root directory, not from inside the `backend` folder.

```bash
# ✅ Correct (from Project-Pulse root):
uvicorn backend.main:app --reload

# ❌ Wrong (from backend folder):
uvicorn main:app --reload
```

#### Problem: `ImportError: attempted relative import with no known parent package`

**Solution:** Run the server from the project root using the package path:
```bash
cd "C:/Users/pendo/OneDrive/Desktop/Agri Connect/Project-Pulse"
uvicorn backend.main:app --reload
```

#### Problem: `'uvicorn' is not recognized as an internal or external command`

**Solution:** 
1. Make sure your virtual environment is activated (you should see `(.venv)` in your prompt)
2. Reinstall dependencies: `pip install -r requirements.txt`

#### Problem: Port 8000 already in use

**Solution:** Either:
- Stop the other process using port 8000, or
- Run on a different port: `uvicorn backend.main:app --reload --port 8001`

#### Problem: Database file not created

**Solution:** The database is created automatically on first run. If it doesn't appear:
1. Check that you have write permissions in the `backend` directory
2. Look for `project_pulse.db` in the `backend` folder after starting the server

### API Overview

**🔓 All endpoints are public** - No authentication or JWT tokens required. You can access all endpoints directly.

All responses and requests use JSON. The main resource is **Project**.

**Available Endpoints:**

- **GET `/projects/`** – List all projects (with pagination, filtering, and sorting)
  - Query params: `page`, `page_size`, `name`, `status`, `sort_by`
- **GET `/projects/{id}`** – Get a single project by ID
- **POST `/projects/`** – Create a new project
- **PUT `/projects/{id}`** – Update an existing project
- **DELETE `/projects/{id}`** – Delete a project
- **GET `/projects/statuses`** – Get all available project statuses
- **GET `/projects/stats`** – Get project statistics

**Example API Calls:**

```bash
# List all projects
curl http://127.0.0.1:8000/projects/

# Create a project
curl -X POST http://127.0.0.1:8000/projects/ \
  -H "Content-Type: application/json" \
  -d '{"name": "My Project", "description": "Test project", "status": "Not Started"}'

# Get a project by ID
curl http://127.0.0.1:8000/projects/1

# Update a project
curl -X PUT http://127.0.0.1:8000/projects/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'

# Delete a project
curl -X DELETE http://127.0.0.1:8000/projects/1
```

Project fields:

- `id` – integer (auto-generated)
- `name` – string, required
- `description` – string, optional
- `status` – one of `"Not Started" | "In Progress" | "Completed"`
- `created_at` – ISO datetime
- `updated_at` – ISO datetime

### Frontend Integration Notes

- The FastAPI app has CORS configured to allow the Vite dev server:
  - `http://localhost:5173`
  - `http://127.0.0.1:5173`
- To integrate, update the React `ProjectContext` to:
  - `GET /projects` on load,
  - `POST /projects` when adding,
  - `PUT /projects/{id}` when editing or changing status,
  - `DELETE /projects/{id}` when removing a project.


