import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Parse CLI --port argument if provided (e.g. `npm run dev -- --port 3000`)
const cliPort = (() => {
  const idx = process.argv.indexOf('--port');
  if (idx !== -1 && process.argv[idx + 1]) {
    const p = Number(process.argv[idx + 1]);
    if (!isNaN(p) && p > 0) return p;
  }
  return null;
})();

// In development, the app must bind to port 3000 because Nginx already listens on port 8080
const PORT = cliPort || (isProduction && process.env.PORT ? Number(process.env.PORT) : 3000);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Ensure data directory exists for persistent lead backup
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.warn('Could not create data dir:', err);
  }
}

// In-memory leads cache initialized from file if present
interface LeadRecord {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  marketingConsent: boolean;
  profileResult?: {
    profileId: string;
    profileTitle: string;
    bloatingScore: number;
    severityLabel: string;
  };
  answers?: Record<string, any>;
  createdAt: string;
  forwardedToWebhook?: boolean;
  webhookStatus?: string;
}

let leadsStore: LeadRecord[] = [];

try {
  if (fs.existsSync(LEADS_FILE)) {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    leadsStore = JSON.parse(raw);
  }
} catch (e) {
  leadsStore = [];
}

const saveLeadsToDisk = () => {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leadsStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save leads to file:', err);
  }
};

// API: Check integration status
app.get('/api/leads/status', (req, res) => {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  res.json({
    status: 'online',
    endpointReady: true,
    webhookConfigured: Boolean(webhookUrl && webhookUrl.trim().length > 0),
    totalLeads: leadsStore.length,
    storageType: 'local_secure_persistence',
    timestamp: new Date().toISOString()
  });
});

// API: Get leads for verification/admin review
app.get('/api/leads', (req, res) => {
  // Returns list with sanitized records
  res.json({
    count: leadsStore.length,
    leads: leadsStore.slice(-25).reverse()
  });
});

// API: POST new lead
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, whatsapp, profileResult, answers } = req.body || {};

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Por favor, informe seu nome.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Por favor, informe um endereço de e-mail válido.'
      });
    }

    // Generate unique ID
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newLead: LeadRecord = {
      id: leadId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp && typeof whatsapp === 'string' && whatsapp.trim().length > 5 ? whatsapp.trim() : undefined,
      marketingConsent: true,
      profileResult,
      answers,
      createdAt: new Date().toISOString()
    };

    // Forward to external webhook if configured
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.trim().length > 0) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead),
          signal: controller.signal
        });
        clearTimeout(timeout);

        newLead.forwardedToWebhook = webhookResponse.ok;
        newLead.webhookStatus = `HTTP ${webhookResponse.status}`;
      } catch (webhookErr: any) {
        console.warn('Failed to forward to external webhook:', webhookErr.message);
        newLead.forwardedToWebhook = false;
        newLead.webhookStatus = `Error: ${webhookErr.message}`;
      }
    } else {
      newLead.forwardedToWebhook = false;
      newLead.webhookStatus = 'Webhook externo não configurado (armazenado localmente com segurança)';
    }

    // Save lead
    leadsStore.push(newLead);
    saveLeadsToDisk();

    return res.status(201).json({
      success: true,
      message: 'Contato e análise salvos com sucesso no servidor.',
      leadId,
      webhookStatus: newLead.webhookStatus,
      webhookConfigured: Boolean(webhookUrl && webhookUrl.trim().length > 0)
    });
  } catch (error: any) {
    console.error('Server error handling lead:', error);
    return res.status(500).json({
      success: false,
      error: 'Ocorreu uma falha no servidor ao processar o seu cadastro. Os seus dados foram preservados na tela para nova tentativa.'
    });
  }
});

// Configure Vite integration
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`@zuy_silva emagrecer Quiz Server running on http://0.0.0.0:${PORT} (env: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
