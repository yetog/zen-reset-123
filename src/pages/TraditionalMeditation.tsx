
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';

const GuidedMeditation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const guidedSessions = [
    {
      title: 'Morning Mindfulness',
      duration: '10 min',
      instructor: 'Sarah Chen',
      description: 'Start your day with focused awareness and intention'
    },
    {
      title: 'Deep Relaxation',
      duration: '15 min',
      instructor: 'Marcus Reid',
      description: 'Release tension and find profound rest'
    },
    {
      title: 'Anxiety Relief',
      duration: '12 min',
      instructor: 'Dr. Lisa Park',
      description: 'Calm your mind and soothe nervous energy'
    },
    {
      title: 'Sleep Preparation',
      duration: '20 min',
      instructor: 'Michael Stone',
      description: 'Gentle guidance into peaceful sleep'
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? 'Meditation paused' : 'Meditation started');
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev > 0 ? prev - 1 : guidedSessions.length - 1));
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev < guidedSessions.length - 1 ? prev + 1 : 0));
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
            Guided Meditation
          </h1>
          <p className="text-xl text-purple-200 font-light">
            Follow expert guidance to deepen your practice
          </p>
        </div>

        {/* Current Session Display */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-8 max-w-2xl w-full text-center">
          <h2 className="text-2xl font-light text-white mb-2">
            {guidedSessions[currentTrack].title}
          </h2>
          <p className="text-purple-200 mb-1">
            with {guidedSessions[currentTrack].instructor}
          </p>
          <p className="text-purple-300 text-sm mb-4">
            {guidedSessions[currentTrack].description}
          </p>
          <p className="text-yellow-300 font-light">
            {guidedSessions[currentTrack].duration}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6 mb-12">
          <button
            onClick={handlePrevious}
            className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={handlePlayPause}
            className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-purple-900 hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <SkipForward size={20} />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>

        {/* Session List */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl w-full">
          {guidedSessions.map((session, index) => (
            <button
              key={index}
              onClick={() => setCurrentTrack(index)}
              className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                index === currentTrack
                  ? 'bg-white/20 border-yellow-400/50 shadow-lg shadow-yellow-400/10'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <h3 className="text-white font-light mb-1">{session.title}</h3>
              <p className="text-purple-200 text-sm mb-1">{session.instructor}</p>
              <p className="text-yellow-300 text-xs">{session.duration}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidedMeditation;
