import { QuizQuestion, QuizAnswers, ProfileResult } from '../types/quiz';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1_age_metabolism',
    order: 1,
    title: 'Qual é a sua faixa etária?',
    subtitle: 'A partir dos 28 anos, o ritmo digestivo muda e certos alimentos passam a fermentar com mais facilidade.',
    image: '/assets/images/quiz_q1_age_metabolism_1793838952030.jpg',
    imageAlt: 'Mulher adulta de 34 anos em cozinha moderna com chá morno matinal',
    options: [
      {
        id: 'opt_age_28_39',
        label: '28 a 39 anos',
        detail: 'Alimentos que antes caíam bem agora provocam estufamento e peso.',
        categoryWeight: { mechanical: 3, fermentative: 5, fluidRetention: 4, stressMotility: 4 },
        bloatingIndex: 14
      },
      {
        id: 'opt_age_40_49',
        label: '40 a 49 anos',
        detail: 'Digestão mais lenta e retenção frequente após as refeições.',
        categoryWeight: { mechanical: 2, fermentative: 5, fluidRetention: 5, stressMotility: 4 },
        bloatingIndex: 16
      },
      {
        id: 'opt_age_50_plus',
        label: '50 anos ou mais',
        detail: 'Busco alívio diário, menos gases e desinflamação do abdômen.',
        categoryWeight: { mechanical: 2, fermentative: 4, fluidRetention: 5, stressMotility: 5 },
        bloatingIndex: 15
      },
      {
        id: 'opt_age_18_27',
        label: 'Menos de 28 anos',
        detail: 'Quero melhorar meus hábitos e aprender a desinchar a barriga.',
        categoryWeight: { mechanical: 3, fermentative: 3, fluidRetention: 2, stressMotility: 2 },
        bloatingIndex: 8
      }
    ]
  },
  {
    id: 'q2_first_name',
    order: 2,
    type: 'text_name',
    title: 'Como o Biomédico Zuy pode te chamar?',
    subtitle: 'Usaremos o seu primeiro nome para personalizar o seu diagnóstico e o seu cronograma de 7 dias.',
    inputPlaceholder: 'Digite seu primeiro nome aqui (ex: Mariana)',
    image: '/assets/images/quiz_q2_personal_intake_1793838977007.jpg',
    imageAlt: 'Caderno de avaliação de linho e copo com água pura, limão e hortelã fresca',
    options: []
  },
  {
    id: 'q3_bloating_timing',
    order: 3,
    title: 'Em que momento do dia a sua barriga mais estufa?',
    subtitle: 'O horário do desconforto indica o gatilho biológico da sua sobrecarga digestiva.',
    image: '/assets/images/quiz_q3_bloating_timing_1793838993430.jpg',
    imageAlt: 'Mulher descansando confortavelmente com as mãos sobre o abdômen ao entardecer',
    educationalSnippet: {
      tag: 'Fato Biológico Comprovado',
      text: 'Quando a barriga amanhece lisa e termina o dia dilatada, o motivo não é gordura: são gases de fermentação bacteriana no cólon empurrando a parede abdominal.'
    },
    options: [
      {
        id: 'opt_timing_wake_flat_night_balloon',
        label: 'Ao entardecer ou à noite',
        detail: 'Acordo bem, mas ao longo do dia a barriga vai dilatando e aperta a calça.',
        categoryWeight: { mechanical: 2, fermentative: 6, fluidRetention: 3, stressMotility: 2 },
        bloatingIndex: 19
      },
      {
        id: 'opt_timing_post_meal_pain',
        label: 'Logo após o almoço ou jantar',
        detail: 'Sinto o estômago pesado, alto e inchado logo que termino de comer.',
        categoryWeight: { mechanical: 5, fermentative: 4, fluidRetention: 2, stressMotility: 3 },
        bloatingIndex: 17
      },
      {
        id: 'opt_timing_constant_heavy',
        label: 'Quase o dia inteiro',
        detail: 'Sensação persistente de abdômen duro, pesado e distendido.',
        categoryWeight: { mechanical: 2, fermentative: 4, fluidRetention: 5, stressMotility: 5 },
        bloatingIndex: 18
      },
      {
        id: 'opt_timing_wake_up_bloated',
        label: 'Logo ao acordar pela manhã',
        detail: 'Já me levanto com sensação de peso e retenção no corpo e nas pernas.',
        categoryWeight: { mechanical: 1, fermentative: 3, fluidRetention: 6, stressMotility: 4 },
        bloatingIndex: 17
      }
    ]
  },
  {
    id: 'q4_clothes_selfesteem',
    order: 4,
    title: 'Como esse inchaço interfere no seu dia a dia?',
    subtitle: 'O desconforto abdominal impacta diretamente a sua relação com as roupas e a autoestima.',
    image: '/assets/images/quiz_q4_clothes_dilemma_1793839008657.jpg',
    imageAlt: 'Mulher avaliando o caimento da cintura de calça clássica em quarto luminoso',
    options: [
      {
        id: 'opt_impact_unbutton',
        label: 'Roupas apertando a cintura',
        detail: 'Preciso desabotoar o botão ou evito calças justas que marcam o abdômen.',
        categoryWeight: { mechanical: 4, fermentative: 5, fluidRetention: 2, stressMotility: 2 },
        bloatingIndex: 18
      },
      {
        id: 'opt_impact_tight_pants',
        label: 'Insegurança para me vestir',
        detail: 'Troco de roupa várias vezes antes de sair por vergonha do volume na barriga.',
        categoryWeight: { mechanical: 2, fermentative: 4, fluidRetention: 4, stressMotility: 4 },
        bloatingIndex: 16
      },
      {
        id: 'opt_impact_gas_pain',
        label: 'Desconforto físico e gases dolorosos',
        detail: 'Pontadas, pressão interna e sensação de estômago travado após comer.',
        categoryWeight: { mechanical: 2, fermentative: 6, fluidRetention: 2, stressMotility: 3 },
        bloatingIndex: 19
      },
      {
        id: 'opt_impact_energy_mood',
        label: 'Cansaço e lentidão diária',
        detail: 'A digestão pesada consome a minha energia e atrapalha o meu dia todo.',
        categoryWeight: { mechanical: 2, fermentative: 3, fluidRetention: 4, stressMotility: 5 },
        bloatingIndex: 16
      }
    ]
  },
  {
    id: 'q5_food_triggers',
    order: 5,
    title: 'Quais destes alimentos você consome com frequência e sente que pioram o estufamento?',
    subtitle: 'Certos alimentos possuem compostos de difícil digestão (FODMAPs) que fermentam rapidamente no intestino.',
    image: '/assets/images/quiz_q5_whole_foods_gut_1793839023418.jpg',
    imageAlt: 'Alimentos naturais anti-inflamatórios frescos e leves para o intestino',
    educationalSnippet: {
      tag: 'Gatilho Biológico Comprovado',
      text: 'Alimentos com carboidratos de cadeia curta (como farinhas refinadas e laticínios) servem de banquete para bactérias fermentativas, gerando até 3x mais gases no cólon.'
    },
    options: [
      {
        id: 'opt_food_wheat_bread',
        label: 'Pães, massas, bolos ou biscoitos de trigo',
        detail: 'Farinhas e glúten que retardam a digestão e provocam estufamento visível.',
        categoryWeight: { mechanical: 3, fermentative: 6, fluidRetention: 3, stressMotility: 2 },
        bloatingIndex: 18
      },
      {
        id: 'opt_food_dairy',
        label: 'Leite, queijos, iogurtes ou café com leite',
        detail: 'Sensibilidade à quebra da lactose que gera gases, cólicas e retenção.',
        categoryWeight: { mechanical: 3, fermentative: 5, fluidRetention: 5, stressMotility: 3 },
        bloatingIndex: 18
      },
      {
        id: 'opt_food_beans_veggies',
        label: 'Feijão, leguminosas, repolho ou vegetais crus à noite',
        detail: 'Fibras densas e oligossacarídeos que dilatam o baixo ventre.',
        categoryWeight: { mechanical: 5, fermentative: 6, fluidRetention: 2, stressMotility: 3 },
        bloatingIndex: 19
      },
      {
        id: 'opt_food_sugar_sodas',
        label: 'Doces, refrigerantes, açúcar ou cerveja',
        detail: 'Alimentam bactérias fermentativas e causam retenção líquida na cintura.',
        categoryWeight: { mechanical: 2, fermentative: 5, fluidRetention: 6, stressMotility: 3 },
        bloatingIndex: 17
      },
      {
        id: 'opt_food_all_bloat',
        label: 'Sinto que quase tudo o que como me estufa a barriga',
        detail: 'Sensibilidade digestiva generalizada que exige desinflamação rápida em 7 dias.',
        categoryWeight: { mechanical: 5, fermentative: 6, fluidRetention: 5, stressMotility: 5 },
        bloatingIndex: 20
      }
    ]
  },
  {
    id: 'q5_interlude_empathy',
    order: 6,
    type: 'empathetic_interlude',
    title: '{Nome}, o que você sente tem explicação biológica.',
    subtitle: 'A grande maioria das mulheres atendidas pelo @zuy_silva emagrecer achava que a barriga dilatada era gordura difícil de perder. Na realidade, é inflamação digestiva e retenção de gases por alimentos que fermentam em excesso. Com pequenos ajustes no dia a dia, o alívio começa em 7 dias.',
    image: '/assets/aistudio/novo_899c45c6.png',
    imageAlt: 'Biomédico Zuy',
    options: []
  },
  {
    id: 'q6_previous_attempts',
    order: 7,
    title: 'O que você já tentou fazer para desinchar?',
    subtitle: 'Entender suas tentativas anteriores nos ajuda a apontar o caminho mais rápido para o seu alívio.',
    image: '/assets/images/quiz_q6_herbal_infusions_1793839040667.jpg',
    imageAlt: 'Infusão de ervas carminativas com hortelã, gengibre e camomila em bule de vidro',
    options: [
      {
        id: 'opt_tried_teas_detox',
        label: 'Chás desinchantes prontos ou sucos detox',
        detail: 'Davvam alívio passageiro, mas a barriga voltava a estufar no dia seguinte.',
        categoryWeight: { mechanical: 2, fermentative: 4, fluidRetention: 4, stressMotility: 3 },
        bloatingIndex: 14
      },
      {
        id: 'opt_tried_cutting_carbs',
        label: 'Cortar carboidratos ou jejum desordenado',
        detail: 'Sentia muita fome e irritação, e ao voltar a comer o inchaço vinha com força.',
        categoryWeight: { mechanical: 3, fermentative: 5, fluidRetention: 3, stressMotility: 4 },
        bloatingIndex: 16
      },
      {
        id: 'opt_tried_expensive_enzymes',
        label: 'Remédios para gases de farmácia',
        detail: 'Ajudam pontualmente no momento, mas não evitam que a barriga volte a estufar.',
        categoryWeight: { mechanical: 4, fermentative: 5, fluidRetention: 2, stressMotility: 3 },
        bloatingIndex: 15
      },
      {
        id: 'opt_tried_nothing_structured',
        label: 'Ainda não segui nenhum método estruturado',
        detail: 'Quero um protocolo diário de 7 dias criado por especialista para começar certo.',
        categoryWeight: { mechanical: 3, fermentative: 4, fluidRetention: 4, stressMotility: 3 },
        bloatingIndex: 14
      }
    ]
  },
  {
    id: 'q7_seven_day_goal',
    order: 8,
    title: '{Nome}, qual é o seu principal objetivo para o próximo domingo?',
    subtitle: 'Ao definir sua prioridade, calibramos o cronograma exato do seu protocolo de alívio.',
    image: '/assets/images/quiz_q7_wellness_vitality_1793839060156.jpg',
    imageAlt: 'Mulher adulta com postura serena e roupas de linho confortáveis ao ar livre',
    options: [
      {
        id: 'opt_goal_flat_light',
        label: 'Barriga visivelmente desinchada e leve',
        detail: 'Passar o dia inteiro sem aquele peso incômodo empurrando a cintura.',
        categoryWeight: { mechanical: 2, fermentative: 5, fluidRetention: 5, stressMotility: 3 },
        bloatingIndex: 15
      },
      {
        id: 'opt_goal_favorite_pants',
        label: 'Fechar minhas calças favoritas sem aperto',
        detail: 'Recuperar o conforto e a liberdade para usar as roupas que mais gosto.',
        categoryWeight: { mechanical: 3, fermentative: 5, fluidRetention: 4, stressMotility: 3 },
        bloatingIndex: 16
      },
      {
        id: 'opt_goal_smooth_digestion',
        label: 'Digestão leve e sem gases dolorosos',
        detail: 'Comer em paz sem medo de ficar estufada ou passar mal em seguida.',
        categoryWeight: { mechanical: 5, fermentative: 5, fluidRetention: 2, stressMotility: 4 },
        bloatingIndex: 17
      },
      {
        id: 'opt_goal_all_above',
        label: 'Todas as opções: leveza, conforto e disposição',
        detail: 'Uma transformação completa no meu bem-estar digestivo e na minha autoestima.',
        categoryWeight: { mechanical: 4, fermentative: 5, fluidRetention: 5, stressMotility: 4 },
        bloatingIndex: 18
      }
    ]
  }
];

export interface AnswerSummaryItem {
  questionLabel: string;
  answerLabel: string;
}

export function getAnswersSummaryList(answers: QuizAnswers): AnswerSummaryItem[] {
  const summary: AnswerSummaryItem[] = [];

  for (const q of QUIZ_QUESTIONS) {
    if (q.type === 'empathetic_interlude' || q.type === 'text_name') continue;
    const selectedId = answers[q.id];
    if (selectedId && q.options) {
      const opt = q.options.find(o => o.id === selectedId);
      if (opt) {
        summary.push({
          questionLabel: q.title.replace(/\{nome\}/gi, '').trim(),
          answerLabel: opt.label
        });
      }
    }
  }

  return summary;
}

export function calculateQuizResult(answers: QuizAnswers): ProfileResult {
  let mechanicalScore = 0;
  let fermentativeScore = 0;
  let fluidRetentionScore = 0;
  let stressMotilityScore = 0;
  let totalBloatingPoints = 0;

  for (const question of QUIZ_QUESTIONS) {
    const selectedOptionId = answers[question.id];
    if (selectedOptionId && question.options && question.options.length > 0) {
      const option = question.options.find(o => o.id === selectedOptionId);
      if (option) {
        mechanicalScore += option.categoryWeight.mechanical || 0;
        fermentativeScore += option.categoryWeight.fermentative || 0;
        fluidRetentionScore += option.categoryWeight.fluidRetention || 0;
        stressMotilityScore += option.categoryWeight.stressMotility || 0;
        totalBloatingPoints += option.bloatingIndex || 0;
      }
    }
  }

  // Normalized score between 54% and 94%
  const normalizedScore = Math.min(94, Math.max(54, Math.round((totalBloatingPoints / 110) * 100)));

  let severity: 'Leve' | 'Moderada' | 'Acentuada' = 'Moderada';
  if (normalizedScore <= 60) {
    severity = 'Leve';
  } else if (normalizedScore >= 75) {
    severity = 'Acentuada';
  }

  // Determine dominant profile
  // 1. Fermentative
  if (fermentativeScore >= mechanicalScore && fermentativeScore >= fluidRetentionScore && fermentativeScore >= stressMotilityScore) {
    return {
      id: 'fermentative',
      title: 'Perfil Fermentativo & Gases Digestivos (Sensibilidade aos FODMAPs)',
      badge: 'Sensibilidade Fermentativa Intestinal',
      severity,
      bloatingScore: normalizedScore,
      summary: 'Suas respostas revelam que o seu abdômen está entrando em um ciclo de fermentação acelerada. Determinados carboidratos e alimentos chegam ao cólon sem a quebra ideal, e as bactérias intestinais produzem gases em grande volume, empurrando as paredes do abdômen para fora e gerando aquela sensação incômoda de "barriga de grávida" ao entardecer.',
      detectedHabits: [
        {
          habit: 'Ingestão de alimentos com alta fermentação bacteriana',
          impact: 'Farinhas refinadas, laticínios ou combinações densas agem como gatilho, gerando pressão gasosa no estômago e no baixo ventre.'
        },
        {
          habit: 'Descompasso na velocidade do trânsito digestivo',
          impact: 'Alimentos que demoram para transitar acumulam resíduos e fermentam muito mais do que o normal.'
        },
        {
          habit: 'Retenção hídrica tecidual ao redor da cintura',
          impact: 'O intestino inflamado retém água nos tecidos próximos, dando aparência de inchaço duro e persistente.'
        }
      ],
      actionableSteps: [
        {
          title: 'Troca Estratégica de Alimentos Fermentáveis por 7 Dias',
          description: 'Substitua temporariamente combinações inflamadas por opções leves que não alimentam as bactérias que produzem gases.',
          icon: 'leaf'
        },
        {
          title: 'Infusões Carminativas nos Horários Certos',
          description: 'Tome chá de hortelã, gengibre e erva-doce morno 30 minutos após as refeições para relaxar a musculatura intestinal.',
          icon: 'cup'
        },
        {
          title: 'Janela de Repouso Digestivo Noturno',
          description: 'Deixe um intervalo mínimo de 2h30 entre o jantar e o sono para o corpo realizar a faxina das toxinas acumuladas.',
          icon: 'moon'
        }
      ],
      recommendedGuideNote: 'No Protocolo Prático "Barriga Chapada em 7 Dias" do @zuy_silva emagrecer, você tem o cronograma exato de 7 dias com substituições inteligentes para desinchar sem passar fome.'
    };
  }

  // 2. Fluid Retention
  if (fluidRetentionScore >= mechanicalScore && fluidRetentionScore >= fermentativeScore && fluidRetentionScore >= stressMotilityScore) {
    return {
      id: 'fluidRetention',
      title: 'Perfil Retenção Linfática & Inflamação Hídrica Abdominal',
      badge: 'Retenção Linfática Intersticial',
      severity,
      bloatingScore: normalizedScore,
      summary: 'Suas respostas indicam que o inchaço que você percebe está fortemente associado ao acúmulo de líquidos intersticiais ao redor do abdômen e flutuações hormonais. O organismo retém água para diluir microinflamações na mucosa intestinal, fazendo a barriga parecer dilatada logo ao acordar ou com sensação de peso difuso.',
      detectedHabits: [
        {
          habit: 'Desequilíbrio de sódio e minerais alcalinizantes',
          impact: 'Gera retenção hídrica nas células epiteliais do abdômen e sensação de inchaço que não alivia com facilidade.'
        },
        {
          habit: 'Drenagem linfática digestiva lenta',
          impact: 'A linfa abdominal fica estagnada, acumulando toxinas metabólicas que mantêm a sensação de peso.'
        },
        {
          habit: 'Hidratação em momentos errados',
          impact: 'Ingerir água em horários descompassados não drena o organismo e sobrecarrega os rins.'
        }
      ],
      actionableSteps: [
        {
          title: 'Ciclo Hídrico com Eletrólitos Naturais',
          description: 'Aporte de água com gotas de limão e pitada de sal integral pela manhã para drenar o excesso de líquidos sem desidratar.',
          icon: 'droplet'
        },
        {
          title: 'Ervas Drenantes Seguras',
          description: 'Cavalinha, hibisco suave e dente-de-leão tomados entre 10h e 16h estimulam a circulação linfática abdominal.',
          icon: 'leaf'
        },
        {
          title: 'Estímulo de Drenagem Manual Noturna',
          description: 'Movimentos circulares suaves no sentido horário antes de deitar ajudam a desobstruir os ductos linfáticos.',
          icon: 'sun'
        }
      ],
      recommendedGuideNote: 'O Protocolo "Barriga Chapada em 7 Dias" ensina o passo a passo exato de hidratação e chás que drenam os líquidos do abdômen sem agredir seus rins.'
    };
  }

  // 3. Mechanical / Gastric Slow
  if (mechanicalScore >= fermentativeScore && mechanicalScore >= stressMotilityScore) {
    return {
      id: 'mechanical',
      title: 'Perfil Digestão Mecânica Acelerada & Sobrecarga Gástrica',
      badge: 'Deglutição de Ar & Sobrecarga Gástrica',
      severity,
      bloatingScore: normalizedScore,
      summary: 'O padrão observado mostra que a velocidade das refeições combinada com a ingestão de líquidos ou distrações faz você engolir ar em excesso (aerofagia). Esse ar fica preso no estômago e empurra o diafragma, fazendo sua barriga estufar quase que imediatamente após comer, com sensação de estômago alto e comida parada.',
      detectedHabits: [
        {
          habit: 'Refeições feitas com pressa e distração',
          impact: 'Pedaços grandes chegam ao estômago sem que a saliva tenha iniciado a quebra dos nutrientes, sobrecarregando o sistema.'
        },
        {
          habit: 'Líquidos volumosos consumidos junto aos pratos',
          impact: 'Diluem o suco gástrico, provocando digestão lenta, sensação de peso de chumbo e estômago dilatado.'
        },
        {
          habit: 'Falta de ativação do sistema digestivo antes de comer',
          impact: 'Comer em estado de alerta trava as enzimas digestivas e impede que o estômago esvazie no tempo certo.'
        }
      ],
      actionableSteps: [
        {
          title: 'Técnica dos Talheres na Mesa',
          description: 'Pouse o garfo entre cada mordida e garanta pelo menos 20 mastigações completas antes de engolir.',
          icon: 'clock'
        },
        {
          title: 'Hidratação Isolada da Comida',
          description: 'Beba água abundante até 30 minutos antes ou 45 minutos após as refeições principais.',
          icon: 'droplet'
        },
        {
          title: '3 Respirações Profundas Pré-Almoço',
          description: 'Ative o nervo vago antes da primeira garfada para avisar o estômago de que é hora de digerir em paz.',
          icon: 'wind'
        }
      ],
      recommendedGuideNote: 'O método prático "Barriga Chapada em 7 Dias" ensina a sequência correta de horários e combinações leves para desinflamar o abdômen sem complicação.'
    };
  }

  // 4. Stress & Motility
  return {
    id: 'stressMotility',
    title: 'Perfil Tensão Neurodigestiva & Eixo Cérebro-Intestino',
    badge: 'Eixo Cérebro-Intestino & Retenção de Toxinas',
    severity,
    bloatingScore: normalizedScore,
    summary: 'Suas respostas apontam que o eixo cérebro-intestino está sofrendo com o impacto da rotina. O excesso de preocupações e o sono fragmentado liberam cortisol, que "desliga" o trânsito do intestino. O resultado: resíduos acumulados, fermentação profunda, gases dolorosos e sensação de barriga dura e pesada.',
    detectedHabits: [
      {
        habit: 'Tensão diária contínua paralisando a motilidade',
        impact: 'O estresse desvia o fluxo de sangue dos órgãos digestivos, travando o peristaltismo natural do cólon.'
      },
      {
        habit: 'Acúmulo de resíduos por intestino lento',
        impact: 'Ficar dias sem evacuar completamente mantém gases e toxinas inflamando as paredes do baixo ventre.'
      },
      {
        habit: 'Falta de estímulo matinal regulador',
        impact: 'Começar o dia sem o reflexo gastrocólico faz o intestino ficar "adormecido" durante o dia todo.'
      }
    ],
    actionableSteps: [
      {
        title: 'Shot Matinal de Despertar Intestinal',
        description: 'Um copo de água morna com limão ou chá digestivo logo ao levantar para acionar o movimento natural do intestino.',
        icon: 'sun'
      },
      {
        title: 'Desconexão Noturna Anti-Cortisol',
        description: 'Desligue telas 1 hora antes de dormir para permitir que o sistema digestivo realize a restauração celular.',
        icon: 'moon'
      },
      {
        title: 'Alimentos Ricos em Potássio e Magnésio',
        description: 'Priorize vegetais calmantes que desincham a retenção líquida dos tecidos abdominais.',
        icon: 'heart'
      }
    ],
    recommendedGuideNote: 'No Protocolo "Barriga Chapada em 7 Dias", você receberá o passo a passo com receitas anti-inchaço pensadas para acalmar a digestão e recuperar o conforto do seu abdômen.'
  };
}
