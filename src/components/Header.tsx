import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Home, Layers, LayoutDashboard, Info, Github } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { atsScore } = useResume();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const headerClass = isScrolled
    ? 'sticky top-0 bg-white shadow-md z-50 transition-all duration-300'
    : 'sticky top-0 bg-transparent z-50 transition-all duration-300';

  const linkClass = 'flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 rounded-md transition-colors duration-200';
  const activeLinkClass = 'flex items-center px-4 py-2 text-blue-600 font-medium rounded-md bg-blue-50';

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={headerClass}>
      <div className="container-custom flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <FileText size={28} className="text-blue-600" />
          <span className="font-bold text-xl">ATS Resume</span>
          
          {location.pathname === '/builder' && (
            <div className="hidden md:flex items-center ml-6 bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium mr-2">ATS Score:</span>
              <span className={`text-sm font-bold ${
                atsScore >= 80 ? 'text-green-600' : 
                atsScore >= 60 ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {atsScore}/100
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={isActive('/') ? activeLinkClass : linkClass}>
            <Home size={18} className="mr-2" />
            <span>Home</span>
          </Link>
          <Link to="/builder" className={isActive('/builder') ? activeLinkClass : linkClass}>
            <FileText size={18} className="mr-2" />
            <span>Builder</span>
          </Link>
          <Link to="/templates" className={isActive('/templates') ? activeLinkClass : linkClass}>
            <Layers size={18} className="mr-2" />
            <span>Templates</span>
          </Link>
          <Link to="/dashboard" className={isActive('/dashboard') ? activeLinkClass : linkClass}>
            <LayoutDashboard size={18} className="mr-2" />
            <span>Dashboard</span>
          </Link>
          <Link to="/about" className={isActive('/about') ? activeLinkClass : linkClass}>
            <Info size={18} className="mr-2" />
            <span>About</span>
          </Link>
          
          <a 
            href="https://github.com/deepakkumar-m/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            aria-label="GitHub Repository"
          >
            <Github size={20} />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t py-4 px-6 space-y-3 shadow-lg">
          <Link to="/" className={isActive('/') ? activeLinkClass : linkClass}>
            <Home size={18} className="mr-2" />
            <span>Home</span>
          </Link>
          <Link to="/builder" className={isActive('/builder') ? activeLinkClass : linkClass}>
            <FileText size={18} className="mr-2" />
            <span>Builder</span>
          </Link>
          <Link to="/templates" className={isActive('/templates') ? activeLinkClass : linkClass}>
            <Layers size={18} className="mr-2" />
            <span>Templates</span>
          </Link>
          <Link to="/dashboard" className={isActive('/dashboard') ? activeLinkClass : linkClass}>
            <LayoutDashboard size={18} className="mr-2" />
            <span>Dashboard</span>
          </Link>
          <Link to="/about" className={isActive('/about') ? activeLinkClass : linkClass}>
            <Info size={18} className="mr-2" />
            <span>About</span>
          </Link>
          
          <div className="pt-2 border-t border-gray-200">
            <a 
              href="https://github.com/sauravhathi/atsresume" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 rounded-md transition-colors duration-200"
            >
              <Github size={18} className="mr-2" />
              <span>GitHub</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;