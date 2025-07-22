
import React from 'react';
import { Moon } from 'lucide-react';
import ComingSoonMeditation from './ComingSoonMeditation';

const LucidDreamingMeditation = () => {
  return (
    <ComingSoonMeditation
      title="Lucid Dreaming"
      description="Guided sessions to enhance dream awareness and control"
      icon={Moon}
      features={[
        "Dream awareness techniques",
        "Lucid dream induction methods",
        "Reality check training",
        "Dream journal integration"
      ]}
    />
  );
};

export default LucidDreamingMeditation;
