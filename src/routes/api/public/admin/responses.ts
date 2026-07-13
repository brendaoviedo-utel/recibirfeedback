import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/admin/responses")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => ({}));
          const password = typeof body?.password === "string" ? body.password : "";
          const expected = process.env.ADMIN_PASSWORD;
          if (!expected) {
            return Response.json({ error: "ADMIN_PASSWORD no configurado" }, { status: 500 });
          }
          if (password !== expected) {
            return Response.json({ error: "Contraseña incorrecta" }, { status: 401 });
          }
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const [enrollmentsRes, responsesRes] = await Promise.all([
            supabaseAdmin
              .from("enrollments")
              .select("name, email, created_at")
              .order("created_at", { ascending: false }),
            supabaseAdmin
              .from("responses")
              .select("name, email, module_id, question_key, question_text, answer, created_at, updated_at")
              .order("updated_at", { ascending: false }),
          ]);

          if (enrollmentsRes.error) throw enrollmentsRes.error;
          if (responsesRes.error) throw responsesRes.error;

          return Response.json({
            enrollments: enrollmentsRes.data ?? [],
            responses: responsesRes.data ?? [],
          });
        } catch (e) {
          console.error("[admin/responses]", e);
          return Response.json({ error: "Error interno" }, { status: 500 });
        }
      },
    },
  },
});
