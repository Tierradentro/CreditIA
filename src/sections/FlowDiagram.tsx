import { useState, useEffect } from 'react';
import { MessageSquare, BarChart3, ShieldCheck, User, CheckCircle } from 'lucide-react';

interface FlowStep {
  id: string;
  icon: typeof MessageSquare;
  title: string;
  agent: string;
  description: string;
  color: string;
  bgColor: string;
}

const steps: FlowStep[] = [
  {
    id: '1',
    icon: User,
    title: 'Cliente Inicia',
    agent: 'Usuario',
    description: 'El cliente inicia la conversacion con el agente virtual',
    color: 'text-white',
    bgColor: 'bg-[#1a3a5c]',
  },
  {
    id: '2',
    icon: MessageSquare,
    title: 'Recopilacion',
    agent: 'Agente Conversacional',
    description: 'Sofia recopila informacion personal y financiera del cliente',
    color: 'text-[#0068a3]',
    bgColor: 'bg-[#0068a3]/20',
  },
  {
    id: '3',
    icon: BarChart3,
    title: 'Validacion',
    agent: 'Analista de Credito',
    description: 'El analista valida la informacion y verifica consistencia',
    color: 'text-[#c9a33d]',
    bgColor: 'bg-[#c9a33d]/20',
  },
  {
    id: '4',
    icon: ShieldCheck,
    title: 'Scoring',
    agent: 'Agente de Riesgo',
    description: 'El motor calcula el score de riesgo con el modelo definido',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
  },
  {
    id: '5',
    icon: BarChart3,
    title: 'Decision',
    agent: 'Analista de Credito',
    description: 'El analista toma la decision final basada en el score',
    color: 'text-[#c9a33d]',
    bgColor: 'bg-[#c9a33d]/20',
  },
  {
    id: '6',
    icon: MessageSquare,
    title: 'Comunicacion',
    agent: 'Agente Conversacional',
    description: 'Sofia comunica la decision al cliente con detalles',
    color: 'text-[#0068a3]',
    bgColor: 'bg-[#0068a3]/20',
  },
  {
    id: '7',
    icon: CheckCircle,
    title: 'Resultado',
    agent: 'Cliente',
    description: 'El cliente recibe la respuesta final del credito',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
  },
];

export default function FlowDiagram() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 bg-[#0f1d32]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Flujo del <span className="text-[#c9a33d]">Proceso</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Asi funciona nuestro sistema de agentes inteligentes paso a paso.
            Cada agente tiene un rol especifico en el proceso de evaluacion.
          </p>
        </div>

        {/* Flow Steps */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-[#1a3a5c]" />
          <div
            className="absolute left-6 sm:left-8 top-0 w-0.5 bg-gradient-to-b from-[#0068a3] via-[#c9a33d] to-[#0068a3] transition-all duration-500"
            style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
          />

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, i) => {
              const isActive = i <= activeStep;
              const isCurrent = i === activeStep;

              return (
                <div
                  key={step.id}
                  className={`relative flex items-start gap-4 sm:gap-6 transition-all duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  {/* Step Number / Icon */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isCurrent
                        ? `${step.bgColor} border-2 border-[#c9a33d] shadow-lg shadow-[#c9a33d]/20 scale-110`
                        : isActive
                        ? `${step.bgColor} border border-white/10`
                        : 'bg-[#0a1628] border border-[#1a3a5c]/50'
                    }`}
                  >
                    <step.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? step.color : 'text-slate-600'}`}
                    />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`flex-1 p-4 sm:p-5 rounded-xl border transition-all duration-500 ${
                      isCurrent
                        ? 'bg-[#162544] border-[#c9a33d]/30 shadow-lg shadow-[#0068a3]/10'
                        : isActive
                        ? 'bg-[#0f1d32] border-[#1a3a5c]/50'
                        : 'bg-[#0a1628]/50 border-[#1a3a5c]/30'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#c9a33d]">Paso {step.id}</span>
                        <h3 className="text-base sm:text-lg font-bold text-white">{step.title}</h3>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          step.agent.includes('Conversacional')
                            ? 'bg-[#0068a3]/20 text-[#0068a3]'
                            : step.agent.includes('Analista')
                            ? 'bg-[#c9a33d]/20 text-[#c9a33d]'
                            : step.agent.includes('Riesgo')
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        {step.agent}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
