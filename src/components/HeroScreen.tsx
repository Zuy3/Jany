import React from 'react';
import { ArrowRight, Clock, ShieldCheck, Sparkles, CheckCircle2, Flame, UserCheck, Heart } from 'lucide-react';

interface HeroScreenProps {
  onStartQuiz: () => void;
  onOpenPrivacyModal: () => void;
  onDirectToResult?: () => void;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({ 
  onStartQuiz, 
  onOpenPrivacyModal,
  onDirectToResult 
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto py-2 sm:py-6 px-3 sm:px-6">
      
      {/* High-Converting Hero Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xl shadow-stone-200/60 overflow-hidden mb-6">
        
        {/* Top Attention Bar */}
        <div className="bg-[#b8532c] text-white text-center py-2 px-4 text-xs font-black uppercase tracking-wider">
          Avaliação de Hábitos Digestivos & Conforto Abdominal
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div>
            {/* Premium Top Kicker with Specialist Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-[#964222] border border-amber-200/80 rounded-full text-[11px] font-bold tracking-wide uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Avaliação @zuy_silva emagrecer · Biomédico Zuy</span>
            </div>

            {/* Main Visceral Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-black text-stone-900 tracking-tight leading-[1.2] font-display mb-4 text-balance">
              Você acorda com a barriga reta e termina o dia parecendo que está grávida de 4 meses?
            </h1>

            {/* Persuasive Bridge */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Se ao entardecer ou após comer você precisa <strong className="text-stone-900 font-bold">desabotoar o botão da calça</strong>, sofre com gases presos e um peso constante no estômago, o motivo <strong className="text-stone-900 font-bold">não é gordura: é fermentação de alimentos específicos e digestão desacelerada</strong>.
            </p>

            {/* 3 Emotional Resonance Points */}
            <div className="space-y-3 mb-6 bg-stone-50/90 p-4 sm:p-5 rounded-2xl border border-stone-200/70">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-stone-700">
                  <strong>7 perguntas simples (60 segundos)</strong> para mapear o seu perfil de digestão.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-stone-700">
                  <strong>Descubra quais alimentos do seu dia a dia</strong> estão fermentando e gerando gases.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-stone-700">
                  <strong>Veja como aliviar a pressão na cintura em 7 dias</strong> com orientações naturais.
                </span>
              </div>
            </div>

            {/* Specialist Quote Box */}
            <div className="flex items-center gap-3.5 p-3.5 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl mb-7">
              <img
                src="./assets/aistudio/novo_899c45c6.png"
                alt="Biomédico Zuy"
                className="w-12 h-12 rounded-full object-cover object-top border-2 border-emerald-600 shadow-sm shrink-0"
              />
              <div className="text-xs text-stone-700">
                <div className="font-bold text-stone-900">Biomédico Zuy</div>
                <p className="text-[11px] text-stone-600 italic">
                  "O estufamento persistente após os 28 anos é um sinal biológico de sobrecarga digestiva. Não precisa passar fome: pequenas trocas estratégicas trazem alívio já nas primeiras 48h a 72h."
                </p>
              </div>
            </div>
          </div>

          {/* High Conversion CTA Section */}
          <div className="pt-2">
            <button
              onClick={onStartQuiz}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-5 text-base sm:text-lg font-black text-white bg-[#c2542a] hover:bg-[#a9451f] active:bg-[#8f3716] rounded-2xl shadow-xl shadow-[#c2542a]/30 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#c2542a]/40 hover:scale-[1.01]"
            >
              <span>QUERO DESCOBRIR A CAUSA DO MEU INCHAÇO</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Shortcut: Já fez o teste? */}
            {onDirectToResult && (
              <div className="mt-3 text-center sm:text-left">
                <button
                  type="button"
                  onClick={onDirectToResult}
                  className="text-xs text-stone-500 hover:text-[#b8532c] underline cursor-pointer font-medium"
                >
                  Já fez o teste anteriormente? Acessar resultado direto →
                </button>
              </div>
            )}

            {/* Social Proof Trust Snippet */}
            <div className="flex items-center gap-3 pt-4 border-t border-stone-200/60 mt-4">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="./assets/aistudio/1d8da273ae648a8f3190d23e08e39821_e74dc1cc.jpeg" alt="Transformação 1" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="./assets/aistudio/97fc1627b3371736715ec79fa2aced8b_87f885aa.jpeg" alt="Transformação 2" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="./assets/aistudio/177c0e77cf36975cd832a569fa1a0282_b4fe2060.jpeg" alt="Transformação 3" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="./assets/aistudio/d8d0d93e77484e9048a47df3961f9cd5_4d8d9856.jpeg" alt="Transformação 4" />
              </div>
              <div className="text-[11px] text-stone-600 leading-tight">
                <div className="font-bold text-stone-900 flex items-center gap-1">
                  <span className="text-amber-500">★★★★★</span>
                  <span>4.9 / 5</span>
                </div>
                <span>Mais de 1.400 pessoas com menos retenção</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-stone-500 mt-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Duração: 60 segundos</span>
              </span>
              <span className="text-stone-300">·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Gratuito & Confidencial</span>
              </span>
              <span className="text-stone-300">·</span>
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Adultos 28+</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ethical Medical Notice */}
      <div className="text-center text-[11px] text-stone-500 max-w-xl mx-auto leading-relaxed">
        <span>Aviso importante: Este teste tem finalidade exclusivamente educacional sobre hábitos de estilo de vida e não substitui consulta médica ou nutricional. </span>
        <button
          onClick={onOpenPrivacyModal}
          className="text-stone-700 underline font-medium hover:text-[#b8532c] cursor-pointer"
        >
          Saiba mais sobre nossa metodologia
        </button>.
      </div>
    </div>
  );
};

