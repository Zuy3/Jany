import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyModal: () => void;
  onOpenIntegrationModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyModal,
  onOpenIntegrationModal,
}) => {
  return (
    <footer className="border-t border-stone-200/80 bg-white/70 mt-12 py-8 text-xs text-stone-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 text-center sm:text-left">
          <div>
            <span className="font-bold text-stone-800 text-sm font-display tracking-tight">
              @zuy_silva emagrecer
            </span>
            <span className="text-stone-300 mx-2" aria-hidden="true">·</span>
            <span>Hábitos & Conforto Abdominal para Adultos 28+</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Termos & Privacidade
            </button>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Diretrizes Éticas
            </button>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <button
              onClick={onOpenIntegrationModal}
              className="hover:text-emerald-900 font-medium transition-colors cursor-pointer"
            >
              Status da Integração
            </button>
          </div>
        </div>

        <div className="border-t border-stone-100 pt-4 text-[11px] text-stone-400 text-center leading-relaxed">
          <p>
            © {new Date().getFullYear()} @zuy_silva emagrecer. Todos os direitos reservados. Protocolo “Barriga Chapada em 7 Dias”.
          </p>
          <p className="mt-1">
            Este produto é comercializado com apoio da Hotmart. A plataforma não faz controle editorial prévio dos produtos comercializados.
          </p>
        </div>
      </div>
    </footer>
  );
};
