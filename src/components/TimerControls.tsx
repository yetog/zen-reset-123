
import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  onPlayPause: () => void;
  onReset: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onPlayPause,
  onReset,
}) => {
  const [isMuted, setIsMuted] = React.useState(false);

  return (
    <div className="flex items-center space-x-6">
      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        <RotateCcw size={20} />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={onPlayPause}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-purple-900 hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 hover:scale-110 shadow-lg shadow-yellow-400/25"
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </button>

      {/* Mute Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};

export default TimerControls;
