
import React, { useState } from 'react';
import { ArrowLeft, Plus, Calendar, Search } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Reflect = () => {
  const [reflections] = useState([
    {
      id: 1,
      date: '2024-01-15',
      title: 'Morning Meditation Insights',
      preview: 'Today I noticed how my mind kept wandering to work tasks during meditation...',
      fullText: 'Today I noticed how my mind kept wandering to work tasks during meditation. Instead of fighting these thoughts, I practiced observing them with curiosity and gently returning to my breath. This experience taught me that meditation isn\'t about having a clear mind, but about noticing when the mind wanders and kindly bringing it back.'
    },
    {
      id: 2,
      date: '2024-01-12',
      title: 'Evening Gratitude Practice',
      preview: 'Three things I\'m grateful for today: the warm sunshine, my friend\'s call...',
      fullText: 'Three things I\'m grateful for today: the warm sunshine that came through my window during lunch, my friend\'s unexpected call that brightened my afternoon, and the peaceful feeling I had during tonight\'s meditation. I\'m starting to see how gratitude practice is shifting my daily perspective.'
    },
    {
      id: 3,
      date: '2024-01-10',
      title: 'Breathing Exercise Reflection',
      preview: 'The 4-7-8 breathing technique really helped me calm down before the meeting...',
      fullText: 'The 4-7-8 breathing technique really helped me calm down before the important meeting today. I could feel my nervous energy transforming into focused calm. It\'s amazing how such a simple practice can have such immediate effects on both my body and mind.'
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-6 pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-wide">
            Reflect
          </h1>
          <p className="text-xl text-purple-200 font-light">
            Journal your mindfulness journey
          </p>
        </div>

        {/* Actions Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 px-6 py-3 rounded-full font-medium hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 shadow-lg shadow-yellow-400/25">
              <Plus size={20} />
              <span>New Reflection</span>
            </button>
            
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <Search size={20} className="text-purple-300" />
              <input
                type="text"
                placeholder="Search reflections..."
                className="bg-transparent text-white placeholder-purple-300 outline-none flex-1 min-w-0"
              />
            </div>
          </div>
        </div>

        {/* Reflections List */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {reflections.map((reflection) => (
              <div
                key={reflection.id}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-light text-white group-hover:text-yellow-300 transition-colors">
                    {reflection.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-purple-300">
                    <Calendar size={16} />
                    <span className="text-sm">
                      {new Date(reflection.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                <p className="text-purple-200 leading-relaxed">
                  {reflection.preview}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reflect;
