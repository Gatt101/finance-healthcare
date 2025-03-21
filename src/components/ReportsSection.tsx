
import React, { useEffect, useRef, useState } from 'react';
import FinanceReportContainer from './FinanceReportContainer';

const ReportsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen py-12 relative" ref={sectionRef}>
      <div 
        className={`container px-4 mx-auto max-w-6xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Generate <span className="text-emerald-600">AI-Powered Reports</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Advanced financial intelligence tailored to healthcare industry needs
          </p>
        </div>
        
        <div className="w-full max-w-5xl mx-auto">
          <FinanceReportContainer />
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;
