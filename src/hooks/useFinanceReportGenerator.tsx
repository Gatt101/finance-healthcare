
import { useState, useCallback, useEffect } from 'react';
import { Message, MessageRole } from '../types';
import { toast } from 'sonner';
import { useFinancialModel } from './useFinancialModel';

// Fallback financial insights when model is not available
const FINANCIAL_FALLBACKS = [
  "Based on Q2 healthcare industry analysis, telemedicine providers show 18% YoY growth, suggesting continued investment potential with 3-5 year horizons.",
  "Healthcare equipment manufacturers face supply chain challenges, but those with diversified production have maintained 7% EBITDA growth. Consider targeted investments in this subsector.",
  "Digital health startups with FDA-approved solutions are attracting 2.3x more VC funding compared to last year. Early-stage investments may yield 15-20% returns.",
  "Hospital management companies show steady 4% revenue growth despite labor shortages. Recommend portfolio allocation of 8-12% for income-focused investors.",
  "Healthcare AI implementation is projected to reduce operational costs by 15-20% over 3 years. Companies leading in this space present strong short-term growth opportunities.",
  "Pharmaceutical companies focused on chronic disease management maintain 11% gross margin advantage over broader market. These represent lower-volatility healthcare investments.",
  "Medical device manufacturers with recurring revenue models show 22% higher valuation multiples than one-time sales models. Restructure positions to favor subscription-based providers.",
  "Healthcare REITs offer 5.8% average dividend yields with 3.2% projected annual growth, positioning them as strong defensive assets in uncertain market conditions.",
  "Biotech firms with phase 3 trials expected in next 6 months present asymmetric risk-reward profiles. Consider small positions across 5-7 companies for diversification.",
  "Value-based care providers are experiencing 13% patient growth and 9% revenue growth. These represent strong mid-cap investment opportunities in the current healthcare landscape.",
];

// Fallback to random financial insights when model fails
const getRandomFinancialFallback = (): string => {
  const randomIndex = Math.floor(Math.random() * FINANCIAL_FALLBACKS.length);
  return FINANCIAL_FALLBACKS[randomIndex];
};

export function useFinanceReportGenerator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-message',
      content: "Welcome to Healthcare Financial Insights. I can generate detailed financial reports, market trends analysis, and investment recommendations specific to the healthcare sector. What would you like to analyze today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { model, generateReport } = useFinancialModel();

  const addMessage = useCallback((content: string, role: MessageRole) => {
    const newMessage: Message = {
      id: `${role}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content,
      role,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendPrompt = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addMessage(content, 'user');
    
    // Get financial report response
    setIsLoading(true);
    setError(null);
    
    try {
      let response: string;
      
      // Try to use the model if loaded
      if (model.isLoaded) {
        response = await generateReport(content);
      } else {
        // Fallback to predefined responses
        response = getRandomFinancialFallback();
      }
      
      addMessage(response, 'assistant');
    } catch (err) {
      console.error('Error getting financial report:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      
      // Fallback to predefined financial responses
      const fallbackResponse = getRandomFinancialFallback();
      addMessage(fallbackResponse, 'assistant');
      
      setError(errorMessage);
      toast.error('Could not process with the AI model', {
        description: 'Falling back to predefined financial insights',
      });
    } finally {
      setIsLoading(false);
    }
  }, [addMessage, model.isLoaded, generateReport]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: 'welcome-message',
        content: "Welcome to Healthcare Financial Insights. I can generate detailed financial reports, market trends analysis, and investment recommendations specific to the healthcare sector. What would you like to analyze today?",
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendPrompt,
    clearMessages,
    modelStatus: {
      name: model.name,
      isLoaded: model.isLoaded,
      isLoading: model.isLoading,
      error: model.error
    }
  };
}
