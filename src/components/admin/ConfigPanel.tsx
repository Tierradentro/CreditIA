import { useState } from 'react';
import { Key, Save, Server, Bot, BarChart3, ShieldCheck, Eye, EyeOff, RotateCcw, CheckCircle, Globe } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { AgentConfig, OpenAIModel } from '@/types';
import { COUNTRIES, COUNTRY_LIST } from '@/lib/countries';

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const agentColors = {
  chat: { bg: 'bg-[#0068a3]/10', border: 'border-[#0068a3]/20', text: 'text-[#0068a3]', label: 'Agente Conversacional' },
  analyst: { bg: 'bg-[#c9a33d]/10', border: 'border-[#c9a33d]/20', text: 'text-[#c9a33d]', label: 'Analista de Credito' },
  risk: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', label: 'Agente de Riesgo' },
};

const OPENAI_MODELS: { value: OpenAIModel; label: string; description: string }[] = [
  { value: 'gpt-4o', label: 'GPT-4o', description: 'Modelo mas avanzado, mejor calidad' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini', description: 'Rapido y economico, buen balance' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', description: 'Alto rendimiento para tareas complejas' },
  { value: 'gpt-4', label: 'GPT-4', description: 'Modelo base confiable' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: 'Mas economico, rapido' },
];

export default function ConfigPanel() {
  const { state, setConfig, setCountry, setApiKey } = useApp();
  const [saved, setSaved] = useState(false);
  const [localConfig, setLocalConfig] = useState(() => state.config);
  const [showKey, setShowKey] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'chat' | 'analyst' | 'risk'>('general');

  const handleSave = () => {
    setConfig(localConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setLocalConfig(state.config);
  };

  const updateAgentConfig = (agent: 'chat' | 'analyst' | 'risk', updates: Partial<AgentConfig>) => {
    setLocalConfig(prev => ({
      ...prev,
      agents: { ...prev.agents, [agent]: { ...prev.agents[agent], ...updates } },
    }));
  };

  const handleCountryChange = (countryCode: string) => {
    setLocalConfig(prev => ({ ...prev, country: countryCode as typeof prev.country }));
  };

  const handleApiKeyChange = (key: string) => {
    setLocalConfig(prev => ({ ...prev, apiKey: key }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      {/* Country Selector */}
      <div className="p-5 rounded-xl bg-[#162544] border border-[#1a3a5c]/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#0068a3]/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#0068a3]" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Pais</h3>
            <p className="text-xs text-slate-400">Selecciona el pais de operacion</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {COUNTRY_LIST.map((c) => (
            <button
              key={c.code}
              onClick={() => handleCountryChange(c.code)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-300 ${
                localConfig.country === c.code
                  ? 'border-[#c9a33d] bg-[#c9a33d]/5'
                  : 'border-[#1a3a5c]/50 bg-[#0f1d32] hover:border-[#1a3a5c]'
              }`}
            >
              <img src={c.logo} alt={c.name} className="w-8 h-8 object-contain" />
              <div className="text-left">
                <span className={`text-sm font-semibold ${localConfig.country === c.code ? 'text-white' : 'text-slate-400'}`}>
                  {c.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* API Key */}
      <div className="p-5 rounded-xl bg-[#162544] border border-[#1a3a5c]/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#0068a3]/10 flex items-center justify-center">
            <Key className="w-5 h-5 text-[#0068a3]" />
          </div>
          <div>
            <h3 className="text-white font-semibold">API Key de OpenAI</h3>
            <p className="text-xs text-slate-400">Ingresa tu API Key para usar el modo Agente IA</p>
          </div>
        </div>

        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={localConfig.apiKey}
            onChange={(e) => handleApiKeyChange(e.target.value)}
            placeholder="sk-..."
            className="w-full px-4 py-3 pr-12 rounded-lg bg-[#0f1d32] border border-[#1a3a5c]/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#0068a3]/50 text-sm"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          >
            {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {localConfig.apiKey ? (
          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span>API Key configurada - Listo para usar modo Agente IA</span>
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-2 text-xs text-amber-400">
            <Server className="w-4 h-4" />
            <span>Ingresa tu API Key para activar el modo Agente IA</span>
          </div>
        )}
      </div>

      {/* Mode Selection */}
      <div className="p-5 rounded-xl bg-[#162544] border border-[#1a3a5c]/50">
        <h3 className="text-white font-semibold mb-4">Modo de Operacion</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setLocalConfig(prev => ({ ...prev, mode: 'demo' }))}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              localConfig.mode === 'demo'
                ? 'border-[#c9a33d] bg-[#c9a33d]/5'
                : 'border-[#1a3a5c]/50 bg-[#0f1d32] hover:border-[#1a3a5c]'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Bot className={`w-5 h-5 ${localConfig.mode === 'demo' ? 'text-[#c9a33d]' : 'text-slate-500'}`} />
              <span className={`font-semibold ${localConfig.mode === 'demo' ? 'text-[#c9a33d]' : 'text-white'}`}>Modo Demo</span>
            </div>
            <p className="text-xs text-slate-400">Respuestas predefinidas. Ideal para demostraciones.</p>
          </button>

          <button
            onClick={() => setLocalConfig(prev => ({ ...prev, mode: 'agent' }))}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              localConfig.mode === 'agent'
                ? 'border-[#0068a3] bg-[#0068a3]/5'
                : 'border-[#1a3a5c]/50 bg-[#0f1d32] hover:border-[#1a3a5c]'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Key className={`w-5 h-5 ${localConfig.mode === 'agent' ? 'text-[#0068a3]' : 'text-slate-500'}`} />
              <span className={`font-semibold ${localConfig.mode === 'agent' ? 'text-[#0068a3]' : 'text-white'}`}>Modo Agente IA</span>
            </div>
            <p className="text-xs text-slate-400">Conexion real con OpenAI. Respuestas generadas por IA.</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAgentConfig = (agentKey: 'chat' | 'analyst' | 'risk') => {
    const agent = localConfig.agents[agentKey];
    const colors = agentColors[agentKey];
    const Icon = agentKey === 'chat' ? MessageSquareIcon : agentKey === 'analyst' ? BarChart3 : ShieldCheck;

    return (
      <div className="space-y-6">
        <div className={`p-5 rounded-xl ${colors.bg} border ${colors.border}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${colors.text}`} />
            </div>
            <div>
              <h3 className={`font-semibold ${colors.text}`}>{colors.label}</h3>
              <p className="text-xs text-slate-400">Configura el comportamiento de este agente</p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#162544] border border-[#1a3a5c]/50 space-y-5">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Nombre del Agente</label>
            <input
              type="text"
              value={agent.name}
              onChange={(e) => updateAgentConfig(agentKey, { name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#0f1d32] border border-[#1a3a5c]/50 text-white focus:outline-none focus:border-[#0068a3]/50 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Modelo de OpenAI</label>
            <div className="space-y-2">
              {OPENAI_MODELS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => updateAgentConfig(agentKey, { model: m.value })}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all duration-200 ${
                    agent.model === m.value
                      ? 'border-[#0068a3] bg-[#0068a3]/10'
                      : 'border-[#1a3a5c]/50 bg-[#0f1d32] hover:border-[#1a3a5c]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    agent.model === m.value ? 'border-[#0068a3]' : 'border-slate-600'
                  }`}>
                    {agent.model === m.value && <div className="w-2 h-2 rounded-full bg-[#0068a3]" />}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${agent.model === m.value ? 'text-white' : 'text-slate-400'}`}>{m.label}</div>
                    <div className="text-[11px] text-slate-500">{m.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Temperatura: <span className="text-[#c9a33d]">{agent.temperature}</span></label>
            <input type="range" min="0" max="2" step="0.1" value={agent.temperature}
              onChange={(e) => updateAgentConfig(agentKey, { temperature: parseFloat(e.target.value) })}
              className="w-full accent-[#0068a3]" />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Preciso (0)</span><span>Creativo (2)</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Max Tokens: <span className="text-[#c9a33d]">{agent.maxTokens}</span></label>
            <input type="range" min="100" max="4000" step="100" value={agent.maxTokens}
              onChange={(e) => updateAgentConfig(agentKey, { maxTokens: parseInt(e.target.value) })}
              className="w-full accent-[#0068a3]" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#162544] border border-[#1a3a5c]/50">
          <label className="block text-sm text-slate-400 mb-2">Prompt de Sistema</label>
          <p className="text-xs text-slate-500 mb-3">Define el comportamiento, personalidad y reglas de este agente.</p>
          <textarea
            value={agent.systemPrompt}
            onChange={(e) => updateAgentConfig(agentKey, { systemPrompt: e.target.value })}
            rows={20}
            className="w-full px-4 py-3 rounded-lg bg-[#0f1d32] border border-[#1a3a5c]/50 text-white focus:outline-none focus:border-[#0068a3]/50 text-sm font-mono leading-relaxed resize-y"
          />
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'general' as const, label: 'General', icon: Globe },
    { id: 'chat' as const, label: 'Conversacional', icon: MessageSquareIcon },
    { id: 'analyst' as const, label: 'Analista', icon: BarChart3 },
    { id: 'risk' as const, label: 'Riesgo', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#0068a3] text-white shadow-lg shadow-[#0068a3]/20'
                : 'bg-[#162544] text-slate-400 hover:text-white border border-[#1a3a5c]/50'
            }`}>
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'general' && renderGeneralSettings()}
      {activeTab === 'chat' && renderAgentConfig('chat')}
      {activeTab === 'analyst' && renderAgentConfig('analyst')}
      {activeTab === 'risk' && renderAgentConfig('risk')}

      <div className="flex items-center gap-3 pt-4 border-t border-[#1a3a5c]/30">
        <button onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#0068a3] to-[#0085c9] text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#0068a3]/30 hover:scale-105">
          <Save className="w-4 h-4" /><span>Guardar Configuracion</span>
        </button>
        <button onClick={handleReset}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 font-medium text-sm transition-all duration-300 hover:text-white hover:bg-white/10">
          <RotateCcw className="w-4 h-4" /><span>Restaurar</span>
        </button>
        {saved && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle className="w-4 h-4" /><span>Guardado</span>
          </div>
        )}
      </div>
    </div>
  );
}
