
import React, { useState } from 'react';
import MeditationTimer from '@/components/MeditationTimer';
import DurationSelector from '@/components/DurationSelector';
import { toast } from 'sonner';

const Index = () => {
  const [selectedDuration, setSelectedDuration] = useState(600); // 10 minutes default

  const handleMeditationComplete = () => {
    toast.success('Meditation session complete! 🧘‍♀️', {
      description: 'Well done on completing your mindfulness practice.',
    });
  };

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
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-wide">
            Zen
          </h1>
          <p className="text-xl text-purple-200 font-light">
            Find your inner peace
          </p>
        </div>

        {/* Duration Selector */}
        <DurationSelector
          selectedDuration={selectedDuration}
          onDurationChange={setSelectedDuration}
        />

        {/* Meditation Timer */}
        <MeditationTimer
          duration={selectedDuration}
          onComplete={handleMeditationComplete}
        />

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-purple-300 text-sm font-light">
            Close your eyes, breathe deeply, and let go
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
