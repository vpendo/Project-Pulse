import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Project, ProjectStatus } from '../types/project';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProjectStatus: (id: string, status: ProjectStatus) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

interface ApiProject {
  id: number;
  name: string;
  description: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

const mapApiProject = (apiProject: ApiProject): Project => ({
  id: apiProject.id.toString(),
  name: apiProject.name,
  description: apiProject.description ?? '',
  status: apiProject.status,
  createdAt: apiProject.created_at,
  updatedAt: apiProject.updated_at,
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Initial load from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        if (!response.ok) {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch projects from API');
          return;
        }
        const data: ApiProject[] = await response.json();
        setProjects(data.map(mapApiProject));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const addProject = async (
    projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectData.name,
          description: projectData.description,
          status: projectData.status,
        }),
      });

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error('Failed to create project');
        return;
      }

      const created: ApiProject = await response.json();
      setProjects((prev) => [...prev, mapApiProject(created)]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating project:', error);
    }
  };

  const updateProjectStatus = async (
    id: string,
    status: ProjectStatus
  ): Promise<void> => {
    try {
      const numericId = Number(id);
      const response = await fetch(`${API_BASE_URL}/projects/${numericId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error('Failed to update project status');
        return;
      }

      const updated: ApiProject = await response.json();
      setProjects((prev) =>
        prev.map((project) =>
          project.id === id ? mapApiProject(updated) : project
        )
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating project status:', error);
    }
  };

  const updateProject = async (
    id: string,
    projectData: Partial<Project>
  ): Promise<void> => {
    try {
      const numericId = Number(id);
      const response = await fetch(`${API_BASE_URL}/projects/${numericId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectData.name,
          description: projectData.description,
          status: projectData.status,
        }),
      });

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error('Failed to update project');
        return;
      }

      const updated: ApiProject = await response.json();
      setProjects((prev) =>
        prev.map((project) =>
          project.id === id ? mapApiProject(updated) : project
        )
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (id: string): Promise<void> => {
    try {
      const numericId = Number(id);
      const response = await fetch(`${API_BASE_URL}/projects/${numericId}`, {
        method: 'DELETE',
      });

      if (!response.ok && response.status !== 204) {
        // eslint-disable-next-line no-console
        console.error('Failed to delete project');
        return;
      }

      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error deleting project:', error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProjectStatus,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

