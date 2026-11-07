import React, { useEffect, useState } from 'react';
import { X, Database, CheckCircle2, AlertTriangle, RefreshCw, Copy, Check, ExternalLink } from 'lucide-react';
import { IntegrationStatus } from '../types/quiz';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationModal: React.FC<IntegrationModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<IntegrationStatus | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [customWebhook, setCustomWebhook] = useState(
    () => localStorage.getItem('zuyzelia_custom_webhook') || ''
  );
  const [saveWebhookMsg, setSaveWebhookMsg] = useState('');

  const fetchStatus = async () => {
    setLoading(true);
    let serverOk = false;
    try {
      const [resStatus, resLeads] = await Promise.all([
        fetch('/api/leads/status').catch(() => null),
        fetch('/api/leads').catch(() => null)
      ]);

      if (resStatus && resStatus.ok) {
        const dataStatus = await resStatus.json();
        setStatus(dataStatus);
        serverOk = true;
      }
      if (resLeads && resLeads.ok) {
        const dataLeads = await resLeads.json();
        setLeads(dataLeads.leads || []);
      }
    } catch (e) {
      console.warn('API leads status not accessible:', e);
    }

    if (!serverOk) {
      // Fallback for static hosting like GitHub Pages
      const localQueue = JSON.parse(localStorage.getItem('zuyzelia_pending_leads') || '[]');
      setStatus({
        status: 'online_client_mode',
        endpointReady: false,
        webhookConfigured: Boolean(customWebhook && customWebhook.trim().length > 0),
        totalLeads: localQueue.length,
        storageType: 'local_storage_github_pages',
        timestamp: new Date().toISOString()
      });
      setLeads(localQueue.slice(-25).reverse());
    }

    setLoading(false);
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('zuyzelia_custom_webhook', customWebhook.trim());
    setSaveWebhookMsg('Webhook salvo com sucesso no navegador!');
    setTimeout(() => setSaveWebhookMsg(''), 2500);
    fetchStatus();
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyConfigDoc = () => {
    const doc = `// Configuração de Webhook de Leads @zuy_silva emagrecer
// Adicione a variável no seu arquivo .env ou painel do Cloud Run / Vercel:
LEADS_WEBHOOK_URL="https://seu-endpoint-ou-zapier-webhook.com"`;
    navigator.clipboard.writeText(doc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="integration-modal-title"
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 id="integration-modal-title" className="text-base font-bold text-stone-900">
                Painel Técnico de Integração de Leads
              </h2>
              <p className="text-xs text-stone-500">
                Status dos endpoints e transparência de armazenamento seguro
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-700">
          {/* Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60">
              <div className="text-xs text-stone-500 mb-1">Endpoint Local de Captação</div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-mono text-xs font-semibold text-stone-900">POST /api/leads</span>
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Ativo no servidor Express. Valida nome, e-mail e salva em disco com segurança.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60">
              <div className="text-xs text-stone-500 mb-1">Webhook Externo (CRM / Zapier)</div>
              {status?.webhookConfigured ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-emerald-700">Configurado & Ativo</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-semibold text-amber-700">Pendente (Opcional)</span>
                </div>
              )}
              <p className="text-[11px] text-stone-500 mt-1">
                {status?.webhookConfigured
                  ? 'Cada lead é encaminhado automaticamente para o webhook configurado.'
                  : 'Nenhum webhook configurado. Leads são preservados no armazenamento seguro local.'}
              </p>
            </div>
          </div>

          {/* Webhook Configuration Guide */}
          <div className="bg-stone-900 text-stone-100 p-4 rounded-xl text-xs space-y-2">
            <div className="flex items-center justify-between text-stone-300 font-semibold">
              <span>Como ativar webhook externo (Zapier, ActiveCampaign, etc.)</span>
              <button
                onClick={copyConfigDoc}
                className="flex items-center gap-1 text-[11px] px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded transition cursor-pointer text-stone-200"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <p className="text-stone-400 text-[11px]">
              Basta definir a variável de ambiente <code className="text-emerald-400">LEADS_WEBHOOK_URL</code> no arquivo <code className="text-stone-300">.env</code> do servidor. O backend fará o envio por POST automaticamente sem expor nenhuma chave no navegador.
            </p>
          </div>

          {/* Direct Webhook Input for GitHub Pages */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl text-xs space-y-2">
            <div className="font-bold text-stone-900">
              Webhook Direto para GitHub Pages (Opcional)
            </div>
            <p className="text-stone-500 text-[11px]">
              Se você publicar este quiz no GitHub Pages (onde não há servidor Node.js), insira aqui a URL do seu Webhook (Google Sheets / Zapier / Make / ManyChat) para receber os leads em tempo real:
            </p>
            <form onSubmit={handleSaveWebhook} className="flex gap-2 pt-1">
              <input
                type="url"
                value={customWebhook}
                onChange={(e) => setCustomWebhook(e.target.value)}
                placeholder="https://hook.eu1.make.com/... ou script.google.com/..."
                className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg text-xs cursor-pointer"
              >
                Salvar
              </button>
            </form>
            {saveWebhookMsg && (
              <p className="text-[11px] text-emerald-700 font-medium">{saveWebhookMsg}</p>
            )}
          </div>

          {/* Recent Leads Inspection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                Últimos Leads Registrados ({status?.totalLeads ?? 0} no total)
              </h3>
              <button
                onClick={fetchStatus}
                disabled={loading}
                className="flex items-center gap-1 text-xs text-emerald-800 hover:text-emerald-950 font-medium cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                <span>Atualizar</span>
              </button>
            </div>

            {leads.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-stone-200 text-center text-xs text-stone-500">
                Nenhum lead registrado ainda. Conclua o quiz para ver o registro aparecer aqui em tempo real.
              </div>
            ) : (
              <div className="max-h-52 overflow-y-auto border border-stone-200 rounded-xl divide-y divide-stone-100">
                {leads.map((l) => (
                  <div key={l.id} className="p-3 text-xs flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-stone-900">{l.name}</div>
                      <div className="text-stone-500 text-[11px]">{l.email} {l.whatsapp ? `· ${l.whatsapp}` : ''}</div>
                      <div className="text-[10px] text-emerald-800 mt-0.5">
                        {l.profileResult?.profileTitle || 'Perfil Geral'} · Score: {l.profileResult?.bloatingScore || 0}%
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-stone-400">
                        {new Date(l.createdAt).toLocaleDateString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] bg-stone-100 text-stone-600">
                        {l.marketingConsent ? 'Marketing: Sim' : 'Marketing: Não'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            Nenhuma credencial de API é exposta no frontend.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-100 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
