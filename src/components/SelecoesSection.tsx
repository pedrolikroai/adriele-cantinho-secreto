import { motion } from "framer-motion";
import img1 from "@/assets/curadoria-1.jpg";
import img2 from "@/assets/curadoria-2.jpg";
import img3 from "@/assets/curadoria-3.jpg";

const items = [
  { img: img1, title: "Acessórios delicados", desc: "Peças que uso no dia a dia" },
  { img: img2, title: "Organização prática", desc: "Itens que facilitam a rotina" },
  { img: img3, title: "Skincare favorito", desc: "Produtos que amo e recomendo" },
];

const SelecoesSection = () => {
  return (
    <section id="selecoes" className="py-10 md:py-16">
      <div className="container max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
            Seleções da Semana
          </h2>
          <p className="text-muted-foreground text-sm mt-1">O que estou indicando esta semana</p>
        </motion.div>

        {/* Grid-style posts layout */}
        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                width={640}
                height={640}
                className="w-full aspect-square object-cover group-hover:brightness-75 transition-all duration-300"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <span className="text-primary-foreground text-xs font-semibold text-center leading-tight drop-shadow-md">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">Toque para explorar cada seleção</p>
      </div>
    </section>
  );
};

export default SelecoesSection;
