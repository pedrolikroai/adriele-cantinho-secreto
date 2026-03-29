import { motion } from "framer-motion";

const RecadoSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="relative bg-card rounded-2xl p-8 md:p-12 border border-border/50"
        >
          <div className="absolute top-6 left-8 font-heading text-6xl text-gold/30 leading-none select-none">"</div>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4 pt-6">
            Recado da Adriele
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
            Criei esse espaço para reunir meus achadinhos, promoções e indicações em um só lugar, de forma leve, prática e organizada. Aqui você encontra o que eu realmente uso e recomendo — sem exagero, sem enrolação.
          </p>
          <div className="mt-6 h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default RecadoSection;
