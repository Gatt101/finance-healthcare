
import React from 'react';
import FinancialHeader from './FinancialHeader';
import { ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  isLoaded: boolean;
  onExplore: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isLoaded, onExplore }) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <FinancialHeader />
        </div>
        
        <div className={`flex justify-center mt-8 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button 
            onClick={onExplore}
            className="py-3 px-8 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            Explore Features
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="absolute top-[15%] right-[10%] w-64 h-64 bg-gradient-to-br from-emerald-300/30 to-sky-300/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-[20%] left-[5%] w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-sky-400/20 rounded-full blur-3xl animate-float delay-1000"></div>
    </div>
  );
};

export default HeroSection;
