
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ReflectionWritingArea from '@/components/ReflectionWritingArea';
import ReflectionSearch from '@/components/ReflectionSearch';
import ReflectionHistory, { Reflection } from '@/components/ReflectionHistory';
import { toast } from 'sonner';

const Reflect = () => {
  const [currentReflection, setCurrentReflection] = useState('');
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isSaving, setIsSaving] = useState(false);

  // Load reflections from localStorage on component mount
  useEffect(() => {
    const savedReflections = localStorage.getItem('reflections');
    if (savedReflections) {
      setReflections(JSON.parse(savedReflections));
    }
  }, []);

  // Save reflections to localStorage whenever reflections change
  useEffect(() => {
    localStorage.setItem('reflections', JSON.stringify(reflections));
  }, [reflections]);

  const handleSaveReflection = () => {
    if (!currentReflection.trim()) return;

    setIsSaving(true);
    
    // Simulate save delay
    setTimeout(() => {
      const newReflection: Reflection = {
        id: Date.now().toString(),
        content: currentReflection.trim(),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      setReflections(prev => [newReflection, ...prev]);
      setCurrentReflection('');
      setIsSaving(false);
      
      toast.success('Reflection saved! 📝', {
        description: 'Your thoughts have been captured.',
      });
    }, 1000);
  };

  const handleDeleteReflection = (id: string) => {
    setReflections(prev => prev.filter(reflection => reflection.id !== id));
    toast.success('Reflection deleted');
  };

  const filterReflections = () => {
    let filtered = reflections;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(reflection =>
        reflection.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    switch (selectedFilter) {
      case 'today':
        filtered = filtered.filter(r => r.date === todayStr);
        break;
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter(r => new Date(r.date) >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        filtered = filtered.filter(r => new Date(r.date) >= monthAgo);
        break;
      default:
        break;
    }

    return filtered;
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
            Daily Reflection
          </h1>
          <p className="text-xl text-purple-200 font-light">
            Capture your thoughts, insights, and gratitude
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Writing Area */}
          <ReflectionWritingArea
            currentReflection={currentReflection}
            onReflectionChange={setCurrentReflection}
            onSave={handleSaveReflection}
            isSaving={isSaving}
          />

          {/* Search and Filter */}
          <ReflectionSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          {/* Reflections History */}
          <ReflectionHistory
            reflections={filterReflections()}
            onDelete={handleDeleteReflection}
          />
        </div>
      </div>
    </div>
  );
};

export default Reflect;
