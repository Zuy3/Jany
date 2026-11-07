import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RefreshCw, Lightbulb, ExternalLink } from 'lucide-react';
import { ProfileResult } from '../types/quiz';
import { analytics } from '../services/analytics';

interface CustomGuidanceCardProps {
  profileResult: ProfileResult;
  leadName?: string;
  checkoutUrl?: string;
}

export const CustomGuidanceCard: React.FC<CustomGuidanceCardProps> = ({
  profileResult,
  leadName,
  checkoutUrl,
}) => {
  const finalCheckoutUrl =
    checkoutUrl || 'https://pay.hotmart.com/T93171913Y?off=pz33btfg&checkoutMode=10';

  const [routineText, setRoutineText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAdvice, setGeneratedAdvice] = useState<{
    insight: string;
    tips: string[];
  } | null>(null);

  const QUICK_CHIPS = [
    'Trabalho por turnos',
    'Almoço muito tarde',
    'Tomo muito café',
    'Janto tarde e durmo logo',
    'Fico muito tempo sentada'
  ];

  const handleChipClick = (chip: string) => {
    if (!routineText) {
      setRoutineText(chip);
    } else if (!routineText.includes(chip)) {
      setRoutineText(prev => `${prev}, ${chip.toLowerCase()}`);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const lower = routineText.toLowerCase();
      let customInsight = 'Para a sua rotina, o ponto crítico é diminuir a sobrecarga gástrica no período em que sua digestão está mais desacelerada.';
      let customTips = [
        'Organizar janelas de refeição de fácil digestão nos horários de maior cansaço.',
        'Inserir infusões mornas digestivas 30 minutos após a maior refeição do dia.',
        'Evitar misturar fontes densas de gordura e carboidratos refinados no fim da jornada.'
      ];

      if (lower.includes('turno') || lower.includes('noite') || lower.includes('plantão')) {
        customInsight = 'Trabalhar por turnos desregula o relógio biológico digestivo e o cortisol, favorecendo retenção de gases nas trocas de horário.';
        customTips = [
          'Priorize refeições mornas e líquidas/pastosas durante plantões noturnos (caldos e sopas leves).',
          'Não deite com o estômago em digestão ativa: aguarde 45 minutos com infusão de camomila ou erva-doce.',
          'Beba água pura fracionada ao longo do turno em vez de acumular no final.'
        ];
      } else if (lower.includes('tarde') || lower.includes('janto') || lower.includes('almoço')) {
        customInsight = 'Fazer refeições muito tarde prolonga a fermentação gástrica durante o sono, fazendo você acordar com sensação de peso e barriga estufada.';
        customTips = [
          'Deixe um intervalo de pelo menos 2h30 entre o jantar e o sono para que a faxina intestinal ocorra.',
          'Substitua carboidratos pesados à noite por vegetais cozidos e proteínas leves de fácil quebra.',
          'Tome uma xícara de chá de hortelã ou gengibre suave após o jantar para acelerar o esvaziamento gástrico.'
        ];
      } else if (lower.includes('café') || lower.includes('refrigerante') || lower.includes('gás')) {
        customInsight = 'O excesso de café ou bebidas gaseificadas irrita a mucosa gástrica e induz aerofagia (acúmulo de ar), provocando inchaço imediato.';
        customTips = [
          'Nunca tome café puro em jejum sem antes hidratar o estômago com 300ml de água morna.',
          'Limite o café após as 14h para não travar a fase parassimpática da digestão e do sono.',
          'Troque a segunda ou terceira xícara por chá verde leve ou infusão digestiva @zuy_silva emagrecer.'
        ];
      } else if (lower.includes('sentad') || lower.includes('escritório') || lower.includes('mesa')) {
        customInsight = 'Passar muitas horas na mesma posição comprime o baixo ventre e reduz os movimentos peristálticos naturais do intestino.';
        customTips = [
          'Faça pausas de 2 minutos a cada 2 horas para caminhar e liberar a pressão intra-abdominal.',
          'Evite calças ou cintos muito apertados após o almoço, que forçam o estufamento dos tecidos.',
          'Pratique 3 respirações diafragmáticas lentas antes de começar a comer.'
        ];
      }

      setGeneratedAdvice({
        insight: customInsight,
        tips: customTips
      });
      setIsGenerating(false);
    }, 700);
  };

  return (
    <div className="space-y-5 my-6">
      
      {/* 1. Intelligent Custom Routine Input Card (Inspired directly by user's screenshot) */}
      <div className="bg-white rounded-3xl border-2 border-stone-200/90 shadow-lg p-6 sm:p-8 relative overflow-hidden transition-all">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900 tracking-tight">
            Orientações personalizadas
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
          Com base nas suas respostas, geramos dicas de hábitos só para você. Se quiser, conte algo a mais sobre a sua rotina.
        </p>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="text-[11px] font-semibold text-stone-400">Sugestões rápidas:</span>
          {QUICK_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="text-[11px] px-2.5 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 border border-stone-200 rounded-full text-stone-600 transition-colors cursor-pointer"
            >
              + {chip}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label
              htmlFor="routine-notes"
              className="block text-xs font-bold text-stone-800 mb-1.5"
            >
              Algo a mais? <span className="text-stone-400 font-normal">(opcional)</span>
            </label>
            <textarea
              id="routine-notes"
              rows={3}
              value={routineText}
              onChange={(e) => setRoutineText(e.target.value)}
              placeholder="Ex.: trabalho por turnos e almoço muito tarde"
              className="w-full p-4 rounded-2xl border-2 border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none shadow-xs"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#b8532c] text-[#b8532c] hover:bg-[#b8532c] hover:text-white active:bg-[#964222] font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-4 focus-visible:ring-[#b8532c]/30"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Gerando suas orientações personalizadas...</span>
              </>
            ) : (
              <span>Gerar minhas orientações</span>
            )}
          </button>
        </form>

        {/* Dynamic Custom Advice Display */}
        {generatedAdvice && (
          <div className="mt-6 pt-5 border-t border-stone-100 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-amber-50/80 rounded-2xl p-4 sm:p-5 border border-amber-200/90 text-stone-800">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Ajuste Estratégico para o Seu Dia a Dia:</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium mb-3">
                {generatedAdvice.insight}
              </p>
              <div className="space-y-2">
                {generatedAdvice.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Direct Conversion Card (Leading Directly to Checkout) */}
      <div className="bg-white rounded-3xl border-2 border-[#b8532c] shadow-xl p-6 sm:p-8 relative overflow-hidden transition-all">
        <h3 className="text-xl sm:text-2xl font-bold font-display text-stone-900 tracking-tight mb-2">
          Protocolo “Barriga Chapada em 7 Dias”
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
          O guia prático do @zuy_silva emagrecer com o passo a passo para organizar a alimentação e a rotina ao longo de 7 dias, desinflamar a digestão e eliminar a sensação de estufamento. Os resultados variam de pessoa para pessoa.
        </p>

        {/* High Converting Checkout Button */}
        <a
          href={finalCheckoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.initiateCheckout(29.90, 'BRL')}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-4.5 rounded-full bg-[#c2542a] hover:bg-[#a9451f] active:bg-[#8f3716] text-white font-bold text-base sm:text-lg shadow-lg shadow-[#c2542a]/30 transition-all duration-200 cursor-pointer hover:scale-[1.01] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#c2542a]/40"
        >
          <span>Quero o protocolo agora</span>
          <ArrowRight className="w-5 h-5" />
        </a>

        <div className="flex items-center justify-center gap-4 text-[11px] text-stone-400 mt-3">
          <span>Acesso Imediato</span>
          <span>·</span>
          <span>Garantia de 7 Dias Hotmart</span>
          <span>·</span>
          <span>Pagamento Seguro</span>
        </div>
      </div>

    </div>
  );
};
