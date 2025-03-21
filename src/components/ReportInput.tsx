
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Lightbulb, Sparkles } from 'lucide-react';

interface ReportInputProps {
  onSendPrompt: (prompt: string) => void;
  isLoading: boolean;
}

const ReportInput: React.FC<ReportInputProps> = ({ onSendPrompt, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activePrompt, setActivePrompt] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSendPrompt(prompt);
      setPrompt('');
      setActivePrompt(null);
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

  const useExamplePrompt = (example: string, index: number) => {
    setPrompt(example);
    setActivePrompt(index);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="flex items-center gap-1 text-emerald-700 mb-2 text-sm">
          <Lightbulb className="h-4 w-4" />
          <span>Try these examples:</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center animate-fade-in">
        {examplePrompts.map((example, index) => (
          <button
            key={index}
            onClick={() => useExamplePrompt(example, index)}
            className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 transform hover:scale-105 ${
              activePrompt === index 
                ? 'bg-emerald-500 text-white shadow-md' 
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
          >
            {activePrompt === index && <Sparkles className="h-3 w-3 inline mr-1" />}
            {example}
          </button>
        ))}
      </div>
      
      <form 
        onSubmit={handleSubmit}
        className={`relative flex flex-col w-full max-w-4xl mx-auto backdrop-blur-sm rounded-2xl p-2 shadow-sm transition-all duration-300 ${
          isFocused 
            ? 'bg-white shadow-md border border-emerald-300' 
            : 'bg-white/80 border border-emerald-100'
        }`}
      >
        <textarea
          ref={inputRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Describe the healthcare financial report or analysis you need..."
          className="resize-none outline-none bg-transparent px-4 py-3 max-h-32 text-slate-800 placeholder:text-slate-400 transition-colors"
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
            className={`rounded-xl p-2 text-white transition-all duration-300 flex items-center justify-center ${
              !prompt.trim() 
                ? 'bg-slate-300 cursor-not-allowed' 
                : isLoading 
                  ? 'bg-emerald-400 animate-pulse' 
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-md'
            }`}
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
