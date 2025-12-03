import { Link } from 'react-router-dom';

const FeaturesPage = () => {
  const features = [
    {
      title: 'Project Overview',
      description:
        'Get a comprehensive view of all your projects at a glance. See project statuses, track progress, and monitor key metrics in one centralized dashboard.',
      icon: (
        <svg
          className="w-12 h-12 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: 'Status Management',
      description:
        'Easily update project statuses with a simple dropdown. Track projects from "Not Started" to "In Progress" to "Completed" with real-time updates.',
      icon: (
        <svg
          className="w-12 h-12 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Quick Project Creation',
      description:
        'Add new projects instantly with a streamlined form. Include project name, description, and initial status to get started right away.',
      icon: (
        <svg
          className="w-12 h-12 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Project Pulse Features
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the powerful features that make project management simple and efficient.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="mb-4 sm:mb-6">{feature.icon}</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-black mb-2 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/dashboard"
            className="inline-block bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl uppercase tracking-wide"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
