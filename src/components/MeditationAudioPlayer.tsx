import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

interface MeditationAudioPlayerProps {
  audioUrl: string;
  title: string;
  onComplete?: () => void;
}

const MeditationAudioPlayer: React.FC<MeditationAudioPlayerProps> = ({
  audioUrl,
  title,
  onComplete
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    // Mobile optimization: Don't preload on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
      audio.preload = 'metadata';
      audio.src = audioUrl;
    }

    let loadingTimeout: NodeJS.Timeout;

    audio.addEventListener('loadstart', () => {
      setIsLoading(true);
      loadingTimeout = setTimeout(() => setIsLoading(false), 3000);
    });

    audio.addEventListener('canplay', () => {
      clearTimeout(loadingTimeout);
      setIsLoading(false);
    });

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onComplete) {
        onComplete();
      }
    });

    audio.addEventListener('error', () => {
      clearTimeout(loadingTimeout);
      setIsLoading(false);
      toast.error('Failed to load audio');
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioUrl, onComplete]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);

      // Mobile: Set source only when playing
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile && !audio.src) {
        audio.src = audioUrl;
      }

      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          setIsLoading(false);
        }
      } catch (error: any) {
        console.error('Failed to play audio:', error);
        setIsLoading(false);
        if (error.name === 'NotAllowedError') {
          toast.error('Tap play again to start audio on mobile');
        } else {
          toast.error('Failed to play audio');
        }
      }
    }
  };

  const handleReset = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audio.play();
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar || duration === 0) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      {/* Title */}
      <div className="text-center mb-6">
        <p className="text-purple-200 text-sm font-light">Now Playing</p>
        <h3 className="text-white text-lg font-light">{title}</h3>
      </div>

      {/* Progress Bar */}
      <div
        ref={progressRef}
        className="w-full h-2 bg-white/10 rounded-full mb-4 cursor-pointer group"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-100 relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-sm text-purple-200 mb-6">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        {/* Reset */}
        <button
          onClick={handleReset}
          className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        >
          <RotateCcw size={20} />
        </button>

        {/* Play/Pause */}
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying
              ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 shadow-lg shadow-yellow-400/25'
              : 'bg-white/10 text-white hover:bg-white/20'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause size={28} />
          ) : (
            <Play size={28} className="ml-1" />
          )}
        </button>

        {/* Mute */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </div>
  );
};

export default MeditationAudioPlayer;
