import { motion } from "framer-motion";
import heroImg from "@/assets/adriele-hero.jpg";

const tags = ["Rotina real", "Dicas", "Achadinhos"];

const SobreSection = () => {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <img
            src={heroImg}
            alt="Adriele Leite"
            loading="lazy"
            width={800}
            height={1024}
            className="w-28 h-28 rounded-full object-cover mx-auto mb-6 border-4 border-rose"
          />
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Sobre Mim
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-6">
            Oi, eu sou a Adriele. Compartilho rotina real, dicas simples e achadinhos que ajudam de verdade no dia a dia. Criei esse espaço para reunir tudo isso de forma prática, leve e organizada.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-rose text-rose-foreground text-xs font-medium tracking-wide"
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
