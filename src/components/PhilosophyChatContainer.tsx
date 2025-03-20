
import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { usePhilosophyChat } from '../hooks/usePhilosophyChat';
import { MessageSquare, RefreshCw, Brain } from 'lucide-react';

const PhilosophyChatContainer: React.FC = () => {
  const { messages, isLoading, sendMessage, clearMessages, modelStatus } = usePhilosophyChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto h-[calc(100vh-13rem)] bg-white/30 backdrop-blur-sm rounded-3xl border border-philosopher-100/50 shadow-lg overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-philosopher-100/50">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-wisdom-600" />
          <h2 className="font-medium text-philosopher-800">Philosophical Dialogue</h2>
          
          {/* Model status indicator */}
          <div className="ml-2 flex items-center">
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
          className="p-2 text-philosopher-500 hover:text-philosopher-700 rounded-full hover:bg-philosopher-50 transition-colors"
          aria-label="Start new conversation"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-philosopher-50/30 to-transparent">
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isLastMessage={index === messages.length - 1 && message.role === 'assistant'}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 bg-philosopher-50/50 border-t border-philosopher-100/50">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default PhilosophyChatContainer;
