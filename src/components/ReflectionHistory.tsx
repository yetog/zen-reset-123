
import React from 'react';
import { Trash2, Calendar, Clock } from 'lucide-react';

export interface Reflection {
  id: string;
  content: string;
  date: string;
  time: string;
}

interface ReflectionHistoryProps {
  reflections: Reflection[];
  onDelete: (id: string) => void;
}

const ReflectionHistory: React.FC<ReflectionHistoryProps> = ({
  reflections,
  onDelete
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  if (reflections.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center">
          <Calendar size={32} className="text-purple-900" />
        </div>
        <h3 className="text-xl font-light text-white mb-2">No reflections yet</h3>
        <p className="text-purple-300">Start writing your first reflection above</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-light text-white mb-6">Your Reflections</h3>
      {reflections.map((reflection) => (
        <div
          key={reflection.id}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4 text-purple-300 text-sm">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{formatDate(reflection.date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{reflection.time}</span>
              </div>
            </div>
            <button
              onClick={() => onDelete(reflection.id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-300"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <p className="text-white leading-relaxed">{reflection.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ReflectionHistory;
