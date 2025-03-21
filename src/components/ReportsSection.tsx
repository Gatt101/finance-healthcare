
import React from 'react';
import FinanceReportContainer from './FinanceReportContainer';

const ReportsSection: React.FC = () => {
  return (
    <div className="min-h-screen py-12 relative">
      <div className="container px-4 mx-auto max-w-6xl">
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
