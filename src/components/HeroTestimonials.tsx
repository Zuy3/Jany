import React, { useState } from 'react';
import { Star, CheckCircle2, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface HeroTestimonial {
  id: string;
  name: string;
  age: number;
  city: string;
  avatar: string;
  tag: string;
  quote: string;
  timeAgo: string;
  result: string;
}

const HERO_TESTIMONIALS: HeroTestimonial[] = [
  {
    id: 'test_1',
    name: 'Maria S.',
    age: 35,
    city: 'Belo Horizonte, MG',
    avatar: './assets/aistudio/1d8da273ae648a8f3190d23e08e39821_e74dc1cc.jpeg',
    tag: 'Perdeu 3 kg de inchaço',
    quote: 'Respondi ao quiz em 1 minuto e fiquei chocada como descreveu exatamente o que eu sinto após o almoço! Apliquei a primeira troca sugerida e minha barriga parou de acordar estufada.',
    timeAgo: 'Fez o quiz há 3 dias',
    result: 'Digestão leve e sem gases'
  },
  {
    id: 'test_2',
    name: 'Luciana M.',
    age: 42,
    city: 'São Paulo, SP',
    avatar: './assets/aistudio/97fc1627b3371736715ec79fa2aced8b_87f885aa.jpeg',
    tag: 'Calças fechando com folga',
    quote: 'Achei que fosse só mais um teste qualquer, mas a explicação biológica do Biomédico Zuy faz todo o sentido. Eu achava que era gordura resistente, mas era retenção e fermentação!',
    timeAgo: 'Fez o quiz há 5 dias',
    result: 'Desinchaço abdominal visível'
  },
  {
    id: 'test_3',
    name: 'Camila R.',
    age: 38,
    city: 'Curitiba, PR',
    avatar: './assets/aistudio/177c0e77cf36975cd832a569fa1a0282_b4fe2060.jpeg',
    tag: 'Menos gases e cólicas',
    quote: 'Vivia gastando com remédios para gases de farmácia que só mascaravam. O diagnóstico personalizado me mostrou os gatilhos certos. Hoje não sinto mais aquele peso doloroso no fim do dia.',
    timeAgo: 'Fez o quiz há 1 semana',
    result: 'Acorda com abdômen reto'
  },
  {
    id: 'test_4',
    name: 'Patrícia B.',
    age: 31,
    city: 'Rio de Janeiro, RJ',
    avatar: './assets/aistudio/5976e4233c10c6c5458a59c72f6ee753_78c404c8.jpeg',
    tag: 'Resultado comprovado em 7 dias',
    quote: 'Super rápido, objetivo e direto ao ponto. Não tem enrolação, é fisiologia digestiva pura explicada de forma simples. Me ajudou a entender o meu corpo de verdade!',
    timeAgo: 'Fez o quiz há 2 dias',
    result: 'Alívio na cintura e bem-estar'
  }
];

interface HeroTestimonialsProps {
  onStartQuiz: () => void;
  className?: string;
}

export const HeroTestimonials: React.FC<HeroTestimonialsProps> = ({ 
  onStartQuiz, 
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section className={`w-full bg-white rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/40 p-6 sm:p-8 lg:p-10 mb-6 ${className}`}>
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-7">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/90 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Experiências Reais de Quem Já Fez</span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-black text-stone-900 font-display tracking-tight leading-snug">
          O que dizem as pessoas que responderam a este teste
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
          Veja como 60 segundos de avaliação ajudaram centenas de mulheres a identificar o motivo real do estufamento e recuperar o conforto com o abdômen.
        </p>

        {/* Aggregate Social Rating */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-stone-700 mt-3 pt-3 border-t border-stone-100">
          <div className="flex text-amber-400 text-sm tracking-tight">
            ★★★★★
          </div>
          <span className="font-extrabold text-stone-900">4.9 / 5</span>
          <span className="text-stone-300">·</span>
          <span>Mais de 1.400 diagnósticos gerados</span>
          <span className="text-stone-300">·</span>
          <span className="text-emerald-700 flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 inline text-emerald-600" />
            98.4% de precisão relatada
          </span>
        </div>
      </div>

      {/* Grid of Testimonials (Desktop 3-column / Tablet 2-column / Mobile clean cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
        {HERO_TESTIMONIALS.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between p-4 sm:p-5 bg-stone-50/70 hover:bg-stone-50 border border-stone-200/80 rounded-2xl transition-all duration-200 hover:shadow-md hover:border-emerald-200"
          >
            <div>
              {/* Card Top: Stars & Timeframe */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex text-amber-400 text-xs tracking-wider">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-medium text-stone-600 bg-white px-2 py-0.5 rounded-full border border-stone-200">
                  {item.timeAgo}
                </span>
              </div>

              {/* Verified Result Badge */}
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200/70 rounded-full text-[10px] font-bold mb-2.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{item.tag}</span>
              </div>

              {/* Quote Body */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-4">
                "{item.quote}"
              </p>
            </div>

            {/* Author Profile Footer */}
            <div className="pt-3 border-t border-stone-200/60 flex items-center gap-2.5">
              <div className="relative shrink-0">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30"
                  loading="lazy"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center text-white text-[9px] shadow-xs">
                  ✓
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-stone-900 truncate flex items-center gap-1">
                  <span>{item.name}</span>
                  <span className="text-[11px] text-stone-600 font-normal">({item.age} anos)</span>
                </div>
                <div className="text-[11px] text-stone-600 truncate">
                  {item.city}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4th Featured Testimonial Banner (Wide callout) */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50/80 via-emerald-50/40 to-stone-50 border border-emerald-200/80 rounded-2xl mb-7 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={HERO_TESTIMONIALS[3].avatar}
            alt={HERO_TESTIMONIALS[3].name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-600 shadow-sm"
          />
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-emerald-700 text-white rounded-full text-[9px] font-bold">
            Verificada
          </span>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-xs mb-1">
            <span className="font-bold text-stone-900">{HERO_TESTIMONIALS[3].name}</span>
            <span className="text-stone-600 text-[11px]">({HERO_TESTIMONIALS[3].city})</span>
            <span className="text-stone-300">·</span>
            <span className="text-emerald-800 font-semibold text-[11px]">"{HERO_TESTIMONIALS[3].result}"</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
            "{HERO_TESTIMONIALS[3].quote}"
          </p>
        </div>
      </div>

      {/* Call to Action Bar */}
      <div className="text-center pt-2">
        <button
          onClick={onStartQuiz}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-extrabold text-white bg-[#c2542a] hover:bg-[#a9451f] active:bg-[#8f3716] rounded-2xl shadow-lg shadow-[#c2542a]/25 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#c2542a]/40 hover:scale-[1.01]"
        >
          <span>QUERO FAZER MEU TESTE AGORA (60 SEGUNDOS)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-[11px] text-stone-600 mt-2">
          ⚡ Resposta imediata · Sem custos · Diagnóstico personalizado
        </p>
      </div>

    </section>
  );
};
