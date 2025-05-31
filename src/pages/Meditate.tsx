
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Waves, Volume2, Wind } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Meditate = () => {
  const meditationTypes = [
    {
      title: 'Guided Meditation',
      description: 'Follow along with expert-led meditation sessions',
      icon: Play,
      path: '/meditate/guided',
      gradient: 'from-purple-600 to-purple-800'
    },
    {
      title: 'Wave Frequency Sounds',
      description: 'Immerse yourself in healing sound frequencies',
      icon: Waves,
      path: '/meditate/sounds',
      gradient: 'from-indigo-600 to-purple-700'
    },
    {
      title: 'Silent Meditation',
      description: 'Practice mindfulness with our meditation timer',
      icon: Volume2,
      path: '/meditate/silent',
      gradient: 'from-purple-700 to-indigo-600'
    },
    {
      title: 'Breath Work',
      description: 'Guided breathing exercises for relaxation and focus',
      icon: Wind,
      path: '/meditate/breathwork',
      gradient: 'from-indigo-700 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-wide">
            Meditate
          </h1>
          <p className="text-xl text-purple-200 font-light">
            Choose your meditation practice
          </p>
        </div>

        {/* Meditation Type Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          {meditationTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Link
                key={type.title}
                to={type.path}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/25">
                    <IconComponent size={32} className="text-purple-900" />
                  </div>
                  
                  <h2 className="text-2xl font-light text-white mb-4">
                    {type.title}
                  </h2>
                  
                  <p className="text-purple-200 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Meditate;
