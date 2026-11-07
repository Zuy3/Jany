import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  canGoBack?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  onBack,
  canGoBack = false,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  const remainingQuestions = totalSteps - currentStep;
  const estimatedSeconds = Math.max(15, remainingQuestions * 12);

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 px-2">
      <div className="flex items-center justify-between text-xs font-medium text-stone-500 mb-2">
        <div className="flex items-center gap-2">
          {canGoBack && onBack && (
            <button
              onClick={onBack}
              className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 cursor-pointer py-1 px-1 -ml-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-label="Voltar para a pergunta anterior"
            >
              ← Voltar
            </button>
          )}
          <span>
            Pergunta <strong className="text-stone-900">{currentStep}</strong> de {totalSteps}
          </span>
          <span className="hidden sm:inline text-stone-300">|</span>
          <span className="hidden sm:inline text-stone-500 font-normal">~{estimatedSeconds}s para seu diagnóstico</span>
        </div>
        <span className="tabular-nums font-semibold text-emerald-800">{percentage}% Concluído</span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2.5 bg-stone-200/80 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-emerald-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
