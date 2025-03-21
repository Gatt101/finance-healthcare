
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ReportsSection from '../components/ReportsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ScrollIndicator from '../components/ScrollIndicator';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const reportsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowScrollIndicator(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);
  
  const scrollToContent = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigate = (index: number) => {
    switch(index) {
      case 0: scrollToContent(heroRef); break;
      case 1: scrollToContent(featuresRef); break;
      case 2: scrollToContent(reportsRef); break;
      case 3: scrollToContent(contactRef); break;
    }
  };

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
        <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
        
        <div id="hero-section" ref={heroRef}>
          <HeroSection isLoaded={isLoaded} onExplore={() => scrollToContent(featuresRef)} />
        </div>
        
        <div id="features-section" ref={featuresRef}>
          <FeaturesSection />
        </div>
        
        <div id="reports-section" ref={reportsRef}>
          <ReportsSection />
        </div>
        
        <div id="contact-section" ref={contactRef}>
          <ContactSection />
        </div>
        
        <ScrollIndicator show={showScrollIndicator} onClick={() => scrollToContent(reportsRef)} />
        
        <Footer />
      </div>
    </ScrollArea>
  );
};

export default Index;
