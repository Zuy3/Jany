import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, AlertCircle, RefreshCw, Sparkles, CheckCircle2, Lock, Zap, Clock } from 'lucide-react';
import { ProfileResult } from '../types/quiz';
import { submitLead } from '../services/leadService';
import { analytics } from '../services/analytics';

interface LeadCaptureScreenProps {
  profileResult: ProfileResult;
  answers: Record<string, string>;
  initialName?: string;
  onSuccess: (leadId: string, name: string) => void;
  onOpenPrivacyModal: () => void;
}

export const LeadCaptureScreen: React.FC<LeadCaptureScreenProps> = ({
  profileResult,
  answers,
  initialName = '',
  onSuccess,
  onOpenPrivacyModal,
}) => {
  const [name, setName] = useState(initialName || '');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setServerError(null);

    if (!name.trim() || name.trim().length < 2) {
      setNameError('Por favor, informe seu primeiro nome.');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError('Informe um e-mail válido para liberar seu acesso.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp.trim() ? whatsapp.trim() : undefined,
      profileResult: {
        profileId: profileResult.id,
        profileTitle: profileResult.title,
        bloatingScore: profileResult.bloatingScore,
        severityLabel: profileResult.severity
      },
      answers
    };

    try {
      const response = await submitLead(payload);
      analytics.leadCaptured();
      onSuccess(response.leadId, name.trim());
    } catch (err: any) {
      console.warn('Fallback on lead submit:', err);
      analytics.leadCaptured();
      onSuccess(`local_${Date.now()}`, name.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayName = name.trim() || initialName.trim() || 'Você';

  return (
    <div className="w-full max-w-xl mx-auto py-2 px-3 sm:px-0">
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xl shadow-stone-200/50 p-6 sm:p-9 relative overflow-hidden">
        {/* Subtle top indicator bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

        {/* Diagnostic ready badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200/80 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Diagnóstico & Solução Prontos</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display tracking-tight leading-tight mb-2">
            {displayName}, seu resultado e cronograma de 7 dias estão prontos!
          </h2>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Identificamos os gatilhos da sua fermentação digestiva. Confirme seus dados abaixo para <strong className="text-stone-900">desbloquear sua análise e o protocolo na próxima tela</strong>:
          </p>
        </div>

        {/* Reassuring Specialist Validation Badge */}
        <div className="flex items-center gap-3 p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl mb-5">
          <img
            src="./assets/aistudio/novo_899c45c6.png"
            alt="Biomédico Zuy"
            className="w-12 h-12 rounded-full object-cover object-top border-2 border-emerald-600 shadow-sm shrink-0"
          />
          <div className="text-xs text-stone-700 leading-tight">
            <span className="font-bold text-stone-900 block">Biomédico Zuy revisou suas respostas</span>
            <span className="text-stone-600 text-[11px]">Seu protocolo exclusivo está compilado. Preencha abaixo para desbloquear.</span>
          </div>
        </div>

        {/* 3 High-Value Teasers (What they unlock) */}
        <div className="space-y-2 mb-6 bg-stone-50/80 rounded-2xl p-4 border border-stone-200/70 text-xs text-stone-700">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Seu Índice Exato de Inchaço:</strong> Nível de sensibilidade e retenção.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Os 3 Alimentos Gatilho:</strong> Os vilões que mais fermentam no seu trato digestivo.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>O Plano Prático de 7 Dias:</strong> Como voltar a fechar as roupas com conforto e leveza.</span>
          </div>
        </div>

        {/* Server error alert if any */}
        {serverError && (
          <div
            role="alert"
            className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="font-semibold block mb-0.5">Aviso</strong>
              <span>{serverError}</span>
            </div>
          </div>
        )}

        {/* Frictionless Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Nome */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="lead-name"
                className="block text-xs font-bold text-stone-800 uppercase tracking-wider"
              >
                Seu Primeiro Nome
              </label>
              {initialName && (
                <span className="text-[11px] text-emerald-700 font-semibold">
                  ✓ Preenchido no teste
                </span>
              )}
            </div>
            <input
              id="lead-name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError('');
              }}
              placeholder="Ex: Mariana"
              disabled={isSubmitting}
              className={`w-full px-4 py-3.5 rounded-xl border text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none transition-all shadow-xs ${
                nameError
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500'
                  : 'border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'
              }`}
            />
            {nameError && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {nameError}
              </p>
            )}
          </div>

          {/* E-mail */}
          <div>
            <label
              htmlFor="lead-email"
              className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5"
            >
              Seu Melhor E-mail <span className="text-emerald-700">*</span>
            </label>
            <input
              id="lead-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              placeholder="Ex: mariana@gmail.com"
              disabled={isSubmitting}
              className={`w-full px-4 py-3.5 rounded-xl border text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none transition-all shadow-xs ${
                emailError
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500'
                  : 'border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'
              }`}
            />
            {emailError && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {emailError}
              </p>
            )}
          </div>

          {/* WhatsApp (Opcional - Alto valor para automações ManyChat / WhatsApp) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="lead-whatsapp"
                className="block text-xs font-bold text-stone-800 uppercase tracking-wider"
              >
                WhatsApp <span className="text-stone-400 font-normal lowercase">(opcional)</span>
              </label>
              <span className="text-[10px] text-stone-500">
                Para receber lembretes e dicas diárias
              </span>
            </div>
            <input
              id="lead-whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Ex: (11) 99999-9999"
              disabled={isSubmitting}
              className="w-full px-4 py-3.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none transition-all shadow-xs"
            />
          </div>

          {/* Trust reassurance */}
          <div className="pt-1 flex items-center justify-center gap-4 text-[11px] text-stone-500 font-medium">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>Privacidade Total</span>
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-700" />
              <span>Resultado Imediato</span>
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Livre de Spam</span>
            </span>
          </div>

          {/* High Conversion CTA Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full group flex items-center justify-center gap-3 px-6 py-5 rounded-2xl text-base sm:text-lg font-black text-white transition-all shadow-xl shadow-[#c2542a]/30 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#c2542a]/40 ${
              isSubmitting
                ? 'bg-[#a9451f] cursor-wait'
                : 'bg-[#c2542a] hover:bg-[#a9451f] active:bg-[#8f3716] hover:shadow-2xl hover:scale-[1.01]'
            }`}
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Liberando Seu Diagnóstico...</span>
              </>
            ) : (
              <>
                <span>VER MEU DIAGNÓSTICO E CRONOGRAMA DE 7 DIAS</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Micro disclaimer */}
        <p className="text-[10px] text-stone-400 text-center mt-4">
          Respeitamos sua privacidade. Seus dados nunca serão compartilhados com terceiros.
        </p>
      </div>
    </div>
  );
};
