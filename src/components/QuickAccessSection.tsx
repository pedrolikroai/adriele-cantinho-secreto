import { motion } from "framer-motion";
import { Sparkles, Tag, Heart, Instagram, MessageCircle, Handshake } from "lucide-react";

const highlights = [
  { icon: Sparkles, label: "Achadinhos", href: "#achadinhos" },
  { icon: Tag, label: "Promoções", href: "#selecoes" },
  { icon: Heart, label: "Favoritos", href: "#favorito" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com", external: true },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/557788348334", external: true },
  { icon: Handshake, label: "Parcerias", href: "#parcerias" },
];

const QuickAccessSection = () => {
  return (
    <section id="achadinhos" className="py-8 md:py-10">
      <div className="container max-w-lg mx-auto">
        {/* Stories-style highlight circles */}
        <div className="flex justify-between gap-2 overflow-x-auto pb-2 px-2 scrollbar-none">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col items-center gap-1.5 min-w-[60px] group"
              >
                <div className="relative">
                  <div className="absolute -inset-[2px] rounded-full bg-gradient-to-br from-[hsl(var(--gold)/0.6)] to-[hsl(var(--rose))]" />
                  <div className="relative w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-full bg-card border-[2px] border-background flex items-center justify-center group-hover:bg-muted transition-colors">
                    <Icon size={22} className="text-foreground/70 group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                  </div>
                </div>
                <span className="text-[10px] md:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                  {item.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;
