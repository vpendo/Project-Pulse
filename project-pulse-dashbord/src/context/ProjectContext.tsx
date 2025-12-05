import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
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

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://project-pulse-4qj1.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

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
        const { data } = await api.get<{ items?: ApiProject[]; total?: number; page?: number }>(
          '/projects'
        );
        const list = Array.isArray(data) ? data : data.items ?? [];
        setProjects(list.map(mapApiProject));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const addProject = async (
    projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<void> => {
    try {
      const { data } = await api.post<ApiProject>('/projects', {
        name: projectData.name,
        description: projectData.description,
        status: projectData.status,
      });
      setProjects((prev) => [...prev, mapApiProject(data)]);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const updateProjectStatus = async (
    id: string,
    status: ProjectStatus
  ): Promise<void> => {
    try {
      const numericId = Number(id);
      const { data } = await api.put<ApiProject>(`/projects/${numericId}`, { status });

      setProjects((prev) =>
        prev.map((project) => (project.id === id ? mapApiProject(data) : project))
      );
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const updateProject = async (
    id: string,
    projectData: Partial<Project>
  ): Promise<void> => {
    try {
      const numericId = Number(id);
      const { data } = await api.put<ApiProject>(`/projects/${numericId}`, {
        name: projectData.name,
        description: projectData.description,
        status: projectData.status,
      });

      setProjects((prev) =>
        prev.map((project) => (project.id === id ? mapApiProject(data) : project))
      );
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (id: string): Promise<void> => {
    try {
      const numericId = Number(id);
      await api.delete(`/projects/${numericId}`);
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
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

