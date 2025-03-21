
import React from 'react';
import { DollarSign, Building2 } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <div className="min-h-[60vh] py-16 relative">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="glass-panel p-8 rounded-3xl border-none shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Get in Touch</h2>
            <p className="text-slate-600">Have questions about our healthcare financial insights?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">Financial Consultation</h3>
                  <p className="text-sm text-slate-600">Schedule a call with our financial analysts</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Building2 className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">Enterprise Solutions</h3>
                  <p className="text-sm text-slate-600">Tailored solutions for healthcare organizations</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <button className="py-3 px-6 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
                Contact Our Team
              </button>
              <button className="py-3 px-6 bg-white border border-emerald-200 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
