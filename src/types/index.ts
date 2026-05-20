export type Country = 'ecuador' | 'peru' | 'colombia';

export type OpenAIModel =
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gpt-4-turbo'
  | 'gpt-4'
  | 'gpt-3.5-turbo';

export interface AgentConfig {
  name: string;
  systemPrompt: string;
  model: OpenAIModel;
  temperature: number;
  maxTokens: number;
}

export interface AppConfig {
  apiKey: string;
  mode: 'demo' | 'agent';
  country: Country;
  agents: {
    chat: AgentConfig;
    analyst: AgentConfig;
    risk: AgentConfig;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agent?: 'chat' | 'analyst' | 'risk';
}

export interface ConversationLog {
  id: string;
  sessionId: string;
  agent: 'chat' | 'analyst' | 'risk';
  direction: 'incoming' | 'outgoing';
  message: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface ClientLog {
  id: string;
  sessionId: string;
  clientName: string;
  clientId: string;
  messages: ChatMessage[];
  status: 'active' | 'completed' | 'error';
  startTime: Date;
  endTime?: Date;
}

export interface CreditApplication {
  id: string;
  sessionId: string;
  clientName: string;
  clientId: string;
  income: number;
  employmentStatus: string;
  employmentYears: number;
  requestedAmount: number;
  purpose: string;
  creditScore?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  status: 'collecting' | 'analyzing' | 'scoring' | 'completed' | 'rejected';
  decision?: 'approved' | 'rejected' | 'pending';
  maxAmount?: number;
  interestRate?: number;
}

export type AppMode = 'demo' | 'agent';

export interface FlowStep {
  id: string;
  title: string;
  description: string;
  agent: 'chat' | 'analyst' | 'risk';
  status: 'pending' | 'active' | 'completed';
}

// Country configuration
export interface CountryConfig {
  code: Country;
  name: string;
  flag: string;
  currency: string;
  logo: string;
  logoWidth: number;
  idLabel: string;
  idExample: string;
  incomeLabel: string;
  incomeExamples: string[];
  agentName: string;
  welcomeMessage: string;
}
