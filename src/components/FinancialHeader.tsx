
import React, { useState } from 'react';
import { Banknote, TrendingUp, PieChart, Info, ChevronDown } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FinancialHeader: React.FC = () => {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  
  return (
    <header className="pt-6 pb-2">
      <div className="flex items-center justify-center mb-4 group">
        <div className="flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group-hover:rotate-6">
          <Banknote className="h-8 w-8" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-800 tracking-tight mb-2">
        Healthcare Finance<span className="text-emerald-600 bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">Insights</span>
      </h1>
      <div className="flex items-center justify-center space-x-6 text-slate-600 mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 hover:text-emerald-600 transition-colors cursor-pointer group">
                <TrendingUp className="h-4 w-4 group-hover:scale-125 transition-transform" />
                <span className="text-sm">Market Analysis</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Detailed trends and predictions for healthcare markets</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 hover:text-emerald-600 transition-colors cursor-pointer group">
                <PieChart className="h-4 w-4 group-hover:scale-125 transition-transform" />
                <span className="text-sm">Investment Strategy</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Strategic investment recommendations tailored to healthcare</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="relative">
        <p className={`text-center text-slate-600 max-w-2xl mx-auto transition-all duration-300 ${isInfoExpanded ? 'line-clamp-none' : 'line-clamp-2'}`}>
          Generate comprehensive healthcare financial reports, market trend analysis,
          and strategic investment recommendations powered by AI. Our insights help you navigate
          complex healthcare markets with data-driven analysis and projections specific to your needs.
        </p>
        
        <button 
          onClick={() => setIsInfoExpanded(!isInfoExpanded)}
          className="flex items-center gap-1 text-xs text-emerald-600 mx-auto mt-1 hover:text-emerald-800 transition-colors"
        >
          {isInfoExpanded ? 'Show less' : 'Read more'}
          <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isInfoExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </header>
  );
};

export default FinancialHeader;
