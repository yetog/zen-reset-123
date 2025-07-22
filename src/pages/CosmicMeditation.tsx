
import React from 'react';
import { Star } from 'lucide-react';
import ComingSoonMeditation from './ComingSoonMeditation';

const CosmicMeditation = () => {
  return (
    <ComingSoonMeditation
      title="Cosmic Meditation"
      description="Connect with the universe and explore cosmic consciousness"
      icon={Star}
      features={[
        "Universal connection experiences",
        "Cosmic visualization journeys",
        "Expanded consciousness exploration",
        "Celestial meditation themes"
      ]}
    />
  );
};

export default CosmicMeditation;
