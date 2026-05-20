import { useState } from 'react';
import { BarChart3, ShieldCheck, Clock, ArrowDownLeft, ArrowUpRight, Filter, Search, Bot, Activity } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AgentsPanel() {
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAgent, setFilterAgent] = useState<string>('all');

  // Get internal agent messages (analyst + risk) from chatMessages
  const internalMessages = state.chatMessages.filter(
    (msg) => msg.agent === 'analyst' || msg.agent === 'risk'
  );

  const filteredMessages = internalMessages.filter((msg) => {
    const matchesSearch = msg.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgent = filterAgent === 'all' || msg.agent === filterAgent;
    return matchesSearch && matchesAgent;
  });

  const getAgentIcon = (agent: string) => {
    switch (agent) {
      case 'analyst':
        return BarChart3;
      case 'risk':
        return ShieldCheck;
      default:
        return Bot;
    }
  };

  const getAgentColor = (agent: string) => {
    switch (agent) {
      case 'analyst':
        return 'text-[#c9a33d] bg-[#c9a33d]/10';
      case 'risk':
        return 'text-emerald-400 bg-emerald-500/10';
      default:
        return 'text-slate-400 bg-slate-500/10';
    }
  };

  const getAgentLabel = (agent: string) => {
    switch (agent) {
      case 'analyst':
        return 'Analista de Credito';
      case 'risk':
        return 'Agente de Riesgo';
      default:
        return 'Sistema';
    }
  };

  const getDirectionLabel = (role: string) => {
    return role === 'user' ? 'Solicitud recibida' : 'Respuesta emitida';
  };

  const getDirectionColor = (role: string) => {
    return role === 'user'
      ? 'bg-[#c9a33d]/10 text-[#c9a33d]'
      : 'bg-[#0068a3]/10 text-[#0068a3]';
  };

  const getDirectionIcon = (role: string) => {
    return role === 'user' ? ArrowDownLeft : ArrowUpRight;
  };

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#162544] border border-[#1a3a5c]/50">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-[#c9a33d]" />
            <span className="text-xs text-slate-400">Total Mensajes Internos</span>
          </div>
          <div className="text-2xl font-bold text-white">{internalMessages.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#162544] border border-[#1a3a5c]/50">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-[#c9a33d]" />
            <span className="text-xs text-slate-400">Analista de Credito</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {internalMessages.filter((m) => m.agent === 'analyst').length}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#162544] border border-[#1a3a5c]/50">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400">Agente de Riesgo</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {internalMessages.filter((m) => m.agent === 'risk').length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en mensajes de agentes internos..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#162544] border border-[#1a3a5c]/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#0068a3]/50 text-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <select
            value={filterAgent}
            onChange={(e) => setFilterAgent(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-lg bg-[#162544] border border-[#1a3a5c]/50 text-white focus:outline-none focus:border-[#0068a3]/50 text-sm appearance-none"
          >
            <option value="all">Todos los agentes</option>
            <option value="analyst">Analista de Credito</option>
            <option value="risk">Agente de Riesgo</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-2">
        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 mb-1">No hay mensajes internos de agentes</p>
            <p className="text-sm text-slate-600">
              Los mensajes del Analista y Agente de Riesgo apareceran aqui cuando se procese una solicitud de credito.
            </p>
          </div>
        )}
        {filteredMessages.map((msg) => {
          const AgentIcon = getAgentIcon(msg.agent || '');
          const agentColor = getAgentColor(msg.agent || '');
          const agentLabel = getAgentLabel(msg.agent || '');
          const DirectionIcon = getDirectionIcon(msg.role);
          const dirLabel = getDirectionLabel(msg.role);
          const dirColor = getDirectionColor(msg.role);

          return (
            <div
              key={msg.id}
              className={`p-4 rounded-xl border transition-all duration-300 hover:border-[#1a3a5c] bg-[#162544] border-[#1a3a5c]/30 border-l-2 ${
                msg.agent === 'analyst' ? 'border-l-[#c9a33d]' : 'border-l-emerald-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg ${agentColor} flex items-center justify-center`}
                >
                  <AgentIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold text-white">{agentLabel}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${dirColor}`}>
                      <span className="flex items-center gap-1">
                        <DirectionIcon className="w-3 h-3" />
                        {dirLabel}
                      </span>
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {msg.timestamp.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
