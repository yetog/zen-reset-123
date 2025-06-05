
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import PageTransition from './PageTransition';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Define logical parent routes
  const getParentRoute = (currentPath: string): string => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    if (pathSegments.length <= 1) {
      return '/';
    }
    
    // Remove the last segment to get parent
    const parentSegments = pathSegments.slice(0, -1);
    return '/' + parentSegments.join('/');
  };

  const handleBackClick = () => {
    console.log('Back button clicked!');
    console.log('Current pathname:', location.pathname);
    console.log('Is home page:', isHomePage);
    
    if (isHomePage) {
      console.log('On home page, not navigating');
      return;
    }
    
    const parentRoute = getParentRoute(location.pathname);
    console.log('Calculated parent route:', parentRoute);
    console.log('Navigating to:', parentRoute);
    navigate(parentRoute);
  };

  return (
    <PageTransition>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Back/Home button */}
            {isHomePage ? (
              <Link
                to="/"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
              >
                <Home size={20} />
                <span className="font-light hidden sm:inline">Home</span>
              </Link>
            ) : (
              <button
                onClick={handleBackClick}
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
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
    </PageTransition>
  );
};

export default Navigation;
