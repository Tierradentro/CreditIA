import { MessageSquare, BarChart3, ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { COUNTRIES } from '@/lib/countries';

interface ChatHeaderProps {
  onNewChat: () => void;
  currentAgent: 'chat' | 'analyst' | 'risk' | null;
  applicationStatus?: string;
}

export default function ChatHeader({ onNewChat, currentAgent, applicationStatus }: ChatHeaderProps) {
  const { state } = useApp();
  const country = COUNTRIES[state.config.country];
  const agentName = country.agentName;

  const agentConfig = {
    chat: {
      icon: MessageSquare,
      label: 'Agente Conversacional',
      color: 'text-[#0068a3]',
      bgColor: 'bg-[#0068a3]/20',
      borderColor: 'border-[#0068a3]/30',
    },
    analyst: {
      icon: BarChart3,
      label: 'Analista de Credito',
      color: 'text-[#c9a33d]',
      bgColor: 'bg-[#c9a33d]/20',
      borderColor: 'border-[#c9a33d]/30',
    },
    risk: {
      icon: ShieldCheck,
      label: 'Agente de Riesgo',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/30',
    },
  };

  const currentAgentConfig = currentAgent ? agentConfig[currentAgent] : null;

  return (
    <div className="flex-shrink-0 p-4 border-b border-[#1a3a5c]/50 bg-[#0f1d32]/80 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Sofia Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0068a3] to-[#c9a33d] flex items-center justify-center overflow-hidden">
              <img
                src="/assets/chat-agent.jpg"
                alt={agentName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f1d32]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-semibold">{agentName}</h2>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#0068a3]/20 text-[#0068a3] font-medium">
                AI
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {state.config.mode === 'demo' ? 'Modo Demo - Simulacion' : 'Modo Agente IA'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Current Agent Indicator */}
          {currentAgentConfig && (
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg ${currentAgentConfig.bgColor} border ${currentAgentConfig.borderColor}`}>
              <currentAgentConfig.icon className={`w-3.5 h-3.5 ${currentAgentConfig.color}`} />
              <span className={`text-xs font-medium ${currentAgentConfig.color}`}>
                {currentAgentConfig.label}
              </span>
            </div>
          )}

          {/* Application Status */}
          {applicationStatus && (
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              applicationStatus === 'completed'
                ? 'bg-emerald-500/10 border border-emerald-500/30'
                : applicationStatus === 'rejected'
                ? 'bg-red-500/10 border border-red-500/30'
                : 'bg-[#1a3a5c]/30 border border-[#1a3a5c]/50'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${
                applicationStatus === 'completed'
                  ? 'text-emerald-400'
                  : applicationStatus === 'rejected'
                  ? 'text-red-400'
                  : 'text-[#c9a33d]'
              }`} />
              <span className={`text-xs font-medium capitalize ${
                applicationStatus === 'completed'
                  ? 'text-emerald-400'
                  : applicationStatus === 'rejected'
                  ? 'text-red-400'
                  : 'text-[#c9a33d]'
              }`}>
                {applicationStatus}
              </span>
            </div>
          )}

          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Nueva Solicitud</span>
          </button>
        </div>
      </div>
    </div>
  );
}
