import { motion } from "framer-motion";
import heroImg from "@/assets/adriele-hero.jpg";

const tags = ["Rotina real", "Dicas", "Achadinhos"];

const SobreSection = () => {
  return (
    <section id="sobre" className="py-10 md:py-16 bg-card/50">
      <div className="container max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <img
            src={heroImg}
            alt="Adriele Leite"
            loading="lazy"
            width={800}
            height={1024}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-[3px] border-[hsl(var(--rose))]"
          />
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Sobre Mim
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-5">
            Oi, eu sou a Adriele. Compartilho rotina real, dicas simples e achadinhos que ajudam de verdade no dia a dia. Criei esse espaço para reunir tudo isso de forma prática, leve e organizada.
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[hsl(var(--rose))] text-[hsl(var(--rose-foreground))] text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SobreSection;
