
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Waves } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';

const WaveFrequencySounds = () => {
  const [activeSound, setActiveSound] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const frequencySounds = [
    {
      name: 'Theta Waves',
      frequency: '4-8 Hz',
      description: 'Deep meditation and creativity',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Alpha Waves',
      frequency: '8-12 Hz',
      description: 'Relaxed awareness and calm focus',
      color: 'from-green-500 to-teal-600'
    },
    {
      name: 'Delta Waves',
      frequency: '0.5-4 Hz',
      description: 'Deep sleep and healing',
      color: 'from-purple-500 to-violet-600'
    },
    {
      name: 'Gamma Waves',
      frequency: '30-100 Hz',
      description: 'Enhanced consciousness and insight',
      color: 'from-orange-500 to-red-600'
    },
    {
      name: 'Schumann Resonance',
      frequency: '7.83 Hz',
      description: 'Earth\'s natural frequency for grounding',
      color: 'from-emerald-500 to-green-600'
    },
    {
      name: '528 Hz Love',
      frequency: '528 Hz',
      description: 'DNA repair and transformation',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const handleSoundToggle = (index: number) => {
    if (activeSound === index) {
      setActiveSound(null);
      toast.success('Sound stopped');
    } else {
      setActiveSound(index);
      toast.success(`Playing ${frequencySounds[index].name}`);
    }
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-thin text-white mb-4 tracking-wide">
            Wave Frequency Sounds
          </h1>
          <p className="text-xl text-purple-200 font-light">
            Immerse yourself in healing sound frequencies
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>

        {/* Frequency Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {frequencySounds.map((sound, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${sound.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/25">
                  <Waves size={32} className="text-purple-900" />
                </div>
                
                <h3 className="text-xl font-light text-white mb-2">
                  {sound.name}
                </h3>
                
                <p className="text-yellow-300 font-light mb-3">
                  {sound.frequency}
                </p>
                
                <p className="text-purple-200 text-sm mb-6 leading-relaxed">
                  {sound.description}
                </p>
                
                <button
                  onClick={() => handleSoundToggle(index)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeSound === index
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 shadow-lg shadow-yellow-400/25'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {activeSound === index ? <Pause size={20} /> : <Play size={20} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-purple-300 text-sm font-light">
            Use headphones for the best frequency experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaveFrequencySounds;
