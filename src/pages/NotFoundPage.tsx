import { Link } from 'react-router-dom';
import { Home, FileText } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 fade-in">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track to building your resume.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-secondary flex items-center justify-center">
            <Home size={16} className="mr-2" />
            Go Home
          </Link>
          <Link to="/builder" className="btn-primary flex items-center justify-center">
            <FileText size={16} className="mr-2" />
            Resume Builder
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;