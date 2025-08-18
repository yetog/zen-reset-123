
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Waves, Unlock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';

const WaveFrequencySounds = () => {
  const [activeSound, setActiveSound] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [loadingStates, setLoadingStates] = useState<boolean[]>(new Array(6).fill(false));
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [showUnlockButton, setShowUnlockButton] = useState(true);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>(new Array(6).fill(null));
  const audioContextRef = useRef<AudioContext | null>(null);

  const frequencySounds = [
    {
      name: 'Theta Waves',
      frequency: '4-8 Hz',
      description: 'Deep meditation and creativity',
      color: 'from-blue-500 to-indigo-600',
      audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/Theta Waves (4-8 Hz) Deep meditation and creativity.mp3'
    },
    {
      name: 'Alpha Waves',
      frequency: '8-12 Hz',
      description: 'Relaxed awareness and calm focus',
      color: 'from-green-500 to-teal-600',
      audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/Alpha Waves (8-12 Hz) Relaxed awareness and calm focus.mp3'
    },
    {
      name: 'Delta Waves',
      frequency: '0.5-4 Hz',
      description: 'Deep sleep and healing',
      color: 'from-purple-500 to-violet-600',
      audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/Delta Waves (0.5-4 Hz) Deep sleep and healing.mp3'
    },
    {
      name: 'Gamma Waves',
      frequency: '30-100 Hz',
      description: 'Enhanced consciousness and insight',
      color: 'from-orange-500 to-red-600',
      audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/Gamma Waves (30-100 Hz) Enhanced consciousness and insight.mp3'
    },
    {
      name: 'Schumann Resonance',
      frequency: '7.83 Hz',
      description: 'Earth\'s natural frequency for grounding',
      color: 'from-emerald-500 to-green-600',
      audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/Earth Meditation - 7.83 Hz Binaural Beats - Schumann Resonance - Meditation Music.mp3'
    },
    {
      name: '528 Hz Love',
      frequency: '528 Hz',
      description: 'DNA repair and transformation',
      color: 'from-pink-500 to-rose-600',
      audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/528 Hz Love.mp3'
    }
  ];

  useEffect(() => {
    // Check if audio was previously unlocked
    const wasUnlocked = localStorage.getItem('audioUnlocked') === 'true';
    if (wasUnlocked) {
      setAudioUnlocked(true);
      setShowUnlockButton(false);
      initializeAudio();
    }

    // Cleanup
    return () => {
      audioRefs.current.forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const initializeAudio = () => {
    // Initialize audio elements only after user interaction
    frequencySounds.forEach((sound, index) => {
      if (!audioRefs.current[index]) {
        const audio = new Audio();
        audio.preload = 'none'; // Don't preload until after user interaction
        audio.crossOrigin = 'anonymous';
        
        audio.addEventListener('loadstart', () => {
          setLoadingStates(prev => {
            const newStates = [...prev];
            newStates[index] = true;
            return newStates;
          });
        });
        
        audio.addEventListener('canplay', () => {
          setLoadingStates(prev => {
            const newStates = [...prev];
            newStates[index] = false;
            return newStates;
          });
        });
        
        audio.addEventListener('ended', () => {
          setActiveSound(null);
        });
        
        audio.addEventListener('error', (e) => {
          setLoadingStates(prev => {
            const newStates = [...prev];
            newStates[index] = false;
            return newStates;
          });
          console.error('Audio error:', e);
          toast.error(`Failed to load ${sound.name}`);
        });
        
        // Set source after all event listeners are attached
        audio.src = sound.audioUrl;
        audioRefs.current[index] = audio;
      }
    });
  };

  const unlockAudio = async () => {
    try {
      // Create and play a silent audio to unlock the audio context
      const audio = new Audio();
      audio.volume = 0;
      
      // Try to create AudioContext if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Resume audio context if it's suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Play a silent audio to unlock
      const playPromise = audio.play();
      if (playPromise) {
        await playPromise;
        audio.pause();
        audio.currentTime = 0;
      }
      
      setAudioUnlocked(true);
      setShowUnlockButton(false);
      localStorage.setItem('audioUnlocked', 'true');
      
      // Initialize audio elements after unlock
      initializeAudio();
      
      toast.success('Audio unlocked! You can now play sounds.');
    } catch (error) {
      console.error('Failed to unlock audio:', error);
      toast.error('Failed to unlock audio. Please try again or check your browser settings.');
    }
  };

  useEffect(() => {
    // Handle mute state
    audioRefs.current.forEach(audio => {
      if (audio) {
        audio.muted = isMuted;
      }
    });
  }, [isMuted]);

  const handleSoundToggle = async (index: number) => {
    if (!audioUnlocked) {
      toast.error('Please unlock audio first by clicking the "Start Audio" button.');
      return;
    }

    const audio = audioRefs.current[index];
    if (!audio) return;

    if (activeSound === index) {
      // Pause current sound with fade out
      const fadeOut = () => {
        const fadeInterval = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume -= 0.1;
          } else {
            audio.volume = 0;
            audio.pause();
            audio.volume = 1; // Reset volume for next play
            clearInterval(fadeInterval);
          }
        }, 50);
      };
      
      fadeOut();
      setActiveSound(null);
      toast.success('Sound stopped');
    } else {
      // Stop any currently playing sound
      if (activeSound !== null && audioRefs.current[activeSound]) {
        audioRefs.current[activeSound]!.pause();
        audioRefs.current[activeSound]!.currentTime = 0;
        audioRefs.current[activeSound]!.volume = 1;
      }
      
      // Start new sound
      audio.currentTime = 0;
      audio.volume = 0;
      
      try {
        const playPromise = audio.play();
        
        if (playPromise) {
          await playPromise;
          
          // Fade in
          const fadeIn = () => {
            const fadeInterval = setInterval(() => {
              if (audio.volume < 0.9) {
                audio.volume += 0.1;
              } else {
                audio.volume = 1;
                clearInterval(fadeInterval);
              }
            }, 50);
          };
          
          fadeIn();
          setActiveSound(index);
          toast.success(`Playing ${frequencySounds[index].name}`);
        }
      } catch (error: any) {
        console.error('Playback error:', error);
        
        if (error.name === 'NotAllowedError') {
          toast.error('Playback not allowed. Please interact with the page first.');
          setAudioUnlocked(false);
          setShowUnlockButton(true);
          localStorage.removeItem('audioUnlocked');
        } else {
          toast.error(`Failed to play ${frequencySounds[index].name}. Try refreshing the page.`);
        }
      }
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

        {/* Audio Unlock Button */}
        {showUnlockButton && (
          <div className="flex flex-col items-center mb-8">
            <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-4 mb-4 max-w-md text-center">
              <p className="text-yellow-200 text-sm mb-2">
                🔒 Audio is locked by your browser's autoplay policy
              </p>
              <p className="text-yellow-300 text-xs">
                Click the button below to enable audio playback
              </p>
            </div>
            <button
              onClick={unlockAudio}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform duration-300 shadow-lg shadow-yellow-400/25"
            >
              <Unlock size={20} />
              Start Audio
            </button>
          </div>
        )}

        {/* Global Controls */}
        {audioUnlocked && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
        )}

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
                  disabled={loadingStates[index] || !audioUnlocked}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeSound === index
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 shadow-lg shadow-yellow-400/25'
                      : audioUnlocked 
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-white/5 text-white/50 cursor-not-allowed'
                  } ${(loadingStates[index] || !audioUnlocked) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loadingStates[index] ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : activeSound === index ? (
                    <Pause size={20} />
                  ) : (
                    <Play size={20} />
                  )}
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
          {audioUnlocked && (
            <p className="text-green-400 text-xs mt-2 flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Audio enabled
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaveFrequencySounds;
