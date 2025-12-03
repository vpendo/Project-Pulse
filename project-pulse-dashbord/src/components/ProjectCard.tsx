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
        return 'bg-gray-100 text-gray-400';
      case 'In Progress':
        return 'bg-blue-50 text-blue-500';
      case 'Completed':
        return 'bg-green-50 text-green-500';
      default:
        return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
        </div>
        <button
          onClick={handleDelete}
          className="ml-4 text-red-600 hover:text-red-800 transition-colors"
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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <select
            value={project.status}
            onChange={handleStatusChange}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent max-w-full"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          onClick={() => onEdit(project)}
          className="self-start sm:self-auto px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium uppercase tracking-wide"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

