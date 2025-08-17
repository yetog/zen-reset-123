import React, { useState, useEffect } from 'react';
import { Save, Mic, MicOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { StorageService, Reflection } from '@/services/storageService';
import { toast } from 'sonner';

interface EnhancedReflectionWritingProps {
  onSave: (reflection: Reflection) => void;
}

const REFLECTION_PROMPTS = [
  "What am I most grateful for today?",
  "What challenged me today and how did I grow from it?",
  "What moment brought me the most joy today?",
  "How did I show kindness to myself or others today?",
  "What would I like to improve about tomorrow?",
  "What emotions did I experience today?",
  "What lesson did I learn today?",
  "How did I practice mindfulness today?"
];

const MOOD_OPTIONS = [
  { emoji: '😊', label: 'Great', value: 5 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '😔', label: 'Low', value: 2 },
  { emoji: '😢', label: 'Difficult', value: 1 },
];

const EnhancedReflectionWriting: React.FC<EnhancedReflectionWritingProps> = ({ onSave }) => {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    // Set a random prompt when component mounts
    const randomPrompt = REFLECTION_PROMPTS[Math.floor(Math.random() * REFLECTION_PROMPTS.length)];
    setCurrentPrompt(randomPrompt);
  }, []);

  const startVoiceRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        toast.info('Listening... Speak your reflection');
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setContent(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
        toast.success('Voice recording completed');
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast.error('Voice recording failed');
      };

      recognition.start();
    } else {
      toast.error('Voice recording not supported in this browser');
    }
  };

  const stopVoiceRecording = () => {
    setIsListening(false);
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error('Please write something to reflect on');
      return;
    }

    setIsSaving(true);

    try {
      const reflection: Reflection = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        content: content.trim(),
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        mood: selectedMood || undefined,
        tags: tags.length > 0 ? tags : undefined,
        createdAt: Date.now(),
      };

      await StorageService.saveReflection(reflection);
      await StorageService.updateReflectionStreak();
      
      onSave(reflection);
      
      // Reset form
      setContent('');
      setSelectedMood(null);
      setTags([]);
      
      // Set new prompt
      const randomPrompt = REFLECTION_PROMPTS[Math.floor(Math.random() * REFLECTION_PROMPTS.length)];
      setCurrentPrompt(randomPrompt);
      
      toast.success('Reflection saved! 📝');
    } catch (error) {
      toast.error('Failed to save reflection');
    } finally {
      setIsSaving(false);
    }
  };

  const usePrompt = () => {
    if (content.trim()) {
      setContent(content + '\n\n' + currentPrompt + '\n');
    } else {
      setContent(currentPrompt + '\n');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
      {/* Prompt Suggestion */}
      <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-200 text-sm font-medium">Reflection Prompt:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={usePrompt}
            className="text-yellow-300 hover:text-yellow-200 hover:bg-white/10"
          >
            <Sparkles size={14} className="mr-1" />
            Use
          </Button>
        </div>
        <p className="text-white text-sm italic">{currentPrompt}</p>
      </div>

      {/* Writing Area */}
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, feelings, and insights..."
            className="min-h-[200px] bg-white/5 border-white/20 text-white placeholder-purple-300 focus:border-yellow-400 focus:ring-yellow-400/50 resize-none"
          />
          
          {/* Voice Recording Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={isListening ? stopVoiceRecording : startVoiceRecording}
            className={`absolute bottom-3 right-3 ${
              isListening 
                ? 'text-red-400 hover:text-red-300 bg-red-400/10' 
                : 'text-white hover:text-yellow-300 hover:bg-white/10'
            }`}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </Button>
        </div>

        {/* Mood Selection */}
        <div>
          <label className="text-purple-200 text-sm font-medium mb-2 block">
            How are you feeling?
          </label>
          <div className="flex space-x-2">
            {MOOD_OPTIONS.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-2 rounded-lg border transition-all ${
                  selectedMood === mood.value
                    ? 'border-yellow-400 bg-yellow-400/20'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{mood.emoji}</span>
                <div className="text-xs text-purple-200 mt-1">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-purple-200 text-sm font-medium mb-2 block">
            Tags (optional)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              placeholder="Add a tag..."
              className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-purple-300 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={addTag}
              className="text-white hover:bg-white/10"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={isSaving || !content.trim()}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 font-medium hover:from-yellow-300 hover:to-orange-300 disabled:opacity-50"
        >
          {isSaving ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-purple-900 border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Save size={16} />
              <span>Save Reflection</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default EnhancedReflectionWriting;