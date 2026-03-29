import { motion } from "framer-motion";
import favImg from "@/assets/favorito.jpg";
import { Star } from "lucide-react";

const FavoritoSection = () => {
  return (
    <section id="favorito" className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={favImg}
                alt="Favorito da Adriele"
                loading="lazy"
                width={800}
                height={512}
                className="w-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star size={18} className="text-gold fill-gold" />
                <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                  Favorito da Adriele
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Difusor de ambiente artesanal
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Esse é meu queridinho da semana. Além de lindo na decoração, o aroma é suave e duradouro. Perfeito para deixar a casa mais aconchegante sem exagero.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-light text-sm font-medium text-foreground">
                <Star size={14} className="text-gold fill-gold" />
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
