export interface QuizOption {
  id: string;
  label: string;
  detail?: string;
  categoryWeight: {
    mechanical: number;     // Eating too fast, aerophagia, fluids with meals
    fermentative: number;   // High-FODMAPs, dairy, simple carbs
    fluidRetention?: number;// Water retention, lymphatic sluggishness
    stressMotility: number; // Stress, irregular bowel, disrupted sleep
  };
  bloatingIndex: number;    // 0 to 20 contribution to bloating perception
}

export interface QuizQuestion {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  type?: 'options' | 'text_name' | 'empathetic_interlude';
  inputPlaceholder?: string;
  image?: string;
  imageAlt?: string;
  educationalSnippet?: {
    tag: string;
    text: string;
  };
  options: QuizOption[];
}

export interface QuizAnswers {
  [questionId: string]: string; // questionId -> optionId or text value
}

export interface ProfileResult {
  id: 'mechanical' | 'fermentative' | 'fluidRetention' | 'stressMotility';
  title: string;
  badge: string;
  severity: 'Leve' | 'Moderada' | 'Acentuada';
  bloatingScore: number; // 0 - 100
  summary: string;
  detectedHabits: {
    habit: string;
    impact: string;
  }[];
  actionableSteps: {
    title: string;
    description: string;
    icon: string;
  }[];
  recommendedGuideNote: string;
}

export interface LeadPayload {
  name: string;
  email: string;
  profileResult: {
    profileId: string;
    profileTitle: string;
    bloatingScore: number;
    severityLabel: string;
  };
  answers: Record<string, string>;
}

export interface IntegrationStatus {
  status: string;
  endpointReady: boolean;
  webhookConfigured: boolean;
  totalLeads: number;
  storageType: string;
  timestamp: string;
}
