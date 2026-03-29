import { motion } from "framer-motion";
import { Sparkles, Tag, Heart, Instagram, MessageCircle, Handshake } from "lucide-react";

const items = [
  { icon: Sparkles, label: "Achadinhos", href: "#achadinhos", color: "bg-rose" },
  { icon: Tag, label: "Promoções", href: "#selecoes", color: "bg-secondary" },
  { icon: Heart, label: "Favoritos", href: "#favorito", color: "bg-accent" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com", external: true, color: "bg-muted" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/557788348334", external: true, color: "bg-card" },
  { icon: Handshake, label: "Parcerias", href: "#parcerias", color: "bg-secondary" },
];

const QuickAccessSection = () => {
  return (
    <section id="achadinhos" className="py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Explore
          </h2>
          <p className="text-muted-foreground mt-2">Acesse rápido o que você procura</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
          {items.map((item, i) => {
            const Icon = item.icon;
            const Tag = item.external ? "a" : "a";
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <a
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group flex flex-col items-center justify-center gap-3 p-6 md:p-8 rounded-2xl ${item.color} border border-border/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
                >
                  <Icon size={26} className="text-foreground/70 group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;
