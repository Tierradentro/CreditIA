import { useState, useCallback, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import type { ChatMessage, CreditApplication, Country } from '@/types';
import { COUNTRIES } from '@/lib/countries';

let idCounter = 0;
function genId() {
  return `msg_${++idCounter}_${Date.now()}`;
}

// ====== COUNTRY-SPECIFIC DEMO PROFILES ======
interface Profile {
  clientName: string; clientId: string; income: number;
  employmentStatus: string; employmentYears: number; requestedAmount: number;
  purpose: string; creditScore: number; riskLevel: string;
  decision: 'approved' | 'rejected'; interestRate: number; maxAmount: number;
  flowIndex: number;
}

const PROFILES: Record<Country, Profile[]> = {
  ecuador: [
    { clientName: 'Juan Carlos Mendez', clientId: '0912345678', income: 3500,
      employmentStatus: 'Dependiente', employmentYears: 4, requestedAmount: 15000,
      purpose: 'Vehiculo', creditScore: 720, riskLevel: 'Bajo', decision: 'approved',
      interestRate: 12, maxAmount: 15000, flowIndex: 0 },
    { clientName: 'Maria Fernanda Lopez', clientId: '0987654321', income: 6000,
      employmentStatus: 'Dependiente (contrato indefinido)', employmentYears: 8, requestedAmount: 20000,
      purpose: 'Vivienda', creditScore: 900, riskLevel: 'Muy Bajo', decision: 'approved',
      interestRate: 8.5, maxAmount: 20000, flowIndex: 1 },
    { clientName: 'Pedro Antonio Ruiz', clientId: '0923456789', income: 900,
      employmentStatus: 'Freelance', employmentYears: 0.5, requestedAmount: 10000,
      purpose: 'Negocio', creditScore: 440, riskLevel: 'Muy Alto', decision: 'rejected',
      interestRate: 0, maxAmount: 0, flowIndex: 2 },
  ],
  peru: [
    { clientName: 'Luis Alberto Quispe', clientId: '45678912', income: 4500,
      employmentStatus: 'Dependiente', employmentYears: 5, requestedAmount: 25000,
      purpose: 'Vivienda', creditScore: 750, riskLevel: 'Bajo', decision: 'approved',
      interestRate: 11, maxAmount: 25000, flowIndex: 0 },
    { clientName: 'Carmen Rosa Flores', clientId: '78945612', income: 8500,
      employmentStatus: 'Empleada publica', employmentYears: 10, requestedAmount: 35000,
      purpose: 'Vehiculo', creditScore: 920, riskLevel: 'Muy Bajo', decision: 'approved',
      interestRate: 8.5, maxAmount: 35000, flowIndex: 1 },
    { clientName: 'Jose Miguel Castro', clientId: '12345678', income: 1200,
      employmentStatus: 'Freelance', employmentYears: 0.5, requestedAmount: 15000,
      purpose: 'Educacion', creditScore: 410, riskLevel: 'Muy Alto', decision: 'rejected',
      interestRate: 0, maxAmount: 0, flowIndex: 2 },
  ],
  colombia: [
    { clientName: 'Andres Felipe Gutierrez', clientId: '1034567890', income: 5500000,
      employmentStatus: 'Dependiente', employmentYears: 3, requestedAmount: 45000000,
      purpose: 'Vehiculo', creditScore: 680, riskLevel: 'Moderado', decision: 'approved',
      interestRate: 13, maxAmount: 45000000, flowIndex: 0 },
    { clientName: 'Diana Patricia Morales', clientId: '1098765432', income: 8500000,
      employmentStatus: 'Independiente', employmentYears: 6, requestedAmount: 60000000,
      purpose: 'Vivienda', creditScore: 820, riskLevel: 'Bajo', decision: 'approved',
      interestRate: 9.5, maxAmount: 60000000, flowIndex: 1 },
    { clientName: 'Carlos Eduardo Vargas', clientId: '1076543210', income: 1800000,
      employmentStatus: 'Freelance', employmentYears: 1, requestedAmount: 50000000,
      purpose: 'Negocio', creditScore: 480, riskLevel: 'Alto', decision: 'rejected',
      interestRate: 0, maxAmount: 0, flowIndex: 2 },
  ],
};

// Quick replies per country
const QR_BY_COUNTRY: Record<Country, Record<string, string[]>> = {
  ecuador: {
    nombre: ['Juan Carlos Mendez', 'Maria Fernanda Lopez', 'Pedro Antonio Ruiz', 'Ana Lucia Torres'],
    cedula: ['0912345678', '0987654321', '0923456789', '0998765432'],
    ingresos: ['$4,500', '$3,500', '$6,000', '$2,800'],
    empleo: ['Empleado dependiente', 'Independiente', 'Freelance'],
    antiguedad: ['5 años', '3 años', '8 años', '1 año'],
    monto: ['$15,000', '$20,000', '$10,000', '$25,000'],
    proposito: ['Vehiculo', 'Vivienda', 'Educacion', 'Negocio'],
  },
  peru: {
    nombre: ['Luis Alberto Quispe', 'Carmen Rosa Flores', 'Jose Miguel Castro', 'Rosa Maria Huaman'],
    cedula: ['45678912', '78945612', '12345678', '98765432'],
    ingresos: ['S/ 4,500', 'S/ 3,500', 'S/ 6,000', 'S/ 2,800'],
    empleo: ['Empleado dependiente', 'Independiente', 'Freelance'],
    antiguedad: ['5 años', '3 años', '8 años', '1 año'],
    monto: ['S/ 25,000', 'S/ 35,000', 'S/ 15,000', 'S/ 50,000'],
    proposito: ['Vivienda', 'Vehiculo', 'Educacion', 'Negocio'],
  },
  colombia: {
    nombre: ['Andres Felipe Gutierrez', 'Diana Patricia Morales', 'Carlos Eduardo Vargas', 'Luisa Fernanda Castillo'],
    cedula: ['1034567890', '1098765432', '1076543210', '1056789012'],
    ingresos: ['$ 5.500.000', '$ 3.500.000', '$ 8.500.000', '$ 2.800.000'],
    empleo: ['Empleado dependiente', 'Independiente', 'Freelance'],
    antiguedad: ['5 años', '3 años', '8 años', '1 año'],
    monto: ['$ 45.000.000', '$ 60.000.000', '$ 25.000.000', '$ 80.000.000'],
    proposito: ['Vehiculo', 'Vivienda', 'Educacion', 'Negocio'],
  },
};

const FL: Record<string, string> = {
  nombre: 'Nombre', cedula: 'Documento', ingresos: 'Ingresos',
  empleo: 'Empleo', antiguedad: 'Antigüedad', monto: 'Monto', proposito: 'Proposito',
};

// ====== RETURN TYPE ======
export interface UseChatReturn {
  messages: ChatMessage[];
  isTyping: boolean;
  currentAgent: 'chat' | 'analyst' | 'risk' | null;
  currentField: string | null;
  quickReplies: string[];
  showQuickReplies: boolean;
  isProcessing: boolean;
  sendMessage: (content: string) => void;
  startNewChat: () => void;
  application: CreditApplication | null;
}

// ====== HOOK ======
export function useChat(): UseChatReturn {
  const ctx = useApp();
  const country = ctx.state.config.country;
  const countryConfig = COUNTRIES[country];

  const flowIx = useRef(0);
  const prof = useRef<Profile>(PROFILES[country][0]);
  const stepIx = useRef(0);

  const [msgs, setMsgs] = useState<ChatMessage[]>(() => {
    const greeting: ChatMessage = {
      id: genId(), role: 'assistant',
      content: `${countryConfig.welcomeMessage}\n\nTe ayudare a completar tu solicitud de manera rapida y sencilla.\n\nPara comenzar, podrias indicarme tu nombre completo?`,
      timestamp: new Date(), agent: 'chat',
    };
    return [greeting];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [cAgent, setCAgent] = useState<'chat' | 'analyst' | 'risk' | null>('chat');
  const [cField, setCField] = useState<string | null>('nombre');
  const [cQR, setCQR] = useState<string[]>(QR_BY_COUNTRY[country]['nombre']);
  const [showQR, setShowQR] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [app, setApp] = useState<CreditApplication | null>(null);

  const addMsg = (msg: ChatMessage) => {
    setMsgs(prev => [...prev, msg]);
    ctx.addChatMessage(msg);
    ctx.addConversationLog({
      id: genId(), sessionId: ctx.state.currentSessionId || 'default',
      agent: msg.agent || 'chat', direction: msg.role === 'user' ? 'incoming' : 'outgoing',
      message: msg.content, timestamp: new Date(), metadata: { agent: msg.agent },
    });
  };

  const sendBot = (content: string, agent: 'chat' | 'analyst' | 'risk', delay: number) => {
    setIsTyping(true);
    setCAgent(agent);
    if (agent !== 'chat') setIsProcessing(true);
    setShowQR(false);
    return new Promise<void>(resolve => {
      setTimeout(() => {
        addMsg({ id: genId(), role: 'assistant', content, timestamp: new Date(), agent });
        setIsTyping(false);
        if (agent !== 'chat') setIsProcessing(false);
        resolve();
      }, delay);
    });
  };

  const chatQuestions = [
    (name: string) => `Mucho gusto ${name}! Ahora necesito tu numero de ${countryConfig.idLabel.toLowerCase()} para continuar con el proceso.`,
    () => `Perfecto. Cual es tu ${countryConfig.incomeLabel.toLowerCase()}?`,
    () => 'Entendido. Trabajas como empleado dependiente, independiente o eres freelancer?',
    () => 'Cuantos años llevas en tu empleo actual o en tu actividad independiente?',
    () => 'Que monto deseas solicitar para tu credito?',
    () => 'Cual es el proposito del credito? (vivienda, vehiculo, educacion, negocio, etc.)',
    () => 'Gracias! He recopilado toda tu informacion. Voy a enviarla a nuestro analista de credito para evaluacion. Un momento por favor...',
  ];

  const runBackOffice = async (p: Profile) => {
    const ratio = (p.requestedAmount / 12 / p.income) * 100;
    const incomePts = p.income >= 5000 ? 150 : p.income >= 3000 ? 120 : p.income >= 1500 ? 90 : p.income >= 800 ? 60 : 30;
    const stabPts = p.employmentYears >= 5 ? 120 : p.employmentYears >= 3 ? 100 : p.employmentYears >= 1 ? 70 : 40;
    const ratioPts = ratio < 20 ? 130 : ratio < 30 ? 100 : ratio < 40 ? 70 : 30;
    const empPts = p.employmentStatus.toLowerCase().includes('indefinido') || p.employmentStatus.toLowerCase().includes('publica') ? 100 : p.employmentStatus.toLowerCase().includes('dependiente') ? 80 : 60;

    const application: CreditApplication = {
      id: genId(), sessionId: ctx.state.currentSessionId || genId(),
      clientName: p.clientName, clientId: p.clientId, income: p.income,
      employmentStatus: p.employmentStatus, employmentYears: p.employmentYears,
      requestedAmount: p.requestedAmount, purpose: p.purpose, status: 'analyzing',
    };
    setApp(application);
    ctx.addApplication(application);

    await sendBot(`Estamos analizando tu informacion financiera. Nuestro analista esta revisando los datos...`, 'chat', 1000);

    const approvedChecks = p.decision === 'approved'
      ? '- Monto dentro del rango aceptable\n- Antigüedad laboral cumple requisito'
      : '- Ingresos bajos para el monto\n- Antigüedad laboral insuficiente';
    await sendBot(
      `ANALISIS DEL ANALISTA:\n\nDatos:\n- Cliente: ${p.clientName}\n- ${countryConfig.idLabel}: ${p.clientId}\n- ${countryConfig.incomeLabel}: ${country === 'colombia' ? `$ ${p.income.toLocaleString('es-CO')}` : country === 'peru' ? `S/ ${p.income.toLocaleString()}` : `$${p.income.toLocaleString()}`}\n- Empleo: ${p.employmentStatus}, ${p.employmentYears} años\n- Monto: ${country === 'colombia' ? `$ ${p.requestedAmount.toLocaleString('es-CO')}` : country === 'peru' ? `S/ ${p.requestedAmount.toLocaleString()}` : `$${p.requestedAmount.toLocaleString()}`}\n- Proposito: ${p.purpose}\n\nValidacion:\n- Ingresos consistentes\n${approvedChecks}\n\nSolicitando score de riesgo...`,
      'analyst', 2000
    );
    ctx.updateApplication(application.id, { status: 'scoring' });

    await sendBot('Ahora nuestro sistema de riesgo esta calculando tu score de credito...', 'chat', 800);

    await sendBot(
      `RESULTADO DEL MOTOR DE RIESGO:\n\n1. INGRESOS: ${incomePts} pts\n2. ESTABILIDAD (${p.employmentYears} años): ${stabPts} pts\n3. RATIO DEUDA/INGRESO (${ratio.toFixed(1)}%): ${ratioPts} pts\n4. TIPO EMPLEO: ${empPts} pts\n\nPUNTOS BASE: 300\nSCORE TOTAL: ${p.creditScore}/1000\nNIVEL: ${p.riskLevel}`,
      'risk', 2000
    );

    await sendBot('El analista esta tomando la decision final...', 'chat', 800);

    const termMonths = p.flowIndex === 1 ? 120 : 60;
    const monthlyPayment = (p.maxAmount * (1 + p.interestRate / 100 * (termMonths / 12))) / termMonths;
    const montoStr = country === 'colombia' ? `$ ${p.maxAmount.toLocaleString('es-CO')}` : country === 'peru' ? `S/ ${p.maxAmount.toLocaleString()}` : `$${p.maxAmount.toLocaleString()}`;
    const cuotaStr = country === 'colombia' ? `$ ${monthlyPayment.toLocaleString('es-CO', {maximumFractionDigits: 0})}` : country === 'peru' ? `S/ ${monthlyPayment.toFixed(2)}` : `$${monthlyPayment.toFixed(2)}`;

    const decisionMsg = p.decision === 'approved'
      ? `DECISION: APROBADO\n- Monto: ${montoStr}\n- Tasa: ${p.interestRate}% anual${p.flowIndex === 1 ? ' (PREFERENCIAL)' : ''}\n- Plazo: ${termMonths} meses\n- Cuota: ${cuotaStr}\n\nScore: ${p.creditScore} (${p.riskLevel})`
      : `DECISION: RECHAZADO\nScore: ${p.creditScore} (Riesgo ${p.riskLevel})\n\nRecomendaciones:\n- Esperar 1 año de antigüedad\n- Solicitar monto menor\n- Documentar estabilidad`;
    await sendBot(decisionMsg, 'analyst', 2000);
    ctx.updateApplication(application.id, {
      status: 'completed', decision: p.decision, creditScore: p.creditScore,
      riskLevel: p.riskLevel as 'low' | 'medium' | 'high',
      maxAmount: p.decision === 'approved' ? p.maxAmount : undefined,
      interestRate: p.decision === 'approved' ? p.interestRate : undefined,
    });

    const finalMsg = p.decision === 'approved'
      ? `${p.flowIndex === 1 ? 'Excelentes noticias' : 'Felicidades'}! Tu solicitud ha sido APROBADA${p.flowIndex === 1 ? ' con tasa preferencial' : ''}.\n\n- Monto: ${montoStr}\n- Tasa: ${p.interestRate}% anual${p.flowIndex === 1 ? ' (PREFERENCIAL)' : ''}\n- Plazo: ${termMonths} meses\n- Cuota: ${cuotaStr}\n\nScore: ${p.creditScore}\n\nUn asesor se pondra en contacto. Gracias!`
      : `Lamentablemente tu solicitud no ha sido aprobada.\n\nScore: ${p.creditScore} (Riesgo ${p.riskLevel})\n\nRecomendaciones:\n1. Espera al menos 1 año en tu empleo\n2. Solicita un monto menor\n3. Documenta ingresos adicionales\n\nPuedes intentar en 6 meses.`;
    await sendBot(finalMsg, 'chat', 1500);
  };

  const sendMessage = useCallback((content: string) => {
    const p = prof.current;
    const si = stepIx.current;

    addMsg({ id: genId(), role: 'user', content, timestamp: new Date(), agent: 'chat' });

    if (ctx.state.config.mode === 'demo' && si < 7) {
      const fn = chatQuestions[si];
      const text = fn(content);
      sendBot(text, 'chat', 800).then(() => {
        stepIx.current = si + 1;
        const nextField = si + 1 < 7 ? ['nombre', 'cedula', 'ingresos', 'empleo', 'antiguedad', 'monto', 'proposito'][si + 1] : null;
        if (nextField && nextField in QR_BY_COUNTRY[country]) {
          setCField(nextField);
          setCQR(QR_BY_COUNTRY[country][nextField]);
          setShowQR(true);
        } else {
          setCField(null);
          setShowQR(false);
        }
        if (si === 6) {
          stepIx.current = 7;
          runBackOffice(p).then(() => { stepIx.current = 99; });
        }
      });
    } else if (ctx.state.config.mode === 'agent') {
      setIsProcessing(true);
      setShowQR(false);
      sendBot('Modo Agente IA activado. Conectando con OpenAI...', 'chat', 500)
        .then(() => setIsProcessing(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, ctx.state.config.mode]);

  const startNewChat = useCallback(() => {
    flowIx.current = (flowIx.current + 1) % PROFILES[country].length;
    prof.current = PROFILES[country][flowIx.current];
    stepIx.current = 0;
    setApp(null);
    ctx.setCurrentSessionId(genId());
    const c = COUNTRIES[country];
    const greeting: ChatMessage = {
      id: genId(), role: 'assistant',
      content: `${c.welcomeMessage}\n\nTe ayudare a completar tu solicitud de manera rapida y sencilla.\n\nPara comenzar, podrias indicarme tu nombre completo?`,
      timestamp: new Date(), agent: 'chat',
    };
    setMsgs([greeting]);
    ctx.addChatMessage(greeting);
    setCAgent('chat');
    setCField('nombre');
    setCQR(QR_BY_COUNTRY[country]['nombre']);
    setShowQR(true);
    setIsTyping(false);
    setIsProcessing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  return {
    messages: msgs, isTyping, currentAgent: cAgent,
    currentField: cField, quickReplies: cQR,
    showQuickReplies: showQR, isProcessing,
    sendMessage, startNewChat, application: app,
  };
}

export { QR_BY_COUNTRY, FL, FL as FIELD_LABELS };
