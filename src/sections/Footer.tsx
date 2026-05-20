import { Link } from 'react-router';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { COUNTRIES } from '@/lib/countries';

export default function Footer() {
  const { state } = useApp();
  const country = COUNTRIES[state.config.country];

  const phoneByCountry = {
    ecuador: '1-800-BG (24/7)',
    peru: '(01) 311-9898',
    colombia: '01 8000 52 8000',
  };

  return (
    <footer className="relative bg-[#0a1628] border-t border-[#1a3a5c]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <img src={country.logo} alt={country.name} className="w-8 h-8 object-contain" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">CreditFlow AI</div>
                <div className="text-[#c9a33d] text-xs uppercase tracking-wider">{country.name}</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Sistema de otorgamiento de credito impulsado por inteligencia artificial.
              Tres agentes especializados trabajan en conjunto para brindarte la mejor
              experiencia y una decision rapida.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rapidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-400 hover:text-[#c9a33d] transition-colors text-sm">Inicio</Link></li>
              <li><Link to="/chat" className="text-slate-400 hover:text-[#c9a33d] transition-colors text-sm">Solicitar Credito</Link></li>
              <li><Link to="/admin" className="text-slate-400 hover:text-[#c9a33d] transition-colors text-sm">Administracion</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-[#c9a33d]" />
                <span>{phoneByCountry[state.config.country]}</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-[#c9a33d]" />
                <span>creditos@creditflow.com</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-[#c9a33d]" />
                <span>{country.name}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#1a3a5c]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>2026 CreditFlow AI. Todos los derechos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
