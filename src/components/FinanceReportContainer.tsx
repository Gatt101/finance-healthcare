
import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ReportInput from './ReportInput';
import { useFinanceReportGenerator } from '../hooks/useFinanceReportGenerator';
import { FileText, RefreshCw, Brain, ArrowDown, ThumbsUp, ThumbsDown, DownloadIcon, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const FinanceReportContainer: React.FC = () => {
  const { messages, isLoading, sendPrompt, clearMessages, modelStatus } = useFinanceReportGenerator();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
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
  
  // Toggle message expansion
  const toggleMessageExpansion = (id: string) => {
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };

  // Handle feedback on reports
  const handleFeedback = (positive: boolean) => {
    toast.success(positive ? 'Feedback recorded: Helpful' : 'Feedback recorded: Needs improvement', {
      description: positive ? 'Thank you for your positive feedback!' : 'We\'ll work on improving our insights.',
    });
  };

  // Simulate report download
  const handleDownload = () => {
    toast.success('Report prepared for download', {
      description: 'Your healthcare financial report is ready.',
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className={`flex flex-col w-full max-w-4xl mx-auto h-[calc(100vh-13rem)] bg-white/40 backdrop-blur-md rounded-3xl border border-emerald-100/50 shadow-xl overflow-hidden transition-all duration-500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Report header */}
      <div className="flex items-center justify-between p-4 border-b border-emerald-100/50 bg-gradient-to-r from-emerald-50/70 to-sky-50/70">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-emerald-100 text-emerald-600 transition-transform hover:scale-110 duration-300 shadow-sm">
            <FileText className="h-5 w-5" />
          </div>
          <h2 className="font-medium text-slate-800">Healthcare Financial Reports</h2>
          
          {/* Model status indicator with improved visual feedback */}
          <div className="hidden md:flex items-center bg-white/70 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
            <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
              modelStatus.isLoading ? 'bg-yellow-400 animate-pulse' : 
              modelStatus.isLoaded ? 'bg-green-400' : 
              'bg-red-400'
            }`}></div>
            <span className="text-xs text-slate-600 font-medium">
              {modelStatus.isLoading ? 'Loading Analytics...' : 
               modelStatus.isLoaded ? 'AI Model Ready' : 
               'Using Fallback'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-emerald-100/70 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 mr-1.5" />
            <span className="text-xs text-emerald-700 font-medium">Finance AI</span>
          </div>
          
          <button
            onClick={clearMessages}
            className="p-2.5 text-slate-500 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-all duration-300 group"
            aria-label="Start new report"
          >
            <RefreshCw className="h-4.5 w-4.5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>
      
      {/* Messages container with scroll indicator */}
      <div 
        ref={containerRef} 
        className="relative flex-1 overflow-y-auto p-4 bg-gradient-to-b from-emerald-50/30 to-transparent"
      >
        {messages.map((message, index) => (
          <div key={message.id} className="relative group">
            <ChatMessage 
              message={message} 
              isLastMessage={index === messages.length - 1 && message.role === 'assistant'}
            />
            
            {/* Interactive controls for assistant messages */}
            {message.role === 'assistant' && index > 0 && (
              <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => toggleMessageExpansion(message.id)}
                  className="p-1.5 bg-white/90 rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-300 shadow-sm"
                >
                  {expandedMessageId === message.id ? 'Less' : 'More'}
                </button>
                
                <button 
                  onClick={() => handleFeedback(true)}
                  className="p-1.5 bg-white/90 rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-300 shadow-sm"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </button>
                
                <button 
                  onClick={() => handleFeedback(false)}
                  className="p-1.5 bg-white/90 rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-300 shadow-sm"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </button>
                
                <button 
                  onClick={handleDownload}
                  className="p-1.5 bg-white/90 rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-300 shadow-sm"
                >
                  <DownloadIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
        
        <div ref={messagesEndRef} />
        
        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-52 right-8 bg-emerald-500 text-white p-2.5 rounded-full shadow-lg hover:bg-emerald-600 hover:scale-110 transition-all duration-300 z-10 animate-fade-in"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Input area with better visual feedback */}
      <div className="p-4 bg-gradient-to-r from-emerald-50/50 to-sky-50/50 border-t border-emerald-100/50">
        <ReportInput onSendPrompt={sendPrompt} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default FinanceReportContainer;
