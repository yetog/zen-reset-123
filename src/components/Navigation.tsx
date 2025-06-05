
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Define logical parent routes
  const getParentRoute = (currentPath: string): string => {
    console.log('Getting parent route for:', currentPath);
    const pathSegments = currentPath.split('/').filter(Boolean);
    console.log('Path segments:', pathSegments);
    
    if (pathSegments.length <= 1) {
      return '/';
    }
    
    // Remove the last segment to get parent
    const parentSegments = pathSegments.slice(0, -1);
    const parentRoute = '/' + parentSegments.join('/');
    console.log('Calculated parent route:', parentRoute);
    return parentRoute;
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('=== BACK BUTTON CLICKED ===');
    console.log('Current pathname:', location.pathname);
    console.log('Is home page:', isHomePage);
    
    if (isHomePage) {
      console.log('On home page, not navigating');
      return;
    }
    
    const parentRoute = getParentRoute(location.pathname);
    console.log('Navigating to parent route:', parentRoute);
    
    try {
      navigate(parentRoute);
      console.log('Navigation successful');
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  console.log('Navigation component rendering. Current path:', location.pathname, 'Is home:', isHomePage);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Back/Home button */}
          {isHomePage ? (
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
            >
              <Home size={20} />
              <span className="font-light hidden sm:inline">Home</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleBackClick}
              className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 p-2 rounded-lg hover:bg-white/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
              <span className="font-light hidden sm:inline">Back</span>
            </button>
          )}

          {/* Center - App Name */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-thin text-white hover:text-yellow-300 transition-all duration-300 tracking-wide"
          >
            Zen Reset
          </Link>

          {/* Right side - Placeholder for future features */}
          <div className="w-16 sm:w-20"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
