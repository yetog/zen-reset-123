import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Clock, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { meditationLessons, getCompletedLessons, MeditationLesson } from '@/data/meditationLessons';

const TrainingMeditation = () => {
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    setCompletedLessons(getCompletedLessons());
  }, []);

  const progress = (completedLessons.length / meditationLessons.length) * 100;

  const handleLessonClick = (lesson: MeditationLesson) => {
    navigate(`/meditate/guided/training/${lesson.id}`);
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

      <div className="relative z-10 min-h-screen p-6 pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/25">
            <Brain size={40} className="text-purple-900" />
          </div>
          <h1 className="text-4xl md:text-5xl font-thin text-white mb-4 tracking-wide">
            10-Day Training Journey
          </h1>
          <p className="text-xl text-purple-200 font-light max-w-2xl mx-auto">
            Progressive skill-building exercises to develop mindfulness and meditation mastery
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-200 text-sm">Your Progress</span>
            <span className="text-yellow-400 text-sm font-medium">
              {completedLessons.length} / {meditationLessons.length} Complete
            </span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Lesson Grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {meditationLessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => handleLessonClick(lesson)}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${lesson.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Day Number */}
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${lesson.color} flex items-center justify-center text-white font-medium shadow-lg`}>
                        {lesson.day}
                      </div>

                      {/* Title & Duration */}
                      <div>
                        <h3 className="text-lg font-light text-white">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-1 text-purple-300 text-sm">
                          <Clock size={14} />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Completion Status */}
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 size={24} className="text-emerald-400" />
                      ) : (
                        <Circle size={24} className="text-white/30" />
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-purple-200 text-sm font-light mb-4">
                    {lesson.description}
                  </p>

                  {/* Key Topics Preview */}
                  <div className="flex flex-wrap gap-2">
                    {lesson.keyTopics.slice(0, 2).map((topic, index) => (
                      <span
                        key={index}
                        className="text-xs text-purple-300 bg-white/5 px-2 py-1 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                    {lesson.keyTopics.length > 2 && (
                      <span className="text-xs text-purple-400">
                        +{lesson.keyTopics.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-purple-300 text-sm">
            <Sparkles size={16} className="text-yellow-400" />
            <span>Practice daily for best results</span>
            <Sparkles size={16} className="text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingMeditation;
