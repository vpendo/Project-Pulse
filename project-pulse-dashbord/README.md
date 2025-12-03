# Project Pulse - Frontend

A modern, responsive project management dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- **Landing Page**: Compelling hero section with value proposition and call-to-action
- **Features Page**: Showcase of three main features with icons and descriptions
- **Dashboard**: Complete project management interface with:
  - Project overview with summary statistics
  - Project list with cards showing name, description, and status
  - Add new project functionality with form validation
  - Edit existing projects
  - Update project status via dropdown
  - Delete projects with confirmation
  - Responsive design for mobile and desktop

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Context API** - State management (with localStorage persistence)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Main navigation bar
│   ├── ProjectCard.tsx  # Project card component
│   └── ProjectModal.tsx # Add/Edit project modal
├── context/             # React context providers
│   └── ProjectContext.tsx # Project state management
├── pages/               # Page components
│   ├── LandingPage.tsx  # Home/Landing page
│   ├── FeaturesPage.tsx # Features showcase page
│   └── DashboardPage.tsx # Main dashboard page
├── types/               # TypeScript type definitions
│   └── project.ts       # Project-related types
├── App.tsx              # Main app component with routing
└── main.tsx             # App entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
pnpm preview
```

## Usage

### Navigation

- **Home (/)** - Landing page with hero section and value proposition
- **Features (/features)** - Features showcase page
- **Dashboard (/dashboard)** - Main project management interface

### Managing Projects

1. **Add a Project**: Click the "Add New Project" button on the dashboard
2. **Edit a Project**: Click the "Edit" button on any project card
3. **Update Status**: Use the dropdown selector on any project card
4. **Delete a Project**: Click the delete icon (trash) on any project card

### Data Persistence

Projects are stored in the browser's localStorage, so your data persists across sessions. When you're ready to connect to a backend API, you can update the `ProjectContext.tsx` file to make API calls instead of using localStorage.

## Technical Choices

- **React Context API**: Chosen for simplicity and to avoid external dependencies. For larger applications, consider Zustand or Redux Toolkit.
- **LocalStorage**: Used for data persistence in the frontend-only version. This will be replaced with API calls when the backend is integrated.
- **Tailwind CSS**: Provides rapid UI development with utility classes and excellent responsive design support.
- **TypeScript**: Ensures type safety and better developer experience.

## Future Enhancements

When integrating with the backend:

1. Replace localStorage with API calls in `ProjectContext.tsx`
2. Add loading states and error handling
3. Implement authentication if required
4. Add optimistic updates for better UX
5. Implement real-time updates with WebSockets (optional)

## Development

### Linting

```bash
pnpm lint
```

### Type Checking

TypeScript type checking is performed during the build process. For development, your IDE should provide real-time type checking.

## License

See the LICENSE file in the root directory.
