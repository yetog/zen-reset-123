
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, PenTool } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const Index = () => {
  const navigationCards = [
    {
      title: 'Meditate',
      icon: Brain,
      path: '/meditate',
    },
    {
      title: 'Learn',
      icon: BookOpen,
      path: '/learn',
    },
    {
      title: 'Reflect',
      icon: PenTool,
      path: '/reflect',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <PageTransition>
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-20">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-thin text-white mb-4 sm:mb-6 tracking-wide">
              Zen Reset
            </h1>
            <p className="text-lg sm:text-xl text-purple-200/70 font-light">
              Your journey to inner peace
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 max-w-2xl w-full justify-center">
            {navigationCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Link
                  key={card.title}
                  to={card.path}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 min-w-[140px] transform"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/20 transition-transform duration-300 group-hover:scale-110">
                      <IconComponent size={24} className="text-purple-900" />
                    </div>
                    
                    <h2 className="text-lg font-light text-white transition-colors duration-300 group-hover:text-yellow-300">
                      {card.title}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default Index;
