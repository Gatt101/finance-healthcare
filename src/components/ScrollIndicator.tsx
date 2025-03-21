
import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ScrollIndicatorProps {
  onClick: () => void;
  show: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onClick, show }) => {
  return (
    <div 
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-emerald-600 transition-all duration-500 z-10 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      onClick={onClick}
    >
      <ArrowDown className="h-5 w-5 animate-bounce" />
    </div>
  );
};

export default ScrollIndicator;
