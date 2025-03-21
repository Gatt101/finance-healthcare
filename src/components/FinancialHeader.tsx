
import React, { useState, useEffect } from 'react';
import { Banknote, TrendingUp, PieChart, Info, ChevronDown, BarChart4, PiggyBank } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FinancialHeader: React.FC = () => {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <header className="pt-8 pb-4 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-emerald-300/20 to-sky-300/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-gradient-to-tr from-emerald-400/10 to-sky-400/10 rounded-full blur-3xl"></div>
      
      <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex items-center justify-center mb-4 group">
          <div className="flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group-hover:rotate-6">
            <Banknote className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-center text-slate-800 tracking-tight mb-2">
          Healthcare Finance<span className="text-emerald-600 bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">Insights</span>
        </h1>
        
        <div className="flex items-center justify-center space-x-6 text-slate-600 mb-6">
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
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 hover:text-emerald-600 transition-colors cursor-pointer group">
                  <BarChart4 className="h-4 w-4 group-hover:scale-125 transition-transform" />
                  <span className="text-sm">Financial Analytics</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Comprehensive financial analytics for healthcare organizations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 hover:text-emerald-600 transition-colors cursor-pointer group">
                  <PiggyBank className="h-4 w-4 group-hover:scale-125 transition-transform" />
                  <span className="text-sm">Investment Portfolio</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Portfolio optimization strategies for healthcare investments</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="relative max-w-3xl mx-auto px-6">
          <p className={`text-center text-slate-600 transition-all duration-300 ${isInfoExpanded ? 'line-clamp-none' : 'line-clamp-2'}`}>
            Generate comprehensive healthcare financial reports, market trend analysis,
            and strategic investment recommendations powered by AI. Our insights help you navigate
            complex healthcare markets with data-driven analysis and projections specific to your needs.
            Understand market dynamics, identify growth opportunities, and make informed decisions.
          </p>
          
          <button 
            onClick={() => setIsInfoExpanded(!isInfoExpanded)}
            className="flex items-center gap-1 text-xs text-emerald-600 mx-auto mt-1 hover:text-emerald-800 transition-colors"
          >
            {isInfoExpanded ? 'Show less' : 'Read more'}
            <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isInfoExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default FinancialHeader;
