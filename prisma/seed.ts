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
      content:
        '(Etapa 1) Luego de analizar su personalidad, el sistema ha detectado que usted posee una personalidad algo variada y cambiante. Sin embargo el patrón que más se percibe en usted es de ',
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
      content:
        '(Etapa 1) Luego de analizar su personalidad, el sistema ha detectado que usted se encuentra en proceso de solidificación de una personalidad genuina. Sin embargo al analizar su conducta actual, podemos detectar que usted está muy cerca de establecer un patrón de',
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
      content:
        '(Etapa 1) Luego de analizar su personalidad, el sistema ha detectado una relativa estabilidad conductual, en usted por lo general siempre se evidencia un patrón de ',
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
      content:
        '(Etapa 1) Luego de analizar su personalidad, el patrón conductual que detectamos en usted es de ',
    },
    {
      type,
      language: 'en',
      segmentKey: '1',
      content: 'The energy of the cosmos flows within you.',
    },
  ];
  const middleMessages = [
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de comandancia. Lo sabemos por su capacidad para planificar y organizar de manera efectiva. Por su capacidad para tomar decisiones y por la visión clara que usted posee. Su motivación radica en alcanzar metas y maximizar el potencial del equipo. Aunque siempre debe tener en cuenta que a veces su enfoque en la eficiencia puede ser percibido como frialdad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de inspiración. Lo sabemos por su habilidad para motivar y entusiasmar a los miembros del equipo, impulsando la creatividad y la dedicación. Su enfoque en la inspiración es notable, sin embargo, debe considerar que este enfoque puede parecer idealista para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de mentoría. Lo sabemos por su capacidad para guiar y desarrollar las habilidades de los miembros del equipo, proporcionando apoyo y consejos valiosos. Su enfoque en la mentoría es significativo, sin embargo, debe tener en cuenta que este enfoque puede parecer exigente para algunos.liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de mentoría. Lo sabemos por su capacidad para guiar y desarrollar las habilidades de los miembros del equipo, proporcionando apoyo y consejos valiosos. Su enfoque en la mentoría es significativo, sin embargo, debe tener en cuenta que este enfoque puede parecer exigente para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de estrategia. Lo sabemos por su habilidad para diseñar y ejecutar planes a largo plazo, anticipando y gestionando los riesgos para alcanzar los objetivos. Su enfoque en la estrategia es notable, sin embargo, debe considerar que este enfoque puede parecer distante para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de coordinación. Lo sabemos por su capacidad para orquestar las actividades del equipo, asegurando que todos trabajen en armonía hacia los objetivos comunes. Su enfoque en la coordinación es significativo, sin embargo, debe tener en cuenta que este puede parecer controlado para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de ejemplo. Lo sabemos por su habilidad para liderar con el ejemplo, demostrando los valores y comportamientos que espera de su equipo. Su enfoque en liderar con el ejemplo es notable, sin embargo, debe considerar que este enfoque puede parecer autoritario para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de motivación. Lo sabemos por su capacidad para estimular la energía y el entusiasmo en su equipo, fomentando un ambiente positivo y productivo. Su enfoque en la motivación es significativo, sin embargo, debe tener en cuenta que este puede parecer superficial para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de innovación. Lo sabemos por su habilidad para fomentar y promover nuevas ideas y enfoques, impulsando la creatividad y el cambio dentro del equipo. Su enfoque en la innovación es notable, sin embargo, debe considerar que este puede parecer desorganizado para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de adaptabilidad. Lo sabemos por su capacidad para ajustar y modificar estrategias según las circunstancias cambiantes, manteniendo al equipo enfocado y flexible. Su enfoque en la adaptabilidad es significativo, sin embargo, debe tener en cuenta que este puede parecer errático para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de delegación. Lo sabemos por su habilidad para asignar responsabilidades y confiar en las capacidades de su equipo para cumplir con los objetivos. Su enfoque en la delegación es notable, sin embargo, debe considerar que este puede parecer distante para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de resiliencia. Lo sabemos por su capacidad para enfrentar y superar desafíos, manteniendo al equipo motivado y enfocado en los objetivos a pesar de las dificultades. Su enfoque en la resiliencia es significativo, sin embargo, debe tener en cuenta que este puede parecer obstinado para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de decisión rápida. Lo sabemos por su habilidad para tomar decisiones rápidas y efectivas en momentos críticos, manteniendo al equipo en movimiento hacia el éxito. Su enfoque en la decisión rápida es notable sin embargo, debe considerar que este puede parecer impulsivo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de planificación a largo plazo. Lo sabemos por su capacidad para diseñar y seguir planes detallados que guían al equipo hacia el éxito futuro. Su enfoque en la planificación a largo plazo es significativo, sin embargo, debe tener en cuenta que este puede parecer inflexible para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de empoderamiento. Lo sabemos por su habilidad para capacitar a los miembros del equipo, promoviendo su autonomía y crecimiento personal. Su enfoque en el empoderamiento es notable, sin embargo, debe considerar que este puede parecer laxo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de comunicación efectiva. Lo sabemos por su capacidad para transmitir ideas y expectativas de manera clara y persuasiva, asegurando que todos estén alineados. Su enfoque en la comunicación efectiva es significativo, sin embargo, debe tener en cuenta que este puede parecer insistente para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'liderazgo natural, exactamente, usted suele tomar las riendas en cualquier situación. Siente el impulso de guiar a los demás e incluso siente la necesidad de controlar actividades y de tomar decisiones. La enorme confianza que usted posee suele inspirar a otros a seguirle. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de liderazgo natural se manifiesta a modo de resolución de problemas. Lo sabemos por su capacidad para identificar problemas y encontrar soluciones efectivas, guiando al equipo hacia la superación de obstáculos. Su enfoque en la resolución de problemas es notable, sin embargo, debe considerar que este puede parecer técnico para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de resolución de conflictos. Lo sabemos por su habilidad para intervenir y resolver disputas de manera efectiva, buscando soluciones equilibradas y justas. Su enfoque en la resolución de conflictos es notable, sin embargo, debe tener en cuenta que este puede parecer tardío para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de facilitador de diálogo. Lo sabemos por su capacidad para promover la comunicación abierta y efectiva entre partes en desacuerdo, facilitando un entendimiento mutuo. Su enfoque en la facilitación de diálogo es significativo, sin embargo, debe considerar que este enfoque puede parecer neutral para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de intervención equitativa. Lo sabemos por su habilidad para intervenir en situaciones difíciles y garantizar que todas las partes sean escuchadas de manera justa y equitativa. Su enfoque en la intervención equitativa es notable, sin embargo, debe tener en cuenta que este puede parecer pasivo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de asesoramiento imparcial. Lo sabemos por su capacidad para ofrecer consejos y orientación sin sesgo, ayudando a las personas a tomar decisiones informadas. Su enfoque en el asesoramiento imparcial es significativo, sin embargo, debe considerar que este puede parecer distante para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de conciliador de intereses. Lo sabemos por su habilidad para identificar y conciliar diferentes intereses y prioridades, logrando acuerdos satisfactorios para todas las partes involucradas. Su enfoque en la conciliación de intereses es notable, sin embargo, debe tener en cuenta que este puede parecer complicado para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de apoyo emocional. Lo sabemos por su capacidad para proporcionar apoyo emocional a las personas involucradas en conflictos, ayudándolas a manejar sus emociones y preocupaciones. Su enfoque en el apoyo emocional es significativo, sin embargo, debe considerar que este puede parecer insuficiente para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de negociador hábil. Lo sabemos por su habilidad para negociar acuerdos de manera efectiva, buscando soluciones que beneficien a todas las partes involucradas. Su enfoque en la negociación hábil es notable, sin embargo, debe tener en cuenta que este enfoque puede parecer excesivo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de mediador colaborativo. Lo sabemos por su capacidad para fomentar la colaboración y la cooperación entre las partes, promoviendo un ambiente de trabajo en equipo. Su enfoque en la mediación colaborativa es significativo, sin embargo, debe considerar que este puede parecer forzado para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de coordinador de soluciones. Lo sabemos por su habilidad para coordinar y facilitar la implementación de soluciones acordadas, asegurando que se lleven a cabo de manera efectiva. Su enfoque en la coordinación de soluciones es notable, sin embargo, debe tener en cuenta que este puede parecer detallista para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de asesor de resolución. Lo sabemos por su capacidad para ofrecer asesoría especializada en la resolución de conflictos, proporcionando soluciones prácticas y viables. Su enfoque en el asesoramiento para la resolución es notable, sin embargo, debe tener en cuenta que este puede parecer limitado para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de facilitador de entendimiento. Lo sabemos por su habilidad para promover un entendimiento mutuo entre las partes, ayudando a aclarar malentendidos y a encontrar puntos de acuerdo. Su enfoque en la facilitación del entendimiento es significativo, sin embargo, debe considerar que este puede parecer superficial para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de coordinador de diálogo. Lo sabemos por su capacidad para coordinar las conversaciones entre las partes en conflicto, asegurando que todos los puntos de vista sean escuchados y considerados. Su enfoque en la coordinación del diálogo es notable, sin embargo, debe tener en cuenta que este puede parecer neutral para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de facilitador de soluciones. Lo sabemos por su habilidad para facilitar la creación de soluciones consensuadas que satisfagan a todas las partes involucradas. Su enfoque en la facilitación de soluciones es significativo, sin embargo, debe considerar que este puede parecer indirecto para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de intermediario de conflictos. Lo sabemos por su capacidad para actuar como intermediario entre partes en desacuerdo, guiando las discusiones hacia una resolución constructiva. Su enfoque en la intermediación de conflictos es notable, sin embargo, debe tener en cuenta que este puede parecer distanciamiento para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'mediación, exactamente, en usted se evidencia un don especial para escuchar y entender diferentes perspectivas. En momentos de conflicto a usted se le da bien actuar como un puente entre ambas partes, buscando la armonía y la comprensión, solucionando situaciones. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de mediación se manifiesta a modo de solucionador de disputas. Lo sabemos por su habilidad para resolver disputas de manera eficiente, buscando soluciones que sean aceptables para todos los involucrados. Su enfoque en la resolución de disputas es significativo, sin embargo, debe considerar que este puede parecer rígido para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de innovación desafiante. Lo sabemos por su capacidad para generar ideas revolucionarias y abordar problemas con soluciones inusuales. Su enfoque en la innovación desafiante es notable, sin embargo, debe tener en cuenta que este puede parecer arriesgado para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de generación de ideas divergentes. Lo sabemos por su habilidad para proponer una amplia gama de ideas originales y explorar múltiples posibilidades. Su enfoque en la generación de ideas divergentes es significativo, sin embargo, debe considerar que esta diversidad puede parecer poco enfocada para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de solución original de problemas. Lo sabemos por su capacidad para encontrar respuestas únicas e innovadoras a problemas complejos. Su enfoque en la solución original de problemas es notable, sin embargo, debe tener en cuenta que esta originalidad puede parecer impráctica para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de imaginación fluida. Lo sabemos por su capacidad para dejar fluir su imaginación y explorar conceptos y posibilidades sin restricciones. Su enfoque en la imaginación fluida es significativo, sin embargo, debe considerar que esta libertad creativa puede parecer desorganizada para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de creación artística. Lo sabemos por su habilidad para expresar ideas de manera artística y original, produciendo obras o conceptos visualmente y conceptualmente impactantes. Su enfoque en la creación artística es notable, sin embargo, debe tener en cuenta que esta orientación puede parecer subjetiva para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de pensamiento no convencional. Lo sabemos por su tendencia a desafiar las normas establecidas y buscar enfoques alternativos y poco ortodoxos para resolver problemas. Su enfoque en el pensamiento no convencional es significativo, sin embargo, debe considerar que este puede parecer inusual para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de pensamiento no convencional. Lo sabemos por su tendencia a desafiar las normas establecidas y buscar enfoques alternativos y poco ortodoxos para resolver problemas. Su enfoque en el pensamiento no convencional es significativo, sin embargo, debe considerar que este puede parecer inusual para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de innovación aplicada. Lo sabemos por su capacidad para aplicar ideas innovadoras en situaciones prácticas y concretas para generar resultados efectivos. Su enfoque en la innovación aplicada es notable, sin embargo, debe tener en cuenta que esta aplicación puede parecer demasiado específica para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de exploración conceptual. Lo sabemos por su inclinación a explorar y desarrollar conceptos nuevos y abstractos que pueden conducir a descubrimientos innovadores. Su enfoque en la exploración conceptual es significativo, sin embargo, debe considerar que esta exploración puede parecer poco práctica para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de diseño original. Lo sabemos por su habilidad para crear diseños y conceptos únicos que destacan por su originalidad y funcionalidad. Su enfoque en el diseño original es notable, sin embargo, debe tener en cuenta que esta originalidad puede parecer extravagante para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de adaptación creativa. Lo sabemos por su capacidad para ajustar y transformar ideas existentes de maneras novedosas y útiles para nuevas situaciones. Su enfoque en la adaptación creativa es significativo, sin embargo, debe considerar que esta adaptación puede parecer poco convencional para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de inspiración visionaria. Lo sabemos por su habilidad para visualizar y articular ideas innovadoras que pueden inspirar y motivar a otros. Su enfoque en la inspiración visionaria es notable, sin embargo, debe tener en cuenta que esta visión puede parecer idealista para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de creatividad experimental. Lo sabemos por su disposición a experimentar con nuevas técnicas y enfoques para explorar nuevas posibilidades y resultados. Su enfoque en la creatividad experimental es significativo, sin embargo, debe considerar que esta experimentación puede parecer incierta para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de innovación disruptiva. Lo sabemos por su tendencia a desarrollar ideas que rompen con lo convencional y crean cambios significativos en su campo. Su enfoque en la innovación disruptiva es notable, sin embargo, debe tener en cuenta que este puede parecer radical para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de creación de soluciones alternativas. Lo sabemos por su habilidad para generar soluciones creativas y distintas para problemas complejos que otros podrían pasar por alto. Su enfoque en la creación de soluciones alternativas es significativo, sin embargo, debe considerar que estas soluciones pueden parecer poco convencionales para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de imaginación aplicada. Lo sabemos por su capacidad para llevar la imaginación más allá de lo teórico y aplicarla a problemas reales de manera innovadora. Su enfoque en la imaginación aplicada es notable, sin embargo, debe tener en cuenta que esta aplicación puede parecer especulativa para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'creatividad, exactamente, su mente suele estar llena de ideas originales y formas innovadoras de ver el mundo. Usted suele encontrar belleza en lo cotidiano, incluso podrías llegar a disfrutar expresarte a través del arte, la música o cualquier otra forma de creación. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de creatividad se manifiesta a modo de expresión única. Lo sabemos por su habilidad para expresar ideas de manera distintiva y personal, creando algo verdaderamente único. Su enfoque en la expresión única es significativo, sin embargo, debe considerar que esta expresión puede parecer demasiado individualista para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de evaluación detallada. Lo sabemos por su capacidad para desglosar información compleja en partes manejables, realizando una evaluación meticulosa para comprender todos los aspectos relevantes. Su enfoque en la evaluación detallada es notable, sin embargo, debe tener en cuenta que este nivel de detalle puede parecer excesivo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de investigación exhaustiva. Lo sabemos por su dedicación a realizar investigaciones minuciosas y profundas antes de tomar decisiones, asegurando que todos los datos sean considerados. Su enfoque en la investigación exhaustiva es significativo, sin embargo, debe considerar que esta profundidad puede parecer lenta para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de razonamiento lógico. Lo sabemos por su habilidad para aplicar principios lógicos y razonamientos sólidos al evaluar situaciones y resolver problemas. Su enfoque en el razonamiento lógico es notable, sin embargo, debe tener en cuenta que este puede parecer demasiado riguroso para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de evaluación comparativa. Lo sabemos por su capacidad para comparar diferentes opciones y evaluar sus méritos relativos antes de tomar una decisión informada. Su enfoque en la evaluación comparativa es significativo, sin embargo, debe considerar que esta comparación puede parecer indecisa para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de desglose metódico. Lo sabemos por su tendencia a descomponer problemas complejos en componentes más simples para facilitar su comprensión y resolución. Su enfoque en el desglose metódico es notable, sin embargo, debe tener en cuenta que este puede parecer demasiado detallado para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de revisión crítica. Lo sabemos por su capacidad para evaluar información y argumentos de manera crítica, buscando posibles fallos o inconsistencias. Su enfoque en la revisión crítica es significativo, sin embargo, debe considerar que este análisis puede parecer excesivamente crítico para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de exploración minuciosa. Lo sabemos por su disposición a examinar todos los detalles y matices de una situación antes de llegar a una conclusión. Su enfoque en la exploración minuciosa es notable, sin embargo, debe tener en cuenta que esta minuciosidad puede parecer tediosa para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de investigación sistemática. Lo sabemos por su método riguroso y sistemático para recolectar y analizar datos antes de tomar decisiones. Su enfoque en la investigación sistemática es significativo, sin embargo, debe considerar que este método puede parecer metódico en exceso para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de evaluación profunda. Lo sabemos por su tendencia a explorar a fondo cada aspecto de un problema para asegurarse de que todas las variables sean consideradas. Su enfoque en la evaluación profunda es notable, sin embargo, debe tener en cuenta que esta profundidad puede parecer innecesaria para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de evaluación de riesgos. Lo sabemos por su habilidad para identificar y evaluar los riesgos potenciales asociados con diferentes decisiones o acciones. Su enfoque en la evaluación de riesgos es significativo, sin embargo, debe considerar que este puede parecer demasiado precautorio para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de resolución de problemas complejos. Lo sabemos por su capacidad para abordar y resolver problemas complejos mediante un análisis detallado y meticuloso. Su enfoque en la resolución de problemas complejos es notable, sin embargo, debe tener en cuenta que este puede parecer excesivo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de clarificación de datos. Lo sabemos por su habilidad para organizar y aclarar datos complejos para facilitar una comprensión más precisa y efectiva. Su enfoque en la clarificación de datos es significativo, sin embargo, debe considerar que esta clarificación puede parecer redundante para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de verificación de hechos. Lo sabemos por su inclinación a verificar la exactitud de la información antes de aceptarla o utilizarla en la toma de decisiones. Su enfoque en la verificación de hechos es notable, sin embargo, debe tener en cuenta que esta verificación puede parecer excesiva para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de investigación detallada. Lo sabemos por su disposición a realizar una investigación exhaustiva y detallada para asegurar que todas las variables y factores sean comprendidos. Su enfoque en la investigación detallada es significativo, sin embargo, debe considerar que esta investigación puede parecer interminable para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de desglose analítico. Lo sabemos por su capacidad para dividir información compleja en partes más manejables para facilitar su análisis y comprensión. Su enfoque en el desglose analítico es notable, sin embargo, debe tener en cuenta que este desglose puede parecer excesivamente complejo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'análisis, exactamente, usted suele ser una persona analítica. A usted le suele encantar descomponer problemas complejos en partes manejables, tiende a buscar datos y hechos para tomar decisiones informadas. Por lo general su satisfacción la encuentra en resolver desafíos intelectuales. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de análisis se manifiesta a modo de planificación estratégica. Lo sabemos por su habilidad para utilizar un análisis exhaustivo para desarrollar estrategias a largo plazo y planes de acción efectivos. Su enfoque en la planificación estratégica es significativo, sin embargo, debe considerar que este puede parecer demasiado detallado para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de exploración audaz. Lo sabemos por su inclinación a buscar experiencias nuevas y emocionantes con valentía, y su entusiasmo por enfrentarse a desafíos desconocidos. Su enfoque en la exploración audaz es notable, sin embargo, debe tener en cuenta que este puede parecer imprudente para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de descubrimiento innovador. Lo sabemos por su capacidad para encontrar nuevas oportunidades y soluciones creativas en entornos cambiantes, buscando siempre innovar y experimentar. Su enfoque en el descubrimiento innovador es significativo, sin embargo, debe considerar que esta innovación puede parecer arriesgada para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de emoción continua. Lo sabemos por su entusiasmo constante por las actividades estimulantes y su deseo de mantener una vida llena de dinamismo y novedad. Su enfoque en la emoción continua es notable, sin embargo, debe tener en cuenta que esta constante búsqueda de emoción puede parecer inestable para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de riesgo calculado. Lo sabemos por su habilidad para evaluar y asumir riesgos de manera consciente para alcanzar objetivos y vivir nuevas experiencias. Su enfoque en el riesgo calculado es significativo, sin embargo, debe considerar que este enfoque puede parecer temerario para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de curiosidad activa. Lo sabemos por su inclinación a explorar y aprender sobre nuevos temas, manteniéndose siempre activo en la búsqueda de conocimiento y experiencias inéditas. Su enfoque en la curiosidad activa es notable, sin embargo, debe tener en cuenta que esta curiosidad puede parecer desorganizada para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de impulso hacia lo desconocido. Lo sabemos por su deseo persistente de embarcarse en nuevas aventuras y descubrir lo desconocido con entusiasmo y energía. Su enfoque en el impulso hacia lo desconocido es significativo, sin embargo, debe considerar que este puede parecer precipitado para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de dinamismo creativo. Lo sabemos por su capacidad para generar ideas y enfoques innovadores mientras se enfrenta a nuevas y emocionantes situaciones. Su enfoque en el dinamismo creativo es notable, sin embargo, debe tener en cuenta que esta creatividad puede parecer poco práctica para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de actividad diversificada. Lo sabemos por su inclinación a participar en una variedad de actividades estimulantes y diferentes, manteniendo siempre un estilo de vida vibrante. Su enfoque en la actividad diversificada es significativo, sin embargo, debe considerar que esta diversidad puede parecer dispersa para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de adaptabilidad flexible. Lo sabemos por su capacidad para ajustarse rápidamente a nuevos entornos y situaciones, manteniendo una actitud positiva ante el cambio. Su enfoque en la adaptabilidad flexible es notable, sin embargo, debe tener en cuenta que esta flexibilidad puede parecer inestable para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de impulso hacia el desafío. Lo sabemos por su deseo constante de superar obstáculos y enfrentar retos con determinación y entusiasmo. Su enfoque en el impulso hacia el desafío es significativo, sin embargo, debe considerar que este impulso puede parecer excesivo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de exploración sin fronteras. Lo sabemos por su tendencia a buscar experiencias y lugares sin limitaciones, siempre en busca de nuevas y emocionantes oportunidades. Su enfoque en la exploración sin fronteras es notable, sin embargo, debe tener en cuenta que esta búsqueda puede parecer desmedida para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de emoción innovadora. Lo sabemos por su entusiasmo por introducir cambios y experimentar con nuevas formas de hacer las cosas, buscando siempre la novedad. Su enfoque en la emoción innovadora es significativo, sin embargo, debe considerar que esta innovación puede parecer arriesgada para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de desafío motivador. Lo sabemos por su capacidad para encontrar inspiración y motivación en los retos que enfrenta, buscando siempre superar sus propios límites. Su enfoque en el desafío motivador es notable, sin embargo, debe tener en cuenta que este puede parecer agotador para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de motivación incesante. Lo sabemos por su capacidad para mantenerse energizado y entusiasta frente a nuevas oportunidades y experiencias, sin perder el impulso. Su enfoque en la motivación incesante es significativo, sin embargo, debe considerar que esta puede parecer excesiva para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que suele buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de creación imaginativa. Lo sabemos por su habilidad para generar ideas originales y conceptos innovadores mientras explora nuevas posibilidades. Su enfoque en la creación imaginativa es notable, sin embargo, debe tener en cuenta que esta creación puede parecer poco realista para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'aventura, exactamente, por lo general la rutina no es para usted. Ya que sueles buscar constantemente nuevas experiencias, ya sea explorando nuevos lugares o probando actividades emocionantes. Usted suele pensar que la vida es una aventura que se debe vivir al máximo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de aventura se manifiesta a modo de vivencia intensa. Lo sabemos por su deseo de experimentar la vida de manera plena y emocionante, buscando siempre nuevas formas de enriquecer su experiencia. Su enfoque en la vivencia intensa es significativo, sin embargo, debe considerar que esta intensidad puede parecer abrumadora para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de protección activa. Lo sabemos por su dedicación a salvaguardar el bienestar de los demás y su capacidad para anticipar y satisfacer sus necesidades. Su enfoque en la protección activa es notable, sin embargo, debe tener en cuenta que este puede ser percibido como sobreprotección por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de apoyo incondicional. Lo sabemos por su disposición constante a brindar apoyo emocional y físico a quienes le rodean, mostrando empatía y comprensión en todo momento. Su enfoque en el apoyo incondicional es significativo, sin embargo, debe considerar que este puede parecer desbordante para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de acompañamiento empático. Lo sabemos por su capacidad para conectar profundamente con los sentimientos de los demás y ofrecer consuelo y comprensión cuando más lo necesitan. Su enfoque en el acompañamiento empático es notable, sin embargo, debe tener en cuenta que este puede parecer invasivo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de asistencia atenta. Lo sabemos por su habilidad para observar y detectar necesidades antes de que sean verbalizadas, brindando ayuda de manera anticipada y cuidadosa. Su enfoque en la asistencia atenta es significativo, sin embargo, debe considerar que esta puede parecer excesiva para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de cuidado sostenible. Lo sabemos por su enfoque en ofrecer un apoyo continuo y constante, asegurando que el bienestar de los demás sea mantenido a lo largo del tiempo. Su enfoque en el cuidado sostenible es notable, sin embargo, debe tener en cuenta que este puede parecer ininterrumpido para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de soporte integral. Lo sabemos por su capacidad para brindar apoyo en múltiples aspectos de la vida de quienes le rodean, desde lo emocional hasta lo práctico. Su enfoque en el soporte integral es significativo, sin embargo, debe considerar que este puede parecer demasiado amplio para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de protección delicada. Lo sabemos por su habilidad para ofrecer seguridad y confort de manera sensible y considerada, adaptándose a las necesidades individuales de cada persona. Su enfoque en la protección delicada es notable, sin embargo, debe tener en cuenta que esta puede parecer excesivamente cautelosa para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de atención cuidadosa. Lo sabemos por su capacidad para dedicar tiempo y energía a cuidar de los detalles personales y emocionales de los demás, mostrando un interés genuino en su bienestar. Su enfoque en la atención cuidadosa es significativo, sin embargo, debe considerar que esta puede parecer minuciosa para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de apoyo personalizado. Lo sabemos por su habilidad para adaptar su ayuda a las necesidades específicas de cada individuo, asegurando que el apoyo sea relevante y efectivo. Su enfoque en el apoyo personalizado es notable, sin embargo, debe tener en cuenta que este puede parecer exclusivo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de cuidado dedicado. Lo sabemos por su disposición para invertir tiempo y recursos en el bienestar de los demás, mostrando un compromiso profundo con su cuidado y seguridad. Su enfoque en el cuidado dedicado es significativo, sin embargo, debe considerar que este puede parecer sobrecargado para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de apoyo consistente. Lo sabemos por su habilidad para ofrecer un respaldo constante y fiable, creando un ambiente de confianza y estabilidad para quienes le rodean. Su enfoque en el apoyo consistente es notable, sin embargo, debe tener en cuenta que este puede parecer monótono para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de atención solícita. Lo sabemos por su habilidad para ofrecer una atención constante y atenta a las necesidades y emociones de los demás, mostrando un compromiso genuino con su bienestar. Su enfoque en la atención solícita es significativo, sin embargo, debe considerar que esta puede parecer absorbente para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de Cuidador se manifiesta a modo de cuidado proactivo. Lo sabemos por su capacidad para anticipar y abordar las necesidades de los demás antes de que se conviertan en problemas, mostrando una actitud preventiva. Su enfoque en el cuidado proactivo es notable, sin embargo, debe tener en cuenta que este puede parecer innecesario para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de soporte considerado. Lo sabemos por su habilidad para ofrecer ayuda y apoyo de manera considerada, ajustando su enfoque según las circunstancias y necesidades individuales. Su enfoque en el soporte considerado es significativo, sin embargo, debe considerar que este puede parecer intrusivo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de protección emocional. Lo sabemos por su capacidad para proporcionar seguridad emocional y apoyo a quienes le rodean, creando un entorno de confianza y empatía. Su enfoque en la protección emocional es notable, sin embargo, debe tener en cuenta que esta puede parecer excesiva para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'cuidador, exactamente, su empatía y su compasión suelen ser sus mayores virtudes. Usted suele preocuparse genuinamente por el bienestar de los demás. Y suele encontrar satisfacción en ayudar y apoyar a quienes le rodean. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de cuidador se manifiesta a modo de acompañamiento solidario. Lo sabemos por su habilidad para estar presente y ofrecer apoyo en momentos de necesidad, mostrando una solidaridad genuina con los demás. Su enfoque en el acompañamiento solidario es significativo, sin embargo, debe considerar que este puede parecer limitante para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de solución eficaz. Lo sabemos por su capacidad para encontrar respuestas prácticas y efectivas a los problemas, priorizando la funcionalidad y la eficiencia. Su enfoque en soluciones directas y viables es notable, sin embargo, debe tener en cuenta que esta perspectiva pragmática puede ser percibida como falta de creatividad por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de implementación eficiente. Lo sabemos por su habilidad para llevar a cabo planes de manera organizada y efectiva, minimizando complicaciones y maximizando resultados. Su enfoque en la ejecución práctica es significativo. Sin embargo, debe considerar que esta implementación eficiente puede parecer rígida para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de evaluación realista. Lo sabemos por su capacidad para evaluar situaciones de manera objetiva y tomar decisiones basadas en datos concretos y resultados tangibles. Su enfoque en la evaluación realista es destacable, sin embargo, debe tener en cuenta que esta puede ser vista como falta de visión a largo plazo por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de gestión práctica. Lo sabemos por su habilidad para manejar recursos y tareas de manera efectiva, asegurando que se cumplan los objetivos de manera eficiente y sin complicaciones innecesarias. Su enfoque en la gestión práctica es notable, sin embargo, debe considerar que esta puede parecer falta de innovación por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de resolución directa. Lo sabemos por su habilidad para abordar problemas de manera directa y encontrar soluciones rápidas y efectivas. Su enfoque en la resolución directa es significativo, sin embargo, debe tener en cuenta que esta puede parecer superficial para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de acción funcional. Lo sabemos por su capacidad para actuar de manera práctica y efectiva, asegurando que cada acción tenga un propósito claro y contribuye a los objetivos generales. Su enfoque en la acción funcional es destacable, sin embargo, debe considerar que esta puede ser vista como falta de adaptabilidad por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de evaluación de resultados. Lo sabemos por su habilidad para medir y analizar resultados para ajustar sus estrategias y procedimientos, garantizando la efectividad y la eficiencia en sus actividades. Su enfoque en la evaluación de resultados es notable, sin embargo, debe tener en cuenta que esta puede parecer excesivamente centrada en el corto plazo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de planificación funcional. Lo sabemos por su capacidad para diseñar y seguir planes prácticos que aseguren el cumplimiento de objetivos de manera ordenada y efectiva. Su enfoque en la planificación funcional es significativo, sin embargo, debe considerar que esta puede parecer inflexible para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de ejecución metódica. Lo sabemos por su habilidad para implementar planes y soluciones de manera ordenada y meticulosa, asegurando que cada paso contribuya a alcanzar el objetivo deseado. Su enfoque en la ejecución metódica es destacable, sin embargo, debe tener en cuenta que esta puede parecer demasiado estructurada para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de optimización de recursos. Lo sabemos por su capacidad para utilizar los recursos disponibles de la manera más eficiente posible, maximizando el rendimiento y reduciendo desperdicios. Su enfoque en la optimización de recursos es notable, sin embargo, debe considerar que esta puede parecer escasa en términos de creatividad para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de adaptación funcional. Lo sabemos por su habilidad para ajustar sus métodos y enfoques de manera práctica según las circunstancias y necesidades del momento. Su enfoque en la adaptación funcional es significativo, sin embargo, debe tener en cuenta que esta puede parecer carente de visión a largo plazo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de implementación ágil. Lo sabemos por su capacidad para implementar soluciones y planes de manera rápida y efectiva, adaptándose a cambios y manteniendo la eficiencia. Su enfoque en la implementación ágil es destacable, sin embargo, debe considerar que esta puede parecer precipitada para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de solución orientada. Lo sabemos por su capacidad para enfocar sus esfuerzos en encontrar soluciones prácticas que aborden los problemas de manera directa y eficiente. Su enfoque en la solución orientada es notable, sin embargo, debe tener en cuenta que esta orientación puede parecer limitada para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de procedimiento eficaz. Lo sabemos por su habilidad para seguir procedimientos establecidos que aseguren la eficacia y la consistencia en los resultados. Su enfoque en el procedimiento eficaz es significativo, sin embargo, debe considerar que este puede parecer rígido para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de análisis práctico. Lo sabemos por su capacidad para realizar análisis detallados que resulten en soluciones prácticas y efectivas, basadas en datos y hechos concretos. Su enfoque en el análisis práctico es destacable, sin embargo, debe tener en cuenta que este puede parecer excesivo para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pragmatismo, exactamente, usted suele valorar la eficacia y la funcionalidad. Por lo general prefiere soluciones simples y prácticas. Tiende a ser una persona que se siente cómoda haciendo planes que se pueden llevar a cabo sin complicaciones innecesarias. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pragmatismo se manifiesta a modo de gestión de tareas. Lo sabemos por su habilidad para organizar y gestionar tareas de manera eficiente, asegurando que se cumplan los objetivos con el menor esfuerzo posible. Su enfoque en la gestión de tareas es notable, sin embargo, debe considerar que esta puede parecer falta de flexibilidad para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de visión inspiradora. Lo sabemos por su habilidad para imaginar y trabajar hacia un futuro mejor, impulsado por una visión clara de cómo deberían ser las cosas. Su motivación se basa en sus ideales elevados y en su deseo de hacer una diferencia significativa, sin embargo, debe considerar que esta visión inspiradora puede parecer inalcanzable para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de esperanza constructiva. Lo sabemos por su capacidad para mantener una actitud positiva y esperanzadora, incluso en circunstancias difíciles, y por su enfoque en construir un mundo mejor basado en sus valores ideales. Su habilidad para infundir esperanza en los demás es significativa, sin embargo, debe tener en cuenta que esta esperanza constructiva puede ser vista como ingenuidad por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de inspiración creativa. Lo sabemos por su inclinación a generar ideas innovadoras y creativas que reflejan sus valores y sueños personales. Su capacidad para inspirar a otros con su creatividad es notable, no obstante, debe considerar que esta inspiración creativa puede ser vista como impracticable por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de compromiso ideal. Lo sabemos por su dedicación a causas que reflejan sus ideales más profundos, y por su disposición a hacer sacrificios personales para alcanzar sus objetivos. Su capacidad para mantenerse firme en sus compromisos ideales es destacable, sin embargo, debe tener en cuenta que este puede ser percibido como rigidez por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de transformación social. Lo sabemos por su impulso a generar cambios positivos en la sociedad basados en sus ideales y valores. Su habilidad para fomentar la transformación social es significativa, sin embargo, debe considerar que esta búsqueda de cambio puede ser vista como utópica por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de esperanza realista. Lo sabemos por su habilidad para equilibrar sus ideales elevados con una perspectiva práctica, buscando formas realistas de lograr sus sueños. Su capacidad para mantener una esperanza fundamentada es notable, sin embargo, debe tener en cuenta que esta esperanza realista puede ser vista como ambigua por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de inspiración personal. Lo sabemos por su tendencia a encontrar y seguir inspiraciones personales basadas en sus valores ideales, y por su capacidad para motivar a otros a través de su ejemplo. Su habilidad para mantenerse inspirado y motivado es significativa, sin embargo, debe considerar que esta inspiración personal puede parecer egoísta para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de valores fundamentales. Lo sabemos por su firme creencia en principios y valores que guían sus decisiones y acciones diarias, y por su compromiso con la integridad y la ética. Su capacidad para adherirse a estos valores fundamentales es destacable, sin embargo, debe tener en cuenta que esta puede ser vista como inflexible por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de progreso social. Lo sabemos por su impulso a promover avances y mejoras en la sociedad, guiado por sus ideales de justicia y equidad. Su capacidad para trabajar hacia el progreso social es notable, sin embargo, debe considerar que esta orientación puede parecer poco práctica para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de inspiración social. Lo sabemos por su habilidad para motivar y movilizar a otros hacia causas comunes basadas en sus ideales, buscando crear un impacto positivo en la comunidad. Su capacidad para inspirar a otros en un contexto social es significativa, sin embargo, debe tener en cuenta que esta inspiración social puede ser vista como idealista por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de propuesta ideal. Lo sabemos por su capacidad para presentar y trabajar en propuestas que reflejan sus ideales más altos y sus sueños de un mundo mejor. Su habilidad para formular propuestas ideales es destacable, sin embargo, debe considerar que estas pueden parecer inalcanzables para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de visión de futuro. Lo sabemos por su habilidad para imaginar y trabajar hacia un futuro idealizado, guiado por sus valores y sueños. Su capacidad para mantener una visión de futuro clara es notable, sin embargo, debe tener en cuenta que esta puede parecer utópica para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de motivación interna. Lo sabemos por su capacidad para encontrar y mantener la motivación a partir de sus propios ideales y valores internos, buscando siempre estar alineado con sus principios. Su habilidad para mantenerse motivado internamente es significativa, sin embargo, debe considerar que esta motivación interna puede parecer autoindulgente para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de idealismo activo. Lo sabemos por su disposición a tomar medidas concretas y trabajar activamente hacia sus ideales, buscando impactar positivamente en su entorno. Su capacidad para actuar según sus ideales es destacable, sin embargo, debe tener en cuenta que este idealismo activo puede ser visto como imprudente por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de determinación ideal. Lo sabemos por su habilidad para mantener una fuerte determinación hacia la realización de sus ideales, enfrentando desafíos con perseverancia. Su capacidad para ser determinado en la búsqueda de sus ideales es notable, sin embargo, debe considerar que esta determinación puede parecer obstinada para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'idealismo, exactamente, usted suele soñar con un mundo mejor, y en usted suele encontrarse incluso la disposición a trabajar por hacerlo realidad. Su optimismo por lo general le impulsa a involucrarse en causas que considera justas, creyendo firmemente en el poder del cambio positivo. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de idealismo se manifiesta a modo de optimismo ideal. Lo sabemos por su tendencia a mantener una actitud positiva y esperanzadora basada en sus ideales, buscando siempre ver lo mejor en las situaciones y en las personas. Su capacidad para mantener un optimismo ideal es significativa, sin embargo, debe tener en cuenta que este puede ser visto como ingenuidad por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de reflexión interior. Lo sabemos por su habilidad para dedicar tiempo a la introspección y análisis personal, valorando profundamente sus propias experiencias y emociones. Su tendencia a buscar la soledad para recargar energías y reflexionar es significativa, sin embargo, debe considerar que esta reflexión interior puede parecer aislamiento a algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de reserva personal. Lo sabemos por su inclinación a mantener un perfil bajo en entornos sociales, prefiriendo observar y escuchar antes de participar activamente. Su habilidad para gestionar su energía social de manera cuidadosa es destacable, no obstante, debe tener en cuenta que esta reserva personal puede ser percibida como desinterés por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de conexión profunda. Lo sabemos por su preferencia por establecer relaciones significativas y profundas con un número limitado de personas. Su capacidad para enfocarse en la calidad sobre la cantidad en sus interacciones es notable, sin embargo, debe considerar que esta conexión profunda puede ser vista como exclusividad en algunos casos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de observador atento. Lo sabemos por su habilidad para analizar y comprender a su entorno desde una posición de observación tranquila y reflexiva. Su capacidad para captar detalles sutiles y escuchar antes de hablar es significativa, no obstante, debe tener en cuenta que esta observación atenta puede ser interpretada como desinterés por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de solitario reflexivo. Lo sabemos por su inclinación a disfrutar del tiempo a solas para procesar pensamientos y sentimientos en un entorno tranquilo. Su habilidad para encontrar satisfacción en la soledad y la reflexión es destacable, sin embargo, debe considerar que este comportamiento solitario puede ser visto como un alejamiento social por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de introspección profunda. Lo sabemos por su capacidad para sumergirse en sus pensamientos internos y analizar detalladamente sus propias emociones y experiencias. Su inclinación hacia la introspección profunda es notable, sin embargo, debe tener en cuenta que esta introspección profunda puede ser vista como exceso de autoanálisis por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de tranquilidad personal. Lo sabemos por su habilidad para mantener una actitud calmada y serena en situaciones sociales, prefiriendo entornos relajados y controlados. Su capacidad para valorar y mantener la tranquilidad en su vida es significativa, sin embargo, debe considerar que esta tranquilidad personal puede parecer pasividad para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de tranquilidad personal. Lo sabemos por su habilidad para mantener una actitud calmada y serena en situaciones sociales, prefiriendo entornos relajados y controlados. Su capacidad para valorar y mantener la tranquilidad en su vida es significativa, sin embargo, debe considerar que esta tranquilidad personal puede parecer pasividad para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de reserva emocional. Lo sabemos por su tendencia a guardar sus emociones y pensamientos para sí mismo, revelando solo lo necesario en interacciones sociales. Su habilidad para manejar sus emociones internamente es destacable, no obstante, debe tener en cuenta que esta reserva emocional puede ser percibida como distanciamiento por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de profundidad reflexiva. Lo sabemos por su habilidad para dedicar tiempo a pensar profundamente sobre temas personales y experiencias, buscando comprensión y significado. Su capacidad para reflexionar a fondo sobre su vida es notable, sin embargo, debe considerar que esta profundidad reflexiva puede parecer excesiva para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de contemplación solitaria. Lo sabemos por su inclinación a disfrutar de actividades y pensamientos en soledad, buscando introspección y autoevaluación. Su habilidad para encontrar valor en la contemplación solitaria es significativa, sin embargo, debe tener en cuenta que esta contemplación puede ser vista como evasión social por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de enfoque interno. Lo sabemos por su tendencia a concentrarse en sus pensamientos y sentimientos internos, prefiriendo procesar la información internamente en lugar de buscar interacción social. Su capacidad para mantener un enfoque interno es destacable, sin embargo, debe considerar que este puede parecer desconexión para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de refugio personal. Lo sabemos por su habilidad para buscar y disfrutar de espacios y momentos de tranquilidad para recargar energías y reflexionar. Su capacidad para valorar y crear un refugio personal es notable, sin embargo, debe tener en cuenta que este puede parecer evasión a algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de reserva estratégica. Lo sabemos por su habilidad para gestionar cuidadosamente sus recursos emocionales y sociales, prefiriendo interacciones más significativas y controladas. Su capacidad para planificar y administrar su interacción social es significativa, sin embargo, debe considerar que esta reserva estratégica puede parecer distante para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de conexión interna. Lo sabemos por su inclinación a buscar y valorar conexiones profundas con uno mismo, enfocándose en el autoentendimiento y crecimiento personal. Su capacidad para establecer una conexión interna significativa es destacable, no obstante, debe tener en cuenta que esta puede ser vista como introspección excesiva por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de pensamiento solitario. Lo sabemos por su habilidad para dedicarse al pensamiento y análisis en soledad, buscando claridad y comprensión personal. Su capacidad para encontrar valor en el pensamiento solitario es notable, sin embargo, debe considerar que este puede parecer aislamiento a algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'introversión, exactamente, usted suele encontrar su energía en la soledad o en interacciones íntimas. Por lo general prefiere reflexionar y pensar antes de hablar. Tiende a disfrutar de momentos tranquilos que le permiten conectar con lo más profundo de su ser. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de introversión se manifiesta a modo de autoevaluación profunda. Lo sabemos por su inclinación a realizar una evaluación exhaustiva y continua de sus propias experiencias y emociones. Su capacidad para practicar la autoevaluación profunda es significativa, sin embargo, debe tener en cuenta que esta puede ser percibida como excesiva introspección por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de energía social. Lo sabemos por su habilidad para interactuar con entusiasmo y vitalidad en diversos entornos sociales. Su capacidad para conectar con las personas y mantener una actitud positiva y dinámica es destacable, sin embargo, debe considerar que esta energía social puede ser percibida como excesiva por algunos en contextos más reservados.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de sociabilidad activa. Lo sabemos por su inclinación a buscar constantemente oportunidades para socializar y estar en contacto con otros. Su habilidad para disfrutar y fomentar la interacción grupal es notable, no obstante, debe tener en cuenta que esta sociabilidad activa puede parecer invasiva en algunos casos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de entusiasmo dinámico. Lo sabemos por su capacidad para abordar las situaciones con una actitud enérgica y positiva, motivando a otros a seguir su ejemplo. Su habilidad para infundir entusiasmo en su entorno es significativa, sin embargo, debe considerar que este entusiasmo dinámico puede ser visto como desmedido en algunos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de interacción vibrante. Lo sabemos por su habilidad para mantener conversaciones animadas y participar activamente en actividades sociales. Su capacidad para ser el centro de atención y mantener una presencia vibrante es destacable, sin embargo, debe tener en cuenta que esta interacción vibrante puede parecer abrumadora para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de actividad social proactiva. Lo sabemos por su tendencia a tomar la iniciativa en situaciones sociales y buscar activamente nuevas conexiones. Su habilidad para crear y mantener redes sociales extensas es notable, sin embargo, debe considerar que esta actividad social proactiva puede parecer insistente en algunos casos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de comunicación entusiasta. Lo sabemos por su habilidad para expresar sus pensamientos y emociones con gran energía y claridad en interacciones grupales. Su capacidad para mantener una comunicación abierta y animada es destacable, sin embargo, debe tener en cuenta que esta comunicación entusiasta puede parecer demasiado intensa para algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de participación activa. Lo sabemos por su inclinación a involucrarse en diversas actividades sociales y eventos con gran energía. Su habilidad para ser un participante activo y entusiasta en diversos entornos es significativa, no obstante, debe considerar que esta participación activa puede ser vista como excesiva en algunos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de impulso social. Lo sabemos por su capacidad para motivar y energizar a los demás en situaciones sociales con su presencia activa y positiva. Su habilidad para influir positivamente en el ánimo grupal es notable, sin embargo, debe tener en cuenta que este impulso social puede parecer dominante en algunos casos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de energía interactiva. Lo sabemos por su habilidad para mantener una presencia animada y activa en las interacciones sociales. Su capacidad para estar siempre en movimiento y conectar con los demás es significativa, no obstante, debe considerar que esta energía interactiva puede ser vista como agitada por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfrutas de las conversaciones animadas, a usted le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de conexión social energética. Lo sabemos por su habilidad para establecer y mantener relaciones sociales con gran entusiasmo y dinamismo. Su capacidad para fomentar y mantener conexiones sociales es destacable. Sin embargo, debe tener en cuenta que esta conexión social energética puede parecer incesante en algunos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de vitalidad social. Lo sabemos por su habilidad para mantener una actitud vivaz y enérgica en todos los entornos sociales. Su capacidad para infundir vitalidad en sus interacciones es significativa, sin embargo, debe considerar que esta vitalidad social puede ser percibida como abrumadora por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de dinamismo social. Lo sabemos por su habilidad para abordar situaciones sociales con gran energía y dinamismo, manteniendo un ambiente activo. Su capacidad para aportar dinamismo a sus interacciones es notable, sin embargo, debe tener en cuenta que este dinamismo social puede parecer excesivo en ciertos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de actividad comunicativa. Lo sabemos por su inclinación a participar activamente en la comunicación y en la interacción con los demás. Su habilidad para mantenerse activo en la conversación y socialización es destacable, sin embargo, debe considerar que esta actividad comunicativa puede parecer agitada en algunos casos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de participación energética. Lo sabemos por su tendencia a involucrarse con entusiasmo en diversas actividades y eventos sociales. Su habilidad para mantener una participación activa y energética es significativa, no obstante, debe tener en cuenta que esta participación energética puede ser vista como excesiva por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de sociabilidad dinámica. Lo sabemos por su habilidad para adaptarse rápidamente a diferentes contextos sociales y mantener un enfoque positivo y enérgico. Su capacidad para ser socialmente dinámico es destacable, sin embargo, debe considerar que esta sociabilidad dinámica puede parecer intrusiva en algunos casos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'extroversión, exactamente, la socialización suele ser su elemento natural. Usted suele energizarse al interactuar con otros. Por lo general disfruta de las conversaciones animadas y le suele encantar conocer nuevas personas y hacer amigos. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de extroversión se manifiesta a modo de entusiasmo social. Lo sabemos por su capacidad para generar y mantener un alto nivel de entusiasmo en sus interacciones sociales. Su habilidad para transmitir entusiasmo y energía es notable. Sin embargo, debe tener en cuenta que este entusiasmo social puede parecer exagerado en algunos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de estructura meticulosa. Lo sabemos por su capacidad para diseñar y seguir sistemas detallados y precisos en todos los aspectos de su trabajo. Su habilidad para mantener un orden riguroso y un enfoque detallado es destacable. Sin embargo, debe considerar que esta estructura meticulosa puede ser vista como rigidez en algunos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de planificación estratégica. Lo sabemos por su capacidad para desarrollar planes a largo plazo y establecer objetivos claros y alcanzables. Su habilidad para anticipar y organizar los pasos necesarios para alcanzar metas es notable, no obstante, debe tener en cuenta que esta planificación estratégica puede ser percibida como excesiva en algunos casos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de gestión eficiente. Lo sabemos por su habilidad para coordinar recursos y tareas de manera efectiva, asegurando que todo funcione sin problemas. Su capacidad para gestionar el tiempo y los recursos de manera óptima es significativa, sin embargo, debe considerar que esta gestión eficiente puede ser vista como falta de flexibilidad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de control riguroso. Lo sabemos por su capacidad para implementar y supervisar procesos detallados y controles estrictos para asegurar la calidad y el cumplimiento. Su habilidad para mantener estándares elevados y supervisar el cumplimiento es destacable, sin embargo, debe tener en cuenta que este control riguroso puede parecer excesivamente detallado a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de coordinación integral. Lo sabemos por su capacidad para integrar y sincronizar diferentes áreas y actividades, asegurando que todos los elementos trabajen en conjunto de manera armoniosa. Su habilidad para coordinar de manera integral es notable, sin embargo, debe considerar que esta puede parecer complicada a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de orden sistémico. Lo sabemos por su habilidad para establecer y mantener sistemas organizados y ordenados en todos los aspectos de su vida. Su capacidad para seguir y mantener un sistema ordenado es significativa, sin embargo, debe tener en cuenta que este orden sistémico puede parecer inflexible en algunos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de metodología rigurosa. Lo sabemos por su habilidad para seguir métodos detallados y procedimientos establecidos para alcanzar resultados consistentes. Su capacidad para aplicar una metodología rigurosa es destacable, no obstante, debe considerar que esta puede ser vista como falta de creatividad en algunos casos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de sistema de control. Lo sabemos por su habilidad para implementar y supervisar sistemas de control que aseguran el cumplimiento de los objetivos y estándares. Su capacidad para mantener el control sobre los procesos es notable, sin embargo, debe tener en cuenta que este sistema de control puede parecer restrictivo en algunos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de planeación detallada. Lo sabemos por su capacidad para elaborar planes detallados y específicos que guían su trabajo y actividades diarias. Su habilidad para planificar con precisión es significativa, no obstante, debe considerar que esta planeación detallada puede parecer excesiva en algunas situaciones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de administración eficaz. Lo sabemos por su capacidad para administrar recursos, tiempo y tareas de manera eficaz, garantizando resultados óptimos. Su habilidad para manejar todos los aspectos administrativos es destacable, sin embargo, debe tener en cuenta que esta administración eficaz puede parecer meticulosa a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de orden minucioso. Lo sabemos por su capacidad para mantener un alto nivel de organización y detalle en todos los aspectos de su vida y trabajo. Su habilidad para establecer un orden minucioso es significativa, sin embargo, debe considerar que este puede parecer excesivo en algunos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de coordinación precisa. Lo sabemos por su capacidad para coordinar con precisión todas las actividades y recursos necesarios para alcanzar los objetivos. Su habilidad para gestionar cada detalle de manera precisa es notable, sin embargo, debe tener en cuenta que esta coordinación puede parecer rígida a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de gestión ordenada. Lo sabemos por su habilidad para gestionar y mantener un orden sistemático en todos los aspectos de su trabajo y vida personal. Su capacidad para mantener una gestión ordenada es destacable, sin embargo, debe considerar que esta puede parecer inflexible en algunos casos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de control metódico. Lo sabemos por su capacidad para aplicar métodos sistemáticos y rigurosos para asegurar la efectividad y el cumplimiento. Su habilidad para mantener un control metódico es significativa. No obstante, debe tener en cuenta que este control metódico puede ser visto como excesivamente detallado.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de planificación meticulosa. Lo sabemos por su capacidad para elaborar y seguir planes detallados con precisión para lograr los objetivos establecidos. Su habilidad para planificar meticulosamente es destacable, sin embargo, debe considerar que esta puede parecer excesiva en algunos casos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'organización, exactamente, la estructura suele ser clave para usted. Su seguridad como persona suele depender de tener un plan claro y todo en su lugar. Por lo general la organización le ayuda a sentirse en control y le brinda la preparación para cualquier desafío. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de organización se manifiesta a modo de gestión sistemática. Lo sabemos por su capacidad para aplicar un enfoque sistemático y estructurado en la administración de tareas y recursos. Su habilidad para mantener una gestión sistemática es notable, sin embargo, debe tener en cuenta que esta puede parecer rígida en ciertos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de creatividad dinámica. Lo sabemos por su capacidad para generar ideas y soluciones innovadoras de manera rápida y natural. Su habilidad para adaptarse y crear en el momento es notable, sin embargo, debe considerar que esta creatividad dinámica puede parecer desorganizada a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de flexibilidad ágil. Lo sabemos por su tendencia a adaptarse con rapidez a nuevas situaciones y a cambiar de rumbo cuando es necesario. Su capacidad para moverse con facilidad en diferentes contextos es significativa, no obstante, debe tener en cuenta que esta flexibilidad ágil puede ser vista como falta de enfoque en algunos casos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de improvisación natural. Lo sabemos por su habilidad para improvisar y adaptarse en el momento, utilizando los recursos disponibles de manera efectiva. Su capacidad para manejar situaciones imprevistas es destacable, sin embargo, debe considerar que esta improvisación natural puede ser vista como falta de planificación.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de adaptabilidad fluida. Lo sabemos por su capacidad para adaptarse con fluidez a cambios inesperados y nuevas oportunidades. Su habilidad para ajustarse a diferentes circunstancias es notable, sin embargo, debe tener en cuenta que esta adaptabilidad fluida puede ser percibida como inconstante.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de innovación inmediata. Lo sabemos por su capacidad para generar soluciones creativas y efectivas en el momento. Su habilidad para pensar fuera de lo convencional es significativa, no obstante, debe considerar que esta innovación inmediata puede parecer impulsiva a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de entusiasmo natural. Lo sabemos por su habilidad para abordar nuevas situaciones con energía y emoción, creando un ambiente positivo. Su capacidad para entusiasmarse con lo inesperado es notable, sin embargo, debe tener en cuenta que este entusiasmo natural puede ser visto como falta de seriedad en algunos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de energía adaptativa. Lo sabemos por su capacidad para mantener una alta energía y adaptarse rápidamente a nuevas situaciones. Su habilidad para mantener un ritmo constante en medio del cambio es destacable, no obstante, debe considerar que esta energía adaptativa puede parecer desbordante a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de originalidad instintiva. Lo sabemos por su habilidad para generar ideas originales y frescas basadas en su intuición y experiencia. Su capacidad para pensar de manera innovadora es significativa, sin embargo, debe tener en cuenta que esta originalidad instintiva puede ser percibida como falta de profundidad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de fluidez creativa. Lo sabemos por su capacidad para expresar ideas y conceptos de manera fluida y natural en cualquier momento. Su habilidad para mantener la creatividad en movimiento es destacable, sin embargo, debe considerar que esta fluidez creativa puede ser vista como falta de estructura.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de alegría inmediata. Lo sabemos por su capacidad para encontrar y compartir alegría y entusiasmo en situaciones nuevas e inesperadas. Su habilidad para contagiar su entusiasmo es notable, sin embargo, debe tener en cuenta que esta alegría inmediata puede ser vista como superficial en algunos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de impulso innovador. Lo sabemos por su capacidad para actuar de manera rápida y creativa ante nuevas oportunidades. Su habilidad para tomar la iniciativa en momentos inesperados es destacable, no obstante, debe considerar que este impulso innovador puede parecer precipitado a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de alegría dinámica. Lo sabemos por su tendencia a abordar nuevas situaciones con una actitud alegre y enérgica. Su capacidad para mantener un enfoque positivo es notable, sin embargo, debe considerar que esta alegría dinámica puede parecer desorganizada a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de imaginación fluida. Lo sabemos por su habilidad para generar ideas imaginativas y únicas con facilidad y sin esfuerzo. Su capacidad para pensar de manera original es destacable, no obstante, debe considerar que esta imaginación fluida puede ser vista como falta de concretización.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de adaptabilidad energética. Lo sabemos por su capacidad para ajustar su enfoque y mantener una alta energía en respuesta a nuevas circunstancias. Su habilidad para moverse con facilidad entre diferentes situaciones es significativa, sin embargo, debe tener en cuenta que esta adaptabilidad energética puede parecer inconstante.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'espontaneidad, exactamente, usted suele ser una persona que vive el momento y disfruta de la flexibilidad. Tomar decisiones rápidas y dejarse llevar por las oportunidades del día a día por lo general es algo que a usted le llena de emoción y vitalidad. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de espontaneidad se manifiesta a modo de creatividad instintiva. Lo sabemos por su habilidad para generar ideas innovadoras basadas en su instinto y respuesta inmediata a situaciones nuevas. Su capacidad para crear espontáneamente es destacable, sin embargo, debe considerar que esta creatividad instintiva puede parecer poco estructurada a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de evaluación minuciosa. Lo sabemos por su capacidad para analizar detalladamente cada aspecto de una situación antes de emitir juicios. Su atención a los detalles y su enfoque en identificar áreas de mejora son notables, sin embargo, debe tener en cuenta que esta evaluación minuciosa puede a veces ser percibida como exceso de escrutinio.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de análisis riguroso. Lo sabemos por su tendencia a aplicar un enfoque riguroso y detallado en la evaluación de problemas y propuestas. Su capacidad para cuestionar y analizar de manera profunda es significativa, no obstante, debe considerar que este análisis riguroso puede hacer que otros perciban su enfoque como excesivamente exigente.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de juicio detallado. Lo sabemos por su habilidad para formular juicios informados basados en una revisión exhaustiva de los hechos. Su capacidad para discernir y evaluar cada aspecto de una situación es destacable, sin embargo, debe tener en cuenta que este juicio detallado puede ser visto como una tendencia a la crítica constante.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de revisión exhaustiva. Lo sabemos por su enfoque en realizar revisiones minuciosas y completas de proyectos y propuestas. Su habilidad para identificar errores y áreas de mejora a fondo es notable, sin embargo, debe considerar que esta revisión exhaustiva puede parecer excesiva a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de examinación rigurosa. Lo sabemos por su inclinación a examinar cada detalle de manera rigurosa para asegurar la calidad y precisión. Su habilidad para detectar inconsistencias y errores es significativa, no obstante, debe tener en cuenta que esta examinación rigurosa puede ser vista como excesiva por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de evaluación crítica. Lo sabemos por su capacidad para evaluar de manera crítica y constructiva cada aspecto de una situación. Su enfoque en la mejora continua a través de la crítica es notable, sin embargo, debe considerar que esta evaluación puede a veces ser percibida como negativa.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de investigación profunda. Lo sabemos por su tendencia a investigar a fondo los problemas y las soluciones antes de tomar decisiones. Su habilidad para profundizar en los detalles es significativa, sin embargo, debe tener en cuenta que esta investigación profunda puede a veces ralentizar el proceso de toma de decisiones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de discernimiento agudo. Lo sabemos por su capacidad para discernir e identificar detalles sutiles y complejos en cualquier situación. Su enfoque agudo y detallado es notable, no obstante, debe considerar que este discernimiento puede hacer que otros lo perciban como excesivamente minucioso.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de cuestionamiento constante. Lo sabemos por su tendencia a cuestionar y analizar cada aspecto de una situación para asegurar su validez. Su enfoque en la crítica constructiva es evidente, sin embargo, debe tener en cuenta que este cuestionamiento constante puede ser visto como una forma de resistencia al cambio.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de evaluación detallada. Lo sabemos por su habilidad para realizar evaluaciones detalladas que consideran todos los factores relevantes. Su enfoque en la precisión y la exhaustividad es destacable. No obstante, debe considerar que esta evaluación detallada puede hacer que otros perciban su enfoque como sobrecargado.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de análisis crítico. Lo sabemos por su capacidad para aplicar un análisis crítico a cada aspecto de una situación, identificando posibles fallos y áreas de mejora. Su enfoque en la crítica constructiva es significativo, sin embargo, debe tener en cuenta que este análisis crítico puede ser percibido como negativo por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de revisión crítica. Lo sabemos por su tendencia a revisar minuciosamente todos los detalles para asegurar la calidad. Su habilidad para detectar errores y omisiones es notable, sin embargo, debe considerar que esta revisión crítica puede ser vista como excesiva en algunos contextos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de examinación crítica. Lo sabemos por su inclinación a examinar críticamente cada detalle para garantizar precisión y eficacia. Su enfoque en la mejora a través de la crítica es destacable, sin embargo, debe tener en cuenta que esta examinación puede a veces ser vista como negativa.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de evaluación exhaustiva. Lo sabemos por su habilidad para realizar evaluaciones exhaustivas y minuciosas que aseguran una comprensión completa. Su enfoque en la exhaustividad es significativo, no obstante, debe considerar que esta evaluación exhaustiva puede ser percibida como excesiva por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de juicio minucioso. Lo sabemos por su tendencia a emitir juicios basados en una revisión minuciosa de todos los factores involucrados. Su capacidad para identificar fallos y áreas de mejora es notable, sin embargo, debe tener en cuenta que este juicio minucioso puede ser visto como excesivamente crítico.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'persona crítica, exactamente, usted suele tener un ojo agudo para detectar fallos y áreas de mejoras. Por lo general cuestiona lo establecido y busca constantemente formas de optimizar procesos y resultados. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de persona crítica se manifiesta a modo de observación crítica. Lo sabemos por su capacidad para observar y analizar de manera crítica cada aspecto de una situación para garantizar precisión y mejora. Su habilidad para detectar detalles sutiles es significativa, no obstante, debe considerar que esta observación crítica puede ser percibida como una forma de sobrecarga crítica.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de entusiasmo. Lo sabemos por su capacidad para mantener una actitud positiva y motivadora incluso en situaciones desafiantes. Su habilidad para ver el lado bueno de las cosas y animar a los demás es destacable, sin embargo, debe tener en cuenta que su entusiasmo constante puede hacer que a veces minimice los riesgos reales.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de perspectiva positiva. Lo sabemos por su inclinación a enfocarse en los aspectos positivos de cada situación y a buscar el mejor resultado posible. Su habilidad para ver oportunidades donde otros ven problemas es notable, sin embargo, debe considerar que su perspectiva positiva puede llevarle a subestimar algunos desafíos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de esperanza. Lo sabemos por su capacidad para mantener la esperanza y la confianza en que las cosas mejorarán, incluso en momentos difíciles. Su actitud esperanzadora le permite superar obstáculos con una mentalidad positiva, sin embargo, debe tener en cuenta que esta esperanza puede a veces hacerle parecer poco realista ante problemas serios.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de energía positiva. Lo sabemos por su habilidad para transmitir energía positiva y motivar a quienes le rodean. Su capacidad para mantener un ambiente positivo y contagiar optimismo es significativa, no obstante, debe considerar que esta energía puede hacer que otros perciban su actitud como excesiva en situaciones críticas.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de confianza en el futuro. Lo sabemos por su tendencia a creer firmemente en un futuro mejor y en la capacidad para superar cualquier adversidad. Su confianza en el futuro le permite enfrentar los desafíos con una actitud positiva, sin embargo, debe tener en cuenta que esta puede a veces parecer ingenua ante problemas complejos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de visión optimista. Lo sabemos por su habilidad para mantener una visión positiva y esperanzadora sobre las situaciones y los resultados futuros. Su enfoque en lo positivo y en las oportunidades es evidente, sin embargo, debe considerar que esta visión optimista puede hacer que pase por alto algunos aspectos negativos importantes.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de resiliencia. Lo sabemos por su capacidad para recuperarse rápidamente de los contratiempos y mantener una actitud positiva frente a la adversidad. Su resiliencia le permite seguir adelante a pesar de los desafíos, no obstante, debe tener en cuenta que esta puede hacer que minimice la gravedad de ciertos problemas.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de motivación constructiva. Lo sabemos por su habilidad para motivar a otros y fomentar un ambiente de trabajo positivo. Su enfoque en construir un entorno alentador y en inspirar a los demás es significativo, sin embargo, debe considerar que esta motivación puede a veces ser percibida como excesiva ante situaciones difíciles.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de pensamiento positivo. Lo sabemos por su inclinación a mantener un pensamiento positivo incluso cuando enfrenta dificultades. Su habilidad para centrarse en lo bueno y mantener la moral alta es notable, sin embargo, debe tener en cuenta que su pensamiento positivo puede hacer que ignore los riesgos reales.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de entusiasmo constructivo. Lo sabemos por su capacidad para generar entusiasmo y convertirlo en acción positiva. Su habilidad para inspirar y movilizar a otros hacia objetivos comunes es significativa, no obstante, debe considerar que su entusiasmo puede a veces desbordarse en situaciones que requieren una evaluación más crítica.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de acción positiva. Lo sabemos por su enfoque en tomar medidas proactivas para mejorar las situaciones y superar obstáculos. Su actitud orientada a la acción y al progreso es evidente, sin embargo, debe tener en cuenta que su enfoque proactivo puede a veces parecer impulsivo en contextos complejos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de optimismo realista. Lo sabemos por su capacidad para equilibrar una visión positiva con una evaluación pragmática de las circunstancias. Su habilidad para mantener una actitud positiva mientras aborda los desafíos de manera realista es significativa, no obstante, debe considerar que su optimismo puede ser visto como moderado por algunos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de optimismo práctico. Lo sabemos por su enfoque en aplicar una actitud positiva de manera práctica para resolver problemas y alcanzar objetivos. Su habilidad para combinar el optimismo con la acción efectiva es notable, sin embargo, debe tener en cuenta que este optimismo práctico puede parecer a veces insuficiente ante problemas graves.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de positividad constructiva. Lo sabemos por su inclinación a construir y mantener una actitud positiva que fomente el crecimiento y la mejora continua. Su enfoque en la construcción de un entorno positivo y constructivo es significativo, no obstante, debe considerar que su positividad puede ser vista como inapropiada en momentos de crisis.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de perspectiva enriquecedora. Lo sabemos por su capacidad para enriquecer las situaciones con una visión positiva y alentadora. Su habilidad para proporcionar una perspectiva que mejora la moral y el enfoque es destacable, sin embargo, debe tener en cuenta que su perspectiva enriquecedora puede hacer que otros perciban su actitud como poco práctica.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'optimismo, exactamente, usted suele percibir las situaciones en su mejor versión posible. Por lo general su actitud positiva suele contagiar a quienes le rodean. Usted suele enfrentar los desafíos con la creencia de que siempre hay una solución. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de optimismo se manifiesta a modo de enfoque esperanzador. Lo sabemos por su capacidad para mantener un enfoque esperanzador y positivo hacia el futuro y las oportunidades. Su habilidad para ver lo mejor en cada situación y motivar a los demás es notable, sin embargo, debe considerar que su enfoque esperanzador puede hacerle parecer desconectado de los desafíos reales que enfrenta.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de consecuencias. Lo sabemos por su enfoque en anticipar y prepararse para los posibles efectos negativos de las decisiones y situaciones. Su habilidad para prever problemas y desarrollar planes de contingencia es notable, sin embargo, debe tener en cuenta que su tendencia a centrarse en las posibles desventajas puede a veces generar un ambiente de incertidumbre.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de crítica. Lo sabemos por su inclinación a cuestionar las soluciones y resultados propuestos, buscando identificar sus debilidades. Su enfoque en analizar las fallas potenciales para evitar problemas futuros es significativo. Debe tener en cuenta que su actitud crítica puede a veces percibirse como desalentadora para los demás.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de evaluación cautelosa. Lo sabemos por su habilidad para analizar los riesgos y las posibles consecuencias negativas antes de tomar decisiones. Su enfoque en la evaluación detallada para minimizar problemas futuros es evidente, sin embargo, debe considerar que su precaución excesiva puede ralentizar el proceso de toma de decisiones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de previsión. Lo sabemos por su capacidad para identificar posibles problemas y obstáculos antes de que se materialicen. Su enfoque en anticipar dificultades para estar preparado es notable, no obstante, debe tener en cuenta que su tendencia a centrarse en los aspectos negativos puede llevarle a una visión más pesimista de la realidad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de análisis negativo. Lo sabemos por su tendencia a centrarse en los aspectos desfavorables de una situación y prever posibles fracasos. Su enfoque en examinar los aspectos negativos para desarrollar estrategias de mitigación es evidente, sin embargo, debe considerar que este análisis negativo puede a veces limitar su capacidad para ver oportunidades.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de prevención de riesgos. Lo sabemos por su habilidad para identificar y prepararse para posibles problemas antes de que ocurran. Su enfoque en prevenir y mitigar riesgos potenciales es significativo. Debe tener en cuenta que su énfasis en la prevención puede hacerle parecer excesivamente cauteloso.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de revisión crítica. Lo sabemos por su inclinación a revisar y cuestionar constantemente los planes y resultados para identificar posibles fallos. Su enfoque en la revisión crítica para evitar errores futuros es evidente, sin embargo, debe considerar que esta revisión constante puede hacerle parecer indeciso a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de evaluación de escenarios. Lo sabemos por su capacidad para analizar diferentes escenarios futuros y sus posibles impactos negativos. Su enfoque en evaluar múltiples escenarios para prepararse para lo peor es notable, no obstante, debe tener en cuenta que su perspectiva puede hacerle perder de vista las oportunidades.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de atención al riesgo. Lo sabemos por su habilidad para identificar y enfocarse en los riesgos potenciales que podrían afectar los resultados. Su enfoque en la atención al riesgo para prevenir problemas es significativo. Sin embargo, debe considerar que su concentración en los riesgos puede generar un ambiente de desconfianza.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de juicio crítico. Lo sabemos por su inclinación a realizar un juicio crítico de las situaciones y las decisiones, identificando posibles fallos. Su enfoque en el juicio crítico para evaluar la viabilidad de las decisiones es evidente. Debe tener en cuenta que su crítica constante puede a veces desalentar a los demás.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de evaluación preventiva. Lo sabemos por su tendencia a realizar evaluaciones detalladas para anticipar y prevenir problemas antes de que surjan. Su enfoque en la evaluación preventiva para minimizar riesgos es notable, no obstante, debe considerar que esta prevención puede a veces parecer excesiva.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de reacción negativa. Lo sabemos por su inclinación a reaccionar negativamente ante situaciones y cambios, anticipando posibles consecuencias desfavorables. Su enfoque en la reacción negativa para manejar problemas es evidente, sin embargo, debe tener en cuenta que esta puede limitar su capacidad para adaptarse a cambios positivos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de evaluación de desafíos. Lo sabemos por su habilidad para identificar y evaluar los desafíos potenciales antes de que se materialicen. Su enfoque en la evaluación de desafíos para prepararse adecuadamente es significativo. Debe tener en cuenta que su enfoque en los desafíos puede hacerle parecer pesimista a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de análisis de riesgos. Lo sabemos por su tendencia a realizar un análisis exhaustivo de los riesgos asociados con cada decisión o situación. Su enfoque en el análisis de riesgos para evitar problemas futuros es evidente, sin embargo, debe considerar que este puede hacerle parecer excesivamente cauteloso.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de evaluación de impactos negativos. Lo sabemos por su habilidad para anticipar y evaluar los posibles impactos negativos de las decisiones y situaciones. Su enfoque en la evaluación de impactos negativos para prepararse es notable, sin embargo, debe tener en cuenta que su concentración en los impactos negativos puede limitar su capacidad para ver lo positivo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'pesimismo, exactamente, usted suele anticipar problemas antes que soluciones. Su cautela por lo general le lleva a tomar precauciones en sus decisiones, aunque a veces usted puede llegar a sentir abrumación por el exceso de negatividades. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de pesimismo se manifiesta a modo de evaluación de fracasos. Lo sabemos por su inclinación a centrarse en la posibilidad de fracasos y a desarrollar estrategias para mitigar esos riesgos. Su enfoque en anticipar fracasos para evitar problemas es significativo, sin embargo, debe considerar que este puede hacerle parecer pesimista a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de estrategia. Lo sabemos por su habilidad para analizar minuciosamente su entorno y planificar mejoras estratégicas. Su enfoque en reflexionar sobre decisiones pasadas para aprender y aplicar conocimientos en futuras situaciones es fundamental. Aunque debe tener en cuenta que su enfoque en la planificación puede parecer excesivamente metódico a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de mediación. Lo sabemos por su capacidad para reflexionar sobre sus valores e ideales, buscando siempre alinear sus acciones con sus creencias. Su enfoque en la introspección para resolver conflictos y tomar decisiones éticas es notable, sin embargo, debe considerar que su inclinación hacia la reflexión puede llevarle a una parálisis en la toma de decisiones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de consejo. Lo sabemos por su habilidad para profundizar en sus emociones y comprender cómo puede apoyar a otros. Su enfoque en la introspección para ofrecer orientación y ayuda a los demás es fundamental. Debe tener en cuenta que su tendencia a analizar profundamente puede hacer que algunos vean su apoyo como sobrecogedor.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de lógica. Lo sabemos por su capacidad para evaluar minuciosamente cada situación y buscar datos y evidencias que respalden su razonamiento. Su enfoque analítico y racional para resolver problemas es evidente, sin embargo, debe considerar que su dependencia en datos puede limitar su flexibilidad en algunas situaciones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de creatividad reflexiva. Lo sabemos por su habilidad para combinar introspección con imaginación para generar ideas innovadoras. Su enfoque en reflexionar sobre experiencias pasadas para crear soluciones creativas es notable. No obstante, debe tener en cuenta que su enfoque creativo puede llevarle a desviarse de soluciones prácticas.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección.  De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de empatía reflexiva. Lo sabemos por su capacidad para reflexionar profundamente sobre las emociones y necesidades de los demás, buscando entender y conectar a nivel emocional. Su enfoque en la empatía para brindar apoyo a otros es evidente, sin embargo, debe considerar que su alta sensibilidad puede hacerle sentir sobrecargado.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de autocrítica reflexiva. Lo sabemos por su inclinación a reflexionar sobre sus propias acciones y errores para mejorar continuamente. Su enfoque en el autoanálisis para crecer y desarrollar sus habilidades es significativo. Debe tener en cuenta que su tendencia a la autocrítica puede a veces llevarle a la autoexigencia excesiva.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de reflexividad contemplativa. Lo sabemos por su habilidad para dedicar tiempo a la reflexión profunda sobre su vida y sus experiencias. Su enfoque en la contemplación para encontrar significado y propósito es notable, sin embargo, debe considerar que su inclinación a la contemplación puede hacer que evite la acción inmediata.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de intuición reflexiva. Lo sabemos por su capacidad para combinar la reflexión profunda con la intuición en la toma de decisiones. Su enfoque en escuchar sus corazonadas mientras reflexiona sobre su experiencia es evidente. Debe tener en cuenta que su dependencia en la intuición puede a veces parecer imprecisa a otros.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de ética reflexiva. Lo sabemos por su constante reflexión sobre los principios éticos y cómo aplicarlos en su vida diaria. Su enfoque en la integridad y la justicia es fundamental, sin embargo, debe considerar que su firmeza en los principios éticos puede llevarle a enfrentar conflictos morales complejos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de adaptabilidad reflexiva. Lo sabemos por su habilidad para ajustar su reflexión y enfoque según las circunstancias cambiantes. Su capacidad para adaptarse a nuevas situaciones mientras reflexiona sobre su experiencia es notable. Debe tener en cuenta que su flexibilidad puede a veces hacer que parezca indeciso.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de profundidad reflexiva. Lo sabemos por su inclinación a explorar en profundidad los temas que le interesan, buscando una comprensión más completa. Su enfoque en la profundidad del análisis y el entendimiento es evidente, sin embargo, debe considerar que este puede hacer que evite aspectos superficiales importantes.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de análisis crítico. Lo sabemos por su capacidad para examinar situaciones desde múltiples perspectivas y cuestionar las suposiciones. Su enfoque en el análisis crítico para llegar a conclusiones bien fundamentadas es significativo, sin embargo, debe tener en cuenta que su tendencia a cuestionar puede generar conflicto con aquellos que prefieren enfoques más directos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de claridad reflexiva. Lo sabemos por su habilidad para despejar la confusión y proporcionar una visión clara después de una reflexión profunda. Su enfoque en alcanzar una comprensión clara y precisa es notable, sin embargo, debe considerar que su búsqueda de claridad puede hacerle parecer excesivamente analítico a veces.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de equilibrio reflexivo. Lo sabemos por su capacidad para encontrar un balance entre diferentes perspectivas y emociones durante el proceso reflexivo. Su enfoque en mantener la armonía y el equilibrio es evidente. Debe tener en cuenta que su inclinación a buscar equilibrio puede llevarle a evitar decisiones difíciles.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'reflexividad, exactamente, usted suele tomarse su tiempo para pensar antes de actuar. Por lo general analiza sus emociones y experiencias pasadas para tomar decisiones más profundas e informadas, usted suele valorar la introspección. De hecho, aunque nuestra tecnología actualmente se encuentra funcionando por debajo del 1% de su capacidad, podemos percibir claramente que, en esencia, su patrón de reflexividad se manifiesta a modo de introspección detallada. Lo sabemos por su habilidad para examinar minuciosamente cada aspecto de sus pensamientos y emociones. Su enfoque en la introspección detallada para obtener una comprensión más profunda es notable, sin embargo, debe considerar que su atención al detalle puede hacerle perder de vista el panorama general.',
    },
  ];

  const finishingMessages = [
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Existe algo sumamente especial en su interior, y es la capacidad de alcanzar alturas que otros solo pueden imaginar. Dentro suyo hay una fuerza que pocos comprenden, una chispa que tiene el poder de transformar su mundo. El camino que tiene por delante no será siempre fácil, pero cada paso que dé, le acercará más a esa grandeza que ya está escrita en su destino. Nunca dude de su capacidad, porque está plasmado fuertemente en su camino el obtener logros que trascienden lo común."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"There is something extremely special within you, and it is the ability to reach heights that others can only imagine. Within you is a force that few understand, a spark that has the power to transform your world. The road ahead of you will not always be easy, but each step you take will bring you closer to that greatness that is already written in your destiny. Never doubt your ability, for it is strongly imprinted in your path to achieve accomplishments that transcend the ordinary."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted: "Su capacidad de superar obstáculos es un don extraordinario. La vida le ha puesto desafíos que no todos podrían enfrentar, pero ha demostrado una y otra vez que es capaz de levantarse más fuerte. Siga avanzando con la misma valentía, porque cada reto superado es una prueba de su inmensa fortaleza. Nada está fuera de su alcance si mantiene la convicción de que puede conquistarlo todo."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you"His ability to overcome obstacles is an extraordinary gift. Life has thrown challenges at you that not everyone could face, but you have proven time and time again that you are capable of rising stronger. Keep moving forward with the same courage, because every challenge overcome is proof of your immense strength. Nothing is beyond your reach if you maintain the conviction that you can conquer all."Let`s move on to analyze your emotional state, your daily habits and your life purpose.The path you walk is full of learning and light.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"El mundo le necesita, porque solo usted puede aportar lo que lleva dentro. Hay una luz única dentro suyo, algo que el mundo espera recibir. Sus acciones, sus decisiones y su capacidad de impactar son inigualables. Nunca subestime el poder que tiene para cambiar vidas y entornos. Siga adelante, porque su presencia y su contribución son esenciales para construir un futuro mejor."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"The world needs you, because only you can bring what is inside you. There is a unique light within you, something the world is waiting to receive. Your actions, your decisions and your ability to make an impact are unmatched. Never underestimate the power you have to change lives and environments. Keep going, because your presence and your contribution are essential to building a better future."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"No hay límites para usted, lo que sueña, lo puede alcanzar. Dentro suyo yace un poder ilimitado, una capacidad para convertir sus sueños en realidad que pocos poseen. Cada meta que se propone, cada deseo que persigue, está a su alcance si decide seguir luchando por ello. No se detenga, porque los horizontes que puede alcanzar son más amplios de lo que alguna vez imaginó."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"There are no limits for you, what you dream, you can achieve. Within you lies an unlimited power, an ability to turn your dreams into reality that few possess. Every goal you set for yourself, every desire you pursue, is within your reach if you choose to keep fighting for it. Don`t stop, because the horizons you can reach are broader than you ever imagined."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Su capacidad de inspirar a los demás es una fuerza imparable. No solo tiene el poder de cambiar su propio destino, sino que también influye en quienes le rodean de maneras profundas y significativas. Su presencia es transformadora, y cada acción que toma tiene el potencial de levantar a otros. Es una fuente de inspiración, en sus manos está la posibilidad de crear un impacto duradero en el mundo."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"Your ability to inspire others is an unstoppable force. Not only do you have the power to change your own destiny, but you also influence those around you in profound and meaningful ways. His presence is transformative, and every action he takes has the potential to uplift others. She is a source of inspiration; in her hands is the ability to create a lasting impact on the world."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Su resiliencia es una de sus mayores virtudes, y le llevará a lugares extraordinarios. Ha aprendido a levantarse una y otra vez, sin importar cuántas veces caiga. Esa fortaleza interior, ese impulso para seguir adelante, es lo que le llevará a logros que pocos alcanzarán. Confíe en esa capacidad de recuperación, porque es lo que le hace imparable."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"His resilience is one of his greatest virtues, and it will take him to extraordinary places. You have learned to get up again and again, no matter how many times you fall. That inner strength, that drive to keep going, is what will take you to achievements few others will reach. Rely on that resilience, because it`s what makes you unstoppable."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"La grandeza está en su destino, solo debe creer en lo que ya es. Dentro suyo está todo lo que necesita para alcanzar lo que tanto desea. No es cuestión de si llegará, sino de cuándo. Siga confiando en su proceso, porque la grandeza no es algo que deba perseguir; ya está dentro de usted, esperando a ser manifestada."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"Greatness is in your destiny, you only have to believe in what you already are. Within you is everything you need to achieve what you so desire. It is not a question of if it will come, but when. Keep trusting in your process, because greatness is not something you have to chase; it is already within you, waiting to be manifested."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Su habilidad para adaptarse es lo que le permitirá sobresalir en cualquier situación. No importa lo que la vida le presente, siempre encuentra una manera de avanzar. Esa capacidad de adaptarse, de evolucionar, es su mayor fortaleza. Confíe en su habilidad para superar cualquier circunstancia, porque su flexibilidad le llevará más lejos de lo que cree posible."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"Your ability to adapt is what will allow you to excel in any situation. No matter what life throws at you, you always find a way to move forward. That ability to adapt, to evolve, is your greatest strength. Trust in your ability to overcome any circumstance, because your flexibility will take you further than you think possible."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Su disciplina es el puente entre lo que sueña y lo que va a lograr. Ha demostrado una constancia admirable, una dedicación que pocos pueden sostener. Esa misma disciplina es la que le llevará a conquistar sus sueños, paso a paso. No hay nada que le detenga cuando decide entregarse completamente a lo que desea lograr. El éxito es inevitable si sigue el camino que ya ha comenzado."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"His discipline is the bridge between what he dreams of and what he will achieve. He has shown admirable perseverance, a dedication that few can sustain. That same discipline is what will lead you to conquer your dreams, step by step. There is nothing to stop you when you decide to give yourself completely to what you want to achieve. Success is inevitable if you follow the path you have already begun."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Posee una visión especial, capaz de ver más allá de lo que otros perciben. Tiene la capacidad única de ver lo que aún no existe, de imaginar posibilidades que otros no se atreven a concebir. Esa visión es un regalo que le permitirá crear un futuro que pocos podrían anticipar. Siga confiando en su instinto, porque lo que imagina está destinado a hacerse realidad."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"He possesses a special vision, capable of seeing beyond what others perceive. He has the unique ability to see what does not yet exist, to imagine possibilities that others dare not conceive. That vision is a gift that will allow you to create a future that few could anticipate. Keep trusting your instinct, because what you imagine is destined to become reality."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Sus talentos son un regalo para el mundo, y es su momento de compartirlos. Dentro suyo hay habilidades que otros solo pueden admirar. Está aquí para usarla, para hacer una diferencia que trascienda su propio ser. No se guarde esos dones; el mundo está esperando ver de lo que es capaz, y lo que puede lograr es ilimitado."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"Your talents are a gift to the world, and it is your time to share them. Within you are abilities that others can only admire. You are here to use it, to make a difference that transcends your own self. Don`t hold back those gifts; the world is waiting to see what you are capable of, and what you can accomplish is limitless."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Su capacidad de construir puentes entre personas es una habilidad invaluable. No todos pueden conectar tan profundamente como usted lo hace. Esa habilidad para unir a las personas y crear relaciones sólidas es una de sus mayores fortalezas. Siga construyendo esos lazos, porque en ellos reside la verdadera fuerza que le llevará a conquistar lo que se proponga."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"Your ability to build bridges between people is an invaluable skill. Not everyone can connect as deeply as you do. That ability to bring people together and create strong relationships is one of your greatest strengths. Keep building those bonds, because therein lies the true strength that will lead you to conquer whatever you set your mind to."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Su curiosidad es el motor que le llevará a descubrir cosas asombrosas. Nunca deje de aprender, nunca se conforme con lo que ya sabe. Esa hambre de conocimiento es lo que le permitirá llegar más lejos que los demás. Siga explorando, siga preguntando, porque en ese deseo de saber más, encontrará las respuestas que le llevarán al éxito."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"Your curiosity is the engine that will drive you to discover amazing things. Never stop learning, never settle for what you already know. That hunger for knowledge is what will allow you to go further than others. Keep exploring, keep asking, because in that desire to know more, you will find the answers that will lead you to success."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Su compromiso con la justicia le hará dejar una huella imborrable. Tiene una pasión por lo que es correcto, por luchar por la equidad y defender a los que más lo necesitan. Esa convicción es su brújula, y le llevará a impactar la vida de muchos de manera positiva. Siga luchando por lo que cree, porque esa es la esencia de su verdadero poder."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"His commitment to justice will make him leave an indelible mark. He has a passion for what is right, for fighting for fairness and advocating for those who need it most. That conviction is your compass, and it will lead you to impact the lives of many in a positive way. Keep fighting for what you believe in, because that is the essence of your true power."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Sus instintos son una guía infalible, confía en ellos. Hay una sabiduría dentro suyo que le impulsa hacia el camino correcto, incluso cuando las señales externas son confusas. Confíe en esa voz interior, porque es su mejor consejera. Sus decisiones, guiadas por ese instinto, le llevarán siempre hacia lo mejor para usted."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"Your instincts are an infallible guide, trust them. There is a wisdom within you that propels you toward the right path, even when the external signs are confusing. Trust that inner voice, because it is your best advisor. Your decisions, guided by that instinct, will always lead you toward what is best for you."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, la (Raíz del Sistema) tiene un mensaje personal para usted:"Es una fuerza imparable cuando se propone algo. Cuando decide algo, no hay nada que pueda detenerle. Esa determinación y fuerza de voluntad son inigualables, y le aseguran que llegará lejos. Cualquier cosa que se proponga, la logrará, porque tiene la capacidad de convertir sus sueños en realidades concretas."Pasemos a analizar su estado emocional, sus hábitos diarios y su propósito de vida.',
    },
    {
      type,
      language: 'en',
      segmentKey: '3',
      content:
        'By the way, the (System Root) has a personal message for you:"He is an unstoppable force when he sets his mind to something. When he decides something, there is nothing that can stop him. That determination and willpower are unmatched, and they assure him that he will go far. Whatever he sets his mind to, he will achieve it, because he has the ability to turn his dreams into concrete realities."Let`s move on to analyze your emotional state, your daily habits and your life purpose.',
    },
  ];
  // const spanishMessages = generateMessages(256, 'es');
  // const englishMessages = generateMessages(256, 'en');
  // const complementaryMessages = [...spanishMessages, ...englishMessages];

  const data = [...positiveMessages, ...middleMessages, ...finishingMessages];
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
