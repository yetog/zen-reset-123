
import React from 'react';
import { Book, Clock, CheckCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Learn = () => {
  const lessons = [
    {
      id: 1,
      title: 'Introduction to Mindfulness',
      duration: '5 min',
      description: 'Learn the fundamentals of mindful awareness and present-moment attention',
      completed: true
    },
    {
      id: 2,
      title: 'Breathing Techniques',
      duration: '5 min',
      description: 'Master basic breathing patterns that form the foundation of meditation',
      completed: true
    },
    {
      id: 3,
      title: 'Body Scan Meditation',
      duration: '5 min',
      description: 'Develop awareness of physical sensations and learn to relax deeply',
      completed: false
    },
    {
      id: 4,
      title: 'Loving-Kindness Practice',
      duration: '5 min',
      description: 'Cultivate compassion and positive emotions toward yourself and others',
      completed: false
    },
    {
      id: 5,
      title: 'Dealing with Difficult Emotions',
      duration: '5 min',
      description: 'Learn healthy ways to observe and work with challenging feelings',
      completed: false
    },
    {
      id: 6,
      title: 'Walking Meditation',
      duration: '5 min',
      description: 'Bring mindfulness into movement and daily activities',
      completed: false
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
      <div className="relative z-10 min-h-screen p-6 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-wide">
            Learn
          </h1>
          <p className="text-xl text-purple-200 font-light">
            Master meditation one lesson at a time
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/25 flex-shrink-0">
                      <Book size={24} className="text-purple-900" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-light text-white">
                          {lesson.title}
                        </h3>
                        {lesson.completed && (
                          <CheckCircle size={20} className="text-green-400" />
                        )}
                      </div>
                      
                      <p className="text-purple-200 leading-relaxed mb-3">
                        {lesson.description}
                      </p>
                      
                      <div className="flex items-center space-x-2 text-purple-300">
                        <Clock size={16} />
                        <span className="text-sm">{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-2xl font-light text-purple-300">
                      {lesson.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
