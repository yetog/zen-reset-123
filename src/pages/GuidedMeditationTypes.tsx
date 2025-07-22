
import React, { useState } from 'react';
import { Brain, Star, Moon, Lightbulb, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ComingSoonModal from '@/components/ComingSoonModal';

const GuidedMeditationTypes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  const meditationTypes = [
    {
      title: 'Traditional',
      description: 'Classic guided meditation sessions with expert instructors',
      icon: Heart,
      gradient: 'from-purple-600 to-purple-800'
    },
    {
      title: 'Training & Mindfulness',
      description: 'Structured sessions to develop mindfulness skills',
      icon: Brain,
      gradient: 'from-indigo-600 to-purple-700'
    },
    {
      title: 'Cosmic',
      description: 'Connect with the universe and explore cosmic consciousness',
      icon: Star,
      gradient: 'from-purple-700 to-indigo-600'
    },
    {
      title: 'Lucid Dreaming',
      description: 'Guided sessions to enhance dream awareness and control',
      icon: Moon,
      gradient: 'from-indigo-700 to-purple-600'
    },
    {
      title: 'Next Level Thinking',
      description: 'Advanced meditation for enhanced cognitive abilities',
      icon: Lightbulb,
      gradient: 'from-purple-800 to-indigo-700'
    }
  ];

  const handleMeditationTypeClick = (title: string) => {
    setSelectedFeature(title);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <Navigation />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-thin text-white mb-4 tracking-wide">
            Choose Your Journey
          </h1>
          <p className="text-xl text-purple-200 font-light">
            Select the type of guided meditation that resonates with you
          </p>
        </div>

        {/* Meditation Type Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {meditationTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.title}
                onClick={() => handleMeditationTypeClick(type.title)}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 text-left"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/25">
                    <IconComponent size={24} className="text-purple-900" />
                  </div>
                  
                  <h2 className="text-xl font-light text-white mb-3">
                    {type.title}
                  </h2>
                  
                  <p className="text-purple-200 text-sm leading-relaxed mb-4">
                    {type.description}
                  </p>

                  <div className="inline-flex items-center px-3 py-1 bg-yellow-400/20 text-yellow-300 text-xs font-light rounded-full border border-yellow-400/30">
                    Coming Soon
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <ComingSoonModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          feature={selectedFeature}
        />
      </div>
    </div>
  );
};

export default GuidedMeditationTypes;
