import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Brain, FileText, Waves, BookOpen, Heart } from 'lucide-react';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/meditate', icon: Brain, label: 'Meditate' },
    { path: '/reflect', icon: FileText, label: 'Reflect' },
    { path: '/breathwork', icon: Waves, label: 'Breathe' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;