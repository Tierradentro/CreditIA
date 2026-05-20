import { Link } from 'react-router';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/80 to-[#0a1628]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0068a3]/20 border border-[#0068a3]/30 mb-8">
          <Sparkles className="w-4 h-4 text-[#c9a33d]" />
          <span className="text-sm text-[#c9a33d] font-medium">Impulsado por Inteligencia Artificial</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Solicita tu{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c9a33d] to-[#e8c96a]">
            Credito
          </span>{' '}
          con
          <br />
          <span className="text-white">Agentes Inteligentes</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Nuestros agentes de IA te guiaran en el proceso de solicitud de credito.
          Desde la recopilacion de informacion hasta la decision final, todo de manera
          conversacional y en tiempo real.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/chat"
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0068a3] to-[#0085c9] text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#0068a3]/30 hover:scale-105"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Iniciar Solicitud</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/admin"
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-[#c9a33d]/30"
          >
            <Sparkles className="w-5 h-5 text-[#c9a33d]" />
            <span>Configurar Agentes</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { value: '3', label: 'Agentes IA', desc: 'Conversacional, Analista y Riesgo' },
            { value: '< 5 min', label: 'Tiempo Promedio', desc: 'Desde solicitud hasta decision' },
            { value: '24/7', label: 'Disponibilidad', desc: 'Atencion continua sin esperas' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-3xl font-bold text-[#c9a33d] mb-2">{stat.value}</div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
