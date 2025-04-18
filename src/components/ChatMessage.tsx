
import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../types';
import { cn } from '../lib/utils';
import { User, Brain, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ChatMessageProps {
  message: Message;
  isLastMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLastMessage }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  
  useEffect(() => {
    // Intersection observer for fade-in animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (messageRef.current) {
      observer.observe(messageRef.current);
    }
    
    // Text animation for assistant messages
    if (!isUser && isLastMessage) {
      let index = 0;
      const textContent = message.content;
      const timer = setInterval(() => {
        if (index < textContent.length) {
          setDisplayedText(textContent.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 20);
      
      return () => clearInterval(timer);
    } else if (!isUser) {
      setDisplayedText(message.content);
    }
    
    return () => {
      if (messageRef.current) {
        observer.unobserve(messageRef.current);
      }
    };
  }, [message.content, isUser, isLastMessage]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success("Message copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={messageRef}
      className={cn(
        "flex gap-4 p-4 group transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-wisdom-100 to-wisdom-300 flex items-center justify-center shadow-md transform hover:scale-110 transition-transform duration-300">
          <Brain className="h-5 w-5 text-wisdom-700" />
        </div>
      )}
      
      <div
        className={cn(
          "relative max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md transition-all duration-300",
          isUser 
            ? "bg-gradient-to-r from-wisdom-100 to-wisdom-200 text-philosopher-800 hover:-translate-y-0.5" 
            : "bg-white/95 backdrop-blur-sm border border-philosopher-100/50 hover:-translate-y-0.5"
        )}
      >
        {isUser ? (
          <p className="text-philosopher-900 leading-relaxed">{message.content}</p>
        ) : (
          <div className="relative">
            <p className="text-philosopher-800 leading-relaxed">
              {displayedText}
              {isLastMessage && displayedText !== message.content && (
                <span className="cursor-blink ml-0.5">|</span>
              )}
            </p>
            
            {!isLastMessage && (
              <button 
                onClick={copyToClipboard}
                className="absolute -top-1 -right-1 p-1.5 rounded-full bg-white border border-philosopher-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-philosopher-500 hover:text-wisdom-600 hover:border-wisdom-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-philosopher-100 to-philosopher-300 flex items-center justify-center shadow-md transform hover:scale-110 transition-transform duration-300">
          <User className="h-5 w-5 text-philosopher-700" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
