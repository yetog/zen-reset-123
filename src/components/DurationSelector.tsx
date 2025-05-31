
import React from 'react';

interface DurationSelectorProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({
  selectedDuration,
  onDurationChange,
}) => {
  const durations = [
    { minutes: 5, seconds: 300 },
    { minutes: 10, seconds: 600 },
    { minutes: 15, seconds: 900 },
    { minutes: 20, seconds: 1200 },
    { minutes: 30, seconds: 1800 },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {durations.map(({ minutes, seconds }) => (
        <button
          key={minutes}
          onClick={() => onDurationChange(seconds)}
          className={`px-6 py-3 rounded-full border transition-all duration-300 ${
            selectedDuration === seconds
              ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 border-yellow-400 shadow-lg shadow-yellow-400/25'
              : 'bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 hover:border-white/40'
          }`}
        >
          {minutes} min
        </button>
      ))}
    </div>
  );
};

export default DurationSelector;
