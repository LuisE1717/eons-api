import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
  constructor(private prisma: PrismaService) {}

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
        "Dos confirmaciones claras y una que llegará como sorpresa divina. Mantente alerta a señales inusuales."
      ]
    },
    {
      coins: [true, false, true],
      resultados: [
        "Alternancia cósmica que indica periodos de acción y reflexión. El ritmo perfecto se establece en tu vida entre hacer y ser.",
        "Fuerzas en movimiento crean un baile divino de oportunidades. Tu flexibilidad será recompensada con avances significativos.",
        "Sí, no, sí: el universo te dice que perseveres tras los obstáculos. El resultado final será favorable si mantienes la fe.",
        "Intercalación de energías que purifican tu camino. Lo que parece interrupción es en realidad protección y redirección divina.",
        "Apertura, cierre y reapertura indican ciclos completándose. Un capítulo termina para que uno mejor pueda comenzar.",
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
        "Un faro de luz en la tormenta. Aunque las circunstancias parezcan adversas, tienes la guía interna necesaria para navegar hacia aguas tranquilas.",
        "Inicio prometedor seguido de desafíos que prueban tu determinación. Superarlos te llevará a un nivel de realización inalcanzable de otra manera.",
        "Una puerta abierta entre dos cerradas indica la dirección exclusiva para tu crecimiento. No distraigas tu energía en caminos laterales.",
        "Señal de enfoque prioritario. Entre múltiples opciones, solo una conduce a tu verdadero destino. Tu intuición sabe cuál es.",
        "Fuerza individual contra corriente. Tu luz personal es suficiente para iluminar el camino aunque el entorno parezca oscuro.",
        "Semilla de potencial en tierra fértil pero con condiciones climáticas desafiantes. Tu crecimiento será lento pero extremadamente robusto."
      ],
      interpretaciones: [
        "Pionero espiritual abriendo camino donde otros retroceden. Tu valor inspira a quienes te rodean.",
        "Fuerza interior desproporcionada a las circunstancias externas. Tu poder personal supera cualquier desafío.",
        "Visión clara en medio de la confusión. Donde otros ven problemas, tú ves oportunidades camufladas.",
        "Resiliencia ejemplar. Te levantas cada vez más fuerte después de cada caída.",
        "Fe inquebrantable que se fortalece en la adversidad. Tus pruebas son tu entrenamiento avanzado.",
        "Luz que brilla más intensamente en la oscuridad. Tu presencia transforma entornos desafiantes."
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
        "Mediador natural. Encuentras armonía donde otros ven conflicto.",
        "Guardián del equilibrio. Tu presencia estabiliza sistemas y relaciones.",
        "Punto de anclaje en la tormenta. Eres roca firme en medio de la fluctuación."
      ]
    },
    {
      coins: [false, false, true],
      resultados: [
        "Después del invierno, la primavera más floreciente. Un largo periodo de gestación da frutos extraordinarios que justifican toda espera.",
        "Doble prueba superada que abre las compuertas celestiales. Tu resistencia es recompensada con acceso a dimensiones superiores de abundancia.",
        "Noche oscura del alma que precede a la iluminación más brillante. La profundidad de tu oscuridad determina la intensidad de tu luz venidera.",
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
        "Sello cuádruple de confirmación divina. Tus proyectos reciben bendición en los cuatro puntos cardinales, asegurando estabilidad y crecimiento multidireccional.",
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
        "Después de la noche triple, el amanecer más esperado. La larga espera culmina en realización que justifica every momento de paciencia ejercida.",
        "Triple prueba superada abre puerta a dimensión superior. Tu resistencia es recompensada con acceso a niveles de abundancia previously inalcanzables.",
        "Gestación prolongada da fruto extraordinario. Lo que parecía demora excesiva era tiempo necesario para maduración perfecta.",
        "Silencio extenso precede al mensaje más importante. La espera purificó tu capacidad de recepción para contener verdad superior.",
        "Raíces ultra profundas sostienen árbol gigantesco. Tu crecimiento lento creó base masiva para expansión espectacular.",
        "Vacío completo que precede a plenitud total. La nada absoluta se transforma en el todo integrado en momento divino."
      ],
      interpretaciones: [
        "Maestro de la paciencia cósmica. Sabes esperar el timing perfecto sin desesperar.",
        "Transformador de oscuridad en luz. Conviertes penumbras prolongadas en amaneceres gloriosos.",
        "Experto en gestación prolongada. Comprendes el valor de los procesos lentos pero profundos.",
        "Receptor de compensación divina. El universo restaura en medida exponencial lo que pareció perdido.",
        "Portador de frutos tardíos pero exquisitos. Tu cosecha vale la espera por su calidad exceptional.",
        "Navegante de la noche larga. Conoces las estrellas que solo se ven en la oscuridad profunda."
      ]
    },
    {
      coins: [false, false, true, true],
      resultados: [
        "Después del invierno doble, primavera gemela. Un periodo de escasez da paso a abundancia duplicada que sobrecompensa toda privación anterior.",
        "Doble noche oscura precede doble amanecer. La profundidad de tu oscuridad determina la intensidad de tu luz venidera, que será doblemente brillante.",
        "Resistencia prolongada abre puertas gemelas. Tu perseverancia es recompensada con acceso a bendiciones en pares que se multiplican entre sí.",
        "Pruebas duales superadas conducen a realización dual. Cada desafío vencido abre un frente de bendición, resultando en victoria compuesta.",
        "Base sólida tras doble prueba sostiene crecimiento exponencial. Los cimientos reforzados por adversidad permiten expansión spectacular.",
        "Silencio doble que precede revelación dual. La espera purifica tu capacidad de recibir mensajes múltiples simultáneamente."
      ],
      interpretaciones: [
        "Transformador de adversidad dual en beneficio múltiple. Conviertes dos desafíos en cuatro bendiciones.",
        "Maestro de la resiliencia compuesta. Superas pruebas en pares emergiendo con fuerza multiplicada.",
        "Receptor de compensación exponencial. El universo te devuelve en medida doble lo invertido en paciencia.",
        "Portador de luz tras oscuridad dual. Tu brillo es más valioso por haber conocido la penumbra prolongada.",
        "Alquimista de pruebas gemelas. Transmutas dos dificultades en ventajas complementarias.",
        "Experto en gestación prolongada con fruto múltiple. Tu espera genera cosecha abundante y variada."
      ]
    }
  ];

  private readonly mensajesFinales = [
    "Hoy es un día de transformación y crecimiento espiritual profundo. Tu alma brilla con intensidad única, atrayendo hacia ti todas las bendiciones que mereces. Confía en que el universo conspira a tu favor en cada momento.",
    "El universo te sonríe con amor infinito. Cada paso que das está guiado por fuerzas superiores que conocen tu verdadero potencial. Abraza el camino que se despliega ante ti con fe inquebrantable.",
    "La magia del cosmos se manifiesta en cada aspecto de tu vida hoy. Eres el arquitecto de tu destino y cada elección te acerca más a la versión más elevada de tu ser. Permite que la sabiduría ancestral fluya a través de ti.",
    "Tu conexión con el mundo espiritual se intensifica hoy. Los mensajes que recibes son claros y directos: confía en tu intuición, sigue tu corazón y recuerda que eres un ser divino viviendo una experiencia humana llena de propósito.",
    "El velo entre los mundos se hace más delgado para ti hoy. Aprovecha esta conexión especial para recibir guidance y claridad sobre tu misión de vida. Eres mucho más poderoso de lo que imaginas.",
    "Las energías cósmicas bailan a tu favor en este día especial. Cada latido de tu corazón está en sintonía con el ritmo del universo, guiándote hacia tu máximo potencial y más allá de lo que puedes imaginar.",
    "Hoy recibes la confirmación de que estás exactamente donde necesitas estar. Cada experiencia, cada encuentro, cada desafío es parte del plan divino para tu evolución espiritual. Confía en el proceso.",
    "El amor universal fluye a través de ti como un río de luz. Eres canal de bendiciones no solo para ti mismo sino para todos aquellos cuyo camino se cruza con el tuyo. Tu luz es faro en la oscuridad.",
    "La sabiduría ancestral resuena en cada célula de tu ser hoy. Escucha los susurros de tus antepasados espirituales, pues tienen mensajes importantes para tu camino actual. Eres el eslabón entre pasado y futuro.",
    "Tu presencia en el mundo hace una diferencia mayor de lo que crees. Cada sonrisa, cada acto de bondad, cada pensamiento positivo crea ondas de energía que transforman la realidad a tu alrededor. Eres mago de tu existencia."
  ];

  // Nueva función para interpretar secuencias complejas
  private interpretarSecuencia(secuencia: boolean[][]): { resultado: string; interpretacion: string } {
    // Contar patrones en la secuencia
    const totalLanzamientos = secuencia.length;
    const carasPorLanzamiento = secuencia[0].length;
    
    // Calcular estadísticas
    let totalCaras = 0;
    let totalCruces = 0;
    const patrones: string[] = [];
    
    secuencia.forEach(lanzamiento => {
      const caras = lanzamiento.filter(val => val).length;
      const cruces = lanzamiento.length - caras;
      totalCaras += caras;
      totalCruces += cruces;
      
      // Convertir a patrón (C para cara, X para cruz)
      const patron = lanzamiento.map(val => val ? 'C' : 'X').join('');
      patrones.push(patron);
    });
    
    const porcentajeCaras = (totalCaras / (totalLanzamientos * carasPorLanzamiento)) * 100;
    
    // Detectar patrones especiales
    const todosCaras = secuencia.every(l => l.every(v => v));
    const todosCruces = secuencia.every(l => l.every(v => !v));
    const alternanciaPerfecta = this.detectarAlternanciaPerfecta(secuencia);
    const patronCiclico = this.detectarPatronCiclico(patrones);
    
    // Interpretar según patrones detectados
    if (todosCaras) {
      return {
        resultado: "ALINEACIÓN CÓSMICA PERFECTA. Las siete esferas celestiales se alinean a tu favor en una conjunción astral sin precedentes. Tu energía magnetiza oportunidades extraordinarias en todos los ámbitos de tu existencia. Este raro fenómeno indica que estás viviendo un momento único de sincronicidad divina donde todo lo que emanas regresa multiplicado.",
        interpretacion: "Eres un canal de luz pura en este momento. Tu conexión con la fuente divina está en su punto máximo, permitiéndote manifestar con extraordinaria facilidad. Aprovecha esta ventana cósmica para proyectar tus intenciones más elevadas, pues el universo responde con un sí incondicional a tus peticiones alineadas con tu propósito superior."
      };
    }
    
    if (todosCruces) {
      return {
        resultado: "PERIODO DE GESTACIÓN PROFUNDA. El universo te invita a un retiro interior donde las semillas de tu próximo ciclo se preparan en silencio. Esta aparente quietud es en realidad la antesala de una transformación radical. Las siete puertas cerradas simultáneamente indican que toda energía debe volverse hacia dentro para germinar la próxima versión de tu ser.",
        interpretacion: "No malinterpretes el silencio como ausencia. Estás en el útero cósmico donde se gestan los mayores milagros. Este periodo de aparente inacción es requisito para la poderosa revelación que se aproxima. Confía en el proceso de gestación invisible y prepara tu vasija para contener la luz que nacerá de esta oscuridad sagrada."
      };
    }
    
    if (alternanciaPerfecta) {
      return {
        resultado: "DANZA CÓSMICA DE OPUESTOS. Yin y yang bailan en perfecta armonía en tu vida, creando un ritmo divino que equilibra acción y contemplación, avance y reflexión. Esta alternancia perfecta indica maestría en navegar los polos de la existencia sin aferrarte a extremos. El universo te muestra que el camino medio es la vía de la sabiduría.",
        interpretacion: "Eres maestro del equilibrio dinámico. No te estancas en posiciones fijas sino que fluyes con el movimiento natural del cosmos. Esta capacidad de adaptarte sin perder tu centro es tu mayor don en este ciclo. Sigue bailando con la vida, aceptando tanto los momentos de luz como de sombra como partes necesarias del todo perfecto."
      };
    }
    
    if (patronCiclico) {
      return {
        resultado: "CICLOS QUE SE REPITEN CON SABIDURÍA CRECIENTE. El universo te muestra patrones recurrentes pero con un componente evolutivo. Estás revisitando lecciones familiares pero desde un nivel de conciencia superior. Cada repetición del ciclo te acerca a la maestría completa sobre este aspecto de tu vida.",
        interpretacion: "Reconoces los patrones kármicos que se repiten pero ahora con poder transformador. Donde antes caías en automatismos, ahora ejerces consciencia plena. Este es el signo definitivo de que estás rompiendo cadenas ancestrales y escribiendo nuevo código existencial para ti y tu linaje."
      };
    }
    
    if (porcentajeCaras > 80) {
      return {
        resultado: "MAREA ALTA DE BENDICIONES. Las fuerzas cósmicas fluyen abrumadoramente a tu favor, creando una ola de oportunidades y sincronicidades favorables. Este es un periodo de manifestación acelerada donde tus pensamientos y emociones se materializan con velocidad inusual. Usa este poder con sabiduría y responsabilidad.",
        interpretacion: "Eres un imán de abundancia multidimensional. Tu frecuencia vibratoria atrae como nevera magnética todo lo que resuena con tu esencia elevada. Mantén tu vasija energetica limpia y tu intención pura, pues el poder de manifestación está potenciado exponencialmente durante este ciclo de gracia cósmica."
      };
    }
    
    if (porcentajeCaras < 20) {
      return {
        resultado: "RETIRO ESTRATÉGICO DEL MUNDO EXTERNO. El universo temporalmente redirige tu energía hacia el mundo interior para una recarga profunda y reconfiguración esencial. Esta aparente desconexión es en realidad la preparación para un relanzamiento más poderoso. Las condiciones externas se aquietan para que escuches la voz interior.",
        interpretacion: "No fighting la quietud, abrázala como el suelo fértil donde germinarán tus próximos pasos. Este repliegue táctico te permite conservar energía para cuando las condiciones externas sean más propicias. Aprovecha para profundizar en tu práctica espiritual, pues la semilla que plantas ahora determinará la cosecha venidera."
      };
    }
    
    // Si no hay patrones especiales detectados, usar interpretación basada en combinaciones individuales
    return this.interpretarCombinacionesIndividuales(secuencia);
  }

  // Función auxiliar para detectar alternancia perfecta
  private detectarAlternanciaPerfecta(secuencia: boolean[][]): boolean {
    for (let i = 1; i < secuencia.length; i++) {
      const anterior = secuencia[i-1];
      const actual = secuencia[i];
      
      // Verificar si son completamente opuestos
      const sonOpuestos = anterior.every((val, idx) => val !== actual[idx]);
      if (!sonOpuestos) return false;
    }
    return true;
  }

  // Función auxiliar para detectar patrones cíclicos
  private detectarPatronCiclico(patrones: string[]): boolean {
    if (patrones.length < 4) return false;
    
    // Buscar patrones que se repiten
    for (let ciclo = 2; ciclo <= Math.floor(patrones.length / 2); ciclo++) {
      let esCiclico = true;
      for (let i = 0; i < patrones.length - ciclo; i++) {
        if (patrones[i] !== patrones[i + ciclo]) {
          esCiclico = false;
          break;
        }
      }
      if (esCiclico) return true;
    }
    return false;
  }

  // Función para interpretar basado en combinaciones individuales
  private interpretarCombinacionesIndividuales(secuencia: boolean[][]): { resultado: string; interpretacion: string } {
    // Obtener resultados para cada lanzamiento individual
    const resultadosIndividuales = secuencia.map(lanzamiento => {
      const combinacion = this.combinaciones.find(c => 
        c.coins.length === lanzamiento.length && 
        c.coins.every((val, idx) => val === lanzamiento[idx])
      );
      
      if (!combinacion) {
        // Combinación no encontrada, usar una por defecto
        return {
          resultado: "El universo te envía un mensaje de misterio y potencial ilimitado. Esta combinación única indica que estás escribiendo un camino nuevo, libre de patrones preestablecidos. Tu destino se moldea con cada elección consciente que realizas.",
          interpretacion: "Eres pionero de realidades no exploradas. Tu camino no sigue mapas conocidos sino que los creas con cada paso. Esta singularidad es tu poder principal, permitiéndote acceso a dimensiones de posibilidad que otros ni siquiera vislumbran."
        };
      }
      
      // Seleccionar aleatoriamente uno de los resultados e interpretaciones
      const indiceAleatorio = Math.floor(Math.random() * combinacion.resultados.length);
      return {
        resultado: combinacion.resultados[indiceAleatorio],
        interpretacion: combinacion.interpretaciones[indiceAleatorio]
      };
    });
    
    // Combinar los resultados individuales en un mensaje coherente
    const resultadoCombinado = this.combinarResultados(resultadosIndividuales.map(r => r.resultado));
    const interpretacionCombinada = this.combinarInterpretaciones(resultadosIndividuales.map(r => r.interpretacion));
    
    return {
      resultado: resultadoCombinado,
      interpretacion: interpretacionCombinada
    };
  }

  // Función para combinar resultados individuales en un mensaje coherente
  private combinarResultados(resultados: string[]): string {
    // Aquí iría la lógica para combinar los resultados de cada lanzamiento
    // en un mensaje coherente y fluido
    
    return `SECUENCIA CÓSMICA ÚNICA. Tu serie de lanzamientos revela un patrón divino especialmente diseñado para tu evolución actual. ${resultados[0]} ${resultados[2]} Además, ${resultados[4].toLowerCase()} Finalmente, ${resultados[6].toLowerCase()} Esta combinación única señala que estás en un punto de inflexión donde decisiones conscientes crearán olas de transformación en todos los aspectos de tu vida.`;
  }

  // Función para combinar interpretaciones individuales
  private combinarInterpretaciones(interpretaciones: string[]): string {
    // Lógica similar para combinar interpretaciones
    
    return `SÍNTESIS DE DONES ESPIRITUALES. Tu camino integra múltiples talentos: ${interpretaciones[0].toLowerCase()} ${interpretaciones[3].toLowerCase()} Además, ${interpretaciones[5].toLowerCase()} Esta combinación única de habilidades te posiciona como canal de energías raras y poderosas que pueden transformar realidades.`;
  }

  // Función principal para interpretar lanzamientos (manteniendo compatibilidad)
  async interpretar(tiros: string, type: string, userId: string): Promise<any> {
    try {
      // Convertir el string de tiros a array de arrays booleanos
      const secuencia = this.parsearTiros(tiros);
      
      // Obtener interpretación de la secuencia completa
      const interpretacionCompleta = this.interpretarSecuencia(secuencia);
      
      // Obtener interpretaciones individuales para cada lanzamiento
      const pasos: PasoResultado[] = [];
      secuencia.forEach((lanzamiento, index) => {
        const combinacion = this.combinaciones.find(c => 
          c.coins.length === lanzamiento.length && 
          c.coins.every((val, idx) => val === lanzamiento[idx])
        );
        
        if (combinacion) {
          const indiceAleatorio = Math.floor(Math.random() * combinacion.resultados.length);
          pasos.push({
            paso: index + 1,
            combinacion: lanzamiento.map(val => val ? 'Cara' : 'Cruz').join(' - '),
            resultado: combinacion.resultados[indiceAleatorio],
            interpretacion: combinacion.interpretaciones[indiceAleatorio]
          });
        } else {
          // Para combinaciones no definidas
          pasos.push({
            paso: index + 1,
            combinacion: lanzamiento.map(val => val ? 'Cara' : 'Cruz').join(' - '),
            resultado: "El universo te habla a través de esta combinación única. Tu camino es singular y no sigue patrones convencionales. Esta rareza es tu mayor don, permitiéndote acceso a dimensiones de conciencia poco exploradas.",
            interpretacion: "Eres creador de nuevos patrones cósmicos. Donde otros siguen caminos trillados, tú abres sendero virgen. Esta capacidad de innovación espiritual es tu contribución única al tapiz colectivo de la evolución humana."
          });
        }
      });
      
      // Seleccionar mensaje final aleatorio
      const mensajeFinal = this.mensajesFinales[
        Math.floor(Math.random() * this.mensajesFinales.length)
      ];
      
      // Crear respuesta unificada
      const parrafoUnificado = `${interpretacionCompleta.resultado} ${mensajeFinal}`;
      
      // Guardar en base de datos
      const evaluation = await this.prisma.evaluation.create({
        data: {
          userId,
          type,
          result: parrafoUnificado,
          throws: tiros,
          fullResult: JSON.stringify({
            parrafoUnificado,
            mensajeFinal,
            pasos,
            interpretacionCompleta: interpretacionCompleta.interpretacion
          })
        }
      });
      
      return {
        success: true,
        data: {
          evaluationId: evaluation.id,
          parrafoUnificado,
          mensajeFinal,
          pasos,
          interpretacionCompleta: interpretacionCompleta.interpretacion
        }
      };
      
    } catch (error) {
      console.error('Error en interpretar:', error);
      throw new Error('Error interpreting throws');
    }
  }

  // Función para parsear el string de tiros a array de arrays booleanos
  private parsearTiros(tiros: string): boolean[][] {
    // Implementar lógica para convertir el string a la estructura necesaria
    // Esto depende de cómo se estén almacenando los tiros actualmente
    
    // Ejemplo de implementación (ajustar según formato real)
    return tiros.split(';').map(tiro => 
      tiro.split(',').map(val => val === 'true')
    );
  }
}
