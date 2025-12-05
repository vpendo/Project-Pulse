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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Overview Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  Welcome to Your Dashboard
                </h1>
                <p className="text-gray-600 text-lg md:text-xl">
                  Manage and track all your projects in one place.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={handleAddProject}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-3 uppercase tracking-wide transform hover:scale-105 duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Add New Project</span>
                </button>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Total Projects
                  </p>
                  <p className="text-4xl font-bold text-gray-900">{totalProjects}</p>
                </div>
                <div className="bg-gray-100 rounded-full p-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    In Progress
                  </p>
                  <p className="text-4xl font-bold text-blue-600">{inProgressProjects}</p>
                </div>
                <div className="bg-blue-100 rounded-full p-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Completed
                  </p>
                  <p className="text-4xl font-bold text-green-600">{completedProjects}</p>
                </div>
                <div className="bg-green-100 rounded-full p-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Not Started
                  </p>
                  <p className="text-4xl font-bold text-gray-600">{notStartedProjects}</p>
                </div>
                <div className="bg-gray-100 rounded-full p-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project List Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Project List</h2>
        </div>

        {/* Project List */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
            <div className="max-w-md mx-auto">
              <svg
                className="w-24 h-24 text-gray-300 mx-auto mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">No projects yet</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Get started by adding your first project to begin tracking your progress.
              </p>
              <button
                onClick={handleAddProject}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl uppercase tracking-wide transform hover:scale-105 duration-200"
              >
                Add Your First Project
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
