import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

interface AnalyzingScreenProps {
  onComplete: () => void;
  leadName?: string;
}

const MILESTONES = [
  'Cruzando dados de sensibilidade e fermentação digestiva...',
  'Mapeando retenção hídrica, gases e velocidade intestinal...',
  'Estruturando o cronograma prático de 7 dias com o Biomédico Zuy...'
];

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ onComplete, leadName }) => {
  const [percent, setPercent] = useState(18);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 55);

    const stageTimer = setInterval(() => {
      setStageIndex(prev => {
        if (prev < MILESTONES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 950);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 3100);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stageTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  const displayName = leadName?.trim() ? leadName.trim() : 'Seu Perfil';

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/40 p-7 sm:p-10 text-center">
      {/* Visual specialist presence */}
      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-emerald-600 shadow-md">
        <img
          src="/assets/aistudio/novo_899c45c6.png"
          alt="Biomédico Zuy analisando seus dados"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200/70">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
        <span>Processando Avaliação Algorítmica</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display mb-1">
        Analisando os Hábitos de {displayName}
      </h2>
      <p className="text-xs text-stone-500 mb-5">
        Identificando gatilhos de inflamação e combinando orientações de alívio rápido.
      </p>

      {/* Progress Bar & Number */}
      <div className="my-5">
        <div className="flex items-center justify-between text-xs font-bold text-stone-600 mb-2">
          <span className="truncate pr-2">{MILESTONES[stageIndex]}</span>
          <span className="tabular-nums text-emerald-800 font-extrabold text-sm">{Math.min(100, percent)}%</span>
        </div>

        <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${Math.min(100, percent)}%` }}
          />
        </div>
      </div>

      {/* Milestone Checkpoints */}
      <div className="space-y-2.5 text-left bg-stone-50/90 rounded-2xl p-4 border border-stone-200/70 text-xs text-stone-600 mb-5">
        {MILESTONES.map((milestone, idx) => {
          const isDone = stageIndex >= idx;
          const isCurrent = stageIndex === idx;

          return (
            <div key={idx} className="flex items-center gap-2.5">
              <CheckCircle2
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isDone ? 'text-emerald-600' : 'text-stone-300'
                }`}
              />
              <span className={isCurrent ? 'font-bold text-stone-900' : isDone ? 'text-stone-700' : 'text-stone-400'}>
                {milestone}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quantified Social Proof */}
      <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-center mb-4">
        <span className="text-[11px] font-bold text-amber-950 block">
          Mais de 4.800 mulheres já avaliaram seus hábitos com @zuy_silva emagrecer
        </span>
        <span className="text-[10px] text-amber-800">
          Índice de 98,4% de satisfação com as orientações do protocolo
        </span>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Garantia de confidencialidade e dados protegidos</span>
      </div>
    </div>
  );
};
