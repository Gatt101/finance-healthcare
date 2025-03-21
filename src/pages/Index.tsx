
import React from 'react';
import FinancialHeader from '../components/FinancialHeader';
import FinanceReportContainer from '../components/FinanceReportContainer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-emerald-50 to-sky-50">
      <div className="container px-4 mx-auto max-w-5xl min-h-screen flex flex-col">
        <FinancialHeader />
        
        <main className="flex-1 flex flex-col items-center justify-center py-6">
          <div className="text-center mb-8">
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
          
          <FinanceReportContainer />
        </main>
        
        <footer className="py-4 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Healthcare FinanceInsights • Data-driven decisions for healthcare investors</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
