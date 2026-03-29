import { motion } from "framer-motion";
import { MessageCircle, Instagram } from "lucide-react";

const ParceriasSection = () => {
  return (
    <section id="parcerias" className="py-10 md:py-16">
      <div className="container max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Parcerias & Contato
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
            Quer falar comigo ou conhecer melhor meu trabalho? Vamos conversar.
          </p>
          <div className="flex flex-col gap-2.5 max-w-xs mx-auto">
            <a
              href="https://wa.me/557788348334"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={16} />
              Falar no WhatsApp
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
            >
              <Instagram size={16} />
              Ver Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParceriasSection;
