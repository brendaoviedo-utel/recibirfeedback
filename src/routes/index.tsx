import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { MODULES, FINAL_QUIZ } from "@/lib/course-data";
import { Module0, Module1, Module2, Module3, Module4, Module5 } from "@/components/course/Modules";
import { FinalQuiz } from "@/components/course/Interactives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Recibir Feedback · Curso interactivo UTEL" },
      { name: "description", content: "Aprende a recibir feedback con apertura: neurociencia, disparadores y la secuencia Pausa–Nombre–Elige. Experiencia interactiva de 60 min." },
      { property: "og:title", content: "Recibir Feedback · Serie Feedback UTEL" },
      { property: "og:description", content: "Curso experiencial sobre cómo recibir feedback con apertura genuina." },
    ],
  }),
  component: CoursePage,
});

function CoursePage() {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [navOpen, setNavOpen] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [active]);

  const goToModule = (id: number) => {
    setCompleted((s) => new Set(s).add(active));
    setActive(id);
    setNavOpen(false);
  };

  if (!started) return <Landing onStart={() => setStarted(true)} />;

  const progress = Math.round((completed.size / MODULES.length) * 100);

  return (
    <div className="min-h-screen bg-soft">
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 flex items-center gap-4">
          <button onClick={() => setNavOpen((o) => !o)} className="md:hidden p-2 -ml-2 rounded-lg hover:bg-muted">
            {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-coral text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Serie Feedback · UTEL</p>
              <p className="text-sm font-bold">Recibir Feedback</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:block text-xs text-muted-foreground font-medium">{progress}% completado</div>
            <div className="h-2 w-32 sm:w-48 bg-muted rounded-full overflow-hidden">
              <motion.div className="h-full gradient-coral" animate={{ width: `${progress}%` }} transition={{ type: "spring" }} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl grid md:grid-cols-[280px_1fr] gap-6 px-4 md:px-6 py-6">
        {/* Sidebar */}
        <aside className={`${navOpen ? "block" : "hidden"} md:block`}>
          <nav className="md:sticky md:top-20 card-surface p-3 space-y-1">
            {MODULES.map((m) => {
              const isActive = m.id === active;
              const isDone = completed.has(m.id);
              return (
                <button key={m.id} onClick={() => goToModule(m.id)}
                  className={`w-full text-left rounded-xl p-3 transition flex items-start gap-3 ${
                    isActive ? "bg-foreground text-background" : "hover:bg-muted"
                  }`}>
                  <div className="mt-0.5 shrink-0">
                    {isDone ? <CheckCircle2 className="h-4 w-4 text-[var(--mint)]" /> : <Circle className={`h-4 w-4 ${isActive ? "text-background/60" : "text-muted-foreground"}`} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black tracking-wider ${isActive ? "text-background/70" : "text-muted-foreground"}`}>{m.code}</span>
                      <span className={`text-[10px] ${isActive ? "text-background/60" : "text-muted-foreground"}`}>· {m.duration}</span>
                    </div>
                    <p className="text-sm font-semibold leading-tight mt-0.5 truncate">{m.title}</p>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <main className="min-w-0">
          {active === 0 && <Module0 onNext={() => goToModule(1)} />}
          {active === 1 && <Module1 onNext={() => goToModule(2)} />}
          {active === 2 && <Module2 onNext={() => goToModule(3)} />}
          {active === 3 && <Module3 onNext={() => goToModule(4)} />}
          {active === 4 && <Module4 onNext={() => goToModule(5)} />}
          {active === 5 && <Module5 onNext={() => goToModule(6)} />}
          {active === 6 && (
            <div className="space-y-8 pb-10">
              <div className="card-surface p-8 md:p-10 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[var(--cobalt)]/10 blur-2xl" />
                <p className="chip bg-[var(--cobalt)]/10 text-[var(--cobalt)] border-transparent mb-3">Evaluación final integradora</p>
                <h1 className="text-3xl md:text-4xl font-extrabold">Demuestra lo aprendido</h1>
                <p className="mt-3 text-muted-foreground max-w-2xl">10 situaciones reales de feedback. En varias preguntas más de una opción parece razonable: identifica cuál combina autoconciencia, apertura y orientación al aprendizaje. Mínimo aprobatorio: 80%. Tienes 2 intentos.</p>
              </div>
              <FinalQuiz items={FINAL_QUIZ} onPass={() => setCompleted((s) => new Set(s).add(6))} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-soft">
      <main className="mx-auto max-w-6xl px-6 py-10 md:py-20">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="chip bg-white mb-6 mx-auto">
            <span className="h-2 w-2 rounded-full bg-[var(--coral)]" />
            Serie Feedback Utel
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto">
            Recibir Feedback:<br />
            <span className="bg-gradient-to-r from-[var(--coral)] via-[var(--violet-brand)] to-[var(--cobalt)] bg-clip-text text-transparent">
              tu cerebro, tus disparadores, tu crecimiento
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Una experiencia de aprendizaje interactiva sobre cómo convertir cualquier feedback —incluso el que duele— en información útil para tu desarrollo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <button onClick={onStart}
              className="group inline-flex items-center gap-2 rounded-full gradient-coral text-white px-8 py-4 font-bold text-base shadow-[var(--shadow-glow)] hover:opacity-95">
              Comenzar el curso
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <div className="inline-flex items-center gap-2 chip bg-white">⏱ 60 minutos · 6 módulos</div>
          </div>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {[
            { c: "cobalt", n: "01", t: "Tu cerebro bajo feedback", d: "El modelo SCARF y por qué la defensividad es biología, no carácter." },
            { c: "amber-brand", n: "02", t: "Tus tres disparadores", d: "Verdad, relación e identidad. Lo que bloquea el feedback antes de que llegue." },
            { c: "mint", n: "03", t: "Tres tipos de conversación", d: "Apreciación, coaching y evaluación. La pregunta que evita malentendidos." },
            { c: "violet-brand", n: "04", t: "Pausa, nombre y elige", d: "La secuencia de 3 pasos para convertir reacción en respuesta deliberada." },
            { c: "coral", n: "05", t: "Plan si-entonces", d: "Convertir la emoción en acción concreta en las próximas 48 horas." },
            { c: "cobalt", n: "EV", t: "Evaluación integradora", d: "10 preguntas basadas en situaciones reales. 2 intentos." },
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
              className="card-surface p-5 hover:shadow-lg transition">
              <p className={`text-3xl font-black mb-2`} style={{ color: `var(--${m.c})` }}>{m.n}</p>
              <h3 className="font-bold mb-1.5">{m.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 card-surface p-8 md:p-10 text-center bg-gradient-to-br from-white to-[var(--soft)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">&nbsp;</p>
          <h2 className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto leading-tight">
            "El feedback no duele porque seas inseguro. Duele porque tu cerebro está haciendo exactamente lo que aprendió a hacer para protegerte. Este curso te enseña a usar ese instinto a tu favor."
          </h2>
        </div>
      </main>
      <footer className="py-8 text-center text-xs text-muted-foreground">
        Utel 2026&nbsp; · Formación & Desarrollo
      </footer>
    </div>
  );
}
