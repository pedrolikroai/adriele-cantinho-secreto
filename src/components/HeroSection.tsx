import { motion } from "framer-motion";
import heroImg from "@/assets/adriele-hero.jpg";
import { BadgeCheck, MessageCircle, Instagram, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="inicio" className="pt-16">
      <div className="container max-w-lg mx-auto py-10 md:py-14">
        {/* Profile header — inspired by profile page layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Profile photo with ring */}
          <div className="relative mb-5">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[hsl(var(--rose))] via-[hsl(var(--gold)/0.5)] to-[hsl(var(--nude))] p-[3px]" />
            <img
              src={heroImg}
              alt="Adriele Leite"
              width={800}
              height={1024}
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-[3px] border-background"
            />
          </div>

          {/* Name + verified badge */}
          <div className="flex items-center gap-1.5 mb-1">
            <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
              Adriele Leite
            </h1>
            <BadgeCheck size={22} className="text-[hsl(var(--gold))] fill-[hsl(var(--gold))] mt-0.5" />
          </div>

          {/* Handle / positioning phrase */}
          <p className="text-sm font-medium text-muted-foreground tracking-wide mb-3">
            Rotina real, dicas e achadinhos
          </p>

          {/* Mini bio */}
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
            Aqui eu reúno com carinho tudo o que facilita o dia a dia: favoritos, promoções e indicações que eu gosto de verdade.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col w-full gap-2.5 max-w-xs">
            <a
              href="#achadinhos"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Sparkles size={16} />
              Ver achadinhos
            </a>
            <div className="flex gap-2.5">
              <a
                href="https://wa.me/557788348334"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                <Instagram size={16} />
                Instagram
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
