import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const structures = {
  es: [
    'La {adjective} {noun} {action} hacia {goal}.',
    'El {noun} en tu {adjective} {action} al universo.',
    'A través de {noun}, {action} {goal}.',
    'Tu {noun} {action} en perfecta {adjective}.',
    'La {adjective} conexión con {noun} te lleva a {goal}.',
    '{action} con la fuerza de la {adjective} {noun}.',
    'El poder de {noun} {action} la {goal}.',
    'Tu {adjective} {noun} {action} caminos {adjective} hacia {goal}.',
    '{noun} y {noun} {action} {goal}.',
    '{goal} se alcanza al {action} con {noun}.',
  ],
  en: [
    'The {adjective} {noun} {action} towards {goal}.',
    'The {noun} in your {adjective} {action} to the universe.',
    'Through {noun}, {action} {goal}.',
    'Your {noun} {action} in perfect {adjective}.',
    'The {adjective} connection with {noun} leads you to {goal}.',
    '{action} with the power of the {adjective} {noun}.',
    'The power of {noun} {action} the {goal}.',
    'Your {adjective} {noun} {action} {adjective} paths to {goal}.',
    '{noun} and {noun} {action} {goal}.',
    '{goal} is achieved by {action} with {noun}.',
  ],
};

const words = {
  es: {
    adjectives: [
      'infinita',
      'sagrada',
      'mágica',
      'luminosa',
      'poderosa',
      'positiva',
      'creativa',
      'profunda',
      'equilibrada',
      'celestial',
    ],
    nouns: [
      'energía',
      'esencia',
      'vibración',
      'claridad',
      'gratitud',
      'intención',
      'sabiduría',
      'fuerza interior',
      'armonía',
      'intuición',
    ],
    actions: [
      'fluye',
      'resuena',
      'se alinea',
      'conecta',
      'crece',
      'se transforma',
      'ilumina',
      'manifiesta',
      'atrae',
      'despierta',
    ],
    goals: [
      'abundancia',
      'sabiduría',
      'iluminación',
      'claridad interior',
      'propósito',
      'crecimiento personal',
      'paz interior',
      'conexión universal',
      'armonía',
      'amor propio',
    ],
  },
  en: {
    adjectives: [
      'infinite',
      'sacred',
      'magical',
      'luminous',
      'powerful',
      'positive',
      'creative',
      'deep',
      'balanced',
      'celestial',
    ],
    nouns: [
      'energy',
      'essence',
      'vibration',
      'clarity',
      'gratitude',
      'intention',
      'wisdom',
      'inner strength',
      'harmony',
      'intuition',
    ],
    actions: [
      'flows',
      'resonates',
      'aligns',
      'connects',
      'grows',
      'transforms',
      'illuminates',
      'manifests',
      'attracts',
      'awakens',
    ],
    goals: [
      'abundance',
      'wisdom',
      'enlightenment',
      'inner clarity',
      'purpose',
      'personal growth',
      'inner peace',
      'universal connection',
      'harmony',
      'self-love',
    ],
  },
};

// Generador de mensajes
function generateMessages(
  count: number,
  language: 'es' | 'en',
): { type: string; language: string; segmentKey: string; content: string }[] {
  const messages = [];
  const type = 'evaluacion-etapa1';

  const structureList = structures[language];
  const wordList = words[language];

  for (let i = 0; i < count; i++) {
    const structure =
      structureList[Math.floor(Math.random() * structureList.length)];
    const adjective =
      wordList.adjectives[
        Math.floor(Math.random() * wordList.adjectives.length)
      ];
    const noun =
      wordList.nouns[Math.floor(Math.random() * wordList.nouns.length)];
    const action =
      wordList.actions[Math.floor(Math.random() * wordList.actions.length)];
    const goal =
      wordList.goals[Math.floor(Math.random() * wordList.goals.length)];

    const messageText = structure
      .replace('{adjective}', adjective)
      .replace('{noun}', noun)
      .replace('{action}', action)
      .replace('{goal}', goal);

    messages.push({
      type: type,
      language: language,
      segmentKey: '2',
      content: messageText,
    });
  }
  return messages;
}

const main = async () => {
  const type = 'evaluacion-etapa1';
  const positiveMessages = [
    {
      type,
      language: 'es',
      segmentKey: '1',
      content: 'El universo conspira a tu favor, sigue avanzando.',
    },
    {
      type,
      language: 'en',
      segmentKey: '1',
      content: 'The universe conspires in your favor, keep moving forward.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content: 'Cada paso que das te acerca a tu propósito.',
    },
    {
      type,
      language: 'en',
      segmentKey: '1',
      content: 'Every step you take brings you closer to your purpose.',
    },
    {
      language: 'es',
      segmentKey: '1',
      content: 'Eres una chispa divina con infinitas posibilidades.',
    },
    {
      type,
      language: 'en',
      segmentKey: '1',
      content: 'You are a divine spark with infinite possibilities.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content: 'La energía del cosmos fluye dentro de ti.',
    },
    {
      type,
      language: 'en',
      segmentKey: '1',
      content: 'The energy of the cosmos flows within you.',
    },
  ];
  const finishingMessages = [
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'Has alcanzado un nuevo nivel de iluminación espiritual.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'You have reached a new level of spiritual enlightenment.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'El camino que recorres está lleno de aprendizajes y luz.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'The path you walk is full of learning and light.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'Eres una fuente inagotable de sabiduría y amor.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'You are an inexhaustible source of wisdom and love.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'Tu espíritu brilla con la intensidad de mil estrellas.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'Your spirit shines with the intensity of a thousand stars.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'La gratitud es la llave que abre las puertas del éxito.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'Gratitude is the key that opens the doors to success.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'Tu vibración resuena en armonía con el universo.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'Your vibration resonates in harmony with the universe.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'La vida te recompensa con regalos maravillosos.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'Life rewards you with wonderful gifts.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'Eres el arquitecto de tu destino.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'You are the architect of your destiny.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'Tu inner peace es un tesoro infinito.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'Your inner peace is an infinite treasure.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'Cada desafío es una oportunidad de crecimiento divino.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'Every challenge is an opportunity for divine growth.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'Tu potencial es más grande que cualquier limitación.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'Your potential is greater than any limitation.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'La compasión es el lenguaje del alma.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'Compassion is the language of the soul.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'Tus sueños son semillas de realidad.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'Your dreams are seeds of reality.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'La transformación personal es tu mayor superpoder.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'Personal transformation is your greatest superpower.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'Irradias luz en cada momento de tu vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'You radiate light in every moment of your life.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content: 'Tu conciencia expande los límites de lo posible.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content: 'Your consciousness expands the limits of what is possible.',
    },
  ];
  const spanishMessages = generateMessages(256, 'es');
  const englishMessages = generateMessages(256, 'en');
  const complementaryMessages = [...spanishMessages, ...englishMessages];

  const data = [
    ...positiveMessages,
    ...complementaryMessages,
    ...finishingMessages,
  ];
  const allData = data.map((item) => ({
    type: 'evaluacion-etapa1', // provide a default type
    ...item,
  })) as Prisma.messageCreateManyInput[];

  // Guarda los mensajes en la base de datos
  await prisma.message.createMany({
    data: allData,
  });

  console.log('Seed completo: Mensajes creados con éxito.');
};

main()
  .catch((error: any) => {
    console.error('Error durante el seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
