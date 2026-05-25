import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import MeditationAudioPlayer from '@/components/MeditationAudioPlayer';
import { getLesson, markLessonComplete, isLessonComplete, meditationLessons } from '@/data/meditationLessons';
import { toast } from 'sonner';

const MeditationLessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const lesson = id ? getLesson(id) : undefined;

  useEffect(() => {
    if (id) {
      setCompleted(isLessonComplete(id));
    }
  }, [id]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Lesson not found</h1>
          <button
            onClick={() => navigate('/meditate/guided/training')}
            className="text-yellow-400 hover:text-yellow-300"
          >
            Return to Training
          </button>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    markLessonComplete(lesson.id);
    setCompleted(true);
    toast.success('Meditation complete! Great work.');
  };

  const handleMarkComplete = () => {
    if (!completed) {
      handleComplete();
    }
  };

  // Find next lesson
  const currentIndex = meditationLessons.findIndex(l => l.id === lesson.id);
  const nextLesson = currentIndex < meditationLessons.length - 1 ? meditationLessons[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navigation />

      <div className="relative z-10 min-h-screen p-6 pt-24">
        {/* Back Button */}
        <button
          onClick={() => navigate('/meditate/guided/training')}
          className="flex items-center gap-2 text-purple-200 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Training</span>
        </button>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className={`w-8 h-8 rounded-full bg-gradient-to-r ${lesson.color} flex items-center justify-center text-white text-sm font-medium`}>
                {lesson.day}
              </span>
              <span className="text-purple-300 text-sm">Day {lesson.day} of 10</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-thin text-white mb-4 tracking-wide">
              {lesson.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-purple-200">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{lesson.duration}</span>
              </div>
              {completed && (
                <div className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 size={16} />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>

          {/* Audio Player */}
          <div className="mb-8">
            <MeditationAudioPlayer
              audioUrl={lesson.audioUrl}
              title={lesson.title}
              onComplete={handleComplete}
            />
          </div>

          {/* Description */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-light text-white mb-3">About This Session</h2>
            <p className="text-purple-200 font-light leading-relaxed">
              {lesson.longDescription}
            </p>
          </div>

          {/* Key Topics */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-light text-white mb-4">What You'll Practice</h2>
            <div className="space-y-3">
              {lesson.keyTopics.map((topic, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Sparkles size={16} className="text-yellow-400" />
                  <span className="text-purple-200 font-light">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mark Complete / Continue */}
          <div className="flex flex-col gap-4">
            {!completed && (
              <button
                onClick={handleMarkComplete}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 rounded-2xl font-medium hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={20} />
                Mark as Complete
              </button>
            )}

            {nextLesson && (
              <button
                onClick={() => navigate(`/meditate/guided/training/${nextLesson.id}`)}
                className="w-full py-4 bg-white/10 text-white rounded-2xl font-light hover:bg-white/20 transition-all duration-300"
              >
                Continue to Day {nextLesson.day}: {nextLesson.title}
              </button>
            )}

            {!nextLesson && completed && (
              <div className="text-center p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <h3 className="text-emerald-400 text-xl mb-2">Journey Complete!</h3>
                <p className="text-purple-200 font-light">
                  You've completed all 10 days of meditation training. Continue practicing to deepen your skills.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationLessonDetail;
