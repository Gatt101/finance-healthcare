
import React from 'react';
import { Banknote, TrendingUp, PieChart } from 'lucide-react';

const FinancialHeader: React.FC = () => {
  return (
    <header className="pt-6 pb-2">
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-white">
          <Banknote className="h-8 w-8" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-800 tracking-tight mb-2">
        Healthcare Finance<span className="text-emerald-600">Insights</span>
      </h1>
      <div className="flex items-center justify-center space-x-6 text-slate-600 mb-4">
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm">Market Analysis</span>
        </div>
        <div className="flex items-center gap-1">
          <PieChart className="h-4 w-4" />
          <span className="text-sm">Investment Strategy</span>
        </div>
      </div>
      <p className="text-center text-slate-600 max-w-2xl mx-auto">
        Generate comprehensive healthcare financial reports, market trend analysis,
        and strategic investment recommendations powered by AI.
      </p>
    </header>
  );
};

export default FinancialHeader;
