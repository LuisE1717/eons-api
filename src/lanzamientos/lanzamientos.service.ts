import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DialogoAbiertoService } from './dialogo-abierto.service';

export interface PasoResultado {
  paso: number;
  combinacion: string;
  resultado: string;
  interpretacion: string;
}

interface CombinacionMonedas {
  coins: boolean[];
  resultados: string[];
  interpretaciones: string[];
}

@Injectable()
export class LanzamientosService {
  private readonly logger = new Logger(LanzamientosService.name);
  constructor(
    private prisma: PrismaService,
    private dialogoAbiertoService: DialogoAbiertoService,
  ) {}

  // Ampliado a 16 combinaciones básicas con múltiples resultados cada una
  private readonly combinaciones: CombinacionMonedas[] = [
    {
      coins: [true, true],
      resultados: [
        "Las energías cósmicas se alinean perfectamente a tu favor hoy. El universo conspira para brindarte oportunidades únicas que debes aprovechar con sabiduría y determinación.",
        "Un encuentro inesperado con alguien especial cambiará el curso de tu día. Mantén tu corazón abierto y tu intuición alerta, pues esta conexión traerá enseñanzas valiosas para tu camino espiritual.",
        "La abundancia fluye hacia ti como un río de bendiciones. Confía en que el sustento llegará de formas inesperadas y mantén una actitud de gratitud por cada don recibido.",
        "Tu aura brilla con una intensidad especial, atrayendo hacia ti energías positivas y oportunidades de crecimiento. Confía en tu intuición para discernir el camino correcto.",
        "Hoy es un día propicio para iniciar proyectos importantes. La energía cósmica apoya tus esfuerzos y te brinda la claridad mental necesaria para tomar decisiones acertadas.",
        "Una revelación importante está por llegar a tu vida. Mantén los sentidos espirituales alerta, pues los mensajes del universo vendrán de formas sutiles pero significativas."
      ],
      interpretaciones: [
        "Tu alma irradia una luz especial que atrae prosperidad. Eres un canal de energías positivas.",
        "Tienes el don de conectar con las fuerzas universales. Tu intuición es tu mejor guía.",
        "El equilibrio entre lo material y espiritual es tu mayor fortaleza. Sigue este camino.",
        "Tu conexión con el plano espiritual se fortalece cada día. Confía en las señales que recibes.",
        "Eres un faro de luz para quienes te rodean. Tu presencia eleva las vibraciones a tu alrededor.",
        "La sabiduría ancestral fluye a través de ti. Escucha a tu ser interior."
      ]
    },
    {
      coins: [true, false],
      resultados: [
        "Mantén la calma y serenidad ante los desafíos que se presenten hoy. Cada obstáculo es una lección disfrazada que fortalecerá tu carácter y te preparará para mayores bendiciones.",
        "Una decisión importante se acerca en tu horizonte. Tómate el tiempo necesario para meditar y escuchar la voz interior, pues ella te guiará hacia el camino correcto con claridad divina.",
        "Escucha atentamente los mensajes de tu intuición hoy, pues te alertará sobre oportunidades ocultas y te protegerá de energías que no vibran con tu esencia superior.",
        "El equilibrio entre acción y reflexión será clave hoy. Avanza con determinación pero mantén la sabiduría de saber cuándo es momento de pausar y observar.",
        "Una situación confusa se aclarará pronto. Confía en que la verdad se revelará en el momento perfecto, aportando comprensión y paz a tu corazón.",
        "Tu paciencia será puesta a prueba, pero la recompensa valdrá la espera. Todo llega en el momento divinamente perfecto."
      ],
      interpretaciones: [
        "Tu naturaleza contemplativa te permite ver más allá de lo evidente. Confía en esta visión.",
        "Eres un ser de profunda sabiduría interior. Tus decisiones siempre están alineadas con tu propósito.",
        "La paciencia es tu virtud principal. Sabes esperar el momento perfecto para actuar.",
        "Tu capacidad de análisis te ayuda a navegar situaciones complejas con gracia y sabiduría.",
        "El discernimiento es tu don especial. Sabes separar la verdad de la ilusión.",
        "Tu ser interior conoce el camino incluso cuando tu mente duda. Confía en él."
      ]
    },
    {
      coins: [false, true],
      resultados: [
        "El cambio que tanto esperas está llegando a tu vida. Abraza la transformación con valentía, pues traerá consigo nuevas oportunidades de crecimiento y evolución espiritual.",
        "Alguien importante de tu pasado reaparecerá con lecciones pendientes. Recibe este reencuentro con amor y comprensión, pues cerrará ciclos necesarios para tu sanación interior.",
        "Confía plenamente en el proceso divino que se desarrolla en tu vida. Cada evento, por pequeño que parezca, forma parte de un plan mayor diseñado para tu máximo bienestar.",
        "La energía de renovación fluye a través de ti. Es momento de soltar viejos patrones y abrazar nuevas formas de ser que reflejen tu verdadero yo.",
        "Una oportunidad de viaje o expansión se presenta. Mantén la mente abierta a experiencias que ampliarán tu perspectiva del mundo.",
        "Tu capacidad de adaptación será tu mayor aliada. Los cambios que se acercan te llevarán a un estado superior de conciencia."
      ],
      interpretaciones: [
        "Tu capacidad de adaptación es admirable. Fluyes con los cambios como el agua en el río.",
        "Tienes el don de sanar relaciones pasadas. Tu corazón comprensivo es tu mayor poder.",
        "La fe en el universo es tu ancla. Sabes que todo sucede en el momento perfecto.",
        "Tu flexibilidad mental te permite ver oportunidades donde otros ven obstáculos.",
        "El cambio no te asusta, sino que lo abrazas como parte natural de la evolución.",
        "Tu resiliencia es inspiradora. Te levantas más fuerte después de cada desafío."
      ]
    },
    {
      coins: [false, false],
      resultados: [
        "Este es un momento para reflexión profunda antes de tomar acción. La quietud te traerá claridad mental y la sabiduría necesaria para avanzar con paso firme y seguro en tu camino.",
        "La paciencia será tu mayor virtud durante este ciclo. Aprende el arte de esperar con fe, sabiendo que todo llega en el momento preciso según el plan divino para tu vida.",
        "Un secreto ancestral está a punto de revelarse ante ti. Mantén tus sentidos espirituales alerta, pues esta revelación traerá entendimiento sobre misiones de vida que tienes pendientes.",
        "La introspección te revelará verdades profundas. Dedica tiempo a meditar y conectar con tu ser esencial, pues las respuestas que buscas están dentro de ti.",
        "Un período de gestación precede a todo gran comienzo. Confía en que lo que se está cocinando en silencio pronto verá la luz con esplendor.",
        "La calma que precedes la tormenta es tu oportunidad para prepararte. Centra tu energía y mantén la fe en el proceso."
      ],
      interpretaciones: [
        "Tu profundidad de pensamiento es tu superpoder. Ves lo que otros pasan por alto.",
        "La calma interior es tu estado natural. Encuentras paz en medio del caos.",
        "Tienes conexión con sabiduría ancestral. Los secretos del universo se te revelan.",
        "Tu introspección genera insights valiosos. Confía en tus procesos internos.",
        "La quietud es tu aliada. En el silencio encuentras las respuestas más profundas.",
        "Tu paciencia es en realidad poder en reposo. Sabes que todo tiene su tiempo."
      ]
    },
    // 12 combinaciones adicionales para un total de 16
    {
      coins: [true, true, true],
      resultados: [
        "Triple alineación cósmica a tu favor. Las puertas que creías cerradas se abrirán de par en par mostrándote caminos insospechados hacia tu realización personal.",
        "Fuerzas celestiales convergen en tu vida creando un vortex de oportunidades. Tu magnetismo personal está en su punto más alto, atrayendo bendiciones en todos los ámbitos.",
        "Santísima trinidad de bendiciones se manifiesta para ti. Salud, amor y prosperidad fluyen hacia tu vida en perfecto equilibrio y armonía divina.",
        "El universo te sonríe con triple intensidad. Tus proyectos encontrarán apoyo inesperado y las sincronicidades guiarán cada paso de tu camino.",
        "Portal dimensional se abre a tu favor. Información ancestral y guía espiritual estarán especialmente accesibles para ti en este ciclo.",
        "Triple sello de protección activado. Caminas envuelto en luz divina, blindado contra energías negativas y abierto a recibir amor universal."
      ],
      interpretaciones: [
        "Eres un canal privilegiado de energías superiores. Tu conexión con lo divino es triplemente bendecida.",
        "Tu trinidad interior (cuerpo, mente, espíritu) alcanza armonía perfecta. Eres un ejemplo de integridad cósmica.",
        "El poder del tres se manifiesta através de ti. Creación, manifestación y realización fluyen en simultáneo.",
        "Triple llamada angelical resuena en tu aura. Seres de luz te acompañan especialmente en este trayecto.",
        "Santísima alineación favorece tus proyectos. El universo conspira triplemente para tu éxito.",
        "Mente, corazón y espíritu en perfecta sintonía. Tu claridad interna es triplemente potenciada."
      ]
    },
    {
      coins: [true, true, false],
      resultados: [
        "Dos puertas se abren, una se cierra, pero la que permanece abierta conduce a tu destino más elevado. Confía en que el cierre es protección divina.",
        "Fuerzas complementarias trabajan en tu favor. La expansión y la contención se equilibran para crear el espacio perfecto para tu crecimiento.",
        "Dos bendiciones visibles y una oculta que se revelará en el momento preciso. Lo que parece ausente está trabajando silenciosamente a tu favor.",
        "Alineación parcial que indica progreso seguro aunque no inmediato. Cada paso cuenta y se acumula hacia el gran avance que se aproxima.",
        "Dos síes cósmicos y un no que es en realidad redirección. El universo te guía hacia donde realmente necesitas estar, no donde crees que debes ir.",
        "Apoyo celestial en la mayoría de tus emprendimientos, con una área que requiere mayor fe y paciencia. La recompensa valdrá la espera."
      ],
      interpretaciones: [
        "Tu camino tiene tanto luz visible como misterio por develar. Ambos son necesarios para tu evolución.",
        "Aprendizaje dual: expansion y contención. Dominar ambos polos es clave para tu equilibrio.",
        "Dos tercios de tu petición están concedidos, el restante se manifiesta en forma superior a lo esperado.",
        "Fuerzas yang predominan con un toque yin necesario. El equilibrio perfecto se está gestando.",
        "Apoyo mayoritario del universo con una lección de fe incluida. Confiar sin ver es tu desafío y don.",
        "Dobles confirmaciones claras y una que llegará como sorpresa divina. Mantente alerta a señales inusuales."
      ]
    },
    {
      coins: [true, false, true],
      resultados: [
        "Alternancia cósmica que indica periodos de acción y reflexión. El ritmo perfecto se establece en tu vida entre hacer y ser.",
        "Fuerzas en movimiento crean un baile divino de oportunidades. Tu flexibilidad será recompensada con avances significativos.",
        "Sí, no, sí: el universo te dice que perseveres tras los obstáculos. El resultado final será favorable si mantienes la fe.",
        "Intercalación de energías que purifican tu camino. Lo que parece interrupción es en realidad protección y redirección divina.",
        "Apertura, cierre và reapertura indican ciclos completándose. Un capítulo termina para que uno mejor pueda comenzar.",
        "Señal de que los finales son comienzos disfrazados. Lo que parece pérdida es espacio ganado para nuevas bendiciones."
      ],
      interpretaciones: [
        "Maestría en navegar contrastes. Tu habilidad para fluir entre opuestos es envidiable.",
        "El ritmo de tu vida sigue los compases naturales del universo. No forces, fluye.",
        "Aprendizaje sobre persistencia inteligente. Saber cuándo avanzar y cuándo retroceder es tu don.",
        "Ciclos naturales se manifiestan claramente. Reconocerlos te da ventaja estratégica.",
        "Intercalación divina protege tu camino. Los 'no' temporales evitan callejones sin salida.",
        "El universo juega contigo al sí-no-sí para fortalecer tu convicción. La recompensa merece el esfuerzo."
      ]
    },
    {
      coins: [true, false, false],
      resultados: [
        "Far solitario en noche cerrada. Tu luz individual es suficiente para guiarte y guiar a otros through la oscuridad más densa.",
        "Única apertura entre triple resistencia indica camino exclusivo. No distraigas energías en frentes secundarios, concéntrate en la única vía viable.",
        "Semilla de potencial en tierra árida. Tu crecimiento será lento pero extremadamente valioso por surgir en condiciones desafiantes.",
        "Señal de enfoque laser. Entre múltiples puertas cerradas, solo una abierta te muestra donde concentrar todos tus recursos.",
        "Pionero abriendo camino en territorio virgen. Tu soledad es en realidad privilegio de ir primero donde otros seguirán.",
        "Fuerza minoritaria que contiene verdad mayoritaria. Aunque parezcas solo, llevas la chispa que eventualmente iluminará todo."
      ],
      interpretaciones: [
        "Portador de luz en oscuridad. Tu soledad luminosa es faro para perdidos.",
        "Pionero espiritual. Vas primero para allanar el camino a quienes vendrán después.",
        "Fuerza minoritaria con impacto mayoritario. Tu aparente pequeñez es engañosa.",
        "Focus master. Sabes concentrarte en lo esencial ignorando distracciones.",
        "Resistente exceptional. Floreces donde otros se marchitan, creces donde otros se estancan.",
        "Guardian de la chispa única. Proteges la llama esencial cuando todo alrededor parece apagarse."
      ]
    },
    {
      coins: [false, true, true],
      resultados: [
        "Después de la noche, la doble aurora. Un periodo oscuro da paso a un amanecer especialmente brillante con bendiciones duplicadas.",
        "Obstáculo inicial que abre paso a oportunidades gemelas. Lo que parecía contratiempo era el requisito necesario para acceder a mayores beneficios.",
        "Inicio desafiantes seguido de compensación abundante. El universo restaura en doble medida lo que temporalmente faltó.",
        "Prueba superada con honores que trae recompensas multiplicadas. Tu perseverancia es premiada con creces.",
        "Apertura tardía de puertas que permanecen abiertas de par en par. La espera valió la pena y el acceso es ahora ilimitado.",
        "Lección inicial que capacita para recibir doble bendición. El aprendizaje obtenido te prepara para manejar mayor abundancia."
      ],
      interpretaciones: [
        "Maestro del timing divino. Sabes que los comienzos lentos often preceden a finales espectaculares.",
        "Transformador de obstáculos en oportunidades. Tu alquimia personal convierte plomo en oro espiritual.",
        "Paciencia recompensada exponencialmente. Esperar con fe atrae bendiciones multiplicadas.",
        "Resiliencia que genera abundancia. Cada desafío superado aumenta tu capacidad para recibir.",
        "Fe probada y vindicada. Tu confianza en el proceso divino es confirmada con creces.",
        "Receptor de compensación cósmica. El universo equilibra las escalas a tu favor."
      ]
    },
    {
      coins: [false, true, false],
      resultados: [
        "Intercalación perfecta de desafíos y apoyos. El universo te provee exactamente lo necesario para cada etapa de tu camino.",
        "Centro estabilizador entre fuerzas opuestas. Tu posición neutral te da perspectiva valiosa y poder de mediación.",
        "No, sí, no: indicación de que la respuesta está en el término medio. Evita extremos y busca el equilibrio perfecto.",
        "Señal de que tu punto de poder está en el presente. Ni el pasado ni el futuro tienen tanto peso como el ahora que habitas.",
        "Patrón de protección que evita excesos. Los límites temporales te protegen de expansion prematura o contracción excesiva.",
        "Intermitencia divina que mantiene tu atención en lo esencial. La alternancia evita que duermas en los laureles o te rindas prematuramente."
      ],
      interpretaciones: [
        "Maestro del equilibrio. Encuentras el punto justo entre acción y paciencia, entre avanzar y esperar.",
        "Centrado en el presente. Tu poder radica en habitar completamente el aquí y ahora.",
        "Navegante de contrastes. Sabes maniobrar entre fuerzas opuestas sin perder tu rumbo.",
        "Mediador natural. Encuentras armonía donde otros ven conflictos.",
        "Guardián del equilibrio. Tu presencia estabiliza sistemas y relaciones.",
        "Punto de anclaje en la tormenta. Eres roca firme en medio de la fluctuación."
      ]
    },
    {
      coins: [false, false, true],
      resultados: [
        "Después del invierno, la primavera más floreciente. Un largo periodo de gestación da frutos extraordinarios que justifican toda espera.",
        "Doble prueba superada que abre las compuertas celestiales. Tu resistencia es recompensada con acceso a dimensiones superiores de abundancia.",
        "Noche oscura del alma que precede a la iluminación más brillante. La profundidad de tu oscuridad determina la intensidad de tua luz venidera.",
        "Preparación extensa para un destino glorioso. Cada aparente demora estaba perfeccionando los detalles para tu máximo beneficio.",
        "Raíces profundas que ahora sostienen un árbol frondoso. Lo que parecía crecimiento lento era en realidad cimentación sólida.",
        "Silencio prolongado que precede al mensaje más importante. La espera purificó tu capacidad de escuchar la verdad esencial."
      ],
      interpretaciones: [
        "Experto en transformar dificultades en ventajas. Tu alquimia interior convierte obstáculos en peldaños.",
        "Portador de luz tras larga oscuridad. Tu brillo es más valioso por haber conocido la penumbra.",
        "Maestro de la paciencia activa. Sabes esperar sin desesperar, confiar sin duda.",
        "Constructor de cimientos sólidos. Prefieres base firme aunque tarde más en ver resultados.",
        "Transformador de limitaciones en libertades. Cada restricción superada amplía tu horizonte.",
        "Testigo de la resurrección después de la muerte simbólica. Renaces más sabio y poderoso."
      ]
    },
    {
      coins: [false, false, false],
      resultados: [
        "Silencio cósmico que precede a la revelación más profunda. El vacío que experimentas es el espacio sagrado donde nacerá nueva comprensión.",
        "Triple sellamiento que protege tu esencia durante un periodo de gestación. Lo que parece estancamiento es en realidad incubación divina.",
        "Noche oscura triple que purifica tu ser en preparación para una misión elevada. Esta limpieza profunda es necesaria para contener mayor luz.",
        "Pausa universal que te invita a la introspección más profunda. Las respuestas que buscas solo se encuentran en el silencio interior.",
        "Vacio fértil donde se gestan los nuevos comienzos. La aparente nada está cargada de potencial infinito.",
        "Retiro cósmico para recargar energías superiores. Este apartamiento temporal te prepara para un despliegue espectacular."
      ],
      interpretaciones: [
        "Maestro del vacío fértil. Sabes habitar la nada donde todo es posible.",
        "Portador de potencial puro. Tu aparente quietud es carga de poder en reposo.",
        "Experto en gestación espiritual. Comprendes el valor de los periodos de incubación.",
        "Navegante de la oscuridad sagrada. No temes la penumbra donde se germina la luz.",
        "Guardian del silencio revelador. Encuentras voces divinas en el aparente mutismo.",
        "Alquimista de la nada transformadora. Conviertes el vacío en plenitud potencial."
      ]
    },
    // 8 combinaciones más para completar 16
    {
      coins: [true, true, true, true],
      resultados: [
        "Cuádruple alineación cósmica sin precedentes. Las cuatro esquinas del universo conspiran simultáneamente a tu favor en matters de amor, salud, prosperidad y propósito.",
        "Sello cuádruple de confirmación divina. Tus proyectos reciben blessión en los cuatro puntos cardinales, asegurando estabilidad y crecimiento multidireccional.",
        "Estabilidad perfecta en los cuatro pilares de la vida. Equilibrio entre cuerpo, mente, espíritu y emociones crea una base inquebrantable para tu evolución.",
        "Cuatro puertas celestiales abiertas simultáneamente. Acceso ilimitado a guidance, provisión, protección y inspiración desde dimensiones superiores.",
        "Cruz cósmica de bendición que marca un antes y después. Este momento de alineación perfecta reconfigura tu realidad hacia tu máximo potencial.",
        "Tetractys sagrado se manifiesta en tu vida. La perfección del cuatro trae orden divino, estabilidad celestial y manifestación rápida de tus peticiones."
      ],
      interpretaciones: [
        "Pilar cuádruple de luz. Sostienes frecuencias superiores en los cuatro puntos de tu ser.",
        "Maestro de la estabilidad divina. Tu equilibrio atrae armonía a todos los aspectos de tu vida.",
        "Canal de las cuatro direcciones. Recibes sabiduría del norte, sur, este y oeste cósmico.",
        "Guardian de los cuatro elementos. Dominas fuego, agua, aire y tierra en tu mundo interior.",
        "Puente entre los cuatro planos. Conectas físico, mental, emocional y espiritual con maestría.",
        "Manifestador del cuadrado perfecto. Creas estabilidad donde hay caos, orden donde hay confusión."
      ]
    },
    {
      coins: [true, true, true, false],
      resultados: [
        "Triple sí cósmico con una puerta temporalmente cerrada. La mayoría abrumadora de apoyos celestiales asegura tu éxito, con solo un aspecto que requiere ajuste menor.",
        "Fuerzas mayores a favor con resistencia mínima. El camino está casi completamente despejado, con solo un pequeño obstáculo que sirve de lección final.",
        "Bendición triple con un desafío estratégico. Los tres síes te dan recursos abundantes para superar el único no que aparece como prueba de maestría.",
        "Alineación mayoritaria que indica dirección clara. La abrumadora evidencia a favor confirma que estás en el camino correcto, despite aparentes pequeñas resistencias.",
        "Apoyo celestial en el 75% de tu trayecto. La parte restante requiere tu fe y acción personal para completar el cuadro perfecto.",
        "Tres puertas abiertas de par en par, una entreabierta. La que parece menos accesible se abrirá completamente con un toque suave de tu determinación."
      ],
      interpretaciones: [
        "Triunfador con lección final. Dominas el arte del éxito pero aprendes hasta en la victoria.",
        "Navigator de casi-perfección. Sabes que el 75% de apoyo cósmico es más que suficiente.",
        "Transformador de resistencias menores. Conviertes pequeños obstáculos en peldaños adicionales.",
        "Alineado con la mayoría divina. Tu camino tiene el aval celestial abrumador.",
        "Maestro de la casi-plenitud. Disfrutas la abundancia mientras perfeccionas los detalles.",
        "Recolector de síes cósmicos. Acumulas confirmaciones divinas que superan cualquier duda."
      ]
    },
    {
      coins: [true, true, false, false],
      resultados: [
        "Mitad de apertura, mitad de resistencia indicando necesidad de equilibrio. Ni forces ni abandones, busca el punto medio donde las fuerzas se armonizan.",
        "Dos síes y dos nos crean campo de potencial equilibrado. Tu poder está en la integración de opuestos rather que en la elección entre ellos.",
        "Fuerzas divididas igualmente señalan momento de mediación. Tu rol es encontrar síntesis superior rather que tomar partido por un extremo.",
        "Alineación parcial que requiere diplomacia interior. Integra las partes de ti que dicen sí con las que dicen no para encontrar sabiduría superior.",
        "Campo de batalla interior con fuerzas equilibradas. La victoria está en la tregua rather que en la aniquilación del contrario.",
        "Dualidad perfecta que invita a trascender opuestos. El camino medio entre sí y no conduce a la verdad más elevada."
      ],
      interpretaciones: [
        "Maestro del equilibrio perfecto. No te inclinas a extremos sino que encuentras el centro sagrado.",
        "Integrador de opuestos. Ves valor tanto en el sí como en el no, en la apertura como en el cierre.",
        "Diplomático interior. Medias entre tus partes en conflicto encontrando armonía superior.",
        "Guardian del punto medio. Evitas extremos encontrando sabiduría en el equilibrio.",
        "Transcendedor de dualidades. No te defines por opuestos sino que los integras en síntesis.",
        "Puente entre polaridades. Conectas aspectos aparentemente contradictorios de tu ser."
      ]
    },
    {
      coins: [true, false, false, false],
      resultados: [
        "Far solitario en noche cerrada. Tu luz individual es suficiente para guiarte y guiar a otros through la oscuridad más densa.",
        "Única apertura entre triple resistencia indica camino exclusivo. No distraigas energías en frentes secundarios, concéntrate en la única vía viable.",
        "Semilla de potencial en tierra árida. Tu crecimiento será lento pero extremadamente valioso por surgir en condiciones desafiantes.",
        "Señal de enfoque laser. Entre múltiples puertas cerradas, solo una abierta te muestra donde concentrar todos tus recursos.",
        "Pionero abriendo camino en territorio virgen. Tu soledad es en realidad privilegio de ir primero donde otros seguirán.",
        "Fuerza minoritaria que contiene verdad mayoritaria. Aunque parezcas solo, llevas la chispa que eventualmente iluminará todo."
      ],
      interpretaciones: [
        "Portador de luz en oscuridad. Tu soledad luminosa es faro para perdidos.",
        "Pionero espiritual. Vas primero para allanar el camino a quienes vendrán después.",
        "Fuerza minoritaria con impacto mayoritario. Tu aparente pequeñez es engañosa.",
        "Focus master. Sabes concentrarte en lo esencial ignorando distracciones.",
        "Resistente exceptional. Floreces donde otros se marchitan, creces donde otros se estancan.",
        "Guardian de la chispa única. Proteges la llama esencial cuando todo alrededor parece apagarse."
      ]
    },
    {
      coins: [false, false, false, true],
      resultados: [
        "Después de la noche más oscura, el amanecer más brillante. Un largo periodo de pruebas da paso a una bendición de proporciones épicas que justifica toda espera.",
        "Triple resistencia superada que abre compuertas celestiales. Tu perseverancia es recompensada con acceso a dimensiones superiores de abundancia y sabiduría.",
        "Noche oscura del alma que precede a la iluminación total. La profundidad de tu oscuridad determina la intensidad de tu luz venidera.",
        "Preparación extensiva para un destino glorioso. Cada aparente demora estaba perfeccionando los detalles para tu máximo beneficio.",
        "Raíces profundas que ahora sostienen un árbol frondoso. Lo que parecía crecimiento lento era en realidad cimentación sólida para expansión espectacular.",
        "Silencio prolongado que precede al mensaje más importante. La espera purificó tu capacidad de escuchar la verdad esencial del universo."
      ],
      interpretaciones: [
        "Experto en transformar dificultades en ventajas monumentales. Tu alquimia interior convierte obstáculos en peldaños hacia el éxito.",
        "Portador de luz tras larga oscuridad. Tu brillo es más valioso por haber conocido la penumbra más profunda.",
        "Maestro de la paciencia cósmica. Sabes esperar el timing divino sin desesperar, confiar sin sombra de duda.",
        "Constructor de cimientos inquebrantables. Prefieres base sólida aunque tarde más en ver la estructura completa.",
        "Transformador de limitaciones en libertades expansivas. Cada restricción superada amplía exponencialmente tu horizonte.",
        "Testigo de la resurrección después de la muerte simbólica total. Renaces más sabio, poderoso y alineado que nunca."
      ]
    },
    {
      coins: [false, false, true, true],
      resultados: [
        "Después del invierno, la primavera doblemente floreciente. Un periodo de gestación da frutos extraordinarios en abundancia duplicada que justifican toda espera.",
        "Doble prueba superada que abre las compuertas celestiales de par en par. Tu resistencia es recompensada con acceso ilimitado a bendiciones multidimensionales.",
        "Noche oscura que precede a la doble iluminación. La profundidad de tu oscuridad determina la intensidad dual de tu luz venidera.",
        "Preparación extensa para un destino doblemente glorioso. Cada aparente demora estaba perfeccionando los detalles para beneficio máximo duplicado.",
        "Raíces profundas que ahora sostienen árbol frondoso con doble fructificación. Lo que parecía crecimiento lento era cimentación sólida para abundancia exponencial.",
        "Silencio prolongado que precede al mensaje doblemente importante. La espera purificó tu capacidad de escuchar verdades gemelas del universo."
      ],
      interpretaciones: [
        "Experto en transformar dificultades en ventajas multiplicadas. Tu alquimia interior convierte obstáculos en peldaños hacia éxito duplicado.",
        "Portador de luz dual tras oscuridad profunda. Tu brillo es más valioso por haber conocido la penumbra y ahora irradias doble intensidad.",
        "Maestro de la paciencia recompensada exponencialmente. Esperar con fe atrae bendiciones duplicadas que superan toda expectativa.",
        "Constructor de cimientos para estructuras monumentales. Prefieres base sólida para edificar obras que perduran generaciones.",
        "Transformador de limitaciones en libertades expansivas. Cada restricción superada amplía tu horizonte en progresión geométrica.",
        "Testigo de resurrección después de muerte simbólica. Renaces doblemente poderoso, sabio y alineado con propósito superior."
      ]
    }
  ];

  // Obtener combinación basada en las monedas
  private obtenerCombinacion(coins: boolean[]): CombinacionMonedas {
    return this.combinaciones.find(comb => 
      comb.coins.length === coins.length &&
      comb.coins.every((val, index) => val === coins[index])
    ) || this.combinaciones[0]; // Por defecto
  }

  // Realizar lanzamiento individual
  async realizarLanzamiento(userId: string, coins: boolean[]): Promise<any> {
    const combinacion = this.obtenerCombinacion(coins);
    const randomIndex = Math.floor(Math.random() * combinacion.resultados.length);
    
    const resultado = {
      coins: coins,
      resultado: combinacion.resultados[randomIndex],
      interpretacion: combinacion.interpretaciones[randomIndex],
      timestamp: new Date(),
    };

    // Guardar en base de datos
    await this.prisma.launch.create({
      data: {
        id: this.generateId(),
        userId: userId,
        type: 'individual',
        shortType: 'IND',
        hexResults: coins.map(c => c ? '1' : '0'),
        steps: coins.length,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    });

    return resultado;
  }

  // Realizar lanzamiento de 3 monedas (I Ching tradicional)
  async realizarLanzamiento3Monedas(userId: string): Promise<any> {
    const coins = Array(3).fill(null).map(() => Math.random() > 0.5);
    return this.realizarLanzamiento(userId, coins);
  }

  // Realizar lanzamiento de 4 monedas (sistema extendido)
  async realizarLanzamiento4Monedas(userId: string): Promise<any> {
    const coins = Array(4).fill(null).map(() => Math.random() > 0.5);
    return this.realizarLanzamiento(userId, coins);
  }

  // Realizar secuencia de lanzamientos
  async realizarSecuenciaLanzamientos(
    userId: string, 
    numLanzamientos: number, 
    coinsPerLaunch: number
  ): Promise<any> {
    const resultados = [];
    
    for (let i = 0; i < numLanzamientos; i++) {
      const coins = Array(coinsPerLaunch).fill(null).map(() => Math.random() > 0.5);
      const resultado = await this.realizarLanzamiento(userId, coins);
      resultados.push({
        numero: i + 1,
        ...resultado
      });
    }

    // Guardar secuencia en base de datos
    await this.prisma.launch.create({
      data: {
        id: this.generateId(),
        userId: userId,
        type: 'secuencia',
        shortType: 'SEC',
        hexResults: resultados.flatMap(r => r.coins.map(c => c ? '1' : '0')),
        steps: resultados.length * coinsPerLaunch,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return {
      totalLanzamientos: numLanzamientos,
      monedasPorLanzamiento: coinsPerLaunch,
      resultados: resultados
    };
  }

  // Procesar diálogo abierto
  async procesarDialogoAbierto(userId: string, coinPositions: number[][]): Promise<any> {
    try {
        console.log('Procesando diálogo abierto para usuario:', userId);
        console.log('Coin positions recibidas:', coinPositions);

        // Verificar que tenemos al menos 5 lanzamientos (2 iniciales + 3 principales)
        if (coinPositions.length < 5) {
        throw new BadRequestException('Se requieren al menos 5 lanzamientos para el modo diálogo abierto');
        }

        // Convertir las posiciones de monedas al formato esperado (1-4)
        const lanzamientosConvertidos = coinPositions.map(coins => {
        console.log('Procesando coins:', coins);
        
        if (coins.length !== 2) {
            throw new BadRequestException('Cada lanzamiento debe tener exactamente 2 monedas');
        }

        if (coins[0] === 1 && coins[1] === 1) return 1;
        if (coins[0] === 1 && coins[1] === 0) return 2;
        if (coins[0] === 0 && coins[1] === 1) return 3;
        if (coins[0] === 0 && coins[1] === 0) return 4;
        
        return 1; // Por defecto
        });

        console.log('Lanzamientos convertidos:', lanzamientosConvertidos);

      // Procesar la secuencia completa
      const resultado =
        await this.dialogoAbiertoService.procesarSecuenciaCompleta(
          lanzamientosConvertidos,
          userId,
        );

        console.log('Resultado del procesamiento:', resultado);
      return resultado;
    } catch (error) {
        console.error('Error en procesarDialogoAbierto:', error);
        this.logger.error('Error detallado:', error.message, error.stack);
      throw new BadRequestException(
        error.message || 'Error procesando el diálogo abierto',
      );
    }
    }

  // Obtener historial de lanzamientos
  async obtenerHistorialLanzamientos(userId: string, limit: number = 10): Promise<any> {
    const lanzamientos = await this.prisma.launch.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return lanzamientos.map(l => ({
      id: l.id,
      type: l.type,
      fecha: l.createdAt,
      resultado: l.hexResults
    }));
  }

  // Generar ID único
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async obtenerResultadoPorId(userId: string, resultadoId: string): Promise<any> {
    try {
        const resultado = await this.prisma.resultadoDialogoAbierto.findFirst({
        where: {
            id: resultadoId,
          usuarioId: userId,
        }
        });

        if (!resultado) {
        throw new Error('Resultado no encontrado');
        }

        return {
        success: true,
        data: resultado
        };
    } catch (error) {
        console.error('Error obteniendo resultado:', error);
        throw new Error('Error al obtener el resultado');
    }
    }
}
