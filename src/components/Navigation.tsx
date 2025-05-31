
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Back/Home button */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-300"
          >
            {isHomePage ? (
              <Home size={20} />
            ) : (
              <ArrowLeft size={20} />
            )}
            <span className="font-light">
              {isHomePage ? 'Home' : 'Back'}
            </span>
          </Link>

          {/* Center - App Name */}
          <Link
            to="/"
            className="text-2xl font-thin text-white hover:text-yellow-300 transition-colors duration-300 tracking-wide"
          >
            Zen Reset
          </Link>

          {/* Right side - Placeholder for future features */}
          <div className="w-16"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
