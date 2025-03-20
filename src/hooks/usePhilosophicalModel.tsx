
import { useState, useEffect, useCallback } from 'react';
import { pipeline } from '@huggingface/transformers';
import { toast } from 'sonner';
import { PhilosophicalModel } from '../types';

// Use a smaller model specifically compatible with browsers
const MODEL_ID = 'Xenova/distilgpt2';  // Changed to use the Xenova namespace which has browser-optimized models

export function usePhilosophicalModel() {
  const [model, setModel] = useState<PhilosophicalModel>({
    name: MODEL_ID,
    isLoaded: false,
    isLoading: false,
    error: null
  });
  const [generator, setGenerator] = useState<any>(null);

  // Load the model
  useEffect(() => {
    async function loadModel() {
      setModel(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        console.log('Loading philosophical model from HuggingFace...');
        
        // Try to use CPU since WebGPU might not be supported in all environments
        const textGenerator = await pipeline('text-generation', MODEL_ID, { 
          quantized: true, // Use quantized models for better performance
        });
        
        setGenerator(textGenerator);
        setModel(prev => ({ 
          ...prev, 
          isLoaded: true, 
          isLoading: false 
        }));
        
        console.log('Philosophical model loaded successfully!');
        toast.success('Philosophical model loaded', {
          description: 'Ready for deep conversations'
        });
      } catch (error) {
        console.error('Failed to load model:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error loading the model';
        
        setModel(prev => ({ 
          ...prev, 
          isLoaded: false, 
          isLoading: false, 
          error: errorMessage 
        }));
        
        toast.error('Failed to load philosophical model', {
          description: 'Falling back to predefined responses'
        });
      }
    }

    loadModel();
    
    // Cleanup function
    return () => {
      console.log('Cleaning up philosophical model...');
      // Any cleanup needed for the model
    };
  }, []);

  // Generate a philosophical response
  const generateResponse = useCallback(async (prompt: string): Promise<string> => {
    if (!generator || !model.isLoaded) {
      throw new Error('Model not loaded');
    }

    try {
      // Create a philosophical prompt
      const philosophicalPrompt = `Question: ${prompt}\n\nA philosophical response:`;
      
      // Generate text
      const result = await generator(philosophicalPrompt, {
        max_new_tokens: 100, // Changed from max_length to max_new_tokens
        temperature: 0.7,
        top_p: 0.9,
        repetition_penalty: 1.2,
      });

      // Extract the generated text
      let generatedText = result[0].generated_text;
      
      // Clean up the response - remove the prompt and trim
      generatedText = generatedText.replace(philosophicalPrompt, '').trim();
      
      // Return a default if result is too short
      if (generatedText.length < 20) {
        return "As Socrates might say, wisdom begins in wonder. Perhaps we should wonder more about this question.";
      }
      
      return generatedText;
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }, [generator, model.isLoaded]);

  return {
    model,
    generateResponse
  };
}
