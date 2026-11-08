import React from 'react';
import { ShieldCheck, Database, HelpCircle, Volume2, VolumeX, Download } from 'lucide-react';

interface HeaderProps {
  onOpenIntegrationModal: () => void;
  onOpenPrivacyModal: () => void;
  onResetQuiz: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  currentStepTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenIntegrationModal,
  onOpenPrivacyModal,
  onResetQuiz,
  soundEnabled = true,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={onResetQuiz}
          className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-sm"
          title="@zuy_silva emagrecer - Início"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 font-display">
            @zuy_silva emagrecer
          </span>
        </button>

        {/* Zone 2: Navigation Links (Clean single-line prose, no pills) */}
        <nav className="hidden sm:flex items-center gap-6 text-xs sm:text-sm text-stone-600 font-medium">
          <button
            onClick={onResetQuiz}
            className="hover:text-emerald-900 transition-colors cursor-pointer whitespace-nowrap"
          >
            Avaliação
          </button>
          <span className="text-stone-300 select-none" aria-hidden="true">·</span>
          <button
            onClick={onOpenPrivacyModal}
            className="hover:text-emerald-900 transition-colors cursor-pointer whitespace-nowrap"
          >
            Metodologia & Ética
          </button>
          <span className="text-stone-300 select-none" aria-hidden="true">·</span>
          <a
            href="https://pay.hotmart.com/T93171913Y?off=pz33btfg&checkoutMode=10"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-900 transition-colors whitespace-nowrap font-medium text-emerald-800"
          >
            Solução Anti-Inchaço
          </a>
        </nav>

        {/* Zone 3: Single Primary Action / System Status & Audio Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {onToggleSound && (
            <button
              type="button"
              onClick={onToggleSound}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title={soundEnabled ? 'Silenciar efeitos sonoros' : 'Ativar efeitos sonoros'}
              aria-label={soundEnabled ? 'Silenciar som' : 'Ativar som'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-800" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-400" />
              )}
            </button>
          )}

          <a
            href="./quiz-zuy-emagrecer-html.zip"
            download="quiz-zuy-emagrecer-html.zip"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-all shadow-xs cursor-pointer"
            title="Baixar pacote completo em HTML pronto para publicar no GitHub Pages"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Baixar Projeto (ZIP)</span>
            <span className="sm:hidden">Baixar</span>
          </a>

          <button
            onClick={onOpenIntegrationModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200/90 rounded-md hover:bg-emerald-100/80 transition-colors cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            title="Verificar status da integração técnica de captação de leads"
          >
            <Database className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden xs:inline">Integração</span>
            <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">Ativa</span>
          </button>
        </div>
      </div>
    </header>
  );
};
