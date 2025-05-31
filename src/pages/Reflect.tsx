
import React, { useState, useEffect } from 'react';
import { PenTool, Calendar, Search, Plus } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';

interface Reflection {
  id: string;
  content: string;
  date: string;
  timestamp: number;
}

const Reflect = () => {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [currentReflection, setCurrentReflection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReflection, setSelectedReflection] = useState<Reflection | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load reflections from localStorage
    const saved = localStorage.getItem('zenResetReflections');
    if (saved) {
      setReflections(JSON.parse(saved));
    }
  }, []);

  const saveReflections = (newReflections: Reflection[]) => {
    setReflections(newReflections);
    localStorage.setItem('zenResetReflections', JSON.stringify(newReflections));
  };

  const handleSaveReflection = () => {
    if (!currentReflection.trim()) {
      toast.error('Please write something before saving');
      return;
    }

    const now = new Date();
    const reflection: Reflection = {
      id: Date.now().toString(),
      content: currentReflection,
      date: now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      timestamp: now.getTime()
    };

    const newReflections = [reflection, ...reflections];
    saveReflections(newReflections);
    setCurrentReflection('');
    toast.success('Reflection saved');
  };

  const handleEditReflection = (reflection: Reflection) => {
    setSelectedReflection(reflection);
    setCurrentReflection(reflection.content);
    setIsEditing(true);
  };

  const handleUpdateReflection = () => {
    if (!selectedReflection || !currentReflection.trim()) return;

    const updatedReflections = reflections.map(r => 
      r.id === selectedReflection.id 
        ? { ...r, content: currentReflection }
        : r
    );
    
    saveReflections(updatedReflections);
    setSelectedReflection(null);
    setCurrentReflection('');
    setIsEditing(false);
    toast.success('Reflection updated');
  };

  const handleDeleteReflection = (id: string) => {
    const newReflections = reflections.filter(r => r.id !== id);
    saveReflections(newReflections);
    toast.success('Reflection deleted');
  };

  const filteredReflections = reflections.filter(reflection =>
    reflection.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reflection.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewReflection = () => {
    setSelectedReflection(null);
    setCurrentReflection('');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navigation />

      <div className="relative z-10 min-h-screen p-6 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-wide">
            Reflect
          </h1>
          <p className="text-xl text-purple-200 font-light">
            Capture your thoughts and insights
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Writing Area */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-light text-white">
                {isEditing ? 'Edit Reflection' : 'New Reflection'}
              </h2>
              <button
                onClick={handleNewReflection}
                className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-purple-900 hover:scale-105 transition-transform duration-300"
              >
                <Plus size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center space-x-2 text-purple-200 mb-4">
                <Calendar size={16} />
                <span className="text-sm">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <textarea
                value={currentReflection}
                onChange={(e) => setCurrentReflection(e.target.value)}
                placeholder="What's on your mind today?"
                className="w-full h-64 bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-purple-300 resize-none focus:outline-none focus:border-yellow-400/50"
              />
            </div>
            
            <button
              onClick={isEditing ? handleUpdateReflection : handleSaveReflection}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 py-3 rounded-xl font-medium hover:scale-105 transition-transform duration-300"
            >
              {isEditing ? 'Update Reflection' : 'Save Reflection'}
            </button>
          </div>

          {/* Reflections History */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-white">Your Reflections</h2>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search reflections..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-yellow-400/50"
                />
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredReflections.length === 0 ? (
                <div className="text-center py-8">
                  <PenTool size={48} className="mx-auto text-purple-300 mb-4" />
                  <p className="text-purple-200">No reflections yet</p>
                  <p className="text-purple-300 text-sm">Start writing to capture your thoughts</p>
                </div>
              ) : (
                filteredReflections.map((reflection) => (
                  <div
                    key={reflection.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-200 text-sm">{reflection.date}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditReflection(reflection)}
                          className="text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReflection(reflection.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-white leading-relaxed">
                      {reflection.content.length > 150 
                        ? `${reflection.content.substring(0, 150)}...` 
                        : reflection.content
                      }
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reflect;
