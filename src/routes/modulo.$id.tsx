import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Home } from "lucide-react";
import { MODULES } from "@/lib/course-data";
import {
  Module0,
  Module1,
  Module3,
  Module4,
  Module5,
  ModuleConclusion,
} from "@/components/course/Modules";

export const Route = createFileRoute("/modulo/$id")({
  head: ({ params }) => {
    const id = Number(params.id);
    const module = MODULES.find((m) => m.id === id);
    return {
      meta: [
        { title: `${module?.code ?? "Módulo"} · ${module?.title ?? "Recibir Feedback"}` },
        { name: "description", content: module?.subtitle ?? "Módulo del curso Recibir Feedback." },
        { property: "og:title", content: `${module?.code ?? "Módulo"} · ${module?.title ?? "Recibir Feedback"}` },
        { property: "og:description", content: module?.subtitle ?? "Módulo del curso Recibir Feedback." },
      ],
    };
  },
  component: ModulePage,
});

function ModulePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate({ from: "/modulo/$id" });
  const moduleId = Number(id);

  if (Number.isNaN(moduleId) || moduleId < 0 || moduleId >= MODULES.length) {
    throw notFound();
  }

  const progress = Math.round(((moduleId + 1) / MODULES.length) * 100);

  const goNext = () => {
    if (moduleId < MODULES.length - 1) {
      navigate({ to: "/modulo/$id", params: { id: String(moduleId + 1) } });
    }
  };

  const goPrev = () => {
    if (moduleId > 0) {
      navigate({ to: "/modulo/$id", params: { id: String(moduleId - 1) } });
    }
  };

  return (
    <div className="min-h-screen bg-soft">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 md:px-6 py-3 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold hover:bg-muted transition"
          >
            <Home className="h-4 w-4" />
            Inicio
          </Link>
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
            <div className="hidden sm:block text-xs text-muted-foreground font-medium">Módulo {moduleId + 1} de {MODULES.length}</div>
            <div className="h-2 w-32 sm:w-48 bg-muted rounded-full overflow-hidden">
              <motion.div className="h-full gradient-coral" animate={{ width: `${progress}%` }} transition={{ type: "spring" }} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 md:px-6 py-6">
        <main className="min-w-0">
          {moduleId === 0 && <Module0 onNext={goNext} />}
          {moduleId === 1 && <Module1 onNext={goNext} onPrev={goPrev} />}
          {moduleId === 2 && <Module3 onNext={goNext} onPrev={goPrev} />}
          {moduleId === 3 && <Module4 onNext={goNext} onPrev={goPrev} />}
          {moduleId === 4 && <Module5 onNext={goNext} onPrev={goPrev} />}
          {moduleId === 5 && <ModuleConclusion onPrev={goPrev} />}
        </main>
      </div>
    </div>
  );
}
