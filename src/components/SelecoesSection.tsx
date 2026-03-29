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
    <section id="selecoes" className="py-16 md:py-24 bg-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Seleções da Semana
          </h2>
          <p className="text-muted-foreground mt-2">O que estou indicando esta semana</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-2xl mb-4">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelecoesSection;
