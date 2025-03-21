
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ReportInputProps {
  onSendPrompt: (prompt: string) => void;
  isLoading: boolean;
}

const ReportInput: React.FC<ReportInputProps> = ({ onSendPrompt, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSendPrompt(prompt);
      setPrompt('');
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
  }, [prompt]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Example prompts to help users
  const examplePrompts = [
    "Analyze telehealth investment opportunities for the next 5 years",
    "Create a financial report on healthcare startups in the senior care space",
    "Forecast revenue trends for hospital groups in 2024-2025",
    "Compare profit margins across pharmacy benefit managers"
  ];

  const useExamplePrompt = (example: string) => {
    setPrompt(example);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 justify-center">
        {examplePrompts.map((example, index) => (
          <button
            key={index}
            onClick={() => useExamplePrompt(example)}
            className="text-xs px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full hover:bg-emerald-200 transition-colors"
          >
            {example}
          </button>
        ))}
      </div>
      
      <form 
        onSubmit={handleSubmit}
        className="relative flex flex-col w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-2 shadow-sm transition-all duration-200 focus-within:shadow-md"
      >
        <textarea
          ref={inputRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the healthcare financial report or analysis you need..."
          className="resize-none outline-none bg-transparent px-4 py-3 max-h-32 text-slate-800 placeholder:text-slate-400"
          disabled={isLoading}
          rows={1}
        />
        <div className="flex justify-between items-center pl-4 pr-2">
          <p className="text-xs text-slate-400">
            Shift + Enter for new line
          </p>
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="rounded-xl p-2 bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportInput;
