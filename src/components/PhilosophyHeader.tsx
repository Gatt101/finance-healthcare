
import React from 'react';
import { BookText, BrainCircuit, Sparkles } from 'lucide-react';

const PhilosophyHeader: React.FC = () => {
  return (
    <header className="w-full py-6 flex items-center justify-center">
      <div className="flex items-center space-x-3 bg-white/70 px-5 py-3 rounded-full shadow-md backdrop-blur-sm border border-wisdom-100 animate-float">
        <BrainCircuit className="h-7 w-7 text-wisdom-600" />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-philosopher-800 flex items-center">
            <span className="font-light">Philo</span>
            <span className="font-bold">Sage</span>
            <Sparkles className="h-4 w-4 ml-1 text-wisdom-500" />
          </h1>
          <p className="text-xs text-philosopher-500 -mt-0.5">Wisdom through dialogue</p>
        </div>
      </div>
    </header>
  );
};

export default PhilosophyHeader;
