
import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ScrollIndicatorProps {
  onClick: () => void;
  show: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onClick, show }) => {
  if (!show) return null;

  return (
    <div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white p-3 rounded-full cursor-pointer shadow-lg animate-bounce hover:bg-emerald-600 transition-colors z-10"
      onClick={onClick}
    >
      <ArrowDown className="h-5 w-5" />
    </div>
  );
};

export default ScrollIndicator;
