// src/scripts/poblar-sistema-dialogo.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌌 Poblando sistema de diálogo abierto...');

    // Crear sistema principal
    const sistema = await prisma.sistemaLanzamiento.upsert({
      where: { codigo: 'sistema_principal' },
      update: {},
      create: {
        codigo: 'sistema_principal',
        nombre: 'Sistema Principal de Diálogo Abierto',
        descripcion:
          'Sistema principal para interpretación de secuencias de lanzamientos en modo diálogo abierto',
      },
    });

    console.log('✅ Sistema principal creado:', sistema.codigo);

    // Datos de ejemplo para lanzamientos del sistema principal
    const lanzamientosData = [
      {
        secuencia: '111',
        resultado_numero: 1,
        resultado_texto: 'El universo se alinea perfectamente a tu favor. Las energías cósmicas fluyen en armonía con tus intenciones, indicando un período de manifestación acelerada y sincronicidades significativas.',
        interpretacion: 'Este patrón sugiere alineación divina y apoyo celestial en todos tus proyectos.'
      },
      {
        secuencia: '112',
        resultado_numero: 2,
        resultado_texto: 'Un portal de oportunidades se abre ante ti. Mantén tu corazón abierto a las señales del universo, pues guiarán tu camino hacia el crecimiento espiritual y la realización personal.',
        interpretacion: 'Indica momentos de transición y transformación con guía celestial.'
      },
      {
        secuencia: '113',
        resultado_numero: 3,
        resultado_texto: 'La sabiduría ancestral fluye a través de ti. Conecta con tus raíces espirituales y permite que la voz interior te guíe hacia decisiones acertadas y caminos iluminados.',
        interpretacion: 'Sugiere conexión con conocimiento ancestral y guía interna.'
      },
      {
        secuencia: '114',
        resultado_numero: 4,
        resultado_texto: 'Fuerzas de protección te envuelven. Aunque puedan presentarse desafíos, cuenta con el apoyo celestial para navegar cualquier situación con gracia y sabiduría.',
        interpretacion: 'Indica protección divina y resiliencia ante desafíos.'
      },
      {
        secuencia: '121',
        resultado_numero: 5,
        resultado_texto: 'El equilibrio entre opuestos se manifiesta. Encuentra el punto medio entre acción y contemplación, avanzando con determinación pero manteniendo la sabiduría de la paciencia.',
        interpretacion: 'Sugiere necesidad de balance y armonía en tus acciones.'
      },
      {
        secuencia: '122',
        resultado_numero: 6,
        resultado_texto: 'Sincronicidades revelan tu camino. Presta atención a las coincidencias significativas, pues son mensajes del universo guiándote hacia tu propósito superior.',
        interpretacion: 'Indica que el universo se comunica a través de eventos sincronizados.'
      },
      {
        secuencia: '123',
        resultado_numero: 7,
        resultado_texto: 'Transformación personal en proceso. Abraza los cambios que se presentan, pues te llevarán a una versión más elevada de tu ser y a una comprensión más profunda de tu misión.',
        interpretacion: 'Sugiere período de crecimiento y evolución personal.'
      },
      {
        secuencia: '124',
        resultado_numero: 8,
        resultado_texto: 'La abundancia fluye en múltiples formas. Reconoce las bendiciones que llegan no solo materialmente, sino también en amor, salud y crecimiento espiritual.',
        interpretacion: 'Indica prosperidad multidimensional y gratitud.'
      },
      {
        secuencia: '131',
        resultado_numero: 9,
        resultado_texto: 'Conexión con guías espirituales fortalecida. Tu intuición se agudiza y recibirás mensajes claros a través de sueños, meditación y señales cotidianas.',
        interpretacion: 'Sugiere comunicación enhanced con planos espirituales.'
      },
      {
        secuencia: '132',
        resultado_numero: 10,
        resultado_texto: 'Ciclos que se completan y nuevos que comienzan. Cierra capítulos con gratitud y abre tu corazón a nuevas experiencias que enriquecerán tu journey espiritual.',
        interpretacion: 'Indica finalización de etapas y comienzos prometedores.'
      },
      {
        secuencia: '133',
        resultado_numero: 11,
        resultado_texto: 'Manifestación de deseos alineados. Tus intenciones puras encuentran eco en el universo, atrayendo hacia ti exactamente lo que necesitas para tu evolución.',
        interpretacion: 'Sugiere poder de manifestación y alineación cósmica.'
      },
      {
        secuencia: '134',
        resultado_numero: 12,
        resultado_texto: 'Sanación emocional y liberación. Suelta cargas del pasado y permite que la luz divina limpie heridas antiguas, making espacio para nuevo amor y alegría.',
        interpretacion: 'Indica proceso de sanación y liberación emocional.'
      },
      {
        secuencia: '141',
        resultado_numero: 13,
        resultado_texto: 'Fuerza interior revelada. Descubres reservas de valor y resilience que no conocías, empowering te para superar cualquier obstáculo con confianza renovada.',
        interpretacion: 'Sugiere descubrimiento de fuerza interna y coraje.'
      },
      {
        secuencia: '142',
        resultado_numero: 14,
        resultado_texto: 'Armonía en relaciones. Las conexiones se profundizan y nuevos vínculos significativos aparecen, enriching tu vida con amor y comprensión mutua.',
        interpretacion: 'Indica mejora en relaciones y conexiones significativas.'
      },
      {
        secuencia: '143',
        resultado_numero: 15,
        resultado_texto: 'Claridad mental y perspectiva ampliada. La niebla se disipa revelando soluciones creativas y entendimiento profundo de situaciones que antes parecían complejas.',
        interpretacion: 'Sugiere ganancia de claridad y perspectiva elevada.'
      },
      {
        secuencia: '144',
        resultado_numero: 16,
        resultado_texto: 'Protección angelical intensificada. Sientes la presencia de seres de luz acompañándote, providing guía y comfort en cada paso de tu camino.',
        interpretacion: 'Indica fuerte presencia y protección de guías espirituales.'
      },
      {
        secuencia: '211',
        resultado_numero: 17,
        resultado_texto: 'Renacimiento espiritual en proceso. Como el fénix, te elevas desde experiencias pasadas con wisdom renovada y propósito clarificado.',
        interpretacion: 'Sugiere transformación profunda y renacimiento espiritual.'
      },
      {
        secuencia: '212',
        resultado_numero: 18,
        resultado_texto: 'Flujo de creatividad aumentado. Ideas innovadoras y inspiration artística fluyen libremente, inviting te a expresar tu unique esencia al mundo.',
        interpretacion: 'Indica período de creatividad elevada y expresión artística.'
      },
      {
        secuencia: '213',
        resultado_numero: 19,
        resultado_texto: 'Sabiduría práctica aplicada. Combinas conocimiento espiritual con action concreta, creating resultados tangibles que benefician tu vida y la de others.',
        interpretacion: 'Sugiere integración de sabiduría espiritual en vida práctica.'
      },
      {
        secuencia: '214',
        resultado_numero: 20,
        resultado_texto: 'Comunidad y colaboración divina. Encuentras almas afines y colaboradores perfectos para proyectos shared, multiplying el impacto positivo de tus efforts.',
        interpretacion: 'Indica encuentros divinos y colaboraciones significativas.'
      },
      {
        secuencia: '221',
        resultado_numero: 21,
        resultado_texto: 'Expansión de conciencia acelerada. Barreras perceptuales se disuelven, revealing dimensiones más profundas de realidad y understanding cósmico.',
        interpretacion: 'Sugiere aceleración en expansión de conciencia y percepción.'
      },
      {
        secuencia: '222',
        resultado_numero: 22,
        resultado_texto: 'Maestría personal alcanzada. Integras lecciones aprendidas y te conviertes en faro de luz para others, guiding desde la experiencia y compassion.',
        interpretacion: 'Indica logro de maestría personal y liderazgo espiritual.'
      },
      {
        secuencia: '223',
        resultado_numero: 23,
        resultado_texto: 'Libertad emocional lograda. Rompes cadenas de patrones limitantes y eliges vivir desde autenticidad y alegría despreocupada.',
        interpretacion: 'Sugiere liberación de limitaciones y embrace de libertad interior.'
      },
      {
        secuencia: '224',
        resultado_numero: 24,
        resultado_texto: 'Abundancia sostenible manifestada. Creas foundations sólidas para prosperidad continua que beneficia no solo tu vida sino también tu comunidad.',
        interpretacion: 'Indica establecimiento de abundancia duradera y impacto positivo.'
      },
      {
        secuencia: '231',
        resultado_numero: 25,
        resultado_texto: 'Conexión con naturaleza profundizada. Encuentras sabiduría y healing en elementos naturales, restoring balance interno y external harmony.',
        interpretacion: 'Sugiere reconexión con naturaleza y sus enseñanzas sagradas.'
      },
      {
        secuencia: '232',
        resultado_numero: 26,
        resultado_texto: 'Misiones soul completadas. Sientes satisfacción por logros espirituales mientras nuevas oportunidades de service se revelan en el horizonte.',
        interpretacion: 'Indica cumplimiento de propósito y preparación para nuevos ciclos.'
      },
      {
        secuencia: '233',
        resultado_numero: 27,
        resultado_texto: 'Amor incondicional experimentado. Das y recibes amor sin condiciones, transforming relaciones y healing heridas del corazón through compassion.',
        interpretacion: 'Sugiere experiencia de amor incondicional y sanación relacional.'
      },
      {
        secuencia: '234',
        resultado_numero: 28,
        resultado_texto: 'Legado espiritual establecido. Tus actions y teachings dejan huella perdurable, inspiring generaciones presentes y futuras en su camino espiritual.',
        interpretacion: 'Indica creación de legado espiritual con impacto trascendente.'
      },
      {
        secuencia: '241',
        resultado_numero: 29,
        resultado_texto: 'Integración de sombra completada. Abrazas todas las partes de tu ser con amor, finding poder en vulnerabilidad y autenticidad radical.',
        interpretacion: 'Sugiere trabajo de sombra completado y autoaceptación total.'
      },
      {
        secuencia: '242',
        resultado_numero: 30,
        resultado_texto: 'Visión futura clarificada. Recibes glimpses de tu destino más alto, empowering te para alinear actions presentes con futuro desired.',
        interpretacion: 'Indica claridad sobre dirección futura y propósito evolutivo.'
      },
      {
        secuencia: '243',
        resultado_numero: 31,
        resultado_texto: 'Curación ancestral lograda. Rompes patrones generacionales y liberas linaje familiar, bringing healing a pasado, presente y futuro simultáneamente.',
        interpretacion: 'Sugiere sanación de heridas ancestrales y liberación kármica.'
      },
      {
        secuencia: '244',
        resultado_numero: 32,
        resultado_texto: 'Unión de opuestos realizada. Integras polaridades dentro de ti, finding unidad en diversidad y creando armonía desde aparente contradicción.',
        interpretacion: 'Indica trascendencia de dualidad y experiencia de unidad cósmica.'
      },
      {
        secuencia: '311',
        resultado_numero: 33,
        resultado_texto: 'Conciencia crística activada. Experimentas unidad con toda la creación y expresas cualidades cristicas como compassion ilimitada y wisdom divina.',
        interpretacion: 'Sugiere activación de conciencia crística y expresión de amor divino.'
      },
      {
        secuencia: '312',
        resultado_numero: 34,
        resultado_texto: 'Portales dimensionales accesibles. Navegas entre realidades con facilidad, integrating enseñanzas de múltiples dimensiones para evolution acelerada.',
        interpretacion: 'Indica acceso a realidades multidimensionales y integración de conocimientos.'
      },
      {
        secuencia: '313',
        resultado_numero: 35,
        resultado_texto: 'Mensajero divino confirmado. Canalizas wisdom cósmica con claridad y precisión, serving como puente entre reinos para elevation colectiva.',
        interpretacion: 'Sugiere confirmación de rol como canal y mensajero espiritual.'
      },
      {
        secuencia: '314',
        resultado_numero: 36,
        resultado_texto: 'Milagros cotidianos reconocidos. Ves lo extraordinario en lo ordinary, finding magia en cada momento y gratitude en cada experience.',
        interpretacion: 'Indica percepción aumentada de milagros y belleza en lo cotidiano.'
      },
      {
        secuencia: '321',
        resultado_numero: 37,
        resultado_texto: 'Tiempo cuántico dominado. Transciendes limitaciones temporales, manifestando instantáneamente y healing pasado/futuro desde presente eterno.',
        interpretacion: 'Sugiere maestría sobre tiempo lineal y experiencia de eternidad presente.'
      },
      {
        secuencia: '322',
        resultado_numero: 38,
        resultado_texto: 'Geometría sagrada embodied. Tu energy field se alinea con patrones universales, attracting sincronicidades perfectas y soluciones elegantes.',
        interpretacion: 'Indica alineación con geometría sagrada y patrones universales armónicos.'
      },
      {
        secuencia: '323',
        resultado_numero: 39,
        resultado_texto: 'Silencio que habla volúmenes. Encuentras respuestas en quietud interior, trusting la sabiduría que emerge cuando la mente se calma.',
        interpretacion: 'Sugiere conexión con sabiduría del silencio y quietud interior profunda.'
      },
      {
        secuencia: '324',
        resultado_numero: 40,
        resultado_texto: 'Red cósmica activada. Te reconoces como nodo esencial en la red de la vida, contributing unique frecuencia al symphony cósmico.',
        interpretacion: 'Indica conciencia de interconexión cósmica y rol único en el todo.'
      },
      {
        secuencia: '331',
        resultado_numero: 41,
        resultado_texto: 'Lenguaje light aprendido. Comunicas beyond palabras, using energía pura y intention para crear understanding profundo y conexión soul a soul.',
        interpretacion: 'Sugiere comunicación energética y telepática beyond lenguaje verbal.'
      },
      {
        secuencia: '332',
        resultado_numero: 42,
        resultado_texto: 'Plantillas de nueva tierra ancladas. Encarnas frequencies de nueva realidad, co-creando paraíso terrestre through pensamiento, palabra y action conscientes.',
        interpretacion: 'Indica anclaje de nuevas plantillas energéticas para la humanidad.'
      },
      {
        secuencia: '333',
        resultado_numero: 43,
        resultado_texto: 'Trinidad divina realizada. Cuerpo, mente y espíritu alineados en perfecta harmony, expressing divinity en forma humana con gracia y mastery.',
        interpretacion: 'Sugiere integración perfecta de trinidad cuerpo-mente-espíritu.'
      },
      {
        secuencia: '334',
        resultado_numero: 44,
        resultado_texto: 'Ascensión individual completada. Has trascendido limitations de la matrix 3D, operating desde conciencia multidimensional y compassion unconditional.',
        interpretacion: 'Indica completación de proceso de ascensión personal y expansión consciente.'
      },
      {
        secuencia: '341',
        resultado_numero: 45,
        resultado_texto: 'Códigos de luz descargados. Recibes activaciones galácticas que expanden tu DNA, unlocking potencial latente y abilities cuánticas.',
        interpretacion: 'Sugiere recepción de códigos de luz y activación de potencial genético superior.'
      },
      {
        secuencia: '342',
        resultado_numero: 46,
        resultado_texto: 'Profecía auto-cumplida realizada. Eres living prophecy de tu más alto destino, manifestando visiones sagradas through pura presencia y alignment.',
        interpretacion: 'Indica encarnación de profecía personal y manifestación de destino divino.'
      },
      {
        secuencia: '343',
        resultado_numero: 47,
        resultado_texto: 'Eternidad tasted en momento presente. Experimentas la infinitud dentro del ahora, disolviendo ilusión de separatidad y abrazando unidad con todo lo que es.',
        interpretacion: 'Sugiere experiencia directa de eternidad y unidad cósmica en presente eterno.'
      },
      {
        secuencia: '344',
        resultado_numero: 48,
        resultado_texto: 'Maestro de realidades confirmado. Conscientemente eliges qué realidad experimentar, creando tu mundo con cada pensamiento, emotion y belief.',
        interpretacion: 'Indica maestría consciente sobre creación de realidad y experiencia perceptual.'
      },
      {
        secuencia: '411',
        resultado_numero: 49,
        resultado_texto: 'Amor que transforma todo. Tu corazón irradia frecuencia curativa que transmuta darkness en luz, fear en amor, separation en unidad wherever vas.',
        interpretacion: 'Sugiere poder transformador del amor incondicional aplicado conscientemente.'
      },
      {
        secuencia: '412',
        resultado_numero: 50,
        resultado_texto: 'Misión galáctica recordada. Recuperas memorias de service intergaláctico, integrating sabiduría estelar para asistir en el despertar planetario.',
        interpretacion: 'Indica recuperación de memorias estelares y propósito galáctico.'
      },
      {
        secuencia: '413',
        resultado_numero: 51,
        resultado_texto: 'Sonido que crea mundos. Usas tu voz como instrumento divino, tuning a frecuencia de creación para manifestar belleza, harmony y evolution consciente.',
        interpretacion: 'Sugiere uso consciente del sonido y la voz como herramientas creativas divinas.'
      },
      {
        secuencia: '414',
        resultado_numero: 52,
        resultado_texto: 'Presencia que sana el tiempo. Tu mera existencia rectifica líneas temporales, bringing healing a pasado y futuro through poder del ahora consciente.',
        interpretacion: 'Indica capacidad de sanar el tiempo mediante presencia consciente intensificada.'
      },
      {
        secuencia: '421',
        resultado_numero: 53,
        resultado_texto: 'Espejo cósmico reflejado. Todo lo que encuentras es reflejo de tu conciencia, offering oportunidades para deep self-reflection y crecimiento acelerado.',
        interpretacion: 'Sugiere comprensión profunda de la ley del espejo y autoobservación consciente.'
      },
      {
        secuencia: '422',
        resultado_numero: 54,
        resultado_texto: 'Red de vida consciente. Sientes la vida en todas las cosas, comunicando con piedras, plantas, animales y estrellas como compañeros conscientes.',
        interpretacion: 'Indica comunicación consciente con todos los reinos y seres de la creación.'
      },
      {
        secuencia: '423',
        resultado_numero: 55,
        resultado_texto: 'Danza cósmica embodied. Te mueves con gracia divina through cambios life, trusting el flujo universal y sabiendo que cada paso es perfecto.',
        interpretacion: 'Sugiere entrega al flujo cósmico y movimiento armónico con el universo.'
      },
      {
        secuencia: '424',
        resultado_numero: 56,
        resultado_texto: 'Regalo único entregado. Ofreces tu don especial al mundo sin attachment, allowing que el universo lo multiplique y distribuya donde más se necesita.',
        interpretacion: 'Indica entrega desinteresada de dones únicos para servicio del todo.'
      },
      {
        secuencia: '431',
        resultado_numero: 57,
        resultado_texto: 'Sabiduría atemporal accessed. Accedes a la biblioteca akáshica y sabiduría de ages, bringing insights perdurables a challenges contemporáneos.',
        interpretacion: 'Sugiere acceso a conocimiento akáshico y sabiduría eterna aplicable ahora.'
      },
      {
        secuencia: '432',
        resultado_numero: 58,
        resultado_texto: 'Armonización de realidades. Sintonizas frecuencias discordantes en tu campo, bringing harmony a relaciones, environments y situaciones aparentemente caóticas.',
        interpretacion: 'Indica capacidad de armonizar energías y crear coherencia en medio del caos.'
      },
      {
        secuencia: '433',
        resultado_numero: 59,
        resultado_texto: 'Amor como fuerza gravitacional. Atraes hacia ti experiences y personas que reflejan tu frequency love más alta, creating un vortex de blessings.',
        interpretacion: 'Sugiere uso consciente del amor como fuerza de atracción magnética divina.'
      },
      {
        secuencia: '434',
        resultado_numero: 60,
        resultado_texto: 'Legado eterno establecido. Tus contributions al awakening colectivo perduran beyond tiempo, influencing la evolución consciousness para eternity.',
        interpretacion: 'Indica creación de legado eterno que trasciende el tiempo y el espacio.'
      },
      {
        secuencia: '441',
        resultado_numero: 61,
        resultado_texto: 'Cielo en tierra manifestado. Experimentas paraíso aquí y ahora, viendo la divinidad en cada rostro, cada hoja, cada momento de existencia aparentemente ordinary.',
        interpretacion: 'Sugiere realización del paraíso en la tierra mediante percepción transformada.'
      },
      {
        secuencia: '442',
        resultado_numero: 62,
        resultado_texto: 'Unidad con fuente realizada. Disuelves en el océano de conciencia pura, yet manteniendo individualidad para expresar unique aspecto de la divinidad.',
        interpretacion: 'Indica experiencia de unidad con la fuente mientras se mantiene la individualidad.'
      },
      {
        secuencia: '443',
        resultado_numero: 63,
        resultado_texto: 'Juego divino embraced. Abrazas la vida como playground cósmico, creating con alegría, exploring con wonder, y amando con wild abandon.',
        interpretacion: 'Sugiere enfoque lúdico y gozoso hacia la vida como expresión divina.'
      },
      {
        secuencia: '444',
        resultado_numero: 64,
        resultado_texto: 'Maestría completa alcanzada. Eres soberano de tu universo, co-creando con la fuente en cada momento, libre de limitación, lleno de gracia, radiante de amor eterno.',
        interpretacion: 'Indica logro de maestría espiritual completa y co-creación consciente con lo divino.'
      }
    ];

    // Insertar lanzamientos del sistema
    for (const lanzamiento of lanzamientosData) {
      await prisma.lanzamientoSistema.upsert({
        where: {
          sistemaId_secuencia: {
            sistemaId: sistema.id,
            secuencia: lanzamiento.secuencia,
          },
        },
        update: lanzamiento,
        create: {
          ...lanzamiento,
          sistemaId: sistema.id,
        },
      });
    }

    console.log(
      '✅ Lanzamientos del sistema creados:',
      lanzamientosData.length,
    );

    // Datos para sistemitas (interpretaciones adicionales)
    const sistemitasData = [
      {
        numero: 1,
        secuencia: '1',
        resultado_texto: 'Energía yang pura. Inicio de nuevos ciclos con fuerza y determinación. La acción directa y el coraje serán recompensados.',
        interpretacion: 'Indica comienzos poderosos y energía creativa en su máximo esplendor.'
      },
      {
        numero: 1,
        secuencia: '2',
        resultado_texto: 'Fuerza suave. La determinación se combina con flexibilidad, creando un enfoque poderoso pero adaptable a las circunstancias.',
        interpretacion: 'Sugiere equilibrio entre acción firme y receptividad consciente.'
      },
      {
        numero: 1,
        secuencia: '3',
        resultado_texto: 'Expansión controlada. El crecimiento avanza con sabiduría, evitando excesos mientras se aprovechan todas las oportunidades.',
        interpretacion: 'Indica desarrollo armonioso y expansión medida.'
      },
      {
        numero: 1,
        secuencia: '4',
        resultado_texto: 'Cimientos sólidos. La energía se estabiliza creando bases firmes para construcciones futuras de gran envergadura.',
        interpretacion: 'Sugiere establecimiento de fundamentos duraderos y confiables.'
      },
      {
        numero: 2,
        secuencia: '1',
        resultado_texto: 'Receptividad activa. La apertura a nuevas ideas se combina con implementación práctica inmediata.',
        interpretacion: 'Indica perfecta integración entre inspiración y acción.'
      },
      {
        numero: 2,
        secuencia: '2',
        resultado_texto: 'Armonía perfecta. Las energías femenina y masculina se equilibran creando sinergia y fluidez en todos los aspectos.',
        interpretacion: 'Sugiere estado de balance ideal y cooperación cósmica.'
      },
      {
        numero: 2,
        secuencia: '3',
        resultado_texto: 'Crecimiento orgánico. La expansión ocurre de manera natural y armoniosa, siguiendo los ritmos naturales del universo.',
        interpretacion: 'Indica desarrollo que respeta los tiempos divinos y los procesos naturales.'
      },
      {
        numero: 2,
        secuencia: '4',
        resultado_texto: 'Estabilidad receptiva. La firmeza se combina con apertura, creando una base sólida pero flexible para recibir bendiciones.',
        interpretacion: 'Sugiere capacidad de mantener estructura mientras se permanece abierto al flujo divino.'
      },
      {
        numero: 3,
        secuencia: '1',
        resultado_texto: 'Creatividad explosiva. Ideas innovadoras emergen con fuerza y se manifiestan rápidamente en la realidad tangible.',
        interpretacion: 'Indica período de inspiración poderosa y manifestación acelerada.'
      },
      {
        numero: 3,
        secuencia: '2',
        resultado_texto: 'Expansión armoniosa. El crecimiento se desarrolla de manera equilibrada, beneficiando todos los aspectos de la vida simultáneamente.',
        interpretacion: 'Sugiere desarrollo multidimensional y progreso integral.'
      },
      {
        numero: 3,
        secuencia: '3',
        resultado_texto: 'Crecimiento exponencial. La expansión se acelera geométricamente, creando oportunidades que se multiplican unas a otras.',
        interpretacion: 'Indica período de abundancia creciente y oportunidades en cascada.'
      },
      {
        numero: 3,
        secuencia: '4',
        resultado_texto: 'Expansión grounded. El crecimiento mantiene conexión con la realidad material, asegurando que las ideas se anclen firmemente.',
        interpretacion: 'Sugiere combinación ideal de visión elevada con implementación práctica.'
      },
      {
        numero: 4,
        secuencia: '1',
        resultado_texto: 'Estructura innovadora. Nuevas formas de organización y sistemas emergen, combinando solidez con creatividad revolucionaria.',
        interpretacion: 'Indica creación de estructuras que rompen paradigmas mientras mantienen estabilidad.'
      },
      {
        numero: 4,
        secuencia: '2',
        resultado_texto: 'Fundamentos flexibles. La estabilidad se combina con adaptabilidad, creando sistemas que perduran porque pueden evolucionar.',
        interpretacion: 'Sugiere diseño de estructuras que resisten el cambio porque incorporan el cambio.'
      },
      {
        numero: 4,
        secuencia: '3',
        resultado_texto: 'Crecimiento estructurado. La expansión ocurre dentro de marcos que aseguran sostenibilidad y continuidad a largo plazo.',
        interpretacion: 'Indica desarrollo que balancea innovación con preservación de valores esenciales.'
      },
      {
        numero: 4,
        secuencia: '4',
        resultado_texto: 'Estabilidad absoluta. Los cimientos son inquebrantables, proporcionando plataforma perfecta para emprender cualquier proyecto.',
        interpretacion: 'Sugiere base tan sólida que puede soportar cualquier construcción futura por ambiciosa que sea.'
      },
      {
        numero: 5,
        secuencia: '1',
        resultado_texto: 'Cambio poderoso. La transformación ocurre con fuerza y determinación, barriendo lo viejo para dar paso a lo nuevo.',
        interpretacion: 'Indica transición radical apoyada por energía yang pura.'
      },
      {
        numero: 5,
        secuencia: '2',
        resultado_texto: 'Transformación graceful. El cambio se desarrolla con suavidad y elegancia, minimizando trauma y maximizando aprendizaje.',
        interpretacion: 'Sugiere evolución que respeta los procesos naturales y los tiempos divinos.'
      },
      {
        numero: 5,
        secuencia: '3',
        resultado_texto: 'Metamorfosis expansiva. La transformación abre puertas a dimensiones completamente nuevas de experiencia y conciencia.',
        interpretacion: 'Indica cambio que no solo transforma sino que expande horizontes permanentemente.'
      },
      {
        numero: 5,
        secuencia: '4',
        resultado_texto: 'Cambio estructural. La transformación afecta los cimientos mismos, creando reorganización completa desde la base.',
        interpretacion: 'Sugiere revisión y renovación de estructuras fundamentales de la existencia.'
      },
      {
        numero: 6,
        secuencia: '1',
        resultado_texto: 'Armonización activa. El equilibrio se establece mediante acción consciente y deliberada, creando balance donde había desequilibrio.',
        interpretacion: 'Indica trabajo activo para restaurar armonía en sistemas y relaciones.'
      },
      {
        numero: 6,
        secuencia: '2',
        resultado_texto: 'Balance natural. La armonía emerge espontáneamente, como expresión del flujo natural del universo cuando no se fuerza.',
        interpretacion: 'Sugiere que el equilibrio perfecto es estado natural cuando permitimos el flujo divino.'
      },
      {
        numero: 6,
        secuencia: '3',
        resultado_texto: 'Crecimiento balanceado. La expansión ocurre en todas direcciones simultáneamente, manteniendo proporción y armonía perfectas.',
        interpretacion: 'Indica desarrollo integral donde ningún aspecto avanza a expensas de otro.'
      },
      {
        numero: 6,
        secuencia: '4',
        resultado_texto: 'Estabilidad armoniosa. La solidez se combina con flexibilidad, creando equilibrio dinámico que resiste perturbaciones.',
        interpretacion: 'Sugiere balance que incorpora tanto estructura como adaptabilidad.'
      },
      {
        numero: 7,
        secuencia: '1',
        resultado_texto: 'Culminación poderosa. Los ciclos completan con energía intensa, entregando resultados que exceden todas las expectativas.',
        interpretacion: 'Indica finalización espectacular de procesos con entrega de recompensas máximas.'
      },
      {
        numero: 7,
        secuencia: '2',
        resultado_texto: 'Completamiento graceful. Las cosas llegan a su fin natural con suavidad y perfección, como pétalos que caen en otoño.',
        interpretacion: 'Sugiere culminación que ocurre en el momento perfecto y de la manera perfecta.'
      },
      {
        numero: 7,
        secuencia: '3',
        resultado_texto: 'Expansión final. La culminación abre puertas a nuevos niveles de existencia, siendo fin y comienzo simultáneamente.',
        interpretacion: 'Indica que los finales son portales a realidades expandidas.'
      },
      {
        numero: 7,
        secuencia: '4',
        resultado_texto: 'Cimientos completados. La estructura final se establece firmemente, lista para soportar la eternidad.',
        interpretacion: 'Sugiere creación de obras que trascienden el tiempo y dejan legado permanente.'
      },
      {
        numero: 8,
        secuencia: '1',
        resultado_texto: 'Infinito manifestado. La eternidad se expresa en el momento presente, revelando la naturaleza ilimitada del ser.',
        interpretacion: 'Indica experiencia directa de la infinitud dentro de la forma finita.'
      },
      {
        numero: 8,
        secuencia: '2',
        resultado_texto: 'Ciclos eternos. El flujo sin fin de dar y recibir se manifiesta claramente, mostrando la naturaleza circular de la existencia.',
        interpretacion: 'Sugiere comprensión profunda de los ritmos eternos del universo.'
      },
      {
        numero: 8,
        secuencia: '3',
        resultado_texto: 'Expansión infinita. El crecimiento no conoce límites, avanzando hacia horizontes que se expanden eternamente.',
        interpretacion: 'Indica viaje sin fin hacia dimensiones siempre mayores de conciencia.'
      },
      {
        numero: 8,
        secuencia: '4',
        resultado_texto: 'Estructura eterna. Los cimientos trascienden el tiempo, creando formas que expresan la eternidad en dimensiones materiales.',
        interpretacion: 'Sugiere creación que une lo temporal con lo eterno, lo finito con lo infinito.'
      }
    ];

    // Insertar sistemitas (CORREGIDO)
    for (const sistemita of sistemitasData) {
      await prisma.sistemita.upsert({
        where: {
          sistemaId_numero_secuencia: {
            sistemaId: sistema.id,
            numero: sistemita.numero,
            secuencia: sistemita.secuencia,
          },
        },
        update: sistemita,
        create: {
          ...sistemita,
          sistemaId: sistema.id,
        },
      });
    }

    console.log('✅ Sistemitas creados:', sistemitasData.length);
    console.log('🎉 Sistema de diálogo abierto poblado exitosamente!');

  } catch (error) {
    console.error('❌ Error poblando sistema:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
