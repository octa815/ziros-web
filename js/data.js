// ============================================================
//  DATOS DE LOS MENÚS — ZIROS · LA ALKAZABA · ELDA 2026
//  Edita este archivo para modificar platos, eventos y comparsas.
// ============================================================

// Momento especial del inicio de las fiestas (cuenta atrás principal)
const PRIMERA_DIANA = new Date('2026-05-28T19:30:00');
// Fin de la actuación de Idella — cuando la app vuelve al flujo normal
const IDELLA_END    = new Date('2026-05-28T19:40:00');

// ── LETRAS DE CANCIONES ────────────────────────────────────

const CANCION_SAN_ANTON = [
  [
    'Esta melodía que resuena,',
    'llegará a todos los corazones de los festeros',
    'de nuestro pueblo, que entusiasmados, cantan así:',
  ],
  [
    'San Antón,',
    'sale de su ermita,',
    'cuando los Moros y Cristianos',
    'abren su corazón,',
    'a la fiesta de este pueblo,',
    'hermosa tradición,',
    'que llevamos muy adentro',
    'fieles a nuestro Santo.',
  ],
  [
    'San Antón, con su libro abierto,',
    'observa atento a los festeros',
    'que marchan alegres,',
    'a disfrutar y a desfilar con las comparsas,',
    'que embellecen nuestras calles.',
  ],
  [
    'Y al llegar primeros de Junio,',
    'el cielo azul cautivador',
    'se vuelve multicolor,',
    'porque sabe que ha llegado',
    'la fiesta del patrón',
    'de los Moros y Cristianos',
    'de este bendito pueblo.',
  ],
  [
    'San Antón, te dieron por nombre,',
    'te suplicamos no abandones',
    'a nuestros festeros,',
    'porque te dan, de corazón,',
    'muestra de afecto, de ilusión',
    'y de alegría.',
  ],
  [
    'Hay en mi pueblo un Santo Patrono,',
    'vejete humilde con sus barbas y su pelo cano.',
    'Es el Patrón de Moros y Cristianos,',
    'a quien bien llaman San Antonio Abad.',
  ],
  [
    'En el castillo, en la ermita, en las calles,',
    'el chupinazo ha sonado ya,',
    'y por el cielo suena un pasodoble,',
    'que alegra el alma y el corazón,',
    'y entonces el mundo entero sabe',
    'que han llegado las Fiestas...',
  ],
  ['¡Que viva Elda y San Antón!'],
];

// Comparsa propia (se resaltará en las órdenes de marcha)
const OWN_COMPARSA = 'Marroquíes';

// ── ÓRDENES DE MARCHA DE COMPARSAS ────────────────────────

const COMPARSA_ORDERS = {
  A: {
    label: 'Orden A',
    bandos: [
      {
        name: 'Bando Moro',
        id: 'moro',
        comparsas: ['Huestes del Cadí', 'Musulmanes', 'Marroquíes', 'Realistas']
      },
      {
        name: 'Bando Cristiano',
        id: 'cristiano',
        comparsas: ['Estudiantes', 'Zíngaros', 'Contrabandistas', 'Cristianos', 'Piratas']
      }
    ]
  },
  B: {
    label: 'Orden B',
    bandos: [
      {
        name: 'Bando Cristiano',
        id: 'cristiano',
        comparsas: ['Estudiantes', 'Zíngaros', 'Contrabandistas', 'Cristianos', 'Piratas']
      },
      {
        name: 'Bando Moro',
        id: 'moro',
        comparsas: ['Huestes del Cadí', 'Musulmanes', 'Marroquíes', 'Realistas']
      }
    ]
  },
  C: {
    label: 'Orden C',
    bandos: [
      {
        name: 'Bando Cristiano',
        id: 'cristiano',
        comparsas: ['Estudiantes', 'Zíngaros', 'Contrabandistas', 'Cristianos', 'Piratas']
      },
      {
        name: 'Bando Moro',
        id: 'moro',
        comparsas: ['Musulmanes', 'Marroquíes', 'Realistas', 'Huestes del Cadí']
      }
    ]
  }
};

// ── PROGRAMA DE ACTOS ─────────────────────────────────────

const EVENTOS = [
  {
    dayLabel: 'Jueves 28 de Mayo',
    events: [
      {
        time: '19:30',
        datetime: new Date('2026-05-28T19:30:00'),
        name: 'Entrada de Bandas',
        desc: 'El Pasodoble Idella. El momento en que te recorre el cuerpo de arriba abajo. Al que diga que no se le ponen los pelos de punta le miramos muy raro.',
        order: null,
        highlight: true,
        lyricsTitle: 'Idella',
        lyrics: [
          ['Idella de mis amores.'],
          [
            'Que viva la fiesta, que vivan los Moros y los Cristianos de mi ciudad.',
            'Que viva mi pueblo ahora que cantamos todos juntos con ilusión.',
            'Ya llegó la fiesta a las calles de ELDA con alegría y esplendor.',
            'Ahora que cantamos y juntos estamos con mucha emoción.',
          ],
          [
            'Que viva la fiesta, que vivan los Moros y los Cristianos de mi ciudad.',
            'Que viva mi pueblo ahora que cantamos todos juntos con ilusión.',
            'Ya llegó la fiesta a las calles de ELDA con alegría y esplendor.',
            'Ahora que cantamos y juntos estamos con mucha emoción.',
          ],
          [
            'Con la música estás / muy cerca del corazón.',
            'En la Ermita de San Antón / con todas nuestras comparsas.',
            'De la ermita de San Antón / desfilando hacia el castillo.',
            'Con el sol y las estrellas de mi Idella natal.',
          ],
          [
            'Con la música estás / muy cerca del corazón.',
            'En la Ermita de San Antón / con todas nuestras comparsas.',
            'De la ermita de San Antón / desfilando hacia el castillo.',
            'Con el sol y las estrellas de mi Idella natal.',
          ],
          [
            'Que viva la fiesta, que vivan los Moros y los Cristianos de mi ciudad.',
            'Que viva mi pueblo ahora que cantamos todos juntos con ilusión.',
            'Ya llegó la fiesta a las calles de Elda con alegría y esplendor.',
            'Ahora que cantamos y juntos estamos con mucha emoción.',
          ],
          ['Idella de mis amores.'],
          [
            'Idella es, la tradición de una ciudad.',
            'Idella es, el frenesí de una pasión.',
            'Idella es, la bandera de la cruz, y la media luna, que se funden con amor.',
          ],
          [
            'Idella es, la tradición de una ciudad.',
            'Idella es, el frenesí de una pasión.',
            'Idella es, la bandera de la cruz, y la media luna, que se funden con amor.',
          ],
        ]
      },
      {
        time: '23:30',
        datetime: new Date('2026-05-28T23:30:00'),
        name: 'Retreta',
        desc: 'Desfile nocturno con un poco de alcohol. Impresionante para los que miran. Empezamos fuerte, con dolor de pies y mañana resaca.',
        order: 'B'
      }
    ]
  },
  {
    dayLabel: 'Viernes 29 de Mayo',
    events: [
      {
        time: '10:00',
        datetime: new Date('2026-05-29T10:00:00'),
        name: 'Acompañamiento Estandarte del Santo',
        desc: 'Con arcabucería incluida. Los disparos los gestionamos nosotros. Los sustos del vecindario no son responsabilidad nuestra.',
        order: 'C'
      },
      {
        time: '11:00',
        datetime: new Date('2026-05-29T11:00:00'),
        name: 'Pasodoble San Antón',
        desc: 'En la iglesia de Santa Ana. Para los que todavía tienen fuerzas a las 11 del viernes. Retumba que tumba el suelo recén asfaltao',
        order: null,
        lyricsTitle: 'San Antón',
        lyrics: CANCION_SAN_ANTON
      },
      {
        time: '19:00',
        datetime: new Date('2026-05-29T19:00:00'),
        name: 'Desfile Infantil',
        desc: 'Los peques toman el mando. Con mejor paso que algunos mayores que todos conocemos pero nadie nombra. El momento de las fiestas con más adultos borrachos',
        order: 'B'
      }
    ]
  },
  {
    dayLabel: 'Sábado 30 de Mayo',
    events: [
      {
        time: '10:00',
        datetime: new Date('2026-05-30T10:00:00'),
        name: 'Alardo de Arcabucería',
        desc: 'Salva de honor. El ruido está garantizado. Los nervios del vecino del quinto también. Cuiado con los toldos que algunos ya disparan de lado.',
        order: 'B'
      },
      {
        time: '18:00',
        datetime: new Date('2026-05-30T18:00:00'),
        name: 'Entrada Cristiana',
        desc: 'El bando contrario hace su aparición. Hay que reconocer que tienen mérito. Pero nosotros quedamos mejor y lo sabemos.',
        order: 'B'
      }
    ]
  },
  {
    dayLabel: 'Domingo 31 de Mayo',
    events: [
      {
        time: '08:00',
        datetime: new Date('2026-05-31T08:00:00'),
        name: 'Diana Festera',
        desc: 'Las 8 de la mañana del domingo con traje. O madrugas o empalmas. No hay punto medio. Relevo con los que vuelven de fiesta',
        order: 'C'
      },
      {
        time: '11:00',
        datetime: new Date('2026-05-31T11:00:00'),
        name: 'Desfile de Ofrenda',
        desc: 'Flores al santo. Emoción garantizada. El momento en que te replanteas si los mocos son de alergia o constipado.',
        order: 'B'
      },
      {
        time: '12:30',
        datetime: new Date('2026-05-31T12:30:00'),
        name: 'Solemne Misa',
        desc: 'La pausa. El momento de reflexión entre tanto ruido y tanta fiesta. Algunos en este punto se plantean en empezar la dieta',
        order: null
      },
      {
        time: '18:00',
        datetime: new Date('2026-05-31T18:00:00'),
        name: 'Majestuosa Entrada Mora',
        desc: '¡NUESTRO MOMENTO! 365 días esperando esto. Ziros al frente!! El que no aplauda que presente sus disculpas por escrito.',
        order: 'A',
        highlight: true
      }
    ]
  },
  {
    dayLabel: 'Lunes 1 de Junio',
    events: [
      {
        time: '10:00',
        datetime: new Date('2026-06-01T10:00:00'),
        name: 'Alardo de Arcabucería',
        desc: 'La última salva. El cuerpo ya sabe que esto se acaba. "Dejame un tirito que ya no me queda pólvora... o algún pistoncillo tontorrón".',
        order: 'A'
      },
      {
        time: '18:30',
        datetime: new Date('2026-06-01T18:30:00'),
        name: 'Procesión en Honor a San Antonio Abad',
        desc: 'El cierre. La clausura. La mayoría aún no se sabe la letra entera, pero se emociona igual. Como cada año.',
        order: 'C',
        lyricsTitle: 'San Antón',
        lyrics: CANCION_SAN_ANTON
      }
    ]
  }
];

const MEAL_ICONS = {
  almuerzo:  '☀️',
  aperitivo: '🥂',
  comida:    '🍽️',
  cena:      '🌙',
  madrugada: '⭐'
};

// ── TIMELINE COMPLETA (orden cronológico) ──────────────────
// Formato dishes: array de secciones { section: 'Entrantes'|'Principal'|'', items: [{name, desc}] }

const TIMELINE = [

  /* ── JUEVES 28 DE MAYO ────────────────────────────────── */
  {
    id: 'jueves-cena',
    dayLabel: 'Jueves 28 de Mayo',
    mealLabel: 'Cena',
    mealType: 'cena',
    start: new Date('2026-05-28T21:00:00'),
    end:   new Date('2026-05-29T00:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Patatas fritas',
            desc: 'Desaparecen antes de que puedas decir "solo voy a coger una". Spoiler: llevas 2 platos.' },
          { name: 'Olivas',
            desc: 'La excusa perfecta para decirle a tu mujer que "solo has picado algo". Que haríamos sin David.' },
          { name: 'Embutidos',
            desc: 'La estrella anónima de la mesa. Todos los cogen, nadie los pone, nadie sabe quién los trajo. Magia pura.' },
          { name: 'Habas',
            desc: 'Ricas, sanas y con consecuencias acústicas que preferimos no detallar. Que cada uno gestione su situación.' },
          { name: 'Ensaladilla',
            desc: 'Tú come, no preguntes de que és, quien te la trajo no la sabe, y te la vas a comer igual' },
          { name: 'Caracoles',
            desc: 'El plato que separa a los que dicen "no sé, es que me da cosa" de los que lo prueban todo. Pruébalos y cállate.' },
          { name: 'Tortilla de Patatas',
            desc: 'Hay quien dice que está jugosa, hay quien dice que está cruda. Los dos tienen razón y los dos se comen otro trozo.' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Pollo al ajillo',
            desc: 'Aviso a los despistados: el ajo no es decorativo. El aliento es tu legado para las próximas 12 horas.' },
        ]
      }
    ]
  },

  {
    id: 'jueves-madrugada',
    dayLabel: 'Jueves 28 de Mayo',
    mealLabel: 'Madrugada',
    mealType: 'madrugada',
    start: new Date('2026-05-29T00:00:00'),
    end:   new Date('2026-05-29T03:00:00'),
    dishes: [
      {
        section: '',
        items: [
          { name: 'Chocolate con Toñas',
            desc: 'A las 2 de la madrugada, esto es lo más rico que has comido en tu vida. Puede que sea el alcohol. Puede que no. En cualquier caso, repite.' },
        ]
      }
    ]
  },

  /* ── VIERNES 29 DE MAYO ───────────────────────────────── */
  {
    id: 'viernes-almuerzo',
    dayLabel: 'Viernes 29 de Mayo',
    mealLabel: 'Almuerzo',
    mealType: 'almuerzo',
    start: new Date('2026-05-29T10:00:00'),
    end:   new Date('2026-05-29T12:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Embutidos',
            desc: 'Segunda aparición. Sin vergüenza. Sin remordimientos. Ya empezarás la dieta.' },
        ]
      },
      {
        section: 'Principales',
        items: [
          { name: 'Gachamiga',
            desc: 'Como decidas dormir un poco de más ya no llegas. Creo que se la comen a la vez que la mueven' },
          { name: 'Huevos',
            desc: 'Fritos. Yema líquida o te echamos. No hay término medio ni negociación posible.' },
          { name: 'Patatas a lo pobre',
            desc: 'Lo del nombre es el mayor engaño del mundo. Tienen más dignidad que tú con la resaca del jueves.' },
          { name: 'Panceta',
            desc: 'Una ración. Dos raciones. Tres raciones. Quien lleve la cuenta que lo comunique, que aquí no lo hace nadie.' },
        ]
      }
    ]
  },
  {
    id: 'viernes-aperitivo',
    dayLabel: 'Viernes 29 de Mayo',
    mealLabel: 'Aperitivo',
    mealType: 'aperitivo',
    start: new Date('2026-05-29T12:00:00'),
    end:   new Date('2026-05-29T14:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Habas',
            desc: 'Segunda entrega de habas. El cuerpo ya sabe lo que le espera y ha firmado la paz con la situación.' },
          { name: 'Caracoles',
            desc: 'Para quien los esquivó ayer "por si acaso". Hoy ya no hay excusa. Te miramos a ti, ya sabes quién eres.' },
          { name: 'Ensaladilla',
            desc: 'Misma discusión de siempre sobre si lleva o no lleva aceitunas. Spoiler: lleva aceitunas. O no, me da igual, come' },
          { name: 'Y más...',
            desc: 'Lo que salga del baúl de los misterios. El cocinero improvisa, vosotros coméis y dáis las gracias.' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Rabo',
            desc: 'El plato que te hace parecer elegante aunque estés comiendo con las manos y manchándote hasta el codo. Alta cocina.' },
        ]
      }
    ]
  },
  {
    id: 'viernes-comida',
    dayLabel: 'Viernes 29 de Mayo',
    mealLabel: 'Comida',
    mealType: 'comida',
    start: new Date('2026-05-29T14:00:00'),
    end:   new Date('2026-05-29T17:00:00'),
    dishes: [
      {
        section: 'Principales',
        items: [
          { name: 'Cocido',
            desc: 'El plato que te hace pensar en la cena cuando todavía estás comiendo. Contundente es quedarse corto. Prepara el cinturón.' },
          { name: 'Huevos con patatas',
            desc: 'La solución elegante a todos los problemas de la vida. Huevo, patata, aceite. Filosofía culinaria pura.' },
        ]
      }
    ]
  },
  {
    id: 'viernes-cena',
    dayLabel: 'Viernes 29 de Mayo',
    mealLabel: 'Cena',
    mealType: 'cena',
    start: new Date('2026-05-29T21:00:00'),
    end:   new Date('2026-05-30T00:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Embutidos',
            desc: 'Tercera aparición. A estas alturas ya son parte de la familia. Les hemos cogido más cariño que a algunos primos.' },
          { name: 'Gambón al ajillo',
            desc: 'Tanto ajo que puedes ver el futuro. Concretamente, el futuro de tu aliento. Un precio justo a pagar. Y CON PAN PA MOJAR' },
          { name: 'Croquetas',
            desc: 'Caseras. Si en 30 segundos todavía queda alguna en el plato, algo ha ido muy mal y hay que investigar.' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Ternera en Salsa / Pescado a la plancha',
            desc: 'Para los carnívoros sin complejos o para los que fingen que cuidan la dieta pidiendo pescado y luego roban croquetas.' },
        ]
      }
    ]
  },

  /* ── SÁBADO 30 DE MAYO ────────────────────────────────── */
  {
    id: 'sabado-almuerzo',
    dayLabel: 'Sábado 30 de Mayo',
    mealLabel: 'Almuerzo',
    mealType: 'almuerzo',
    start: new Date('2026-05-30T10:00:00'),
    end:   new Date('2026-05-30T12:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Embutidos',
            desc: 'Cuarta aparición. Sin comentarios. Simplemente come y agradece que estén ahí.' },
        ]
      },
      {
        section: 'Principales',
        items: [
          { name: 'Huevos',
            desc: 'Ya los conoces. Ya los quieres. Yema líquida o no hay trato. Es la única norma que se respeta en este cuartelillo.' },
          { name: 'Patatas a lo pobre',
            desc: 'Con resaca del viernes saben el triple de bien. La ciencia no lo explica pero lo corroboramos.' },
          { name: 'Panceta',
            desc: 'Crujiente. Dorada. La respuesta a todas las preguntas existenciales de un sábado por la mañana con el cuerpo castigado.' },
        ]
      }
    ]
  },
  {
    id: 'sabado-aperitivo',
    dayLabel: 'Sábado 30 de Mayo',
    mealLabel: 'Aperitivo',
    mealType: 'aperitivo',
    start: new Date('2026-05-30T12:00:00'),
    end:   new Date('2026-05-30T14:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Habas',
            desc: 'Tercer día con habas. El intestino ya ha asumido su destino con resignación estoica.' },
          { name: 'Caracoles',
            desc: 'Los veteranos ya cogen el palillo con maestría. Los novatos siguen mirando el caracol con desconfianza mutua.' },
          { name: 'Ensaladilla',
            desc: 'Puntual como ella sola. La ensaladilla nunca falla, nunca llega tarde y nunca decepciona. Aprende.' },
          { name: 'Y más...',
            desc: 'Lo que haya en la nevera más lo que se le ocurra al cocinero. Spoiler: siempre está bueno.' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Rabo',
            desc: 'Sigue igual de bueno que ayer. Tu ropa ya no, pero el rabo sí. Prioridades claras.' },
        ]
      }
    ]
  },
  {
    id: 'sabado-comida',
    dayLabel: 'Sábado 30 de Mayo',
    mealLabel: 'Comida',
    mealType: 'comida',
    start: new Date('2026-05-30T14:00:00'),
    end:   new Date('2026-05-30T17:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Champiñón',
            desc: 'El plato vegetariano que devoran hasta los más carnívoros sin darse cuenta. Ironías de la vida.' },
          { name: 'Berenjenas',
            desc: 'Crujientes, doradas y si les pones miel encima te cambian la vida. El que no las prueba se arrepiente.' },
          { name: 'Ensaladilla de Merluza',
            desc: 'La ensaladilla elegante. Para los que quieren presumir un poco y diferenciarse del común de los mortales.' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Carrillera / Rustidera de Sepia',
            desc: 'La carrillera se deshace sola mirándola. La sepia tiene más carácter. Tú decides, pero que no te pese luego.' },
        ]
      }
    ]
  },
  {
    id: 'sabado-cena',
    dayLabel: 'Sábado 30 de Mayo',
    mealLabel: 'Cena',
    mealType: 'cena',
    start: new Date('2026-05-30T21:00:00'),
    end:   new Date('2026-05-31T00:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Revuelto de Setas',
            desc: 'Sabe a monte aunque estemos en mayo. El huevo y la seta tienen ese poder. No lo cuestiones.' },
          { name: 'Fritura de Pescado',
            desc: 'Aceite, pescado y decisión. La fritura más honesta del mundo. Sin artificios, sin pretensiones, sin dejar nada en el plato.' },
          { name: 'Queso Frito',
            desc: 'Exterior dorado. Interior fundente. ¿Tienes algún problema con eso? Exacto. Nadie lo tiene.' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Solomillo a la pimienta / Merluza',
            desc: 'El duelo eterno entre tierra y mar. Esta noche en tu plato. Elige con sabiduría, que mañana es el gran día.' },
        ]
      }
    ]
  },

  /* ── DOMINGO 31 DE MAYO ───────────────────────────────── */
  {
    id: 'domingo-almuerzo',
    dayLabel: 'Domingo 31 de Mayo',
    mealLabel: 'Almuerzo',
    mealType: 'almuerzo',
    start: new Date('2026-05-31T10:00:00'),
    end:   new Date('2026-05-31T12:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Embutidos',
            desc: 'Quinta aparición. Ya son parte del patrimonio cultural del cuartelillo. Protegidos por ley no escrita.' },
        ]
      },
      {
        section: 'Principales',
        items: [
          { name: 'Gachamiga',
            desc: 'Segunda vez. Los que estaban dudosos el viernes ya se han rendido completamente. Bienvenidos al lado correcto de la historia.' },
          { name: 'Huevos',
            desc: 'El gran día merece un huevo a la altura. Yema líquida. Punto y aparte. No hay más que hablar.' },
          { name: 'Patatas a lo pobre',
            desc: 'Hoy con más mérito que nunca. Es domingo, hay entrada mora y hay que ponerse fino desde el almuerzo.' },
          { name: 'Panceta',
            desc: 'La panceta del domingo tiene otro sabor. Quizá sea la emoción del día, quizá sea el aceite. O las dos.' },
        ]
      }
    ]
  },
  {
    id: 'domingo-aperitivo',
    dayLabel: 'Domingo 31 de Mayo',
    mealLabel: 'Aperitivo',
    mealType: 'aperitivo',
    start: new Date('2026-05-31T12:00:00'),
    end:   new Date('2026-05-31T14:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Habas',
            desc: 'Cuarto día. Las habas y tú sois ya una historia de amor y resignación. Como un matrimonio de los buenos.' },
          { name: 'Caracoles',
            desc: 'Aperitivo dominical con los mismos de siempre. A estas alturas ya eres un maestro del palillo, admítelo.' },
          { name: 'Ensaladilla',
            desc: 'Domingo de ensaladilla. Constancia, tradición y mayonesa. Los tres pilares de la fiesta.' },
          { name: 'Y más...',
            desc: 'Es domingo y el cocinero lleva cuatro días en pie. Lo que salga es un milagro y hay que recibirlo con gratitud.' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Rabo',
            desc: 'Domingo de rabo. El cuerpo lo agradece, el traje de moro lo sufre. Hay que elegir y siempre se elige el rabo.' },
        ]
      }
    ]
  },
  {
    id: 'domingo-comida',
    dayLabel: 'Domingo 31 de Mayo',
    mealLabel: 'Comida',
    mealType: 'comida',
    start: new Date('2026-05-31T14:00:00'),
    end:   new Date('2026-05-31T17:00:00'),
    dishes: [
      {
        section: 'Entrante',
        items: [
          { name: 'Sepia rebozada y Albóndigas en salsa',
            desc: 'Mar y tierra en perfecta armonía. Si no te gusta una tienes la otra. Si no te gusta ninguna...seguro que queda embutido' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Fideuá / Paella de Conejo',
            desc: 'El debate eterno que divide a las familias, separa amigos y une enemigos. Nosotros ponemos los dos y que cada uno cargue con su conciencia.' },
        ]
      }
    ]
  },
  {
    id: 'domingo-cena',
    dayLabel: 'Domingo 31 de Mayo',
    mealLabel: 'Cena',
    mealType: 'cena',
    start: new Date('2026-05-31T21:00:00'),
    end:   new Date('2026-06-01T00:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Lacón con pimienta',
            desc: 'Pimienta. Mucha pimienta. Más pimienta de la que crees necesaria. Y resulta que necesitabas exactamente esa cantidad.' },
          { name: 'Salmón con tomate y tostas',
            desc: 'El plato elegante del domingo. Para recordar que somos gente de bien aunque llevemos cuatro días sin dormir.' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Tortilla de patatas y Magro con tomate',
            desc: 'El magro que te mete en el cuerpo lo necesario para llegar al lunes. La tortilla que te abraza por dentro. Los dos juntos: invencibles.' },
        ]
      }
    ]
  },

  /* ── LUNES 1 DE JUNIO ─────────────────────────────────── */
  {
    id: 'lunes-almuerzo',
    dayLabel: 'Lunes 1 de Junio',
    mealLabel: 'Almuerzo',
    mealType: 'almuerzo',
    start: new Date('2026-06-01T10:00:00'),
    end:   new Date('2026-06-01T12:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Embutidos',
            desc: 'Última aparición de la temporada. Están en su sitio, como siempre. Dignos hasta el final.' },
        ]
      },
      {
        section: 'Principales',
        items: [
          { name: 'Huevos',
            desc: 'El último almuerzo merece el mejor huevo. Yema líquida. Siempre. Hasta el final. Hasta el año que viene.' },
          { name: 'Patatas a lo pobre',
            desc: 'El último lunes con estas patatas. Saboréalas. Dentro de una semana las echarás de menos más de lo que admites.' },
          { name: 'Panceta',
            desc: 'La panceta de clausura. Crujiente como siempre. Infalible como siempre. Perfecta como siempre.' },
        ]
      }
    ]
  },
  {
    id: 'lunes-aperitivo',
    dayLabel: 'Lunes 1 de Junio',
    mealLabel: 'Aperitivo',
    mealType: 'aperitivo',
    start: new Date('2026-06-01T12:00:00'),
    end:   new Date('2026-06-01T14:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Habas',
            desc: 'El quinto y último día de habas. Ha sido un honor compartir este viaje gastro-intestinal con todos vosotros.' },
          { name: 'Caracoles',
            desc: 'Los caracoles de despedida. Más lentos que nunca, igual de buenos que siempre. La metáfora perfecta del final.' },
          { name: 'Ensaladilla',
            desc: 'La ensaladilla no sabe que es la última. Qué suerte tiene. Nosotros sí lo sabemos y por eso sabe más rica.' },
          { name: 'Y más...',
            desc: 'Lo último que quede en el cuartelillo. Probablemente lo mejor de todo porque hay que dejarlo vacío con dignidad.' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Rabo',
            desc: 'El último rabo del año. Hay quien llora. No los vamos a juzgar. Aquí se llora por el rabo y eso está bien.' },
        ]
      }
    ]
  },
  {
    id: 'lunes-comida',
    dayLabel: 'Lunes 1 de Junio',
    mealLabel: 'Comida',
    mealType: 'comida',
    start: new Date('2026-06-01T14:00:00'),
    end:   new Date('2026-06-01T17:00:00'),
    dishes: [
      {
        section: 'Entrantes',
        items: [
          { name: 'Patatas con ajo',
            desc: 'Simple. Honesta. Sin artificios. Como todo lo bueno en esta vida. Y en este cuartelillo.' },
          { name: 'Calamar a la Romana',
            desc: 'El calamar de cierre. Crujiente, tierno, con limón encima para los esquisitos. El final que se merece una semana así.' },
          { name: 'Ensalada',
            desc: 'La ensalada que compensa todo lo anterior. El autoengaño más feliz y necesario de las fiestas. Tú sigue que se asoma la dieta.' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Gazpachos / Macarrones',
            desc: 'Ojo: los gazpachos manchegos no tienen nada que ver con el gazpacho. Lección gratuita cortesía de Ziros. Apúntalo.' },
        ]
      }
    ]
  },
  {
    id: 'lunes-cena',
    dayLabel: 'Lunes 1 de Junio',
    mealLabel: 'Cena',
    mealType: 'cena',
    start: new Date('2026-06-01T21:00:00'),
    end:   new Date('2026-06-02T00:00:00'),
    dishes: [
      {
        section: 'Entrante',
        items: [
          { name: 'Moje murciano',
            desc: 'La despedida con sabor a tomate, bacalao y aceitunas. El plato que dice "has comido bien esta semana, campeón, y lo sabes".' },
        ]
      },
      {
        section: 'Principal',
        items: [
          { name: 'Sobrantes',
            desc: 'Todo lo que ha sobrado de una semana de gloria reunido en un solo plato. Los sobrantes dan más miedo que la carta de muchos restaurantes.' },
        ]
      }
    ]
  },

];

// ── LOGROS ────────────────────────────────────────────────

const ACHIEVEMENTS = [
  {
    id: 'bienvenido',
    icon: '🎉',
    name: 'Primer Paso',
    desc: 'Primera visita a Ziros 2026. ¡Que vivan las fiestas!',
  },
  {
    id: 'madrugador',
    icon: '🌅',
    name: 'Madrugador',
    desc: 'Conectado antes de las 9:00. El desayuno no te espera.',
  },
  {
    id: 'noctambulo',
    icon: '🌙',
    name: 'Noctámbulo',
    desc: 'Conectado después de las 23:30. Elda nunca duerme.',
  },
  {
    id: 'superviviente',
    icon: '💀',
    name: 'Superviviente',
    desc: 'Abierto en la madrugada del jueves (00:00–03:00). Eres un crack.',
  },
  {
    id: 'fiel',
    icon: '🔥',
    name: 'Fiel a Ziros',
    desc: 'Conectado 3 días diferentes de fiesta. El cuartelillo es tu casa.',
  },
  {
    id: 'veterano',
    icon: '⭐',
    name: 'Veterano',
    desc: '5 visitas o más al cuartelillo. Eres de los nuestros.',
  },
  {
    id: 'adicto',
    icon: '💫',
    name: 'Adicto al cuartel',
    desc: '10 visitas o más. Esto ya es preocupante (en el buen sentido).',
  },
  {
    id: 'fin_de_fiesta',
    icon: '😢',
    name: 'Se acabó',
    desc: 'Conectado el lunes de cierre. Hasta el año que viene.',
  },
  {
    id: 'easter',
    icon: '🥚',
    name: 'Curioso',
    desc: 'Encontraste el easter egg. No es fácil, pero tú lo conseguiste.',
  },
];

// ── SALUDOS POR DÍA ───────────────────────────────────────

const DAILY_GREETINGS = {
  before: [
    '¡Las fiestas están a la vuelta de la esquina!',
    '⏳ Contando los días para Elda...',
    '🏰 Ziros te espera en La Alkazaba',
  ],
  '2026-05-28': [
    '🎺 ¡Hoy empieza todo! Esta noche, Idella.',
    '⚔️ Jueves de emociones. La espera ha terminado.',
    '🔥 Primera noche de fiesta. ¡A por todas!',
  ],
  '2026-05-29': [
    '💪 ¡Viernes guerrero! El cuerpo aguanta.',
    '🎶 Viernes de Moros y Cristianos. Qué lujo.',
    '🌅 Buenos días, Ziro. Hoy hay mucho que vivir.',
  ],
  '2026-05-30': [
    '🎊 ¡Sábado grande! El día más largo del año.',
    '🔥 Sábado de fiesta a tope. No bajes el ritmo.',
    '⚔️ Sábado de Moros y Cristianos. ¡A disfrutar!',
  ],
  '2026-05-31': [
    '🌞 ¡Domingo de fiestas! Quedan energías.',
    '💃 Domingo de marcha. El cuerpo pide más.',
    '🏰 Domingo en La Alkazaba. Sigue el ritmo.',
  ],
  '2026-06-01': [
    '😢 Último día... Pero qué último día.',
    '🏆 Lunes de cierre. Hasta aquí ha llegado todo.',
    '🎶 El último baile del año. Que sea memorable.',
  ],
  after: [
    '🌟 ¡Qué fiestas tan increíbles! Hasta el 2027.',
    '😭 Se acabó, pero qué recuerdos.',
    '🔥 Ya queda menos para las fiestas de 2027.',
  ],
};

// ── QUINIELA DIARIA ───────────────────────────────────────

const POLL_DAYS = {
  '2026-05-28': {
    question: '¿Cuántos repetirán en la cena de hoy?',
    options: ['Todos sin excepción', 'La mayoría, claro', 'Los más valientes', 'Repetir es de sabios'],
  },
  '2026-05-29': {
    question: '¿Cuántos kilos de carrillera caerán hoy?',
    options: ['Menos de 10 kg', '10–20 kg', '20–30 kg', 'Perdemos la cuenta'],
  },
  '2026-05-30': {
    question: '¿Cuándo empieza "de verdad" el sábado?',
    options: ['Desde el almuerzo', 'Desde la comida', 'Desde la cena', 'Desde la madrugada'],
  },
  '2026-05-31': {
    question: '¿Quién tiene más energía este domingo?',
    options: ['Los jóvenes del grupo', 'Los veteranos', 'El cocinero', 'La banda de música'],
  },
  '2026-06-01': {
    question: '¿En cuánto tiempo empezamos a echar de menos las fiestas?',
    options: ['Ya las echo de menos', 'En unas horas', 'Mañana por la mañana', 'Nunca se van'],
  },
};

// ── MAPA INTERACTIVO ──────────────────────────────────────
// Actualiza las coordenadas [lat, lng] con las ubicaciones exactas
// (puedes buscarlas en Google Maps con clic derecho → "¿Qué hay aquí?")

const MAP_CENTER = [38.4776, -0.7976];
const MAP_ZOOM   = 15;

const MAP_LOCATIONS = [
  {
    id: 'cuartelillo',
    name: 'Cuartelillo Ziros — La Alkazaba',
    coords: [38.4808, -0.7997], // ← Actualiza con las coordenadas reales
    icon: '🏰',
    desc: 'Nuestro cuartelillo durante las fiestas de 2026',
    own: true,
  },
  {
    id: 'castillo',
    name: 'Castillo de Elda',
    coords: [38.4818, -0.8005],
    icon: '🏯',
    desc: 'Castillo histórico de Elda',
  },
  {
    id: 'ayuntamiento',
    name: 'Ayuntamiento de Elda',
    coords: [38.4751, -0.7973],
    icon: '🏛️',
    desc: 'Plaza del Ayuntamiento · Corazón del desfile',
  },
  {
    id: 'parque',
    name: 'Parque Municipal',
    coords: [38.4760, -0.7985],
    icon: '🌳',
    desc: 'Zona de concentración de comparsas',
  },
];
