import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { enrollUser, getCourseUser } from "@/lib/course-user";

export function RegistrationGate({ onReady }: { onReady: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const existing = getCourseUser();
    if (existing) onReady();
  }, [onReady]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    if (cleanName.length < 3) return setError("Por favor escribe tu nombre completo.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return setError("Ingresa un correo válido.");
    setBusy(true);
    try {
      await enrollUser({ name: cleanName, email: cleanEmail });
      onReady();
    } catch (err) {
      console.error(err);
      setError("No pudimos registrar tus datos. Intenta de nuevo.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--soft)] px-4 py-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md card-surface p-8 md:p-10"
      >
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-coral text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Serie Feedback · UTEL</p>
            <p className="text-sm font-bold">Recibir Feedback</p>
          </div>
        </div>
        <h1 id="registration-title" className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Antes de comenzar
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Registra tus datos para que podamos guardar tus reflexiones y confirmar tu participación. Este paso es obligatorio.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="reg-name" className="block text-sm font-semibold mb-1.5">Nombre completo</label>
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--coral)]/30 focus:border-[var(--coral)]"
              placeholder="Nombre y apellidos"
            />
          </div>
          <div>
            <label htmlFor="reg-email" className="block text-sm font-semibold mb-1.5">Correo electrónico institucional</label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--coral)]/30 focus:border-[var(--coral)]"
              placeholder="nombre@utel.edu.mx"
            />
          </div>
          {error && <p className="text-sm text-[var(--coral)] font-medium">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full gradient-coral text-white px-6 py-3.5 font-bold shadow-[var(--shadow-glow)] hover:opacity-95 disabled:opacity-60"
          >
            {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Registrando…</> : <>Entrar al curso <ArrowRight className="h-4 w-4" /></>}
          </button>
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            Al continuar aceptas que UTEL guarde tu nombre, correo y respuestas de reflexión con fines formativos.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
