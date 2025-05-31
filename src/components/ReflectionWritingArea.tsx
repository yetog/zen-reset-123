
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Save, Lightbulb } from 'lucide-react';

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

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Today's Reflection</h2>
        <button
          onClick={() => onReflectionChange(getRandomPrompt())}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
        >
          <Lightbulb size={16} />
          <span className="text-sm">Get Prompt</span>
        </button>
      </div>
      
      <Textarea
        value={currentReflection}
        onChange={(e) => onReflectionChange(e.target.value)}
        placeholder="Begin your reflection... What's on your mind today?"
        className="min-h-[200px] bg-white/5 border-white/20 text-white placeholder:text-purple-300 resize-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
      />
      
      <div className="flex justify-between items-center mt-6">
        <span className="text-purple-300 text-sm">
          {currentReflection.length} characters
        </span>
        <button
          onClick={onSave}
          disabled={!currentReflection.trim() || isSaving}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 rounded-xl hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={16} />
          <span>{isSaving ? 'Saving...' : 'Save Reflection'}</span>
        </button>
      </div>
    </div>
  );
};

export default ReflectionWritingArea;
