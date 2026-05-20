import { MessageSquare, BarChart3, ShieldCheck, Zap, Lock, Clock } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Agente Conversacional',
    description:
      'Sofia te recibe con una conversacion natural y amigable, guiandote paso a paso para recopilar toda la informacion necesaria para tu solicitud.',
    color: 'from-[#0068a3] to-[#0085c9]',
    image: '/assets/chat-agent.jpg',
  },
  {
    icon: BarChart3,
    title: 'Analista de Credito',
    description:
      'Nuestro analista IA valida tu informacion, verifica consistencia de datos y toma decisiones basadas en criterios establecidos del banco.',
    color: 'from-[#c9a33d] to-[#e8c96a]',
    image: '/assets/credit-analyst.jpg',
  },
  {
    icon: ShieldCheck,
    title: 'Agente de Riesgo',
    description:
      'El motor de riesgo evalua tu perfil con un modelo de scoring avanzado, determinando tu nivel de riesgo y tasas personalizadas.',
    color: 'from-[#0068a3] to-[#005a8e]',
    image: '/assets/risk-agent.jpg',
  },
];

const benefits = [
  { icon: Zap, title: 'Respuesta Inmediata', desc: 'Decision en minutos, no en dias' },
  { icon: Lock, title: 'Datos Seguros', desc: 'Encriptacion de extremo a extremo' },
  { icon: Clock, title: 'Sin Esperas', desc: 'Proceso automatizado 24/7' },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Nuestros <span className="text-[#c9a33d]">Agentes Inteligentes</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Un sistema de tres agentes de IA trabajando en conjunto para brindarte la mejor
            experiencia en la solicitud de credito.
          </p>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-[#0f1d32] border border-[#1a3a5c]/50 hover:border-[#c9a33d]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#0068a3]/10"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d32] to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#c9a33d] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-5 rounded-xl bg-white/3 border border-white/5 hover:border-[#c9a33d]/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#c9a33d]/10 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-6 h-6 text-[#c9a33d]" />
              </div>
              <div>
                <div className="text-white font-semibold">{benefit.title}</div>
                <div className="text-sm text-slate-500">{benefit.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
