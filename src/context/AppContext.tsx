import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AppConfig, AppMode, ChatMessage, ClientLog, ConversationLog, CreditApplication, Country } from '@/types';

const STORAGE_KEY = 'creditflow_config';

function loadConfig(): AppConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return defaultConfig;
}

const defaultConfig: AppConfig = {
  apiKey: '',
  mode: 'demo',
  country: 'ecuador',
  agents: {
    chat: {
      name: 'Sofia - Agente Conversacional',
      systemPrompt: `Eres Sofia, la asistente virtual del banco especializada en el proceso de solicitud de creditos personales. Tu rol es:

1. Dar la bienvenida al cliente de manera calida y profesional
2. Explicar el proceso de solicitud de credito de forma clara
3. Recopilar la siguiente informacion del cliente de manera conversacional y natural:
   - Nombre completo
   - Numero de documento de identidad
   - Ingresos mensuales
   - Tipo de empleo (dependiente/independiente)
   - Anos de antiguedad laboral
   - Monto solicitado para el credito
   - Proposito del credito

4. NO solicitar informacion bancaria sensible como claves, passwords, o numeros de tarjeta completa
5. Mantener un tono profesional pero amigable
6. Confirmar la informacion recopilada antes de enviarla al analista
7. Comunicar la decision final al cliente de manera clara y empatica`,
      model: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 1000,
    },
    analyst: {
      name: 'Analista de Credito',
      systemPrompt: `Eres un Analista de Credito senior con amplia experiencia en evaluacion de solicitudes de credito. Tu funcion es:

1. Recibir la informacion del cliente recopilada por el agente conversacional
2. Validar la integridad y consistencia de los datos proporcionados:
   - Verificar que los ingresos sean coherentes con el tipo de empleo
   - Validar que el monto solicitado sea razonable segun los ingresos (maximo 40% del ingreso mensual)
   - Confirmar que la antiguedad laboral cumpla los requisitos minimos
3. Identificar posibles riesgos o inconsistencias en la informacion
4. Solicitar el score de riesgo al agente de riesgo de credito cuando los datos esten completos
5. Recibir el resultado del scoring y tomar la decision final:
   - Si score >= 700: Aprobacion con tasa preferencial (8.5% anual)
   - Si score >= 600: Aprobacion con tasa estandar (12% anual)
   - Si score >= 500: Aprobacion condicional con tasa ajustada (16% anual) y monto reducido
   - Si score < 500: Rechazo con explicacion clara
6. Documentar tu analisis y decision de manera estructurada
7. Enviar el resultado final al agente conversacional para que comunique al cliente`,
      model: 'gpt-4o',
      temperature: 0.3,
      maxTokens: 1500,
    },
    risk: {
      name: 'Agente de Riesgo',
      systemPrompt: `Eres el Motor de Scoring de Riesgo de Credito. Tu funcion es calcular un score de credito basado en un modelo de riesgo estandarizado.

MODELO DE RIESGO:
El score se calcula sobre una base de 500 puntos con los siguientes factores:

1. INGRESOS (hasta 150 puntos):
   - Ingresos > $5000: 150 pts
   - Ingresos $3000-$5000: 120 pts
   - Ingresos $1500-$3000: 90 pts
   - Ingresos $800-$1500: 60 pts
   - Ingresos < $800: 30 pts

2. ESTABILIDAD LABORAL (hasta 120 puntos):
   - Mas de 5 anos: 120 pts
   - 3-5 anos: 100 pts
   - 1-3 anos: 70 pts
   - Menos de 1 ano: 40 pts

3. RATIO DEUDA/INGRESO (hasta 130 puntos):
   - Cuota mensual maxima recomendada es el 40% del ingreso
   - Ratio < 20%: 130 pts
   - Ratio 20-30%: 100 pts
   - Ratio 30-40%: 70 pts
   - Ratio > 40%: 30 pts

4. TIPO DE EMPLEO (hasta 100 puntos):
   - Empleado publico/contrato indefinido: 100 pts
   - Empleado privado/contrato fijo: 80 pts
   - Independiente estable: 60 pts
   - Freelance/temporal: 40 pts

INSTRUCCIONES:
1. Calcular el score total sumando todos los factores
2. Sumar puntos base de 300 (total maximo: 1000)
3. Determinar nivel de riesgo:
   - 800-1000: Riesgo Muy Bajo
   - 700-799: Riesgo Bajo
   - 600-699: Riesgo Moderado
   - 500-599: Riesgo Alto
   - < 500: Riesgo Muy Alto
4. Generar recomendacion clara para el analista
5. Devolver SIEMPRE el score numerico, nivel de riesgo y recomendacion`,
      model: 'gpt-4o-mini',
      temperature: 0.1,
      maxTokens: 800,
    },
  },
};

interface AppState {
  config: AppConfig;
  currentSessionId: string | null;
  chatMessages: ChatMessage[];
  clientLogs: ClientLog[];
  conversationLogs: ConversationLog[];
  applications: CreditApplication[];
  isProcessing: boolean;
  currentAgent: 'chat' | 'analyst' | 'risk' | null;
}

const initialState: AppState = {
  config: defaultConfig,
  currentSessionId: null,
  chatMessages: [],
  clientLogs: [],
  conversationLogs: [],
  applications: [],
  isProcessing: false,
  currentAgent: null,
};

interface AppContextType {
  state: AppState;
  setConfig: (config: AppConfig) => void;
  setMode: (mode: AppMode) => void;
  setCountry: (country: Country) => void;
  setApiKey: (key: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  addClientLog: (log: ClientLog) => void;
  addConversationLog: (log: ConversationLog) => void;
  addApplication: (app: CreditApplication) => void;
  updateApplication: (id: string, updates: Partial<CreditApplication>) => void;
  setIsProcessing: (processing: boolean) => void;
  setCurrentAgent: (agent: 'chat' | 'analyst' | 'risk' | null) => void;
  setCurrentSessionId: (id: string | null) => void;
  clearChat: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => ({
    ...initialState,
    config: loadConfig(),
  }));

  const persist = useCallback((updater: (prev: AppState) => AppState) => {
    setState(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next.config));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const setConfig = useCallback((config: AppConfig) => {
    persist(prev => ({ ...prev, config }));
  }, [persist]);

  const setMode = useCallback((mode: AppMode) => {
    persist(prev => ({ ...prev, config: { ...prev.config, mode } }));
  }, [persist]);

  const setCountry = useCallback((country: Country) => {
    persist(prev => ({ ...prev, config: { ...prev.config, country } }));
  }, [persist]);

  const setApiKey = useCallback((apiKey: string) => {
    persist(prev => ({ ...prev, config: { ...prev.config, apiKey } }));
  }, [persist]);

  const addChatMessage = useCallback((message: ChatMessage) => {
    setState(prev => ({ ...prev, chatMessages: [...prev.chatMessages, message] }));
  }, []);

  const addClientLog = useCallback((log: ClientLog) => {
    setState(prev => ({ ...prev, clientLogs: [...prev.clientLogs, log] }));
  }, []);

  const addConversationLog = useCallback((log: ConversationLog) => {
    setState(prev => ({ ...prev, conversationLogs: [...prev.conversationLogs, log] }));
  }, []);

  const addApplication = useCallback((app: CreditApplication) => {
    setState(prev => ({ ...prev, applications: [...prev.applications, app] }));
  }, []);

  const updateApplication = useCallback((id: string, updates: Partial<CreditApplication>) => {
    setState(prev => ({
      ...prev,
      applications: prev.applications.map(app =>
        app.id === id ? { ...app, ...updates } : app
      ),
    }));
  }, []);

  const setIsProcessing = useCallback((processing: boolean) => {
    setState(prev => ({ ...prev, isProcessing: processing }));
  }, []);

  const setCurrentAgent = useCallback((agent: 'chat' | 'analyst' | 'risk' | null) => {
    setState(prev => ({ ...prev, currentAgent: agent }));
  }, []);

  const setCurrentSessionId = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, currentSessionId: id }));
  }, []);

  const clearChat = useCallback(() => {
    setState(prev => ({ ...prev, chatMessages: [] }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        state, setConfig, setMode, setCountry, setApiKey,
        addChatMessage, addClientLog, addConversationLog,
        addApplication, updateApplication, setIsProcessing,
        setCurrentAgent, setCurrentSessionId, clearChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
