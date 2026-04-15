import { motion } from "framer-motion";
import { Shield, Clock, Users, Wrench } from "lucide-react";

const differentials = [
  {
    icon: Shield,
    title: "Qualidade Garantida",
    description: "Cada projeto passa por rigoroso controle de qualidade, assegurando precisão dimensional e excelência no acabamento.",
  },
  {
    icon: Clock,
    title: "Experiência de Mercado",
    description: "Anos de atuação no setor industrial, atendendo empresas de diversos segmentos com soluções sob medida.",
  },
  {
    icon: Users,
    title: "Atendimento Exclusivo",
    description: "Contato direto e personalizado com os especialistas fundadores, sem intermediários.",
  },
  {
    icon: Wrench,
    title: "Suporte e Pós-Venda",
    description: "Acompanhamento contínuo e suporte técnico ágil após a entrega, garantindo a máxima performance e durabilidade das soluções.",
  },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 bg-surface">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-teal font-medium tracking-[0.15em] uppercase text-sm mb-3">
              Sobre nós
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Engenharia com <span className="text-teal">compromisso</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A MovMold nasceu da paixão por engenharia de precisão e da visão de seus
              fundadores, os nossos especialistas <strong className="text-foreground">Marcelo Emerson</strong> e{" "}
              <strong className="text-foreground">Celso Souza</strong>. Com vasta experiência no setor
              industrial, nossa missão é ser referência em excelência técnica, entregando
              soluções que impulsionam a competitividade de nossos parceiros.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Acreditamos que a verdadeira engenharia se faz com proximidade. Por isso,
              cada cliente é atendido diretamente pelos próprios fundadores — garantindo
              agilidade, precisão técnica e um relacionamento de confiança que transforma
              desafios industriais em resultados concretos.
            </p>
          </motion.div>

          {/* Differentials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {differentials.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex gap-4 p-5 bg-card rounded-xl border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-navy flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
