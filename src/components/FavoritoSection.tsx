import { motion } from "framer-motion";
import favImg from "@/assets/favorito.jpg";
import { Star } from "lucide-react";

const FavoritoSection = () => {
  return (
    <section id="favorito" className="py-10 md:py-16">
      <div className="container max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-[hsl(var(--gold))] fill-[hsl(var(--gold))]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Favorito da Adriele
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border/50 bg-card">
            <img
              src={favImg}
              alt="Favorito da Adriele"
              loading="lazy"
              width={800}
              height={512}
              className="w-full aspect-video object-cover"
            />
            <div className="p-5">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                Difusor de ambiente artesanal
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Esse é meu queridinho da semana. Além de lindo na decoração, o aroma é suave e duradouro. Perfeito para deixar a casa mais aconchegante.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(var(--gold-light))] text-xs font-medium text-foreground">
                <Star size={12} className="text-[hsl(var(--gold))] fill-[hsl(var(--gold))]" />
                Recomendação pessoal
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FavoritoSection;
