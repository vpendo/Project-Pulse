export type ProjectStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

