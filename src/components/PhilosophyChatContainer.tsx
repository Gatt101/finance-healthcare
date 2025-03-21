
import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { usePhilosophyChat } from '../hooks/usePhilosophyChat';
import { MessageSquare, RefreshCw, Brain, ArrowDown, Sparkles, Info } from 'lucide-react';
import PhilosophyHeader from './PhilosophyHeader';

const PhilosophyChatContainer: React.FC = () => {
  const { messages, isLoading, sendMessage, clearMessages, modelStatus } = usePhilosophyChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Create fade-in effect on mount
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Show button when not scrolled to bottom (with some threshold)
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <PhilosophyHeader />
      
      <div 
        className={`flex flex-col w-full h-[calc(100vh-13rem)] bg-gradient-to-b from-white/70 to-white/40 backdrop-blur-sm rounded-3xl border border-philosopher-100/50 shadow-xl overflow-hidden transition-all duration-1000 ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Chat header with model status */}
        <div className="flex items-center justify-between p-4 border-b border-philosopher-100/50 bg-gradient-to-r from-wisdom-50/80 to-philosopher-50/80">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-wisdom-100 text-wisdom-600 animate-float shadow-sm">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h2 className="font-medium text-philosopher-800">Philosophical Dialogue</h2>
            
            {/* Model status pill */}
            <div className="hidden md:flex items-center bg-white/70 px-3 py-1.5 rounded-full border border-philosopher-100 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                modelStatus.isLoading ? 'bg-yellow-400 animate-pulse' : 
                modelStatus.isLoaded ? 'bg-green-400' : 
                'bg-red-400'
              }`}></div>
              <span className="text-xs text-philosopher-600 font-medium">
                {modelStatus.isLoading ? 'Loading Model...' : 
                modelStatus.isLoaded ? 'AI Model Ready' : 
                'Using Fallback'}
              </span>
              <div className="hidden group-hover:block ml-1">
                <Info className="h-3.5 w-3.5 text-philosopher-400" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-wisdom-100/70 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-wisdom-600 mr-1.5" />
              <span className="text-xs text-wisdom-700 font-medium">Philosophy AI</span>
            </div>
            
            <button
              onClick={clearMessages}
              className="p-2.5 text-philosopher-500 hover:text-wisdom-600 rounded-full hover:bg-wisdom-50 transition-all duration-300 hover:rotate-180 transform"
              aria-label="Start new conversation"
            >
              <RefreshCw className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
        
        {/* Messages container with scroll indicator */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-philosopher-50/30 to-transparent scroll-smooth"
        >
          {/* Message connector lines */}
          <div className="absolute left-[33px] top-28 bottom-28 w-0.5 bg-philosopher-100/20 -z-10"></div>
          
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              isLastMessage={index === messages.length - 1 && message.role === 'assistant'}
            />
          ))}
          <div ref={messagesEndRef} />
          
          {/* Scroll to bottom button */}
          {showScrollButton && (
            <button
              onClick={scrollToBottom}
              className="fixed bottom-52 right-8 bg-wisdom-500 text-white p-2.5 rounded-full shadow-lg hover:bg-wisdom-600 hover:scale-110 transition-all duration-300 z-10 animate-fade-in"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* Input area with subtle gradient */}
        <div className="p-4 bg-gradient-to-r from-philosopher-50/60 to-wisdom-50/60 border-t border-philosopher-100/50">
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default PhilosophyChatContainer;
