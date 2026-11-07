export type SocialProofType = 'before_after' | 'comment';

export interface SocialProofItem {
  id: string;
  type: SocialProofType;
  imageSrc: string;
  title: string;
  subtitle?: string;
  authorName?: string;
  platform?: 'Instagram' | 'YouTube';
  likesCount?: string;
  quote?: string;
  highlight?: string;
  tag: string;
  timeframe?: string;
}

export const SOCIAL_PROOF_ITEMS: SocialProofItem[] = [
  // 1. Antes & Depois 1 - Maria (Conforme solicitado pelo usuário)
  {
    id: 'proof_ba_1',
    type: 'before_after',
    imageSrc: '/assets/aistudio/1d8da273ae648a8f3190d23e08e39821_e74dc1cc.jpeg',
    authorName: 'Maria',
    title: 'Maria: "Aderi ao programa e estou amando, perdi 3 kg em 15 dias"',
    subtitle: 'Alívio visível na projeção do abdômen e calças fechando com folga.',
    tag: 'Aluna Verificada',
    timeframe: '15 Dias de Protocolo',
    highlight: 'Aderi ao programa Barriga Chapada em 7 Dias e estou amando! Perdi 3 quilos em 15 dias e melhorei muito minha autoestima.',
    quote: 'Aderi ao programa Barriga Chapada em 7 Dias e estou amando! Minha barriga acordava dura e estufada, parecendo que eu estava grávida. Com as combinações certas e as infusões do Biomédico Zuy, perdi 3 quilos em 15 dias, minhas roupas voltaram a servir com folga e melhorei muito a minha autoestima!'
  },
  // 2. Comentário 1 - Josilene (1.165 curtidas)
  {
    id: 'proof_cm_1',
    type: 'comment',
    imageSrc: '/assets/aistudio/IMG_6599_f1ff0c2e.jpeg',
    title: 'Comentário Verificado no Instagram',
    authorName: 'josilene5508',
    platform: 'Instagram',
    likesCount: '1.165 curtidas',
    highlight: 'A barriga diminui, a gente sente a diferença nas roupas... o desinchaço é real!',
    quote: 'Pessoal, voltei aqui para falar que tomei durante 15 dias e funcionou de verdade. A barriga diminui a gente sente a diferença nas roupas 🙌🙌 tb faço atividade física para ajudar no processo pq não existe milagre para perder gordura localizada. ❤️',
    tag: 'Diferença nas Roupas'
  },
  // 3. Antes & Depois 2 - Luciana
  {
    id: 'proof_ba_2',
    type: 'before_after',
    imageSrc: '/assets/aistudio/97fc1627b3371736715ec79fa2aced8b_87f885aa.jpeg',
    authorName: 'Luciana',
    title: 'Luciana: "A sensação de peso no baixo ventre sumiu por completo"',
    subtitle: 'Abdômen inferior visivelmente mais alinhado e sem retenção.',
    tag: 'Aluna Verificada',
    timeframe: '10 Dias de Protocolo',
    highlight: 'Segui o cronograma do protocolo e em menos de 10 dias desinchei 2,8 kg. Nunca mais senti aquela pressão horrível após comer!',
    quote: 'Eu não aguentava mais acordar bem e ir dormir com a barriga enorme empurrando o cós da calça. Aderi ao programa e em 10 dias eliminei 2,8 kg de retenção líquida. Minha digestão ficou leve e hoje coloco qualquer roupa sem medo de marcar.'
  },
  // 4. Comentário 2 - Erica Ferreira (YouTube)
  {
    id: 'proof_cm_2',
    type: 'comment',
    imageSrc: '/assets/aistudio/IMG_7861_daf96356.jpeg',
    title: 'Depoimento em Vídeo no YouTube',
    authorName: '@ericaferreira1740',
    platform: 'YouTube',
    highlight: 'Gente eu já estou bem desinchando ao ponto de algumas pessoas falarem que estou emagrecendo...',
    quote: '😅 Realmente faz efeito. Eu estou tomando há duas semanas. Gente eu já estou bem desinchando ao ponto de algumas pessoas falarem que estou emagrecendo. E estou muito feliz em sentir meu buchão bem menor 😅... Mas o resultado é certo.',
    tag: 'Buchão Bem Menor'
  },
  // 5. Antes & Depois 3 - Camila
  {
    id: 'proof_ba_3',
    type: 'before_after',
    imageSrc: '/assets/aistudio/177c0e77cf36975cd832a569fa1a0282_b4fe2060.jpeg',
    authorName: 'Camila',
    title: 'Camila: "Minha calça legging preta favorita fechou sem aperto"',
    subtitle: 'Redução das dobras e cintura desenhada sem passar fome.',
    tag: 'Aluna Verificada',
    timeframe: '14 Dias de Protocolo',
    highlight: 'Eliminei 3,2 kg em duas semanas. A cintura desenhou e as roupas não apertam mais nada!',
    quote: 'Achei que precisaria me matar na academia ou passar fome. Quando entrei no programa do Biomédico Zuy, entendi que meu problema era fermentação bacteriana. Em duas semanas perdi 3,2 kg, a cintura afinou e as calças fecham sem pular pneuzinho para fora. Apaixonada!'
  },
  // 6. Comentário 3 - Princess Girl Bijus (Superação de Gastrite)
  {
    id: 'proof_cm_3',
    type: 'comment',
    imageSrc: '/assets/aistudio/IMG_42582_8db4673a.jpeg',
    title: 'Comentário no Instagram',
    authorName: 'princesgirlbijus',
    platform: 'Instagram',
    highlight: 'Eu testei galera, mesmo com medo por ter gastrite... testei e tá dando certo!',
    quote: 'Eu testei galera, mesmo com medo por ter gastrite, já que os médicos aconselharam a cortar frutas ácidas e cítricas, testei e tá dando certo! Tomo água morna com limão em jejum e tá dando certo.',
    tag: 'Alívio Digestivo'
  },
  // 7. Antes & Depois 4 - Patrícia
  {
    id: 'proof_ba_4',
    type: 'before_after',
    imageSrc: '/assets/aistudio/5976e4233c10c6c5458a59c72f6ee753_78c404c8.jpeg',
    authorName: 'Patrícia',
    title: 'Patrícia: "Desinchei a barriga e as costas em apenas 7 dias"',
    subtitle: 'Alívio na retenção linfática dorsal e silhueta mais harmoniosa.',
    tag: 'Aluna Verificada',
    timeframe: '7 Dias de Protocolo',
    highlight: 'Em 7 dias desinchei 2,5 kg e até o fecho do sutiã parou de machucar as costas!',
    quote: 'Aderi ao programa Barriga Chapada em 7 Dias por indicação. Já no 3º dia meu intestino funcionou como um relógio e os gases dolorosos sumiram. Eliminei 2,5 kg de retenção líquida na primeira semana, o inchaço nas costas sumiu e me sinto feminina e leve de novo!'
  },
  // 8. Comentário 4 - Kelly Cardoso & Luciene
  {
    id: 'proof_cm_4',
    type: 'comment',
    imageSrc: '/assets/aistudio/IMG_6601_61ecc3d3.jpeg',
    title: 'Comentários da Comunidade no Instagram',
    authorName: 'kelly_cardoso7',
    platform: 'Instagram',
    highlight: 'Eu bebi durante 2 semanas e realmente funciona mesmo... É vdd... 👏👏',
    quote: 'Eu bebi durante 2 semanas e realmente funciona mesmo até você eu tomo 🥰 | Luciene Coimbra: É vdd... 👏👏',
    tag: 'Comunidade Ativa'
  },
  // 9. Antes & Depois 5 - Fernanda
  {
    id: 'proof_ba_5',
    type: 'before_after',
    imageSrc: '/assets/aistudio/c85c2a4a0e1f0f2922f1f42f2e9b83a5_bac2f03d.jpeg',
    authorName: 'Fernanda',
    title: 'Fernanda: "Não pareço mais grávida no fim do dia de trabalho"',
    subtitle: 'Diminuição acentuada da projeção gástrica frontal.',
    tag: 'Aluna Verificada',
    timeframe: '15 Dias de Protocolo',
    highlight: 'Menos 3,5 kg em 15 dias. Todo mundo no trabalho comentou a diferença no meu corpo!',
    quote: 'Chegava em casa às 18h com a barriga tão inchada que parecia gravidez de 5 meses. Aderi ao programa e apliquei as substituições e os chás certos. Perdi 3,5 kg em 15 dias, a digestão ficou levinha e recuperei o prazer de me olhar no espelho!'
  },
  // 10. Comentário 5 - Samuel
  {
    id: 'proof_cm_5',
    type: 'comment',
    imageSrc: '/assets/aistudio/IMG_8677_64b97d36.jpeg',
    title: 'Depoimento Pós-Gestação no YouTube',
    authorName: '@Samuel-f4i3x',
    platform: 'YouTube',
    highlight: 'Me ajudou muito na época depois da gravidez... Vou voltar a tomar!',
    quote: 'Depois da gravidez me ajudou muito na época. Vou voltar a tomar!',
    tag: 'Pós-Gravidez'
  },
  // 11. Antes & Depois 6 - Juliana
  {
    id: 'proof_ba_6',
    type: 'before_after',
    imageSrc: '/assets/aistudio/c23622bbead7049a621fc43c6d2e6893_3a05f201.jpeg',
    authorName: 'Juliana',
    title: 'Juliana: "Estômago leve e sem queimação após o almoço"',
    subtitle: 'Menos gases retidos e digestão suave o dia todo.',
    tag: 'Aluna Verificada',
    timeframe: '12 Dias de Protocolo',
    highlight: 'Eliminei 3 kg em 12 dias e parei de tomar remédios para gases de farmácia.',
    quote: 'Eu vivia gastando dinheiro com remédios para gases que só mascaravam o sintoma. Com o protocolo de 7 dias, aprendi a desinflamar o trato gástrico com alimentos anti-inchaço. Perdi 3 kg em 12 dias, a linha do estômago baixou e voltei a almoçar em paz!'
  },
  // 12. Comentário 6 - Bruno Monteiro
  {
    id: 'proof_cm_6',
    type: 'comment',
    imageSrc: '/assets/aistudio/IMG_6600_00331ab5.jpeg',
    title: 'Relato no Instagram',
    authorName: 'brun0_m0nteir0',
    platform: 'Instagram',
    highlight: 'Fiz isso REALMENTE INCRÍVEL...',
    quote: 'Fiz isso, realmente incrível a diferença no corpo e na disposição.',
    tag: 'Transformação Real'
  },
  // 13. Antes & Depois 7 - Renata
  {
    id: 'proof_ba_7',
    type: 'before_after',
    imageSrc: '/assets/aistudio/d8d0d93e77484e9048a47df3961f9cd5_4d8d9856.jpeg',
    authorName: 'Renata',
    title: 'Renata: "Meu shorts jeans que não fechava agora tem folga de sobra"',
    subtitle: 'A prova concreta de que as roupas voltam a servir sem sofrimento.',
    tag: 'Aluna Verificada',
    timeframe: '3 Semanas de Protocolo',
    highlight: 'Menos 4 kg em 3 semanas! A maior sensação de liberdade que já tive ao me vestir.',
    quote: 'Aderi ao Barriga Chapada em 7 Dias meio desconfiada, mas é pura ciência biológica! Em 3 semanas eliminei 4 kg de pura inflamação e retenção. Meu shorts jeans que não fechava agora tem folga para enfiar a mão na cintura. Minha autoestima foi lá em cima!'
  },
  // 14. Comentário 7 - Comunidade Reels
  {
    id: 'proof_cm_7',
    type: 'comment',
    imageSrc: '/assets/aistudio/IMG_6602_431c4bf6.jpeg',
    title: 'Engajamento e Comentários no Reels',
    authorName: 'Comunidade @zuy_silva emagrecer',
    platform: 'Instagram',
    highlight: 'Centenas de comentários compartilhando a redução do inchaço.',
    quote: 'Dezenas de pessoas confirmando nos comentários a eficácia do ritual matinal e das infusões anti-inchaço.',
    tag: 'Viral nas Redes'
  }
];
