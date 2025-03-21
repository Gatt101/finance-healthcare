
import React from 'react';
import { LineChart, Building2, Wallet, DollarSign, CircleHelp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <LineChart className="h-8 w-8 text-emerald-500" />,
      title: "Market Trend Analysis",
      description: "Analyze current and emerging trends in healthcare markets with predictive insights."
    },
    {
      icon: <Building2 className="h-8 w-8 text-emerald-500" />,
      title: "Company Projections",
      description: "Generate detailed financial projections for healthcare organizations and sectors."
    },
    {
      icon: <Wallet className="h-8 w-8 text-emerald-500" />,
      title: "Investment Strategy",
      description: "Receive tailored investment recommendations based on market conditions."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-emerald-500" />,
      title: "Financial Metrics",
      description: "Track key performance indicators and financial metrics for healthcare entities."
    },
    {
      icon: <CircleHelp className="h-8 w-8 text-emerald-500" />,
      title: "Personalized Insights",
      description: "Get answers to your specific healthcare finance questions with custom analysis."
    }
  ];

  return (
    <div className="min-h-screen py-20 relative">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Transform Healthcare <span className="text-emerald-600">Financial Analysis</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Leverage AI-powered insights to make data-driven decisions in the dynamic healthcare market
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-panel border-none overflow-hidden">
              <CardContent className="p-8">
                <div 
                  className="flex flex-col items-center text-center space-y-4 transform transition-transform duration-300 hover:translate-y-[-5px]"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="p-4 rounded-full bg-emerald-100/80">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
