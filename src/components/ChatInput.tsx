
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
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
      className="relative flex flex-col w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-philosopher-100 rounded-2xl p-2 shadow-sm transition-all duration-200 focus-within:shadow-md"
    >
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a philosophical question..."
        className="resize-none outline-none bg-transparent px-4 py-3 max-h-32 text-philosopher-800 placeholder:text-philosopher-400"
        disabled={isLoading}
        rows={1}
      />
      <div className="flex justify-between items-center pl-4 pr-2">
        <p className="text-xs text-philosopher-400">
          Shift + Enter for new line
        </p>
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="rounded-xl p-2 bg-wisdom-600 text-white hover:bg-wisdom-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
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
