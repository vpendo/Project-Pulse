import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Project, ProjectStatus } from '../types/project';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProjectStatus: (id: string, status: ProjectStatus) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    // Initialize with some sample data for demo purposes
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      return JSON.parse(savedProjects);
    }
    return [
      {
        id: '1',
        name: 'Website Redesign',
        description: 'Complete redesign of the company website with modern UI/UX',
        status: 'In Progress' as ProjectStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Mobile App Development',
        description: 'Build a cross-platform mobile application',
        status: 'Not Started' as ProjectStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  });

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('projects', JSON.stringify(newProjects));
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
  };

  const updateProjectStatus = (id: string, status: ProjectStatus) => {
    const updatedProjects = projects.map((project) =>
      project.id === id
        ? { ...project, status, updatedAt: new Date().toISOString() }
        : project
    );
    saveProjects(updatedProjects);
  };

  const updateProject = (id: string, projectData: Partial<Project>) => {
    const updatedProjects = projects.map((project) =>
      project.id === id
        ? { ...project, ...projectData, updatedAt: new Date().toISOString() }
        : project
    );
    saveProjects(updatedProjects);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    saveProjects(updatedProjects);
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

