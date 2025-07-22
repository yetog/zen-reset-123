
import React from 'react';
import { Brain } from 'lucide-react';
import ComingSoonMeditation from './ComingSoonMeditation';

const TrainingMeditation = () => {
  return (
    <ComingSoonMeditation
      title="Training & Mindfulness"
      description="Structured sessions to develop mindfulness skills"
      icon={Brain}
      features={[
        "Progressive skill-building exercises",
        "Mindfulness technique training",
        "Daily practice routines",
        "Progress tracking and insights"
      ]}
    />
  );
};

export default TrainingMeditation;
