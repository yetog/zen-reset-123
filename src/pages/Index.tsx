
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, PenTool } from 'lucide-react';

const Index = () => {
  const navigationCards = [
    {
      title: 'Meditate',
      description: 'Find your center with guided sessions, frequencies, and breathing exercises',
      icon: Brain,
      path: '/meditate',
      gradient: 'from-purple-600 to-purple-800'
    },
    {
      title: 'Learn',
      description: 'Discover meditation techniques and mindfulness practices step by step',
      icon: BookOpen,
      path: '/learn',
      gradient: 'from-indigo-600 to-purple-700'
    },
    {
      title: 'Reflect',
      description: 'Journal your thoughts and track your mindfulness journey',
      icon: PenTool,
      path: '/reflect',
      gradient: 'from-purple-700 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-thin text-white mb-4 tracking-wide">
            Zen Reset
          </h1>
          <p className="text-2xl text-purple-200 font-light mb-2">
            Your journey to inner peace
          </p>
          <p className="text-lg text-purple-300 font-light">
            Meditation • Learning • Reflection
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
          {navigationCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={card.title}
                to={card.path}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/25">
                    <IconComponent size={32} className="text-purple-900" />
                  </div>
                  
                  <h2 className="text-2xl font-light text-white mb-4">
                    {card.title}
                  </h2>
                  
                  <p className="text-purple-200 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-purple-300 text-sm font-light">
            Begin your transformation today
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
