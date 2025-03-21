
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageSquare } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative flex flex-col w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border rounded-2xl p-2 shadow-sm transition-all duration-300 ${
        isFocused 
          ? 'border-wisdom-400 shadow-md scale-[1.01]' 
          : 'border-philosopher-100 hover:border-wisdom-300'
      }`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-3 ml-2">
          <MessageSquare className={`h-5 w-5 ${isFocused ? 'text-wisdom-600' : 'text-philosopher-400'} transition-colors duration-300`} />
        </div>
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask a philosophical question..."
          className="resize-none outline-none bg-transparent flex-1 px-4 py-3 max-h-32 text-philosopher-800 placeholder:text-philosopher-400"
          disabled={isLoading}
          rows={1}
        />
      </div>
      <div className="flex justify-between items-center pl-4 pr-2">
        <p className="text-xs text-philosopher-400">
          Shift + Enter for new line
        </p>
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`rounded-xl p-2 ${
            message.trim() && !isLoading 
              ? 'bg-gradient-to-r from-wisdom-500 to-wisdom-600 hover:from-wisdom-600 hover:to-wisdom-700' 
              : 'bg-philosopher-200'
          } text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center transform hover:scale-105 active:scale-95`}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
