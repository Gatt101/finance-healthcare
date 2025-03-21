
import React, { useState, useEffect } from 'react';
import FinancialHeader from '../components/FinancialHeader';
import FinanceReportContainer from '../components/FinanceReportContainer';
import { ArrowDown } from 'lucide-react';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  // Add some loading effects
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show scroll indicator after load
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowScrollIndicator(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);
  
  // Scroll to main content
  const scrollToContent = () => {
    document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-emerald-50 to-sky-50">
      <div className="container px-4 mx-auto max-w-5xl min-h-screen flex flex-col">
        <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <FinancialHeader />
        </div>
        
        <main id="main-content" className="flex-1 flex flex-col items-center justify-center py-6">
          <div className={`text-center mb-8 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-sm font-medium text-emerald-600 tracking-wider uppercase mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 animate-pulse-subtle">
                Healthcare Financial Intelligence
              </span>
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-3 tracking-tight">
              Generate <span className="text-emerald-600 font-medium">actionable insights</span> for healthcare finance
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-balance">
              Get AI-powered financial reports with market trend analysis, company projections, and investment recommendations specific to the healthcare industry.
            </p>
          </div>
          
          <div className={`w-full transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FinanceReportContainer />
          </div>
        </main>
        
        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div 
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white p-3 rounded-full cursor-pointer shadow-lg animate-bounce hover:bg-emerald-600 transition-colors"
            onClick={scrollToContent}
          >
            <ArrowDown className="h-5 w-5" />
          </div>
        )}
        
        <footer className={`py-4 text-center text-slate-400 text-sm transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <p>&copy; {new Date().getFullYear()} Healthcare FinanceInsights • Data-driven decisions for healthcare investors</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
