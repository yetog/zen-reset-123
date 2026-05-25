export interface MeditationLesson {
  id: string;
  day: number;
  title: string;
  duration: string;
  description: string;
  longDescription: string;
  audioUrl: string;
  keyTopics: string[];
  color: string;
}

export const meditationLessons: MeditationLesson[] = [
  {
    id: 'day-1',
    day: 1,
    title: 'Arrival & Presence',
    duration: '10 min',
    description: 'Begin your journey by arriving fully in the present moment.',
    longDescription: 'This foundational session guides you through the practice of arriving. You will learn to ground yourself, release tension, and cultivate presence through breath awareness.',
    audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/training/day-01-arrival.mp3',
    keyTopics: ['Breath awareness', 'Grounding', 'Releasing tension'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'day-2',
    day: 2,
    title: 'Focus & Attention',
    duration: '12 min',
    description: 'Develop the quality of focused attention and concentration.',
    longDescription: 'Learn to direct your attention with intention. This session builds on Day 1 by introducing techniques to sharpen focus and maintain sustained attention.',
    audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/training/day-02-focus.mp3',
    keyTopics: ['Single-pointed focus', 'Attention training', 'Mental clarity'],
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 'day-3',
    day: 3,
    title: 'Body Scan Basics',
    duration: '15 min',
    description: 'Cultivate awareness of physical sensations throughout your body.',
    longDescription: 'A systematic journey through the body, developing interoceptive awareness. Learn to notice sensations without judgment and release held tension.',
    audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/training/day-03-body-scan.mp3',
    keyTopics: ['Body awareness', 'Sensation tracking', 'Progressive relaxation'],
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'day-4',
    day: 4,
    title: 'Thought Observation',
    duration: '12 min',
    description: 'Learn to observe thoughts without attachment or identification.',
    longDescription: 'Develop the skill of witnessing your thoughts as passing phenomena. This session introduces the concept of the observer mind and non-attachment.',
    audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/training/day-04-thoughts.mp3',
    keyTopics: ['Witnessing mind', 'Non-attachment', 'Mental space'],
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'day-5',
    day: 5,
    title: 'Emotional Awareness',
    duration: '14 min',
    description: 'Develop the capacity to sit with emotions without reactivity.',
    longDescription: 'Learn to recognize, name, and sit with emotions as they arise. This practice builds emotional intelligence and resilience.',
    audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/training/day-05-emotions.mp3',
    keyTopics: ['Emotional labeling', 'Non-reactivity', 'Equanimity'],
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'day-6',
    day: 6,
    title: 'Loving-Kindness Introduction',
    duration: '15 min',
    description: 'Open your heart with the practice of metta (loving-kindness).',
    longDescription: 'Begin the practice of directing goodwill toward yourself and others. This session introduces traditional loving-kindness phrases and intentions.',
    audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/training/day-06-loving-kindness.mp3',
    keyTopics: ['Self-compassion', 'Metta practice', 'Heart opening'],
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'day-7',
    day: 7,
    title: 'Stress Release Practice',
    duration: '12 min',
    description: 'Learn techniques to actively release stress and find calm.',
    longDescription: 'A practical session focused on stress reduction. Combine breath, body awareness, and mental techniques to release accumulated tension.',
    audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/training/day-07-stress-release.mp3',
    keyTopics: ['Stress release', 'Calming breath', 'Nervous system regulation'],
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'day-8',
    day: 8,
    title: 'Morning Intention Setting',
    duration: '10 min',
    description: 'Start your day with clarity, purpose, and positive intention.',
    longDescription: 'A morning practice designed to set the tone for your day. Cultivate gratitude, set intentions, and prepare your mind for focused action.',
    audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/training/day-08-morning.mp3',
    keyTopics: ['Intention setting', 'Morning routine', 'Positive priming'],
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'day-9',
    day: 9,
    title: 'Evening Wind Down',
    duration: '15 min',
    description: 'Release the day and prepare your mind and body for rest.',
    longDescription: 'An evening practice to process the day, release remaining tension, and transition into a peaceful state conducive to quality sleep.',
    audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/training/day-09-evening.mp3',
    keyTopics: ['Day release', 'Sleep preparation', 'Deep relaxation'],
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'day-10',
    day: 10,
    title: 'Integration & Beyond',
    duration: '18 min',
    description: 'Integrate all practices and establish your ongoing meditation path.',
    longDescription: 'The culmination of your 10-day journey. This session weaves together all the techniques you have learned and provides guidance for continuing your practice.',
    audioUrl: 'https://meditations.s3.us-central-1.ionoscloud.com/training/day-10-integration.mp3',
    keyTopics: ['Practice integration', 'Daily commitment', 'Path forward'],
    color: 'from-violet-500 to-fuchsia-600'
  }
];

export const getLesson = (id: string): MeditationLesson | undefined => {
  return meditationLessons.find(lesson => lesson.id === id);
};

export const getCompletedLessons = (): string[] => {
  const stored = localStorage.getItem('completedMeditationLessons');
  return stored ? JSON.parse(stored) : [];
};

export const markLessonComplete = (id: string): void => {
  const completed = getCompletedLessons();
  if (!completed.includes(id)) {
    completed.push(id);
    localStorage.setItem('completedMeditationLessons', JSON.stringify(completed));
  }
};

export const isLessonComplete = (id: string): boolean => {
  return getCompletedLessons().includes(id);
};
