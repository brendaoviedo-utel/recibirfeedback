
CREATE TABLE public.enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.enrollments TO anon;
GRANT SELECT, INSERT, UPDATE ON public.enrollments TO authenticated;
GRANT ALL ON public.enrollments TO service_role;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can enroll" ON public.enrollments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update enrollment by email" ON public.enrollments FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  module_id TEXT NOT NULL,
  question_key TEXT NOT NULL,
  question_text TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.responses TO anon;
GRANT SELECT, INSERT, UPDATE ON public.responses TO authenticated;
GRANT ALL ON public.responses TO service_role;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert responses" ON public.responses FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update own responses by email" ON public.responses FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE UNIQUE INDEX responses_unique_answer ON public.responses (email, module_id, question_key);
CREATE INDEX responses_email_idx ON public.responses (email);
CREATE INDEX responses_module_idx ON public.responses (module_id);
