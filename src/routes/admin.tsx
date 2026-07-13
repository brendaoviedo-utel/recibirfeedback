import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lock, Loader2, Download, RefreshCw } from "lucide-react";

type Enrollment = { name: string; email: string; created_at: string };
type Answer = {
  name: string;
  email: string;
  module_id: string;
  question_key: string;
  question_text: string;
  answer: string;
  created_at: string;
  updated_at: string;
};

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Recibir Feedback" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (pw: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/public/admin/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.status === 401) { setError("Contraseña incorrecta."); setAuthed(false); return; }
      if (!res.ok) { setError("Error al cargar datos."); return; }
      const data = await res.json();
      setEnrollments(data.enrollments ?? []);
      setAnswers(data.responses ?? []);
      setAuthed(true);
    } catch (e) {
      console.error(e);
      setError("Error de red.");
    } finally {
      setBusy(false);
    }
  };

  const grouped = useMemo(() => {
    const byEmail = new Map<string, { name: string; email: string; byModule: Map<string, Answer[]> }>();
    for (const e of enrollments) {
      byEmail.set(e.email, { name: e.name, email: e.email, byModule: new Map() });
    }
    for (const a of answers) {
      const key = a.email;
      if (!byEmail.has(key)) byEmail.set(key, { name: a.name, email: key, byModule: new Map() });
      const group = byEmail.get(key)!;
      if (!group.byModule.has(a.module_id)) group.byModule.set(a.module_id, []);
      group.byModule.get(a.module_id)!.push(a);
    }
    return Array.from(byEmail.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [enrollments, answers]);

  const downloadCsv = () => {
    const rows = [
      ["nombre", "correo", "modulo", "pregunta", "respuesta", "fecha"],
      ...answers.map((a) => [a.name, a.email, a.module_id, a.question_text.replace(/\n/g, " "), a.answer.replace(/\n/g, " "), a.updated_at]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `respuestas-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-soft flex items-center justify-center px-4">
        <form
          onSubmit={(e) => { e.preventDefault(); void load(password); }}
          className="w-full max-w-sm card-surface p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--cobalt)]/10">
              <Lock className="h-4 w-4 text-[var(--cobalt)]" />
            </div>
            <h1 className="text-lg font-bold">Panel de administración</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Ingresa la contraseña para ver las respuestas del curso.</p>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--cobalt)]/30 focus:border-[var(--cobalt)]"
          />
          {error && <p className="mt-3 text-sm text-[var(--coral)]">{error}</p>}
          <button
            type="submit"
            disabled={busy || password.length === 0}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full gradient-coral text-white px-5 py-3 font-bold disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft">
      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/80 border-b border-border">
        <div className="mx-auto max-w-5xl px-4 md:px-6 py-3 flex items-center gap-3">
          <h1 className="text-base font-bold">Respuestas · Recibir Feedback</h1>
          <span className="chip">{grouped.length} personas</span>
          <span className="chip">{answers.length} respuestas</span>
          <div className="ml-auto flex gap-2">
            <button onClick={() => void load(password)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-muted">
              <RefreshCw className="h-3.5 w-3.5" /> Actualizar
            </button>
            <button onClick={downloadCsv} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cobalt)] text-white px-3 py-1.5 text-xs font-semibold hover:opacity-90">
              <Download className="h-3.5 w-3.5" /> CSV
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 md:px-6 py-6 space-y-6">
        {grouped.length === 0 && (
          <div className="card-surface p-8 text-center text-sm text-muted-foreground">
            Aún no hay respuestas registradas.
          </div>
        )}
        {grouped.map((g) => (
          <section key={g.email} className="card-surface p-5 md:p-6">
            <header className="mb-4">
              <h2 className="text-lg font-bold">{g.name}</h2>
              <p className="text-xs text-muted-foreground">{g.email}</p>
            </header>
            {g.byModule.size === 0 ? (
              <p className="text-sm text-muted-foreground italic">Registrada, sin respuestas todavía.</p>
            ) : (
              <div className="space-y-4">
                {Array.from(g.byModule.entries()).sort(([a],[b]) => a.localeCompare(b)).map(([mod, list]) => (
                  <div key={mod}>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--cobalt)] mb-2">{mod}</h3>
                    <ul className="space-y-3">
                      {list.map((a) => (
                        <li key={a.question_key} className="rounded-xl bg-soft p-3">
                          <p className="text-xs font-semibold text-foreground/80">{a.question_text}</p>
                          <p className="mt-1 text-sm whitespace-pre-wrap">{a.answer}</p>
                          <p className="mt-1 text-[10px] text-muted-foreground">{new Date(a.updated_at).toLocaleString("es-MX")}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
