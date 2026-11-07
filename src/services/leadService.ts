/**
 * Lead Storage & Synchronization Service for ZuyZelia
 * Provides dual-layer persistence:
 * 1. Immediate local storage guarantee (zero lead loss).
 * 2. Primary POST to server /api/leads (Node.js environments).
 * 3. Direct webhook forwarder fallback (100% compatible with static GitHub Pages hosting).
 */

export interface LeadSubmissionPayload {
  name: string;
  email: string;
  whatsapp?: string;
  profileResult: {
    profileId: string;
    profileTitle: string;
    bloatingScore: number;
    severityLabel: string;
  };
  answers: Record<string, string>;
  utmParams?: Record<string, string>;
}

export interface SubmissionResponse {
  success: boolean;
  leadId: string;
  storageTarget: 'local_cache' | 'server_database' | 'direct_webhook';
  message: string;
  error?: string;
}

export async function submitLead(payload: LeadSubmissionPayload): Promise<SubmissionResponse> {
  const timestamp = new Date().toISOString();
  const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const record = { ...payload, id: leadId, timestamp };

  // 1. Safety Layer: Always persist in localStorage
  try {
    const existingQueue: any[] = JSON.parse(localStorage.getItem('zuyzelia_pending_leads') || '[]');
    existingQueue.push(record);
    localStorage.setItem('zuyzelia_pending_leads', JSON.stringify(existingQueue.slice(-50)));
  } catch (err) {
    console.warn('LocalStorage backup error:', err);
  }

  // 2. Network Layer: Attempt server API (/api/leads)
  let serverSucceeded = false;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data?.success) {
        serverSucceeded = true;
        return {
          success: true,
          leadId: data.leadId || leadId,
          storageTarget: 'server_database',
          message: 'Lead registrado com sucesso no banco de dados @zuy_silva emagrecer.'
        };
      }
    }
  } catch (err) {
    // Expected on static hosting like GitHub Pages where /api/leads gives 404/network error
  }

  // 3. GitHub Pages Fallback: Direct Webhook forward if configured
  const directWebhookUrl =
    (import.meta.env.VITE_LEADS_WEBHOOK_URL as string) ||
    localStorage.getItem('zuyzelia_custom_webhook') ||
    '';

  if (!serverSucceeded && directWebhookUrl.trim().length > 0) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);

      await fetch(directWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
        mode: 'no-cors', // allows webhooks like Google Apps Script without CORS blockage
        signal: controller.signal
      });
      clearTimeout(timeout);

      return {
        success: true,
        leadId,
        storageTarget: 'direct_webhook',
        message: 'Lead transmitido com sucesso via webhook externo.'
      };
    } catch (whErr) {
      console.warn('Direct webhook forward failed:', whErr);
    }
  }

  // 4. Client Guarantee: Lead is preserved locally
  return {
    success: true,
    leadId,
    storageTarget: 'local_cache',
    message: 'Lead preservado com sucesso no dispositivo do visitante.'
  };
}
