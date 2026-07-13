import { supabase } from "@/integrations/supabase/client";

export type CourseUser = { name: string; email: string };

const KEY = "course:user";

export function getCourseUser(): CourseUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (p && typeof p.name === "string" && typeof p.email === "string") return p;
  } catch {}
  return null;
}

export function setCourseUser(u: CourseUser) {
  window.localStorage.setItem(KEY, JSON.stringify(u));
}

export function clearCourseUser() {
  window.localStorage.removeItem(KEY);
}

export async function enrollUser(u: CourseUser) {
  const email = u.email.trim().toLowerCase();
  const name = u.name.trim();
  const { error } = await supabase
    .from("enrollments")
    .upsert({ name, email }, { onConflict: "email" });
  if (error) throw error;
  setCourseUser({ name, email });
}

export async function saveResponse(params: {
  moduleId: string;
  questionKey: string;
  questionText: string;
  answer: string;
}) {
  const user = getCourseUser();
  if (!user) return;
  const answer = params.answer.trim();
  if (!answer) return;
  const { error } = await supabase.from("responses").upsert(
    {
      name: user.name,
      email: user.email,
      module_id: params.moduleId,
      question_key: params.questionKey,
      question_text: params.questionText,
      answer,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email,module_id,question_key" },
  );
  if (error) console.error("[saveResponse]", error);
}
