
-- Achadinhos table
CREATE TABLE public.achadinhos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link TEXT,
  price TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Promoções table
CREATE TABLE public.promocoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link TEXT,
  price TEXT,
  original_price TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Favoritos table
CREATE TABLE public.favoritos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link TEXT,
  category TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Avisos table
CREATE TABLE public.avisos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Site content table for editable text blocks
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  link TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.achadinhos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promocoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avisos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view active content)
CREATE POLICY "Public can view active achadinhos" ON public.achadinhos FOR SELECT USING (active = true);
CREATE POLICY "Public can view active promocoes" ON public.promocoes FOR SELECT USING (active = true);
CREATE POLICY "Public can view active favoritos" ON public.favoritos FOR SELECT USING (active = true);
CREATE POLICY "Public can view active avisos" ON public.avisos FOR SELECT USING (active = true);
CREATE POLICY "Public can view site_content" ON public.site_content FOR SELECT USING (true);

-- Service role has full access (edge functions use service role)
-- No additional policies needed as service role bypasses RLS

-- Insert default site content
INSERT INTO public.site_content (section_key, title, subtitle, content) VALUES
  ('hero', 'Um cantinho com meus achadinhos, promoções e dicas que realmente valem a pena.', 'Aqui eu reúno com carinho tudo o que facilita o dia a dia: favoritos, promoções e indicações que eu gosto de verdade.', NULL),
  ('recado', 'Recado da Adriele', NULL, 'Criei esse espaço para reunir meus achadinhos, promoções e indicações em um só lugar, de forma leve, prática e organizada.'),
  ('sobre', 'Sobre Mim', NULL, 'Oi, eu sou a Adriele. Compartilho rotina real, dicas simples e achadinhos que ajudam de verdade no dia a dia. Criei esse espaço para reunir tudo isso de forma prática, leve e organizada.'),
  ('parcerias', 'Parcerias & Contato', NULL, 'Quer falar comigo ou conhecer melhor meu trabalho? Vamos conversar.'),
  ('selecoes', 'Seleções da Semana', 'O que estou indicando esta semana', NULL),
  ('favorito_destaque', 'Favorito da Adriele', NULL, NULL);
