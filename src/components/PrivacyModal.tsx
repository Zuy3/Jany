import React from 'react';
import { X, ShieldCheck, HeartHandshake } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 id="privacy-modal-title" className="text-base font-bold text-stone-900">
                Diretrizes Éticas & Privacidade @zuy_silva emagrecer
              </h2>
              <p className="text-xs text-stone-500">
                Transparência sobre uso de dados e metodologia informativa
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <section>
            <h3 className="font-bold text-stone-900 text-sm mb-1.5">
              1. Natureza Informativa e Não Médica
            </h3>
            <p>
              O Quiz de Hábitos & Conforto Abdominal @zuy_silva emagrecer foi desenvolvido exclusivamente com propósito informativo, educacional e de incentivo a hábitos diários equilibrados (como mastigação consciente, hidratação equilibrada e redução de alimentos hiperfermentáveis).
            </p>
            <p className="mt-1.5 text-stone-600">
              Ele <strong>não substitui em hipótese alguma</strong> consultas médicas com clínicos gerais, gastroenterologistas ou nutricionistas. Não realizamos diagnósticos de doenças inflamatórias, intolerâncias patológicas ou condições agudas.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-stone-900 text-sm mb-1.5">
              2. Finalidade e Coleta de Dados (LGPD)
            </h3>
            <p>
              Solicitamos apenas as informações necessárias para registrar sua participação e entregar seu resultado:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-stone-600">
              <li><strong>Nome:</strong> Para personalizar seu diagnóstico na tela e no relatório.</li>
              <li><strong>E-mail:</strong> Para envio das recomendações e identificação única.</li>
              <li><strong>WhatsApp (Opcional):</strong> Utilizado apenas se autorizado para suporte direto ou lembretes.</li>
              <li><strong>Consentimento de Marketing:</strong> É totalmente opcional e pode ser revogado a qualquer instante.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-stone-900 text-sm mb-1.5">
              3. Ausência de Promessas Miraculosas
            </h3>
            <p>
              O @zuy_silva emagrecer rejeita qualquer promessa de perda de peso milagrosa, cura garantida ou resultados infalíveis em períodos curtos. O protocolo "Barriga Chapada em 7 Dias" apresenta um roteiro de reeducação com escolhas anti-inchaço e receitas nutritivas. Os resultados dependem da resposta individual e da adesão aos hábitos saudáveis.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-stone-900 text-sm mb-1.5">
              4. Transação Segura via Hotmart
            </h3>
            <p>
              O processamento do pagamento do protocolo é realizado com segurança pela plataforma Hotmart, que conta com criptografia de ponta a ponta e garantia incondicional de 7 dias para reembolso total caso o comprador não se sinta satisfeito.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
