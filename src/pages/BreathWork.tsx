
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';

const BreathWork = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [seconds, setSeconds] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState(0);

  const breathPatterns = [
    {
      name: '4-7-8 Breathing',
      description: 'Calming technique for stress relief',
      inhale: 4,
      hold: 7,
      exhale: 8,
      rest: 0
    },
    {
      name: 'Box Breathing',
      description: 'Equal timing for balance and focus',
      inhale: 4,
      hold: 4,
      exhale: 4,
      rest: 4
    },
    {
      name: 'Triangle Breathing',
      description: 'Simple pattern for beginners',
      inhale: 4,
      hold: 4,
      exhale: 4,
      rest: 0
    },
    {
      name: 'Energizing Breath',
      description: 'Quick inhale, longer exhale for energy',
      inhale: 2,
      hold: 0,
      exhale: 6,
      rest: 0
    }
  ];

  const currentPattern = breathPatterns[selectedPattern];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const newSeconds = prev + 1;
          
          // Determine current phase based on pattern
          if (phase === 'inhale' && newSeconds >= currentPattern.inhale) {
            setPhase(currentPattern.hold > 0 ? 'hold' : 'exhale');
            return 0;
          } else if (phase === 'hold' && newSeconds >= currentPattern.hold) {
            setPhase('exhale');
            return 0;
          } else if (phase === 'exhale' && newSeconds >= currentPattern.exhale) {
            setPhase(currentPattern.rest > 0 ? 'rest' : 'inhale');
            return 0;
          } else if (phase === 'rest' && newSeconds >= currentPattern.rest) {
            setPhase('inhale');
            return 0;
          }
          
          return newSeconds;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase, currentPattern]);

  const handleStartPause = () => {
    setIsActive(!isActive);
    if (!isActive) {
      toast.success('Breath work started');
    } else {
      toast.success('Breath work paused');
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setSeconds(0);
    toast.success('Breath work reset');
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'rest':
        return 'Rest';
      default:
        return 'Breathe In';
    }
  };

  const getCircleScale = () => {
    const maxDuration = Math.max(
      currentPattern.inhale,
      currentPattern.hold,
      currentPattern.exhale,
      currentPattern.rest
    );
    const progress = seconds / maxDuration;
    
    if (phase === 'inhale') {
      return 1 + (progress * 0.5);
    } else if (phase === 'exhale') {
      return 1.5 - (progress * 0.5);
    }
    return phase === 'hold' ? 1.5 : 1;
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
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-thin text-white mb-4 tracking-wide">
            Breath Work
          </h1>
          <p className="text-xl text-purple-200 font-light">
            Guided breathing for relaxation and focus
          </p>
        </div>

        {/* Pattern Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-4xl w-full">
          {breathPatterns.map((pattern, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedPattern(index);
                handleReset();
              }}
              className={`p-3 rounded-xl text-sm transition-all duration-300 ${
                selectedPattern === index
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 shadow-lg shadow-yellow-400/25'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="font-light">{pattern.name}</div>
              <div className="text-xs opacity-75 mt-1">{pattern.description}</div>
            </button>
          ))}
        </div>

        {/* Breathing Circle */}
        <div className="relative mb-8">
          <div
            className="w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400/30 flex items-center justify-center transition-transform duration-1000 ease-in-out"
            style={{ transform: `scale(${getCircleScale()})` }}
          >
            <div className="text-center">
              <div className="text-2xl font-light text-white mb-2">
                {getPhaseInstruction()}
              </div>
              <div className="text-4xl font-thin text-yellow-300">
                {Math.max(0, (phase === 'inhale' ? currentPattern.inhale :
                               phase === 'hold' ? currentPattern.hold :
                               phase === 'exhale' ? currentPattern.exhale :
                               currentPattern.rest) - seconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6 mb-8">
          <button
            onClick={handleStartPause}
            className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-purple-900 hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
          >
            {isActive ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={handleReset}
            className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Current Pattern Info */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md w-full text-center">
          <h3 className="text-lg font-light text-white mb-2">
            {currentPattern.name}
          </h3>
          <p className="text-purple-200 text-sm mb-3">
            {currentPattern.description}
          </p>
          <div className="text-yellow-300 text-sm">
            Inhale {currentPattern.inhale}s
            {currentPattern.hold > 0 && ` • Hold ${currentPattern.hold}s`}
            • Exhale {currentPattern.exhale}s
            {currentPattern.rest > 0 && ` • Rest ${currentPattern.rest}s`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathWork;
