import type { Project, ProjectStatus } from '../types/project';
import { useProjects } from '../context/ProjectContext';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

const ProjectCard = ({ project, onEdit }: ProjectCardProps) => {
  const { updateProjectStatus, deleteProject } = useProjects();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateProjectStatus(project.id, e.target.value as ProjectStatus);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(project.id);
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100';
      case 'Completed':
        return 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100';
    }
  };

  const getStatusBadgeColor = (status: ProjectStatus) => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-100 text-gray-800 border border-gray-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'Completed':
        return 'bg-green-100 text-green-800 border border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 flex flex-col h-full">
      {/* Header with Project Name and Delete Button */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{project.name}</h3>
        </div>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50 flex-shrink-0"
          title="Delete project"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Description */}
      <div className="mb-5 flex-grow">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {project.description || (
            <span className="text-gray-400 italic">No description provided</span>
          )}
        </p>
      </div>

      {/* Status Section */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Status
        </label>
        <div className="space-y-3">
          <div className={`px-4 py-2 rounded-lg text-sm font-semibold text-center border-2 ${getStatusBadgeColor(project.status)}`}>
            {project.status}
          </div>
          <select
            value={project.status}
            onChange={handleStatusChange}
            className={`w-full px-4 py-2.5 border-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer ${getStatusColor(project.status)}`}
            title="Change project status"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-gray-200 mt-auto">
        <button
          onClick={() => onEdit(project)}
          className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-bold text-sm uppercase tracking-wide shadow-md hover:shadow-lg transform hover:scale-[1.02] duration-200"
        >
          Edit Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

