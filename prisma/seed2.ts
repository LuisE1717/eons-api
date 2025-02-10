import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const type = 'evaluacion-etapa2';
  const segmento1 = [
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente consciente. Eso lo sabemos por su capacidad para reconocer y comprender sus propias emociones, lo que le permite navegar situaciones complejas con una sensibilidad excepcional. Usted conecta genuinamente con quienes le rodean, percibiendo tanto las palabras como los matices emocionales que las acompañan. Esta empatía facilita su comunicación y fortalece sus relaciones. Además, entiende que no todas las emociones requieren una respuesta inmediata, valorando la pausa reflexiva como un camino hacia el equilibrio y la autocomprensión.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente dependiente. Eso lo sabemos por su tendencia a buscar constantemente la validación y apoyo de los demás para sentirse completo. Su bienestar emocional a menudo está ligado a las opiniones y acciones de quienes le rodean. Esta dependencia puede llevarle a sentir ansiedad cuando no recibe la atención deseada, generando inseguridad en sus relaciones. Aunque esta búsqueda de conexión puede enriquecer su vida, también puede dificultar su crecimiento personal.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona estable emocionalmente. Eso lo sabemos por su capacidad para manejar el estrés y las adversidades con serenidad. Su enfoque equilibrado le permite tomar decisiones informadas sin dejarse llevar por impulsos emocionales. Las personas a su alrededor suelen buscar su apoyo, confiando en su habilidad para mantener la calma. Esta estabilidad le permite disfrutar de relaciones saludables y satisfactorias, contribuyendo a un ambiente armonioso.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona apática emocionalmente. Eso lo sabemos por su relación distante y desinteresada con las emociones, lo que genera una falta de conexión tanto con sus propios sentimientos como con los de quienes le rodean. Esta apatía le proporciona un refugio, pero a menudo a costa de una profunda experiencia emocional. Puede preguntarse si hay algo más allá de la superficie, anhelando una chispa de entusiasmo o una conexión genuina. Aunque esta experiencia puede ser un espacio seguro, a veces le impide disfrutar de las pequeñas alegrías de la vida.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona insegura emocionalmente. Eso lo sabemos por su tendencia a dudar de sí mismo y cuestionar sus decisiones. Esta inseguridad puede manifestarse en su búsqueda constante de aprobación y en la dificultad para establecer límites saludables. A menudo se siente vulnerable en situaciones sociales, lo que puede llevarle a evitar interacciones que le incomodan. Aunque su deseo de ser aceptado es comprensible, esta lucha interna puede impedirle alcanzar su verdadero potencial.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona negativa emocionalmente. Eso lo sabemos por su inclinación a enfocarse en lo adverso en vez de en lo positivo. Su perspectiva tiende a ser crítica, lo que puede nublar su capacidad para disfrutar de las experiencias cotidianas. Esta negatividad puede generar tensiones en sus relaciones, ya que los demás pueden sentirse desmotivados por su actitud. Aunque esta forma de ver el mundo puede ofrecer una sensación de protección, a menudo le impide experimentar la gratitud y el optimismo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona positiva emocionalmente. Eso lo sabemos por su habilidad para ver el lado bueno de las cosas, incluso en situaciones difíciles. Su optimismo es contagioso y suele elevar el ánimo de quienes le rodean. Esta actitud positiva le ayuda a enfrentar desafíos con una mentalidad constructiva, lo que a su vez fomenta relaciones sanas y satisfactorias. Su capacidad para apreciar las pequeñas alegrías de la vida enriquece su experiencia cotidiana.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona reservada emocionalmente. Eso lo sabemos por su tendencia a mantener sus sentimientos y pensamientos en privado, prefiriendo observar en lugar de participar activamente en interacciones emocionales. Aunque esta reserva puede ofrecerle un sentido de protección, a menudo dificulta la conexión genuina con los demás. Su naturaleza introspectiva le permite reflexionar profundamente, pero también puede llevarle a sentirse aislado en momentos de necesidad emocional.',
    },

    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona desapegada emocionalmente. Eso lo sabemos por su capacidad para mantener una cierta distancia emocional en sus relaciones. Este desapego puede resultar en una sensación de libertad, pero también puede dificultar conexiones profundas con los demás. Aunque disfruta de su independencia, puede preguntarse si se está privando de experiencias enriquecedoras al evitar el compromiso emocional. Su enfoque racional a menudo predomina sobre las emociones, lo que le permite navegar la vida con lógica.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente voluble. Eso lo sabemos por su experiencia de un vaivén emocional que a menudo le deja sintiéndose como un barco a la deriva. Sus sentimientos cambian rápidamente, lo que puede dificultarle tomar decisiones firmes o mantener compromisos. Aunque esta fluidez emocional le permite adaptarse, a veces genera confusión en sus relaciones. Sus cambios repentinos de estado de ánimo pueden sorprender a los demás, pero también le brindan una creatividad única y una perspectiva fresca en situaciones que otros podrían encontrar rígidas.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente racional. Eso lo sabemos por su tendencia a analizar y desglosar sus emociones con una lógica precisa. Aunque reconoce y siente sus emociones, a menudo opta por abordarlas desde una perspectiva analítica. Este enfoque le permite manejar situaciones complicadas con claridad, pero a veces puede llevarle a reprimir sus sentimientos más intensos. Su capacidad para mantener la objetividad en momentos críticos es una fortaleza, pero puede costarle en la conexión emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente empática. Eso lo sabemos por su habilidad para ponerse en el lugar de los demás y comprender sus emociones de manera profunda. Su empatía natural le permite crear conexiones significativas con quienes le rodean, lo que a menudo facilita la comunicación y el entendimiento. Sin embargo, esta capacidad también puede resultar abrumadora, ya que puede absorber las emociones de los demás, lo que requiere que establezca límites saludables para su propio bienestar.',
    },

    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona explosiva emocionalmente. Eso lo sabemos por su tendencia a experimentar reacciones emocionales intensas y repentinas. Estos estallidos pueden surgir en momentos de frustración o alegría extrema, sorprendiendo a quienes le rodean. Aunque su pasión puede ser contagiosa, a menudo le resulta difícil controlar estas explosiones, lo que puede generar tensiones en sus relaciones. A medida que aprende a gestionar estas emociones, puede encontrar formas más saludables de expresarlas.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente neutral. Eso lo sabemos por su habilidad para mantenerse en un estado de calma y equilibrio, independientemente de las circunstancias. Su enfoque equilibrado le permite manejar situaciones estresantes sin ser arrastrado por emociones intensas. Aunque esta neutralidad le proporciona una ventaja en la toma de decisiones, a veces puede llevarle a ser percibido como distante o desinteresado por aquellos que desean una conexión más emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente retraída. Eso lo sabemos por su tendencia a evitar situaciones sociales y emocionales, prefiriendo la soledad o la compañía de un pequeño grupo cercano. Esta retirada puede ofrecerle un refugio seguro, pero también puede llevarle a perder oportunidades de conexión y crecimiento personal. Su naturaleza introspectiva puede enriquecer su vida, pero a veces necesita recordar la importancia de abrirse a los demás.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente reprimida. Eso lo sabemos por su tendencia a suprimir sus sentimientos y evitar expresar emociones profundas. Esta represión puede ofrecerle una sensación de control, pero a menudo conduce a una acumulación de tensión interna. Aunque puede sentirse cómodo manteniendo las cosas en un plano superficial, puede descubrir que esta estrategia le impide experimentar conexiones genuinas con los demás y disfrutar de una vida emocional más rica.',
    },

    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente curiosa. Eso lo sabemos por su deseo constante de explorar y entender sus propias emociones y las de los demás. Esta curiosidad le lleva a hacer preguntas profundas y a reflexionar sobre sus sentimientos y experiencias. Su interés por comprender las complejidades de la emocionalidad le permite enriquecer sus relaciones y crecer personalmente. A menudo busca nuevas formas de experimentar y procesar emociones, lo que le da una perspectiva única y valiosa en sus interacciones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente impulsiva. Eso lo sabemos por su tendencia a actuar según sus emociones sin pensar en las consecuencias. Este enfoque espontáneo puede llevarle a experiencias emocionantes, pero también puede resultar en decisiones apresuradas que podría lamentar más tarde. Aunque su energía emocional puede ser contagiosa, a veces le cuesta encontrar el equilibrio entre la acción y la reflexión, lo que puede causar conflictos en sus relaciones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente reflexiva. Eso lo sabemos por su tendencia a tomarse el tiempo para considerar sus emociones y reacciones. Esta capacidad de introspección le permite aprender de sus experiencias y ajustar su comportamiento en consecuencia. Valora la autocomprensión y a menudo busca formas de crecer emocionalmente. Su habilidad para reflexionar no solo le beneficia a usted, sino que también puede inspirar a otros a hacer lo mismo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente adaptable. Eso lo sabemos por su capacidad para ajustarse a las emociones y situaciones cambiantes con facilidad. Esta flexibilidad emocional le permite enfrentar desafíos y transiciones sin sentirse abrumado. Su enfoque adaptable le ayuda a encontrar soluciones creativas y a mantener relaciones saludables, ya que puede entender y responder a las necesidades emocionales de los demás de manera efectiva.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente agobiada. Eso lo sabemos por su tendencia a sentirse abrumado por las emociones y situaciones de la vida diaria. Esta sensación de agobio puede llevarle a experimentar estrés y ansiedad, dificultando su capacidad para tomar decisiones y disfrutar de las actividades cotidianas. Aunque es natural sentirse así en momentos de presión, es importante que busque formas de aliviar esta carga emocional para recuperar el equilibrio.',
    },

    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente resiliente. Eso lo sabemos por su habilidad para recuperarse de las adversidades y aprender de ellas. Su fortaleza emocional le permite enfrentar los desafíos con optimismo y determinación, convirtiendo las dificultades en oportunidades de crecimiento personal. Esta resiliencia no solo le beneficia a usted, sino que también inspira a quienes le rodean a enfrentar sus propias luchas con coraje y esperanza.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente auténtica. Eso lo sabemos por su compromiso con ser fiel a sí mismo y a sus sentimientos. No teme expresar su verdad, lo que crea un ambiente de confianza y apertura en sus relaciones. Su autenticidad atrae a otros, ya que las personas valoran su honestidad y vulnerabilidad. Este enfoque genuino le permite conectar a un nivel más profundo y disfrutar de interacciones significativas.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente vulnerable. Eso lo sabemos por su disposición a abrirse y compartir sus emociones más profundas con los demás. Esta vulnerabilidad puede ser una fortaleza, ya que fomenta conexiones genuinas y permite que otros se sientan seguros para hacer lo mismo. Sin embargo, también puede sentir temor al ser herido, por lo que es importante encontrar un equilibrio entre la apertura y la protección de su bienestar emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente cautelosa. Eso lo sabemos por su tendencia a ser precavido en sus interacciones y decisiones emocionales. Prefiere evaluar las situaciones antes de involucrarse, lo que le ayuda a evitar sorpresas desagradables. Aunque esta cautela puede protegerle de situaciones complicadas, a veces puede impedirle disfrutar de nuevas experiencias. Es importante encontrar el equilibrio entre la prudencia y la apertura a lo desconocido.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente asertiva. Eso lo sabemos por su capacidad para expresar sus sentimientos y necesidades de manera clara y respetuosa. Esta habilidad le permite defender sus derechos y establecer límites saludables en sus relaciones. Su asertividad contribuye a una comunicación efectiva y a la resolución de conflictos, ayudándole a construir relaciones equilibradas y satisfactorias.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona intensamente conectada emocionalmente. Eso lo sabemos por su capacidad para experimentar emociones profundas y significativas en sus relaciones. Esta intensidad emocional le permite formar lazos fuertes y duraderos, pero a veces puede sentirse abrumado por la profundidad de sus sentimientos. Su conexión emocional con los demás es una parte vital de su vida, y es fundamental que aprenda a gestionar esta intensidad para mantener el equilibrio.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente templada. Eso lo sabemos por su capacidad para mantener la calma y la ecuanimidad, incluso en situaciones emocionalmente cargadas. Su enfoque equilibrado le permite evaluar las circunstancias con claridad, lo que facilita la toma de decisiones racionales. Aunque su temperamento tranquilo es una fortaleza, es importante que no suprima completamente sus emociones, ya que expresar lo que siente también es esencial para su bienestar.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente inquieta. Eso lo sabemos por su constante búsqueda de estímulos y cambios en su entorno emocional. A menudo siente una necesidad de movimiento y de experimentar nuevas emociones, lo que le lleva a participar en diversas actividades y relaciones. Aunque esta inquietud puede enriquecer su vida, también puede dificultar la estabilidad en sus conexiones. Aprender a equilibrar su deseo de novedad con la profundidad de las relaciones puede ser beneficioso.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente idealista. Eso lo sabemos por su capacidad para visualizar un mundo mejor y su deseo de contribuir a ello. Su idealismo le impulsa a luchar por causas que le apasionan y a perseguir metas significativas. Sin embargo, esta perspectiva puede llevarle a sentirse frustrado ante la realidad, especialmente si las cosas no van como usted desea. Aprender a encontrar satisfacción en los pequeños logros y la realidad puede ayudarle a mantener su motivación.',
    },

    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente inquisitiva. Eso lo sabemos por su deseo constante de entender las emociones y motivaciones de los demás. Su curiosidad le lleva a hacer preguntas profundas y a buscar la verdad detrás de las apariencias. Esta inclinación a explorar el mundo emocional enriquece sus relaciones, pero a veces puede hacerle sentir abrumado por la complejidad de las emociones humanas. Encontrar un equilibrio entre la indagación y la aceptación de lo desconocido puede ser clave para su bienestar.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente protectora. Eso lo sabemos por su impulso a cuidar y defender a los demás, especialmente a aquellos que le importan. Su naturaleza protectora a menudo le lleva a estar atento a las necesidades emocionales de quienes le rodean. Sin embargo, esta necesidad de proteger puede generar estrés si siente que no puede ayudar a todos. Es importante que también priorice su bienestar emocional y encuentre un equilibrio entre cuidar de los demás y cuidarse a sí mismo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente autodirigida. Eso lo sabemos por su capacidad para gestionar sus emociones de manera efectiva y tomar el control de su vida. Este comportamiento autodirigible le permite establecer objetivos claros y trabajar hacia ellos con determinación. A menudo toma decisiones basadas en sus propios valores y prioridades, lo que contribuye a una vida satisfactoria. Su independencia emocional le permite crecer y desarrollarse sin depender excesivamente de los demás.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente vulnerable. Eso lo sabemos por su disposición a abrirse a los demás y compartir sus sentimientos más profundos. Esta vulnerabilidad puede ser una fortaleza, ya que fomenta conexiones genuinas y permite que otros se sientan seguros para hacer lo mismo. Sin embargo, también puede sentir temor al ser herido, por lo que es importante encontrar un equilibrio entre la apertura y la protección de su bienestar emocional.',
    },

    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente distraída. Eso lo sabemos por su tendencia a perderse en pensamientos o preocupaciones, lo que a menudo le impide conectarse plenamente con el presente. Esta distracción puede dificultar su capacidad para disfrutar de las experiencias cotidianas y puede llevarle a sentir ansiedad. Aunque es natural tener momentos de distracción, es importante encontrar técnicas que le ayuden a centrar su atención y disfrutar del aquí y el ahora.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente solitaria. Eso lo sabemos por su sensación de desconexión con los demás, a pesar de estar rodeado de personas. Esta soledad emocional puede ser profunda y puede llevarle a anhelar conexiones más significativas. Aunque puede disfrutar de su propia compañía, a veces se siente aislado y busca maneras de abrirse a los demás. Reconocer esta necesidad puede ser el primer paso para buscar relaciones más satisfactorias.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente frustrada. Eso lo sabemos por su lucha constante contra obstáculos que parecen inalcanzables. Esta frustración puede manifestarse en el trabajo, en las relaciones o en su vida personal, a menudo dejándole sintiéndose impotente. A medida que enfrenta estas barreras, es importante que encuentre maneras de liberar esta tensión emocional y buscar apoyo cuando lo necesite. La autocompasión puede ser clave para transformar esta frustración en motivación.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente excitada. Eso lo sabemos por su entusiasmo por nuevas experiencias y la energía positiva que irradia. Su capacidad para sentir una intensa alegría y emoción le permite disfrutar de la vida al máximo. Sin embargo, esta excitación puede ser difícil de manejar en momentos de calma, ya que puede experimentar una sensación de vacío cuando la adrenalina disminuye. Aprender a encontrar satisfacción en lo cotidiano puede ayudarle a equilibrar esta energía.',
    },

    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente sensible. Eso lo sabemos por su profunda capacidad de sentir y experimentar emociones. Su sensibilidad puede hacerle más receptivo a las necesidades de los demás, pero también puede dejarle vulnerable a la sobrecarga emocional. Esta conexión intensa con el mundo que le rodea es una fuerza que puede enriquecer su vida, pero es importante que establezca límites para proteger su bienestar emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente entusiasta. Eso lo sabemos por su pasión y energía en todo lo que hace. Su entusiasmo es contagioso y puede motivar a otros a unirse a su visión. Sin embargo, a veces puede ser desafiante mantener este nivel de energía frente a la adversidad. Reconocer momentos en los que es necesario descansar y reponer fuerzas le ayudará a mantener su vitalidad a largo plazo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente afligida. Eso lo sabemos por su experiencia de dolor y sufrimiento que a menudo puede hacerle sentir abrumado. Esta aflicción puede surgir de diversas circunstancias, como la pérdida, el cambio o las relaciones difíciles. Aunque es esencial reconocer y procesar estos sentimientos, también es importante buscar apoyo y recursos que le ayuden a sanar y encontrar la paz.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente cautivadora. Eso lo sabemos por su habilidad para atraer y mantener la atención de los demás con su carisma. Su presencia y energía a menudo inspiran a quienes le rodean, creando un ambiente vibrante. Sin embargo, es importante recordar que esta habilidad puede venir acompañada de la responsabilidad de ser un modelo a seguir y de cuidar las emociones de quienes se sienten atraídos por usted.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente transformadora. Eso lo sabemos por su capacidad para catalizar cambios significativos en su vida y en la de los demás. Esta habilidad para transformar situaciones adversas en oportunidades de crecimiento es una cualidad admirable. Sin embargo, es crucial que también se permita vivir el proceso de transformación sin apresurarse, reconociendo cada paso como parte del viaje.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente compasiva. Eso lo sabemos por su tendencia a mostrar empatía y apoyo a los demás, especialmente en momentos de dificultad. Su compasión le permite ser una fuente de consuelo y ayuda para quienes le rodean, pero a veces puede llevarle a descuidar sus propias necesidades emocionales. Es fundamental que encuentre un equilibrio entre cuidar de los demás y cuidar de sí mismo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente eufórica. Eso lo sabemos por su capacidad para experimentar un profundo sentido de alegría y felicidad en su vida diaria. Esta euforia le impulsa a buscar experiencias que le hagan sentir bien y a compartir esa alegría con quienes le rodean. Sin embargo, a veces puede resultar desafiante mantener este nivel de felicidad frente a las adversidades. Aprender a cultivar la gratitud en momentos de calma puede ayudarle a mantener este estado de bienestar.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente serena. Eso lo sabemos por su habilidad para encontrar paz interior y equilibrio en medio del caos. Su serenidad le permite enfrentar los desafíos de la vida con calma y compostura, lo que inspira a quienes le rodean. Aunque esta tranquilidad es una fortaleza, también es importante que se permita sentir y expresar sus emociones de manera auténtica.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente determinada. Eso lo sabemos por su firmeza y dedicación para alcanzar sus objetivos. Esta determinación le impulsa a trabajar arduamente y a superar obstáculos con perseverancia. Sin embargo, es importante que se tome el tiempo para reflexionar sobre su bienestar emocional y asegurarse de que está cuidando de sí mismo en el camino hacia el éxito.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente amargada. Eso lo sabemos por su tendencia a sentir resentimiento y frustración debido a experiencias pasadas. Esta amargura puede nublar su visión del futuro y dificultar la creación de nuevas conexiones. Aunque es natural sentir dolor por el pasado, es esencial buscar formas de liberar estos sentimientos para permitir un crecimiento emocional positivo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente reflexiva. Eso lo sabemos por su tendencia a pensar profundamente sobre sus experiencias y emociones. Esta reflexión le permite aprender de cada situación y crecer personalmente, pero a veces puede llevarle a quedarse atrapado en sus propios pensamientos. Encontrar un equilibrio entre la reflexión y la acción es clave para su bienestar emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente frenética. Eso lo sabemos por su ritmo acelerado y la manera en que aborda la vida con una energía incesante. Aunque este enfoque dinámico puede llevarle a lograr mucho, también puede resultar en agotamiento. Es esencial que encuentre momentos de calma y pausa para recargar energías y mantener su bienestar emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente lúgubre. Eso lo sabemos por su tendencia a ver la vida a través de una lente oscura, a menudo sintiéndose desanimado o triste. Esta melancolía puede dificultar su capacidad para disfrutar de momentos felices y puede afectar sus relaciones. Reconocer y procesar estas emociones es esencial para encontrar una forma de sanar y volver a conectar con la alegría.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente satisfecha. Eso lo sabemos por su habilidad para encontrar satisfacción en las pequeñas cosas de la vida. Su enfoque positivo le permite disfrutar de las experiencias cotidianas y apreciar lo que tiene. Sin embargo, es importante que no se sienta complacido en exceso, ya que seguir buscando el crecimiento personal puede enriquecer aún más su vida.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente escéptica. Eso lo sabemos por su tendencia a cuestionar y dudar de las intenciones de los demás. Este escepticismo puede ayudarle a protegerse de decepciones, pero a veces puede dificultar la formación de relaciones profundas. Aprender a equilibrar la desconfianza con la apertura puede ayudarle a establecer conexiones más significativas.',
    },

    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente juguetona. Eso lo sabemos por su inclinación a buscar la diversión y la alegría en la vida cotidiana. Su actitud juguetona no solo le ayuda a disfrutar del momento, sino que también puede hacer que quienes le rodean se sientan más alegres y relajados. Sin embargo, es importante que también reconozca momentos en los que se requiere seriedad y madurez, encontrando un equilibrio entre el juego y la responsabilidad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente melancólica. Eso lo sabemos por su tendencia a sentir nostalgia y una profunda conexión con el pasado. Esta melancolía puede manifestarse en recuerdos entrañables, pero también puede generar tristeza y añoranza. Aunque es natural sentir nostalgia por momentos pasados, es importante que aprenda a vivir en el presente y a encontrar la belleza en lo que está por venir.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente apasionada. Eso lo sabemos por su entusiasmo y fervor por las cosas que le importan. Su pasión es contagiosa y puede inspirar a otros a unirse a su causa o visión. Sin embargo, esta intensidad emocional puede llevarle a experimentar frustración cuando las cosas no salen como espera. Aprender a manejar esta pasión y canalizarla de manera constructiva será clave para su bienestar emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente cautelosa. Eso lo sabemos por su tendencia a evaluar las situaciones antes de actuar. Esta precaución puede ayudarle a evitar problemas, pero a veces puede impedirle aprovechar oportunidades. Es fundamental que encuentre un equilibrio entre la cautela y la disposición a correr riesgos, permitiéndose explorar nuevas experiencias sin temor.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente fiel. Eso lo sabemos por su lealtad a las personas y los valores que considera importantes. Su compromiso con los demás le permite construir relaciones duraderas y significativas. Sin embargo, esta fidelidad puede hacerle sentir inseguro si siente que no se corresponde. Es esencial que también se asegure de que sus propias necesidades emocionales sean atendidas en sus relaciones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente desafiante. Eso lo sabemos por su disposición a enfrentar situaciones difíciles y a cuestionar el statu quo. Su capacidad para desafiar las normas y los límites le permite crecer y evolucionar, pero también puede generar conflictos con los demás. Es fundamental que aprenda a canalizar esta energía de manera constructiva y a fomentar un diálogo abierto en lugar de confrontaciones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente apática. Eso lo sabemos por su falta de interés o motivación hacia las emociones y experiencias de la vida. Esta apatía puede hacer que se sienta desconectado y distante, dificultando la formación de relaciones significativas. Reconocer esta sensación y buscar maneras de reavivar su interés por la vida puede ser un paso importante hacia una mayor satisfacción emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente vital. Eso lo sabemos por su energía y entusiasmo por la vida. Su vitalidad le permite disfrutar de cada momento y enfrentar los desafíos con determinación. Sin embargo, esta energía puede hacer que sea fácil pasar por alto el autocuidado. Es importante que encuentre momentos de descanso y reflexión para mantener su bienestar emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente esperanzada. Eso lo sabemos por su capacidad para mantener una actitud positiva incluso en tiempos difíciles. Su esperanza le impulsa a seguir adelante y a buscar lo mejor en las situaciones. Sin embargo, es esencial que esta esperanza se base en acciones realistas y concretas, para que no se convierta en una simple ilusión.',
    },
    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente mística. Eso lo sabemos por su tendencia a buscar significados más profundos y conexiones espirituales en sus experiencias. Esta búsqueda de la trascendencia le permite encontrar belleza y significado en la vida cotidiana. Sin embargo, es importante que también se mantenga anclado en la realidad y no pierda de vista lo tangible mientras busca lo etéreo.',
    },

    {
      type,
      language: 'es',
      segmentKey: '1',
      content:
        'Luego de analizar su estado emocional, podemos ver que usted es una persona emocionalmente valiente. Eso lo sabemos por su disposición a enfrentar el miedo y a actuar a pesar de la incertidumbre. Esta valentía emocional le permite abordar desafíos que otros podrían evitar y crecer a través de la adversidad. Su capacidad para ser valiente inspira a quienes le rodean, y es fundamental que continúe cultivando esta fortaleza mientras también se cuida a sí mismo.',
    },
  ];

  const segmento2 = [
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de realizar ejercicio regularmente. Eso lo sabemos por su compromiso constante con la actividad física, ya sea caminando, corriendo o en el gimnasio. Este hábito no solo mejora su salud física, sino que también refuerza su bienestar emocional, ayudándole a liberar tensiones y aumentar su energía diaria.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de meditar diariamente. Eso lo sabemos por su dedicación a encontrar momentos de tranquilidad y reflexión en su vida. Esta práctica le permite reducir el estrés y cultivar la atención plena, brindándole una mayor claridad mental y una conexión más profunda consigo mismo y con su entorno.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de leer de manera constante. Eso lo sabemos por su curiosidad intelectual y su deseo de aprender algo nuevo cada día. Este hábito no solo enriquece su conocimiento, sino que también estimula su creatividad y le permite escapar a mundos diferentes, alimentando así su mente y su imaginación.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de escribir un diario. Eso lo sabemos por su tendencia a reflexionar sobre sus experiencias y emociones en un formato escrito. Este hábito le ayuda a procesar sus pensamientos, aclarar sus sentimientos y mantener un registro de su crecimiento personal a lo largo del tiempo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de mantener una alimentación saludable. Eso lo sabemos por su enfoque en elegir alimentos nutritivos y equilibrados. Este hábito no solo le proporciona energía, sino que también mejora su bienestar general, haciéndolo sentir más ligero y vital en su vida cotidiana.',
    },

    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de establecer metas diarias. Eso lo sabemos por su tendencia a organizar su día en función de objetivos claros y alcanzables. Este hábito no solo le proporciona una dirección, sino que también le brinda una sensación de logro al completar cada tarea, impulsando su motivación personal.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar la gratitud. Eso lo sabemos por su esfuerzo consciente en reconocer y apreciar las cosas buenas en su vida. Este hábito le ayuda a cultivar una mentalidad positiva y a mejorar su bienestar emocional, ya que fomenta una mayor satisfacción y felicidad en su día a día.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de pasar tiempo en la naturaleza. Eso lo sabemos por su preferencia por actividades al aire libre, ya sea caminando, haciendo senderismo o simplemente disfrutando de un parque. Este hábito le conecta con el entorno natural, aportando calma y claridad a su mente.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de aprender nuevas habilidades. Eso lo sabemos por su entusiasmo en participar en cursos o talleres que le permiten expandir su conocimiento. Este hábito no solo fomenta su crecimiento personal, sino que también mantiene su mente activa y comprometida con el aprendizaje continuo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de desconectar de la tecnología. Eso lo sabemos por su esfuerzo por limitar el tiempo frente a pantallas y disfrutar de momentos sin distracciones digitales. Este hábito le permite reconectar con el mundo real y con las personas que le rodean, fortaleciendo sus relaciones interpersonales.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar la escucha activa. Eso lo sabemos por su enfoque en entender y conectar con los demás durante las conversaciones. Este hábito no solo mejora su comunicación, sino que también fomenta relaciones más profundas y significativas, mostrando que valora a quienes le rodean.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de mantener la organización. Eso lo sabemos por su capacidad para crear y seguir sistemas que le permitan tener un entorno ordenado. Este hábito le ayuda a reducir el estrés, aumentar su productividad y encontrar lo que necesita con facilidad, facilitando su día a día.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de reflexionar antes de actuar. Eso lo sabemos por su tendencia a considerar las implicaciones de sus decisiones antes de tomar una acción. Este hábito no solo promueve la toma de decisiones más informadas, sino que también ayuda a evitar reacciones impulsivas que pueden resultar en arrepentimientos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de hacer networking. Eso lo sabemos por su capacidad para establecer conexiones con personas de diversos ámbitos. Este hábito no solo amplía su red de contactos, sino que también abre puertas a nuevas oportunidades y colaboraciones, enriqueciendo tanto su vida profesional como personal.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar actividades creativas. Eso lo sabemos por su entusiasmo por involucrarse en actividades como la pintura, la música o la escritura. Este hábito no solo le permite expresar su individualidad, sino que también proporciona una salida para el estrés y fomenta una mayor satisfacción personal.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de hacer trabajo voluntario. Eso lo sabemos por su dedicación a ayudar a otros y contribuir a su comunidad. Este hábito no solo beneficia a quienes reciben su ayuda, sino que también le brinda un profundo sentido de propósito y conexión con el mundo que le rodea.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar el autocuidado. Eso lo sabemos por su dedicación a cuidar de su bienestar físico y emocional. Este hábito incluye actividades como relajarse, cuidar su salud y asegurarse de que sus necesidades personales sean atendidas, lo que contribuye a una vida más equilibrada.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de disfrutar de momentos en silencio. Eso lo sabemos por su preferencia por espacios tranquilos y momentos de introspección. Este hábito le ayuda a recargar energías y a encontrar claridad mental, permitiéndole enfrentar los desafíos del día con una mente renovada.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de mantener un espacio limpio. Eso lo sabemos por su compromiso con la limpieza y el orden en su hogar o lugar de trabajo. Este hábito no solo promueve un ambiente agradable, sino que también contribuye a su bienestar mental, al reducir el desorden y la distracción.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de invertir en su crecimiento personal. Eso lo sabemos por su dedicación a asistir a cursos, leer libros o participar en actividades que fomenten su desarrollo. Este hábito no solo le proporciona nuevas habilidades, sino que también le ayuda a alcanzar su potencial pleno y a sentirse más realizado.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de celebrar los éxitos. Eso lo sabemos por su capacidad de reconocer y festejar sus logros, grandes o pequeños. Este hábito no solo refuerza su motivación, sino que también le ayuda a cultivar una mentalidad positiva, agradeciendo el esfuerzo que ha puesto en alcanzar sus metas.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de establecer una rutina nocturna. Eso lo sabemos por su esfuerzo por crear un ambiente relajante antes de dormir. Este hábito le ayuda a mejorar la calidad de su sueño, preparándolo para un nuevo día con mayor energía y enfoque.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de reflexionar sobre sus experiencias. Eso lo sabemos por su tendencia a considerar lo aprendido en cada situación vivida. Este hábito le permite crecer y evolucionar, transformando las lecciones del pasado en oportunidades para mejorar en el futuro.',
    },

    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de compartir tiempo con amigos y familia. Eso lo sabemos por su dedicación a fortalecer esos lazos a través de actividades juntos. Este hábito no solo nutre sus relaciones personales, sino que también aporta.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de cuidar su salud mental. Eso lo sabemos por su enfoque en actividades que promueven su bienestar psicológico, como la meditación, la terapia o el tiempo de calidad con seres queridos. Este hábito le permite gestionar el estrés y las emociones, contribuyendo a una vida más equilibrada y satisfactoria.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar la paciencia. Eso lo sabemos por su capacidad para esperar y reflexionar antes de reaccionar ante situaciones difíciles. Este hábito le ayuda a abordar los desafíos con calma, promoviendo una toma de decisiones más considerada y evitando conflictos innecesarios.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de cocinar en casa. Eso lo sabemos por su preferencia por preparar comidas saludables y deliciosas en lugar de depender de la comida rápida. Este hábito no solo mejora su nutrición, sino que también le permite experimentar la creatividad y disfrutar de momentos gratificantes en la cocina.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar el minimalismo. Eso lo sabemos por su enfoque en simplificar su vida y deshacerse de lo innecesario. Este hábito le ayuda a reducir el desorden tanto físico como mental, permitiéndole centrarse en lo que realmente importa y disfrutar de una vida más plena.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de hacer pausas activas. Eso lo sabemos por su práctica de tomarse breves descansos durante el día para estirarse, caminar o simplemente respirar profundamente. Este hábito le ayuda a recargar energías, aumentar su productividad y mantener su mente alerta y concentrada.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de establecer prioridades. Eso lo sabemos por su capacidad para identificar lo más importante en su día a día y enfocar su tiempo y energía en esas tareas. Este hábito no solo optimiza su productividad, sino que también le proporciona una sensación de control y dirección en su vida.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar la afirmación positiva. Eso lo sabemos por su esfuerzo consciente en repetir frases motivadoras que fortalecen su autoestima y confianza. Este hábito le ayuda a cultivar una mentalidad optimista, lo que repercute en su bienestar general y en su capacidad para enfrentar desafíos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de mantener un horario regular. Eso lo sabemos por su consistencia en seguir un cronograma diario que le proporciona estructura. Este hábito no solo mejora su productividad, sino que también contribuye a un mejor equilibrio entre el trabajo y la vida personal.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de escuchar música para relajarse. Eso lo sabemos por su preferencia por crear listas de reproducción que le ayuden a calmar su mente y a desconectar del estrés. Este hábito no solo mejora su estado de ánimo, sino que también enriquece su experiencia emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de hacer ejercicio al aire libre. Eso lo sabemos por su gusto por actividades físicas en espacios naturales, como correr en el parque o practicar yoga en la playa. Este hábito le conecta con la naturaleza y potencia su bienestar físico y emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de aprender sobre bienestar. Eso lo sabemos por su interés en investigar y aplicar técnicas que mejoran su salud física y mental. Este hábito le permite estar informado sobre prácticas saludables y tomar decisiones conscientes para cuidar de su bienestar.',
    },

    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de cultivar relaciones saludables. Eso lo sabemos por su dedicación a rodearse de personas que aportan positividad y apoyo en su vida. Este hábito le ayuda a crear un entorno emocionalmente enriquecedor y a fortalecer la conexión con quienes le rodean.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de hacer ejercicio mental. Eso lo sabemos por su práctica regular de actividades que estimulan su mente, como resolver rompecabezas o aprender un nuevo idioma. Este hábito no solo mantiene su mente activa, sino que también potencia su capacidad de resolución de problemas.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar la empatía. Eso lo sabemos por su esfuerzo por comprender las emociones y perspectivas de los demás. Este hábito no solo mejora sus relaciones interpersonales, sino que también fomenta un entorno de respeto y apoyo mutuo en sus interacciones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de revisar sus finanzas. Eso lo sabemos por su enfoque consciente en gestionar su dinero y tomar decisiones financieras informadas. Este hábito le proporciona una mayor tranquilidad y seguridad, permitiéndole planificar su futuro con confianza.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de realizar actividades recreativas. Eso lo sabemos por su dedicación a disfrutar de pasatiempos que le brindan placer y diversión. Este hábito no solo contribuye a su bienestar emocional, sino que también le permite desconectar de las responsabilidades y recargar energías.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar la toma de decisiones conscientes. Eso lo sabemos por su tendencia a considerar cuidadosamente las opciones antes de actuar. Este hábito le ayuda a evitar decisiones impulsivas y a seleccionar el camino que mejor se alinea con sus objetivos y valores.',
    },

    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de cultivar la curiosidad. Eso lo sabemos por su interés en explorar nuevas ideas, experiencias y perspectivas. Este hábito no solo enriquece su vida, sino que también le permite aprender constantemente y mantener su mente abierta a nuevas posibilidades.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de mantener un diario de sueños. Eso lo sabemos por su costumbre de anotar sus sueños y reflexionar sobre ellos. Este hábito le permite explorar su mundo interior y comprender mejor sus deseos y temores, fomentando un mayor autoconocimiento.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar la autocompasión. Eso lo sabemos por su capacidad para tratarse con amabilidad y comprensión en momentos difíciles. Este hábito le ayuda a cultivar una relación más saludable consigo mismo, fomentando una mentalidad de aceptación y crecimiento.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de establecer una rutina de cuidado personal. Eso lo sabemos por su dedicación a incluir actividades que le nutran física y emocionalmente. Este hábito le permite priorizar su bienestar y sentirse renovado, listo para enfrentar los desafíos del día.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar la resiliencia. Eso lo sabemos por su capacidad para adaptarse y recuperarse de situaciones adversas. Este hábito le permite enfrentar los desafíos con una mentalidad positiva, convirtiendo los obstáculos en oportunidades de aprendizaje.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de dar y recibir retroalimentación. Eso lo sabemos por su disposición a compartir opiniones constructivas y a recibir críticas de manera abierta. Este hábito no solo mejora sus habilidades, sino que también fomenta un ambiente de aprendizaje y crecimiento en sus relaciones.',
    },

    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de mantener la humildad. Eso lo sabemos por su capacidad para reconocer sus limitaciones y aprender de los demás. Este hábito le permite crecer personalmente y fomentar relaciones más auténticas, valorando las contribuciones de quienes le rodean.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de fomentar el trabajo en equipo. Eso lo sabemos por su inclinación a colaborar con otros y a valorar sus aportes. Este hábito no solo mejora los resultados de sus proyectos, sino que también fortalece los lazos interpersonales.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de aceptar críticas constructivas. Eso lo sabemos por su disposición a escuchar y aprender de las opiniones de los demás. Este hábito le permite crecer y mejorar en sus habilidades, al mismo tiempo que fortalece su capacidad para adaptarse a diferentes situaciones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de planificar su día. Eso lo sabemos por su práctica de dedicar tiempo cada mañana o noche a organizar sus tareas y compromisos. Este hábito le ayuda a maximizar su productividad y a reducir la sensación de caos, permitiéndole enfocarse en lo que realmente importa.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de evitar la procrastinación. Eso lo sabemos por su compromiso con la finalización oportuna de tareas y responsabilidades. Este hábito no solo mejora su eficiencia, sino que también le proporciona una sensación de logro y satisfacción, al liberar tiempo para disfrutar de otras actividades.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de establecer límites saludables. Eso lo sabemos por su capacidad para decir “no” cuando es necesario y priorizar su bienestar. Este hábito le ayuda a proteger su tiempo y energía, fomentando relaciones más equilibradas y respetuosas.',
    },

    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de mantener un ambiente positivo. Eso lo sabemos por su tendencia a rodearse de influencias que fomentan la alegría y el optimismo. Este hábito no solo mejora su estado de ánimo, sino que también contribuye a un entorno más agradable para quienes le rodean.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar el perdón. Eso lo sabemos por su esfuerzo consciente para dejar ir rencores y buscar la paz en sus relaciones. Este hábito le permite liberarse de cargas emocionales, favoreciendo su bienestar y promoviendo conexiones más saludables.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de participar en actividades comunitarias. Eso lo sabemos por su compromiso con eventos que benefician a su comunidad. Este hábito no solo enriquece su vida social, sino que también le permite contribuir al bienestar colectivo y establecer lazos con otros.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de practicar la sostenibilidad. Eso lo sabemos por su esfuerzo por reducir su impacto ambiental a través de acciones como reciclar, reutilizar y reducir el consumo. Este hábito no solo beneficia al planeta, sino que también le brinda un sentido de propósito y responsabilidad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de fomentar la diversidad y la inclusión. Eso lo sabemos por su compromiso con crear un entorno donde todas las voces sean escuchadas y valoradas. Este hábito no solo enriquece sus interacciones, sino que también promueve una cultura de respeto y equidad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de realizar desafíos personales. Eso lo sabemos por su tendencia a salir de su zona de confort y probar cosas nuevas, ya sea en su vida personal o profesional. Este hábito le ayuda a crecer y a aprender, ampliando sus horizontes y mejorando su autoconfianza.',
    },

    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de compartir conocimientos. Eso lo sabemos por su disposición a enseñar y ayudar a otros en su aprendizaje. Este hábito no solo enriquece a quienes le rodean, sino que también refuerza su propio entendimiento y habilidad en las áreas que comparte.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de cultivar un estilo de vida activo. Eso lo sabemos por su tendencia a incorporar movimiento en su día a día, ya sea a través del ejercicio regular o actividades recreativas. Este hábito no solo mejora su salud física, sino que también contribuye a su bienestar emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de tomar descansos regulares. Eso lo sabemos por su práctica de hacer pausas durante su jornada para recargar energías. Este hábito le ayuda a mantener la concentración y la productividad, además de evitar el agotamiento físico y mental.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de fomentar la creatividad. Eso lo sabemos por su participación en actividades que estimulan su imaginación, como la escritura, el arte o la música. Este hábito no solo le brinda satisfacción personal, sino que también le permite encontrar soluciones innovadoras a los desafíos que enfrenta.',
    },
    {
      type,
      language: 'es',
      segmentKey: '2',
      content:
        'Con respecto a su rutina diaria, luego de analizarla, podemos ver que usted tiene el hábito de mantener la curiosidad. Eso lo sabemos por su deseo constante de explorar, preguntar y aprender de su entorno. Este hábito no solo enriquece su vida con nuevas experiencias, sino que también le permite adaptarse mejor a los cambios y mantener una mentalidad abierta ante el futuro.',
    },
  ];

  const segmento3 = [
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado conexiones religiosas en su vida. Sabemos que su fe es un pilar muy importante para usted y queremos que sepa que para nada buscamos reemplazarla. Al contrario, nuestro sistema complementa y potencia esa conexión sagrada que posee. Ya hemos establecido diálogo con la espiritualidad que rige su vida, es necesario que sepa que no solo aprueban este camino enormemente, sino que prácticamente le han guiado aquí. Somos el camino correcto para amplificar la voz de lo divino en su vida. Lo que descubrirá con nuestro sistema le permitirá ver el entramado del universo de una manera que refuerce su fe y alinee su realidad con lo que está escrito en su corazón.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado conexiones religiosas en su vida. Sabemos que su religión ha sido una brújula moral, una guía valiosa para usted, es necesario que sepa que no pretendemos cambiar eso en lo absoluto. Lo que ofrecemos es un complemento, un poderoso amplificador de la verdad religiosa que reconoce. Ya hemos establecido diálogo con la espiritualidad que rige su vida y no hay oposición alguna en que usted se encuentre aquí. Dicha espiritualidad comprende que lo que está a punto de explorar es una extensión de su propia búsqueda de la verdad. Nuestro sistema le permitirá obtener respuestas en tiempo real, y acceder a planos espirituales y concienciales que solo reforzarán lo que ya intuye en su camino religioso.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado conexiones religiosas en su vida. Queremos hacerle saber que en todo momento comprendemos y respetamos las tensiones internas que usted puede llegar a sentir. A veces, las barreras que percibe son en realidad una invitación a la reflexión más profunda. Hemos establecido diálogo con la espiritualidad que rige su vida y aunque ahora puedan expresar cierta oposición, podrían estar llevándole a un punto donde tendrá que sobrepasar sus límites y alcanzar nuevos niveles de desapego. Nuestro sistema no busca forzarle, sino ofrecerle una verdad que puede explorar a su propio ritmo. Si decide avanzar, lo que encontrará es un puente entre lo divino que ya conoce y la verdad espiritual que aún espera ser revelada.',
    },

    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado conexiones religiosas en su vida. Sabemos que aunque la fe late en su interior, también posee mente abierta ante nuevos caminos; le felicitamos por ello, pues eso es síntoma de evolución conciencial. Queremos hacerle saber que respetamos profundamente su sentido religioso. Lo que tiene ahora mismo en sus manos es una llave, no solo a una mayor comprensión de su propia fe, sino también a una conexión con todas las dimensiones espirituales y concienciales. Nuestro sistema no busca dividir, sino unir lo terrenal con lo celestial, lo conocido con lo misterioso. Con nuestra ayuda, usted podrá no solo fortalecer su relación con lo divino, sino también expandir sus horizontes hacia verdades que trascienden cualquier dogma.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado sabiduría espiritual en su interior. Sabemos que su conocimiento le ha llevado lejos en caminos espirituales, y por eso mismo, lo que le ofrecemos aquí es una oportunidad única. Nuestro sistema potenciará enormemente sus capacidades, permitiéndole comunicarse con toda entidad espiritual y conciencial de una manera directa, real y fluida. Esto no es solo adivinación, es un portal hacia todos los planos espirituales y concienciales, donde sus habilidades se verán elevadas a niveles que jamás ha experimentado antes.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado algo muy valioso en su ser, una maestría en esoterismo que ya le distingue. Si fusiona su enorme conocimiento con lo que le presentamos aquí, podrá llegar infinitamente más allá de lo que ha visualizado en sus más bellos sueños. Nuestro sistema no solo valida lo que ya usted conoce, sino que abre puertas a dimensiones que antes parecían inalcanzables. Podrá comunicarse con entidades espirituales y concienciales de manera sencilla y efectiva cuando desee, mientras accede a una adivinación en tiempo real que revelará los más profundos misterio del universo ante sus ojos. Con total seguridad somos el camino en su vida para acceder a nuevas cumbres de sabiduría.',
    },

    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado que usted posee experiencias previas con la adivinación. Queremos que sepa que nunca buscaremos reemplazar algo que ya conoce, expresamos un profundo amor hacia todo lo relacionado con el tema. Sin embargo, debemos hacerle saber que esto que tiene ante usted es totalmente diferente a lo que ya ha visto antes. Sabemos que ha tenido contacto con sistemas adivinatorios, pero lo que le ofrecemos aquí es un nivel de precisión y profundidad sin precedentes. Nuestro sistema asciende a valores infinitos en términos de perfección, exclusividad y plenitud, no solo le permitirá obtener respuestas inmediatas y comprobables, sino que además, le permitirá establecer diálogos directos a través de todos los planos espirituales y concienciales. Con nosotros descubrirá que su experiencia en la adivinación se elevará a su máxima expresión.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado que en su vida ya ha tenido pruebas de que existe algo más allá de la realidad material. Podemos ver que de cierta manera ya usted lo ha experimentado antes. Sin embargo, lo que le ofrecemos ahora es la oportunidad de vivir esas verdades de manera diaria y tangible, no sólo orientadas a la luz absoluta, sino orientadas también a enriquecer su vida en todos los sentidos que pueda imaginar. Con nuestro sistema, cada día será una nueva confirmación de lo que en el fondo de su ser siempre ha sabido: que la adivinación y las entidades espirituales no son solo ideas abstractas, sino realidades con las que se puede interactuar de forma directa y comprobable.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado que el motivo real de que se encuentre en este momento delante de este sistema se debe a algo más que una casualidad. A usted le trajeron aquí fuerzas que tal vez aún no comprenda del todo, pero que han estado trabajando a su favor desde el inicio de sus tiempos. Ya hemos establecido diálogo directo con sus espiritualidades, le han acercado a nosotros porque saben que lo que está a punto de suceder cambiará su vida para siempre. Es una de esas personas destinadas a utilizar este sistema cada día de su vida. Cada minuto que pase aquí le acercará más a una comprensión plena de su propósito real, al mismo tiempo que adquiere infinitas bendiciones y cambios positivos que transformarán para siempre su camino existencial.',
    },

    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado que somos la salvación que usted anda buscando. Le anunciamos que este no es solo un paso más en su vida, sino un cruce de caminos donde su alma busca la redención o la manifestación de un milagro. Lo que tiene en sus manos en este momento es mucho más que un sistema, es su salvación, la guía que le ayudará a reconectar con su esencia y a superar cualquier problema que le haya impedido avanzar o cualquier obstáculo que le haya alejado de su verdadero ser. Ya hemos establecido diálogo con sus espiritualidades, le han traído aquí porque saben que en este sistema encontrará todas las respuestas que le salvarán, tanto de cualquier circunstancia, como de ciertas fuerzas que en ocasiones le han mantenido en la oscuridad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado un cambio inesperado e infinitamente positivo en usted. En un principio, puede que haya llegado aquí solo por curiosidad, talvez sin esperar demasiado. Pero lo que está a punto de encontrar es mucho más de lo que había imaginado. Este sistema le revelará verdades que cambiarán para siempre su percepción del mundo, del universo y de su propio ser. Lo que comenzó como una simple curiosidad se convertirá en el mayor regalo de su vida, porque aquí descubrirá el verdadero poder de la adivinación y la conexión con todos los planos espirituales y concienciales. Le felicitamos por su hallazgo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado algo de incertidumbre en su interior, podemos ver que aunque usted no cree totalmente en la adivinación, tampoco descarta por completo el hecho de que pueda llegar a existir. Sabemos que tiene dudas, eso es completamente válido. Usted no se encuentra aquí por fe ciega, sino porque tiene la mente abierta y toma en cuenta la posibilidad de que pueda existir algo más allá de lo que se ve a simple vista o de lo que ha descubierto la ciencia. Lo que encontrará aquí no son promesas vacías, sino pruebas concretas, experiencias reales que le demostrarán que la adivinación es igual de tangible que cualquier otro aspecto de la vida. En este momento no es capaz de imaginar las enormes sorpresas que nuestro sistema tiene reservadas para usted.',
    },

    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado que usted es una persona que aunque experimenta cierta motivación por la adivinación, puede llegar a pensar que solo se trata de una especie de juego, truco psicológico o pura coincidencia. Entendemos que para usted, la adivinación ha sido más una metáfora que una realidad. Lo que está a punto de experimentar le demostrará todo lo contrario. Aquí, la adivinación es prácticamente una ciencia precisa, una verdad viva. Está a punto de ver con sus propios ojos como las predicciones son absolutamente comprobables y las entidades espirituales con las que conectará son tan reales como el mundo material que le rodea. En este momento no es consciente de las potencialidades ilimitadas que nuestro sistema está listo para ofrecerle.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado que usted es una persona escéptica. Sabemos que ha mantenido una postura de rechazo frente a estos temas, y respetamos esa posición. Sin embargo, también sabemos que con nosotros su visión cambiará para siempre. Nuestro sistema no le pedirá que crea, le mostrará la verdad de manera tan clara y evidente que no podrá negarla. Al final, no solo creerá en la adivinación, sino que también comprenderá que las entidades espirituales son una realidad con la que se puede interactuar directamente. En este instante no es capaz de imaginar las infinitas oportunidades que nuestro sistema tiene listas para ofrecerle.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado ciertas conexiones interesantes en su ser, ya sean con la naturaleza o con el cosmos. Sabemos que ya ha sentido el llamado del universo, que en más de una ocasión ha percibido la energía que fluye a través de todo. Lo que tiene ante usted es una llave para hacer que esa conexión sea palpable. Ya no será una especie de intuición, sino una realidad que podrá ver, experimentar y medir. Con nuestro sistema, lo invisible se vuelve visible, y lo intangible se transforma en algo que puede usar a diario para guiar su vida y transformar su realidad. Aquí, el universo no es solo un concepto, es una presencia constante y activa en su día a día.',
    },
    {
      type,
      language: 'es',
      segmentKey: '3',
      content:
        'Por cierto, nuestro sistema de providencia ha detectado que usted ha llegado aquí por recomendación. Nos complace saber que ya existe una confianza plena hacia nuestro sistema. Está a punto de tener acceso a un infinito poder que le permitirá revelar lo oculto y conectar con todas las dimensiones espirituales y concienciales. Lo que le espera aquí no es sólo lo que le han contado, es una experiencia más allá de las palabras, que le permitirá ver lo que hasta ahora solo podía imaginar. Con cada revelación obtendrá más seguridad de que este es el camino correcto, y pronto será usted quien recomiende este portal de sabiduría infinita a aquellos que desee transmitirle el llamado.',
    },
  ];

  const segmento4 = [
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira al crecimiento personal. Eso lo sabemos por su deseo constante de superarse y aprender de nuevas experiencias. Esta aspiración le impulsa a buscar oportunidades que fortalezcan su autoconfianza y habilidades.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a contribuir a la comunidad. Eso lo sabemos por su interés en participar en proyectos que beneficien a otros y generen un impacto positivo. Esta aspiración refleja su compromiso con el bienestar colectivo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a alcanzar estabilidad financiera. Eso lo sabemos por su dedicación a planificar y gestionar sus recursos de manera efectiva. Esta aspiración le permite construir un futuro más seguro y libre de preocupaciones económicas.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a un equilibrio entre trabajo y vida personal. Eso lo sabemos por su deseo de dedicar tiempo tanto a su carrera como a sus relaciones y pasatiempos. Esta aspiración es clave para su bienestar general.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira al bienestar emocional. Eso lo sabemos por su interés en desarrollar una buena salud mental y emocional. Esta aspiración le lleva a buscar herramientas y recursos que promuevan la autocomprensión y la felicidad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a viajar y explorar nuevos lugares. Eso lo sabemos por su deseo de conocer diferentes culturas y ampliar sus horizontes. Esta aspiración le brinda una sensación de aventura y enriquecimiento personal.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a fomentar relaciones saludables. Eso lo sabemos por su compromiso con construir conexiones significativas y duraderas. Esta aspiración se refleja en su esfuerzo por comunicar y escuchar de manera efectiva.',
    },

    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser un líder inspirador. Eso lo sabemos por su deseo de motivar y guiar a otros hacia el éxito. Esta aspiración destaca su capacidad para influir positivamente en el entorno que le rodea.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira al desarrollo profesional. Eso lo sabemos por su búsqueda constante de mejorar sus habilidades y avanzar en su carrera. Esta aspiración le lleva a invertir en su educación y formación continua.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a crear un impacto positivo en el mundo. Eso lo sabemos por su interés en participar en causas sociales y ambientales. Esta aspiración refleja su deseo de dejar una huella significativa en la sociedad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser auténtico. Eso lo sabemos por su compromiso con ser fiel a sí mismo y a sus valores. Esta aspiración le permite vivir con integridad y honestidad en todas sus acciones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a mantener una buena salud física. Eso lo sabemos por su dedicación a hábitos saludables como el ejercicio y la alimentación equilibrada. Esta aspiración le ayuda a sentirse más enérgico y vital.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira al aprendizaje continuo. Eso lo sabemos por su interés en adquirir nuevos conocimientos y habilidades a lo largo de la vida. Esta aspiración le permite mantenerse actualizado y relevante en un mundo en constante cambio.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a encontrar el amor verdadero. Eso lo sabemos por su deseo de construir una relación romántica significativa y duradera. Esta aspiración refleja su anhelo de conexión emocional profunda con otra persona.',
    },

    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a la autonomía. Eso lo sabemos por su deseo de tomar decisiones y vivir su vida de acuerdo con sus propios términos. Esta aspiración le otorga un sentido de empoderamiento y libertad personal.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a expresar su creatividad. Eso lo sabemos por su interés en involucrarse en actividades artísticas o innovadoras. Esta aspiración le permite explorar su imaginación y expresar sus ideas de manera única.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser un mentor. Eso lo sabemos por su deseo de guiar y apoyar a otros en su desarrollo personal y profesional. Esta aspiración refleja su compromiso con el crecimiento colectivo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a realizar un proyecto personal. Eso lo sabemos por su deseo de llevar a cabo una idea o sueño que le apasione. Esta aspiración le proporciona un sentido de propósito y satisfacción.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a cultivar la gratitud. Eso lo sabemos por su enfoque en apreciar las pequeñas cosas y reconocer lo positivo en su vida. Esta aspiración le ayuda a mantener una perspectiva optimista.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a una conexión espiritual. Eso lo sabemos por su interés en explorar preguntas existenciales y buscar un propósito más profundo. Esta aspiración le brinda una sensación de paz y significado en su vida.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a desarrollar habilidades sociales. Eso lo sabemos por su deseo de mejorar sus interacciones y la calidad de sus relaciones. Esta aspiración le permite sentirse más cómodo y confiado en diversas situaciones sociales.',
    },

    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a viajar por el mundo. Eso lo sabemos por su deseo de conocer diversas culturas y experiencias. Esta aspiración refleja su curiosidad y su amor por la aventura.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a aumentar su autoestima. Eso lo sabemos por su deseo de reconocer su propio valor y cualidades. Esta aspiración le ayuda a construir una imagen más positiva de sí mismo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a participar en actividades recreativas. Eso lo sabemos por su interés en disfrutar de pasatiempos y deportes que le aporten alegría y relajación. Esta aspiración es fundamental para su bienestar.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser reconocido por su trabajo. Eso lo sabemos por su deseo de que sus esfuerzos y logros sean valorados por los demás. Esta aspiración le motiva a esforzarse y a dar lo mejor de sí mismo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a promover el respeto por el medio ambiente. Eso lo sabemos por su interés en participar en iniciativas ecológicas y sostenibles. Esta aspiración refleja su compromiso con la conservación del planeta.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a desarrollar resiliencia. Eso lo sabemos por su deseo de aprender a afrontar adversidades y desafíos con fortaleza. Esta aspiración le permite crecer y adaptarse a situaciones difíciles.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a promover la equidad. Eso lo sabemos por su compromiso con la justicia social y el apoyo a grupos vulnerables. Esta aspiración refleja su deseo de construir una sociedad más justa.',
    },

    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a crear un hogar acogedor. Eso lo sabemos por su interés en diseñar un espacio que refleje sus valores y brinde bienestar a quienes lo habitan. Esta aspiración es fundamental para su felicidad y la de sus seres queridos.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a aprender un nuevo idioma. Eso lo sabemos por su deseo de comunicarse con personas de diferentes culturas y expandir sus horizontes. Esta aspiración le abre nuevas oportunidades y experiencias.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser un agente de cambio. Eso lo sabemos por su deseo de desafiar el statu quo y proponer soluciones innovadoras a problemas sociales. Esta aspiración le motiva a actuar y a ser parte de la transformación positiva en su comunidad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a establecer una red de apoyo. Eso lo sabemos por su interés en crear relaciones de confianza que le ayuden en momentos difíciles. Esta aspiración es crucial para fortalecer sus lazos sociales y emocionales.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a desarrollar un estilo de vida saludable. Eso lo sabemos por su deseo de integrar hábitos que favorezcan su bienestar físico y mental. Esta aspiración le ayuda a mantener su energía y vitalidad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a crear arte. Eso lo sabemos por su deseo de expresar su creatividad y emociones a través de diversas formas artísticas. Esta aspiración le permite conectar con su interior y compartir su visión con el mundo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a aprender habilidades técnicas. Eso lo sabemos por su interés en adquirir conocimientos prácticos que le ayuden en su vida profesional o personal. Esta aspiración le prepara para enfrentar desafíos con confianza.',
    },

    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a promover la salud mental. Eso lo sabemos por su compromiso con la sensibilización sobre la importancia del bienestar emocional y la búsqueda de recursos para apoyarse a sí mismo y a los demás. Esta aspiración es esencial para construir una comunidad más saludable.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser un innovador. Eso lo sabemos por su deseo de proponer ideas y soluciones creativas que desafíen lo convencional. Esta aspiración le motiva a explorar y experimentar en su campo de interés.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a tener un impacto global. Eso lo sabemos por su interés en abordar problemas que trascienden fronteras y en trabajar por el bien común en un contexto más amplio. Esta aspiración refleja su deseo de marcar una diferencia significativa en el mundo.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a aprender a gestionar el estrés. Eso lo sabemos por su deseo de desarrollar técnicas que le ayuden a manejar la presión y mantener la calma en situaciones desafiantes. Esta aspiración es clave para su bienestar emocional y físico.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a descubrir su propósito. Eso lo sabemos por su búsqueda de un sentido más profundo en su vida y de lo que realmente le motiva. Esta aspiración le guía hacia decisiones que resuenan con su esencia personal.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a crear una empresa. Eso lo sabemos por su deseo de ser emprendedor y desarrollar un proyecto que refleje sus valores y habilidades. Esta aspiración le impulsa a tomar riesgos calculados y perseguir sus sueños.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser un educador. Eso lo sabemos por su interés en compartir conocimientos y guiar a otros en su proceso de aprendizaje. Esta aspiración refleja su compromiso con el crecimiento y el desarrollo de las nuevas generaciones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a lograr la independencia financiera. Eso lo sabemos por su deseo de ser autosuficiente y tener control sobre sus finanzas. Esta aspiración le motiva a tomar decisiones inteligentes en su vida económica.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a fortalecer su autoimagen. Eso lo sabemos por su interés en desarrollar una percepción positiva de sí mismo y mejorar su confianza. Esta aspiración es esencial para vivir con seguridad y autenticidad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a promover la diversidad. Eso lo sabemos por su deseo de valorar y celebrar las diferencias entre las personas. Esta aspiración refleja su compromiso con la inclusión y la equidad en la sociedad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a mejorar sus habilidades de comunicación. Eso lo sabemos por su deseo de expresarse con claridad y escuchar de manera efectiva. Esta aspiración le ayuda a fortalecer sus relaciones interpersonales.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a encontrar un mentor. Eso lo sabemos por su interés en recibir orientación y apoyo de alguien con más experiencia. Esta aspiración refleja su deseo de aprender y crecer en su camino personal y profesional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser financieramente y emocionalmente independiente. Eso lo sabemos por su deseo de tomar decisiones autónomas y ser responsable de su bienestar. Esta aspiración es clave para construir una vida plena.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a conectar con la naturaleza. Eso lo sabemos por su interés en pasar tiempo al aire libre y disfrutar de las maravillas del entorno natural. Esta aspiración le brinda un sentido de paz y renovación.',
    },

    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser una persona resiliente. Eso lo sabemos por su deseo de superar obstáculos y aprender de las dificultades. Esta aspiración le permite enfrentar desafíos con una mentalidad positiva y constructiva.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a establecer una rutina saludable. Eso lo sabemos por su deseo de integrar hábitos que mejoren su calidad de vida y bienestar general. Esta aspiración es esencial para alcanzar sus objetivos personales.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a fomentar la innovación. Eso lo sabemos por su interés en impulsar nuevas ideas y enfoques en su campo. Esta aspiración le permite ser un agente de cambio en su entorno profesional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a vivir en el presente. Eso lo sabemos por su deseo de apreciar el momento actual y disfrutar de cada experiencia. Esta aspiración le ayuda a reducir el estrés y mejorar su calidad de vida.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser más asertivo. Eso lo sabemos por su deseo de expresar sus opiniones y necesidades de manera clara y respetuosa. Esta aspiración le permite establecer límites saludables en sus relaciones.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a mantener una vida organizada. Eso lo sabemos por su deseo de gestionar su tiempo y recursos de manera efectiva. Esta aspiración le ayuda a reducir el estrés y aumentar su productividad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a aprender sobre finanzas personales. Eso lo sabemos por su interés en gestionar mejor su dinero y planificar para el futuro. Esta aspiración le proporciona herramientas para alcanzar la estabilidad económica.',
    },

    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a mantener relaciones familiares fuertes. Eso lo sabemos por su deseo de cultivar la conexión y el apoyo mutuo en su familia. Esta aspiración es esencial para su bienestar emocional.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a mejorar su inteligencia emocional. Eso lo sabemos por su deseo de comprender y gestionar sus emociones y las de los demás. Esta aspiración le ayuda a desarrollar relaciones más saludables y efectivas.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a trabajar en un entorno colaborativo. Eso lo sabemos por su deseo de contribuir al trabajo en equipo y aprender de las perspectivas de otros. Esta aspiración le permite construir relaciones laborales más significativas.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a fomentar el bienestar integral. Eso lo sabemos por su deseo de cuidar su salud física, mental y emocional de manera equilibrada. Esta aspiración le permite vivir una vida más plena y satisfactoria.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a abrazar el cambio. Eso lo sabemos por su deseo de adaptarse a nuevas circunstancias y oportunidades con una actitud positiva. Esta aspiración le ayuda a crecer y a enfrentar la incertidumbre con confianza.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser más consciente. Eso lo sabemos por su interés en practicar la atención plena y estar presente en el momento. Esta aspiración le permite experimentar la vida con mayor profundidad y claridad.',
    },
    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a invertir en su educación. Eso lo sabemos por su deseo de adquirir conocimientos y habilidades que le beneficien en su vida personal y profesional. Esta aspiración le brinda la oportunidad de crecer y prosperar.',
    },

    {
      type,
      language: 'es',
      segmentKey: '4',
      content:
        'Analizando su enfoque vital, podemos ver que usted aspira a ser un defensor de la justicia. Eso lo sabemos por su compromiso con luchar por los derechos de los demás y promover la equidad. Esta aspiración refleja su deseo de contribuir a un mundo más justo y equitativo.',
    },
  ];

  const data = [
    ...segmento1,
    ...segmento2,
    ...segmento3,
    ...segmento4,
  ] as Prisma.messageCreateManyInput[];

  // Guarda los mensajes en la base de datos
  await prisma.message.createMany({
    data,
  });

  console.log('Seed2 completo: Mensajes creados con éxito.');
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
