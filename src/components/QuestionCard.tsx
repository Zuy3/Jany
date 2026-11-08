import React, { useEffect, useState } from 'react';
import { QuizQuestion } from '../types/quiz';
import { Check, ArrowRight, ArrowLeft, Sparkles, Lightbulb, HeartHandshake, ShieldCheck } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  currentStep?: number;
  totalSteps?: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
  leadName?: string;
  onNameChange?: (name: string) => void;
}

interface CardProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  canGoBack?: boolean;
}

const CardProgressBar: React.FC<CardProgressBarProps> = ({
  currentStep,
  totalSteps,
  onBack,
  canGoBack = false,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  const remainingQuestions = totalSteps - currentStep;

  // Dynamic motivational text indicating how much is left
  const getMotivationalText = () => {
    if (currentStep === 1) return 'Início da avaliação · ~50 segundos';
    if (remainingQuestions === 0) return 'Última pergunta! Diagnóstico quase pronto';
    if (remainingQuestions === 1) return 'Falta apenas 1 pergunta!';
    if (remainingQuestions <= 3) return `Faltam apenas ${remainingQuestions} perguntas`;
    return `Faltam ${remainingQuestions} etapas para seu cronograma`;
  };

  return (
    <div className="-mt-6 sm:-mt-9 -mx-6 sm:-mx-9 mb-6 bg-gradient-to-b from-stone-50 to-stone-50/40 border-b border-stone-200/80">
      {/* 1. Slim Top Progress Track (Terracotta to Olive Green gradient fill) */}
      <div 
        className="w-full h-2 bg-stone-200/80 relative overflow-hidden" 
        role="progressbar" 
        aria-valuenow={percentage} 
        aria-valuemin={0} 
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-to-r from-[#c2542a] via-[#b8532c] to-[#2d5a3f] transition-all duration-500 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle light shimmer highlight */}
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>

      {/* 2. Stylized Status Header with Terracotta and Olive Accents */}
      <div className="px-5 sm:px-9 py-3 flex items-center justify-between gap-3 text-xs">
        {/* Left: Quick Back Navigation & Step Counter */}
        <div className="flex items-center gap-2">
          {canGoBack && onBack && (
            <button
              type="button"
              onClick={onBack}
              className="text-[#2d5a3f] hover:text-[#1e3d2a] font-bold flex items-center gap-1 cursor-pointer py-1 px-1.5 -ml-1 rounded-lg hover:bg-emerald-100/60 transition-colors"
              title="Voltar para a pergunta anterior"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Voltar</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 font-bold text-stone-800">
            <span className="w-2 h-2 rounded-full bg-[#c2542a] shadow-xs" />
            <span>
              Etapa <strong className="text-stone-900 font-extrabold">{currentStep}</strong> de {totalSteps}
            </span>
          </div>
        </div>

        {/* Right: Remaining Questions Motivational Pill */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-stone-600 font-medium">
            {getMotivationalText()}
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#c2542a]/10 text-[#a9451f] border border-[#c2542a]/25 shadow-xs">
            {remainingQuestions === 0 ? (
              <span className="text-[#2d5a3f]">Etapa Final</span>
            ) : (
              <span>{percentage}% concluído</span>
            )}
          </span>
        </div>
      </div>

      {/* 3. Segmented Micro-Steps (Visual step pills) */}
      <div className="px-5 sm:px-9 pb-2.5 flex items-center gap-1 sm:gap-1.5">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                isCompleted
                  ? 'bg-[#2d5a3f]' // Verde oliva para etapas concluídas
                  : isCurrent
                  ? 'bg-[#c2542a] shadow-xs ring-2 ring-[#c2542a]/30' // Terracota para a etapa atual
                  : 'bg-stone-200' // Neutro para etapas restantes
              }`}
              title={`Pergunta ${stepNumber} de ${totalSteps}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentStep = 1,
  totalSteps = 8,
  selectedOptionId,
  onSelectOption,
  onNext,
  onBack,
  isFirst,
  isLast,
  leadName = '',
  onNameChange,
}) => {
  const [localNameInput, setLocalNameInput] = useState(leadName);

  useEffect(() => {
    setLocalNameInput(leadName);
  }, [leadName]);

  // Interpolate name in title and subtitle if available
  const formattedTitle = question.title.replace(
    /\{nome\}/gi,
    leadName?.trim() ? leadName.trim() : 'você'
  );
  const formattedSubtitle = question.subtitle.replace(
    /\{nome\}/gi,
    leadName?.trim() ? leadName.trim() : 'você'
  );

  // Keyboard navigation for radio options
  useEffect(() => {
    if (question.type === 'text_name') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= question.options.length) {
        onSelectOption(question.options[num - 1].id);
      } else if (e.key === 'Enter' && selectedOptionId) {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft' && !isFirst) {
        e.preventDefault();
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, selectedOptionId, onSelectOption, onNext, onBack, isFirst]);

  const handleOptionClick = (optionId: string) => {
    onSelectOption(optionId);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localNameInput.trim().length >= 2) {
      if (onNameChange) {
        onNameChange(localNameInput.trim());
      }
      onSelectOption(localNameInput.trim());
      onNext();
    }
  };

  // 1. Empathetic Interlude Screen
  if (question.type === 'empathetic_interlude') {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/40 p-6 sm:p-9 transition-all text-center overflow-hidden">
        <CardProgressBar currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} canGoBack={!isFirst} />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200/80 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
          <HeartHandshake className="w-4 h-4 text-emerald-600" />
          <span>Acolhimento Clínico · @zuy_silva emagrecer</span>
        </div>

        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-emerald-600 shadow-md">
          <img
            src="./assets/aistudio/novo_899c45c6.png"
            alt="Biomédico Zuy"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display mb-3">
          {formattedTitle}
        </h2>

        <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
          {formattedSubtitle}
        </p>

        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 mb-6 text-xs text-stone-700 text-left space-y-2">
          <div className="flex items-center gap-2 font-bold text-stone-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Fato biológico comprovado:</span>
          </div>
          <p className="leading-relaxed">
            O estufamento que surge após o almoço ou ao fim da tarde é gerado por gases de fermentação bacteriana e lentidão do trânsito digestivo. Quando você ajusta os 3 gatilhos certos, a barriga responde com alívio já nas primeiras 48h a 72h.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-bold rounded-xl text-white bg-[#c2542a] hover:bg-[#a9451f] shadow-lg shadow-[#c2542a]/25 transition-all hover:scale-[1.01] cursor-pointer"
          >
            <span>CONTINUAR MEU DIAGNÓSTICO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 2. Early Name Input Question
  if (question.type === 'text_name') {
    const isNameValid = localNameInput.trim().length >= 2;

    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/40 p-6 sm:p-9 transition-all overflow-hidden">
        <CardProgressBar currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} canGoBack={!isFirst} />

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-[#964222] border border-amber-200/80 rounded-full text-[11px] font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Personalização Imediata</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-snug tracking-tight font-display mb-2">
            {question.title}
          </h2>
          {question.subtitle && (
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              {question.subtitle}
            </p>
          )}
        </div>

        {/* Contextual Visual Header */}
        {question.image && (
          <div className="relative w-full h-40 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-stone-200/80 shadow-xs">
            <img
              src={question.image}
              alt={question.imageAlt || question.title}
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        <form onSubmit={handleNameSubmit} className="space-y-6 mb-6">
          <div>
            <label htmlFor="user_first_name" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Seu Primeiro Nome:
            </label>
            <input
              id="user_first_name"
              type="text"
              autoFocus
              value={localNameInput}
              onChange={(e) => {
                setLocalNameInput(e.target.value);
                if (onNameChange) {
                  onNameChange(e.target.value);
                }
              }}
              placeholder={question.inputPlaceholder || 'Ex: Mariana, Paula, Juliana...'}
              className="w-full px-4 py-4 rounded-2xl border border-stone-300 text-stone-900 text-base font-semibold focus:outline-none focus:ring-3 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all bg-stone-50/50"
            />
            <p className="text-[11px] text-stone-500 mt-2">
              Usaremos seu nome apenas para personalizar seu diagnóstico e seu protocolo de 7 dias.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={onBack}
              disabled={isFirst}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                isFirst ? 'invisible opacity-0' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>

            <button
              type="submit"
              disabled={!isNameValid}
              className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold rounded-xl shadow-md transition-all cursor-pointer ${
                isNameValid
                  ? 'bg-[#c2542a] hover:bg-[#a9451f] text-white active:bg-[#8f3716] hover:scale-[1.01] shadow-lg shadow-[#c2542a]/25'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <span>AVANÇAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 3. Standard Options Question
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/40 p-5 sm:p-9 transition-all overflow-hidden">
      <CardProgressBar currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} canGoBack={!isFirst} />

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-snug tracking-tight font-display mb-2">
          {formattedTitle}
        </h2>
        {question.subtitle && (
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {formattedSubtitle}
          </p>
        )}
      </div>

      {/* Contextual Visual Banner */}
      {question.image && (
        <div className="relative w-full h-44 sm:h-56 rounded-2xl overflow-hidden mb-6 border border-stone-200/80 shadow-xs group">
          <img
            src={question.image}
            alt={question.imageAlt || question.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>
      )}

      {/* Options */}
      <fieldset className="space-y-3 mb-6" aria-label={question.title}>
        <legend className="sr-only">Selecione uma das opções</legend>

        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          return (
            <label
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`group relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all duration-150 select-none ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-600 ring-2 ring-emerald-600/30 shadow-sm scale-[1.008]'
                  : 'bg-white border-stone-200/90 hover:border-emerald-300 hover:bg-stone-50/70 active:scale-[0.995]'
              }`}
            >
              <input
                type="radio"
                name={`question_${question.id}`}
                value={option.id}
                checked={isSelected}
                onChange={() => handleOptionClick(option.id)}
                className="sr-only"
                aria-describedby={`opt-desc-${option.id}`}
              />

              {/* Badge letter / Checkmark */}
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 group-hover:bg-emerald-100 group-hover:text-emerald-900'
                }`}
                aria-hidden="true"
              >
                {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : letter}
              </div>

              {/* Label & Detail */}
              <div className="flex-1 min-w-0">
                <span
                  className={`block text-sm sm:text-base leading-snug font-medium ${
                    isSelected ? 'text-emerald-950 font-bold' : 'text-stone-800'
                  }`}
                >
                  {option.label}
                </span>

                {option.detail && (
                  <span
                    id={`opt-desc-${option.id}`}
                    className={`block text-xs mt-1 leading-relaxed ${
                      isSelected ? 'text-emerald-800' : 'text-stone-500'
                    }`}
                  >
                    {option.detail}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </fieldset>

      {/* Dynamic Educational Snippet ("Você sabia?") */}
      {question.educationalSnippet && selectedOptionId && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-start gap-3 text-xs text-amber-950 animate-fadeIn">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold uppercase text-[10px] tracking-wider text-amber-800 block mb-0.5">
              {question.educationalSnippet.tag || 'Você sabia?'}
            </span>
            <p className="leading-relaxed">
              {question.educationalSnippet.text}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100">
        <button
          type="button"
          onClick={onBack}
          disabled={isFirst}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
            isFirst
              ? 'invisible opacity-0'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!selectedOptionId}
          className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold rounded-xl shadow-md transition-all cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#c2542a]/30 ${
            selectedOptionId
              ? 'bg-[#c2542a] hover:bg-[#a9451f] text-white active:bg-[#8f3716] hover:scale-[1.01] shadow-lg shadow-[#c2542a]/25'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <span>{isLast ? 'FINALIZAR E VER RESULTADO' : 'AVANÇAR'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
