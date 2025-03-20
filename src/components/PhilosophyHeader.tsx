
import React from 'react';
import { BookText, BrainCircuit } from 'lucide-react';

const PhilosophyHeader: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-0 flex items-center justify-center">
      <div className="flex items-center space-x-3 animate-float">
        <BrainCircuit className="h-8 w-8 text-wisdom-600" />
        <h1 className="text-2xl font-semibold text-philosopher-800">
          <span className="font-light">Philo</span>Sage
        </h1>
      </div>
    </header>
  );
};

export default PhilosophyHeader;
