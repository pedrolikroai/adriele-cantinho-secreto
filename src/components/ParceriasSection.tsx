import { motion } from "framer-motion";
import { MessageCircle, Instagram } from "lucide-react";

const ParceriasSection = () => {
  return (
    <section id="parcerias" className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Parcerias & Contato
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
            Quer falar comigo ou conhecer melhor meu trabalho? Vamos conversar.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/557788348334"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
            >
              <Instagram size={18} />
              Ver Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParceriasSection;
