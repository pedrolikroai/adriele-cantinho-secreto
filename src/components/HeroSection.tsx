import { motion } from "framer-motion";
import heroImg from "@/assets/adriele-hero.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="pt-16">
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 md:order-1"
          >
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Adriele Leite
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.4rem] leading-tight font-semibold text-foreground mb-6">
              Um cantinho com meus achadinhos, promoções e dicas que realmente valem a pena.
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Aqui eu reúno com carinho tudo o que facilita o dia a dia: favoritos, promoções e indicações que eu gosto de verdade.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#achadinhos"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Ver achadinhos
              </a>
              <a
                href="https://wa.me/557788348334"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-rose/60 -z-10" />
              <img
                src={heroImg}
                alt="Adriele Leite"
                width={800}
                height={1024}
                className="w-72 md:w-80 lg:w-96 rounded-[1.5rem] object-cover shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
