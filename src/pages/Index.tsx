
import React from 'react';
import PhilosophyHeader from '../components/PhilosophyHeader';
import PhilosophyChatContainer from '../components/PhilosophyChatContainer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-wisdom-50 via-primary to-philosopher-50">
      <div className="container px-4 mx-auto max-w-5xl min-h-screen flex flex-col">
        <PhilosophyHeader />
        
        <main className="flex-1 flex flex-col items-center justify-center py-6">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-wisdom-600 tracking-wider uppercase mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-wisdom-100 animate-pulse-subtle">
                Virtual Wisdom Companion
              </span>
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-philosopher-800 mb-3 tracking-tight">
              Explore the depths of <span className="philosophical-quote">philosophical thought</span>
            </h2>
            <p className="text-philosopher-600 max-w-2xl mx-auto text-balance">
              Engage in meaningful dialogue with an AI companion trained in the tradition of great philosophers throughout history.
            </p>
          </div>
          
          <PhilosophyChatContainer />
        </main>
        
        <footer className="py-4 text-center text-philosopher-400 text-sm">
          <p>&copy; {new Date().getFullYear()} PhiloSage • Clarity through dialogue</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
