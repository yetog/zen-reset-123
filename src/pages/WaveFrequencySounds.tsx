import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';

const WaveFrequencySounds = () => {
  const [activeSound, setActiveSound] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'working' | 'failed'>('unknown');
  
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioUnlockRef = useRef(false);

  const unlockAudio = async () => {
    if (audioUnlockRef.current) return Promise.resolve();
    
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx && !audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }
      
      audioUnlockRef.current = true;
    } catch (error) {
      console.warn('Audio context unlock failed:', error);
    }
  };

  const frequencySounds = [
    {
      name: 'Theta Waves',
      frequency: '4-8 Hz',
      description: 'Deep meditation and creativity',
      color: 'from-blue-500 to-indigo-600',
      audioUrl: '/zen-reset/audio/Theta%20Waves%20(4-8%20Hz)%20Deep%20meditation%20and%20creativity.mp3'
    },
    {
      name: 'Alpha Waves',
      frequency: '8-12 Hz',
      description: 'Relaxed awareness and calm focus',
      color: 'from-green-500 to-teal-600',
      audioUrl: '/zen-reset/audio/Alpha%20Waves%20(8-12%20Hz)%20Relaxed%20awareness%20and%20calm%20focus.mp3'
    },
    {
      name: 'Delta Waves',
      frequency: '0.5-4 Hz',
      description: 'Deep sleep and healing',
      color: 'from-purple-500 to-violet-600',
      audioUrl: '/zen-reset/audio/Delta%20Waves%20(0.5-4%20Hz)%20Deep%20sleep%20and%20healing.mp3'
    },
    {
      name: 'Gamma Waves',
      frequency: '30-100 Hz',
      description: 'Enhanced consciousness and insight',
      color: 'from-orange-500 to-red-600',
      audioUrl: '/zen-reset/audio/Gamma%20Waves%20(30-100%20Hz)%20Enhanced%20consciousness%20and%20insight.mp3'
    },
    {
      name: 'Schumann Resonance',
      frequency: '7.83 Hz',
      description: 'Earth\'s natural frequency for grounding',
      color: 'from-emerald-500 to-green-600',
      audioUrl: '/zen-reset/audio/Earth%20Meditation%20-%207.83%20Hz%20Binaural%20Beats%20-%20Schumann%20Resonance%20-%20Meditation%20Music.mp3'
    },
    {
      name: '528 Hz Love',
      frequency: '528 Hz',
      description: 'DNA repair and transformation',
      color: 'from-pink-500 to-rose-600',
      audioUrl: '/zen-reset/audio/528%20Hz%20Love.mp3'
    }
  ];

  // Test connection function
  const testConnection = async () => {
    setTestingConnection(true);
    try {
      const testUrl = '/zen-reset/audio/Theta%20Waves%20(4-8%20Hz)%20Deep%20meditation%20and%20creativity.mp3';
      console.log('Testing connection to:', testUrl);
      
      const response = await fetch(testUrl, { method: 'HEAD' });
      console.log('Connection test response:', response.status, response.statusText);
      
      if (response.ok) {
        setConnectionStatus('working');
        toast.success('Audio connection working!');
      } else {
        setConnectionStatus('failed');
        toast.error(`Connection test failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Connection test error:', error);
      setConnectionStatus('failed');
      toast.error('Connection test failed - check console for details');
    } finally {
      setTestingConnection(false);
    }
  };

  useEffect(() => {
    // Initialize audio elements with better error handling
    frequencySounds.forEach((sound, index) => {
      if (!audioRefs.current[index]) {
        console.log(`Initializing audio for ${sound.name} with URL:`, sound.audioUrl);
        const audio = new Audio();
        audio.preload = 'none';
        
        audio.addEventListener('loadstart', () => {
          console.log(`Audio loadstart for ${sound.name}`);
        });

        audio.addEventListener('canplay', () => {
          console.log(`Audio canplay for ${sound.name}`);
          setLoadingStates(prev => {
            const updated = { ...prev };
            delete updated[index];
            return updated;
          });
        });

        audio.addEventListener('playing', () => {
          console.log(`Audio playing for ${sound.name}`);
          setLoadingStates(prev => {
            const updated = { ...prev };
            delete updated[index];
            return updated;
          });
        });

        audio.addEventListener('ended', () => {
          console.log(`Audio ended for ${sound.name}`);
          setActiveSound(null);
        });

        audio.addEventListener('error', (e) => {
          console.error(`Audio error for ${sound.name}:`, e);
          console.error('Audio error details:', {
            error: audio.error,
            networkState: audio.networkState,
            readyState: audio.readyState,
            src: audio.src
          });
          
          setLoadingStates(prev => {
            const updated = { ...prev };
            delete updated[index];
            return updated;
          });
          
          toast.error(`Failed to load ${sound.name} - check console for details`);
        });

        // Set the source after setting up event listeners
        audio.src = sound.audioUrl;
        audioRefs.current[index] = audio;
      }
    });

    return () => {
      // Cleanup
      audioRefs.current.forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  useEffect(() => {
    // Sync mute state with audio elements
    audioRefs.current.forEach(audio => {
      if (audio) {
        audio.muted = isMuted;
      }
    });
  }, [isMuted]);

  const handleSoundToggle = async (index: number) => {
    await unlockAudio();
    
    const audio = audioRefs.current[index];
    if (!audio) {
      console.error('Audio element not found for index:', index);
      return;
    }

    try {
      if (activeSound === index) {
        // Pause current sound
        console.log(`Pausing ${frequencySounds[index].name}`);
        audio.pause();
        setActiveSound(null);
      } else {
        // Stop other sounds
        audioRefs.current.forEach((otherAudio, otherIndex) => {
          if (otherAudio && otherIndex !== index) {
            otherAudio.pause();
            otherAudio.currentTime = 0;
          }
        });

        // Set loading state
        setLoadingStates(prev => ({ ...prev, [index]: true }));
        
        console.log(`Attempting to play ${frequencySounds[index].name} from URL:`, audio.src);
        
        // For mobile compatibility, load the audio first
        if (audio.readyState < 2) {
          console.log('Loading audio before playing...');
          audio.load();
          
          // Wait for canplay event or timeout
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error('Audio load timeout'));
            }, 10000);
            
            const onCanPlay = () => {
              clearTimeout(timeout);
              audio.removeEventListener('canplay', onCanPlay);
              audio.removeEventListener('error', onError);
              resolve(void 0);
            };
            
            const onError = (e: Event) => {
              clearTimeout(timeout);
              audio.removeEventListener('canplay', onCanPlay);
              audio.removeEventListener('error', onError);
              reject(e);
            };
            
            audio.addEventListener('canplay', onCanPlay, { once: true });
            audio.addEventListener('error', onError, { once: true });
          });
        }
        
        // Play the audio
        await audio.play();
        setActiveSound(index);
        toast.success(`Playing ${frequencySounds[index].name}`);
      }
    } catch (error) {
      console.error(`Playback error for ${frequencySounds[index].name}:`, error);
      console.error('Audio state:', {
        readyState: audio.readyState,
        networkState: audio.networkState,
        error: audio.error,
        src: audio.src
      });
      
      setLoadingStates(prev => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
      
      toast.error(`Failed to play ${frequencySounds[index].name} - check console for details`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <Navigation />

      <div className="relative z-10 min-h-screen pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Wave Frequency Sounds
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
              Immerse yourself in therapeutic frequencies designed to enhance meditation, focus, and healing
            </p>
            
            {/* Connection Test Button */}
            <div className="flex justify-center gap-4 mb-6">
              <Button 
                onClick={testConnection} 
                disabled={testingConnection}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {testingConnection ? (
                  <>Testing Connection...</>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Test Audio Connection
                  </>
                )}
              </Button>
              {connectionStatus !== 'unknown' && (
                <div className={`px-3 py-2 rounded-md text-sm font-medium ${
                  connectionStatus === 'working' 
                    ? 'bg-green-500/20 text-green-200 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-200 border border-red-500/30'
                }`}>
                  {connectionStatus === 'working' ? '✓ Connection Working' : '✗ Connection Failed'}
                </div>
              )}
            </div>
          </div>

          {/* Global Controls */}
          <div className="flex justify-center mb-8">
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              size="icon"
              className="w-14 h-14 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </Button>
          </div>

          {/* Frequency Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frequencySounds.map((sound, index) => (
              <Card key={index} className="group bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${sound.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`}></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {sound.name}
                    </h3>
                    
                    <p className="text-yellow-300 font-medium mb-3">
                      {sound.frequency}
                    </p>
                    
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                      {sound.description}
                    </p>
                    
                    <Button
                      onClick={() => handleSoundToggle(index)}
                      variant={activeSound === index ? "default" : "outline"}
                      size="icon"
                      className={`w-12 h-12 rounded-full transition-all duration-300 ${
                        activeSound === index
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 shadow-lg shadow-yellow-400/25 hover:from-yellow-300 hover:to-orange-300'
                          : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      }`}
                    >
                      {loadingStates[index] ? (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : activeSound === index ? (
                        <Pause size={20} />
                      ) : (
                        <Play size={20} />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-white/60 text-sm">
              Use headphones for the best frequency experience • Check console for debugging info
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaveFrequencySounds;