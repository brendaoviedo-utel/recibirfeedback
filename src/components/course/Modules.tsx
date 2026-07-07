import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Brain, Zap, Target, Sparkles, BookOpen, Activity, MessageSquare, Heart, Scale, Compass, ShieldAlert, Users, User, ArrowRight, ArrowLeft, ZoomIn, X, Save } from "lucide-react";
import feedbackSceneAsset from "@/assets/feedback-scene.png.asset.json";
import rodrigoStoryAsset from "@/assets/rodrigo-story.png.asset.json";
import m1SituacionAsset from "@/assets/m1-situacion.png.asset.json";
import m1ResolucionAsset from "@/assets/m1-resolucion.png.asset.json";

const feedbackScene = feedbackSceneAsset.url;
const rodrigoStory = rodrigoStoryAsset.url;
import {
  SCARF, TRIGGERS, FEEDBACK_TYPES, PNE_STEPS,
  SCENARIO_M1, SCENARIO_M2, SCENARIO_M3, SCENARIO_M4,
} from "@/lib/course-data";
import { ScenarioChoice, ReflectionCard, colorOf } from "./Interactives";

const SCARF_ICONS: Record<string, any> = { S: Compass, C: Target, A: Sparkles, R: Heart, F: Scale };
const TRIG_ICONS: Record<string, any> = { verdad: ShieldAlert, relacion: Users, identidad: User };

/* ============== MODULE 0 ============== */
export function Module0({ onNext }: { onNext: () => void }) {
  const [poll, setPoll] = useState<number | null>(null);
  const pollOptions = [
    "Me pongo a la defensiva aunque por fuera no lo parezca.",
    "Asiento y digo que sí, pero internamente lo descarto.",
    "Me afecta más de lo que debería y lo rumio después.",
    "Trato de evaluar si es justo antes de tomarlo en cuenta.",
    "Generalmente lo escucho con apertura y busco qué hacer.",
  ];
  return (
    <Sections>
      <Hero color="coral" eyebrow="Módulo 0 · Apertura" title="¿Por qué el feedback duele aunque quieras mejorar?" lead="Una pista: no es por tu actitud. Es por tu cerebro." />

      <Section title="La escena que todos hemos vivido" kicker="SITUACIÓN" intro="Todos hemos vivido este momento: un comentario inesperado, una crítica en medio de una reunión, y algo dentro se activa antes de que podamos pensar. Antes de entender por qué, mira la escena.">
        <div className="card-surface overflow-hidden">
          <img
            src={feedbackScene}
            alt="Persona recibiendo feedback en una reunión"
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
          <div className="p-6 md:p-8 space-y-4 text-base leading-relaxed text-foreground/85">
            <p><b>No es debilidad, es tu cerebro protegiéndote.</b></p>
            <p>Está tratando de mantenerte a salvo del rechazo, la crítica o el error.</p>
            <p>Puedes elegir qué hacer después.</p>
            <p>Entender lo que pasa dentro de ti te da espacio para responder en lugar de reaccionar.</p>
          </div>
        </div>
      </Section>

      <Section title="Tres ideas que lo cambian todo" kicker="El marco del curso">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Brain, color: "cobalt", title: "Es biología, no carácter", body: "El cerebro trata el feedback crítico como amenaza social. Activa el mismo sistema que con las amenazas físicas. Tu sistema nervioso está haciendo su trabajo. " },
            { icon: Zap, color: "amber-brand", title: "Los disparadores, no el contenido", body: "Rechazamos el feedback porque algo se activa en nosotros: los disparadores. Identificarlos te permitirá dejar de reaccionar y empezar a elegir." },
            { icon: Target, color: "mint", title: "El receptor controla el resultado", body: "La persona que sabe recibir feedback aprende incluso de conversaciones imperfectas. Esa habilidad depende únicamente de ti." },
          ].map((c, i) => {
            const cc = colorOf(c.color);
            const Icon = c.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="card-surface p-5">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${cc.soft} mb-3`}>
                  <Icon className={`h-5 w-5 ${cc.text}`} />
                </div>
                <p className="text-xs font-bold tracking-wider uppercase text-muted-foreground mb-1">Idea {i + 1}</p>
                <h4 className="font-bold mb-2">{c.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section title="Conoce a Rodrigo" kicker="PARA IR DESCUBRIENDO CÓMO ESAS 3 IDEAS COBRAN VIDA...">
        <ZoomableImage src={rodrigoStory} alt="Conoce a Rodrigo: su historia ilustrada" />
        <p className="mt-5 text-base leading-relaxed text-foreground/85">
          A lo largo de este curso, verás cómo Rodrigo aprende a procesar ese feedback. No de forma perfecta. Pero sí de una forma que lo llevará a un lugar diferente al que hubiera llegado de no haberlo recibido.
        </p>
      </Section>

      <Section title="Antes de empezar" kicker="Pregunta detonadora">
        <div className="card-surface p-6">
          <p className="text-base font-semibold mb-4">Cuando recibes feedback inesperado, ¿cuál es tu reacción más frecuente?</p>
          <div className="grid gap-2">
            {pollOptions.map((opt, i) => (
              <button key={i} onClick={() => setPoll(i)}
                className={`text-left rounded-xl border-2 px-4 py-3 text-sm transition ${poll === i ? "border-[var(--coral)] bg-[var(--coral)]/8 font-semibold" : "border-border hover:border-foreground/30"}`}>
                {opt}
              </button>
            ))}
          </div>
          {poll !== null && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-muted-foreground">
              Gracias por tu honestidad. No hay respuesta correcta — el solo hecho de notarlo es el inicio.
            </motion.p>
          )}
        </div>
      </Section>

      <NavigationButtons onNext={onNext} />
    </Sections>
  );
}

/* ============== MODULE 1 — SCARF ============== */
export function Module1({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [activeScarf, setActiveScarf] = useState<string>("S");
  const sel = SCARF.find((s) => s.key === activeScarf)!;
  const c = colorOf(sel.color);

  return (
    <Sections>
      <Hero color="cobalt" eyebrow="Módulo 1 · Neurociencia" title="Lo que le pasa a tu cerebro cuando alguien te da feedback" lead='"La defensividad no es falta de madurez. Es tu cerebro haciendo lo que evolucionó para hacer."' />

      <Section title="Lunes 9:00 a.m. — la reunión" kicker="SITUACIÓN" intro="Para entender qué le pasa a tu cerebro cuando recibes feedback, empecemos por una escena concreta. Observa lo que ocurre en Rodrigo en los segundos previos a que la razón tome el control.">
        <ZoomableImage src={m1SituacionAsset.url} alt="Rodrigo recibe feedback: reacción de amenaza en el cerebro" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { n: "1", title: "La amenaza es universal", body: "La respuesta de amenaza ante el feedback es universal — no importa el nivel, la experiencia o la confianza: el cerebro responde antes que la razón. Reconocerlo es el primer paso para gestionarlo.", color: "cobalt" },
            { n: "2", title: "Dos segundos que marcan la diferencia", body: "La diferencia entre los mejores y los demás no es que no sientan la amenaza — es que aprendieron qué hacer en los dos segundos siguientes.", color: "amber-brand" },
            { n: "3", title: "Responsabilidad compartida", body: "Crear condiciones para que el feedback se reciba bien es responsabilidad compartida — del que da y del que recibe. Este curso trabaja el lado del receptor.", color: "mint" },
          ].map((x, i) => {
            const cc = colorOf(x.color);
            return (
              <div key={i} className="card-surface p-5 border-t-4" style={{ borderTopColor: `var(--${x.color})` }}>
                <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${cc.bg} text-white text-sm font-bold mb-3`}>{x.n}</div>
                <h4 className="font-bold mb-2 text-base">{x.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{x.body}</p>
              </div>
            );
          })}
        </div>
      </Section>


      <Section title="El modelo SCARF · Explora cada dominio" kicker="MODELO EXPLICATIVO">
        <div className="card-surface p-5 mb-5 border-l-4 border-[var(--cobalt)]">
          <p className="text-sm leading-relaxed text-foreground/85">
            El neurocientífico <b>David Rock</b> identificó cinco dominios sociales que el cerebro monitorea constantemente en busca de amenazas o recompensas. A este modelo lo llamó <b>SCARF</b> (por sus siglas en inglés). Cuando uno o más de estos dominios se perciben amenazados, el cerebro activa la misma respuesta que ante una amenaza física: aumenta el <b>cortisol</b>, reduce la actividad del <b>córtex prefrontal</b> — la parte que necesitamos para razonar y aprender — y nos pone en modo defensivo.
          </p>
          <p className="text-sm leading-relaxed text-foreground/85 mt-3">
            El feedback crítico casi siempre amenaza <b>varios dominios al mismo tiempo</b>. Por eso es tan difícil recibirlo bien.
          </p>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Toca cada letra para explorar el dominio:</p>
        <div className="grid md:grid-cols-[auto_1fr] gap-6">
          <div className="flex md:flex-col gap-2 justify-center">
            {SCARF.map((s) => {
              const sc = colorOf(s.color);
              const Icon = SCARF_ICONS[s.key];
              const active = s.key === activeScarf;
              return (
                <button key={s.key} onClick={() => setActiveScarf(s.key)}
                  className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-2.5 transition ${active ? `${sc.bg} text-white border-transparent shadow-lg` : "border-border hover:border-foreground/30 bg-card"}`}>
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-bold">{s.key}</span>
                  <span className="hidden md:inline text-sm font-medium">{s.name}</span>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeScarf} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
              className={`card-surface p-5 md:p-6 border-l-4`} style={{ borderLeftColor: `var(--${sel.color})` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.soft}`}>
                  <span className={`text-xl font-black ${c.text}`}>{sel.key}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{sel.name}</h3>
                  <p className="text-xs text-muted-foreground">Dominio SCARF</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                <div className="rounded-xl p-4 bg-soft/60 border border-border/50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">¿Qué protege?</p>
                  <p className="text-sm leading-snug">{sel.desc}</p>
                </div>
                <div className="rounded-xl p-4 bg-soft/60 border border-border/50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Ejemplo</p>
                  <p className="text-sm leading-snug">{sel.example}</p>
                </div>
                <div className="rounded-xl p-4 bg-soft/60 border border-border/50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Manifestación</p>
                  <p className="text-sm leading-snug">{sel.how}</p>
                </div>
              </div>

              <div className={`rounded-2xl p-4 md:p-5 ${c.soft} border border-border/50`}>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${c.text} mb-3`}>Esquema · {sel.name}</p>
                <div className="flex flex-col md:flex-row gap-3 items-stretch">
                  {[
                    { label: "Disparo", text: sel.example },
                    { label: "Cerebro", text: `Se activa la amenaza en ${sel.name.toLowerCase()}: cortisol ↑, córtex prefrontal ↓.` },
                    { label: "Reacción", text: sel.how },
                    { label: "Palanca", text: `Nombrar internamente "${sel.name}" reduce la intensidad y devuelve el control.` },
                  ].map((row, i, arr) => (
                    <div key={i} className="flex-1 flex items-stretch gap-2">
                      <div className="flex-1 rounded-xl p-3 bg-white/60 border border-border/50">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className={`flex h-5 w-5 items-center justify-center rounded-full ${c.bg} text-white text-[10px] font-bold`}>{i + 1}</span>
                          <p className={`text-[10px] font-bold uppercase tracking-wider ${c.text}`}>{row.label}</p>
                        </div>
                        <p className="text-xs text-foreground/80 leading-relaxed">{row.text}</p>
                      </div>
                      {i < arr.length - 1 && <ArrowRight className="hidden md:block h-4 w-4 text-muted-foreground/40 self-center shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-5 text-sm italic text-muted-foreground">La clave no es eliminar la respuesta — eso no es posible. Es <b>reconocerla, nombrarla y elegir</b> cómo responder desde ahí.</p>
      </Section>


      <Section title="" kicker="¿TÚ QUÉ HARÍAS?">
        <SceneCard quote="Rodrigo identifica: 'Todo el mundo va a pensar que no sé hacer mi trabajo.' Eso es SCARF — dominio Estatus — activándose. Tiene 3 segundos antes de que la reacción tome el control." />
        <div className="mt-5">
          <ScenarioChoice {...SCENARIO_M1} accent="cobalt" />
        </div>
      </Section>

      <Section title="Dos segundos que lo cambian todo" kicker="RESOLUCIÓN">
        <ZoomableImage src={m1ResolucionAsset.url} alt="Rodrigo pasa de modo defensa a modo aprendizaje en dos segundos" />
      </Section>

      <ScarfSelfDiscovery />


      <Section title="Tu turno" kicker="Reflexión personal">
        <ReflectionWithSave accent="cobalt" prompts={[
          "¿Cuál de los 5 dominios SCARF sientes que se activa más cuando recibes feedback? ¿Qué situaciones lo disparan?",
          "¿Cómo se manifiesta en ti? ¿Qué haces o dejas de hacer en ese momento?",
          "Compromiso: La próxima vez que reciba feedback que active mi dominio dominante, voy a…",
        ]} />
      </Section>


      <NavigationButtons onNext={onNext} onPrev={onPrev} />
    </Sections>
  );
}

/* ============== MODULE 2 — Triggers ============== */
export function Module2({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  return (
    <Sections>
      <Hero color="amber-brand" eyebrow="Módulo 2 · Disparadores" title="Tus tres disparadores: lo que bloquea el feedback antes de que llegue" lead='"No rechazamos el feedback porque sea malo. Lo rechazamos porque activa algo en nosotros."' />

      <Section title="¿Has tenido alguno de estos pensamientos?" kicker="SITUACIÓN" intro="Antes de hablar de los disparadores, reconócelos en ti. Son voces internas que se activan antes de que el contenido del feedback llegue realmente a procesarse. Estas tres frases probablemente ya las has pensado.">
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { t: "'Eso no es cierto. No tenía el contexto completo para decirme eso.'", c: "coral" },
            { t: "'¿Y él me va a dar feedback a mí? Que primero se fije en lo suyo.'", c: "amber-brand" },
            { t: "'Si eso es lo que piensan de mí, nunca fui tan bueno como creía.'", c: "violet-brand" },
          ].map((b, i) => {
            const cc = colorOf(b.c);
            return (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }}
                className={`relative rounded-2xl p-5 ${cc.soft} border-2 border-transparent`} style={{ borderColor: `var(--${b.c})` }}>
                <div className={`absolute -top-2 -left-2 h-6 w-6 rounded-full ${cc.bg} text-white flex items-center justify-center text-xs font-bold`}>{i + 1}</div>
                <p className="text-sm font-medium italic leading-relaxed">{b.t}</p>
              </motion.div>
            );
          })}
        </div>
        <p className="mt-5 text-base text-foreground/80">No existe una respuesta correcta. Todos tenemos disparadores distintos. Estos pensamientos aparecen en segundos. No son el problema. El problema es creer que son la realidad. El objetivo no es eliminarlos, sino reconocerlos para responder con mayor conciencia.</p>
      </Section>

      <Section title="Los tres disparadores" kicker="Conceptos" intro="Stone y Heen identificaron tres disparadores que explican por qué el mismo feedback puede ser útil para una persona y bloqueante para otra. Toca cada tarjeta para descubrirlos.">
        <div className="grid md:grid-cols-3 gap-4 perspective-[1200px]">
          {TRIGGERS.map((t) => {
            const cc = colorOf(t.color);
            const Icon = TRIG_ICONS[t.key];
            const isFlipped = flipped[t.key];
            return (
              <div key={t.key} className="relative h-72 cursor-pointer" onClick={() => setFlipped((f) => ({ ...f, [t.key]: !f[t.key] }))}>
                <motion.div animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-2xl" style={{ transformStyle: "preserve-3d" }}>
                  {/* Front */}
                  <div className={`absolute inset-0 card-surface p-6 flex flex-col items-center justify-center text-center backface-hidden`} style={{ backfaceVisibility: "hidden", borderTop: `4px solid var(--${t.color})` }}>
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${cc.soft} mb-3`}>
                      <Icon className={`h-8 w-8 ${cc.text}`} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">{t.name}</h4>
                    <p className="text-sm text-muted-foreground">{t.summary}</p>
                    <p className="mt-4 text-xs uppercase tracking-wider font-bold text-muted-foreground">Toca para más ↻</p>
                  </div>
                  {/* Back */}
                  <div className={`absolute inset-0 card-surface p-5 overflow-y-auto`} style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderTop: `4px solid var(--${t.color})` }}>
                    <p className={`text-xs uppercase tracking-wider font-bold ${cc.text} mb-2`}>{t.name}</p>
                    <p className="text-sm leading-relaxed mb-3">{t.detail}</p>
                    <p className="text-xs italic text-muted-foreground">{t.phrase}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="" kicker="¿TÚ QUÉ HARÍAS?">
        <SceneCard quote={SCENARIO_M2.setup} />
        <div className="my-5 grid md:grid-cols-3 gap-4">
          {[
            { text: "Creo que está exagerando. No salió tan mal.", trigger: "Disparador de verdad", color: "coral" },
            { text: "¿Por qué decidió comentarlo justo en esta reunión?", trigger: "Disparador de relación", color: "violet-brand" },
            { text: "¿Y si esto confirma que no estoy dando el nivel?", trigger: "Disparador de identidad", color: "cobalt" },
          ].map((item, i) => {
            const cc = colorOf(item.color);
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-5 border-2 ${cc.soft}`} style={{ borderColor: `var(--${item.color})` }}>
                <p className={`text-xs font-bold uppercase tracking-wider ${cc.text} mb-2`}>{item.trigger}</p>
                <p className="text-base font-medium italic leading-relaxed">"{item.text}"</p>
              </motion.div>
            );
          })}
        </div>
        <ScenarioChoice question={SCENARIO_M2.question} options={SCENARIO_M2.options} accent="amber-brand" />
        <blockquote className="mt-6 border-l-4 border-[var(--amber-brand)] pl-4 italic text-foreground/80">
          "Nombrar los disparadores no los hizo desaparecer. Pero los hizo más pequeños que el feedback mismo." — Rodrigo
        </blockquote>
      </Section>

      <TriggerSelfDiscovery />


      <Section title="Tu turno" kicker="Reflexión personal">
        <ReflectionWithSave accent="amber-brand" prompts={[
          "¿Cuál de los 3 disparadores reconoces como más frecuente en ti? ¿En qué situaciones se activa con más fuerza?",
          "Piensa en un feedback reciente que te costó recibir. ¿Qué disparador estaba activo? ¿Había algo válido que no pudiste procesar?",
          "Mi protocolo cuando se activa mi disparador dominante: 'Cuando sienta que se activa, voy a… antes de responder.'",
        ]} />
      </Section>


      <NavigationButtons onNext={onNext} onPrev={onPrev} />
    </Sections>
  );
}

/* ============== MODULE 3 — Three types ============== */
export function Module3({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [tab, setTab] = useState(0);
  const t = FEEDBACK_TYPES[tab];
  const c = colorOf(t.color);
  return (
    <Sections>
      <Hero color="mint" eyebrow="Módulo 3 · Tipos de feedback" title="Tres conversaciones que se confunden" lead='"Muchas conversaciones de feedback fallan no porque sea malo, sino porque emisor y receptor hablan de cosas distintas sin saberlo."' />

      <Section title="Dos escenas reconocibles" kicker="SITUACIÓN" intro="No todo feedback busca lo mismo. Cuando el tipo de conversación no está claro entre quien lo da y quien lo recibe, la frustración es casi inevitable. Observa dos escenas que probablemente reconoces.">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card-surface p-5 border-l-4 border-[var(--coral)]">
            <p className="chip mb-3">Escena A</p>
            <p className="text-sm leading-relaxed">Termina un proyecto exigente. Comparte el resultado con su líder esperando <b>reconocimiento</b>. El líder le da una lista detallada de mejoras para la próxima vez.</p>
            <p className="mt-3 text-sm text-muted-foreground italic">Sale frustrado — aunque el feedback era técnicamente correcto.</p>
          </div>
          <div className="card-surface p-5 border-l-4 border-[var(--amber-brand)]">
            <p className="chip mb-3">Escena B</p>
            <p className="text-sm leading-relaxed">Recibe retroalimentación en una reunión. Al final pregunta: '¿Entonces cómo me fue en mi evaluación?' El líder responde: 'Esto no era una evaluación, era una conversación de desarrollo.'</p>
            <p className="mt-3 text-sm text-muted-foreground italic">Sale confundido y sin saber cómo usar la información.</p>
          </div>
        </div>
        <p className="mt-5 text-base text-foreground/80">No fue un problema de contenido. Fue un problema de <b>tipo</b>. Emisor y receptor no estaban hablando del mismo tipo de feedback.</p>
      </Section>

      <Section title="Los tres tipos · Compara" kicker="Concepto">
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {FEEDBACK_TYPES.map((ft, i) => {
            const cc = colorOf(ft.color);
            return (
              <button key={ft.key} onClick={() => setTab(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition ${tab === i ? `${cc.bg} text-white shadow-lg` : "bg-muted hover:bg-muted/70"}`}>
                {ft.name}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="card-surface p-6 border-t-4" style={{ borderTopColor: `var(--${t.color})` }}>
            <h3 className={`text-2xl font-bold ${c.text} mb-4`}>{t.name}</h3>
            <Field label="¿Qué es?" value={t.what} />
            <Field label="Propósito" value={t.purpose} />
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-4 mb-2">Señales que lo identifican</p>
            <ul className="space-y-1.5">
              {t.signals.map((s, i) => (
                <li key={i} className="text-sm italic flex items-start gap-2">
                  <MessageSquare className={`h-3.5 w-3.5 mt-1 ${c.text} shrink-0`} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <div className="mt-5 card-surface p-5 bg-[var(--mint)]/5 border-l-4 border-[var(--mint)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--mint)] mb-2">Pregunta de alineación más poderosa</p>
          <p className="text-base font-semibold">"¿Me estás dando esto para que sepa cómo me ves, para mejorar algo específico, o para reconocer algo que hice bien?"</p>
        </div>
      </Section>

      <Section title="" kicker="¿TÚ QUÉ HARÍAS?">
        <SceneCard quote={SCENARIO_M3.setup} />
        <div className="mt-5">
          <ScenarioChoice question={SCENARIO_M3.question} options={SCENARIO_M3.options} accent="mint" />
        </div>
        <blockquote className="mt-6 border-l-4 border-[var(--mint)] pl-4 italic text-foreground/80">
          "El problema no era que mi líder no me reconociera. Era que yo esperaba una conversación y llegué a otra. Cuando lo entendí, las dos tuvieron lugar." — Rodrigo
        </blockquote>
      </Section>

      <Section title="Tu turno" kicker="Reflexión personal">
        <ReflectionWithSave accent="mint" prompts={[
          "¿Recuerdas una conversación de feedback que generó frustración? ¿Hubo confusión entre los tres tipos?",
          "¿Qué tipo de feedback recibes más en tu área? ¿Cuál recibes menos y necesitarías más?",
          "Compromiso: La próxima vez que tenga una conversación de feedback, antes de empezar voy a preguntar…",
        ]} />
      </Section>


      <NavigationButtons onNext={onNext} onPrev={onPrev} />
    </Sections>
  );
}

/* ============== MODULE 4 — PNE ============== */
export function Module4({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [version, setVersion] = useState<"sin" | "con">("sin");
  return (
    <Sections>
      <Hero color="violet-brand" eyebrow="Módulo 4 · La técnica" title="Pausa, Nombre y Elige" lead='"Entre el feedback que recibes y la respuesta que das, hay un espacio. Pequeño, pero existe. Ese espacio es donde ocurre el aprendizaje — o donde se pierde."' />

      <Section title="El mismo feedback, dos desenlaces" kicker="SITUACIÓN" intro="Un mismo comentario puede terminar en cierre o en aprendizaje. Lo que marca la diferencia sucede en el pequeño espacio entre escuchar y responder. Compara las dos versiones.">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setVersion("sin")} className={`flex-1 rounded-full py-2.5 text-sm font-bold ${version === "sin" ? "bg-[var(--coral)] text-white" : "bg-muted"}`}>SIN pausa</button>
          <button onClick={() => setVersion("con")} className={`flex-1 rounded-full py-2.5 text-sm font-bold ${version === "con" ? "bg-[var(--mint)] text-white" : "bg-muted"}`}>CON pausa</button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={version} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            className={`card-surface p-6 border-l-4 ${version === "sin" ? "border-[var(--coral)]" : "border-[var(--mint)]"}`}>
            <TimelineLine label="Feedback" text="'Creo que tu presentación no fue lo suficientemente clara.'" />
            {version === "sin" ? (
              <>
                <TimelineLine label="Reacción automática (0.5 s)" text="'Eso no es justo. Yo me preparé mucho.'" accent="coral" />
                <TimelineLine label="Respuesta" text="'Pues yo creo que fue bastante clara, tal vez la audiencia no tenía el contexto.'" accent="coral" />
                <div className="mt-4 rounded-xl bg-[var(--coral)]/8 p-4 text-sm text-foreground">
                  ❌ El feedback se cierra. No genera aprendizaje. La relación se tensiona.
                </div>
              </>
            ) : (
              <>
                <TimelineLine label="Pausa · 3 segundos" text="(silencio · respiración)" accent="cobalt" />
                <TimelineLine label="Nombre (interno)" text="'Estatus activado. Es el disparador de verdad. Respira.'" accent="amber-brand" />
                <TimelineLine label="Elige · Respuesta" text="'¿Puedes decirme qué parte específicamente no quedó clara para ti?'" accent="mint" />
                <div className="mt-4 rounded-xl bg-[var(--mint)]/10 p-4 text-sm text-foreground">
                  ✅ El feedback se abre. Genera información concreta. La conversación avanza hacia algo útil.
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        <p className="mt-4 text-sm italic text-muted-foreground">Los mismos tres segundos. El mismo feedback. Resultados completamente diferentes.</p>
      </Section>

      <Section title="La secuencia paso a paso" kicker="Concepto">
        <div className="grid md:grid-cols-3 gap-4">
          {PNE_STEPS.map((s, i) => {
            const cc = colorOf(s.color);
            return (
              <motion.div key={s.num} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="card-surface p-5 relative overflow-hidden">
                <div className={`absolute top-0 right-0 h-24 w-24 ${cc.soft} rounded-full -translate-y-8 translate-x-8`} />
                <div className="relative">
                  <p className={`text-7xl font-black ${cc.text} leading-none`}>{s.num}</p>
                  <h4 className="text-lg font-bold mt-2">{s.name}</h4>
                  <p className={`chip mt-2 ${cc.soft} ${cc.text} border-transparent`}>⏱ {s.time}</p>
                  <Field label="Qué hace en el cerebro" value={s.brain} />
                  <Field label="Qué haces concretamente" value={s.do} />
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-5 card-surface p-5">
          <h4 className="font-bold mb-3">Tres respuestas para elegir en el paso 3</h4>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-[var(--cobalt)]/8 p-4">
              <p className="font-bold text-[var(--cobalt)] mb-1">Abrir con pregunta</p>
              <p className="text-xs text-muted-foreground mb-2">Cuando es vago o falta información.</p>
              <p className="italic">"¿Puedes decirme qué parte específicamente?"</p>
            </div>
            <div className="rounded-xl bg-[var(--amber-brand)]/10 p-4">
              <p className="font-bold text-[var(--amber-brand)] mb-1">Agradecer y posponer</p>
              <p className="text-xs text-muted-foreground mb-2">Cuando la emoción es muy intensa.</p>
              <p className="italic">"Gracias. Quiero procesarlo bien, ¿seguimos mañana?"</p>
            </div>
            <div className="rounded-xl bg-[var(--mint)]/10 p-4">
              <p className="font-bold text-[var(--mint)] mb-1">Agradecer y comprometerse</p>
              <p className="text-xs text-muted-foreground mb-2">Cuando es claro y tienes claridad.</p>
              <p className="italic">"Gracias. Voy a trabajar en X específicamente."</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="" kicker="¿TÚ QUÉ HARÍAS?">
        <SceneCard quote={SCENARIO_M4.setup} />
        <div className="mt-5">
          <ScenarioChoice question={SCENARIO_M4.question} options={SCENARIO_M4.options} accent="violet-brand" />
        </div>
        <blockquote className="mt-6 border-l-4 border-[var(--violet-brand)] pl-4 italic text-foreground/80">
          "Tres segundos. Eso fue todo lo que necesité para cambiar de modo. De defensa a aprendizaje." — Rodrigo
        </blockquote>
      </Section>

      <Section title="Tu turno" kicker="Reflexión personal">
        <ReflectionWithSave accent="violet-brand" prompts={[
          "Piensa en la última vez que recibiste feedback que activó algo fuerte. ¿Cuánto pasó entre el feedback y tu respuesta? ¿Qué hubiera cambiado con 3 segundos más?",
          "¿En qué situaciones (público, líder, alguien que no respetas) te será más difícil aplicar la pausa?",
          "Si recibo feedback que activa [disparador] en [contexto], entonces voy a [acción concreta].",
        ]} />
      </Section>


      <NavigationButtons onNext={onNext} onPrev={onPrev} />
    </Sections>
  );
}

/* ============== MODULE 5 — Plan ============== */
export function Module5({ onPrev }: { onPrev: () => void }) {
  const [plan, setPlan] = useState({ learned: "", change: "", when: "", obstacle: "" });
  const [saved, setSaved] = useState(false);
  const filled = Object.values(plan).every((v) => v.trim().length > 5);

  return (
    <Sections>
      <Hero color="coral" eyebrow="Módulo 5 · Acción" title="De la emoción a la acción" lead='"Recibir bien el feedback es la mitad del trabajo. La otra mitad es lo que haces con él en las 48 horas siguientes."' />

      <Section title="¿Qué pasó con Rodrigo?" kicker="Cierre de la historia">
        <div className="card-surface p-6 space-y-3 text-base leading-relaxed">
          <p>El viernes, Rodrigo buscó a su compañero — el que le dio el feedback el lunes. Le pidió 15 minutos.</p>
          <p>Le dijo algo que no había dicho en mucho tiempo: <b>'Quería agradecerte el feedback de la semana pasada. Me costó recibirlo. Pero tenías razón en la parte de la última diapositiva.'</b></p>
          <p>Su compañero respondió: 'Te lo digo porque me importa cómo te va. Eres de las personas del equipo de quien más aprendo.'</p>
          <p>Rodrigo pensó en todos los feedbacks que había descartado. No los recuperaría. Pero tenía algo mejor: <b>sabía exactamente qué hacer con el siguiente.</b></p>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-6 text-center space-y-1 text-lg font-semibold">
          {["El feedback no te define.", "Tampoco te destruye.", "Solo te da información.", "Lo que hagas con esa información", "sí define quién eliges ser."].map((l, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.3 }}>{l}</motion.p>
          ))}
        </motion.div>
      </Section>

      <Section title="Tu plan real" kicker="Herramienta">
        <div className="card-surface p-5 mb-4">
          <p className="text-sm leading-relaxed">Las intenciones generales predicen solo el <b>28%</b> del cambio real. Un <b>plan real</b> — que especifica qué, cuándo, dónde y cómo — multiplica el resultado.</p>
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-[var(--coral)]/8 p-4">
              <p className="font-bold mb-1">❌ Plan débil</p>
              <p className="italic">"Voy a mejorar mis presentaciones."</p>
            </div>
            <div className="rounded-xl bg-[var(--mint)]/10 p-4">
              <p className="font-bold mb-1">✅ Plan real</p>
              <p className="italic">"Cuando prepare una presentación para más de 3 personas, la última diapositiva incluirá siempre próximos pasos con nombre y fecha."</p>
            </div>
          </div>
        </div>

        <div className="card-surface p-6 space-y-4">
          <h4 className="font-bold flex items-center gap-2"><Activity className="h-5 w-5 text-[var(--coral)]" /> Construye tu plan</h4>
          {[
            { key: "learned", label: "1. ¿Qué aprendí del feedback? (lo más importante, una sola cosa)", placeholder: "Lo más válido, separado de mis disparadores, es…" },
            { key: "change", label: "2. ¿Qué voy a hacer diferente? (comportamiento específico)", placeholder: "Voy a…" },
            { key: "when", label: "3. ¿En qué situación lo aplicaré?", placeholder: "Cuando [situación específica]…" },
            { key: "obstacle", label: "4. ¿Qué obstáculo puede aparecer y cómo lo manejaré?", placeholder: "Si aparece [obstáculo], entonces voy a…" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-semibold mb-2">{f.label}</label>
              <textarea
                value={plan[f.key as keyof typeof plan]}
                onChange={(e) => setPlan((p) => ({ ...p, [f.key]: e.target.value }))}
                rows={2} placeholder={f.placeholder}
                className="w-full rounded-xl border border-border bg-soft px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--coral)]/30 focus:border-[var(--coral)]"
              />
            </div>
          ))}
          <button disabled={!filled} onClick={() => setSaved(true)}
            className="w-full rounded-full gradient-coral text-white py-3 font-bold disabled:opacity-40 hover:opacity-90">
            {saved ? "✓ Plan guardado" : "Guardar mi plan"}
          </button>
        </div>
      </Section>

      <Section title="¡Has completado el curso!" kicker="Cierre">
        <div className="card-surface gradient-cobalt text-white p-8 text-center">
          <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-90" />
          <h3 className="text-2xl font-bold mb-2">Gracias por recorrer esta experiencia</h3>
          <p className="text-white/90 max-w-md mx-auto text-sm">Lleva contigo tu plan real y aplícalo en las próximas 48 horas. Ahí es donde el aprendizaje se vuelve cambio.</p>
        </div>
        <div className="mt-6 flex justify-start">
          <button onClick={onPrev} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold hover:bg-muted transition">
            ← Regresar
          </button>
        </div>
      </Section>
    </Sections>
  );
}

/* ============== Shared building blocks ============== */
function Sections({ children }: { children: React.ReactNode }) {
  return <div className="space-y-10 md:space-y-14 pb-10">{children}</div>;
}

function Hero({ color, eyebrow, title, lead }: { color: string; eyebrow: string; title: string; lead: string }) {
  const c = colorOf(color);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl p-8 md:p-12 card-surface">
      <div className={`absolute -top-20 -right-20 h-64 w-64 rounded-full ${c.soft} blur-2xl`} />
      <div className="relative">
        <p className={`chip ${c.soft} ${c.text} border-transparent mb-4`}>{eyebrow}</p>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground italic max-w-2xl">{lead}</p>
      </div>
    </motion.div>
  );
}

function Section({ kicker, title, intro, children }: { kicker: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-1">{kicker}</p>
      {title && <h2 className="text-2xl md:text-3xl font-bold mb-5 tracking-tight">{title}</h2>}
      {intro && <p className="text-base leading-relaxed text-foreground/80 mb-5 max-w-3xl">{intro}</p>}
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm leading-relaxed">{value}</p>
    </div>
  );
}

function SceneCard({ quote }: { quote: string }) {
  return (
    <div className="card-surface p-6 bg-gradient-to-br from-[var(--soft)] to-white">
      <p className="text-base md:text-lg leading-relaxed italic">"{quote}"</p>
    </div>
  );
}

function DualSplit({ left, right }: { left: { title: string; lines: string[] }; right: { title: string; lines: string[] } }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card-surface p-5 bg-soft">
        <p className="chip mb-3">{left.title}</p>
        {left.lines.map((l, i) => <p key={i} className="text-sm py-1">{l}</p>)}
      </div>
      <div className="card-surface p-5 bg-[var(--coral)]/5 border-[var(--coral)]/20">
        <p className="chip bg-[var(--coral)]/10 text-[var(--coral)] border-transparent mb-3">{right.title}</p>
        {right.lines.map((l, i) => <p key={i} className="text-sm py-1 italic">{l}</p>)}
      </div>
    </div>
  );
}

function TimelineLine({ label, text, accent }: { label: string; text: string; accent?: string }) {
  const c = accent ? colorOf(accent) : null;
  return (
    <div className="flex gap-3 py-2.5 border-b border-border last:border-0">
      <div className={`shrink-0 w-32 text-xs font-bold uppercase tracking-wider ${c ? c.text : "text-muted-foreground"}`}>{label}</div>
      <p className="text-sm flex-1">{text}</p>
    </div>
  );
}

function NavigationButtons({ onNext, onPrev }: { onNext: () => void; onPrev?: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
      {onPrev && (
        <button onClick={onPrev}
          className="group inline-flex items-center gap-2 rounded-full border-2 border-border bg-card text-foreground px-7 py-3.5 font-bold hover:bg-muted transition order-2 sm:order-1">
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Regresar
        </button>
      )}
      <button onClick={onNext}
        className="group inline-flex items-center gap-2 rounded-full gradient-coral text-white px-7 py-3.5 font-bold shadow-[var(--shadow-glow)] hover:opacity-95 transition order-1 sm:order-2">
        Avanzar
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </div>
  );
}

function ReflectionWithSave({ prompts, accent }: { prompts: string[]; accent?: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-4">
      <ReflectionCard prompts={prompts} accent={accent} />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card-surface p-5 bg-soft/50">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Guardar tu reflexión te ayuda a convertir la intención en compromiso. Revisa estas notas en los próximos días para recordar lo que decidiste practicar.
        </p>
        <button
          onClick={() => setSaved(true)}
          className={`shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${saved ? "bg-[var(--mint)] text-white" : "bg-[var(--cobalt)] text-white hover:opacity-90"}`}
        >
          <Save className="h-4 w-4" />
          {saved ? "Guardado ✓" : "Guardar reflexión"}
        </button>
      </div>
    </div>
  );
}

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-border shadow-sm hover:shadow-lg transition"
        aria-label="Ampliar imagen"
      >
        <img src={src} alt={alt} className="w-full h-auto object-cover transition group-hover:scale-[1.01]" loading="lazy" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 text-white text-xs font-semibold px-3 py-1.5 backdrop-blur">
          <ZoomIn className="h-3.5 w-3.5" /> Ampliar
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 overflow-auto"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              src={src} alt={alt}
              className="max-w-[1600px] w-full h-auto rounded-xl cursor-zoom-out"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============== SCARF Self-Discovery Quiz (Módulo 1) ============== */
const SCARF_QUIZ: { q: string; options: { text: string; key: "S" | "C" | "A" | "R" | "F" }[] }[] = [
  {
    q: "Cuando recibes feedback crítico frente a otros, lo que más te incomoda es…",
    options: [
      { text: "Que mi imagen o competencia queden en duda ante los demás.", key: "S" },
      { text: "No entender exactamente qué esperan de mí a partir de ahora.", key: "C" },
      { text: "Sentir que me imponen cómo debo trabajar.", key: "A" },
      { text: "Que venga de alguien con quien no siento confianza.", key: "R" },
      { text: "Percibir que el criterio no se aplica igual a todos.", key: "F" },
    ],
  },
  {
    q: "El tipo de feedback que más te descoloca es…",
    options: [
      { text: "El que expone un error mío frente al equipo.", key: "S" },
      { text: "El que es vago, sin ejemplos ni consecuencias claras.", key: "C" },
      { text: "El que suena a orden más que a conversación.", key: "A" },
      { text: "El que llega de alguien con quien hay tensión previa.", key: "R" },
      { text: "El que percibo como arbitrario o inconsistente.", key: "F" },
    ],
  },
  {
    q: "Cuando algo te activa, tu reacción interna más frecuente es…",
    options: [
      { text: "Vergüenza y ganas de justificarme.", key: "S" },
      { text: "Ansiedad y rumiación: ¿y ahora qué?", key: "C" },
      { text: "Resistencia: quiero contradecir o negociar.", key: "A" },
      { text: "'No es quién para decirme esto.'", key: "R" },
      { text: "Indignación y cierre emocional.", key: "F" },
    ],
  },
  {
    q: "Lo que más valoras cuando alguien te da feedback es que…",
    options: [
      { text: "Cuide la forma y no me deje mal parado.", key: "S" },
      { text: "Sea concreto, con ejemplos y próximos pasos.", key: "C" },
      { text: "Me deje elegir cómo aplicarlo.", key: "A" },
      { text: "Haya una relación de confianza detrás.", key: "R" },
      { text: "Use el mismo criterio con todos.", key: "F" },
    ],
  },
  {
    q: "Lo que más te cuesta soltar después de una conversación difícil es…",
    options: [
      { text: "La sensación de haber quedado mal ante otros.", key: "S" },
      { text: "La incertidumbre de qué pasará ahora.", key: "C" },
      { text: "Sentir que perdí control sobre mi trabajo.", key: "A" },
      { text: "El vínculo dañado con esa persona.", key: "R" },
      { text: "La sensación de injusticia.", key: "F" },
    ],
  },
];

const SCARF_FEEDBACK: Record<string, { name: string; color: string; insight: string; palanca: string }> = {
  S: { name: "Estatus", color: "coral", insight: "Te activas cuando sientes que tu posición o competencia queda en entredicho — sobre todo frente a otros.", palanca: "Recuérdate: el feedback describe un comportamiento, no define tu valor. Escuchar no te rebaja; te da información." },
  C: { name: "Certeza", color: "cobalt", insight: "Te activas cuando el feedback es vago o abre demasiadas incógnitas sobre lo que sigue.", palanca: "Pide concreción: '¿Qué ejemplo específico? ¿Qué esperas la próxima vez?' Recuperas certeza convirtiendo lo ambiguo en acción." },
  A: { name: "Autonomía", color: "mint", insight: "Te activas cuando el feedback suena a imposición o cierra tu margen de decisión.", palanca: "Recupera autonomía preguntando: '¿Qué parte queda a mi criterio?' Elegir cómo aplicarlo te devuelve control." },
  R: { name: "Relación", color: "violet-brand", insight: "Te activas cuando el mensaje viene de alguien con quien no hay confianza o hay conflicto previo.", palanca: "Separa el mensajero del mensaje: '¿Qué de esto sería útil si viniera de alguien en quien confío?'" },
  F: { name: "Equidad", color: "amber-brand", insight: "Te activas cuando percibes que las reglas o el criterio no se aplican igual para todos.", palanca: "Nombra la percepción sin acusar: 'Quiero entender el criterio detrás de esto.' Reduces la sensación de injusticia sin cerrarte." },
};

function ScarfSelfDiscovery() {
  const [answers, setAnswers] = useState<Record<number, "S" | "C" | "A" | "R" | "F">>({});
  const [step, setStep] = useState(0);
  const total = SCARF_QUIZ.length;
  const done = Object.keys(answers).length === total;

  const tally = Object.values(answers).reduce<Record<string, number>>((acc, k) => {
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const dominant = done
    ? (Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0] as "S" | "C" | "A" | "R" | "F")
    : null;
  const result = dominant ? SCARF_FEEDBACK[dominant] : null;
  const rc = result ? colorOf(result.color) : null;

  const current = SCARF_QUIZ[step];
  const isLast = step === total - 1;
  const answered = answers[step] !== undefined;

  return (
    <Section title="¿Cuál es tu dominio SCARF dominante?" kicker="AUTODESCUBRIMIENTO">
      <p className="text-sm text-muted-foreground mb-5">
        Responde honestamente. Al terminar, verás cuál dominio se activa más en ti al recibir feedback — y una palanca concreta para trabajarlo.
      </p>

      {!done && current && (
        <div className="card-surface p-5">
          <div className="mb-3 flex items-center gap-3">
            <p className="text-sm font-bold text-muted-foreground">Pregunta {step + 1} de {total}</p>
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-[var(--cobalt)] transition-all" style={{ width: `${((step + (answered ? 1 : 0)) / total) * 100}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-base font-semibold mb-3">{current.q}</p>
              <div className="grid gap-2">
                {current.options.map((opt, j) => {
                  const active = answers[step] === opt.key;
                  return (
                    <button
                      key={j}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [step]: opt.key }))}
                      className={`text-left rounded-xl border-2 px-4 py-3 text-sm transition ${active ? "border-[var(--cobalt)] bg-[var(--cobalt)]/8 font-semibold" : "border-border hover:border-foreground/30"}`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-sm font-semibold text-muted-foreground disabled:opacity-40 hover:text-foreground transition"
            >
              ← Anterior
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
              disabled={!answered}
              className="rounded-full bg-[var(--cobalt)] text-white text-sm font-bold px-5 py-2 disabled:opacity-40 transition"
            >
              {isLast ? "Ver resultado" : "Siguiente →"}
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {done && result && rc && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 card-surface p-6 border-t-4"
            style={{ borderTopColor: `var(--${result.color})` }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Tu dominio dominante</p>
            <h4 className="text-2xl font-bold mb-2">{result.name}</h4>
            <p className="text-sm text-foreground/85 leading-relaxed mb-4">{result.insight}</p>
            <div className={`rounded-xl ${rc.soft} p-4`}>
              <p className={`text-xs font-bold uppercase tracking-wider ${rc.text} mb-1`}>Tu palanca</p>
              <p className="text-sm text-foreground/85 leading-relaxed">{result.palanca}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(["S", "C", "A", "R", "F"] as const).map((k) => (
                <span key={k} className="text-xs rounded-full border border-border px-3 py-1 text-muted-foreground">
                  {SCARF_FEEDBACK[k].name}: <b className="text-foreground">{tally[k] || 0}</b>
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => { setAnswers({}); setStep(0); }}
              className="mt-4 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
            >
              ↺ Volver a responder
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

const TRIGGER_QUIZ: { q: string; options: { text: string; key: "verdad" | "relacion" | "identidad" }[] }[] = [
  {
    q: "Cuando recibes feedback inesperado, tu primera reacción interna suele ser…",
    options: [
      { text: "Eso no es cierto. No tenía el contexto completo.", key: "verdad" },
      { text: "¿Por qué me lo dice ahora y de esta forma?", key: "relacion" },
      { text: "Si eso es cierto, entonces no soy tan bueno como creía.", key: "identidad" },
    ],
  },
  {
    q: "El pensamiento que más te ronda después de una conversación difícil es…",
    options: [
      { text: "No es justo lo que dijo. No vio todo lo que hice.", key: "verdad" },
      { text: "No sé si puedo confiar en esa persona de ahora en adelante.", key: "relacion" },
      { text: "¿Y si esto significa que no estoy a la altura?", key: "identidad" },
    ],
  },
  {
    q: "Lo que más te cuesta dejar ir es…",
    options: [
      { text: "La idea de que la otra persona está equivocada.", key: "verdad" },
      { text: "La sensación de que el vínculo se dañó.", key: "relacion" },
      { text: "La duda sobre si realmente sirvo para esto.", key: "identidad" },
    ],
  },
];

const TRIGGER_FEEDBACK: Record<string, { name: string; color: string; insight: string; palanca: string }> = {
  verdad: { name: "Disparador de verdad", color: "coral", insight: "Tu reacción principal es cuestionar el contenido: ¿es justo?, ¿tiene toda la información?, ¿es exacto?", palanca: "Antes de descalificarlo, prueba una pregunta genuina: '¿Qué ejemplo específico viste?' A veces hay algo válido detrás, aunque no lo presenten bien." },
  relacion: { name: "Disparador de relación", color: "violet-brand", insight: "Te activa quién da el feedback y el contexto en que lo hace. La confianza, el tono y el momento pesan más que el contenido.", palanca: "Separa mensajero de mensaje: 'Si esto me lo dijera alguien en quien confío, ¿qué parte me serviría?' Eso abre espacio para aprender sin traicionar tu radar." },
  identidad: { name: "Disparador de identidad", color: "cobalt", insight: "El feedback no solo te molesta: te amenaza. Lo confundes con una verdad sobre quién eres o cuánto vales.", palanca: "Recuérdate: el feedback describe un comportamiento en un momento, no tu identidad. Pregúntate: '¿Esto define quién soy, o solo algo que puedo ajustar?'" },
};

function TriggerSelfDiscovery() {
  const [answers, setAnswers] = useState<Record<number, "verdad" | "relacion" | "identidad">>({});
  const [step, setStep] = useState(0);
  const total = TRIGGER_QUIZ.length;
  const done = Object.keys(answers).length === total;

  const tally = Object.values(answers).reduce<Record<string, number>>((acc, k) => {
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const dominant = done
    ? (Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0] as "verdad" | "relacion" | "identidad")
    : null;
  const result = dominant ? TRIGGER_FEEDBACK[dominant] : null;
  const rc = result ? colorOf(result.color) : null;

  const current = TRIGGER_QUIZ[step];
  const isLast = step === total - 1;
  const answered = answers[step] !== undefined;

  return (
    <Section title="¿Cuál es tu disparador más frecuente?" kicker="AUTODESCUBRIMIENTO">
      <p className="text-sm text-muted-foreground mb-5">
        Responde honestamente. Al terminar, verás cuál disparador suele activarse más en ti — y una palanca concreta para nombrarlo antes de que tome el control.
      </p>

      {!done && current && (
        <div className="card-surface p-5">
          <div className="mb-3 flex items-center gap-3">
            <p className="text-sm font-bold text-muted-foreground">Pregunta {step + 1} de {total}</p>
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-[var(--amber-brand)] transition-all" style={{ width: `${((step + (answered ? 1 : 0)) / total) * 100}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-base font-semibold mb-3">{current.q}</p>
              <div className="grid gap-2">
                {current.options.map((opt, j) => {
                  const active = answers[step] === opt.key;
                  return (
                    <button
                      key={j}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [step]: opt.key }))}
                      className={`text-left rounded-xl border-2 px-4 py-3 text-sm transition ${active ? "border-[var(--amber-brand)] bg-[var(--amber-brand)]/8 font-semibold" : "border-border hover:border-foreground/30"}`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-sm font-semibold text-muted-foreground disabled:opacity-40 hover:text-foreground transition"
            >
              ← Anterior
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
              disabled={!answered}
              className="rounded-full bg-[var(--amber-brand)] text-white text-sm font-bold px-5 py-2 disabled:opacity-40 transition"
            >
              {isLast ? "Ver resultado" : "Siguiente →"}
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {done && result && rc && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 card-surface p-6 border-t-4"
            style={{ borderTopColor: `var(--${result.color})` }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Tu disparador más frecuente</p>
            <h4 className="text-2xl font-bold mb-2">{result.name}</h4>
            <p className="text-sm text-foreground/85 leading-relaxed mb-4">{result.insight}</p>
            <div className={`rounded-xl ${rc.soft} p-4`}>
              <p className={`text-xs font-bold uppercase tracking-wider ${rc.text} mb-1`}>Tu palanca</p>
              <p className="text-sm text-foreground/85 leading-relaxed">{result.palanca}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(["verdad", "relacion", "identidad"] as const).map((k) => (
                <span key={k} className="text-xs rounded-full border border-border px-3 py-1 text-muted-foreground">
                  {TRIGGER_FEEDBACK[k].name}: <b className="text-foreground">{tally[k] || 0}</b>
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => { setAnswers({}); setStep(0); }}
              className="mt-4 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
            >
              ↺ Volver a responder
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
