
import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { usePhilosophyChat } from '../hooks/usePhilosophyChat';
import { MessageSquare, RefreshCw, Brain, ArrowDown } from 'lucide-react';

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
    <div 
      className={`flex flex-col w-full max-w-4xl mx-auto h-[calc(100vh-13rem)] bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-sm rounded-3xl border border-philosopher-100/50 shadow-lg overflow-hidden transition-all duration-1000 ${
        fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Chat header with animated gradient */}
      <div className="flex items-center justify-between p-4 border-b border-philosopher-100/50 bg-gradient-to-r from-wisdom-50 to-philosopher-50 animate-pulse-subtle">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-wisdom-100 text-wisdom-600 animate-float">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h2 className="font-medium text-philosopher-800">Philosophical Dialogue</h2>
          
          {/* Model status indicator with improved visual feedback */}
          <div className="ml-2 flex items-center bg-white/50 px-2 py-1 rounded-full border border-philosopher-100 hover-lift">
            <div className={`h-2 w-2 rounded-full mr-2 ${
              modelStatus.isLoading ? 'bg-yellow-400 animate-pulse' : 
              modelStatus.isLoaded ? 'bg-green-400' : 
              'bg-red-400'
            }`}></div>
            <span className="text-xs text-philosopher-500">
              {modelStatus.isLoading ? 'Loading Model...' : 
               modelStatus.isLoaded ? 'Model Ready' : 
               'Using Fallback'}
            </span>
          </div>
        </div>
        <button
          onClick={clearMessages}
          className="p-2 text-philosopher-500 hover:text-philosopher-700 rounded-full hover:bg-philosopher-50 transition-all duration-300 hover:rotate-180 transform"
          aria-label="Start new conversation"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      
      {/* Messages container with scroll indicator */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-philosopher-50/30 to-transparent scroll-smooth"
      >
        {/* Subtle message connector lines */}
        <div className="absolute left-[33px] top-24 bottom-28 w-0.5 bg-philosopher-100/20 -z-10"></div>
        
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
            className="fixed bottom-48 right-8 bg-wisdom-500 text-white p-2 rounded-full shadow-lg hover:bg-wisdom-600 hover:scale-110 transition-all duration-300 z-10 animate-fade-in"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Input area with subtle gradient */}
      <div className="p-4 bg-gradient-to-r from-philosopher-50/50 to-wisdom-50/50 border-t border-philosopher-100/50">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default PhilosophyChatContainer;
