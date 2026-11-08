import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const HERO_FAQS: FaqItem[] = [
  {
    question: 'O teste é realmente gratuito?',
    answer: 'Sim, a realização do quiz e a geração do seu diagnóstico detalhado de perfil digestivo são 100% gratuitos e imediatos.',
  },
  {
    question: 'Quanto tempo leva para responder?',
    answer: 'Menos de 60 segundos! São apenas 7 perguntas objetivas sobre sua rotina, o que você costuma comer e em que momentos do dia sua barriga mais estufa.',
  },
  {
    question: 'Como o quiz descobre a causa do meu inchaço?',
    answer: 'O questionário foi calibrado por especialista em fisiologia digestiva para cruzar seus sintomas e identificar se a sua dilatação vem de fermentação bacteriana (gases), retenção linfática de líquidos, digestão mecânica acelerada ou tensão neurodigestiva.',
  },
  {
    question: 'Preciso baixar algum aplicativo para ver o resultado?',
    answer: 'Não. O seu diagnóstico completo aparece na mesma hora na tela do seu celular ou computador, sem necessidade de instalar nada.',
  },
  {
    question: 'Minhas respostas ficam protegidas e confidenciais?',
    answer: 'Com certeza. Suas informações são tratadas com total sigilo e utilizadas exclusivamente para calcular e personalizar o seu diagnóstico.',
  },
];

export const HeroFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mt-8 pt-6 border-t border-stone-200/80">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-amber-100/80 flex items-center justify-center text-amber-800">
          <HelpCircle className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-stone-800 font-display">
          Dúvidas Frequentes sobre o Quiz
        </h2>
      </div>

      <div className="space-y-2.5">
        {HERO_FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-stone-200/90 rounded-2xl overflow-hidden bg-stone-50/60 transition-colors hover:bg-stone-50"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-stone-900 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 select-none"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-700' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-200/50 bg-white/70 animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
