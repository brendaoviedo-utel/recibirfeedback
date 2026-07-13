import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Check, X, ArrowRight, Lightbulb } from "lucide-react";
import type { ScenarioOption, QuizQ } from "@/lib/course-data";
import { saveResponse } from "@/lib/course-user";

const colorMap: Record<string, { bg: string; ring: string; text: string; soft: string }> = {
  coral: { bg: "bg-[var(--coral)]", ring: "ring-[var(--coral)]/30", text: "text-[var(--coral)]", soft: "bg-[var(--coral)]/8" },
  cobalt: { bg: "bg-[var(--cobalt)]", ring: "ring-[var(--cobalt)]/30", text: "text-[var(--cobalt)]", soft: "bg-[var(--cobalt)]/8" },
  mint: { bg: "bg-[var(--mint)]", ring: "ring-[var(--mint)]/30", text: "text-[var(--mint)]", soft: "bg-[var(--mint)]/10" },
  "amber-brand": { bg: "bg-[var(--amber-brand)]", ring: "ring-[var(--amber-brand)]/30", text: "text-[var(--amber-brand)]", soft: "bg-[var(--amber-brand)]/10" },
  "violet-brand": { bg: "bg-[var(--violet-brand)]", ring: "ring-[var(--violet-brand)]/30", text: "text-[var(--violet-brand)]", soft: "bg-[var(--violet-brand)]/10" },
};

export function colorOf(c: string) {
  return colorMap[c] ?? colorMap.coral;
}

/* -------- Scenario picker -------- */
export function ScenarioChoice({
  question,
  options,
  accent = "coral",
  onComplete,
}: {
  question: string;
  options: ScenarioOption[];
  accent?: string;
  onComplete?: () => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const [explored, setExplored] = useState<Set<string>>(new Set());
  const allCorrect = options.filter((o) => o.correct).map((o) => o.id);
  const c = colorOf(accent);

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-foreground">{question}</p>
      <div className="grid gap-3">
        {options.map((opt) => {
          const isPicked = picked === opt.id;
          const isCorrect = !!opt.correct;
          const wasSeen = explored.has(opt.id);
          return (
            <motion.button
              key={opt.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                setPicked(opt.id);
                setExplored((s) => new Set(s).add(opt.id));
                if (allCorrect.includes(opt.id)) onComplete?.();
              }}
              className={`text-left rounded-2xl border-2 p-4 transition-all ${
                isPicked
                  ? isCorrect
                    ? "border-[var(--mint)] bg-[var(--mint)]/8"
                    : "border-[var(--coral)] bg-[var(--coral)]/8"
                  : wasSeen
                  ? "border-border bg-muted/30"
                  : "border-border bg-card hover:border-foreground/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    isPicked
                      ? isCorrect
                        ? "bg-[var(--mint)] text-white"
                        : "bg-[var(--coral)] text-white"
                      : `${c.soft} ${c.text}`
                  }`}
                >
                  {isPicked ? (isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />) : opt.id}
                </span>
                <span className="text-sm font-medium leading-relaxed pt-1">{opt.label}</span>
              </div>
              <AnimatePresence>
                {isPicked && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 ml-11 text-sm text-muted-foreground leading-relaxed">
                      {opt.feedback}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      {explored.size > 0 && (
        <p className="text-xs text-muted-foreground italic">
          Explora todas las alternativas para enriquecer tu aprendizaje ({explored.size}/{options.length})
        </p>
      )}
    </div>
  );
}

/* -------- Reflection card -------- */
export function ReflectionCard({
  prompts,
  accent = "coral",
}: {
  prompts: string[];
  accent?: string;
}) {
  const [values, setValues] = useState<string[]>(prompts.map(() => ""));
  const c = colorOf(accent);
  return (
    <div className="card-surface p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${c.soft}`}>
          <Lightbulb className={`h-4 w-4 ${c.text}`} />
        </div>
        <h4 className="text-base font-bold">Mi reflexión y compromiso</h4>
      </div>
      <div className="space-y-4">
        {prompts.map((p, i) => (
          <div key={i}>
            <label className="block text-sm font-medium mb-2 text-foreground/90">{p}</label>
            <textarea
              value={values[i]}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                setValues(next);
              }}
              rows={2}
              placeholder="Escribe aquí…"
              className="w-full resize-none rounded-xl border border-border bg-soft px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--cobalt)]/30 focus:border-[var(--cobalt)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------- Formative quiz -------- */
export function FormativeQuiz({ items }: { items: QuizQ[] }) {
  return (
    <div className="space-y-6">
      {items.map((q, idx) => (
        <QuizItem key={idx} q={q} idx={idx} />
      ))}
    </div>
  );
}

function QuizItem({ q, idx }: { q: QuizQ; idx: number }) {
  const [picked, setPicked] = useState<string | null>(null);
  const correct = picked === q.correct;
  return (
    <div className="card-surface p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="chip">Pregunta {idx + 1}</span>
      </div>
      <p className="text-sm font-semibold mb-4 leading-relaxed">{q.q}</p>
      <div className="grid gap-2">
        {q.options.map((o) => {
          const isPicked = picked === o.id;
          return (
            <button
              key={o.id}
              disabled={!!picked}
              onClick={() => setPicked(o.id)}
              className={`text-left rounded-xl border-2 px-4 py-3 text-sm transition ${
                isPicked
                  ? correct
                    ? "border-[var(--mint)] bg-[var(--mint)]/10"
                    : "border-[var(--coral)] bg-[var(--coral)]/10"
                  : picked && o.id === q.correct
                  ? "border-[var(--mint)] bg-[var(--mint)]/10"
                  : "border-border hover:border-foreground/30 bg-card"
              } ${picked ? "cursor-default" : "cursor-pointer"}`}
            >
              <span className="mr-2 font-bold">{o.id}.</span>
              {o.text}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {picked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded-xl p-4 text-sm ${
              correct ? "bg-[var(--mint)]/10 text-foreground" : "bg-[var(--coral)]/8 text-foreground"
            }`}
          >
            <div className="flex items-start gap-2">
              {correct ? <Check className="h-4 w-4 mt-0.5 text-[var(--mint)] shrink-0" /> : <X className="h-4 w-4 mt-0.5 text-[var(--coral)] shrink-0" />}
              <p className="leading-relaxed">{correct ? q.fbCorrect : q.fbIncorrect}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------- Final summative quiz -------- */
export function FinalQuiz({ items, onPass }: { items: QuizQ[]; onPass: (score: number) => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempt, setAttempt] = useState(1);

  const score = useMemo(
    () => items.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0),
    [answers, items]
  );
  const percent = Math.round((score / items.length) * 100);
  const passed = score >= 8;

  if (submitted) {
    return (
      <div className="card-surface p-8 text-center space-y-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${passed ? "gradient-mint" : "gradient-coral"} text-white`}
        >
          <span className="text-3xl font-bold">{percent}%</span>
        </motion.div>
        <h3 className="text-2xl font-bold">
          {passed ? "¡Curso completado!" : "Casi lo logras"}
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {passed
            ? `Obtuviste ${score} de ${items.length}. Cumpliste el umbral del 80%. Recuerda activar tu plan si-entonces en las próximas 48 horas.`
            : `Obtuviste ${score} de ${items.length}. Necesitas 8/10 para aprobar. Te recomendamos revisar los módulos sobre SCARF, disparadores y Pausa-Nombre-Elige antes de tu segundo intento.`}
        </p>
        {!passed && attempt < 2 ? (
          <button
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
              setAttempt(2);
            }}
            className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:opacity-90"
          >
            Intento 2 de 2
          </button>
        ) : passed ? (
          <button
            onClick={() => onPass(percent)}
            className="rounded-full gradient-cobalt text-white px-6 py-2.5 text-sm font-semibold hover:opacity-90 inline-flex items-center gap-2"
          >
            Ver siguiente curso de la serie <ArrowRight className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    );
  }

  const answered = Object.keys(answers).length;

  return (
    <div className="space-y-5">
      <div className="card-surface p-4 flex items-center justify-between sticky top-4 z-10 backdrop-blur bg-card/95">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Intento {attempt} de 2</p>
          <p className="text-sm font-bold">{answered} / {items.length} respondidas</p>
        </div>
        <div className="h-2 w-40 bg-muted rounded-full overflow-hidden">
          <div className="h-full gradient-cobalt transition-all" style={{ width: `${(answered / items.length) * 100}%` }} />
        </div>
      </div>
      {items.map((q, i) => (
        <div key={i} className="card-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="chip">Pregunta {i + 1} / {items.length}</span>
            {q.tag && <span className="text-xs text-muted-foreground">{q.tag}</span>}
          </div>
          <p className="text-sm font-semibold mb-4 leading-relaxed">{q.q}</p>
          <div className="grid gap-2">
            {q.options.map((o) => {
              const picked = answers[i] === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => setAnswers((a) => ({ ...a, [i]: o.id }))}
                  className={`text-left rounded-xl border-2 px-4 py-3 text-sm transition ${
                    picked
                      ? "border-[var(--cobalt)] bg-[var(--cobalt)]/8"
                      : "border-border hover:border-foreground/30 bg-card"
                  }`}
                >
                  <span className="mr-2 font-bold">{o.id}.</span>
                  {o.text}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <button
        disabled={answered < items.length}
        onClick={() => setSubmitted(true)}
        className="w-full rounded-2xl gradient-coral text-white py-4 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
      >
        {answered < items.length ? `Responde ${items.length - answered} más para continuar` : "Enviar evaluación"}
      </button>
    </div>
  );
}
