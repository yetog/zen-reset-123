
import React from 'react';
import { Clock, Sparkles, LucideIcon } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';

interface ComingSoonMeditationProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

const ComingSoonMeditation = ({ title, description, icon: IconComponent, features }: ComingSoonMeditationProps) => {
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
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center shadow-lg shadow-yellow-400/25">
            <IconComponent size={40} className="text-purple-900" />
          </div>
          <h1 className="text-4xl md:text-5xl font-thin text-white mb-4 tracking-wide">
            {title}
          </h1>
          <p className="text-xl text-purple-200 font-light mb-8">
            {description}
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 max-w-2xl w-full text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center shadow-lg shadow-purple-400/25">
            <Clock size={48} className="text-white" />
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Sparkles size={24} className="text-yellow-400" />
            <h2 className="text-3xl font-light text-white">
              Coming Soon
            </h2>
            <Sparkles size={24} className="text-yellow-400" />
          </div>
          
          <p className="text-purple-200 text-lg leading-relaxed mb-8">
            We're developing an amazing {title.toLowerCase()} experience that will transform your meditation practice.
            Stay tuned for something truly special.
          </p>
          
          <div className="space-y-4 text-purple-300">
            {features.map((feature, index) => (
              <p key={index} className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>{feature}</span>
              </p>
            ))}
          </div>
          
          <div className="mt-10">
            <Link
              to="/meditate/guided"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 font-medium rounded-xl hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
            >
              Back to Meditation Types
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonMeditation;
