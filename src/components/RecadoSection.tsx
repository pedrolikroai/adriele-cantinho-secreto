import { motion } from "framer-motion";

const RecadoSection = () => {
  return (
    <section className="py-8 md:py-10">
      <div className="container max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="relative bg-card rounded-2xl p-6 md:p-8 border border-border/50"
        >
          <div className="absolute top-4 left-6 font-heading text-5xl text-[hsl(var(--gold)/0.25)] leading-none select-none">"</div>
          <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3 pt-5">
            Recado da Adriele
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Criei esse espaço para reunir meus achadinhos, promoções e indicações em um só lugar, de forma leve, prática e organizada. Aqui você encontra o que eu realmente uso e recomendo — sem exagero, sem enrolação.
          </p>
          <div className="mt-5 h-px bg-gradient-to-r from-[hsl(var(--gold)/0.4)] via-[hsl(var(--gold)/0.15)] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default RecadoSection;
