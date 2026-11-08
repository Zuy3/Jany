import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles, 
  Lock, 
  ChevronDown, 
  Gift, 
  Zap 
} from 'lucide-react';
import { ProfileResult, QuizAnswers } from '../types/quiz';
import { SocialProofCarousel } from './SocialProofCarousel';
import { analytics } from '../services/analytics';

interface ResultScreenProps {
  result: ProfileResult;
  answers?: QuizAnswers;
  leadName?: string;
  utmParams?: Record<string, string>;
  onReset: () => void;
  onOpenPrivacyModal: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  answers = {},
  leadName,
  utmParams = {},
  onReset,
  onOpenPrivacyModal,
}) => {
  const BASE_HOTMART_URL =
    'https://pay.hotmart.com/T93171913Y?off=pz33btfg&checkoutMode=10';

  // Build final checkout link preserving all UTM & tracking tags
  const checkoutUrl = React.useMemo(() => {
    if (!utmParams || Object.keys(utmParams).length === 0) {
      return BASE_HOTMART_URL;
    }
    const params = new URLSearchParams();
    Object.entries(utmParams).forEach(([key, val]) => {
      if (val && typeof val === 'string') {
        params.append(key, val);
      }
    });
    const qs = params.toString();
    return qs ? `${BASE_HOTMART_URL}&${qs}` : BASE_HOTMART_URL;
  }, [utmParams]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const faqs = [
    {
      q: 'Funciona para quem tem mais de 35 ou 45 anos?',
      a: 'Sim, o protocolo foi desenvolvido exatamente para o ritmo metabólico de adultos a partir dos 28 anos, quando as enzimas digestivas diminuem e a sensibilidade a alimentos fermentáveis aumenta.'
    },
    {
      q: 'Preciso passar fome ou cortar tudo o que gosto?',
      a: 'Não. O método não se baseia em restrições extremas ou contagem de calorias, mas sim na substituição inteligente de ingredientes altamente fermentáveis por combinações anti-inchaço e chás carminativos que desinflamam o trato digestivo.'
    },
    {
      q: 'Em quanto tempo posso notar a redução do estufamento?',
      a: 'A maior parte dos praticantes relata alívio na pressão abdominal e nas roupas logo nos primeiros 2 a 3 dias ao aplicar os horários estratégicos de ingestão de água e as infusões digestivas.'
    },
    {
      q: 'Como recebo o acesso ao protocolo?',
      a: 'O acesso é 100% digital e imediato. Assim que o pagamento for confirmado na Hotmart, você recebe por e-mail o link para acessar o protocolo completo e todos os guias bônus no seu celular, tablet ou computador.'
    },
    {
      q: 'E se eu não sentir alívio no inchaço?',
      a: 'Você está protegido pela Garantia Incondicional de 7 Dias da Hotmart. Basta um único clique para solicitar o reembolso total sem qualquer complicação.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-2 sm:py-6 px-3 sm:px-6 space-y-8 pb-20">
      
      {/* 1. Official Personalized Diagnostic Box */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/40 p-6 sm:p-10 relative overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700" />

        {/* Personalized Header Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200/80 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Diagnóstico Concluído</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
            <img
              src="./assets/aistudio/novo_899c45c6.png"
              alt="Biomédico Zuy"
              className="w-7 h-7 rounded-full object-cover object-top border border-emerald-600 shadow-sm"
            />
            <span>Análise por <strong>Biomédico Zuy</strong> para <strong className="text-stone-900">{leadName || 'Você'}</strong></span>
          </div>
        </div>

        {/* Diagnostic Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-display leading-tight mb-4">
          {result.title}
        </h1>

        {/* Score & Perception Bar */}
        <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/80 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Índice de Retenção & Sensibilidade Abdominal
              </div>
              <div className="text-lg font-black text-stone-900">
                Nível Identificado: <span className="text-emerald-800">{result.severity} ({result.bloatingScore}%)</span>
              </div>
            </div>

            <span className="self-start sm:self-auto px-3 py-1 bg-emerald-100 text-emerald-950 font-bold text-xs rounded-lg border border-emerald-300">
              {result.badge}
            </span>
          </div>

          {/* Visual Score Meter */}
          <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-700 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${result.bloatingScore}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-semibold uppercase">
            <span>Leve (0-40%)</span>
            <span>Moderado (41-70%)</span>
            <span>Acentuado (71-100%)</span>
          </div>
        </div>

        {/* Clinical-like Explanation */}
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* 2. Educational Bridge: Why generic diets don't work */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 sm:p-8 text-amber-950">
        <h2 className="text-lg sm:text-xl font-bold font-display mb-2 text-amber-900">
          Por que fazer abdominais ou passar fome não acaba com o estufamento?
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90 mb-3">
          A partir dos 28 anos, mais de 70% do volume na região do abdômen não é gordura resistente — é <strong>fermentação bacteriana e retenção hídrica</strong> causadas por combinações inadequadas de alimentos e digestão desacelerada.
        </p>
        <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90 font-medium">
          A solução não é sofrer em treinos pesados, mas sim seguir um <strong className="font-bold text-amber-950">protocolo anti-inchaço de 7 dias</strong> que desinflama seu trato digestivo e traz de volta a sensação de leveza e as roupas fechando com folga.
        </p>
      </div>

      {/* 2.5 Real Social Proof Carousel (Antes & Depois + Comentários) */}
      <SocialProofCarousel />

      {/* 3. The Irresistible Solution Offer */}
      <div className="bg-stone-900 text-white rounded-3xl border border-stone-800 shadow-2xl overflow-hidden relative">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Banner */}
        <div className="bg-emerald-600 text-white text-center py-2.5 px-4 text-xs font-black uppercase tracking-wider">
          A Solução Definitiva Recomendada Para Seu Perfil
        </div>

        <div className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Bundle Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden shadow-2xl border border-stone-700/80 group">
                <img
                  src="./assets/images/ebook_bundle_showcase_1793474873049.jpg"
                  alt="Kit da Solução Completa Barriga Chapada em 7 Dias - @zuy_silva emagrecer"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="text-[11px] text-stone-400 text-center mt-3 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kit Completo de Desinchaço: Protocolo + Guias Bônus</span>
              </div>
            </div>

            {/* Value Stack & Offer Details */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Método @zuy_silva emagrecer
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white mt-1 mb-2">
                  Protocolo “Barriga Chapada em 7 Dias”
                </h2>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  O passo a passo diário para desinflamar seu abdômen, acabar com a sensação de barriga pesada e recuperar seu bem-estar e auto-estima em apenas uma semana.
                </p>
              </div>

              {/* The Solution Stack */}
              <div className="space-y-3 bg-stone-800/80 p-5 rounded-2xl border border-stone-700/80 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">O Protocolo Central dos 7 Dias:</strong>
                    <span className="text-stone-300 block text-xs mt-0.5">O roteiro matinal, diurno e noturno para desinflamar a digestão e desinchar a barriga sem passar fome.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Bônus #1: 10 Bebidas Funcionais para Desinchar (Valor R$ 7,90)</strong>
                    <span className="text-stone-300 block text-xs mt-0.5">Combinações naturais e infusões diuréticas para acelerar a quebra de toxinas e aliviar a retenção abdominal.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Bônus #2: Cardápio Semanal Completo: 7 Dias de Refeições para emagrecer rápido (Valor R$ 19,00)</strong>
                    <span className="text-stone-300 block text-xs mt-0.5">O roteiro diário estruturado de café, almoço e jantar anti-inchaço com alimentos simples e acessíveis.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Bônus #3: Desincha hoje com este Café da Manhã (Valor R$ 17,00)</strong>
                    <span className="text-stone-300 block text-xs mt-0.5">A primeira refeição estratégica para ativar a motilidade digestiva e evitar estufamento já nas primeiras horas do dia.</span>
                  </div>
                </div>
              </div>

              {/* Price Anchor & CTA */}
              <div className="pt-2">
                <div className="flex flex-wrap items-baseline gap-2.5 mb-1.5">
                  <span className="text-xs text-stone-400 line-through">Valor Total: R$ 140,90</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                    Hoje por apenas R$ 29,90
                  </span>
                  <span className="text-xs text-stone-300 font-medium">
                    (ou 3x de R$ 10,55)
                  </span>
                </div>

                <div className="text-xs text-amber-300 font-semibold mb-3 flex items-center gap-1.5">
                  <span>⚡ Menos de R$ 1,00 por dia durante a sua semana de desinchaço</span>
                </div>

                <div className="mb-4">
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-950/90 px-3 py-1 rounded-lg border border-amber-600/60 inline-block">
                    CONDIÇÃO EXCLUSIVA GERADA PARA O SEU DIAGNÓSTICO
                  </span>
                </div>

                {/* Conversion Button */}
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.initiateCheckout(29.90, 'BRL')}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-base sm:text-lg font-black text-stone-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all cursor-pointer hover:scale-[1.01] focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 text-center"
                >
                  <span>QUERO DESINCHAR MINHA BARRIGA EM 7 DIAS (R$ 29,90)</span>
                  <ExternalLink className="w-5 h-5 shrink-0" />
                </a>

                {/* Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-stone-400 mt-3 pt-3 border-t border-stone-800">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pagamento Seguro via Hotmart</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>7 Dias de Garantia Incondicional</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Acesso Imediato no Celular e E-mail</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 4. Guarantee Seal */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-800 font-bold text-center p-2">
          <div>
            <div className="text-xl font-black leading-none">7</div>
            <div className="text-[10px] uppercase font-bold tracking-tight">Dias de Garantia</div>
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-stone-900 mb-1">
            Garantia de Risco Zero: Seu Abdômen Mais Leve ou Seu Dinheiro de Volta
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Experimente o protocolo "Barriga Chapada em 7 Dias". Se dentro de 7 dias você não sentir seu estufamento reduzido e uma melhora nítida na sua digestão, basta um clique para receber 100% do seu dinheiro de volta na Hotmart.
          </p>
        </div>
      </div>

      {/* 4.5 Specialist Authority Card (Biomédico Zuy) */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src="./assets/aistudio/novo_899c45c6.png"
            alt="Biomédico Zuy"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top border-2 border-emerald-600 shadow-md shrink-0"
          />
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Responsável Técnico & Criação do Método</span>
            </div>
            <h3 className="text-xl font-black text-stone-900 font-display">
              Biomédico Zuy
            </h3>
            <p className="text-xs font-semibold text-emerald-800 mb-3">
              Especialista em Fisiologia Digestiva, Hábitos & Anti-Inflamação Abdominal
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
              "Dedico meus estudos a desmistificar a falsa ideia de que o inchaço abdominal feminino é preguiça ou excesso de peso. A vasta maioria das mulheres sofre com fermentação bacteriana desordenada e sobrecarga digestiva. O Protocolo Barriga Chapada em 7 Dias foi estruturado para devolver a leveza, a liberdade de vestir o que quiser e o funcionamento intestinal regulado, com respaldo biológico e respeito à sua saúde."
            </p>
          </div>
        </div>
      </div>

      {/* 5. FAQ Accordion */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-6 sm:p-8">
        <h3 className="text-xl font-bold font-display text-stone-900 mb-6 text-center">
          Dúvidas Frequentes sobre o Protocolo
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={index}
                className="border border-stone-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-900 hover:bg-stone-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Medical and Ethical Disclaimer */}
      <div className="bg-stone-100/90 border border-stone-200 rounded-2xl p-5 text-xs text-stone-600 leading-relaxed text-center sm:text-left">
        <strong className="block text-stone-900 font-bold mb-1">
          Aviso Legal e Diretrizes Éticas @zuy_silva emagrecer
        </strong>
        <p>
          Este questionário e o método recomendado têm finalidade exclusivamente educativa e informativa sobre hábitos cotidianos e percepção de bem-estar. Não constituem consulta ou diagnóstico médico nem prometem cura de enfermidades digestivas ou perdas milagrosas de peso. Para condições clínicas agudas, procure sempre um médico gastroenterologista ou nutricionista habilitado.
        </p>
      </div>

      {/* 7. Retake button */}
      <div className="text-center pt-2">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-white rounded-xl border border-stone-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Refazer Questionário com Novas Respostas</span>
        </button>
      </div>

      {/* 8. Sticky Mobile Bottom Floating CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-stone-200 sm:hidden shadow-lg">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <div className="text-[10px] text-stone-500 line-through">Valor Total: R$ 140,90</div>
            <div className="text-xs font-black text-emerald-800">Apenas R$ 29,90</div>
          </div>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.initiateCheckout(29.90, 'BRL')}
            className="px-5 py-3 text-xs font-black text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer text-center"
          >
            DESINCHAR EM 7 DIAS (R$ 29,90) →
          </a>
        </div>
      </div>

    </div>
  );
};
