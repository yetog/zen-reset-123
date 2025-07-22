
import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, CheckCircle, Play } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  completed: boolean;
}

const Learn = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    // Load completed lessons from localStorage
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to Mindfulness',
      duration: '5 min',
      category: 'basics',
      description: 'Learn the fundamentals of mindfulness and how it can transform your daily life.',
      completed: false
    },
    {
      id: '2',
      title: 'Breathing Techniques',
      duration: '5 min',
      category: 'breathing',
      description: 'Master the art of conscious breathing for relaxation and focus.',
      completed: false
    },
    {
      id: '3',
      title: 'Body Scan Meditation',
      duration: '5 min',
      category: 'meditation',
      description: 'Learn to connect with your body through progressive awareness.',
      completed: false
    },
    {
      id: '4',
      title: 'Managing Stress',
      duration: '5 min',
      category: 'wellness',
      description: 'Practical techniques for reducing stress in everyday situations.',
      completed: false
    },
    {
      id: '5',
      title: 'Loving-Kindness Meditation',
      duration: '5 min',
      category: 'meditation',
      description: 'Cultivate compassion and positive emotions through this ancient practice.',
      completed: false
    },
    {
      id: '6',
      title: 'Mindful Walking',
      duration: '5 min',
      category: 'movement',
      description: 'Transform your daily walks into mindful movement practices.',
      completed: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Lessons' },
    { id: 'basics', name: 'Basics' },
    { id: 'breathing', name: 'Breathing' },
    { id: 'meditation', name: 'Meditation' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'movement', name: 'Movement' }
  ];

  const filteredLessons = selectedCategory === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const completedCount = completedLessons.length;
  const totalLessons = lessons.length;
  const progressPercentage = (completedCount / totalLessons) * 100;


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navigation />

      <div className="relative z-10 min-h-screen p-6 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-wide">
            Learn
          </h1>
          <p className="text-xl text-emerald-200 font-light">
            5-minute lessons for mindful living
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Progress Section */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-light text-white">Your Progress</h2>
              <span className="text-emerald-200">{completedCount}/{totalLessons} lessons completed</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-teal-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              
              return (
                <div
                  key={lesson.id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen size={20} className="text-emerald-300" />
                      <span className="text-emerald-200 text-sm flex items-center">
                        <Clock size={14} className="mr-1" />
                        {lesson.duration}
                      </span>
                    </div>
                    {isCompleted && (
                      <CheckCircle size={20} className="text-emerald-400" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-medium text-white mb-3">
                    {lesson.title}
                  </h3>
                  
                  <p className="text-emerald-100 text-sm mb-6 leading-relaxed">
                    {lesson.description}
                  </p>
                  
                  <Link
                    to={`/learn/lesson/${lesson.id}`}
                    className={`w-full py-2 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-900 hover:scale-105'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle size={16} />
                        <span>Review Lesson</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        <span>Start Lesson</span>
                      </>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
