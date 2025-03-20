
import { useState, useCallback, useEffect } from 'react';
import { Message, MessageRole } from '../types';
import { toast } from 'sonner';
import { usePhilosophicalModel } from './usePhilosophicalModel';

// Fallback philosophical prompts when model is not available
const PHILOSOPHICAL_PROMPTS = [
  "The unexamined life is not worth living. What aspects of your existence have you reflected upon today?",
  "As Socrates would inquire, what is the nature of your question? What assumptions might we be making?",
  "Perhaps, as Kant might suggest, we should consider both the intentions and consequences of such actions.",
  "The Stoics would remind us that we cannot control external events, only our reactions to them.",
  "In the words of Simone de Beauvoir, 'One is not born, but rather becomes.' How have your experiences shaped who you are?",
  "Nietzsche might challenge us to question the very values upon which this question rests.",
  "The paradox of choice, as Kierkegaard might observe, is that with freedom comes both possibility and anxiety.",
  "To borrow from Aristotle's virtue ethics, perhaps the answer lies in the golden mean between two extremes.",
  "As Confucius taught, perhaps we should first seek harmony and balance within ourselves before looking outward.",
  "The Daoist perspective would suggest that we should align ourselves with the natural flow rather than force outcomes.",
  "Perhaps, as Heidegger might suggest, we should question our very mode of being-in-the-world as we approach this.",
  "In the spirit of Hannah Arendt, we might consider how our actions contribute to the public sphere and shared human experience.",
  "As Wittgenstein might remind us, the limits of our language mean the limits of our world. Perhaps we need new words for this conversation.",
  "Following Descartes' method of doubt, let us question everything we think we know about this subject and rebuild from certainty.",
];

// Fallback to random philosophical prompts when model fails
const getRandomPhilosophicalResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * PHILOSOPHICAL_PROMPTS.length);
  return PHILOSOPHICAL_PROMPTS[randomIndex];
};

export function usePhilosophyChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome, seeker of wisdom. I am your philosophical companion. What existential questions or philosophical inquiries shall we explore today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { model, generateResponse } = usePhilosophicalModel();

  const addMessage = useCallback((content: string, role: MessageRole) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addMessage(content, 'user');
    
    // Get AI response
    setIsLoading(true);
    setError(null);
    
    try {
      let response: string;
      
      // Try to use the HuggingFace model if loaded
      if (model.isLoaded) {
        response = await generateResponse(content);
      } else {
        // Fallback to predefined responses
        response = getRandomPhilosophicalResponse();
      }
      
      addMessage(response, 'assistant');
    } catch (err) {
      console.error('Error getting response:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      
      // Fallback to predefined philosophical responses
      const fallbackResponse = getRandomPhilosophicalResponse();
      addMessage(fallbackResponse, 'assistant');
      
      setError(errorMessage);
      toast.error('Could not process with the AI model', {
        description: 'Falling back to predefined responses',
      });
    } finally {
      setIsLoading(false);
    }
  }, [addMessage, model.isLoaded, generateResponse]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: "Welcome, seeker of wisdom. I am your philosophical companion. What existential questions or philosophical inquiries shall we explore today?",
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    modelStatus: {
      name: model.name,
      isLoaded: model.isLoaded,
      isLoading: model.isLoading,
      error: model.error
    }
  };
}
