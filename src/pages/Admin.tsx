import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ConfigPanel from '@/components/admin/ConfigPanel';
import LogsPanel from '@/components/admin/LogsPanel';
import AgentsPanel from '@/components/admin/AgentsPanel';
import { Settings, FileText, Shield, Bot } from 'lucide-react';

export default function Admin() {
  const [activeSection, setActiveSection] = useState<'config' | 'logs' | 'agents'>('config');

  return (
    <div className="min-h-screen bg-[#0a1628]">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#0068a3]/10 border border-[#0068a3]/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#0068a3]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Panel de Administracion</h1>
                <p className="text-sm text-slate-400">
                  Configura los agentes IA, revisa logs y gestiona el sistema
                </p>
              </div>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setActiveSection('config')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === 'config'
                  ? 'bg-gradient-to-r from-[#0068a3] to-[#0085c9] text-white shadow-lg shadow-[#0068a3]/20'
                  : 'bg-[#162544] text-slate-400 hover:text-white border border-[#1a3a5c]/50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configuracion</span>
            </button>

            <button
              onClick={() => setActiveSection('logs')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === 'logs'
                  ? 'bg-gradient-to-r from-[#0068a3] to-[#0085c9] text-white shadow-lg shadow-[#0068a3]/20'
                  : 'bg-[#162544] text-slate-400 hover:text-white border border-[#1a3a5c]/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Logs</span>
            </button>

            <button
              onClick={() => setActiveSection('agents')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === 'agents'
                  ? 'bg-gradient-to-r from-[#0068a3] to-[#0085c9] text-white shadow-lg shadow-[#0068a3]/20'
                  : 'bg-[#162544] text-slate-400 hover:text-white border border-[#1a3a5c]/50'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Agentes Internos</span>
            </button>
          </div>

          {/* Content - with proper overflow */}
          <div className="bg-[#0f1d32]/50 rounded-2xl border border-[#1a3a5c]/30 p-6 overflow-visible">
            {activeSection === 'config' && <ConfigPanel />}
            {activeSection === 'logs' && <LogsPanel />}
            {activeSection === 'agents' && <AgentsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
