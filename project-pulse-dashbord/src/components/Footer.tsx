import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Project Pulse</h2>
            <p className="text-gray-400 text-sm">Manage projects with ease.</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
              <li><Link to="/features" className="hover:text-orange-500">Features</Link></li>
              <li><Link to="/dashboard" className="hover:text-orange-500">Dashboard</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-semibold mb-3">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-500">GitHub</a>
              <a href="#" className="hover:text-orange-500">Twitter</a>
              <a href="#" className="hover:text-orange-500">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Project Pulse — All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
