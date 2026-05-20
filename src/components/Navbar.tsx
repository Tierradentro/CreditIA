import { Link, useLocation } from 'react-router';
import { MessageSquare, Settings, Home, Shield } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { COUNTRIES } from '@/lib/countries';

export default function Navbar() {
  const location = useLocation();
  const { state } = useApp();
  const country = COUNTRIES[state.config.country];

  const navItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/chat', icon: MessageSquare, label: 'Solicitar Credito' },
    { path: '/admin', icon: Settings, label: 'Administracion' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/90 backdrop-blur-xl border-b border-[#1a3a5c]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-white rounded-lg flex items-center justify-center overflow-hidden" style={{ width: country.logoWidth, height: 40 }}>
              <img
                src={country.logo}
                alt={country.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight">CreditFlow AI</span>
              <span className="text-[10px] text-[#c9a33d] uppercase tracking-wider">{country.name}</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#0068a3] text-white shadow-lg shadow-[#0068a3]/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}

            <div className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a3a5c]/50 border border-[#c9a33d]/30">
              <Shield className="w-3.5 h-3.5 text-[#c9a33d]" />
              <span className={`text-xs font-semibold ${state.config.mode === 'demo' ? 'text-emerald-400' : 'text-blue-400'}`}>
                {state.config.mode === 'demo' ? 'MODO DEMO' : 'MODO IA'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
