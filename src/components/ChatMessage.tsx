
import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../types';
import { cn } from '../lib/utils';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isLastMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLastMessage }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
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

  return (
    <div
      ref={messageRef}
      className={cn(
        "flex gap-4 p-4 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-wisdom-100 flex items-center justify-center">
          <Bot className="h-5 w-5 text-wisdom-700" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3.5 glass-panel",
          isUser ? "bg-wisdom-100 text-philosopher-800" : "bg-white border border-philosopher-100"
        )}
      >
        {isUser ? (
          <p className="text-philosopher-900">{message.content}</p>
        ) : (
          <div>
            <p className="text-philosopher-800 leading-relaxed">
              {displayedText}
              {isLastMessage && displayedText !== message.content && (
                <span className="cursor-blink ml-0.5">|</span>
              )}
            </p>
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-philosopher-100 flex items-center justify-center">
          <User className="h-5 w-5 text-philosopher-700" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
