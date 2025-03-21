
import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ReportInput from './ReportInput';
import { useFinanceReportGenerator } from '../hooks/useFinanceReportGenerator';
import { FileText, RefreshCw, Brain, ArrowDown, ThumbsUp, ThumbsDown, DownloadIcon } from 'lucide-react';
import { toast } from 'sonner';

const FinanceReportContainer: React.FC = () => {
  const { messages, isLoading, sendPrompt, clearMessages, modelStatus } = useFinanceReportGenerator();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
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

  return (
    <div 
      className={`flex flex-col w-full max-w-4xl mx-auto h-[calc(100vh-13rem)] bg-white/30 backdrop-blur-sm rounded-3xl border border-emerald-100/50 shadow-lg overflow-hidden transition-all duration-500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Report header */}
      <div className="flex items-center justify-between p-4 border-b border-emerald-100/50 bg-emerald-50/30">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-emerald-100 text-emerald-600 transition-transform hover:scale-110 duration-300">
            <FileText className="h-5 w-5" />
          </div>
          <h2 className="font-medium text-slate-800">Healthcare Financial Reports</h2>
          
          {/* Model status indicator with improved visual feedback */}
          <div className="ml-2 flex items-center bg-white/50 px-2 py-1 rounded-full border border-emerald-100">
            <div className={`h-2 w-2 rounded-full mr-2 ${
              modelStatus.isLoading ? 'bg-yellow-400 animate-pulse' : 
              modelStatus.isLoaded ? 'bg-green-400' : 
              'bg-red-400'
            }`}></div>
            <span className="text-xs text-slate-500">
              {modelStatus.isLoading ? 'Loading Model...' : 
               modelStatus.isLoaded ? 'Model Ready' : 
               'Using Fallback'}
            </span>
          </div>
        </div>
        <button
          onClick={clearMessages}
          className="p-2 text-slate-500 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors duration-300 group"
          aria-label="Start new report"
        >
          <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>
      
      {/* Messages container with scroll indicator */}
      <div className="relative flex-1 overflow-y-auto p-4 bg-gradient-to-b from-emerald-50/30 to-transparent">
        {messages.length > 1 && (
          <div className="absolute bottom-4 right-4 z-10 p-2 bg-emerald-100 rounded-full text-emerald-700 animate-bounce cursor-pointer hover:bg-emerald-200 transition-colors duration-300" onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            <ArrowDown className="h-4 w-4" />
          </div>
        )}
        
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
                  className="p-1 bg-white rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  {expandedMessageId === message.id ? 'Less' : 'More'}
                </button>
                
                <button 
                  onClick={() => handleFeedback(true)}
                  className="p-1 bg-white rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  <ThumbsUp className="h-3 w-3" />
                </button>
                
                <button 
                  onClick={() => handleFeedback(false)}
                  className="p-1 bg-white rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  <ThumbsDown className="h-3 w-3" />
                </button>
                
                <button 
                  onClick={handleDownload}
                  className="p-1 bg-white rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  <DownloadIcon className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area with better visual feedback */}
      <div className="p-4 bg-slate-50/50 border-t border-emerald-100/50">
        <ReportInput onSendPrompt={sendPrompt} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default FinanceReportContainer;
