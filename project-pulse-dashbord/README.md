# Project Pulse – Frontend (Vite + React + TS + Tailwind)

Live app: https://projectpulsedashboard.netlify.app  
Backend API: https://project-pulse-4qj1.onrender.com

Modern, responsive project management UI with landing, features, and a CRUD dashboard wired to the FastAPI backend.

## Features
- Landing page with hero + CTA to Dashboard
- Features page highlighting three capabilities with icons
- Dashboard with summary stats, project list/cards, status chips and dropdown
- Add/Edit project modal with required name validation
- Update status inline; delete with confirmation
- Responsive design (mobile/desktop)

## Tech Stack
- React 19, TypeScript, Vite
- Tailwind CSS
- React Router DOM
- React Context for auth/projects
- axios for API calls to FastAPI

## Project Structure (key paths)
```
src/
├── components/      # Navbar, Footer, ProjectCard, ProjectModal, ProtectedRoute
├── context/         # AuthContext, ProjectContext (API integration)
├── pages/           # Homepage, Features, Dashboard, SignIn, SignUp
├── types/           # Type definitions
├── App.tsx          # Routes
└── main.tsx         # Entry
```

## Environment
Set the API base URL (defaults to local if not provided):
```
VITE_API_BASE_URL=https://project-pulse-4qj1.onrender.com
```

## Local Development
1) Install deps  
```
pnpm install
```
2) Run dev server  
```
pnpm dev
```
Open http://localhost:5173

## Build / Preview
```
pnpm build
pnpm preview
```

## Usage
- Home `/` → CTA to Dashboard
- Features `/features`
- Dashboard `/dashboard` (protected by lightweight local auth)
  - Add project, edit, change status, delete
  - Data persists via backend API; survives refresh

## Deployment Notes
- Netlify site is configured to call the Render backend via `VITE_API_BASE_URL`.
- Ensure env var is set in Netlify dashboard for production builds.
