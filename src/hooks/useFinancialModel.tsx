
import { useState, useEffect, useCallback } from 'react';
import { pipeline } from '@huggingface/transformers';  // Using the newer package
import { toast } from 'sonner';
import { FinancialModel } from '../types';

// Use a smaller, browser-compatible model
const MODEL_ID = 'Xenova/distilgpt2';

export function useFinancialModel() {
  const [model, setModel] = useState<FinancialModel>({
    name: MODEL_ID,
    isLoaded: false,
    isLoading: false,
    error: null
  });
  const [generator, setGenerator] = useState<any>(null);

  // Load the model
  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted components

    async function loadModel() {
      setModel(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        console.log('Loading financial analysis model...');
        
        // Load the model using transformers pipeline
        const textGenerator = await pipeline('text-generation', MODEL_ID);
        
        if (isMounted) {
          setGenerator(() => textGenerator); // Store the generator
          setModel(prev => ({
            ...prev,
            isLoaded: true,
            isLoading: false
          }));
          
          console.log('Financial analysis model loaded successfully!');
          toast.success('Financial analysis model loaded', {
            description: 'Ready to generate healthcare financial reports'
          });
        }
      } catch (error) {
        console.error('Failed to load model:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error loading the model';
        
        if (isMounted) {
          setModel(prev => ({
            ...prev,
            isLoaded: false,
            isLoading: false,
            error: errorMessage
          }));
          
          toast.error('Failed to load financial analysis model', {
            description: 'Falling back to predefined financial insights'
          });
        }
      }
    }

    loadModel();

    // Cleanup function
    return () => {
      isMounted = false; // Prevent updates if unmounted
      console.log('Cleaning up financial analysis model...');
    };
  }, []);

  // Generate a financial report
  const generateReport = useCallback(async (prompt: string): Promise<string> => {
    if (!generator || !model.isLoaded) {
      throw new Error('Model not loaded');
    }

    try {
      // Create a healthcare finance-specific prompt
      const financialPrompt = `Healthcare Financial Analysis Request: ${prompt}\n\nDetailed Financial Report including market trends, projections, and investment recommendations:`;

      // Generate text
      const result = await generator(financialPrompt, {
        max_new_tokens: 300, // Increased token count for more detailed reports
        temperature: 0.6, // Slightly reduced for more factual outputs
        top_p: 0.9,
        repetition_penalty: 1.2,
      });

      // Extract the generated text
      let generatedText = result[0].generated_text;

      // Clean up the response - remove the prompt and trim
      generatedText = generatedText.replace(financialPrompt, '').trim();

      // Return a default if result is too short
      if (generatedText.length < 50) {
        return "Based on current healthcare market indicators, we recommend maintaining a diversified portfolio with emphasis on telemedicine and healthcare technology sectors. Further analysis needed for specific investment strategies.";
      }

      return generatedText;
    } catch (error) {
      console.error('Error generating financial report:', error);
      throw error;
    }
  }, [generator, model.isLoaded]);

  return {
    model,
    generateReport
  };
}
