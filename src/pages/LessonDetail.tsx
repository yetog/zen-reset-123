import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, BookOpen, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  content: {
    introduction: string;
    keyPoints: string[];
    practice: string;
    conclusion: string;
  };
}

const lessonData: Record<string, Lesson> = {
  '1': {
    id: '1',
    title: 'Introduction to Mindfulness',
    duration: '5 min',
    category: 'basics',
    description: 'Learn the fundamentals of mindfulness and how it can transform your daily life.',
    content: {
      introduction: 'Mindfulness is the practice of being fully present and engaged in the current moment, without judgment. It\'s about observing your thoughts, feelings, and sensations as they arise, rather than being caught up in them.',
      keyPoints: [
        'Mindfulness is about present-moment awareness',
        'It involves observing without judging',
        'Regular practice builds mental resilience',
        'Can be applied to any daily activity'
      ],
      practice: 'Take a moment now to notice your breathing. Don\'t try to change it, just observe the natural rhythm of your breath flowing in and out. When your mind wanders, gently bring your attention back to your breath.',
      conclusion: 'Mindfulness is a skill that develops with practice. Start small - even one mindful breath can make a difference in your day.'
    }
  },
  '2': {
    id: '2',
    title: 'Breathing Techniques',
    duration: '5 min',
    category: 'breathing',
    description: 'Master the art of conscious breathing for relaxation and focus.',
    content: {
      introduction: 'Conscious breathing is one of the most powerful tools for managing stress and anxiety. By controlling our breath, we can influence our nervous system and emotional state.',
      keyPoints: [
        'Deep breathing activates the parasympathetic nervous system',
        'The 4-7-8 technique is great for relaxation',
        'Box breathing helps with focus and concentration',
        'Breathing techniques can be used anywhere, anytime'
      ],
      practice: 'Try the 4-7-8 technique: Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. Repeat this cycle 3-4 times, feeling your body relax with each breath.',
      conclusion: 'Regular breathing practice creates a foundation of calm that you can access whenever you need it.'
    }
  },
  '3': {
    id: '3',
    title: 'Body Scan Meditation',
    duration: '5 min',
    category: 'meditation',
    description: 'Learn to connect with your body through progressive awareness.',
    content: {
      introduction: 'Body scan meditation helps you develop awareness of physical sensations and release tension. It\'s a practice of systematically focusing on different parts of your body.',
      keyPoints: [
        'Start from the top of your head or your toes',
        'Notice sensations without trying to change them',
        'Tension often releases naturally with awareness',
        'Regular practice improves body-mind connection'
      ],
      practice: 'Close your eyes and start at the top of your head. Notice any sensations - warmth, coolness, tension, or relaxation. Slowly move your attention down through your face, neck, shoulders, and arms. Take your time with each area.',
      conclusion: 'Body awareness is the foundation of emotional awareness. The more we understand our physical responses, the better we can manage our emotional well-being.'
    }
  },
  '4': {
    id: '4',
    title: 'Managing Stress',
    duration: '5 min',
    category: 'wellness',
    description: 'Practical techniques for reducing stress in everyday situations.',
    content: {
      introduction: 'Stress is a natural response to challenges, but chronic stress can impact our health and well-being. Learning to manage stress effectively is crucial for maintaining balance in our lives.',
      keyPoints: [
        'Recognize early signs of stress in your body',
        'Use the STOP technique: Stop, Take a breath, Observe, Proceed',
        'Practice self-compassion during difficult moments',
        'Regular meditation builds stress resilience'
      ],
      practice: 'Think of a mildly stressful situation. Notice where you feel it in your body. Take three deep breaths, and with each exhale, imagine releasing that tension. Remind yourself: "This too shall pass."',
      conclusion: 'Stress management is a skill that improves with practice. Small, consistent actions create lasting change.'
    }
  },
  '5': {
    id: '5',
    title: 'Loving-Kindness Meditation',
    duration: '5 min',
    category: 'meditation',
    description: 'Cultivate compassion and positive emotions through this ancient practice.',
    content: {
      introduction: 'Loving-kindness meditation helps develop feelings of goodwill and compassion towards yourself and others. This practice has been shown to increase positive emotions and reduce negative ones.',
      keyPoints: [
        'Start by offering kindness to yourself',
        'Extend compassion to loved ones, then neutral people',
        'Eventually include difficult people in your practice',
        'Regular practice increases empathy and reduces stress'
      ],
      practice: 'Place your hand on your heart and repeat: "May I be happy, may I be healthy, may I be at peace." Feel the warmth of these intentions. Now think of someone you love and offer them the same wishes.',
      conclusion: 'Compassion is like a muscle - the more we practice, the stronger it becomes. This practice benefits both ourselves and everyone around us.'
    }
  },
  '6': {
    id: '6',
    title: 'Mindful Walking',
    duration: '5 min',
    category: 'movement',
    description: 'Transform your daily walks into mindful movement practices.',
    content: {
      introduction: 'Walking meditation combines the benefits of mindfulness with gentle physical movement. It\'s perfect for those who find sitting meditation challenging or want to bring mindfulness into daily activities.',
      keyPoints: [
        'Focus on the sensation of your feet touching the ground',
        'Coordinate breath with steps for deeper practice',
        'Notice the environment without getting lost in thoughts',
        'Can be practiced anywhere, for any duration'
      ],
      practice: 'Stand still for a moment and feel your feet on the ground. Begin walking slowly, feeling each step. Coordinate your breathing - perhaps inhaling for 3 steps, exhaling for 3 steps. Notice how your body moves through space.',
      conclusion: 'Mindful walking shows us that meditation isn\'t separate from life - it can be integrated into everything we do.'
    }
  }
};

const LessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [checkedPoints, setCheckedPoints] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const lesson = id ? lessonData[id] : null;

  useEffect(() => {
    if (lesson) {
      setCheckedPoints(new Array(lesson.content.keyPoints.length).fill(false));
      
      // Check if lesson is already completed
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      setIsCompleted(completedLessons.includes(lesson.id));
    }
  }, [lesson]);

  const handlePointCheck = (index: number) => {
    const newChecked = [...checkedPoints];
    newChecked[index] = !newChecked[index];
    setCheckedPoints(newChecked);
  };

  const handleCompleteLesson = () => {
    if (!lesson) return;

    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completedLessons.includes(lesson.id)) {
      completedLessons.push(lesson.id);
      localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
      setIsCompleted(true);
      
      toast({
        title: "Lesson Completed!",
        description: `You've completed "${lesson.title}". Great job!`,
      });
    }
  };

  const handleBackToLessons = () => {
    navigate('/learn');
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl mb-4">Lesson not found</h1>
          <button 
            onClick={handleBackToLessons}
            className="text-emerald-300 hover:text-emerald-200"
          >
            Back to Learn
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navigation />

      <div className="relative z-10 min-h-screen p-6 pt-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBackToLessons}
            className="flex items-center space-x-2 text-emerald-300 hover:text-emerald-200 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Lessons</span>
          </button>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <BookOpen size={24} className="text-emerald-300" />
                <div>
                  <h1 className="text-3xl font-light text-white">{lesson.title}</h1>
                  <div className="flex items-center space-x-4 text-emerald-200 mt-2">
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {lesson.duration}
                    </span>
                    <span className="capitalize">{lesson.category}</span>
                  </div>
                </div>
              </div>
              {isCompleted && (
                <CheckCircle size={32} className="text-emerald-400" />
              )}
            </div>
            <p className="text-emerald-100 text-lg">{lesson.description}</p>
          </div>

          {/* Lesson Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h2 className="text-2xl font-light text-white mb-4">Introduction</h2>
              <p className="text-emerald-100 leading-relaxed">{lesson.content.introduction}</p>
            </div>

            {/* Key Points */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h2 className="text-2xl font-light text-white mb-6">Key Points to Remember</h2>
              <div className="space-y-3">
                {lesson.content.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <button
                      onClick={() => handlePointCheck(index)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        checkedPoints[index]
                          ? 'bg-emerald-400 border-emerald-400 text-emerald-900'
                          : 'border-emerald-300 hover:border-emerald-200'
                      }`}
                    >
                      {checkedPoints[index] && <CheckCircle size={12} />}
                    </button>
                    <p className="text-emerald-100 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h2 className="text-2xl font-light text-white mb-4">Practice Exercise</h2>
              <p className="text-emerald-100 leading-relaxed">{lesson.content.practice}</p>
            </div>

            {/* Conclusion */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h2 className="text-2xl font-light text-white mb-4">Takeaway</h2>
              <p className="text-emerald-100 leading-relaxed">{lesson.content.conclusion}</p>
            </div>

            {/* Complete Lesson Button */}
            <div className="text-center">
              <button
                onClick={isCompleted ? handleBackToLessons : handleCompleteLesson}
                className={`px-8 py-3 rounded-xl transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-900 hover:scale-105'
                }`}
              >
                {isCompleted ? 'Back to Lessons' : 'Complete Lesson'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;