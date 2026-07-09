import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Home } from "lucide-react";
import { MODULES } from "@/lib/course-data";
import { Module0, Module1, Module3, Module4, Module5, ModuleConclusion } from "@/components/course/Modules";


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
  const [started, setStarted] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [active]);

  const goToModule = (id: number) => {
    setCompleted((s) => new Set(s).add(active));
    setActive(id);
  };

  const goHome = () => {
    setActive(0);
    setCompleted(new Set());
    setStarted(false);
  };

  if (!started) return <Landing onStart={() => setStarted(true)} />;

  const progress = Math.round((completed.size / MODULES.length) * 100);

  return (
    <div className="min-h-screen bg-soft">
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 md:px-6 py-3 flex items-center gap-4">
          <button
            onClick={goHome}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold hover:bg-muted transition"
          >
            <Home className="h-4 w-4" />
            Inicio
          </button>
          <div className="hidden sm:flex items-center gap-2.5">
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

      <div className="mx-auto max-w-4xl px-4 md:px-6 py-6">
        {/* Main */}
        <main className="min-w-0">
          {active === 0 && <Module0 onNext={() => goToModule(1)} />}
          {active === 1 && <Module1 onNext={() => goToModule(2)} onPrev={() => goToModule(0)} />}
          {active === 2 && <Module3 onNext={() => goToModule(3)} onPrev={() => goToModule(1)} />}
          {active === 3 && <Module4 onNext={() => goToModule(4)} onPrev={() => goToModule(2)} />}
          {active === 4 && <Module5 onNext={() => goToModule(5)} onPrev={() => goToModule(3)} />}
          {active === 5 && <ModuleConclusion onPrev={() => goToModule(4)} />}
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
            <div className="inline-flex items-center gap-2 chip bg-white">⏱ 120 minutos</div>
          </div>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-4 items-stretch">
          {MODULES.map((m, i) => (
            <Link key={m.id} to="/modulo/$id" params={{ id: String(m.id) }} className="block group h-full">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                className="card-surface p-5 hover:shadow-lg transition group-hover:border-foreground/20 h-full flex flex-col">
                <p className="text-3xl font-black mb-2" style={{ color: `var(--${m.color})` }}>{m.code.replace("M", "").padStart(2, "0")}</p>
                <h3 className="font-bold mb-1.5">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.subtitle}</p>
              </motion.div>
            </Link>
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
