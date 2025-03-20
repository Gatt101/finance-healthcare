
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface PhilosophicalModel {
  name: string;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}
