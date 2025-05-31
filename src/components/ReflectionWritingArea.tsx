
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Save, Lightbulb, AlertCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface ReflectionWritingAreaProps {
  currentReflection: string;
  onReflectionChange: (value: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

const ReflectionWritingArea: React.FC<ReflectionWritingAreaProps> = ({
  currentReflection,
  onReflectionChange,
  onSave,
  isSaving
}) => {
  const [error, setError] = useState<string>('');

  const prompts = [
    "What am I grateful for today?",
    "What did I learn about myself today?",
    "How did I grow today?",
    "What challenged me and how did I respond?",
    "What would I do differently?",
    "What brought me joy today?",
    "How did I show kindness today?",
    "What are my intentions for tomorrow?"
  ];

  const getRandomPrompt = () => {
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const handleSave = async () => {
    try {
      setError('');
      await onSave();
    } catch (err) {
      setError('Failed to save reflection. Please try again.');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 mb-8 transition-all duration-300 hover:bg-white/15">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-light text-white">Today's Reflection</h2>
        <button
          onClick={() => onReflectionChange(getRandomPrompt())}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 text-sm"
        >
          <Lightbulb size={16} />
          <span>Get Prompt</span>
        </button>
      </div>
      
      <Textarea
        value={currentReflection}
        onChange={(e) => onReflectionChange(e.target.value)}
        placeholder="Begin your reflection... What's on your mind today?"
        className="min-h-[150px] md:min-h-[200px] bg-white/5 border-white/20 text-white placeholder:text-purple-300 resize-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
      />
      
      {error && (
        <div className="flex items-center space-x-2 mt-4 p-3 bg-red-500/10 border border-red-400/20 rounded-xl">
          <AlertCircle size={16} className="text-red-400" />
          <span className="text-red-300 text-sm">{error}</span>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
        <span className="text-purple-300 text-sm">
          {currentReflection.length} characters
        </span>
        <button
          onClick={handleSave}
          disabled={!currentReflection.trim() || isSaving}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 rounded-xl hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center"
        >
          {isSaving ? (
            <LoadingSpinner size="sm" />
          ) : (
            <Save size={16} />
          )}
          <span>{isSaving ? 'Saving...' : 'Save Reflection'}</span>
        </button>
      </div>
    </div>
  );
};

export default ReflectionWritingArea;
