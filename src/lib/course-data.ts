export type ScenarioOption = {
  id: string;
  label: string;
  correct?: boolean;
  feedback: string;
};

export type QuizQ = {
  q: string;
  options: { id: string; text: string }[];
  correct: string;
  fbCorrect: string;
  fbIncorrect: string;
  tag?: string;
};

export const SCARF = [
  { key: "S", name: "Estatus", color: "coral", desc: "Tu posición relativa frente a los demás.", example: "'Eso no estuvo bien hecho' frente al equipo.", how: "Vergüenza, necesidad de justificarse." },
  { key: "C", name: "Certeza", color: "cobalt", desc: "Capacidad de predecir lo que va a pasar.", example: "Feedback vago, sin contexto ni consecuencias.", how: "Ansiedad, rumiación, necesidad de control." },
  { key: "A", name: "Autonomía", color: "mint", desc: "Sensación de control sobre tus decisiones.", example: "Feedback que suena a orden, sin espacio.", how: "Resistencia, necesidad de contradecir." },
  { key: "R", name: "Relación", color: "violet-brand", desc: "Confianza y vínculo con quien te habla.", example: "Feedback de alguien con quien hay conflicto.", how: "'No es quién para decirme esto.'" },
  { key: "F", name: "Equidad", color: "amber-brand", desc: "Percepción de que las reglas son justas.", example: "Feedback que se percibe como arbitrario.", how: "Indignación, cierre emocional." },
] as const;

export const TRIGGERS = [
  {
    key: "verdad",
    name: "Disparador de Verdad",
    color: "coral",
    icon: "AlertCircle",
    summary: "El contenido del feedback parece incorrecto o incompleto.",
    detail: "Cuando se activa, descartamos el feedback completo aunque tenga una parte válida. La mente busca el error en el argumento en lugar de la información útil.",
    phrase: "'Eso no es cierto porque…' · 'No vio el contexto completo.'",
  },
  {
    key: "relacion",
    name: "Disparador de Relación",
    color: "amber-brand",
    icon: "Users",
    summary: "Reaccionas a la persona que lo da, no al contenido.",
    detail: "Stone & Heen lo llaman switchtracking: la conversación del feedback se transforma en conversación sobre la relación, y el contenido se pierde.",
    phrase: "'¿Y él me va a dar feedback a mí?' · 'Lo dice porque tiene algo en mi contra.'",
  },
  {
    key: "identidad",
    name: "Disparador de Identidad",
    color: "violet-brand",
    icon: "User",
    summary: "El feedback amenaza la narrativa de quién eres.",
    detail: "El más poderoso y difícil. Convierte una observación de comportamiento en un veredicto sobre la persona: 'mi presentación fue confusa' se vuelve 'soy incompetente'.",
    phrase: "'Nunca fui tan bueno como creía.' · '¿Para qué sigo intentándolo?'",
  },
] as const;

export const FEEDBACK_TYPES = [
  { key: "apreciacion", name: "Apreciación", color: "mint", what: "Reconocimiento del esfuerzo, valor o contribución.", purpose: "Motivar, reconocer, conectar emocionalmente.", signals: ["'Quería decirte que…'", "'Noté que…'", "'Aprecio mucho que…'"] },
  { key: "coaching", name: "Coaching", color: "cobalt", what: "Información orientada a mejorar habilidades o resultados futuros.", purpose: "Desarrollar, orientar, corregir hacia el futuro.", signals: ["'Algo que podrías mejorar es…'", "'Para la próxima vez te sugiero…'", "'He notado un patrón…'"] },
  { key: "evaluacion", name: "Evaluación", color: "amber-brand", what: "Valoración del desempeño frente a un estándar o expectativa.", purpose: "Informar posición, tomar decisiones (promoción, asignación).", signals: ["'Tu desempeño este período…'", "'De acuerdo con los objetivos pactados…'", "'Esto afecta tu evaluación…'"] },
] as const;

export const PNE_STEPS = [
  { num: "1", name: "PAUSA", color: "cobalt", time: "2–5 segundos", brain: "Activa la inhibición prefrontal sobre la amígdala.", do: "Respira. No hables. Si puedes: 'Dame un momento para procesar esto.'" },
  { num: "2", name: "NOMBRE", color: "amber-brand", time: "5–10 segundos internos", brain: "Affect labeling: etiquetar la emoción reduce su activación.", do: "Internamente: '¿Qué SCARF se activó? ¿Qué disparador reconozco?'" },
  { num: "3", name: "ELIGE", color: "mint", time: "Respuesta deliberada", brain: "Activa Autonomía: recuperas control y reduces la amenaza.", do: "Elige: abrir con pregunta · agradecer y posponer · agradecer y comprometerse." },
] as const;

// Scenarios
export const SCENARIO_M1: { setup: string; quote: string; question: string; options: ScenarioOption[] } = {
  setup: "Lunes. Reunión de equipo. Un compañero dice frente a todos: 'Rodrigo, la presentación de la semana pasada no comunicó bien el objetivo. Varias personas salieron sin entender qué se esperaba de ellas.'",
  quote: "Estatus activado. Tiene 3 segundos antes de que la reacción automática tome el control.",
  question: "Si estuvieras en el lugar de Rodrigo, ¿qué harías?",
  options: [
    { id: "A", label: "Responder de inmediato explicando las limitaciones y por qué fue así.", feedback: "Justificarse cierra la conversación antes de que dé información útil. El feedback original — que quizás tenía algo válido — se pierde en la negociación de quién tiene razón." },
    { id: "B", label: "Quedarte en silencio, decir 'sí, gracias' y por dentro descartarlo.", feedback: "Protege el Estatus en el corto plazo, pero también protege el statu quo. Si hay algo válido, no se transforma en aprendizaje." },
    { id: "C", label: "Pausa breve, nombrar internamente 'estatus amenazado' y preguntar: '¿Qué parte específicamente no quedó clara?'", correct: true, feedback: "¡Exacto! Dos segundos bastan para que el córtex prefrontal retome el control. Nombrar reduce la carga (affect labeling). La pregunta abre el feedback. Rodrigo descubrió que solo era la última diapositiva — fácil de resolver." },
    { id: "D", label: "Pedir hablar del tema después, fuera del grupo.", feedback: "A veces es la respuesta más madura. En este caso era algo concreto y manejable: posponer puede ser ganar tiempo real o evitar la incomodidad. La diferencia está en la intención." },
  ],
};

export const SCENARIO_M2: { setup: string; voices: string[]; question: string; options: ScenarioOption[] } = {
  setup: "Después de la reunión, Rodrigo procesa lo que pasó. Nota tres voces simultáneas en su cabeza:",
  voices: [
    "'Eso no es del todo cierto. Sí puse los próximos pasos, estaban en la diapositiva 8.'",
    "'Encima lo dijo frente a todos. Si tenía algo que decir, me lo pudo haber dicho antes.'",
    "'Llevo años haciendo presentaciones. ¿Ahora resulta que no sé comunicar?'",
  ],
  question: "Tiene los tres disparadores activos. ¿Qué harías?",
  options: [
    { id: "A", label: "Dejar que las tres voces se desarrollen hasta convencerte de que el feedback no fue válido.", feedback: "Los disparadores construyen un caso completo contra el feedback. Al final, Rodrigo habrá perdido la información útil." },
    { id: "B", label: "Ignorarlas y aceptar el feedback sin procesarlo.", feedback: "Aceptar por las razones equivocadas no es mejor que rechazar. No aprenderá nada específico." },
    { id: "C", label: "Nombrar cada voz ('verdad', 'relación', 'identidad'), separarlas del contenido y preguntarte: ¿qué parte seguiría siendo válida sin estas reacciones?", correct: true, feedback: "¡Correcto! Rodrigo nombró cada disparador y se preguntó qué quedaría sin ellos. La respuesta fue clara: la última diapositiva sí pudo ser más explícita. Eso era accionable." },
    { id: "D", label: "Hablar con un compañero de confianza para validar si fue justo.", feedback: "Puede ayudar a procesar el impacto, pero si la conversación busca confirmación de injusticia, no genera aprendizaje." },
  ],
};

export const SCENARIO_M3: { setup: string; question: string; options: ScenarioOption[] } = {
  setup: "Rodrigo quiere saber qué hizo bien y qué podría mejorar para futuros proyectos, pero no está seguro de cómo abordar el tema.",
  question: "Si estuvieras en su lugar, ¿qué harías?",
  options: [
    { id: "A", label: "Esperaría a que mi líder me diera feedback cuando lo considerara necesario.", feedback: "Es una reacción común, pero esperar pasivamente puede retrasar tu aprendizaje. Si nadie inicia la conversación, podrías perder oportunidades valiosas para mejorar." },
    { id: "B", label: "Le preguntaría a mi líder: '¿Todo estuvo bien con el proyecto?'", feedback: "Es un buen primer paso porque tomas la iniciativa. Sin embargo, una pregunta tan general suele generar respuestas igual de generales, como 'Sí, todo bien', sin información realmente útil." },
    { id: "C", label: "Solicitaría unos minutos para conversar y preguntaría: 'Quisiera seguir mejorando. ¿Qué consideras que hice bien en este proyecto y cuál sería una acción concreta que podría implementar para obtener mejores resultados en el siguiente?'", correct: true, feedback: "¡Excelente decisión! Pides feedback de forma oportuna, expresas tu intención de aprender y haces preguntas específicas que facilitan recibir comentarios claros y accionables." },
    { id: "D", label: "Le pediría retroalimentación a varios compañeros para comparar opiniones y decidir cuál seguir.", feedback: "Buscar diferentes perspectivas puede enriquecer tu aprendizaje. Sin embargo, cuando se trata de expectativas sobre tu desempeño, es recomendable comenzar con la persona que observa tu trabajo desde el rol de liderazgo y puede orientarte con mayor claridad." },
  ],
};

export const QUIZ_M3_AUTO: QuizQ[] = [
  {
    q: "Terminas un proyecto importante y nadie comenta tu desempeño. ¿Qué haces?",
    options: [
      { id: "A", text: "Espero a que mi líder me dé feedback cuando tenga oportunidad." },
      { id: "B", text: "Pregunto si todo estuvo bien." },
      { id: "C", text: "Solicito unos minutos para pedir retroalimentación específica sobre lo que hice bien y lo que puedo mejorar." },
    ],
    correct: "C",
    fbCorrect: "¡Correcto! La iniciativa y las preguntas específicas generan un feedback de mayor valor.",
    fbIncorrect: "Esperar puede retrasar oportunidades de aprendizaje y una pregunta general suele generar respuestas poco útiles. La opción C combina iniciativa y especificidad.",
  },
  {
    q: "¿Cuál de estas preguntas tiene más probabilidades de generar feedback útil?",
    options: [
      { id: "A", text: "¿Todo bien?" },
      { id: "B", text: "¿Qué opinas?" },
      { id: "C", text: "¿Qué acción tendría mayor impacto si quiero mejorar mi desempeño en la siguiente entrega?" },
    ],
    correct: "C",
    fbCorrect: "¡Correcto! Las preguntas específicas ayudan a recibir respuestas específicas y accionables.",
    fbIncorrect: "Las preguntas generales generan respuestas generales. Las preguntas específicas generan feedback accionable.",
  },
  {
    q: "Recibes un comentario con el que no estás completamente de acuerdo. ¿Qué haces primero?",
    options: [
      { id: "A", text: "Explico inmediatamente por qué actué así." },
      { id: "B", text: "Escucho, hago preguntas para entender mejor el comentario y agradezco la retroalimentación." },
      { id: "C", text: "Lo ignoro porque cada persona tiene una opinión diferente." },
    ],
    correct: "B",
    fbCorrect: "¡Correcto! Antes de responder, procura comprender. Escuchar con apertura te permitirá identificar qué información puede ayudarte a mejorar.",
    fbIncorrect: "Antes de justificar o descartar, escucha y pregunta para comprender. Ahí está la información útil.",
  },
  {
    q: "¿Cuál es el mejor momento para pedir feedback?",
    options: [
      { id: "A", text: "Durante la evaluación anual." },
      { id: "B", text: "Cuando haya un problema." },
      { id: "C", text: "Poco después de una actividad o proyecto importante, mientras los hechos aún están recientes." },
    ],
    correct: "C",
    fbCorrect: "¡Correcto! Mientras más cercana esté la conversación al evento, más fácil será recibir ejemplos concretos y recomendaciones útiles.",
    fbIncorrect: "Mientras más cercano al evento, mejor. Esperar a la evaluación o al problema reduce la utilidad del feedback.",
  },
];

export const SCENARIO_M4: { setup: string; question: string; options: ScenarioOption[] } = {
  setup: "Jueves. Reunión de dirección. Un director que respetas dice: 'Rodrigo, tomaste decisiones unilaterales que debieron consultarse. Eso generó fricciones evitables.' Silencio. Todos miran. Los tres disparadores se activan a la vez.",
  question: "Tienes 3–5 segundos antes de la reacción automática. ¿Qué haces?",
  options: [
    { id: "A", label: "Defender las decisiones explicando contexto y razones.", feedback: "Defender antes de procesar cierra la conversación y señala que no estás en modo de aprendizaje. La credibilidad se gana respondiendo, no reaccionando." },
    { id: "B", label: "Asentir y decir 'tienes razón' aunque por dentro no estés de acuerdo.", feedback: "Comunicación pasiva sin procesamiento real. La falta de convicción se percibe y no hay compromiso real de cambio." },
    { id: "C", label: "Pausa, nombrar internamente los disparadores, decir: 'Escucho lo que dices. ¿Puedes darme un ejemplo concreto? Quiero entender bien.'", correct: true, feedback: "¡Correcto! La pausa fue de 3 segundos. El naming, interno. La pregunta, precisa. El director dio el ejemplo. Rodrigo vio que en ese caso sí había una decisión que debió consultarse. Asumió su parte y acordó un proceso para el siguiente proyecto." },
    { id: "D", label: "Decir: 'Prefiero que conversemos esto en privado' y pasar al siguiente punto.", feedback: "En algunos contextos es correcto. Aquí puede leerse como evitación. Funciona si lo haces después de la pausa y con tono genuino — pierde valor si es un escape inmediato." },
  ],
};

// Formative quizzes
export const QUIZ_M1: QuizQ[] = [
  {
    q: "Recibes feedback de tu líder sobre un error en un reporte. Tu primera reacción interna es: 'Esto no es justo, a otros les han pasado cosas peores y nadie dijo nada.' ¿Qué dominio SCARF se activó?",
    options: [{id:"A",text:"Estatus"},{id:"B",text:"Certeza"},{id:"C",text:"Equidad"},{id:"D",text:"Autonomía"}],
    correct: "C",
    fbCorrect: "¡Correcto! La sensación de que las reglas no se aplican igual activa Equidad, que el cerebro defiende con la misma intensidad que una amenaza física.",
    fbIncorrect: "C es la respuesta. 'A otros no les dijeron nada' = percepción de injusticia = Equidad. Estatus sería '¿qué pensarán de mí?', Certeza '¿qué consecuencias tendrá?', Autonomía '¿por qué me dice cómo hacer mi trabajo?'.",
  },
];

export const QUIZ_M2: QuizQ[] = [
  {
    q: "Tu líder te da feedback sobre tu manera de comunicarte. Piensas: 'Él tampoco se comunica bien, no tiene autoridad moral para decirme esto.' ¿Qué disparador se activó?",
    options: [{id:"A",text:"De verdad — el contenido parece incorrecto."},{id:"B",text:"De relación — reaccionas a la persona, no al contenido."},{id:"C",text:"De identidad — el feedback amenaza quién eres."},{id:"D",text:"Una combinación de los tres."}],
    correct: "B",
    fbCorrect: "¡Correcto! El feedback se descarta por la fuente antes de evaluar el contenido. Es la firma del disparador de relación.",
    fbIncorrect: "La atención está en la persona ('él tampoco'), no en el contenido. Eso es disparador de relación.",
  },
];

export const QUIZ_M3: QuizQ[] = [
  {
    q: "Tu líder dice: 'Quiero hablarte de tu desempeño en el último trimestre en relación con los objetivos que pactamos.' ¿Qué tipo de feedback recibirás?",
    options: [{id:"A",text:"Apreciación"},{id:"B",text:"Coaching"},{id:"C",text:"Evaluación"},{id:"D",text:"No es posible saberlo."}],
    correct: "C",
    fbCorrect: "¡Correcto! 'Objetivos pactados' es la señal de evaluación: valoración del desempeño frente a un estándar previamente acordado.",
    fbIncorrect: "Las palabras 'desempeño' y 'objetivos que pactamos' son marcadores de evaluación.",
  },
];

export const QUIZ_M4: QuizQ[] = [
  {
    q: "Recibes feedback crítico en una reunión. Sientes que es injusto. Según Pausa-Nombre-Elige, ¿cuál es el orden correcto?",
    options: [
      {id:"A",text:"Nombrar el disparador → defender con calma → elegir si es válido."},
      {id:"B",text:"Pausa → nombrar internamente qué se activó → elegir la respuesta más productiva."},
      {id:"C",text:"Elegir si es válido → pausa → nombrar la emoción."},
      {id:"D",text:"Pausa → defender con evidencia → elegir qué parte tomar."},
    ],
    correct: "B",
    fbCorrect: "¡Correcto! Primero pausa (detiene reacción), luego nombre (separa emoción del contenido), luego elección (respuesta deliberada).",
    fbIncorrect: "B es la única opción que respeta el orden funcional. Cambiar el orden reduce el efecto de cada paso.",
  },
];

export const FINAL_QUIZ: QuizQ[] = [
  {
    q: "Tu líder te da feedback sobre algo que hiciste bien en circunstancias difíciles. Tu primera reacción es indignación. Según SCARF, ¿qué dominio se activó?",
    options: [{id:"A",text:"Certeza — no esperabas el feedback."},{id:"B",text:"Equidad — sientes que no es justo dado el contexto."},{id:"C",text:"Relación — no confías en el criterio del líder."},{id:"D",text:"Autonomía — te dicen cómo hacer tu trabajo."}],
    correct: "B",
    fbCorrect: "¡Correcto! Indignación ante feedback percibido como injusto = Equidad. (Módulo 1)",
    fbIncorrect: "La indignación por injusticia es Equidad. Certeza sería ansiedad, no indignación.",
    tag: "M1",
  },
  {
    q: "Alguien de otra área te da feedback. Piensas: 'No tiene la información completa.' ¿Qué haces antes de responder?",
    options: [
      {id:"A",text:"Explicarle todo el contexto del proceso."},
      {id:"B",text:"Pausa, nombrar el disparador de verdad y preguntar: '¿Qué parte observas como mejorable?'"},
      {id:"C",text:"Evaluar si tiene suficiente experiencia para dar ese feedback."},
      {id:"D",text:"Agradecer y descartar porque no tiene contexto."},
    ],
    correct: "B",
    fbCorrect: "¡Correcto! 'No tiene la información' es el disparador de verdad. Pausa, nombra y abre con pregunta. (Módulos 2 y 4)",
    fbIncorrect: "Solo B aplica la secuencia: pausa, naming y pregunta abierta antes de evaluar el contenido.",
    tag: "M2+M4",
  },
  {
    q: "Tu líder dice 'quería reconocerte el trabajo de este mes' y a los dos minutos empieza a darte sugerencias de mejora. ¿Qué ocurrió?",
    options: [
      {id:"A",text:"El líder cambió de opinión sobre tu desempeño."},
      {id:"B",text:"Mezcló apreciación y coaching sin alinear expectativas, lo que genera confusión."},
      {id:"C",text:"Es una evaluación formal disfrazada de reconocimiento."},
      {id:"D",text:"Combinó los dos tipos correctamente — así debe darse el feedback."},
    ],
    correct: "B",
    fbCorrect: "¡Correcto! Mezclar tipos sin alinear el propósito hace que el coaching invalide el reconocimiento. (Módulo 3)",
    fbIncorrect: "El cambio sin señal explícita genera confusión sobre el propósito real de la conversación.",
    tag: "M3",
  },
  {
    q: "Un feedback activa fuertemente tu disparador de identidad. ¿Cuál es el primer paso?",
    options: [
      {id:"A",text:"Evaluar objetivamente si es verdad."},
      {id:"B",text:"Pausa y nombrar: 'Esto está tocando mi identidad, no es un veredicto, es una observación.'"},
      {id:"C",text:"Pedir a la persona que reformule."},
      {id:"D",text:"Compartirlo con alguien de confianza."},
    ],
    correct: "B",
    fbCorrect: "¡Correcto! Cuando se activa identidad, el cerebro convierte observación en veredicto. El naming interrumpe ese proceso. (Módulos 2 y 4)",
    fbIncorrect: "Evaluar objetivamente antes de gestionar la emoción garantiza sesgo. Primero, nombra.",
    tag: "M2+M4",
  },
  {
    q: "Alguien que no respetas profesionalmente te da feedback que sí tiene un punto válido. ¿Cuál es la respuesta más productiva?",
    options: [
      {id:"A",text:"Descartarlo porque la fuente no tiene credibilidad."},
      {id:"B",text:"Aceptarlo completo para no parecer defensivo."},
      {id:"C",text:"Identificar que se activó relación, separar y evaluar el contenido por sus méritos."},
      {id:"D",text:"Pedir el mismo feedback a alguien de confianza."},
    ],
    correct: "C",
    fbCorrect: "¡Correcto! Separar el contenido del mensajero es una de las habilidades más valiosas. (Módulos 2 y 4)",
    fbIncorrect: "El disparador de relación descarta lo válido. Solo C lo gestiona para recuperar el contenido.",
    tag: "M2+M4",
  },
  {
    q: "Terminaste de recibir un feedback difícil y decidiste procesarlo bien. ¿La acción más importante en las 48 horas siguientes?",
    options: [
      {id:"A",text:"Compartir con el equipo que estás trabajando en ello."},
      {id:"B",text:"Construir un plan si-entonces con comportamiento, situación y obstáculo anticipado."},
      {id:"C",text:"Listar todo lo que el feedback no contempló."},
      {id:"D",text:"Esperar a tu siguiente evaluación para ver si era fundado."},
    ],
    correct: "B",
    fbCorrect: "¡Correcto! Las intenciones solas predicen <30% del cambio real. Los planes si-entonces lo multiplican. (Módulo 5)",
    fbIncorrect: "Solo B cierra la brecha entre recibir y cambiar.",
    tag: "M5",
  },
  {
    q: "Tu líder te da feedback. Antes de que termine su frase, ya sabes lo que vas a responder. ¿Qué pasa y qué debes hacer?",
    options: [
      {id:"A",text:"Eres ágil. Puedes responder."},
      {id:"B",text:"Disparador de verdad activado: ya estás construyendo contraargumento. Aplica la pausa."},
      {id:"C",text:"Escucha evaluativa. Responde cuando termines de evaluar."},
      {id:"D",text:"Es señal de que el feedback no tiene sustento."},
    ],
    correct: "B",
    fbCorrect: "¡Correcto! Preparar respuesta mientras la otra persona habla = la reacción automática tomó el control. (Módulos 1 y 4)",
    fbIncorrect: "Velocidad ≠ procesamiento real. Esa es la señal de que necesitas la pausa.",
    tag: "M1+M4",
  },
  {
    q: "Recibes feedback sobre algo en lo que llevas meses trabajando. Sugiere que no has avanzado. ¿Qué se activa con más fuerza?",
    options: [
      {id:"A",text:"Estatus — cómo te ve tu líder."},
      {id:"B",text:"Certeza — qué implica para tu evaluación."},
      {id:"C",text:"Identidad — el feedback toca tu narrativa de esfuerzo y dedicación."},
      {id:"D",text:"Relación — dudas que tu líder haya observado tu progreso."},
    ],
    correct: "C",
    fbCorrect: "¡Correcto! Cuando el feedback niega el esfuerzo prolongado, el disparador de identidad es el más poderoso. (Módulos 1 y 2)",
    fbIncorrect: "Meses de esfuerzo + 'no es suficiente' = amenaza existencial = identidad.",
    tag: "M1+M2",
  },
  {
    q: "Tu plan si-entonces es: 'Voy a mejorar mi comunicación con el equipo.' ¿Qué problema tiene?",
    options: [
      {id:"A",text:"Es demasiado ambicioso."},
      {id:"B",text:"No especifica comportamiento concreto, situación ni obstáculo — es intención, no plan."},
      {id:"C",text:"Debería incluir una fecha límite."},
      {id:"D",text:"No es necesario un plan si el feedback fue claro."},
    ],
    correct: "B",
    fbCorrect: "¡Correcto! Sin especificidad, el plan no es un plan. La brecha intención-comportamiento permanece abierta. (Módulo 5)",
    fbIncorrect: "Sin el 'si' (situación) y el comportamiento observable, sigue siendo solo intención.",
    tag: "M5",
  },
  {
    q: "Tienes un feedback que descartaste hace semanas. Ahora ves que probablemente tenía razón. ¿Qué haces?",
    options: [
      {id:"A",text:"Lo dejas pasar. Ya es historia."},
      {id:"B",text:"Te preguntas por qué lo descartaste y construyes hoy el plan si-entonces que no construiste antes."},
      {id:"C",text:"Buscas a quien te lo dio para pedirle disculpas."},
      {id:"D",text:"Esperas a recibirlo de nuevo."},
    ],
    correct: "B",
    fbCorrect: "¡Correcto! El aprendizaje no tiene fecha de caducidad. Recuperar feedback descartado demuestra el máximo nivel de madurez. (Los 5 módulos)",
    fbIncorrect: "Solo B convierte el reconocimiento tardío en acción — que es exactamente recibir feedback bien.",
    tag: "Integrador",
  },
];

export const MODULES = [
  { id: 0, code: "M0", title: "¿Por qué duele aunque quieras mejorar?", subtitle: "Introducción", color: "coral", duration: "5 min" },
  { id: 1, code: "M1", title: "Lo que le pasa a tu cerebro", subtitle: "Disparadores y neurociencia", color: "cobalt", duration: "15 min" },
  { id: 2, code: "M2", title: "Si no te lo dan, pídelo", subtitle: "Buscar feedback proactivamente", color: "mint", duration: "12 min" },
  { id: 3, code: "M3", title: "Pausa, nombre y elige", subtitle: "La técnica para recibirlo bien", color: "violet-brand", duration: "12 min" },
  { id: 4, code: "M4", title: "De la emoción a la acción", subtitle: "Tu plan real", color: "coral", duration: "8 min" },
] as const;
