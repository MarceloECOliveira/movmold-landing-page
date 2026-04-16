import { motion } from "framer-motion";
import { Shield, Clock, Users, Wrench } from "lucide-react";

const differentials = [
  {
    icon: Shield,
    title: "Qualidade Garantida",
    description:
      "Cada projeto passa por rigoroso controle de qualidade, assegurando precisão dimensional e excelência no acabamento.",
  },
  {
    icon: Clock,
    title: "Experiência de Mercado",
    description:
      "Anos de atuação no setor industrial, atendendo empresas de diversos segmentos com soluções sob medida.",
  },
  {
    icon: Users,
    title: "Atendimento Exclusivo",
    description:
      "Contato direto e personalizado com os especialistas fundadores, sem intermediários.",
  },
  {
    icon: Wrench,
    title: "Suporte e Pós-Venda",
    description:
      "Acompanhamento contínuo e suporte técnico ágil após a entrega, garantindo a máxima performance e durabilidade das soluções.",
  },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="bg-surface py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-teal">
              Sobre nós
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
              Engenharia com <span className="text-teal">compromisso</span>
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              A MovMold nasceu da paixão por engenharia de precisão e da visão de seus fundadores,
              os nossos especialistas <strong className="text-foreground">Marcelo Emerson</strong> e{" "}
              <strong className="text-foreground">Celso Souza</strong>. Com vasta experiência no
              setor industrial, nossa missão é ser referência em excelência técnica, entregando
              soluções que impulsionam a competitividade de nossos parceiros.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Acreditamos que a verdadeira engenharia se faz com proximidade. Por isso, cada cliente
              é atendido diretamente pelos próprios fundadores — garantindo agilidade, precisão
              técnica e um relacionamento de confiança que transforma desafios industriais em
              resultados concretos.
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
                className="flex gap-4 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy">
                  <item.icon className="h-6 w-6 text-teal" />
                </div>
                <div>
                  <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
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
