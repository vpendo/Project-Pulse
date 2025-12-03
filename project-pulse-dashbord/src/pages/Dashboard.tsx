import { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import type { Project } from '../types/project';

const DashboardPage = () => {
  const { projects } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;
  const inProgressProjects = projects.filter((p) => p.status === 'In Progress').length;
  const notStartedProjects = projects.filter((p) => p.status === 'Not Started').length;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Project Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
          <p className="text-gray-600">Manage and track all your projects in one place.</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-100 rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-black">{totalProjects}</div>
            <div className="text-sm text-gray-600 mt-1">Total Projects</div>
          </div>
          <div className="bg-gray-100 rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-blue-500">{inProgressProjects}</div>
            <div className="text-sm text-gray-600 mt-1">In Progress</div>
          </div>
          <div className="bg-gray-100 rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-green-500">{completedProjects}</div>
            <div className="text-sm text-gray-600 mt-1">Completed</div>
          </div>
          <div className="bg-gray-100 rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-gray-600">{notStartedProjects}</div>
            <div className="text-sm text-gray-600 mt-1">Not Started</div>
          </div>
        </div>

        {/* Add Project Button */}
        <div className="mb-6">
          <button
            onClick={handleAddProject}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg flex items-center space-x-2 uppercase tracking-wide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add New Project</span>
          </button>
        </div>

        {/* Project List */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-black mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first project.</p>
            <button
              onClick={handleAddProject}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors uppercase tracking-wide"
            >
              Add Your First Project
            </button>
          </div>
        ) : (
          /* UPDATED TO 3 COLUMNS */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
              />
            ))}
          </div>
        )}

        {/* Project Modal */}
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={editingProject}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
