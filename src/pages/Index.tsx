
import React, { useState, useEffect, useRef } from 'react';
import FinancialHeader from '../components/FinancialHeader';
import FinanceReportContainer from '../components/FinanceReportContainer';
import { ArrowDown, Wallet, DollarSign, LineChart, Building2, CircleHelp, ArrowUpRight, Banknote } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const reportsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
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
  const scrollToContent = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Intersection observer for detecting active section
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-10% 0px -10% 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          switch(id) {
            case 'hero-section':
              setActiveSection(0);
              break;
            case 'features-section':
              setActiveSection(1);
              break;
            case 'reports-section':
              setActiveSection(2);
              break;
            case 'contact-section':
              setActiveSection(3);
              break;
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (reportsRef.current) observer.observe(reportsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <ScrollArea className="w-full h-screen">
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-emerald-50 to-sky-50">
        {/* Fixed navigation */}
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center p-2 glass-panel rounded-full shadow-lg bg-white/70 backdrop-blur-md border border-white/30">
          <ul className="flex space-x-2">
            {['Overview', 'Features', 'Reports', 'Contact'].map((item, index) => (
              <li key={index}>
                <button 
                  onClick={() => {
                    switch(index) {
                      case 0: scrollToContent(heroRef); break;
                      case 1: scrollToContent(featuresRef); break;
                      case 2: scrollToContent(reportsRef); break;
                      case 3: scrollToContent(contactRef); break;
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === index 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : 'hover:bg-emerald-100 text-slate-700'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Hero Section */}
        <div id="hero-section" ref={heroRef} className="min-h-screen w-full flex flex-col justify-center relative overflow-hidden">
          <div className="container px-4 mx-auto max-w-5xl">
            <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <FinancialHeader />
            </div>
            
            <div className={`flex justify-center mt-8 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button 
                onClick={() => scrollToContent(featuresRef)}
                className="py-3 px-8 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Explore Features
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Abstract shapes in background */}
          <div className="absolute top-[15%] right-[10%] w-64 h-64 bg-gradient-to-br from-emerald-300/30 to-sky-300/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-[20%] left-[5%] w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-sky-400/20 rounded-full blur-3xl animate-float delay-1000"></div>
        </div>
        
        {/* Features Section */}
        <div id="features-section" ref={featuresRef} className="min-h-screen py-20 relative">
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
              {[
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
              ].map((feature, index) => (
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
        
        {/* Report Section */}
        <div id="reports-section" ref={reportsRef} className="min-h-screen py-12 relative">
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
        
        {/* Contact Section */}
        <div id="contact-section" ref={contactRef} className="min-h-[60vh] py-16 relative">
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
        
        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div 
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white p-3 rounded-full cursor-pointer shadow-lg animate-bounce hover:bg-emerald-600 transition-colors z-10"
            onClick={() => scrollToContent(reportsRef)}
          >
            <ArrowDown className="h-5 w-5" />
          </div>
        )}
        
        {/* Footer */}
        <footer className="py-10 bg-slate-900 text-white">
          <div className="container px-6 mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Banknote className="h-6 w-6 text-emerald-400" />
                  <h2 className="text-xl font-bold">HealthcareFinanceInsights</h2>
                </div>
                <p className="text-slate-400 text-sm">
                  Data-driven financial intelligence for healthcare investors and organizations
                </p>
              </div>
              
              <div className="flex space-x-8">
                <div>
                  <h3 className="font-medium mb-3 text-emerald-300">Resources</h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Whitepapers</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 text-emerald-300">Company</h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-500">
                &copy; {new Date().getFullYear()} Healthcare FinanceInsights. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <div className="flex space-x-4">
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ScrollArea>
  );
};

export default Index;
