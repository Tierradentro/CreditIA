import { useState } from 'react';
import { MessageSquare, Users, Clock, Filter, Download, Search, Bot, User, ArrowDownLeft, ArrowUpRight, BarChart3, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { ClientLog } from '@/types';

interface LogEntry {
  id: string;
  timestamp: Date;
  agent: string;
  direction: string;
  message: string;
  metadata?: Record<string, unknown>;
  sessionId: string;
}

function generateMockIALogs(): LogEntry[] {
  const now = new Date();
  const logs: LogEntry[] = [
    {
      id: '1',
      timestamp: new Date(now.getTime() - 360000),
      agent: 'chat',
      direction: 'outgoing',
      message: 'Hola! Bienvenido a Banco Guayaquil. Soy Sofia, tu asistente virtual para solicitudes de credito.',
      sessionId: 'sess-001',
    },
    {
      id: '2',
      timestamp: new Date(now.getTime() - 350000),
      agent: 'chat',
      direction: 'incoming',
      message: 'Hola, quiero solicitar un credito para un vehiculo',
      sessionId: 'sess-001',
    },
    {
      id: '3',
      timestamp: new Date(now.getTime() - 340000),
      agent: 'chat',
      direction: 'outgoing',
      message: 'Con gusto te ayudare. Para comenzar, podrias indicarme tu nombre completo?',
      sessionId: 'sess-001',
    },
    {
      id: '4',
      timestamp: new Date(now.getTime() - 330000),
      agent: 'chat',
      direction: 'incoming',
      message: 'Juan Carlos Mendez',
      sessionId: 'sess-001',
    },
    {
      id: '5',
      timestamp: new Date(now.getTime() - 320000),
      agent: 'chat',
      direction: 'incoming',
      message: 'Mi cedula es 0912345678',
      sessionId: 'sess-001',
    },
    {
      id: '6',
      timestamp: new Date(now.getTime() - 310000),
      agent: 'chat',
      direction: 'incoming',
      message: 'Mi ingreso es de 3,500 dolares mensuales',
      sessionId: 'sess-001',
    },
    {
      id: '7',
      timestamp: new Date(now.getTime() - 300000),
      agent: 'chat',
      direction: 'outgoing',
      message: 'Gracias! He recopilado toda tu informacion. Voy a enviarla al analista.',
      sessionId: 'sess-001',
    },
    {
      id: '8',
      timestamp: new Date(now.getTime() - 290000),
      agent: 'analyst',
      direction: 'incoming',
      message: 'Solicitud recibida. Iniciando validacion de datos del cliente...',
      sessionId: 'sess-001',
    },
    {
      id: '9',
      timestamp: new Date(now.getTime() - 280000),
      agent: 'analyst',
      direction: 'outgoing',
      message: 'Validacion completada. Datos consistentes. Solicitando score de riesgo...',
      sessionId: 'sess-001',
    },
    {
      id: '10',
      timestamp: new Date(now.getTime() - 270000),
      agent: 'risk',
      direction: 'incoming',
      message: 'Solicitud de scoring recibida. Calculando score de riesgo...',
      sessionId: 'sess-001',
    },
    {
      id: '11',
      timestamp: new Date(now.getTime() - 260000),
      agent: 'risk',
      direction: 'outgoing',
      message: 'Score calculado: 720/1000 - Nivel de Riesgo: Bajo - Recomendacion: Aprobacion con tasa estandar',
      sessionId: 'sess-001',
    },
    {
      id: '12',
      timestamp: new Date(now.getTime() - 250000),
      agent: 'analyst',
      direction: 'outgoing',
      message: 'DECISION: APROBADO - Monto: $15,000 - Tasa: 12% - Plazo: 60 meses',
      sessionId: 'sess-001',
    },
    {
      id: '13',
      timestamp: new Date(now.getTime() - 240000),
      agent: 'chat',
      direction: 'outgoing',
      message: 'Felicidades! Tu solicitud ha sido APROBADA. Monto: $15,000 a 12% anual.',
      sessionId: 'sess-001',
    },
  ];
  return logs;
}

function generateMockClientLogs(): ClientLog[] {
  const now = new Date();
  return [
    {
      id: '1',
      sessionId: 'sess-001',
      clientName: 'Juan Carlos Mendez',
      clientId: '0912345678',
      status: 'completed',
      startTime: new Date(now.getTime() - 360000),
      endTime: new Date(now.getTime() - 240000),
      messages: [
        { id: 'm1', role: 'assistant', content: 'Hola! Bienvenido a Banco Guayaquil...', timestamp: new Date(now.getTime() - 360000) },
        { id: 'm2', role: 'user', content: 'Hola, quiero solicitar un credito para un vehiculo', timestamp: new Date(now.getTime() - 350000) },
        { id: 'm3', role: 'assistant', content: 'Con gusto te ayudare...', timestamp: new Date(now.getTime() - 340000) },
        { id: 'm4', role: 'user', content: 'Juan Carlos Mendez', timestamp: new Date(now.getTime() - 330000) },
        { id: 'm5', role: 'user', content: 'Mi cedula es 0912345678', timestamp: new Date(now.getTime() - 320000) },
        { id: 'm6', role: 'user', content: 'Mi ingreso es de 3,500 dolares mensuales', timestamp: new Date(now.getTime() - 310000) },
        { id: 'm7', role: 'assistant', content: 'Gracias! He recopilado toda tu informacion...', timestamp: new Date(now.getTime() - 300000) },
        { id: 'm8', role: 'assistant', content: 'Felicidades! Tu solicitud ha sido APROBADA...', timestamp: new Date(now.getTime() - 240000) },
      ],
    },
    {
      id: '2',
      sessionId: 'sess-002',
      clientName: 'Maria Fernanda Lopez',
      clientId: '0987654321',
      status: 'completed',
      startTime: new Date(now.getTime() - 720000),
      endTime: new Date(now.getTime() - 600000),
      messages: [
        { id: 'm1', role: 'assistant', content: 'Hola! Bienvenido a Banco Guayaquil...', timestamp: new Date(now.getTime() - 720000) },
        { id: 'm2', role: 'user', content: 'Buenos dias, necesito un credito', timestamp: new Date(now.getTime() - 710000) },
        { id: 'm3', role: 'assistant', content: 'Con gusto te ayudare...', timestamp: new Date(now.getTime() - 700000) },
        { id: 'm4', role: 'user', content: 'Maria Fernanda Lopez', timestamp: new Date(now.getTime() - 690000) },
        { id: 'm5', role: 'assistant', content: 'Felicidades! Tu solicitud ha sido APROBADA con tasa preferencial 8.5%...', timestamp: new Date(now.getTime() - 600000) },
      ],
    },
    {
      id: '3',
      sessionId: 'sess-003',
      clientName: 'Pedro Antonio Ruiz',
      clientId: '0923456789',
      status: 'completed',
      startTime: new Date(now.getTime() - 1800000),
      endTime: new Date(now.getTime() - 1680000),
      messages: [
        { id: 'm1', role: 'assistant', content: 'Hola! Bienvenido a Banco Guayaquil...', timestamp: new Date(now.getTime() - 1800000) },
        { id: 'm2', role: 'user', content: 'Necesito un credito urgente', timestamp: new Date(now.getTime() - 1790000) },
        { id: 'm3', role: 'assistant', content: 'Lamentablemente, tu solicitud no ha sido aprobada...', timestamp: new Date(now.getTime() - 1680000) },
      ],
    },
  ];
}

export default function LogsPanel() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'ia' | 'client'>('ia');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAgent, setFilterAgent] = useState<string>('all');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const iaLogs = state.conversationLogs.length > 0 ? state.conversationLogs.map(log => ({
    id: log.id,
    timestamp: log.timestamp,
    agent: log.agent,
    direction: log.direction,
    message: log.message,
    metadata: log.metadata,
    sessionId: log.sessionId,
  })) : generateMockIALogs();

  const clientLogs = state.clientLogs.length > 0 ? state.clientLogs : generateMockClientLogs();

  const filteredIALogs = iaLogs.filter((log) => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgent = filterAgent === 'all' || log.agent === filterAgent;
    return matchesSearch && matchesAgent;
  });

  const filteredClientLogs = clientLogs.filter((log) => {
    const matchesSearch =
      log.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.clientId.includes(searchQuery);
    return matchesSearch;
  });

  const getAgentIcon = (agent: string) => {
    switch (agent) {
      case 'chat':
        return MessageSquare;
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
      case 'chat':
        return 'text-[#0068a3] bg-[#0068a3]/10';
      case 'analyst':
        return 'text-[#c9a33d] bg-[#c9a33d]/10';
      case 'risk':
        return 'text-emerald-400 bg-emerald-500/10';
      default:
        return 'text-slate-400 bg-slate-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-400 bg-emerald-500/10';
      case 'active':
        return 'text-[#0068a3] bg-[#0068a3]/10';
      case 'error':
        return 'text-red-400 bg-red-500/10';
      default:
        return 'text-slate-400 bg-slate-500/10';
    }
  };

  const handleExport = () => {
    const data = activeTab === 'ia' ? filteredIALogs : filteredClientLogs;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${activeTab}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('ia')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'ia'
                ? 'bg-[#0068a3] text-white shadow-lg shadow-[#0068a3]/20'
                : 'bg-[#162544] text-slate-400 hover:text-white border border-[#1a3a5c]/50'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Logs con IA</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{iaLogs.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('client')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'client'
                ? 'bg-[#0068a3] text-white shadow-lg shadow-[#0068a3]/20'
                : 'bg-[#162544] text-slate-400 hover:text-white border border-[#1a3a5c]/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Logs con Cliente</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{clientLogs.length}</span>
          </button>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#162544] text-slate-400 hover:text-white border border-[#1a3a5c]/50 transition-all duration-300 text-sm"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Exportar</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'ia' ? 'Buscar en logs de IA...' : 'Buscar por nombre o cedula...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#162544] border border-[#1a3a5c]/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#0068a3]/50 text-sm"
          />
        </div>

        {activeTab === 'ia' && (
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-lg bg-[#162544] border border-[#1a3a5c]/50 text-white focus:outline-none focus:border-[#0068a3]/50 text-sm appearance-none"
            >
              <option value="all">Todos los agentes</option>
              <option value="chat">Conversacional</option>
              <option value="analyst">Analista</option>
              <option value="risk">Riesgo</option>
            </select>
          </div>
        )}
      </div>

      {/* IA Logs */}
      {activeTab === 'ia' && (
        <div className="space-y-2">
          {filteredIALogs.length === 0 && (
            <div className="text-center py-12">
              <Bot className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500">No hay logs de IA para mostrar</p>
            </div>
          )}
          {filteredIALogs.map((log) => {
            const AgentIcon = getAgentIcon(log.agent);
            const agentColor = getAgentColor(log.agent);
            const isIncoming = log.direction === 'incoming';

            return (
              <div
                key={log.id}
                className={`p-4 rounded-xl border transition-all duration-300 hover:border-[#1a3a5c] ${
                  isIncoming
                    ? 'bg-[#162544] border-[#1a3a5c]/30 border-l-2 border-l-[#c9a33d]'
                    : 'bg-[#0f1d32] border-[#1a3a5c]/30 border-l-2 border-l-[#0068a3]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${agentColor} flex items-center justify-center`}>
                    <AgentIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold text-white capitalize">{log.agent}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isIncoming ? 'bg-[#c9a33d]/10 text-[#c9a33d]' : 'bg-[#0068a3]/10 text-[#0068a3]'}`}>
                        {isIncoming ? 'Recibido' : 'Enviado'}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {log.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 whitespace-pre-wrap">{log.message}</p>
                    <div className="mt-1 text-[10px] text-slate-600 font-mono">
                      Session: {log.sessionId.slice(0, 8)}...
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {isIncoming ? (
                      <ArrowDownLeft className="w-4 h-4 text-[#c9a33d]" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-[#0068a3]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Client Logs */}
      {activeTab === 'client' && (
        <div className="space-y-4">
          {filteredClientLogs.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500">No hay logs de cliente para mostrar</p>
            </div>
          )}
          {filteredClientLogs.map((log) => (
            <div key={log.id} className="rounded-xl bg-[#162544] border border-[#1a3a5c]/30 overflow-hidden">
              {/* Session Header */}
              <div
                className="p-4 cursor-pointer hover:bg-[#1a2f4d] transition-colors"
                onClick={() => setSelectedSession(selectedSession === log.sessionId ? null : log.sessionId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0068a3]/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#0068a3]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-sm">{log.clientName}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(log.status)}`}>
                          {log.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>Cedula: {log.clientId}</span>
                        <span>Session: {log.sessionId.slice(0, 8)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {log.startTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div>{log.messages.length} mensajes</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform ${selectedSession === log.sessionId ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Messages */}
              {selectedSession === log.sessionId && (
                <div className="border-t border-[#1a3a5c]/30 p-4 space-y-3">
                  {log.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          msg.role === 'user'
                            ? 'bg-[#c9a33d]/10'
                            : 'bg-[#0068a3]/10'
                        }`}
                      >
                        {msg.role === 'user' ? (
                          <User className="w-3 h-3 text-[#c9a33d]" />
                        ) : (
                          <Bot className="w-3 h-3 text-[#0068a3]" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-lg text-xs ${
                          msg.role === 'user'
                            ? 'bg-[#c9a33d]/5 border border-[#c9a33d]/10 text-slate-300'
                            : 'bg-[#0f1d32] border border-[#1a3a5c]/30 text-slate-400'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
